import { Routes, Route } from "react-router-dom";
import { LoginForm } from "../features/auth/ui/LoginForm";
import Dashboard from "../pages/Dashboard";
import { Layout } from "./Layout";
import CollateralCreate from "../features/CollateralCreate/ui";

function App() {
  const isAuth = true;
  if (!isAuth) return <LoginForm />;
  return (
    <Layout>
      <Routes>
        {/* <Route path="/collateral" element={<Dashboard />} /> */}
        + <Route path="/collateral/" element={<CollateralCreate />} />
      </Routes>
    </Layout>
  );
}

export default App;
