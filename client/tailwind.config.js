// tailwind.config.js
/**  {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // important: tells Tailwind to scan all your files
  ],
  darkMode: false, // enables dark mode with a "dark" class
  theme: {
    extend: {
      colors: {
        mood: {
          
        primary: '#4B5563',       // gray-700 - for text, nav, etc.
        secondary: '#9CA3AF',     // gray-400 - for subtle elements
        background: '#F9FAFB',    // gray-50  - for page background
        accent: '#E5E7EB',        // gray-200 - for cards, buttons
        darkBg: '#1F2937',        // dark background (unchanged)
        darkText: '#E5E7EB',      // light text for dark mode
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
