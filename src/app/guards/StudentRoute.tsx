import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function StudentRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!user || user.role !== "student") {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  if (!user.onboardingCompleted && location.pathname !== "/student/onboarding") {
    return <Navigate to="/student/onboarding" replace />;
  }

  return <Outlet />;
}
