"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

type Theme = "light" | "dark";
export type ThemeTransition = "toLight" | "toDark" | null;

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  showTimePopup: "evening" | "morning" | null;
  dismissTimePopup: () => void;
  themeTransition: ThemeTransition;
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [showTimePopup, setShowTimePopup] = useState<"evening" | "morning" | null>(null);
  const [themeTransition, setThemeTransition] = useState<ThemeTransition>(null);
  const transitionLock = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const currentTheme: Theme = saved === "dark" || saved === "light" ? saved : "light";

    setThemeState(currentTheme);
    applyTheme(currentTheme);

    if (currentTheme === "light" && !sessionStorage.getItem("themeAsked")) {
      const h = new Date().getHours();
      const isNight = h >= 19 || h < 6;
      const isTransition = (h >= 17 && h < 19) || (h >= 6 && h < 8);

      if (isNight || isTransition) {
        sessionStorage.setItem("themeAsked", "1");
        setShowTimePopup(h >= 6 && h < 8 ? "morning" : "evening");
      }
    }

    setMounted(true);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    localStorage.setItem("theme", t);
  }, []);

  const toggleTheme = useCallback(() => {
    if (transitionLock.current) return;
    transitionLock.current = true;

    const newTheme = theme === "light" ? "dark" : "light";

    if (newTheme === "dark") {
      // Lights OFF : flicker → obscurité → révélation thème sombre
      setThemeTransition("toDark");
      setTimeout(() => {
        setTheme(newTheme);
      }, 520);
      setTimeout(() => {
        setThemeTransition(null);
        transitionLock.current = false;
      }, 950);
    } else {
      // Lights ON : switch immédiat + flash chaud qui se dissipe
      setTheme(newTheme);
      setThemeTransition("toLight");
      setTimeout(() => {
        setThemeTransition(null);
        transitionLock.current = false;
      }, 650);
    }
  }, [theme, setTheme]);

  const dismissTimePopup = useCallback(() => {
    setShowTimePopup(null);
  }, []);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", isDark: false, toggleTheme, setTheme, showTimePopup: null, dismissTimePopup, themeTransition: null }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme, setTheme, showTimePopup, dismissTimePopup, themeTransition }}>
      {children}
    </ThemeContext.Provider>
  );
}
