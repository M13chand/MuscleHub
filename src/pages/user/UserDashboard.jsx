import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../app/authSlice";
import { toast } from "react-toastify";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBook,
  FaChalkboardTeacher,
} from "react-icons/fa"; // Icons for better UI
import { useGetCoursesQuery } from "../../features/courses/courseApiSlice"; // Import the hook

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: courses, isLoading, isError } = useGetCoursesQuery(); // Use the hook to get courses
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

  if (isLoading) {
    return <p className="text-center">Loading courses...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">
        Failed to load courses. Please try again later.
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
          {/* Loop through courses and display them */}
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <Link
                key={course._id} // Use __id as key since it's the _identifier from MongoDB
                to={`courses`} // Link to specific course by __id
                className="flex items-center p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                <FaBook className="mr-2" /> {course.name}
              </Link>
            ))
          ) : (
            <p className="text-gray-400">No courses available</p>
          )}
          <Link
            to="enrollments"
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
          onClick={handleLogout}
          className="flex items-center p-2 mt-6 bg-red-600 text-white rounded-lg hover:bg-red-500 w-full">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
