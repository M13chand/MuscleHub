// src/utils/handleLogout.js
import { toast } from "react-toastify";
import { logout } from "../app/authSlice";

// This function accepts dispatch and navigate as parameters
export const handleLogout = (dispatch, navigate) => {
  const isConfirmed = window.confirm("Are you sure you want to log out?");

  if (isConfirmed) {
    dispatch(logout());
    toast.success("Successfully logged out! 👋");
    navigate("/login", { replace: true });
  } else {
    toast.info("Logout canceled");
  }
};
