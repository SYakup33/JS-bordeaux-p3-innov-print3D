import type { JSX } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const { currentUser, isLogged } = useAuth();

  if (!isLogged) {
    return setTimeout(() => {
      <Navigate to="/login" />;
    }, 500);
  }

  if (currentUser?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedAdminRoute;
