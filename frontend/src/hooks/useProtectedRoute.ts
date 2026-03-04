import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import type { UserRole } from "../types";

export function useProtectedRoute(requiredRole?: UserRole) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    if (requiredRole && user?.role !== requiredRole) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, navigate, requiredRole]);
}
