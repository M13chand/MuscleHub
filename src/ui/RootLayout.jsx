import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // useLocation for route info
import { useSelector } from "react-redux"; // To check the auth state
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const RootLayout = () => {
  // Get authentication details from Redux state
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token; // Check if there's a token (user is logged in)

  // Get current route using useLocation
  const location = useLocation();

  // Check if the current route is the dashboard or any route you want to exclude
  const isDashboard = location.pathname.includes("/dashboard");

  return (
    <div>
      {/* Conditionally render Header only if authenticated and not on the dashboard */}
      {isAuthenticated && !isDashboard && <Header />}{" "}
      {/* Show Header only if authenticated and not on dashboard */}
      <ToastContainer
        position="top-right"
        autoClose={700}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
      />
      {/* This will render the current route */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
