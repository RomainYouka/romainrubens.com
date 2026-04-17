"use client";

import { motion } from "framer-motion";
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
  pink: [
    "linear-gradient(180deg, #080809 0%, #131318 100%)",
    "linear-gradient(180deg, #130005 0%, #1e0008 100%)",
    "linear-gradient(180deg, #290008 0%, #380010 100%)",
    "linear-gradient(180deg, #430012 0%, #5c0018 100%)",
    "linear-gradient(180deg, #6e0020 0%, #920028 100%)",
    "linear-gradient(180deg, #a80030 0%, #B2003A 100%)",
    "linear-gradient(180deg, #d40045 0%, #e8005a 100%)",
    "linear-gradient(180deg, #ee0060 0%, #FF376C 100%)",
  ],
  green: [
    "linear-gradient(180deg, #080809 0%, #131318 100%)",
    "linear-gradient(180deg, #030e08 0%, #051610 100%)",
    "linear-gradient(180deg, #062011 0%, #0a2c18 100%)",
    "linear-gradient(180deg, #0a3018 0%, #103e22 100%)",
    "linear-gradient(180deg, #0d3c20 0%, #165028 100%)",
    "linear-gradient(180deg, #0f4828 0%, #1c6030 100%)",
    "linear-gradient(180deg, #1a6838 0%, #2a9060 100%)",
    "linear-gradient(180deg, #28a070 0%, #53C999 100%)",
  ],
  orange: [
    "linear-gradient(180deg, #080809 0%, #131318 100%)",
    "linear-gradient(180deg, #130500 0%, #1e0800 100%)",
    "linear-gradient(180deg, #291000 0%, #381800 100%)",
    "linear-gradient(180deg, #432000 0%, #5c2c00 100%)",
    "linear-gradient(180deg, #6e3500 0%, #924800 100%)",
    "linear-gradient(180deg, #a05000 0%, #B24400 100%)",
    "linear-gradient(180deg, #c86800 0%, #dc7a00 100%)",
    "linear-gradient(180deg, #e08840 0%, #FFA269 100%)",
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "all",
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
