import React from "react";
import { useGetCoursesQuery } from "../../features/courses/courseApiSlice";

const CourseList = () => {
  const { data: courses, error, isLoading } = useGetCoursesQuery();

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Failed to load courses. Please try again later.</p>;

  return (
    <div>
      <h1>Courses</h1>
      {courses && courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>{course.name}</li>
          ))}
        </ul>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CourseList;
