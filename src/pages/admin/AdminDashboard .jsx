import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../app/authSlice"; // Import logout action

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Hook for dispatching actions
  const navigate = useNavigate();

  console.log("🔹 AdminDashboard - Full User Object:", user);

  // Redirect non-admin users
  if (!user?.isAdmin) {
    navigate("/admin/dashboard");
    return null;
  }

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-5">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Admin Panel</h1>
        <nav className="space-y-3">
          <NavLink
            to="users"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 hover:bg-gray-600"
              }`
            }>
            Users
          </NavLink>
          <NavLink
            to="/trainers"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 hover:bg-gray-600"
              }`
            }>
            Trainers
          </NavLink>
          <NavLink
            to="courses"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 hover:bg-gray-600"
              }`
            }>
            Courses
          </NavLink>
          <NavLink
            to="enrollments"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 hover:bg-gray-600"
              }`
            }>
            Enrollments
          </NavLink>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white">
          Logout
        </button>
      </aside>

      {/* Content Section */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
