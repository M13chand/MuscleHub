import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // To check the auth state
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const RootLayout = () => {
  // Get authentication details from Redux state
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token; // Check if there's a token (user is logged in)

  // Debugging output
  console.log("Token:", token);
  console.log("Is Authenticated:", isAuthenticated);
  console.log("User:", user);

  return (
    <div>
      {/* Conditionally render Header only if authenticated */}
      {!isAuthenticated && <Header />}{" "}
      {/* Show Header only if not authenticated */}
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
