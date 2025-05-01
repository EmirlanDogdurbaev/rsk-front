import { $api } from "../../../shared/api/axiosInstance";

export interface ChangePasswordDto {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export const changePassword = async ({
  old_password,
  new_password,
}: ChangePasswordDto): Promise<ChangePasswordResponse> => {
  const res = await $api.post("/api/auth/first-time-password/", {
    old_password,
    new_password,
  });

  console.log(res);

  return res.data;
};
