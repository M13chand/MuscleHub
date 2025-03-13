// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If the user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children; // If user is logged in, render the protected route
};

export default ProtectedRoute;
