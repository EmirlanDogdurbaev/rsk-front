import { api } from "../../../shared/api/axiosInstance";

export interface LoginDto {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginDto): Promise<{ token: string }> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};
