import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCoursesQuery } from "../../features/courses/courseApiSlice";
import CourseList from "../../features/courses/CoursesList";
import LoadingSpinner from "../../components/LoadingSpinner";
import TestCourses from "../../components/TestCourses";

const CoursesPage = () => {
  console.log("CoursesPage component rendered");
  const navigate = useNavigate();
  const { data: courses = [], isLoading, error } = useGetCoursesQuery();

  const handleView = (id) => {
    navigate(`/admin/dashboard/courses/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/courses/edit/${id}`);
  };

  const handleAddNew = () => {
    navigate("/admin/dashboard/courses/add");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading courses: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-500">
          Courses Management
        </h1>
        <button
          onClick={handleAddNew}
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">
          Add New Course
        </button>
      </div>

      <CourseList courses={courses} onView={handleView} onEdit={handleEdit} />
    </div>
  );
};

export default CoursesPage;
