import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../model/store";
import { Button, Input } from "../../../shared/ui";
import { Card, CardContent, CardHeader } from "../../../shared/ui/card";
import { Eye, EyeOff } from "lucide-react";

export const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { changePassword, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Все поля обязательны");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Новый пароль и подтверждение не совпадают");
      return;
    }
    if (newPassword.length < 8) {
      setError("Новый пароль должен быть не менее 8 символов");
      return;
    }

    try {
      await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.general?.[0] || "Ошибка смены пароля");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
      <Card className="shadow-lg w-[650px] h-[650px] flex flex-col justify-center">
        <CardHeader className="flex flex-col items-center justify-center w-[500px] mx-auto">
          <h2 className="text-3xl font-medium text-gray-800">Смена пароля</h2>
          <h3 className="text-xl font-light text-[#425583]">
            Установите новый пароль
          </h3>
        </CardHeader>
        <CardContent className="space-y-4 w-[550px] mx-auto">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-2">
            <label
              htmlFor="oldPassword"
              className="text-sm font-medium text-gray-600 mb-1.5 inline-block"
            >
              Старый пароль
            </label>
            <div className="relative">
              <Input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Старый пароль"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full py-6 px-3"
              />
              <button
                type="button"
                aria-label={
                  showOldPassword ? "Скрыть пароль" : "Показать пароль"
                }
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showOldPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-600 mb-1.5 inline-block"
            >
              Новый пароль
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-6 px-3"
              />
              <button
                type="button"
                aria-label={
                  showNewPassword ? "Скрыть пароль" : "Показать пароль"
                }
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-600 mb-1.5 inline-block"
            >
              Подтверждение пароля
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Подтверждение пароля"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-6 px-3"
              />
              <button
                type="button"
                aria-label={
                  showConfirmPassword ? "Скрыть пароль" : "Показать пароль"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Смена пароля..." : "Сменить пароль"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
