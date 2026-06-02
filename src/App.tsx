import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import ProtectedRoute from "./components/ProtectRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      {/* Route sang Login Page - Khi vào http://localhost:5173/login → render LoginPage */}
      <Route path="/login" element={<LoginPage />} />

      {/* Route được bảo vệ */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />

      {/* Route Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;