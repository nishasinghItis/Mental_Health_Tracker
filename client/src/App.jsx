import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// ✅ Import sub-pages (you'll create these shortly)
import Welcome from './pages/Welcome';
import NewMoodEntry from './pages/NewMoodEntry';
import ProgressCharts from './pages/ProgressCharts';
import AIChatSupport from './pages/AIChatSupport';
import Consultation from './pages/Consultation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard and nested routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Welcome />} /> {/* /dashboard */}
        <Route path="entry" element={<NewMoodEntry />} /> {/* /dashboard/entry */}
        <Route path="charts" element={<ProgressCharts />} /> {/* /dashboard/charts */}
        <Route path="chat" element={<AIChatSupport />} /> {/* /dashboard/chat */}
        <Route path="consultation" element={<Consultation />} /> {/* /dashboard/consultation */}
      </Route>
    </Routes>
  );
}

export default App;
