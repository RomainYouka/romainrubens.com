"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STAR_PATH =
  "M21.2637 4.08739L37.8817 26.3888L38.0898 26.3454L52.3654 3.49677L64.4675 12.5899L49.1889 33.6824L49.3474 33.824L74.6759 40.115L70.7839 54.6401L45.7033 47.424L45.4704 47.5599L48.1731 73.7679L33.2104 74.6175L32.2146 48.2718L32.0561 48.1302L6.39732 59.2027L1.30436 44.8482L27.3245 35.3599L27.3989 35.0824L9.58414 13.9477L21.2637 4.08739Z";

// Eye positions within the head (top) branch — viewBox 0 0 76 76
// Head tip spans x:[21–52], y:[4–26]. Eyes placed at ~1/3 down from tip.
const L_EYE = { cx: 30.5, cy: 14 };
const R_EYE = { cx: 44, cy: 12 };
const EYE_R = 4;
const PUPIL_R = 2;
const MAX_PUPIL_OFFSET = 1.6;

type Phase = "idle" | "running";

export default function StarScrollTop() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Show when scrolled past 300px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pupils follow mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      const angle = Math.atan2(
        e.clientY - (r.top + r.height / 2),
        e.clientX - (r.left + r.width / 2)
      );
      setPupil({
        x: Math.cos(angle) * MAX_PUPIL_OFFSET,
        y: Math.sin(angle) * MAX_PUPIL_OFFSET,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleClick = useCallback(() => {
    if (phase === "running") return;
    setPhase("running");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  // When running animation completes, hide the star
  const handleAnimationComplete = useCallback(() => {
    if (phase === "running") {
      setVisible(false);
      setPhase("idle");
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          key="star-scroll-top"
          initial={{ opacity: 0, scale: 0.4, y: 16 }}
          animate={
            phase === "running"
              ? {
                  // Float upward, wiggle left-right, fade out
                  y: [0, -18, -42, -70, -105, -145],
                  rotate: [0, -22, 24, -22, 22, -16, 16, -10, 10, -4],
                  opacity: [1, 1, 1, 0.9, 0.4, 0],
                  scale: [1, 1.05, 0.95, 1.05, 0.95, 0.9],
                }
              : { opacity: 1, scale: 1, y: 0, rotate: 0 }
          }
          exit={{ opacity: 0, scale: 0.4, y: 16 }}
          transition={
            phase === "running"
              ? {
                  duration: 0.85,
                  y: { ease: "easeIn", times: [0, 0.12, 0.28, 0.48, 0.72, 1] },
                  opacity: { ease: "linear", times: [0, 0.2, 0.45, 0.65, 0.82, 1] },
                  rotate: { ease: "linear" },
                  scale: { ease: "easeInOut" },
                }
              : { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
          }
          onAnimationComplete={handleAnimationComplete}
          onClick={handleClick}
          whileHover={phase === "idle" ? { scale: 1.12 } : undefined}
          whileTap={phase === "idle" ? { scale: 0.9 } : undefined}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 50,
            width: 52,
            height: 52,
            cursor: phase === "running" ? "default" : "pointer",
          }}
          aria-label="Retour en haut de page"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
        >
          <svg
            viewBox="0 0 76 76"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Star body */}
            <path d={STAR_PATH} fill="var(--theme-fg)" />

            {/* Left eye — sclera + pupil */}
            <circle
              cx={L_EYE.cx}
              cy={L_EYE.cy}
              r={EYE_R}
              fill="white"
              stroke="var(--theme-fg)"
              strokeWidth="0.6"
            />
            <circle
              cx={L_EYE.cx + pupil.x}
              cy={L_EYE.cy + pupil.y}
              r={PUPIL_R}
              fill="var(--theme-fg)"
            />

            {/* Right eye — sclera + pupil */}
            <circle
              cx={R_EYE.cx}
              cy={R_EYE.cy}
              r={EYE_R}
              fill="white"
              stroke="var(--theme-fg)"
              strokeWidth="0.6"
            />
            <circle
              cx={R_EYE.cx + pupil.x}
              cy={R_EYE.cy + pupil.y}
              r={PUPIL_R}
              fill="var(--theme-fg)"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
