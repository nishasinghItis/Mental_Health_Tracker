import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Line, Bar, Pie, Chart as ChartJS
} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { LineChart, Activity, Flame, Smile, BarChart3, LayoutDashboard } from 'lucide-react';

Chart.register(...registerables);

const ProgressCharts = () => {
  const [moodData, setMoodData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('mood');
  const [chartData, setChartData] = useState(null);
  const [chartConclusion, setChartConclusion] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMoodEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/moods', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMoodData(res.data);
    } catch (error) {
      console.error('Failed to fetch mood data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  useEffect(() => {
    if (!moodData || moodData.length === 0) return;

    let labels = [];
    let data = [];

    switch (selectedChart) {
      case 'mood':
        labels = moodData.map(entry =>
          new Date(entry.createdAt).toLocaleDateString()
        );
        data = moodData.map(entry => {
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
          datasets: [{
            label: 'Mood Over Time',
            data,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
            tension: 0.3
          }]
        });
        setChartConclusion("This line chart shows how your mood has fluctuated over time.");
        break;

      case 'intensity':
        labels = moodData.map(entry =>
          new Date(entry.createdAt).toLocaleDateString()
        );
        data = moodData.map(entry => entry.intensity || 0);
        setChartData({
          labels,
          datasets: [{
            label: 'Mood Intensity',
            data,
            backgroundColor: 'rgba(255,99,132,0.5)',
            borderColor: 'rgba(255,99,132,1)',
            fill: true,
            tension: 0.3,
          }]
        });
        setChartConclusion("This chart represents the strength of your emotional states across different days.");
        break;

      case 'triggers':
        const triggerCount = {};
        moodData.forEach(entry => {
          if (entry.trigger) {
            triggerCount[entry.trigger] = (triggerCount[entry.trigger] || 0) + 1;
          }
        });
        labels = Object.keys(triggerCount);
        data = Object.values(triggerCount);
        setChartData({
          labels,
          datasets: [{
            label: 'Trigger Frequency',
            data,
            backgroundColor: 'rgba(54,162,235,0.6)'
          }]
        });
        setChartConclusion("This bar chart highlights which triggers are affecting your mood most often.");
        break;

      case 'activities':
        const activityCount = {};
        moodData.forEach(entry => {
          if (Array.isArray(entry.activities)) {
            entry.activities.forEach(activity => {
              activityCount[activity] = (activityCount[activity] || 0) + 1;
            });
          }
        });
        labels = Object.keys(activityCount);
        data = Object.values(activityCount);

        if (labels.length === 0) {
          setChartData(null);
          setChartConclusion("No activity data available.");
          break;
        }

        setChartData({
          labels,
          datasets: [{
            label: 'Activity Frequency',
            data,
            backgroundColor: 'rgba(153,102,255,0.6)'
          }]
        });
        setChartConclusion("This chart shows the most frequent activities associated with your mood entries.");
        break;

      case 'distribution':
        const moodCount = {};
        moodData.forEach(entry => {
          moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
        });
        labels = Object.keys(moodCount);
        data = Object.values(moodCount);
        setChartData({
          labels,
          datasets: [{
            label: 'Mood Distribution',
            data,
            borderColor: 'rgba(255,206,86,1)',
            backgroundColor: 'rgba(255,206,86,0.5)',
            fill: true,
            tension: 0.4
          }]
        });
        setChartConclusion("This area chart displays how often each mood has occurred, giving a sense of emotional balance.");
        break;

      default:
        setChartData(null);
        setChartConclusion('');
    }
  }, [selectedChart, moodData]);

  const chartComponents = {
    mood: <Line data={chartData} />,
    intensity: <Line data={chartData} />,
    triggers: <Bar data={chartData} />,
    activities: <Bar data={chartData} />,
    distribution: <Line data={chartData} options={{ plugins: { legend: { display: false } } }} />
  };

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen dark:text-white">
      <h2 className="text-2xl font-semibold mb-6">Progress Charts</h2>
      
      <div className="flex gap-3 flex-wrap mb-6">
        <button onClick={() => setSelectedChart('mood')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${selectedChart === 'mood' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700'}`}>
          <LineChart size={18} /> Mood Over Time
        </button>
        <button onClick={() => setSelectedChart('intensity')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${selectedChart === 'intensity' ? 'bg-pink-600 text-white' : 'bg-gray-200 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-gray-700'}`}>
          <Flame size={18} /> Intensity
        </button>
        <button onClick={() => setSelectedChart('triggers')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${selectedChart === 'triggers' ? 'bg-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-700'}`}>
          <Smile size={18} /> Triggers
        </button>
        <button onClick={() => setSelectedChart('activities')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${selectedChart === 'activities' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700'}`}>
          <Activity size={18} /> Activities
        </button>
        <button onClick={() => setSelectedChart('distribution')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${selectedChart === 'distribution' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-gray-700'}`}>
          <BarChart3 size={18} /> Distribution
        </button>
      </div>

      {loading ? (
        <p>Loading chart...</p>
      ) : chartData ? (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            {chartComponents[selectedChart]}
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm italic">{chartConclusion}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No data available to display for this chart.</p>
      )}
    </div>
  );
};

export default ProgressCharts;
