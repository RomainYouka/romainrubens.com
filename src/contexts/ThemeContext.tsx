"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  showTimePopup: "evening" | "morning" | null;
  dismissTimePopup: () => void;
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

  useEffect(() => {
    // Vérifier s'il y a une préférence sauvegardée
    const saved = localStorage.getItem("theme") as Theme | null;
    const currentTheme: Theme = saved === "dark" || saved === "light" ? saved : "light";

    setThemeState(currentTheme);
    applyTheme(currentTheme);

    // Proposer le mode sombre si : mode clair actif + heure nocturne/transition + pas déjà proposé cette session
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
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const dismissTimePopup = useCallback(() => {
    setShowTimePopup(null);
  }, []);

  // Ne rendre le contexte qu'une fois monté (évite les incohérences SSR)
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", isDark: false, toggleTheme, setTheme, showTimePopup: null, dismissTimePopup }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme, setTheme, showTimePopup, dismissTimePopup }}>
      {children}
    </ThemeContext.Provider>
  );
}
