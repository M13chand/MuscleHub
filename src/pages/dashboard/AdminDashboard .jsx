import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  console.log("🔹 AdminDashboard - Full User Object:", user);

  // Ensure only admin can access this page
  if (!user?.isAdmin) {
    return <p className="text-red-500 text-center">Access Denied</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Admin Panel</h1>
        <nav className="space-y-4">
          <Link
            to="/admin/users"
            className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            Users
          </Link>
          <Link
            to="/admin/trainers"
            className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            Trainers
          </Link>
          <Link
            to="/admin/courses"
            className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            Courses
          </Link>
          <Link
            to="/admin/enrollments"
            className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            Enrollments
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
