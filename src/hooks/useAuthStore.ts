import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getGuestToken } from "../api/guestApi";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/global";

interface Payload extends User {}

interface LoginParams {
  token: string;
}

interface AuthState {
  // State
  token: string;
  payload: Payload;
  isAuthenticated: boolean;

  // Actions
  login: (params: LoginParams) => void;
  logout: () => void;
  setToken: (token: string) => void;
  setAuthenticated: (auth: boolean) => void;
  initialize: () => Promise<void>;
}

const blankPayload: Payload = {
  email: "",
  name: "",
  roles: [],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      token: "",
      payload: blankPayload,
      isAuthenticated: false,

      login: (params: LoginParams) => {
        const payload = jwtDecode(params.token) as Payload;
        set({
          token: params.token,
          payload,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: "",
          payload: blankPayload,
          isAuthenticated: false,
        });
      },

      setToken: (token: string) => set({ token }),

      setAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),

      initialize: async () => {
        const state = get();

        // If there's no access token, try to get a guest token
        if (!state.token) {
          const guestToken = await getGuestToken();
          const payload = jwtDecode(guestToken.token) as Payload;
          set({
            token: guestToken.token,
            payload,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        payload: state.payload,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
