import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 px-6 py-4 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-900">
      <p className="text-center md:text-left">
        © {year} <span className="font-semibold">MindTrack</span>. All rights reserved.
      </p>

      <div className="mt-2 md:mt-0 flex gap-4">
        <Link
          to="/dashboard/contact"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Contact
        </Link>
       
      </div>
    </footer>
  );
};

export default Footer;
