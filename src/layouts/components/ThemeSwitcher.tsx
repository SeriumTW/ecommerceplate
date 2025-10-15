"use client";

import config from "@/config/config.json";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";

const ThemeSwitcher = ({ className = "" }: { className?: string }) => {
  const { theme_switcher } = config.settings;
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!theme_switcher || !mounted) {
    return null;
  }

  const isDark = theme === "dark" || resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-body transition hover:border-primary/50 hover:text-primary dark:border-darkmode-border/60 dark:bg-darkmode-body ${className}`}
    >
      <span className="sr-only">Cambia tema</span>
      {isDark ? (
        <LuMoonStar className="text-lg text-darkmode-primary" />
      ) : (
        <LuSun className="text-lg text-primary" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
