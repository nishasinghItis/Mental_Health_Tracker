import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';

const RecentMoodFeed = () => {
  const { user } = useContext(AuthContext);
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/moods', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sorted = res.data.slice(-5).reverse(); // latest 5 entries
        setMoods(sorted);
      } catch (err) {
        console.error('Failed to fetch moods:', err);
      }
    };

    fetchMoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/moods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMoods((prev) => prev.filter((mood) => mood._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete entry.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        📝 Recent Mood Entries
      </h3>

      {moods.length === 0 ? (
        <p className="text-gray-500 italic">No mood entries yet.</p>
      ) : (
        <ul className="space-y-4">
          {moods.map((mood) => (
            <li
              key={mood._id}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-base font-medium capitalize text-gray-800 dark:text-gray-100">
                  {mood.mood || 'N/A'}
                </span>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(mood.date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(mood._id)}
                    title="Delete entry"
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {mood.note && (
                <p className="text-sm text-gray-600 dark:text-gray-300">{mood.note}</p>
              )}

              <div className="text-xs text-indigo-500 mt-2">
                Intensity: {mood.intensity}/10
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentMoodFeed;
