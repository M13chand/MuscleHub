// src/features/user/UserCard.jsx
import React from "react";

const UserCard = ({ user, onView, onEdit, onDelete }) => {
  if (!user || !user.id) {
    return <p className="text-red-500">Invalid user data</p>;
  }

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold text-yellow-500">
        {user.username?.trim() || "No Name"}
      </h2>
      <p className="text-sm text-gray-400">{user.email || "No Email"}</p>

      <div className="mt-4 flex justify-between text-sm">
        <button
          onClick={() => onView(user)}
          className="text-yellow-400 hover:underline">
          View
        </button>
        <button
          onClick={() => onEdit(user)}
          className="text-green-400 hover:underline">
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="text-red-400 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
