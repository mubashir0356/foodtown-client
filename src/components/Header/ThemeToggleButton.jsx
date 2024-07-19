import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTheme as toggleThemeAction } from "../../store/themeSlice";

const ThemeToggleButton = () => {
  const [themeMode, setThemeMode] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("themeMode");
    if (storedTheme) {
      setThemeMode(storedTheme);
      dispatch(toggleThemeAction(storedTheme));
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("themeMode", "dark");
      setThemeMode("dark");
      dispatch(toggleThemeAction("dark"));
    } else {
      localStorage.setItem("themeMode", "light");
      setThemeMode("light");
      dispatch(toggleThemeAction("light"));
    }
  }, []);

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  // useEffect(() => {
  //   const storedDarkMode = localStorage.getItem("themeMode") === "true";
  //   setThemeMode(storedDarkMode);
  //   switchTheme(storedDarkMode);
  // }, []);

  const darkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  const lightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  const switchTheme = (darkMode) => {
    const switchToggle = document.querySelector("#switch-toggle");
    if (darkMode === "dark") {
      switchToggle.classList.remove("bg-cyan-300", "-translate-x-2");
      switchToggle.classList.add("bg-gray-700", "translate-x-full");
    } else {
      switchToggle.classList.add("bg-cyan-300", "-translate-x-2");
      switchToggle.classList.remove("bg-gray-700", "translate-x-full");
    }
  };

  const toggleTheme = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newThemeMode);
    localStorage.setItem("themeMode", newThemeMode);
    switchTheme(newThemeMode);
    dispatch(toggleThemeAction(newThemeMode));
  };

  return (
    <button
      className={`w-14 h-4 rounded-full ${
        themeMode === "dark" ? "bg-cyan-300" : "bg-gray-700"
      }  flex items-center transition duration-300 focus:outline-none shadow md:ml-12 lg:ml-12 xl:ml-28`}
      onClick={toggleTheme}
    >
      <div
        id="switch-toggle"
        className={`w-8 h-8 relative rounded-full transition duration-500 transform p-1 text-white ${
          themeMode === "dark"
            ? "bg-gray-700 translate-x-full"
            : "bg-cyan-300 -translate-x-2"
        }`}
      >
        {themeMode === "dark" ? darkIcon : lightIcon}
      </div>
    </button>
  );
};

export default ThemeToggleButton;
