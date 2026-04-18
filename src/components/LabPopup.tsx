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
    success: "Merci. Vous serez informé(e) dès l’ouverture.",
    error: "Une erreur est survenue. Réessayez.",
    disclaimer: "Votre adresse email ne sera jamais vendue ni partagée. Elle sera utilisée uniquement pour vous notifier de l’ouverture du Lab, puis supprimée.",
    close: "Fermer",
  },
  EN: {
    title: "Soon",
    text: "Leave your email address to be notified as soon as it opens.",
    placeholder: "your@email.com",
    cta: "Notify me",
    loading: "Sending…",
    success: "Thank you. You’ll be notified as soon as it opens.",
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setEmail("");
    setStatus("idle");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => inputRef.current?.focus(), 220);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (status !== "success") return;

    const timer = window.setTimeout(() => onClose(), 1800);
    return () => window.clearTimeout(timer);
  }, [status, onClose]);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/lab-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (!response.ok) throw new Error("signup_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [email]);

  const isMobile = viewportWidth < 1024;
  const copy = COPY[language];
  const panelBackground = isDark ? "rgba(24,24,28,0.94)" : "rgba(255,255,255,0.96)";
  const borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const inputBackground = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)";

  const desktopLayout = useMemo(() => {
    const width = Math.min(420, Math.max(320, viewportWidth - 32));

    if (!anchorRect) {
      return {
        width,
        left: Math.max(16, Math.round((viewportWidth - width) / 2)),
        top: 88,
      };
    }

    const left = Math.min(
      Math.max(16, Math.round(anchorRect.left + anchorRect.width / 2 - width / 2)),
      viewportWidth - width - 16
    );

    return {
      width,
      left,
      top: Math.round(anchorRect.bottom + 14),
    };
  }, [anchorRect, viewportWidth]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            key="lab-backdrop"
            type="button"
            aria-label={copy.close}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99990,
              border: "none",
              background: isDark ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.48)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              cursor: "pointer",
            }}
          />

          <motion.div
            key={isMobile ? "lab-modal-mobile" : "lab-modal-desktop"}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-popup-title"
            initial={isMobile ? { opacity: 0, y: 28 } : { opacity: 0, scale: 0.96, y: -8 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { opacity: 0, y: 18 } : { opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              zIndex: 99991,
              width: isMobile ? "auto" : desktopLayout.width,
              left: isMobile ? 16 : desktopLayout.left,
              right: isMobile ? 16 : "auto",
              top: isMobile ? "auto" : desktopLayout.top,
              bottom: isMobile ? 16 : "auto",
              borderRadius: 24,
              border: `1px solid ${borderColor}`,
              background: panelBackground,
              boxShadow: isDark
                ? "0 24px 80px rgba(0,0,0,0.6)"
                : "0 24px 80px rgba(0,0,0,0.16)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 3,
                background: "linear-gradient(90deg, transparent 0%, var(--theme-accent) 18%, var(--theme-accent) 82%, transparent 100%)",
              }}
            />

            <div style={{ padding: isMobile ? "24px 20px 20px" : "24px 24px 20px", position: "relative" }}>
              <button
                type="button"
                onClick={onClose}
                aria-label={copy.close}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: `1px solid ${borderColor}`,
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  color: "var(--theme-muted)",
                  cursor: "pointer",
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                ×
              </button>

              <h2
                id="lab-popup-title"
                style={{
                  margin: "0 0 12px",
                  color: "var(--theme-fg)",
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? "clamp(30px, 8vw, 40px)" : "clamp(32px, 4vw, 42px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.96,
                  paddingRight: 40,
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
                  maxWidth: 360,
                }}
              >
                {copy.text}
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    borderRadius: 18,
                    border: `1px solid ${borderColor}`,
                    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                    padding: "18px 16px",
                    color: "var(--theme-fg)",
                    fontSize: 14.5,
                    fontWeight: 600,
                    lineHeight: 1.55,
                  }}
                >
                  {copy.success}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: "stretch",
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="email"
                      required
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder={copy.placeholder}
                      style={{
                        flex: "1 1 auto",
                        minWidth: 0,
                        height: 48,
                        borderRadius: 999,
                        border: `1px solid ${status === "error" ? "#ef4444" : borderColor}`,
                        background: inputBackground,
                        color: "var(--theme-fg)",
                        padding: "0 16px",
                        fontSize: 14.5,
                        outline: "none",
                      }}
                    />

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      style={{
                        height: 48,
                        padding: "0 20px",
                        borderRadius: 999,
                        border: "none",
                        background: "var(--theme-accent)",
                        color: "var(--theme-accent-fg)",
                        fontSize: 14.5,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        cursor: status === "loading" ? "wait" : "pointer",
                        opacity: status === "loading" ? 0.7 : 1,
                      }}
                    >
                      {status === "loading" ? copy.loading : copy.cta}
                    </button>
                  </div>

                  {status === "error" && (
                    <p
                      style={{
                        margin: "10px 4px 0",
                        color: "#ef4444",
                        fontSize: 12.5,
                        lineHeight: 1.5,
                      }}
                    >
                      {copy.error}
                    </p>
                  )}
                </form>
              )}

              <p
                style={{
                  margin: "16px 0 0",
                  paddingTop: 14,
                  borderTop: `1px solid ${borderColor}`,
                  color: "var(--theme-muted)",
                  fontSize: 11.5,
                  lineHeight: 1.6,
                }}
              >
                {copy.disclaimer}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
