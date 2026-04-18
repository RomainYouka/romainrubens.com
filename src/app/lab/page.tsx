"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type Language = "FR" | "EN" | "ՀԱՅ";

const RR_STAR_PATH =
  "M21.2637 4.08739L37.8817 26.3888L38.0898 26.3454L52.3654 3.49677L64.4675 12.5899L49.1889 33.6824L49.3474 33.824L74.6759 40.115L70.7839 54.6401L45.7033 47.424L45.4704 47.5599L48.1731 73.7679L33.2104 74.6175L32.2146 48.2718L32.0561 48.1302L6.39732 59.2027L1.30436 44.8482L27.3245 35.3599L27.3989 35.0824L9.58414 13.9477L21.2637 4.08739Z";

const i18n: Record<Language, {
  eyebrow: string; headline: string; sub: string;
  placeholder: string; cta: string; success: string;
  successSub: string; errorInvalid: string; errorFail: string;
}> = {
  FR: {
    eyebrow:      "Bientôt disponible",
    headline:     "Le Laboratoire",
    sub:          "Un espace d'expérimentation, de prototypes interactifs et d'explorations créatives. Laissez votre adresse pour être averti(e) à l'ouverture.",
    placeholder:  "votre@email.com",
    cta:          "Me tenir informé(e)",
    success:      "Merci !",
    successSub:   "Vous serez averti(e) dès l'ouverture du Laboratoire.",
    errorInvalid: "Adresse e-mail invalide.",
    errorFail:    "Erreur lors de l'envoi. Réessayez.",
  },
  EN: {
    eyebrow:      "Coming soon",
    headline:     "The Laboratory",
    sub:          "A space for experimentation, interactive prototypes and creative explorations. Leave your address to be notified at launch.",
    placeholder:  "your@email.com",
    cta:          "Notify me",
    success:      "Thank you!",
    successSub:   "You'll be notified when the Laboratory opens.",
    errorInvalid: "Invalid email address.",
    errorFail:    "Error sending. Please try again.",
  },
  ՀԱՅ: {
    eyebrow:      "Շուտով",
    headline:     "Լաբորատորիա",
    sub:          "Փորձարկման, ինտերակտիվ նախատիպերի և ստեղծագործական հետազոտությունների տարածություն։ Թողեք ձեր հասցեն, որպեսզի ծանուցվեք բացման ժամանակ։",
    placeholder:  "ձեր@email.com",
    cta:          "Ծանուցե՛ք ինձ",
    success:      "Շնորհակалություն!",
    successSub:   "Կծանուցվեք Լաբի բացման ժամանակ։",
    errorInvalid: "ԱնValid e-mail.",
    errorFail:    "Սhկalka. Կrpin.",
  },
};

function detectLanguage(): Language {
  if (typeof window === "undefined") return "FR";
  const stored = localStorage.getItem("preferredLanguage");
  if (stored === "FR" || stored === "EN" || stored === "ՀԱՅ") return stored;
  return "FR";
}

export default function LabPage() {
  const { isDark, accentColor } = useTheme();
  const [lang, setLang] = useState<Language>("FR");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "invalid">("idle");

  useEffect(() => {
    setLang(detectLanguage());
    const handler = (e: CustomEvent<Language>) => setLang(e.detail);
    window.addEventListener("languageChange", handler as EventListener);
    return () => window.removeEventListener("languageChange", handler as EventListener);
  }, []);

  const t = i18n[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lab-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, language: lang }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fg = "var(--theme-fg)";
  const muted = "var(--theme-muted)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const borderColor = "var(--theme-border)";

  return (
    <main
      id="main-content"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 4rem",
        backgroundColor: "var(--theme-bg)",
      }}
    >
      <div style={{ maxWidth: 540, width: "100%", textAlign: "center" }}>

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 20,
            backgroundColor: "var(--theme-accent)",
            marginBottom: "2rem",
            boxShadow: isDark
              ? "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.4)"
              : "0 0 0 1px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.12)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 76 76" fill="none" aria-hidden="true">
            <path d={RR_STAR_PATH} style={{ fill: "var(--theme-accent-fg)" }} />
          </svg>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--theme-accent)",
            marginBottom: "0.75rem",
          }}
        >
          {t.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.45 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 10vw, 80px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: fg,
            marginBottom: "1.5rem",
          }}
        >
          {t.headline}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.6,
            color: muted,
            marginBottom: "2.5rem",
          }}
        >
          {t.sub}
        </motion.p>

        {/* Form / Success */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{
                padding: "2rem",
                borderRadius: 20,
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
              }}
            >
              {/* Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  backgroundColor: "var(--theme-accent)",
                  marginBottom: "1rem",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth={2.5} stroke="var(--theme-accent-fg)" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: fg, margin: "0 0 0.5rem" }}>
                {t.success}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: muted, margin: 0 }}>
                {t.successSub}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onSubmit={handleSubmit}
              style={{
                padding: "1.75rem",
                borderRadius: 20,
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
              }}
            >
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder={t.placeholder}
                  required
                  style={{
                    flex: "1 1 200px",
                    height: 44,
                    padding: "0 16px",
                    borderRadius: 980,
                    border: `1px solid ${status === "invalid" || status === "error" ? "#ef4444" : borderColor}`,
                    backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                    color: fg,
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    outline: "none",
                    transition: "border-color 180ms ease",
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    height: 44,
                    padding: "0 22px",
                    borderRadius: 980,
                    backgroundColor: "var(--theme-accent)",
                    color: "var(--theme-accent-fg)",
                    border: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: status === "loading" ? "wait" : "pointer",
                    opacity: status === "loading" ? 0.7 : 1,
                    transition: "opacity 180ms ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {status === "loading" ? "…" : t.cta}
                </button>
              </div>
              {(status === "invalid" || status === "error") && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ margin: "0.75rem 0 0", fontSize: 13, color: "#ef4444", fontFamily: "var(--font-body)" }}
                >
                  {status === "invalid" ? t.errorInvalid : t.errorFail}
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
