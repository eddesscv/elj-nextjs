// ThemeToggleButton.tsx
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";

const themes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [systemPref, setSystemPref] = useState<"light" | "dark">("light");

  // Detect system preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemPref = () =>
      setSystemPref(mq.matches ? "dark" : "light");

    updateSystemPref();
    mq.addEventListener("change", updateSystemPref);
    return () => mq.removeEventListener("change", updateSystemPref);
  }, []);

  const knobPosition =
    theme === "light"
      ? "translate-x-0"
      : theme === "dark"
      ? "translate-x-[2.5rem]" // middle
      : "translate-x-[5rem]"; // right

  const getIcon = () => {
    if (theme === "light") return <Sun className="w-4 h-4 text-yellow-400" />;
    if (theme === "dark") return <Moon className="w-4 h-4 text-blue-400" />;
    if (theme === "system")
      return systemPref === "dark" ? (
        <Laptop className="w-4 h-4 text-blue-400" />
      ) : (
        <Laptop className="w-4 h-4 text-yellow-400" />
      );
    return null;
  };

  return (
    <div className="relative w-[7rem] h-8">
      {/* Track */}
      <div className="flex justify-between items-center w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 px-3 relative">
        {/* Light button */}
        <button
          onClick={() => setTheme("light")}
          className="focus:outline-none"
        >
          <Sun
            className={`w-4 h-4 ${
              theme === "light"
                ? "text-yellow-400"
                : theme === "system" && systemPref === "light"
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
          />
        </button>

        {/* Dark button */}
        <button
          onClick={() => setTheme("dark")}
          className="focus:outline-none"
        >
          <Moon
            className={`w-4 h-4 ${
              theme === "dark"
                ? "text-blue-400"
                : theme === "system" && systemPref === "dark"
                ? "text-blue-400"
                : "text-gray-400"
            }`}
          />
        </button>

        {/* System button */}
        <button
          onClick={() => setTheme("system")}
          className="focus:outline-none"
        >
          <Laptop
            className={`w-4 h-4 ${
              theme === "system"
                ? systemPref === "dark"
                  ? "text-blue-400"
                  : "text-yellow-400"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Knob with selected icon */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-black shadow-md flex items-center justify-center transition-transform duration-300 ${knobPosition}`}
      >
        {getIcon()}
      </span>
    </div>
  );
};