import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';

const Dashboard = () => {
 
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className={`flex h-screen bg-background text-primary dark:bg-darkBg dark:text-darkText`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar onLogout={handleLogout} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
