import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const moodOptions = [
  { label: '😊 Happy', value: 'happy' },
  { label: '😢 Sad', value: 'sad' },
  { label: '😠 Angry', value: 'angry' },
  { label: '😟 Anxious', value: 'anxious' },
  { label: '😐 Neutral', value: 'neutral' },
  { label: '🤩 Excited', value: 'excited' },
];

const NewMoodEntry = () => {
  const { user } = useAuthContext();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: today,
    mood: '',
    intensity: 5,
    activities: '',
    thoughts: '',
    duration: '',
    physicalSymptoms: '',
    trigger: '',
    coping: '',
    intention: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const token = localStorage.getItem('token'); // ✅ FIXED: Now defined inside handleSubmit

    if (!token) {
      console.error("No token found. Please log in again.");
      setErrorMessage("Session expired. Please log in again.");
      return;
    }

    try {
      console.log('Sending form data:', formData);

      await axios.post(
        'http://localhost:5000/api/moods',
        {
          mood: formData.mood,
          note: formData.thoughts,
          date: formData.date,
          intensity: formData.intensity,
          activities: formData.activities,
          duration: formData.duration,
          physicalSymptoms: formData.physicalSymptoms,
          trigger: formData.trigger,
          coping: formData.coping,
          intention: formData.intention,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('✅ Mood entry saved successfully!');
      setFormData({
        date: today,
        mood: '',
        intensity: 5,
        activities: '',
        thoughts: '',
        duration: '',
        physicalSymptoms: '',
        trigger: '',
        coping: '',
        intention: '',
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('❌ Something went wrong. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        Please log in to add a mood entry.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-100 via-blue-100 to-white text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto py-8 px-4 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700">
          📝 New Mood Entry
        </h1>

        {successMessage && <div className="bg-green-100 text-green-700 p-2 rounded">{successMessage}</div>}
        {errorMessage && <div className="bg-red-100 text-red-700 p-2 rounded">{errorMessage}</div>}

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-semibold mb-1">Mood</label>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => setFormData((prev) => ({ ...prev, mood: option.value }))}
                className={`px-4 py-2 rounded-full text-sm ${
                  formData.mood === option.value
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-white border text-gray-700 hover:bg-indigo-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div>
          <label className="block text-sm font-semibold mb-1">Mood Intensity (1-10)</label>
          <input
            type="range"
            name="intensity"
            min="1"
            max="10"
            value={formData.intensity}
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">Intensity: {formData.intensity}</p>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold mb-1">Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Choose duration</option>
            <option value="Just now">Just now</option>
            <option value="An hour">An hour</option>
            <option value="Half the day">Half the day</option>
            <option value="Since morning">Since morning</option>
            <option value="All day">All day</option>
          </select>
        </div>

        {/* Activities */}
        <div>
          <label className="block text-sm font-semibold mb-1">Activities</label>
          <input
            type="text"
            name="activities"
            value={formData.activities}
            onChange={handleChange}
            placeholder="e.g., Studied, went for a walk"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Thoughts */}
        <div>
          <label className="block text-sm font-semibold mb-1">Thoughts or Feelings</label>
          <textarea
            name="thoughts"
            value={formData.thoughts}
            onChange={handleChange}
            rows="3"
            placeholder="How are you feeling?"
            className="w-full p-2 border rounded-md resize-none"
          />
        </div>

        {/* Physical Symptoms */}
        <div>
          <label className="block text-sm font-semibold mb-1">Physical Symptoms</label>
          <input
            type="text"
            name="physicalSymptoms"
            value={formData.physicalSymptoms}
            onChange={handleChange}
            placeholder="e.g., headache, low energy"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Trigger */}
        <div>
          <label className="block text-sm font-semibold mb-1">Triggers</label>
          <input
            type="text"
            name="trigger"
            value={formData.trigger}
            onChange={handleChange}
            placeholder="Optional: What caused the feeling?"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Coping */}
        <div>
          <label className="block text-sm font-semibold mb-1">Coping Mechanisms</label>
          <input
            type="text"
            name="coping"
            value={formData.coping}
            onChange={handleChange}
            placeholder="e.g., music, talking to a friend"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Intention */}
        <div>
          <label className="block text-sm font-semibold mb-1">Tomorrow's Intention</label>
          <textarea
            name="intention"
            value={formData.intention}
            onChange={handleChange}
            rows="2"
            placeholder="Set a positive intention or goal for tomorrow"
            className="w-full p-2 border rounded-md resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="reset"
            onClick={() =>
              setFormData({
                ...formData,
                mood: '',
                activities: '',
                thoughts: '',
                duration: '',
                physicalSymptoms: '',
                trigger: '',
                coping: '',
                intention: '',
              })
            }
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMoodEntry;
