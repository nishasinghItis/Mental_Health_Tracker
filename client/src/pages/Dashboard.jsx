import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { theme, darkMode } = useTheme();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      <div className={`flex flex-1 bg-gradient-to-r ${theme} transition-all duration-500`}>
        <Sidebar />
        <div className="flex flex-col flex-1 bg-transparent dark:bg-gray-900">
          <Navbar onLogout={handleLogout} />
          <main className="p-6 overflow-y-auto text-gray-800 dark:text-gray-100">
            <Outlet />
          </main>
<Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
