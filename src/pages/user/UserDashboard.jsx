import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../app/authSlice";
import { handleLogout } from "../../utils/handleLogout";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBook,
  FaChalkboardTeacher,
} from "react-icons/fa"; // Icons for better UI
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out! 👋");
    navigate("/login", { replace: true });
  };

  if (!user) {
    return (
      <p className="text-red-500 text-center">
        Please log in to access your dashboard.
      </p>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">
          User Dashboard
        </h1>
        <nav className="space-y-4">
          <Link
            to="mycourses"
            className="flex items-center p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <FaBook className="mr-2" /> My Courses
          </Link>
          <Link
            to="cancelenrollment"
            className="flex items-center p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <FaChalkboardTeacher className="mr-2" /> Cancel Enrollment
          </Link>
          <Link
            to="trainers"
            className="flex items-center p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <FaUserCircle className="mr-2" /> Trainers
          </Link>
          <Link
            to="profile"
            className="flex items-center p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <FaUserCircle className="mr-2" /> Profile
          </Link>
        </nav>
        <button
          onClick={() => handleLogout(dispatch, navigate)}
          className="flex items-center p-2 mt-6 bg-red-600 text-white rounded-lg hover:bg-red-500 w-full">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-6">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
    </div>
  );
};

export default UserDashboard;
