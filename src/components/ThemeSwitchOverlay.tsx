"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeSwitchOverlay() {
  const { themeTransition } = useTheme();

  return (
    <AnimatePresence>
      {themeTransition === "toDark" && (
        <motion.div
          key="lights-off"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99998,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 38%, #120e00 0%, #000000 65%)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            // Flicker fluorescent : clignotements irréguliers → extinction
            opacity: [
              0,    // départ
              0.75, // premier flash
              0.04, // coupure
              0.88, // flash fort
              0.06, // coupure
              0.95, // presque éteint
              0.02, // dernier souffle
              1,    // noir total
              1,    // maintien (thème switche ici)
              0,    // révélation thème sombre
            ],
          }}
          transition={{
            duration: 0.95,
            times: [0, 0.07, 0.13, 0.22, 0.28, 0.38, 0.43, 0.54, 0.68, 1],
            ease: "linear",
          }}
        />
      )}

      {themeTransition === "toLight" && (
        <motion.div
          key="lights-on"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99998,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 38%, rgba(255,248,185,1) 0%, rgba(255,255,220,0.97) 30%, rgba(255,255,255,0.95) 65%, rgba(255,255,255,0.88) 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            // Flash instantané → éblouissement qui se dissipe progressivement
            opacity: [0, 1, 0.85, 0],
          }}
          transition={{
            duration: 0.65,
            times: [0, 0.06, 0.25, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
