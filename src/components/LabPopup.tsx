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

type Status = "idle" | "loading" | "success" | "error";

const COPY: Record<Language, {
  title: string;
  text: string;
  placeholder: string;
  cta: string;
  loading: string;
  success: string;
  error: string;
  disclaimer: string;
  close: string;
}> = {
  FR: {
    title: "Bientôt",
    text: "Laissez votre adresse email pour être informé(e) dès son ouverture.",
    placeholder: "votre@email.com",
    cta: "Être informé(e)",
    loading: "Envoi…",
    success: "Merci. Vous serez informé(e) dès l'ouverture.",
    error: "Une erreur est survenue. Réessayez.",
    disclaimer: "Votre adresse email ne sera jamais vendue ni partagée. Elle sera utilisée uniquement pour vous notifier de l'ouverture du Lab, puis supprimée.",
    close: "Fermer",
  },
  EN: {
    title: "Soon",
    text: "Leave your email address to be notified as soon as it opens.",
    placeholder: "your@email.com",
    cta: "Notify me",
    loading: "Sending…",
    success: "Thank you. You'll be notified as soon as it opens.",
    error: "Something went wrong. Please try again.",
    disclaimer: "Your email address will never be sold or shared. It will only be used to notify you when the Lab opens, then deleted.",
    close: "Close",
  },
  ՀԱՅ: {
    title: "Շուտով",
    text: "Թողեք ձեր էլ. հասցեն, որպեսզի տեղեկանաք բացվելուն պես։",
    placeholder: "ձեր@email.com",
    cta: "Տեղեկացնել ինձ",
    loading: "Ուղարկում…",
    success: "Շնորհակալություն։ Դուք կտեղեկացվեք բացվելուն պես։",
    error: "Սխալ տեղի ունեցավ։ Փորձեք կրկին։",
    disclaimer: "Ձեր էլ. հասցեն երբեք չի վաճառվի կամ փոխանցվի։ Այն կօգտագործվի միայն Lab-ի բացման մասին տեղեկացնելու համար, ապա կհեռացվի։",
    close: "Փակել",
  },
};

export function LabPopup({ isOpen, onClose, language, anchorRect }: LabPopupProps) {
  const { isDark } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
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
    setEmail("");
    setStatus("idle");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 260);
    return () => {
      window.clearTimeout(t);
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

  useEffect(() => {
    if (status !== "success") return;
    const t = window.setTimeout(() => onClose(), 2200);
    return () => window.clearTimeout(t);
  }, [status, onClose]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/lab-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [email]);

  const isMobile = viewportWidth < 1024;
  const copy = COPY[language];
  const panelBg = isDark ? "rgba(18,18,22,0.97)" : "rgba(255,255,255,0.98)";
  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)";
  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)";

  const layout = useMemo(() => {
    const width = Math.min(420, Math.max(320, viewportWidth - 32));
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
              background: isDark ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.5)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              cursor: "pointer",
            }}
          />

          {/* Card wrapper — handles positioning & entrance animation */}
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
              {/* Spinning conic-gradient — creates the animated border */}
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

              {/* Inner card — covers gradient center, leaving 2px "border" */}
              <div
                style={{
                  position: "relative",
                  margin: "2px",
                  borderRadius: 24,
                  background: panelBg,
                  zIndex: 1,
                  padding: isMobile ? "24px 20px 20px" : "28px 26px 22px",
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
                    margin: "0 0 10px",
                    color: "var(--theme-fg)",
                    fontFamily: "var(--font-display)",
                    fontSize: isMobile ? "clamp(30px, 8vw, 40px)" : "clamp(34px, 4vw, 44px)",
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
                    margin: "0 0 20px",
                    color: "var(--theme-muted)",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                  }}
                >
                  {copy.text}
                </p>

                {/* Form / Success */}
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 360, damping: 24 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        borderRadius: 16,
                        border: `1px solid ${border}`,
                        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                        padding: "14px 16px",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.1 }}
                        style={{
                          flexShrink: 0,
                          width: 36, height: 36, borderRadius: "50%",
                          background: "var(--theme-accent)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="var(--theme-accent-fg)" strokeWidth={2.5}
                          strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>
                      <p style={{
                        margin: 0, color: "var(--theme-fg)",
                        fontSize: 14.5, fontWeight: 600, lineHeight: 1.45,
                      }}>
                        {copy.success}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                    >
                      <div style={{
                        display: "flex", gap: 8,
                        flexDirection: isMobile ? "column" : "row",
                      }}>
                        <input
                          ref={inputRef}
                          type="email"
                          required
                          value={email}
                          aria-describedby={status === "error" ? "lab-form-error" : undefined}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                          }}
                          placeholder={copy.placeholder}
                          style={{
                            flex: "1 1 auto", minWidth: 0,
                            height: 48, borderRadius: 999,
                            border: `1px solid ${status === "error" ? "#ef4444" : border}`,
                            background: inputBg,
                            color: "var(--theme-fg)",
                            padding: "0 16px", fontSize: 14.5, outline: "none",
                            transition: "border-color 150ms",
                          }}
                          onFocus={(e) => {
                            if (status !== "error") e.currentTarget.style.borderColor = "var(--theme-accent)";
                          }}
                          onBlur={(e) => {
                            if (status !== "error") e.currentTarget.style.borderColor = border;
                          }}
                        />
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          style={{
                            height: 48, padding: "0 20px", borderRadius: 999,
                            border: "none",
                            background: "var(--theme-accent)",
                            color: "var(--theme-accent-fg)",
                            fontSize: 14.5, fontWeight: 700,
                            whiteSpace: "nowrap",
                            cursor: status === "loading" ? "wait" : "pointer",
                            opacity: status === "loading" ? 0.65 : 1,
                            transition: "opacity 150ms, transform 120ms",
                          }}
                          onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.opacity = "0.85"; }}
                          onMouseLeave={(e) => { if (status !== "loading") e.currentTarget.style.opacity = "1"; }}
                          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
                          onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                        >
                          {status === "loading" ? copy.loading : copy.cta}
                        </button>
                      </div>

                      <AnimatePresence>
                        {status === "error" && (
                          <motion.p
                            id="lab-form-error"
                            role="alert"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ margin: "8px 4px 0", color: "#ef4444", fontSize: 12.5, lineHeight: 1.5 }}
                          >
                            {copy.error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Disclaimer */}
                <p style={{
                  margin: "16px 0 0",
                  paddingTop: 14,
                  borderTop: `1px solid ${border}`,
                  color: "var(--theme-muted)",
                  fontSize: 11.5,
                  lineHeight: 1.6,
                  opacity: 0.75,
                }}>
                  {copy.disclaimer}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
