import { Navigate } from "react-router-dom";
import { useAuthStore } from "../model/store";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const FirstLogin = () => {
  const { isFirstLogin, accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (!isFirstLogin) {
    return <Navigate to="/directory/pledgors" replace />;
  }

  return <ChangePasswordForm />;
};
