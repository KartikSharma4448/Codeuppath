import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  if (isAuthLoading) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
