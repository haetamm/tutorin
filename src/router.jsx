import GuestLayout from "./layout/GuestLayout";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RegisterTutorPage from "./pages/RegisterTutorPage";
import RegisterStudentPage from "./pages/RegisterStudentPage";
import AuthLayout from "./layout/AuthLayout";
import HomePage from "./pages/HomePage";
import JobDetailPage from "./pages/JobDetailPage";
import StudentLayout from "./layout/StudentLayout";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import NotificationDetailPage from "./pages/NotificationDetailPage";
import CreateJobPage from "./pages/CreateJobPage";
import ApplicationPage from "./pages/ApplicationPage";
import DefaultLayout from "./layout/DefaultLayout";
import LandingPage from "./pages/LandingPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TutorLayout from "./layout/TutorLayout";

const routerConfig = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <GuestLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="login" />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register/tutor",
            element: <RegisterTutorPage />,
          },
          {
            path: "register/student",
            element: <RegisterStudentPage />,
          },
        ],
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "/in",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="student" replace />,
      },
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="profile" replace />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "notifications",
            element: <NotificationPage />,
            children: [
              {
                path: "",
                element: <Navigate to="list" replace />,
              },
              {
                path: ":id",
                element: <NotificationDetailPage />,
              },
            ],
          },
          {
            path: "create/job",
            element: <CreateJobPage />,
          },
        ],
      },
      {
        path: "home",
        element: <HomePage />,
        children: [
          {
            path: "",
            element: <Navigate to="job/list" replace />,
          },
          {
            path: "job/:id",
            element: <JobDetailPage />,
          },
        ],
      },
      {
        path: "tutor",
        element: <TutorLayout />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "applications",
            element: <ApplicationPage />,
          },
          {
            path: "notifications",
            element: <NotificationPage />,
            children: [
              {
                path: "",
                element: <Navigate to="list" replace />,
              },
              {
                path: ":id",
                element: <NotificationDetailPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
