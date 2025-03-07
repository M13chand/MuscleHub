import React from "react";

const MyCourses = () => {
  const enrolledCourses = [
    { id: 1, name: "Yoga", trainer: "John Doe", status: "Active" },
    { id: 2, name: "Pilates", trainer: "Jane Smith", status: "Completed" },
  ];

  return (
    <div className="bg-gray-900 p-6 text-white">
      <h2 className="text-xl font-bold mb-4">My Courses</h2>
      <ul className="space-y-4">
        {enrolledCourses.map((course) => (
          <li key={course.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <p>Trainer: {course.trainer}</p>
            <p>Status: {course.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCourses;
