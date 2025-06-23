import { NavLink } from 'react-router-dom';
import {
  
  Home,
  PlusCircle,
  BarChart2,
  Bot,
  Stethoscope,
  Mail,
} from 'lucide-react';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-2.5 px-4 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-gray-800'
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-lg p-4 h-full border-r border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold mb-6 text-gray-600 dark:text-gray-100">Your Activity</h1>
      <nav className="space-y-2">
        <NavLink to="/dashboard" end className={linkClass}>
          <Home className="text-blue-500 w-5 h-5" />
          Home
        </NavLink>
        <NavLink to="/dashboard/entry" className={linkClass}>
          <PlusCircle className="text-green-500 w-5 h-5" />
          Anxiety Journal
        </NavLink>
        <NavLink to="/dashboard/charts" className={linkClass}>
          <BarChart2 className="text-yellow-500 w-5 h-5" />
          Mood Tracker
        </NavLink>
        <NavLink to="/dashboard/chat" className={linkClass}>
          <Bot className="text-purple-500 w-5 h-5" />
          AI Therapist
        </NavLink>
        <NavLink to="/dashboard/consultation" className={linkClass}>
          <Stethoscope className="text-pink-500 w-5 h-5" />
          Consultation
        </NavLink>
        <NavLink to="/dashboard/contact" className={linkClass}>
          <Mail className="text-indigo-500 w-5 h-5" />
          Contact Us
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
