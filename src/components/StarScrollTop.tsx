"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

// Blob/potato shape — viewBox 0 0 64 64
const BLOB_PATH =
  "M34 12 C44 11,52 18,52 29 C52 40,50 50,38 52 C26 54,13 48,13 37 C13 26,14 16,26 13 C28 12,31 12,34 12 Z";

// Eye positions within the blob
const L_EYE = { cx: 25, cy: 34 };
const R_EYE = { cx: 41, cy: 32 };
const EYE_R = 9;
const PUPIL_R = 4.5;
const MAX_OFFSET = 3.5;

export default function StarScrollTop() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  // Temporarily shown for wink even when scrollY < 300
  const [winkVisible, setWinkVisible] = useState(false);
  // true = left eye closing/closed
  const [winking, setWinking] = useState(false);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Prevents scroll listener from re-showing button while scrolling to top
  const wasClickedRef = useRef(false);

  // Show when scrolled past 300px
  useEffect(() => {
    const onScroll = () => {
      if (wasClickedRef.current) {
        // Clear lock once near top, then sync normally
        if (window.scrollY < 50) wasClickedRef.current = false;
        return;
      }
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pupils follow mouse in real time
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const r = buttonRef.current.getBoundingClientRect();
      const angle = Math.atan2(
        e.clientY - (r.top + r.height / 2),
        e.clientX - (r.left + r.width / 2)
      );
      setPupil({
        x: Math.cos(angle) * MAX_OFFSET,
        y: Math.sin(angle) * MAX_OFFSET,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Wink on custom event "blob-wink" — appears even if not scroll-visible
  useEffect(() => {
    const onWink = () => {
      setWinkVisible(true);
      setWinking(true);
      // Open eye back after 180ms
      const t1 = setTimeout(() => setWinking(false), 180);
      // Hide the transient apparition after 600ms (if not scroll-visible)
      const t2 = setTimeout(() => setWinkVisible(false), 600);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    };
    window.addEventListener("blob-wink", onWink);
    return () => window.removeEventListener("blob-wink", onWink);
  }, []);

  const handleClick = useCallback(() => {
    wasClickedRef.current = true;
    setVisible(false);
    // Lenis intercepte window.scrollTo — on dispatch l'événement dédié
    // Fallback window.scrollTo pour les pages sans Lenis (ex: accueil)
    window.dispatchEvent(new Event("lenis-scroll-to-top"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const shown = visible || winkVisible;

  // Wink eye style: close left eye on scaleY
  const winkStyle = {
    transformBox: "fill-box",
    transformOrigin: "center",
    transform: winking ? "scaleY(0.06)" : "scaleY(1)",
    transition: winking ? "transform 0.12s ease-in" : "transform 0.16s ease-out",
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          ref={buttonRef}
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          onClick={handleClick}
          aria-label="Retour en haut de page"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 50,
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "var(--theme-accent)",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
          }}
        >
          <div style={{ width: 54, height: 54, pointerEvents: "none" }}>
            <svg
              viewBox="0 0 64 64"
              width="54"
              height="54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Potato/blob body */}
              <path d={BLOB_PATH} fill={isDark ? "rgba(0,0,0,0.32)" : "rgba(255,255,255,0.18)"} />

              {/* Left eye — winks on "blob-wink" event */}
              <g style={winkStyle}>
                <circle cx={L_EYE.cx} cy={L_EYE.cy} r={EYE_R} fill="white" />
                <circle
                  cx={L_EYE.cx + pupil.x}
                  cy={L_EYE.cy + pupil.y}
                  r={PUPIL_R}
                  fill="#1a1a1a"
                />
                {/* Shine */}
                <circle
                  cx={L_EYE.cx + pupil.x + 1.5}
                  cy={L_EYE.cy + pupil.y - 1.5}
                  r={1.2}
                  fill="white"
                />
              </g>

              {/* Right eye — always open */}
              <circle cx={R_EYE.cx} cy={R_EYE.cy} r={EYE_R} fill="white" />
              <circle
                cx={R_EYE.cx + pupil.x}
                cy={R_EYE.cy + pupil.y}
                r={PUPIL_R}
                fill="#1a1a1a"
              />
              {/* Shine */}
              <circle
                cx={R_EYE.cx + pupil.x + 1.5}
                cy={R_EYE.cy + pupil.y - 1.5}
                r={1.2}
                fill="white"
              />
            </svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
