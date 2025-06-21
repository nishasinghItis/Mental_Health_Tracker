import React from 'react';
import { useTheme } from '../context/ThemeContext';

const themes = [
  { name: "Default", color: "from-indigo-300 to-purple-300" },
  { name: "Calm Blue", color: "from-blue-300 to-cyan-300" },
  { name: "Sunset", color: "from-orange-300 to-pink-400" },
  { name: "Mint", color: "from-green-300 to-teal-300" },
];

const ThemeCustomizer = () => {
  const { theme, setTheme, darkMode, setDarkMode } = useTheme();

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">🎨 Theme Customizer</h3>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox h-5 w-5 text-purple-600"
          />
          <span className="text-gray-800 dark:text-gray-200">Enable Dark Mode</span>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {themes.map((t) => (
          <div
            key={t.name}
            className={`p-4 rounded-xl text-center text-sm font-medium cursor-pointer shadow ${theme === t.color ? 'ring-2 ring-purple-600' : ''} bg-gradient-to-r ${t.color}`}
            onClick={() => setTheme(t.color)}
          >
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeCustomizer;
