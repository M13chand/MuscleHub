import React from "react";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../features/courses/courseApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CourseList = ({ courses: propCourses, onView, onEdit }) => {
  // If props are not provided, use the hooks to fetch data
  const {
    data: fetchedCourses = [],
    isLoading,
    isError,
  } = useGetCoursesQuery(undefined, {
    skip: !!propCourses, // Skip the query if courses are provided via props
  });
  const [deleteCourse] = useDeleteCourseMutation();
  const navigate = useNavigate();

  // Use provided courses from props or fetched courses
  const courses = propCourses || fetchedCourses;

  // Debug the courses data
  console.log("Courses data:", courses);
  console.log("Fetched courses:", fetchedCourses);
  console.log("Prop courses:", propCourses);

  // Default handlers if not provided via props
  const defaultHandleView = (id) => {
    navigate(`/admin/dashboard/courses/${id}`);
  };

  const defaultHandleEdit = (id) => {
    navigate(`/admin/dashboard/courses/edit/${id}`);
  };

  // Use provided handlers or defaults
  const handleViewCourse = onView || defaultHandleView;
  const handleEditCourse = onEdit || defaultHandleEdit;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id).unwrap();
        toast.success("Course deleted successfully");
      } catch (err) {
        console.error("Failed to delete course:", err);
        toast.error(
          "Failed to delete course: " +
            (err.data?.message || err.error || "Unknown error")
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-yellow-500 text-center py-4">Loading courses...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading courses.
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">No courses found.</div>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
        Course List
      </h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="px-4 py-2 text-left text-lg">Course Name</th>
            <th className="px-4 py-2 text-left text-lg">Trainer</th>
            <th className="px-4 py-2 text-left text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr
              key={course.id || course._id}
              className="border-b border-gray-600">
              <td className="px-4 py-2">{course.name}</td>
              <td className="px-4 py-2">{course.trainer?.name || "N/A"}</td>
              <td className="px-4 py-2 flex space-x-3">
                <button
                  onClick={() => handleViewCourse(course.id || course._id)}
                  className="text-yellow-500 hover:text-yellow-400">
                  View
                </button>
                <button
                  onClick={() => handleEditCourse(course.id || course._id)}
                  className="text-yellow-500 hover:text-yellow-400">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id || course._id)}
                  className="text-red-500 hover:text-red-400">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
