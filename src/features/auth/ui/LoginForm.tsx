import { useState } from "react";
import { useAuthStore } from "../model/store";

import Logo from "../../../shared/assets/logo.svg";
import bg from "../../../shared/assets/bg.png";
import { Button, Input } from "../../../shared/ui";
import { Card, CardContent, CardHeader } from "../../../shared/ui/card";
import { Eye, EyeOff } from "lucide-react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const { loginUser, loading } = useAuthStore();

  const handleSubmit = async () => {
    setError(null);
    try {
      const result = await loginUser({ email, password });
      console.log("Успешный вход! Токен:", result.token);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Ошибка авторизации");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card className=" shadow-lg w-[650px] h-[550px] flex flex-col justify-center">
        <CardHeader className="flex flex-col items-center justify-center w-[500px] mx-auto">
          <img src={Logo} alt="Bank Logo" className=" mb-4" />
          <h2 className="text-3xl font-medium text-gray-800">
            Система регистрации заемов
          </h2>
          <h3 className="text-xl font-light text-[#425583]">Авторизация</h3>
        </CardHeader>
        <CardContent className="space-y-4  w-[550px] mx-auto">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600 mb-1.5 inline-block"
            >
              Логин
            </label>
            <Input
              id="email"
              placeholder="Логин"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full  py-6 px-3"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600  mb-1.5 inline-block"
              >
                Пароль
              </label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full   py-6 px-3"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-center space-x-2 justify-end mt-2.5">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Запомнить меня
              </label>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Входим..." : "Войти"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
