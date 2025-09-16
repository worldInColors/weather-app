import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(shouldBeDark);

    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    // Save preference
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    // Toggle class on document
    if (newTheme) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="dark:bg-light-surface dark:border-light-border-variant dark:hover:bg-light-surface-variant flex items-center justify-center rounded-md border border-neutral-600 bg-neutral-800 p-2 transition-colors hover:bg-neutral-700"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="dark:text-light-text-secondary h-5 w-5 text-neutral-200" />
      ) : (
        <Moon className="dark:text-light-text-secondary h-5 w-5 text-neutral-200" />
      )}
    </button>
  );
}

export default ThemeToggle;
