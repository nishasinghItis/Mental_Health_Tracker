import React from 'react';

const Navbar = ({ onLogout }) => {
  return (
    <div className="w-full bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">🧠 MindTrack</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
