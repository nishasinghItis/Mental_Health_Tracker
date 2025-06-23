import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import {ScanHeart}from 'lucide-react';
const Navbar = ({ onLogout }) => {
  return (
    <div className="w-full bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
     <h1 className="text-xl font-semibold flex items-center space-x-2">
  <ScanHeart className="w-6 h-6 text-red-300" />
  <span>Talk-Space</span>
</h1>


      <div className="flex items-center space-x-4">
        <Link
          to="/dashboard/profile"
          className="flex items-center hover:underline text-sm"
        >
          <User className="w-4 h-4 mr-1" />
          Profile
        </Link>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
