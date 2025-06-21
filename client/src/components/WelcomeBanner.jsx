import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const motivationalQuotes = [
  "Every day is a fresh start 🌱",
  "You’re doing better than you think 💪",
  "It’s okay to rest. You’re growing 🌻",
  "One step at a time 🧩",
  "Feelings are valid. You are valid ❤️"
];

const WelcomeBanner = ({ name = "User" }) => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote on mount
    const random = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[random]);
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-600 dark:to-purple-700 p-6 rounded-2xl shadow-md text-white my-6">
      <h2 className="text-2xl font-bold mb-2">Welcome back, {name.split(" ")[0]} 👋</h2>
      <p className="text-lg italic">{quote}</p>
    </div>
  );
};

export default WelcomeBanner;
