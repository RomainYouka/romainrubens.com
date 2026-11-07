"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { Analytics } from "@/lib/analytics";

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
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  return ctx;
}

function applyBrowserTheme(theme: Theme) {
  const root = document.documentElement;
  const color = theme === "dark" ? "#1d1d1f" : "#ffffff";
  // Recent Safari versions sample the root background instead of theme-color.
  // Update it at click time, independently of the delayed page curtain reveal.
  root.style.colorScheme = theme;
  root.style.backgroundColor = color;
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta=>{
    // Reinsert the hint so WebKit also invalidates a previously cached tint.
    const replacement = meta.cloneNode(false) as HTMLMetaElement;
    replacement.removeAttribute("media");
    replacement.content = color;
    meta.replaceWith(replacement);
  });
  document.querySelectorAll('meta[name="color-scheme"]').forEach(meta=>meta.setAttribute("content",theme));
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  applyBrowserTheme(theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [showTimePopup, setShowTimePopup] = useState<"evening" | "morning" | null>(null);
  const [themeTransition, setThemeTransition] = useState<ThemeTransition>(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const transitionLock = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const saved = sessionStorage.getItem("theme") as Theme | null;
    const currentTheme: Theme = saved === "dark" ? "dark" : "light";
    setThemeState(currentTheme);
    applyTheme(currentTheme);
    localStorage.removeItem("theme");

    localStorage.removeItem("accentColor");
    sessionStorage.removeItem("accentColor");
    document.documentElement.removeAttribute("data-accent");
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
    applyBrowserTheme(newTheme);
    Analytics.themeToggle(newTheme);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(newTheme); transitionLock.current = false; return;
    }
    setThemeTransition(newTheme === "dark" ? "toDark" : "toLight");
    timers.current = [
      setTimeout(() => setTheme(newTheme), 650),
      setTimeout(() => { setThemeTransition(null); transitionLock.current = false; }, 1500),
    ];
  }, [theme, setTheme]);

  const toggleHighContrast = useCallback(() => {
    setIsHighContrast((prev) => {
      const next = !prev;
      localStorage.setItem("highContrast", next ? "1" : "0");
      document.documentElement.setAttribute("data-contrast", next ? "high" : "normal");
      return next;
    });
  }, []);

  const dismissTimePopup = useCallback(() => {
    setShowTimePopup(null);
  }, []);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", isDark: false, toggleTheme, setTheme, showTimePopup: null, dismissTimePopup, themeTransition: null, isHighContrast: false, toggleHighContrast }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme, setTheme, showTimePopup, dismissTimePopup, themeTransition, isHighContrast, toggleHighContrast }}>
      {children}
    </ThemeContext.Provider>
  );
}
