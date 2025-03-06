import React from "react";

const CancelEnrollment = () => {
  // You can fetch the user's enrolled courses from the backend or Redux state
  const enrolledCourses = [
    { id: 1, name: "Yoga", trainer: "John Doe" },
    { id: 2, name: "Pilates", trainer: "Jane Smith" },
  ];

  return (
    <div className="bg-gray-900 p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Cancel Enrollment</h2>
      <ul className="space-y-4">
        {enrolledCourses.map((course) => (
          <li key={course.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <p>Trainer: {course.trainer}</p>
            <button className="mt-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-500">
              Cancel Enrollment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CancelEnrollment;
