import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "from-indigo-300 to-purple-300");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("dark") === "true");

  useEffect(() => {
  document.documentElement.classList.toggle("dark", darkMode)
  localStorage.setItem("dark", darkMode);
  localStorage.setItem("theme", theme);
}, [darkMode, theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
