"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface LabPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export function LabPopup({ isOpen, onClose }: LabPopupProps) {
  const { isDark } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!isOpen) return;

    setEmail("");
    setStatus("idle");

    const timer = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => window.clearTimeout(timer);
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

  const panelBackground = isDark ? "rgba(24,24,28,0.92)" : "rgba(255,255,255,0.94)";
  const borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const inputBackground = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            key="lab-backdrop"
            type="button"
            aria-label="Fermer la fenêtre"
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
            key="lab-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-popup-title"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 99991,
              width: "min(560px, calc(100vw - 32px))",
              transform: "translate(-50%, -50%)",
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

            <div style={{ padding: "28px 28px 24px", position: "relative" }}>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  width: 36,
                  height: 36,
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
                  margin: "0 0 14px",
                  color: "var(--theme-fg)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(34px, 6vw, 52px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                }}
              >
                Bientôt
              </h2>

              <p
                style={{
                  margin: "0 0 24px",
                  color: "var(--theme-muted)",
                  fontSize: 15,
                  lineHeight: 1.65,
                  maxWidth: 420,
                }}
              >
                Le Lab est en cours de préparation.
                <br />
                Laissez votre adresse email pour être informé(e) dès son ouverture.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    borderRadius: 18,
                    border: `1px solid ${borderColor}`,
                    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                    padding: "20px 18px",
                    color: "var(--theme-fg)",
                    fontSize: 15,
                    fontWeight: 600,
                    lineHeight: 1.55,
                  }}
                >
                  Merci. Vous serez informé(e) dès l’ouverture.
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
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
                      placeholder="votre@email.com"
                      style={{
                        flex: "1 1 240px",
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
                      {status === "loading" ? "Envoi…" : "Être informé(e)"}
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
                      Une erreur est survenue. Réessayez.
                    </p>
                  )}
                </form>
              )}

              <p
                style={{
                  margin: "18px 0 0",
                  paddingTop: 16,
                  borderTop: `1px solid ${borderColor}`,
                  color: "var(--theme-muted)",
                  fontSize: 11.5,
                  lineHeight: 1.6,
                }}
              >
                Votre adresse email ne sera jamais vendue ni partagée.
                <br />
                Elle sera utilisée uniquement pour vous notifier de l’ouverture du Lab, puis supprimée.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
