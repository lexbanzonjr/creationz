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
  token: string;
}

interface AuthState {
  // State
  token: string;
  id: IdParams;
  isAuthenticated: boolean;

  // Actions
  login: (params: LoginParams) => void;
  logout: () => void;
  setToken: (token: string) => void;
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
      token: "",
      id: blankId,
      isAuthenticated: false,

      login: (params: LoginParams) => {
        set({
          token: params.token,
          id: params.id as IdParams,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: "",
          id: blankId,
          isAuthenticated: false,
        });
      },

      setToken: (token: string) => set({ token }),

      setAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),

      setId: (params: IdParams) => set({ id: params }),

      initialize: async () => {
        const state = get();

        // If there's no access token, try to get a guest token
        if (!state.token) {
          const guestToken = await getGuestToken();
          set({
            token: guestToken.token,
            id: { ...blankId, name: "Guest User", roles: ["guest"] },
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        id: state.id,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
