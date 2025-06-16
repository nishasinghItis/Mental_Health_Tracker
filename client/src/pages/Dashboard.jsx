import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Welcome, {user?.name || 'User'} 👋</h2>
      <p>This is your mental health dashboard.</p>

      {/* Later: Add mood journaling, chart, and AI summary */}
    </div>
  );
};

export default Dashboard;
