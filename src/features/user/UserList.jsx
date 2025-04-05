// src/features/user/UserList.jsx
import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users, onEdit, onView, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users?.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default UserList;
