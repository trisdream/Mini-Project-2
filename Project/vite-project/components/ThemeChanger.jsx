import React, { useState, useEffect } from "react";

// ThemeToggle component allows the user to switch between light and dark themes
const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      setTheme("light");
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  };

  // Effect hook to set the initial theme to light and clean up when the component is unmounted
  useEffect(() => {
    document.body.classList.add("light-mode");

    return () => {
      document.body.classList.remove("light-mode");
    };
  }, []);

  return (
    <button className="theme-toggle-bottom-left" onClick={toggleTheme}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};

export default ThemeToggle;
