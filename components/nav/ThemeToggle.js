"use client";

import { useTheme } from "@/lib/ThemeContext";
import { GiMoon, GiSun } from "react-icons/gi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
    >
      {theme === "light" ? (
        <GiMoon className="text-orange-600 text-xl" />
      ) : (
        <GiSun className="text-orange-400 text-xl" />
      )}
    </button>
  );
}
