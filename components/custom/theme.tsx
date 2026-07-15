"use client";
import React, { memo, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const Theme = memo(() => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.getItem("theme") === "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  if (!mounted) {
    return <div className="fixed bottom-0 right-0 p-5 w-6 h-6" />;
  }

  return (
    <div
      className="fixed bottom-0 right-0 p-5"
      onClick={() => setIsDark((prev) => !prev)}
    >
      {isDark ? <Sun /> : <Moon />}
    </div>
  );
});
Theme.displayName = "Theme";

export default Theme;
