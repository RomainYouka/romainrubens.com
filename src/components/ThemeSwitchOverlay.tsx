"use client";

import { m as motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

function BulbAnimation({ toDark }: { toDark: boolean }) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* Ampoule SVG */}
      <svg className={toDark ? "bulb-transition bulb-to-dark" : "bulb-transition"} width="96" height="140" viewBox="0 0 96 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Verre */}
        <path
          className="bulb-glass"
          d="M48 7C27 7 10 24 10 45C10 61 20 74 34 84L34 99L62 99L62 84C76 74 86 61 86 45C86 24 69 7 48 7Z"
          strokeWidth="1.5"
        />
        {/* Lueur intérieure */}
        <ellipse
          className="bulb-glow"
          cx="48" cy="58" rx="20" ry="22"
        />
        {/* Filament */}
        <path
          className="bulb-filament"
          d="M38 84L38 68L43 58L48 66L53 58L58 68L58 84"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
        {/* Socle */}
        <rect x="34" y="99"  width="28" height="8"  rx="3" fill="#757575" />
        <rect x="36" y="107" width="24" height="7"  rx="3" fill="#6E6E6E" />
        <rect x="38" y="114" width="20" height="7"  rx="3" fill="#616161" />
        <rect x="44" y="121" width="8"  height="5"  rx="2" fill="#555555" />
      </svg>
    </div>
  );
}

function TransitionScreen({ transition }: { transition: "toLight" | "toDark" }) {
  const isDark = transition === "toDark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDark ? "#191919" : "#F5F5F5",
        pointerEvents: "all",
      }}
    >
      <BulbAnimation toDark={isDark} />
    </motion.div>
  );
}

export function ThemeSwitchOverlay() {
  const { themeTransition } = useTheme();

  return (
    <AnimatePresence>
      {themeTransition && (
        <TransitionScreen
          key={themeTransition}
          transition={themeTransition}
        />
      )}
    </AnimatePresence>
  );
}
