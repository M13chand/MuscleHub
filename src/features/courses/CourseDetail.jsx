import React from "react";

const CourseDetail = ({ course, onEdit, onDelete, onClose }) => {
  if (!course) {
    return <p className="text-gray-400">No course details available</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h3 className="text-2xl font-bold text-yellow-500 mb-4">{course.name}</h3>
      <p className="text-gray-300 mb-2">
        <strong>Description:</strong> {course.description}
      </p>
      <p className="text-gray-300 mb-2">
        <strong>Trainer:</strong> {course.trainer?.name || course.trainer}
      </p>
      <p className="text-gray-300 mb-2">
        <strong>Level:</strong> {course.level}
      </p>
      <p className="text-gray-300 mb-2">
        <strong>Duration:</strong> {course.duration}
      </p>
      <p className="text-gray-300 mb-2">
        <strong>Type:</strong> {course.type}
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Capacity:</strong> {course.capacity}
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(course)}
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400 font-bold">
          Edit
        </button>
        <button
          onClick={() => onDelete(course.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400">
          Delete
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">
          Close
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
