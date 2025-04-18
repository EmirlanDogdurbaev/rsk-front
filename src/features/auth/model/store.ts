import { create } from "zustand";
import { login, LoginDto } from "./loginService";

interface AuthState {
  user: string | null;
  loading: boolean;
  loginUser: (data: LoginDto) => Promise<{ token: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  loginUser: async (data) => {
    set({ loading: true });
    const result = await login(data);
    set({ user: data.email, loading: false });
    return result;
  },
}));
