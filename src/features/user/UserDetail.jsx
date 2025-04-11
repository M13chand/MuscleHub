import React from "react";

const UserDetail = ({ user, onClose, onEdit }) => {
  if (!user) return null;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg mt-6 shadow-md">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">User Details</h2>

      <p className="mb-2">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-2">
        <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}
      </p>
      <p className="mb-4">
        <strong>Updated:</strong> {new Date(user.updatedAt).toLocaleString()}
      </p>

      <div className="flex gap-4">
        <button
          onClick={onEdit}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
          Edit
        </button>
        <button
          onClick={onClose}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
