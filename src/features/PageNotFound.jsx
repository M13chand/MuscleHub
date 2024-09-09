import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  text-center px-4">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-[#FCF43D] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className=" mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <img
          src="/src/assets/pagenotfound.png"
          alt="Page Not Found"
          className="w-full h-64 object-cover mb-8"
        />
        <Link
          to="/"
          className="inline-block bg-yellow-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
