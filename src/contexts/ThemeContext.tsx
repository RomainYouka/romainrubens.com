"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { Analytics } from "@/lib/analytics";

type Theme = "light" | "dark";
export type ThemeTransition = "toLight" | "toDark" | null;
export type AccentColor = "blue" | "pink" | "green" | "orange" | "mono";

const SUPPORTED_ACCENTS: AccentColor[] = ["blue", "pink", "green", "orange", "mono"];

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  showTimePopup: "evening" | "morning" | null;
  dismissTimePopup: () => void;
  themeTransition: ThemeTransition;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  return ctx;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#191919" : "#ffffff");
}

function applyAccent(color: AccentColor) {
  if (color === "blue") {
    document.documentElement.removeAttribute("data-accent");
  } else {
    document.documentElement.setAttribute("data-accent", color);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [showTimePopup, setShowTimePopup] = useState<"evening" | "morning" | null>(null);
  const [themeTransition, setThemeTransition] = useState<ThemeTransition>(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [accentColor, setAccentColorState] = useState<AccentColor>("blue");
  const transitionLock = useRef(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("theme") as Theme | null;
    const currentTheme: Theme = saved === "dark" ? "dark" : "light";
    setThemeState(currentTheme);
    applyTheme(currentTheme);
    localStorage.removeItem("theme");

    const savedSessionAccent = sessionStorage.getItem("accentColor") as AccentColor | null;
    localStorage.removeItem("accentColor");

    const nextAccent =
      savedSessionAccent && SUPPORTED_ACCENTS.includes(savedSessionAccent)
        ? savedSessionAccent
        : "blue";

    setAccentColorState(nextAccent);
    applyAccent(nextAccent);
    sessionStorage.setItem("accentColor", nextAccent);

    setMounted(true);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    sessionStorage.setItem("theme", t);
  }, []);

  const toggleTheme = useCallback(() => {
    if (transitionLock.current) return;
    transitionLock.current = true;

    const newTheme = theme === "light" ? "dark" : "light";
    Analytics.themeToggle(newTheme);

    if (newTheme === "dark") {
      setThemeTransition("toDark");
      setTimeout(() => setTheme(newTheme), 550);
      setTimeout(() => setThemeTransition(null), 880);
      setTimeout(() => { transitionLock.current = false; }, 1200);
    } else {
      setThemeTransition("toLight");
      setTimeout(() => setTheme(newTheme), 550);
      setTimeout(() => setThemeTransition(null), 880);
      setTimeout(() => { transitionLock.current = false; }, 1200);
    }
  }, [theme, setTheme]);

  const toggleHighContrast = useCallback(() => {
    setIsHighContrast((prev) => {
      const next = !prev;
      localStorage.setItem("highContrast", next ? "1" : "0");
      document.documentElement.setAttribute("data-contrast", next ? "high" : "normal");
      return next;
    });
  }, []);

  const setAccentColor = useCallback((color: AccentColor) => {
    setAccentColorState(color);
    sessionStorage.setItem("accentColor", color);
    applyAccent(color);
  }, []);

  const dismissTimePopup = useCallback(() => {
    setShowTimePopup(null);
  }, []);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", isDark: false, toggleTheme, setTheme, showTimePopup: null, dismissTimePopup, themeTransition: null, isHighContrast: false, toggleHighContrast, accentColor: "blue", setAccentColor }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme, setTheme, showTimePopup, dismissTimePopup, themeTransition, isHighContrast, toggleHighContrast, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
