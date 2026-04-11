"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";

const STRIPS = 10;
const STRIP_DURATION = 0.52;
const STRIP_STAGGER = 0.035;

// Bandes paires : dégradé sombre en haut → bleu en bas (sens d'entrée)
// Bandes impaires : bleu en haut → sombre en bas
// Toutes semi-transparentes + backdrop-filter → effet verre givré
const STRIP_STYLES = Array.from({ length: STRIPS }).map((_, i) => {
  const isEven = i % 2 === 0;
  return {
    background: isEven
      ? `linear-gradient(
          to bottom,
          rgba(17, 17, 20, 0.97) 0%,
          rgba(22, 32, 72, 0.94) 45%,
          rgba(49, 77, 203, 0.88) 100%
        )`
      : `linear-gradient(
          to bottom,
          rgba(49, 77, 203, 0.88) 0%,
          rgba(22, 32, 72, 0.94) 55%,
          rgba(17, 17, 20, 0.97) 100%
        )`,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };
});

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
      {STRIP_STYLES.map((style, i) => (
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
            marginRight: i < STRIPS - 1 ? "-1px" : "0",
            willChange: "transform",
            ...style,
          }}
        />
      ))}
    </div>
  );
}
