import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import RoomDetails from "@/pages/RoomDetails";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "rooms/:id", element: <RoomDetails /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },
  {
    path: "/auth",
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
        ],
      }

    ]
  },
]);
