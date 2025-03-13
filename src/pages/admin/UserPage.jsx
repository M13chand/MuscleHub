import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../features/user/userApiSlice"; // Adjust import path
import UserList from "../../features/user/UserList"; // Assuming you already have this component
import UserDetail from "../../features/user/UserDetail"; // Assuming you already have this component
import UserEditForm from "../../features/user/UserEditForm"; // Assuming you already have this component

const UserPage = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null); // To manage selected user for view or edit
  const [isEditing, setIsEditing] = useState(false); // Flag for edit mode

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true); // Switch to edit mode when a user is selected for editing
  };

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">
        Users Management
      </h2>

      {/* Show User List */}
      <UserList
        users={users}
        onEdit={handleEdit} // Trigger edit when a user is selected
        onDelete={handleDelete} // Trigger delete when a user is deleted
      />

      {/* Show User Details or Edit Form */}
      {selectedUser && !isEditing && (
        <UserDetail
          user={selectedUser}
          onClose={() => setSelectedUser(null)} // Close details view
          onEdit={() => setIsEditing(true)} // Switch to edit mode
        />
      )}

      {isEditing && selectedUser && (
        <UserEditForm
          user={selectedUser}
          onClose={() => setIsEditing(false)} // Close edit form
        />
      )}
    </div>
  );
};

export default UserPage;
