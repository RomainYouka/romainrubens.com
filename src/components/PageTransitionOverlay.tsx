"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";

const STRIPS = 10;
const STRIP_DURATION = 0.52;
const STRIP_STAGGER = 0.035;

// Calcul des styles une seule fois (pas de recalcul au render)
const STRIP_STYLES = Array.from({ length: STRIPS }).map((_, i) => {
  // Gauche = opaque, droite = transparent
  const bottomOpacity = 1.0 - (i / (STRIPS - 1)) * 0.82;

  // Alternance sombre / bleu
  const isBlue = i % 2 !== 0;
  const color = isBlue ? "49, 77, 203" : "29, 29, 31";

  return {
    // Bas = opaque, haut = transparent
    background: `linear-gradient(
      to top,
      rgba(${color}, ${bottomOpacity.toFixed(2)}) 0%,
      rgba(${color}, 0) 100%
    )`,
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
      }}
    >
      {/* Fond noir — masque complètement la page pendant la transition */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#000000" }} />

      {/* Bandes dégradées par-dessus le fond noir */}
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
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
    </div>
  );
}
