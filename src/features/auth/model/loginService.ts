import { $api } from "../../../shared/api/axiosInstance";

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  username: string;
  is_first_login: boolean;
}

export const login = async ({
  username,
  password,
}: LoginDto): Promise<LoginResponse> => {
  const res = await $api.post("/api/auth/login/", { username, password });
  return res.data;
};
