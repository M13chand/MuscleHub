import React, { useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update (e.g., make an API call)
    alert("Profile updated!");
  };

  return (
    <div className="bg-gray-900 p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-400">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
