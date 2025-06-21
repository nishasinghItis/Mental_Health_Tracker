import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">

          <Outlet /> {/* This will load sub-pages like MoodEntry, Charts, etc */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
