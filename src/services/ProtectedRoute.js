import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard/home" replace />;
  }

  // Si viene children, lo renderizamos (para subrutas)
  return children ? children : <Outlet />;
};
