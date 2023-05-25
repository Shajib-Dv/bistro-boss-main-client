/** @format */

import React, { useContext } from "react";
import { authContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(authContext);

  if (loading) {
    return <progress className="progress progress-info w-56"></progress>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
