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

type SunTimes =
  | { kind: "normal"; sunrise: Date; sunset: Date }
  | { kind: "polar_day" }
  | { kind: "polar_night" };

async function getSunTimes(): Promise<SunTimes | null> {
  try {
    const geoRes = await fetch("https://ipapi.co/json/");
    if (!geoRes.ok) return null;
    const geo = await geoRes.json();
    const { latitude: lat, longitude: lng } = geo;
    if (typeof lat !== "number" || typeof lng !== "number") return null;
    const sunRes = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
    );
    if (!sunRes.ok) return null;
    const sun = await sunRes.json();
    if (sun.status !== "OK") return null;
    const dayLength = sun.results.day_length;
    if (dayLength === 86400) return { kind: "polar_day" };
    if (dayLength === 0) return { kind: "polar_night" };
    return {
      kind: "normal",
      sunrise: new Date(sun.results.sunrise),
      sunset: new Date(sun.results.sunset),
    };
  } catch {
    return null;
  }
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
    const saved = localStorage.getItem("theme") as Theme | null;
    const currentTheme: Theme = saved === "dark" || saved === "light" ? saved : "light";
    setThemeState(currentTheme);
    applyTheme(currentTheme);

    if (!sessionStorage.getItem("themeAsked")) {
      const WINDOW_MS = 15 * 60 * 1000;
      getSunTimes().then((sun) => {
        if (sessionStorage.getItem("themeAsked")) return;
        sessionStorage.setItem("themeAsked", "1");

        if (sun) {
          if (sun.kind === "polar_night") {
            if (currentTheme === "light") setTheme("dark");
          } else if (sun.kind === "normal") {
            const now = Date.now();
            const sunriseMs = sun.sunrise.getTime();
            const sunsetMs = sun.sunset.getTime();
            const nearSunrise = Math.abs(now - sunriseMs) <= WINDOW_MS;
            const nearSunset = Math.abs(now - sunsetMs) <= WINDOW_MS;
            const isMidnightToSunrise = now < sunriseMs;
            const isEveningToMidnight = now > sunsetMs;

            if (nearSunrise) {
              if (currentTheme === "dark") setShowTimePopup("morning");
            } else if (nearSunset) {
              if (currentTheme === "light") setShowTimePopup("evening");
            } else if (isMidnightToSunrise && currentTheme === "light") {
              setTheme("dark");
            } else if (isEveningToMidnight && currentTheme === "light") {
              setShowTimePopup("evening");
            }
          }
        } else {
          const h = new Date().getHours();
          if (h >= 0 && h < 6 && currentTheme === "light") {
            setTheme("dark");
          } else if (h >= 6 && h < 8 && currentTheme === "dark") {
            setShowTimePopup("morning");
          } else if (h >= 19 && currentTheme === "light") {
            setShowTimePopup("evening");
          }
        }
      });
    }

    localStorage.removeItem("accentColor");

    const savedAccent = sessionStorage.getItem("accentColor") as AccentColor | null;
    const nextAccent = savedAccent && SUPPORTED_ACCENTS.includes(savedAccent) ? savedAccent : "blue";

    setAccentColorState(nextAccent);
    applyAccent(nextAccent);
    sessionStorage.setItem("accentColor", nextAccent);

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
