"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type Language = "FR" | "EN" | "ՀԱՅ";

const i18n: Record<Language, { leaving: string; redirecting: string }> = {
  FR: {
    leaving: "Vous quittez le portfolio",
    redirecting: "Redirection vers Behance",
  },
  EN: {
    leaving: "Leaving the portfolio",
    redirecting: "Redirecting to Behance",
  },
  ՀԱՅ: {
    leaving: "Leaving the portfolio",
    redirecting: "Redirecting to Behance",
  },
};

// RR asterisk/star mark – extrait de public/icons/icon.svg
const RR_STAR_PATH =
  "M21.2637 4.08739L37.8817 26.3888L38.0898 26.3454L52.3654 3.49677L64.4675 12.5899L49.1889 33.6824L49.3474 33.824L74.6759 40.115L70.7839 54.6401L45.7033 47.424L45.4704 47.5599L48.1731 73.7679L33.2104 74.6175L32.2146 48.2718L32.0561 48.1302L6.39732 59.2027L1.30436 44.8482L27.3245 35.3599L27.3989 35.0824L9.58414 13.9477L21.2637 4.08739Z";

// Icône officielle Behance (public/behance.svg, fill="currentColor")
function BehanceMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="white"
      width="44"
      height="44"
      aria-hidden="true"
    >
      <path d="M6.938 4.503c.702-.731 1.844-1.469 3.626-1.469 2.332 0 3.806 1.469 3.806 3.718V10h3.021c.471 0 .887.384.887.837v3.433c0 .453-.416.837-.887.837h-3.021v2.6c0 1.722 1.12 2.333 2.214 2.333 1.096 0 1.887-.614 2.248-1.722h3.38c-.469 2.017-2.408 4.226-5.628 4.226-3.806 0-6.646-2.911-6.646-6.646 0-3.806 2.84-6.646 6.646-6.646 1.2 0 2.168.302 2.933.906v-2.6c0-2.249-1.474-3.718-3.806-3.718-1.782 0-2.924.738-3.626 1.469M14.304 10.806h-2.448V8.316h2.448v2.49zm-.924 5.928c.992 0 1.824.813 1.824 1.825s-.832 1.824-1.824 1.824c-1.012 0-1.844-.812-1.844-1.824s.832-1.825 1.844-1.825" />
    </svg>
  );
}

interface BehanceRedirectOverlayProps {
  url: string | null;
  language: Language;
  onDismiss: () => void;
}

export function BehanceRedirectOverlay({
  url,
  language,
  onDismiss,
}: BehanceRedirectOverlayProps) {
  const { isDark } = useTheme();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!url) {
      hasRedirected.current = false;
      return;
    }
    hasRedirected.current = false;
    const timer = setTimeout(() => {
      if (!hasRedirected.current) {
        hasRedirected.current = true;
        window.open(url, "_blank", "noopener,noreferrer");
        onDismiss();
      }
    }, 1550);
    return () => clearTimeout(timer);
  }, [url, onDismiss]);

  const t = i18n[language] ?? i18n.FR;

  // Couleurs adaptées au thème
  const bg = isDark ? "#0f0f12" : "#f2f2f7";
  const fg = isDark ? "rgba(255,255,255,0.88)" : "rgba(15,15,20,0.88)";
  const captionColor = isDark ? "rgba(255,255,255,0.42)" : "rgba(15,15,20,0.42)";

  return (
    <AnimatePresence>
      {url && (
        <motion.div
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ backgroundColor: bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Grain de fond très subtil – style pop */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: isDark
                ? "radial-gradient(circle at 20% 50%, rgba(49,77,203,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(23,105,255,0.06) 0%, transparent 60%)"
                : "radial-gradient(circle at 20% 50%, rgba(49,77,203,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(23,105,255,0.05) 0%, transparent 60%)",
            }}
          />

          {/* Eyebrow */}
          <motion.p
            className="uppercase tracking-[0.22em] text-[9px] md:text-[10px] font-semibold mb-12 md:mb-16 relative z-10"
            style={{
              color: captionColor,
              fontFamily: "var(--font-body)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.35, ease: "easeOut" }}
          >
            {t.leaving}
          </motion.p>

          {/* Composition centrale : RR → flèches → Behance */}
          <div className="flex items-center gap-5 md:gap-9 relative z-10">

            {/* Badge RR */}
            <motion.div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 84,
                height: 84,
                borderRadius: 22,
                backgroundColor: "#314DCB",
                boxShadow: isDark
                  ? "0 0 0 1px rgba(49,77,203,0.5), 0 16px 48px rgba(49,77,203,0.4)"
                  : "0 0 0 1px rgba(49,77,203,0.2), 0 16px 40px rgba(49,77,203,0.25)",
              }}
              initial={{ scale: 0.68, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.06,
                duration: 0.42,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <svg width="42" height="42" viewBox="0 0 76 76" fill="none">
                <path d={RR_STAR_PATH} fill="white" />
              </svg>
            </motion.div>

            {/* Flèches voyageuses */}
            <div className="flex gap-[6px] md:gap-[8px] items-center">
              {[0, 1, 2].map((i) => (
                <motion.svg
                  key={i}
                  width="18"
                  height="28"
                  viewBox="0 0 18 28"
                  fill="none"
                  style={{ flexShrink: 0 }}
                  animate={{
                    x: [-8, 0, 8],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    delay: 0.5 + i * 0.16,
                    duration: 0.72,
                    repeat: Infinity,
                    repeatDelay: 0.28,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M3.5 3.5L14.5 14L3.5 24.5"
                    stroke={isDark ? "rgba(255,255,255,0.28)" : "rgba(49,77,203,0.4)"}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              ))}
            </div>

            {/* Badge Behance */}
            <motion.div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 84,
                height: 84,
                borderRadius: 22,
                backgroundColor: "#1769FF",
                boxShadow: isDark
                  ? "0 0 0 1px rgba(23,105,255,0.5), 0 16px 48px rgba(23,105,255,0.4)"
                  : "0 0 0 1px rgba(23,105,255,0.2), 0 16px 40px rgba(23,105,255,0.25)",
              }}
              initial={{ scale: 0.68, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.18,
                duration: 0.42,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <BehanceMark />
            </motion.div>
          </div>

          {/* Caption bas */}
          <motion.div
            className="flex items-center gap-2 mt-12 md:mt-16 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            {/* Trois points de chargement */}
            <div className="flex gap-[5px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: captionColor,
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    delay: 0.6 + i * 0.18,
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <span
              className="text-[10px] md:text-[11px] font-medium"
              style={{ color: captionColor, fontFamily: "var(--font-body)" }}
            >
              {t.redirecting}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
