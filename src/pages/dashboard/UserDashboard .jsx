import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">
          User Dashboard
        </h1>
        <nav className="space-y-4">
          <Link
            to="/dashboard/my-courses"
            className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            My Courses
          </Link>
          <Link
            to="/dashboard/cancel-enrollment"
            className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            Cancel Enrollment
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
