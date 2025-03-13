// src/components/users/UserDetail.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "./userApiSlice";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (error) {
      navigate("/users"); // Redirect if user not found
    }
  }, [error, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user details</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <strong className="text-sm font-medium text-gray-700">
            Username:{" "}
          </strong>
          <p className="text-gray-900">{user.username}</p>
        </div>

        <div className="mb-4">
          <strong className="text-sm font-medium text-gray-700">Email: </strong>
          <p className="text-gray-900">{user.email}</p>
        </div>

        <div className="mb-4">
          <strong className="text-sm font-medium text-gray-700">Admin: </strong>
          <p className="text-gray-900">{user.isAdmin ? "Yes" : "No"}</p>
        </div>

        <div className="mb-4">
          <strong className="text-sm font-medium text-gray-700">
            Created At:{" "}
          </strong>
          <p className="text-gray-900">
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mb-4">
          <strong className="text-sm font-medium text-gray-700">
            Updated At:{" "}
          </strong>
          <p className="text-gray-900">
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
