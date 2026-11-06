"use client";

import { m as motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";
import type { CSSProperties } from "react";
import s from "./spiral-transition.module.css";

const spiralPath = Array.from({ length: 280 }, (_, i) => {
  const angle = i / 279 * Math.PI * 7;
  const radius = 3 * Math.exp(angle * .22);
  return `${i ? "L" : "M"}${(500 + Math.cos(angle) * radius).toFixed(2)},${(500 + Math.sin(angle) * radius).toFixed(2)}`;
}).join(" ");

function SpiralTransition({ leaving, origin }: { leaving: boolean; origin: { x: number; y: number } }) {
  return <div data-page-transition="spiral" aria-hidden="true" className={`${s.overlay} ${leaving ? s.out : ""}`} style={{ "--origin-x": `${origin.x}px`, "--origin-y": `${origin.y}px` } as CSSProperties}><div className={s.portal}><div className={s.arms}><svg viewBox="0 0 1000 1000" fill="none"><defs><radialGradient id="spiral-ink"><stop stopColor="#050507"/><stop offset=".6" stopColor="#6e6e7a"/><stop offset="1" stopColor="#141417"/></radialGradient></defs>{Array.from({length:6},(_,i)=><path key={i} d={spiralPath} transform={`rotate(${i*60} 500 500)`} stroke="url(#spiral-ink)" strokeWidth="48" />)}</svg></div></div></div>;
}

const STRIPS = 8;
const STRIP_DURATION = 0.55;
const STRIP_STAGGER = 0.045;

const STRIP_GRADIENTS = {
  mono: [
    "linear-gradient(180deg, #080809 0%, #131318 100%)",
    "linear-gradient(180deg, #111111 0%, #1a1a1a 100%)",
    "linear-gradient(180deg, #1a1a1a 0%, #242424 100%)",
    "linear-gradient(180deg, #242424 0%, #303030 100%)",
    "linear-gradient(180deg, #303030 0%, #3e3e3e 100%)",
    "linear-gradient(180deg, #3e3e3e 0%, #505050 100%)",
    "linear-gradient(180deg, #505050 0%, #626262 100%)",
    "linear-gradient(180deg, #626262 0%, #767676 100%)",
  ],
};

export function PageTransitionOverlay() {
  const { phase, direction, effect, origin } = usePageTransition();

  if (phase === "idle") return null;
  if (effect === "spiral") return <SpiralTransition leaving={phase === "out"} origin={origin} />;

  const yStart = direction === "down" ? "-100%" : "100%";
  const yExit  = direction === "down" ? "100%"  : "-100%";
  const gradients = STRIP_GRADIENTS.mono;

  return (
    <div
      data-page-transition
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
      }}
    >
      {gradients.map((gradient, i) => (
        <motion.div
          key={i}
          initial={{ y: yStart }}
          animate={{ y: phase === "out" ? yExit : "0%" }}
          transition={{
            duration: STRIP_DURATION,
            delay: i * STRIP_STAGGER,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{
            flex: "1 0 0",
            background: gradient,
            marginRight: i < STRIPS - 1 ? "-1px" : "0",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
