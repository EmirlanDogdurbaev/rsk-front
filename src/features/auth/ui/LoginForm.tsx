import { useState } from "react";

import { useAuthStore } from "../model/store";
import { Input, Button } from "../../../shared/ui";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    <div className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Вход</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Входим..." : "Войти"}
      </Button>
    </div>
  );
};
