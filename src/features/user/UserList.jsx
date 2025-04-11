import React from "react";
import { useGetAllUsersQuery, useDeleteUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserList = ({ users: propUsers, onEdit, onView, onDelete }) => {
  // If props are not provided, use the hooks to fetch data
  const {
    data: fetchedUsers = [],
    isLoading,
    isError,
  } = useGetAllUsersQuery(undefined, {
    skip: !!propUsers, // Skip the query if users are provided via props
  });
  const [deleteUserMutation] = useDeleteUserMutation();
  const navigate = useNavigate();

  // Use provided users from props or fetched users
  const users = propUsers || fetchedUsers;

  // Default handlers if not provided via props
  const defaultHandleEdit = (user) => {
    navigate(`/admin/dashboard/users/edit/${user.id || user._id}`);
  };

  const defaultHandleView = (user) => {
    // Could implement a view action or just log
    console.log("View user:", user);
  };

  const defaultHandleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserMutation(id).unwrap();
        toast.success("User deleted successfully");
      } catch (err) {
        console.error("Failed to delete user:", err);
        toast.error("Failed to delete user");
      }
    }
  };

  // Use provided handlers or defaults
  const handleEdit = onEdit || defaultHandleEdit;
  const handleView = onView || defaultHandleView;
  const handleDelete = onDelete || defaultHandleDelete;

  if (isLoading) {
    return (
      <div className="text-yellow-500 text-center py-4">Loading users...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-4">Error loading users.</div>
    );
  }
  return (
    <div className="overflow-x-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-yellow-500 mb-4">User List</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="px-4 py-2 text-left text-lg">Username</th>
            <th className="px-4 py-2 text-left text-lg">Email</th>
            <th className="px-4 py-2 text-left text-lg">Role</th>
            <th className="px-4 py-2 text-left text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id || user._id} className="border-b border-gray-600">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.isAdmin ? "Admin" : "User"}</td>
              <td className="px-4 py-2 flex space-x-3">
                <button
                  onClick={() => handleView(user)}
                  className="text-yellow-500 hover:text-yellow-400">
                  <i className="fas fa-eye"></i> View
                </button>
                <button
                  onClick={() => handleEdit(user)}
                  className="text-yellow-500 hover:text-yellow-400">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id || user._id)}
                  className="text-red-500 hover:text-red-400">
                  <i className="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
