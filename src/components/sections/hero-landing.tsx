"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Palette exacte demandée ──────────────────────────────────────────────────
const PALETTE = ["#141429", "#121C3B", "#162973", "#1D389F", "#2446C0", "#2651CD", "#3461E5"];

// 16 blobs répartis en grille 4×4 couvrant TOUTE la surface y compris les coins.
// Tailles larges (vw) pour rester visibles même au zoom minimum navigateur.
// dx/dy = trajectoires multi-keyframes pour un mouvement vraiment vivant.
const BLOBS = [
  // ── Rangée haute ──
  { c: 0, vw: 58, min: 220, max: 700, left:  "2%", top:  "2%",  delay: 0.0,  dur: 6.2, dx: [-12, 22, -8,  -12], dy: [-10, 20,  6,  -10] },
  { c: 4, vw: 50, min: 200, max: 620, left: "28%", top: "-2%",  delay: 1.6,  dur: 5.6, dx: [ 18,-14, 22,   18], dy: [ 14,-20, 10,   14] },
  { c: 6, vw: 46, min: 185, max: 580, left: "56%", top:  "0%",  delay: 2.9,  dur: 7.0, dx: [-20, 16,-26,  -20], dy: [ 10,-16, 18,   10] },
  { c: 1, vw: 55, min: 215, max: 680, left: "90%", top:  "5%",  delay: 0.7,  dur: 6.5, dx: [ 22,-18, 16,   22], dy: [-14, 22,-10,  -14] },
  // ── Rangée haute-milieu ──
  { c: 2, vw: 48, min: 190, max: 600, left: "14%", top: "30%",  delay: 3.4,  dur: 5.8, dx: [-18, 24,-14,  -18], dy: [-18, 16,-22,  -18] },
  { c: 5, vw: 56, min: 220, max: 700, left: "44%", top: "32%",  delay: 1.2,  dur: 7.5, dx: [ 16,-22, 20,   16], dy: [ 22,-16, 14,   22] },
  { c: 3, vw: 44, min: 175, max: 550, left: "72%", top: "28%",  delay: 2.2,  dur: 5.5, dx: [-22, 18,-16,  -22], dy: [-12, 24,-18,  -12] },
  { c: 6, vw: 40, min: 160, max: 500, left: "96%", top: "40%",  delay: 4.1,  dur: 6.0, dx: [ 14,-16, 20,   14], dy: [ 16,-20, 12,   16] },
  // ── Rangée basse-milieu ──
  { c: 1, vw: 52, min: 205, max: 640, left:  "4%", top: "58%",  delay: 1.9,  dur: 6.8, dx: [ 20,-18, 14,   20], dy: [-20, 14,-16,  -20] },
  { c: 4, vw: 46, min: 185, max: 575, left: "32%", top: "62%",  delay: 0.4,  dur: 5.2, dx: [-16, 20,-22,  -16], dy: [ 14,-22, 18,   14] },
  { c: 2, vw: 54, min: 215, max: 670, left: "62%", top: "58%",  delay: 3.0,  dur: 7.2, dx: [ 24,-20, 18,   24], dy: [-16, 20,-14,  -16] },
  { c: 0, vw: 42, min: 168, max: 520, left: "88%", top: "65%",  delay: 1.5,  dur: 5.5, dx: [-18, 14,-24,  -18], dy: [ 20,-14, 22,   20] },
  // ── Rangée basse ──
  { c: 5, vw: 56, min: 220, max: 700, left: "10%", top: "85%",  delay: 0.9,  dur: 6.4, dx: [ 18,-22, 14,   18], dy: [-18, 12,-22,  -18] },
  { c: 3, vw: 48, min: 192, max: 600, left: "38%", top: "90%",  delay: 2.6,  dur: 7.8, dx: [-20, 16,-18,  -20], dy: [ 22,-18, 16,   22] },
  { c: 6, vw: 44, min: 175, max: 550, left: "66%", top: "88%",  delay: 1.3,  dur: 5.8, dx: [ 16,-20, 22,   16], dy: [-14, 22,-10,  -14] },
  { c: 2, vw: 52, min: 205, max: 640, left: "92%", top: "84%",  delay: 3.8,  dur: 6.2, dx: [-22, 18,-14,  -22], dy: [ 12,-20, 18,   12] },
];

const translations = {
  FR:  { text: "Hey, moi c'est Romain Rubens",      button: "Découvrir"  },
  EN:  { text: "Hello, I'm Romain Rubens",          button: "Discover"   },
  ՀԱՅ: { text: "Ողջույն, ես Ռոման Ռուբենս եմ",     button: "ԲԱՑԱՀԱՅТЕЛ" },
};

export default function HeroLanding() {
  const { isDark } = useTheme();

  const [displayedText,     setDisplayedText]     = useState("");
  const [selectedLanguage,  setSelectedLanguage]  = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [isTyping,          setIsTyping]          = useState(false);
  const [showScrollButton,  setShowScrollButton]  = useState(false);
  const [btnVisible,        setBtnVisible]        = useState(false);
  const [splashDone,        setSplashDone]        = useState(false);
  const [showInitialCursor, setShowInitialCursor] = useState(false);
  const [userInteracted,    setUserInteracted]    = useState(false);

  const fullText   = translations[selectedLanguage].text;
  const buttonText = translations[selectedLanguage].button;

  // ── Langue ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      const comingFromResume = sessionStorage.getItem("comingFromResume");
      if (comingFromResume === "true") sessionStorage.setItem("introSeen", "true");
    }
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !translations[saved]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
  }, []);

  useEffect(() => {
    const handler = (e: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(e.detail);
      setDisplayedText("");
      setIsTyping(true);
      setShowScrollButton(false);
      setBtnVisible(false);
      setShowInitialCursor(true);
    };
    window.addEventListener("languageChange", handler as EventListener);
    return () => window.removeEventListener("languageChange", handler as EventListener);
  }, []);

  // ── Splash / intro ───────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      if (sessionStorage.getItem("introSeen") === "true") {
        setSplashDone(true);
        setShowInitialCursor(true);
      }
    };
    check();
    const interval = setInterval(check, 100);
    const timeout  = setTimeout(() => {
      clearInterval(interval);
      if (!splashDone) { setSplashDone(true); setShowInitialCursor(true); }
    }, 5000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [splashDone]);

  useEffect(() => {
    if (!showInitialCursor) return;
    const t = setTimeout(() => { setShowInitialCursor(false); setIsTyping(true); }, 1000);
    return () => clearTimeout(t);
  }, [showInitialCursor]);

  // ── Typewriter ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!splashDone || !isTyping) return;
    if (displayedText.length < fullText.length) {
      const t = setTimeout(() => setDisplayedText(fullText.slice(0, displayedText.length + 1)), 100);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setIsTyping(false); setShowScrollButton(true); }, 500);
      return () => clearTimeout(t);
    }
  }, [displayedText, isTyping, fullText, splashDone]);

  // ── Animation d'entrée du bouton scroll ──────────────────────────────────────
  useEffect(() => {
    if (!showScrollButton) return;
    const t = setTimeout(() => setBtnVisible(true), 60);
    return () => clearTimeout(t);
  }, [showScrollButton]);

  // ── Auto-scroll ─────────────────────────────────────────────────────────────
  const handleScroll = () => {
    setUserInteracted(true);
    document.getElementById("personal-intro")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!showScrollButton) return;
    const onScroll = () => setUserInteracted(true);
    window.addEventListener("scroll", onScroll, { once: true });
    const t = setTimeout(() => { if (!userInteracted) handleScroll(); }, 5000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, [showScrollButton, userInteracted]);

  // ── Couleurs selon thème ─────────────────────────────────────────────────────
  const bgColor    = isDark ? "#09091a"                  : "#f0f0f5";
  const glassColor = isDark ? "rgba(9,9,26,0.22)"        : "rgba(240,240,245,0.18)";
  const glassBlur  = isDark ? "20px"                     : "14px";
  const textColor  = isDark ? "#ffffff"                  : "#1d1d1f";
  const mutedColor = isDark ? "rgba(255,255,255,0.72)"   : "rgba(20,20,41,0.70)";
  // Opacité blobs : plus élevée en mode clair pour que les bleus soient bien visibles
  const opacityKf  = isDark
    ? [0.52, 0.78, 0.62, 0.52]
    : [0.65, 0.88, 0.74, 0.65];

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      data-section="hero-landing"
      style={{ backgroundColor: bgColor }}
    >
      {/* ── Blobs vivants — palette #141429…#3461E5 ──────────────────────── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }} aria-hidden="true">
        {BLOBS.map((b, i) => {
          const color = PALETTE[b.c];
          const size  = `clamp(${b.min}px, ${b.vw}vw, ${b.max}px)`;
          const blur  = `clamp(${Math.round(b.min * 0.22)}px, ${(b.vw * 0.22).toFixed(1)}vw, ${Math.round(b.max * 0.22)}px)`;
          return (
            <motion.div
              key={i}
              animate={{
                x:       b.dx,
                y:       b.dy,
                scale:   [1, 1.20, 0.92, 1],
                opacity: opacityKf,
              }}
              transition={{
                duration: b.dur,
                delay:    b.delay,
                repeat:   Infinity,
                ease:     "easeInOut",
                times:    [0, 0.35, 0.70, 1],
              }}
              style={{
                position:        "absolute",
                left:            b.left,
                top:             b.top,
                width:           size,
                height:          size,
                borderRadius:    "50%",
                backgroundColor: color,
                filter:          `blur(${blur})`,
                transform:       "translate(-50%, -50%)",
                willChange:      "transform, opacity",
              }}
            />
          );
        })}
      </div>

      {/* ── Couche verre dépoli (légère pour laisser les blobs respirer) ─── */}
      <div
        aria-hidden="true"
        style={{
          position:             "absolute",
          inset:                0,
          zIndex:               2,
          backdropFilter:       `blur(${glassBlur})`,
          WebkitBackdropFilter: `blur(${glassBlur})`,
          backgroundColor:      glassColor,
        }}
      />

      {/* ── Contenu ─────────────────────────────────────────────────────── */}
      <div className="relative w-full h-full flex flex-col items-center justify-center" style={{ zIndex: 10 }}>

        {/* Titre typewriter */}
        <div className="flex items-center justify-center flex-1 w-full px-4">
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(28px, 6.5vw, 80px)",
              fontWeight:    600,
              color:         textColor,
              letterSpacing: "-0.02em",
              lineHeight:    1.3,
              textAlign:     "center",
              opacity:       splashDone ? 1 : 0,
              transition:    "opacity 0.6s ease",
              maxWidth:      "90vw",
            }}
          >
            <span className="sr-only">{fullText}</span>
            <span aria-hidden="true">
              {showInitialCursor && !displayedText ? (
                <span style={{ animation: "blink 0.7s infinite" }}>|</span>
              ) : displayedText ? (
                <span>
                  {displayedText}
                  <span style={{
                    animation:  isTyping ? "blink 0.7s infinite" : "none",
                    opacity:    isTyping ? 1 : 0,
                    transition: "opacity 0.1s ease",
                    marginLeft: "-0.05em",
                    whiteSpace: "nowrap",
                  }}>|</span>
                </span>
              ) : (
                <span style={{ visibility: "hidden" }}>{fullText}</span>
              )}
            </span>
          </h1>
        </div>

        {/* Bouton scroll — centrage sans transform conflictuel ──────────── */}
        {showScrollButton && (
          <div
            className="absolute bottom-8 md:bottom-12"
            style={{ left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 20 }}
          >
            <button
              onClick={handleScroll}
              aria-label="Scroll down to continue"
              style={{
                display:    "flex",
                flexDirection: "column",
                alignItems: "center",
                gap:        "8px",
                background: "none",
                border:     "none",
                padding:    "16px",
                cursor:     "pointer",
                opacity:    btnVisible ? 1 : 0,
                transform:  `translateY(${btnVisible ? 0 : 20}px)`,
                transition: "opacity 0.6s ease, transform 0.6s ease, scale 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.scale = "1.1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.scale = "1"; }}
            >
              <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: mutedColor, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {buttonText}
              </span>
              <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: mutedColor }} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
