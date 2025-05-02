import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/model/store";
import { LoginForm } from "../features/auth/ui/LoginForm";
import { ChangePasswordForm } from "../features/auth/ui/ChangePasswordForm";
import PledgorsPage from "../pages/PledgorsPage";
import { Pledgees } from "../features/Pledgees/ui/Pledgees";
import CollateralCreate from "../pages/CollateralCreate/ui";
import { Borrowers } from "../pages/Borrowers/Borrowers";
import { Layout } from "./Layout";
import { ChangeHistory } from "../features/ChangeHistory/ui/ChangeHistory";

function App() {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/change-password" element={<ChangePasswordForm />} />
      <Route element={<Layout />}>
        <Route path="/pledgors" element={<Pledgees />} />
        <Route path="/borrowers" element={<Borrowers />} />
        <Route path="/collateral" element={<CollateralCreate />} />
        <Route path="/directory/pledgors" element={<PledgorsPage />} />
        <Route path="/change-history" element={<ChangeHistory />} />

        <Route
          path="*"
          element={<Navigate to="/directory/pledgors" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;
