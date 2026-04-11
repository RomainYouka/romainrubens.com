"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";

export function PageTransitionOverlay() {
  const { phase } = usePageTransition();

  if (phase === "idle") return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: phase === "out" ? "-100%" : "0%" }}
      transition={{
        duration: 0.52,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#1d1d1f",
        zIndex: 9999,
        willChange: "transform",
        pointerEvents: "all",
      }}
    />
  );
}
