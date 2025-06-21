// ProgressCharts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ProgressCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/moods', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        // Prepare chart data
        const labels = data.map(entry => new Date(entry.createdAt).toLocaleDateString());
        const moodValues = data.map(entry => {
          switch (entry.mood) {
            case 'Happy': return 5;
            case 'Neutral': return 3;
            case 'Sad': return 2;
            case 'Anxious': return 1;
            case 'Angry': return 0;
            default: return 3;
          }
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Mood Over Time',
              data: moodValues,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.4,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch mood data:', error);
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Mood Progress Chart</h2>
      {loading ? (
        <p>Loading chart...</p>
      ) : chartData ? (
        <Line data={chartData} />
      ) : (
        <p>No mood data available to display.</p>
      )}
    </div>
  );
};

export default ProgressCharts;
