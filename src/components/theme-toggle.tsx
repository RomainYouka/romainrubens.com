"use client";

import { useTheme } from "@/components/theme-provider";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [showLabel, setShowLabel] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        className="relative group"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {/* Liquid Glass Background */}
        <div
          className="absolute inset-0 rounded-full backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor:
              theme === "light"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(30, 30, 30, 0.3)",
            border:
              theme === "light"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid rgba(255, 255, 255, 0.1)",
            opacity: showLabel ? 0.6 : 0.4,
          }}
        />

        {/* Icon Container */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          {theme === "light" ? (
            <svg
              className={`w-5 h-5 text-[#1d1d1f] transition-all duration-300 ${
                showLabel ? "scale-110" : "scale-100"
              }`}
              style={{
                transform: showLabel ? "scale(1.1) rotate(0deg)" : "scale(1) rotate(0deg)",
              }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              className={`w-5 h-5 text-white transition-all duration-300 ${
                showLabel ? "scale-110" : "scale-100"
              }`}
              style={{
                transform: showLabel ? "scale(1.1) rotate(0deg)" : "scale(1) rotate(0deg)",
              }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1M20.485 3.515l-4.243 4.243m-8.484 0l-4.243-4.243M20.485 20.485l-4.243-4.243m-8.484 0l-4.243 4.243" />
            </svg>
          )}
        </div>

        {/* Tooltip Label */}
        {showLabel && (
          <div
            className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200"
            style={{
              pointerEvents: "none",
            }}
          >
            <div
              className="px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-md"
              style={{
                backgroundColor:
                  theme === "light"
                    ? "rgba(29, 29, 31, 0.85)"
                    : "rgba(255, 255, 255, 0.85)",
                color: theme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(29, 29, 31, 0.95)",
              }}
            >
              {theme === "light" ? "Mode sombre" : "Mode clair"}
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
