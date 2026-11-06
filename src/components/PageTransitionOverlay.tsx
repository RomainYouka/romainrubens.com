"use client";

import { m as motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";
import { useTheme } from "@/contexts/ThemeContext";
import type { AccentColor } from "@/contexts/ThemeContext";

const STRIPS = 8;
const STRIP_DURATION = 0.55;
const STRIP_STAGGER = 0.045;

const STRIP_GRADIENTS: Record<AccentColor, string[]> = {
  blue: [
    "linear-gradient(180deg, #080809 0%, #131318 100%)",
    "linear-gradient(180deg, #0d0d1c 0%, #181830 100%)",
    "linear-gradient(180deg, #101528 0%, #1a2248 100%)",
    "linear-gradient(180deg, #141e58 0%, #1e2e7a 100%)",
    "linear-gradient(180deg, #1a2880 0%, #2740a8 100%)",
    "linear-gradient(180deg, #243599 0%, #314DCB 100%)",
    "linear-gradient(180deg, #2c4ac0 0%, #4268e0 100%)",
    "linear-gradient(180deg, #3a5cd8 0%, #6080f8 100%)",
  ],
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
  const { phase, direction } = usePageTransition();
  const { accentColor } = useTheme();

  if (phase === "idle") return null;

  const yStart = direction === "down" ? "-100%" : "100%";
  const yExit  = direction === "down" ? "100%"  : "-100%";
  const gradients = STRIP_GRADIENTS[accentColor];

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
