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

    if (saved === "dark" || saved === "light") {
      // L'utilisateur a déjà une préférence explicite → on la respecte
      setThemeState(saved);
      applyTheme(saved);
      setMounted(true);
      return;
    }

    // Pas de préférence → toujours mode clair par défaut
    setThemeState("light");
    applyTheme("light");

    // La nuit ou en transition soir/matin : proposer le mode sombre via popup
    const h = new Date().getHours();
    const isNight = h >= 19 || h < 6;
    const isTransition = (h >= 17 && h < 19) || (h >= 6 && h < 8);

    if ((isNight || isTransition) && !sessionStorage.getItem("themeAsked")) {
      sessionStorage.setItem("themeAsked", "1");
      setShowTimePopup(h >= 6 && h < 8 ? "morning" : "evening");
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
