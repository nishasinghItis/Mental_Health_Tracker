import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block py-2.5 px-4 rounded-lg text-sm font-medium transition ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
    }`;

  return (
    <aside className="w-64 bg-white shadow-lg p-4 h-full">
      <h2 className="text-xl font-bold mb-6">Your Dashboard</h2>
      <nav className="space-y-2">
        <NavLink to="/dashboard" end className={linkClass}>Dashboard</NavLink>
<NavLink to="/dashboard/entry" className={linkClass}>New Mood Entry</NavLink>
        <NavLink to="/dashboard/charts" className={linkClass}>Progress Charts</NavLink>
        <NavLink to="/dashboard/chat" className={linkClass}>AI Chat Support</NavLink>
        <NavLink to="/dashboard/consultation" className={linkClass}>Consultation</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
