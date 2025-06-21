// tailwind.config.js
/**  {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // important: tells Tailwind to scan all your files
  ],
  darkMode: 'class', // enables dark mode with a "dark" class
  theme: {
    extend: {
      colors: {
        mood: {
          calm: '#a2d2ff',       // light blue
          happy: '#ffe066',      // yellow
          anxious: '#ffc9de',    // pink
          neutral: '#f5f5f5',    // gray
          sad: '#c1d3fe',        // faded blue
          darkBg: '#1f2937',     // dark mode background
        },
      },
    },
  },
  safelist: [
    'from-indigo-300',
    'to-purple-300',
    'from-blue-300',
    'to-cyan-300',
    'from-orange-300',
    'to-pink-400',
    'from-green-300',
    'to-teal-300',
  ],
  plugins: [],
}
