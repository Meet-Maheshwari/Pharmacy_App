import React from "react";

const Loader = ({ message = "" }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        className="w-16 h-16 animate-spin"
        src="https://www.svgrepo.com/show/70469/loading.svg"
        alt="Loading..."
      />
      <p className="text-green-600 text-lg font-medium">{message}</p>
    </div>
  );
};

export default Loader;
