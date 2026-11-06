"use client";

import { useTheme } from "@/contexts/ThemeContext";
import s from "./theme-curtain.module.css";

export function ThemeSwitchOverlay() {
  const { themeTransition } = useTheme();
  if (!themeTransition) return null;
  return <div key={themeTransition} data-theme-curtain={themeTransition} aria-hidden="true" className={`${s.overlay} ${themeTransition === "toDark" ? s.dark : s.light}`}>
    <div className={s.veil} /><div className={s.spotlight} />
    <div className={s.cord}><span className={s.string} /><span className={s.handle} /></div>
  </div>;
}
