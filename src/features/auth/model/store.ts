import { create } from "zustand";
import { login, LoginDto, LoginResponse } from "./loginService";
import { changePassword, ChangePasswordDto } from "./changePasswordService";

interface AuthState {
  user: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isFirstLogin: boolean;
  loading: boolean;
  loginUser: (data: LoginDto) => Promise<LoginResponse>;
  changePassword: (data: ChangePasswordDto) => Promise<void>;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isFirstLogin: false,
  loading: false,

  loginUser: async (data) => {
    set({ loading: true });
    try {
      const result = await login(data);

      
      set({
        user: result.username,
        accessToken: result.access,
        refreshToken: result.refresh,
        isFirstLogin: result.is_first_login,
        loading: false,
      });
      localStorage.setItem("accessToken", result.access);
      localStorage.setItem("refreshToken", result.refresh);
      return result;
    } finally {
      set({ loading: false });
    }
  },

  changePassword: async (data) => {
    set({ loading: true });
    try {
      await changePassword(data);
      set({ isFirstLogin: false });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isFirstLogin: false,
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
  },

  setAccessToken: (accessToken) => set({ accessToken }),
}));
