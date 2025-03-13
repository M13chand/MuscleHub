import React from "react";
import { useGetAllUsersQuery } from "../user/userApiSlice";
import UserCard from "./UserCard";

const UserList = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
