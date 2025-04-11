import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
