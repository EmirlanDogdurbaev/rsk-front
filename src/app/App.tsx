import { Routes, Route } from "react-router-dom";
import { LoginForm } from "../features/auth/ui/LoginForm";
import { Layout } from "./Layout";
import CollateralCreate from "../pages/CollateralCreate/ui";

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
