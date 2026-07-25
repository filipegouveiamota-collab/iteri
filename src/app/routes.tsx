import { createBrowserRouter } from "react-router";

import PublicLayout from "./layouts/PublicLayout";
import StudentLayout from "./layouts/StudentLayout";
import OffererLayout from "./layouts/OffererLayout";
import StudentRoute from "./guards/StudentRoute";
import OffererRoute from "./guards/OffererRoute";

import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import RegisterStudentPage from "./pages/public/RegisterStudentPage";
import RegisterOffererPage from "./pages/public/RegisterOffererPage";
import OpportunityDetailPage, { opportunityDetailLoader } from "./pages/public/OpportunityDetailPage";

import StudentOnboardingPage from "./pages/student/OnboardingPage";
import FeedPage from "./pages/student/FeedPage";
import ApplicationsPage from "./pages/student/ApplicationsPage";
import ProfilePage from "./pages/student/ProfilePage";

import OffererOnboardingPage from "./pages/offerer/OnboardingPage";
import OffererProfilePage from "./pages/offerer/ProfilePage";
import DashboardPage from "./pages/offerer/DashboardPage";
import OpportunitiesPage from "./pages/offerer/OpportunitiesPage";
import NewOpportunityPage from "./pages/offerer/NewOpportunityPage";
import EditOpportunityPage, { editOpportunityLoader } from "./pages/offerer/EditOpportunityPage";
import CandidatesPage, { candidatesLoader } from "./pages/offerer/CandidatesPage";
import CandidateProfilePage, { candidateProfileLoader } from "./pages/offerer/CandidateProfilePage";

import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/register/student", element: <RegisterStudentPage /> },
      { path: "/register/offerer", element: <RegisterOffererPage /> },
      {
        path: "/opportunities/:id",
        element: <OpportunityDetailPage />,
        loader: opportunityDetailLoader,
      },
    ],
  },
  {
    path: "/student",
    element: <StudentRoute />,
    children: [
      {
        element: <StudentLayout />,
        children: [
          { path: "onboarding", element: <StudentOnboardingPage /> },
          { path: "feed", element: <FeedPage /> },
          { path: "applications", element: <ApplicationsPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: "/offerer",
    element: <OffererRoute />,
    children: [
      {
        element: <OffererLayout />,
        children: [
          { path: "onboarding", element: <OffererOnboardingPage /> },
          { path: "profile", element: <OffererProfilePage /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "opportunities", element: <OpportunitiesPage /> },
          { path: "opportunities/new", element: <NewOpportunityPage /> },
          {
            path: "opportunities/:id/edit",
            element: <EditOpportunityPage />,
            loader: editOpportunityLoader,
          },
          {
            path: "opportunities/:id/candidates",
            element: <CandidatesPage />,
            loader: candidatesLoader,
          },
          {
            path: "opportunities/:id/candidates/:candidateId",
            element: <CandidateProfilePage />,
            loader: candidateProfileLoader,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
