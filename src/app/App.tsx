import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "../features/auth/ui/LoginForm";
import { Layout } from "./Layout";
import Dashboard from "../pages/Dashboard";

const App = () => {
  const isAuth = true;
  return (
    <>
      {isAuth ? (
        <Layout>
          <Routes>
            <Route path="/collateral" element={<Dashboard />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default App;
