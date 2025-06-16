import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'New Mood Entry', path: '/dashboard/entry' },
    { label: 'Progress Charts', path: '/dashboard/charts' },
    { label: 'AI Chat Support', path: '/dashboard/chat' },
    { label: 'Consultation', path: '/dashboard/consultation' },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full px-4 py-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Mental Health Tracker</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block p-2 rounded-lg transition ${
                pathname === item.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
