import { Routes, Route } from "react-router-dom";
import { LoginForm } from "../features/auth/ui/LoginForm";
import { Layout } from "./Layout";
import CollateralCreate from "../pages/CollateralCreate/ui";
import PledgorsPage from "../pages/PledgorsPage";

function App() {
  const isAuth = true;
  if (!isAuth) return <LoginForm />;
  return (
    <Layout>
      <Routes>
        <Route path="/directory/pledgors" element={<PledgorsPage />} />
        <Route path="/collateral/" element={<CollateralCreate />} />
      </Routes>
    </Layout>
  );
}

export default App;
