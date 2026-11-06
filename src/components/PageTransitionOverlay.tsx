"use client";

import { usePageTransition } from "@/contexts/PageTransitionContext";
import type { CSSProperties } from "react";
import s from "./spiral-transition.module.css";

const spiralPath = Array.from({ length: 280 }, (_, i) => {
  const angle = i / 279 * Math.PI * 7;
  const radius = 3 * Math.exp(angle * .22);
  return `${i ? "L" : "M"}${(500 + Math.cos(angle) * radius).toFixed(2)},${(500 + Math.sin(angle) * radius).toFixed(2)}`;
}).join(" ");

function SpiralTransition({ leaving, origin, returning }: { leaving: boolean; origin: { x: number; y: number }; returning: boolean }) {
  return <div data-page-transition={returning ? "spiral-return" : "spiral"} aria-hidden="true" className={`${s.overlay} ${returning ? s.returning : ""} ${leaving ? s.out : ""}`} style={{ "--origin-x": `${origin.x}px`, "--origin-y": `${origin.y}px` } as CSSProperties}><div className={s.portal}><div className={s.arms}><svg viewBox="0 0 1000 1000" fill="none"><defs><radialGradient id="spiral-ink"><stop stopColor="#050507"/><stop offset=".6" stopColor="#6e6e7a"/><stop offset="1" stopColor="#141417"/></radialGradient></defs>{Array.from({length:6},(_,i)=><path key={i} d={spiralPath} transform={`rotate(${i*60} 500 500)`} stroke="url(#spiral-ink)" strokeWidth="48" />)}</svg></div></div></div>;
}

export function PageTransitionOverlay() {
  const { phase, effect, origin } = usePageTransition();

  if (phase === "idle") return null;
  return <SpiralTransition leaving={phase === "out"} origin={origin} returning={effect === "return"} />;
}
