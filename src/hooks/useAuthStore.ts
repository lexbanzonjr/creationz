import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getGuestToken } from "../api/guestApi";

interface IdParams {
  email: string;
  name: string;
  roles: string[];
}

interface LoginParams {
  id: IdParams;
  accessToken: string;
}

interface AuthState {
  // State
  accessToken: string;
  id: IdParams;
  isAuthenticated: boolean;

  // Actions
  login: (params: LoginParams) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
  setAuthenticated: (auth: boolean) => void;
  setId: (params: IdParams) => void;
  initialize: () => Promise<void>;
}

const blankId = {
  email: "",
  name: "",
  roles: [],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      accessToken: "",
      id: blankId,
      isAuthenticated: false,

      login: (params: LoginParams) => {
        set({
          accessToken: params.accessToken,
          id: params.id as IdParams,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          accessToken: "",
          id: blankId,
          isAuthenticated: false,
        });
      },

      setAccessToken: (accessToken: string) =>
        set({ accessToken: accessToken }),

      setAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),

      setId: (params: IdParams) => set({ id: params }),

      initialize: async () => {
        const state = get();

        // If there's no access token, try to get a guest token
        if (!state.accessToken) {
          const guestToken = await getGuestToken();
          set({
            accessToken: guestToken.guestToken,
            id: { ...blankId, name: "Guest User", roles: ["guest"] },
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        id: state.id,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Convenience hook that maintains the same API as the original useAuth
export const useAuth = () => {
  const {
    accessToken,
    id,
    isAuthenticated,

    login,
    logout,
    setAccessToken,
    setId,
    setAuthenticated,
    initialize,
  } = useAuthStore();

  return {
    getAccessToken: accessToken,
    getId: id,
    isAuthenticated,

    login,
    logout,
    setAccessToken,
    setId,
    setAuthenticated,
    initialize,
  };
};
