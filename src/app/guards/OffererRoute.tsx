import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function OffererRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!user || user.role !== "offerer") {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  if (!user.onboardingCompleted && location.pathname !== "/offerer/onboarding") {
    return <Navigate to="/offerer/onboarding" replace />;
  }

  return <Outlet />;
}
