import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { theme, darkMode } = useTheme();

  return (
    <div className="flex h-screen">
      <div className={`flex flex-1 bg-gradient-to-r ${theme} transition-all duration-500`}>
        <Sidebar />
        <div className="flex flex-col flex-1 bg-transparent dark:bg-gray-900 ...">

          <Navbar />
          <main className="p-6 overflow-y-auto text-gray-800 dark:text-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
