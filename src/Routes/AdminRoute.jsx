/** @format */

import React from "react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <progress className="progress progress-info w-full"></progress>
      </div>
    );
  }

  if (user || isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
