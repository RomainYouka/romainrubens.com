"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/contexts/PageTransitionContext";

const STRIPS = 8;
const TILE = 60;

const STAR_PATH =
  "M21.2637 4.08739L37.8817 26.3888L38.0898 26.3454L52.3654 3.49677L64.4675 12.5899" +
  "L49.1889 33.6824L49.3474 33.824L74.6759 40.115L70.7839 54.6401L45.7033 47.424" +
  "L45.4704 47.5599L48.1731 73.7679L33.2104 74.6175L32.2146 48.2718L32.0561 48.1302" +
  "L6.39732 59.2027L1.30436 44.8482L27.3245 35.3599L27.3989 35.0824L9.58414 13.9477" +
  "L21.2637 4.08739Z";

function makeTileBg(starColor: string, bgColor: string, offset = false) {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}" viewBox="0 0 75 75">` +
      `<rect width="75" height="75" fill="${bgColor}"/>` +
      `<path d="${STAR_PATH}" fill="${starColor}"/>` +
    `</svg>`
  );
  return {
    backgroundImage: `url("data:image/svg+xml,${svg}")`,
    backgroundSize: `${TILE}px ${TILE}px`,
    backgroundRepeat: "repeat" as const,
    backgroundPosition: offset ? `${TILE / 2}px ${TILE / 2}px` : "0 0",
  };
}

// Précalculé une seule fois — alternance sombre/bleu pop-art
const STRIP_STYLES = Array.from({ length: STRIPS }).map((_, i) => {
  const isEven = i % 2 === 0;
  return makeTileBg(
    isEven ? "#314DCB" : "#1d1d1f",
    isEven ? "#1d1d1f" : "#314DCB",
    !isEven
  );
});

// Centre du logo dans la nav (~40px depuis la gauche, ~32px depuis le haut)
const ORIGIN = "40px 32px";

export function PageTransitionOverlay() {
  const { phase } = usePageTransition();

  if (phase === "idle") return null;

  return (
    <motion.div
      initial={{ clipPath: `circle(0px at ${ORIGIN})`, y: "0%" }}
      animate={
        phase === "out"
          ? { clipPath: `circle(2500px at ${ORIGIN})`, y: "-100%" }
          : { clipPath: `circle(2500px at ${ORIGIN})`, y: "0%" }
      }
      transition={
        phase === "out"
          ? { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0.72, ease: [0.76, 0, 0.24, 1] }
      }
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "all",
        display: "flex",
      }}
    >
      {STRIP_STYLES.map((style, i) => (
        <div
          key={i}
          style={{
            flex: "1 0 0",
            marginRight: i < STRIPS - 1 ? "-1px" : "0",
            ...style,
          }}
        />
      ))}
    </motion.div>
  );
}
