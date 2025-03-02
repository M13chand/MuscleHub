import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Dashboard</h1>
        <nav className="space-y-4">
          {isAdmin ? (
            <>
              <Link
                to="/dashboard/users"
                className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Users
              </Link>
              <Link
                to="/dashboard/trainers"
                className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Trainers
              </Link>
              <Link
                to="/dashboard/courses"
                className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Courses
              </Link>
              <Link
                to="/dashboard/enrollments"
                className="block p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Enrollments
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* This will render the selected dashboard page */}
      </main>
    </div>
  );
};

export default Dashboard;
