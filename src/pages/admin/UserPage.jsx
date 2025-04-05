// src/pages/admin/UserPage.jsx
import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../features/user/userApiSlice";
import UserList from "../../features/user/UserList";
import UserDetail from "../../features/user/UserDetail";
import { Outlet, useNavigate } from "react-router-dom"; // useNavigate added

const UserPage = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate(); // for programmatic navigation

  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        setSelectedUser(null); // clear selection if deleted
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  const handleEdit = (user) => {
    navigate(`edit/${user.id}`); // Navigate to /users/edit/:id
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  if (isLoading) {
    return (
      <div className="text-yellow-500 text-center py-4">Loading users...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">Error loading users.</div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-yellow-500 mb-6">
        Users Management
      </h2>

      {users?.length > 0 ? (
        <UserList
          users={users}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-gray-400">No users found.</p>
      )}

      {selectedUser && (
        <UserDetail
          user={selectedUser}
          onEdit={() => handleEdit(selectedUser)}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* This renders the UserEditForm based on route */}
      <Outlet />
    </div>
  );
};

export default UserPage;
