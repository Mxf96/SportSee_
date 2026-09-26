import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/protected-layout.scss";

export default function ProtectedLayout() {
  const { isAuthenticated, isAuthReady } = useAuth();

  const location = useLocation();

  if (!isAuthReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <div className="protected-layout">
      <Header />

      <main className="protected-layout__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
