import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCoursesQuery, useDeleteCourseMutation } from "./courseApiSlice";

const CourseList = () => {
  const navigate = useNavigate();
  const { data: courses, isLoading, error } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

  if (isLoading) return <p>Loading courses...</p>;
  // if (error) return <p>Error fetching courses!</p>;

  const handleEdit = (id) => {
    navigate(`/courses/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">Course List</h2>
      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-yellow-500">
            <th className="p-2">Name</th>
            <th className="p-2">Trainer</th>
            <th className="p-2">Level</th>
            <th className="p-2">Duration</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr key={course.id} className="border-b border-gray-700">
              <td className="p-2">{course.name}</td>
              <td className="p-2">{course.trainer}</td>
              <td className="p-2">{course.level}</td>
              <td className="p-2">{course.duration}</td>
              <td className="p-2">
                <button
                  className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg mr-2"
                  onClick={() => handleEdit(course.id)}>
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleDelete(course.id)}>
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
