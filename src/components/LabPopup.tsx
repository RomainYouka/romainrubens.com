"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import type { Language } from "@/lib/language";

interface LabPopupProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  anchorRect: { left: number; width: number; bottom: number } | null;
}

const COPY: Record<Language, { title: string; text: string; close: string }> = {
  FR: {
    title: "Bientôt",
    text: "Un espace d'expérimentation et de prototypes interactifs. Ouverture prochaine.",
    close: "Fermer",
  },
  EN: {
    title: "Soon",
    text: "A space for experimentation and interactive prototypes. Opening soon.",
    close: "Close",
  },
  ՀԱՅ: {
    title: "Շուտով",
    text: "Փորձարկման և ինտերակտիվ նախատիպերի տարածություն։ Շուտով կբացվի։",
    close: "Փակել",
  },
};

export function LabPopup({ isOpen, onClose, language, anchorRect }: LabPopupProps) {
  const { isDark } = useTheme();
  const triggerRef = useRef<Element | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      (triggerRef.current as HTMLElement | null)?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const isMobile = viewportWidth < 1024;
  const copy = COPY[language];
  const panelBg = isDark ? "rgba(18,18,22,0.97)" : "rgba(255,255,255,0.98)";
  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)";

  const layout = useMemo(() => {
    const width = Math.min(380, Math.max(280, viewportWidth - 32));
    if (!anchorRect) {
      return { width, left: Math.max(16, Math.round((viewportWidth - width) / 2)), top: 88 };
    }
    const left = Math.min(
      Math.max(16, Math.round(anchorRect.left + anchorRect.width / 2 - width / 2)),
      viewportWidth - width - 16
    );
    return { width, left, top: Math.round(anchorRect.bottom + 14) };
  }, [anchorRect, viewportWidth]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.button
            key="lab-backdrop"
            type="button"
            aria-label={copy.close}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed", inset: 0, zIndex: 99990,
              border: "none",
              background: isDark ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.4)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              cursor: "pointer",
            }}
          />

          {/* Card */}
          <motion.div
            key={isMobile ? "lab-m" : "lab-d"}
            initial={isMobile ? { opacity: 0, y: 32, scale: 0.97 } : { opacity: 0, scale: 0.93, y: -12 }}
            animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { opacity: 0, y: 20, scale: 0.97 } : { opacity: 0, scale: 0.95, y: -6 }}
            transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.75 }}
            style={{
              position: "fixed",
              zIndex: 99991,
              width: isMobile ? "auto" : layout.width,
              left: isMobile ? 16 : layout.left,
              right: isMobile ? 16 : "auto",
              top: isMobile ? "auto" : layout.top,
              bottom: isMobile ? 16 : "auto",
            }}
          >
            {/* Rotating border container */}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="lab-popup-title"
              style={{
                position: "relative",
                borderRadius: 26,
                overflow: "hidden",
                boxShadow: isDark
                  ? "0 32px 80px rgba(0,0,0,0.7), 0 0 40px -8px var(--theme-accent)"
                  : "0 24px 64px rgba(0,0,0,0.18), 0 0 32px -8px var(--theme-accent)",
              }}
            >
              {/* Spinning conic-gradient border */}
              <div
                style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  width: "250%",
                  paddingTop: "250%",
                  marginLeft: "-125%",
                  marginTop: "-125%",
                  background: "conic-gradient(from 0deg, var(--theme-accent) 0deg, var(--theme-accent-gradient, var(--theme-accent)) 60deg, transparent 120deg, transparent 180deg, var(--theme-accent) 220deg, var(--theme-accent-gradient, var(--theme-accent)) 280deg, transparent 340deg, var(--theme-accent) 360deg)",
                  animationName: "lab-border-spin",
                  animationDuration: "4s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationPlayState: "running",
                }}
              />

              {/* Inner card */}
              <div
                style={{
                  position: "relative",
                  margin: "2px",
                  borderRadius: 24,
                  background: panelBg,
                  zIndex: 1,
                  padding: isMobile ? "28px 22px 24px" : "32px 28px 26px",
                }}
              >
                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={copy.close}
                  style={{
                    position: "absolute", top: 16, right: 16,
                    width: 34, height: 34, borderRadius: 999,
                    border: `1px solid ${border}`,
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    color: "var(--theme-muted)",
                    cursor: "pointer", fontSize: 18, lineHeight: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "opacity 150ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  ×
                </button>

                {/* Title */}
                <h2
                  id="lab-popup-title"
                  style={{
                    margin: "0 0 12px",
                    color: "var(--theme-fg)",
                    fontFamily: "var(--font-display)",
                    fontSize: isMobile ? "clamp(36px, 10vw, 52px)" : "clamp(40px, 4vw, 52px)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.96,
                    paddingRight: 44,
                  }}
                >
                  {copy.title}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "var(--theme-muted)",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                  }}
                >
                  {copy.text}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
