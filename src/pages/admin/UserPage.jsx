import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../features/user/userApiSlice";
import UserList from "../../features/user/UserList";
import UserDetail from "../../features/user/UserDetail";

const UserPage = () => {
  const { data: users = [], error, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        setSelectedUser(null);
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  const handleEdit = (user) => {
    // Edit logic (you can disable this too if not needed)
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

  if (users.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">No users found.</div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-yellow-500">Users Management</h2>
      </div>

      <UserList
        users={users}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />

      {selectedUser && (
        <UserDetail
          user={selectedUser}
          onEdit={() => handleEdit(selectedUser)}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserPage;
