import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Consultation() {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/consultation');
        setTherapists(res.data);
      } catch (err) {
        console.error('Error fetching therapists:', err);
      }
    };
    fetchTherapists();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-xl">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200">Speak With a Mental Health Professional</h2>
        <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
          Our therapists are certified experts in mental health, stress, anxiety, and emotional wellness. Sessions are private, supportive, and user-friendly.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {therapists.map((t, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition hover:scale-[1.02]">
            <img src={t.image} alt={t.name} className="w-24 h-24 rounded-full mb-4 object-cover shadow-md" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.qualifications}</p>
            <p className="text-sm text-indigo-600 dark:text-indigo-300 italic mt-1">{t.specialty}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Experience: {t.experience} yrs</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Languages: {t.languages}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Available: {t.availability}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t.bio}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Book Free Consultation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
