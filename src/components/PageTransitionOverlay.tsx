"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";

const STRIPS = 10;
const STRIP_DURATION = 0.48;
const STRIP_STAGGER = 0.03;

export function PageTransitionOverlay() {
  const { phase } = usePageTransition();

  if (phase === "idle") return null;

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
      {Array.from({ length: STRIPS }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: phase === "out" ? "-100%" : "0%" }}
          transition={{
            duration: STRIP_DURATION,
            delay: i * STRIP_STAGGER,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{
            flex: "1 0 0",
            // léger chevauchement pour éviter les gaps sub-pixel entre bandes
            marginRight: i < STRIPS - 1 ? "-1px" : "0",
            backgroundColor: "#1d1d1f",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
