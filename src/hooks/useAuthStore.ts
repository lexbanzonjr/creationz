import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IdParams {
  email: string;
  name: string;
  roles: string[];
}

interface LoginParams {
  idToken: { roles: string[] };
  token: string;
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
          accessToken: params.token,
          id: params.idToken as IdParams,
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

      setAccessToken: (accessToken: string) => set({ accessToken }),

      setAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),

      setId: (params: IdParams) => set({ id: params }),
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
  };
};
