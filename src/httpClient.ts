// HTTP Client with automatic token refresh functionality
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Type for queued request promises
interface QueuedRequest {
  resolve: (value: string) => void;
  reject: (reason: any) => void;
}

// Type for refresh token response
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

// Type for extended request config with retry flag
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Global state to track if a token refresh is currently in progress
let isRefreshing: boolean = false;
// Queue to store failed requests while token is being refreshed
let failedQueue: QueuedRequest[] = [];

/**
 * Process all queued requests after token refresh completes
 * @param error - Error from refresh attempt (if any)
 * @param token - New access token (if refresh succeeded)
 */
const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom: QueuedRequest) => {
    if (error) {
      // Reject all queued requests if refresh failed
      prom.reject(error);
    } else {
      // Resolve all queued requests with new token if refresh succeeded
      prom.resolve(token!);
    }
  });
  // Clear the queue after processing
  failedQueue = [];
};

// Create axios instance with base configuration
export const httpClient = axios.create({
  baseURL: "https://your-api.com",
});

// Request interceptor: Add authorization header to outgoing requests
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get current access token from localStorage
    const token: string | null = localStorage.getItem("accessToken");
    if (token) {
      // Add Bearer token to Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor: Handle token refresh on 401 errors
httpClient.interceptors.response.use(
  // Pass through successful responses unchanged
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: ExtendedAxiosRequestConfig =
      error.config as ExtendedAxiosRequestConfig;
    const refreshToken: string | null = localStorage.getItem("refreshToken");

    // Check if this is a 401 error that should trigger token refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry && // Prevent infinite retry loops
      refreshToken // Only attempt refresh if we have a refresh token
    ) {
      // Mark this request as having been retried
      originalRequest._retry = true;

      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          // Add this request's resolve/reject functions to the queue
          failedQueue.push({ resolve, reject });
        })
          .then((token: string) => {
            // When refresh completes, retry the original request with new token
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch((err: any) => Promise.reject(err));
      }

      // Set flag to indicate refresh is in progress
      isRefreshing = true;

      try {
        // Attempt to refresh the access token
        const res: AxiosResponse<RefreshTokenResponse> = await axios.post(
          "https://your-api.com/auth/refresh",
          {
            refreshToken,
          }
        );
        const newToken: string = res.data.accessToken;

        // Store the new access token
        localStorage.setItem("accessToken", newToken);

        // Process all queued requests with the new token
        processQueue(null, newToken);

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return httpClient(originalRequest);
      } catch (err) {
        // If refresh fails, reject all queued requests
        processQueue(err, null);
        // Optionally redirect to login page here
        return Promise.reject(err);
      } finally {
        // Reset the refreshing flag
        isRefreshing = false;
      }
    }

    // For all other errors, reject the promise
    return Promise.reject(error);
  }
);
