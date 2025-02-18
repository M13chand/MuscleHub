// src/components/users/UserCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <div className="mt-4 flex justify-between">
        <Link
          to={`/users/${user.id}`}
          className="text-blue-500 hover:underline">
          View Details
        </Link>
        <Link
          to={`/users/${user.id}/edit`}
          className="text-green-500 hover:underline">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
