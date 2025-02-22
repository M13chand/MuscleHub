import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../features/courses/courseApiSlice"; // Adjust path if necessary

const CourseDetail = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const { data: course, error, isLoading } = useGetCourseByIdQuery(id);

  if (isLoading) return <p>Loading course details...</p>;
  if (error) return <p>Error loading course details</p>;

  return (
    <div className="course-detail p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-yellow-500">{course?.name}</h1>
      <p className="text-yellow-500">Trainer: {course?.trainer?.name}</p>
      <p className="text-gray-300">{course?.description}</p>
      <p className="text-gray-300">Level: {course?.level}</p>
      <p className="text-gray-300">Duration: {course?.duration}</p>
      <p className="text-gray-300">Schedule: {course?.schedule?.join(", ")}</p>
      <p className="text-gray-300">Capacity: {course?.capacity}</p>
      <p className="text-gray-300">Type: {course?.type}</p>
    </div>
  );
};

export default CourseDetail;
