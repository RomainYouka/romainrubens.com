"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Palette complète de l'animation de transition de page ───────────────────
// Chaque blob a sa couleur mode sombre et son équivalent mode clair
const BLOBS = [
  // dk = dark mode color, lt = light mode color
  // vw = taille en % viewport (responsive), min/max en px
  // dx/dy = chemin de mouvement multi-keyframes pour effet vivant
  { dk: "#1a2880", lt: "#314DCB", vw: 52, min: 200, max: 640, left: "8%",  top: "15%",  delay: 0,    dur: 6.2, dx: [-18, 28, -8,  -18], dy: [-12, 20,  8,  -12] },
  { dk: "#314DCB", lt: "#6080f8", vw: 58, min: 220, max: 700, left: "74%", top: "62%",  delay: 1.8,  dur: 8.0, dx: [ 24,-20, 28,   24], dy: [ 18,-22, 10,   18] },
  { dk: "#3a5cd8", lt: "#4268e0", vw: 34, min: 140, max: 440, left: "80%", top: "8%",   delay: 2.4,  dur: 4.8, dx: [-16, 14,-20,  -16], dy: [-10, 18, -6,  -10] },
  { dk: "#141e58", lt: "#2c4ac0", vw: 46, min: 180, max: 580, left: "38%", top: "80%",  delay: 0.7,  dur: 7.0, dx: [ 14,-18, 20,   14], dy: [ 26,-20, 16,   26] },
  { dk: "#243599", lt: "#3a5cd8", vw: 40, min: 160, max: 500, left: "52%", top: "40%",  delay: 3.5,  dur: 5.5, dx: [-26, 22,-18,  -26], dy: [-16, 14,-22,  -16] },
  { dk: "#0d0d1c", lt: "#4268e0", vw: 30, min: 120, max: 380, left: "22%", top: "70%",  delay: 1.2,  dur: 5.0, dx: [ 12,-22, 16,   12], dy: [-22, 12,-14,  -22] },
  { dk: "#2c4ac0", lt: "#6080f8", vw: 44, min: 170, max: 540, left: "28%", top: "22%",  delay: 2.9,  dur: 6.6, dx: [-14, 20,-24,  -14], dy: [ 16,-26, 12,   16] },
  { dk: "#1e2e7a", lt: "#314DCB", vw: 36, min: 140, max: 460, left: "62%", top: "85%",  delay: 0.4,  dur: 5.8, dx: [ 20,-14, 24,   20], dy: [-18, 22,-10,  -18] },
  { dk: "#4268e0", lt: "#6080f8", vw: 28, min: 110, max: 360, left: "48%", top: "58%",  delay: 4.0,  dur: 4.5, dx: [-20, 16,-12,  -20], dy: [ 12,-16, 20,   12] },
];

const translations = {
  FR: { text: "Hey, moi c'est Romain Rubens", button: "Découvrir" },
  EN: { text: "Hello, I'm Romain Rubens",     button: "Discover"  },
  ՀԱՅ: { text: "Ողջույն, ես Ռոման Ռուբենս եմ", button: "ԲԱՑԱՀԱՅТЕЛ" },
};

export default function HeroLanding() {
  const { isDark } = useTheme();

  const [displayedText,     setDisplayedText]     = useState("");
  const [selectedLanguage,  setSelectedLanguage]  = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [isTyping,          setIsTyping]          = useState(false);
  const [showScrollButton,  setShowScrollButton]  = useState(false);
  const [splashDone,        setSplashDone]        = useState(false);
  const [showInitialCursor, setShowInitialCursor] = useState(false);
  const [userInteracted,    setUserInteracted]    = useState(false);

  const fullText   = translations[selectedLanguage].text;
  const buttonText = translations[selectedLanguage].button;

  // ── Langue ──
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
      setShowInitialCursor(true);
    };
    window.addEventListener("languageChange", handler as EventListener);
    return () => window.removeEventListener("languageChange", handler as EventListener);
  }, []);

  // ── Splash / intro ──
  useEffect(() => {
    const checkSplashDone = () => {
      if (sessionStorage.getItem("introSeen") === "true") {
        setSplashDone(true);
        setShowInitialCursor(true);
      }
    };
    checkSplashDone();
    const interval = setInterval(checkSplashDone, 100);
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

  // ── Typewriter ──
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

  // ── Scroll auto ──
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

  // ── Couleurs selon le thème ──
  const bgColor    = isDark ? "#09091a"              : "#f5f5f7";
  const glassColor = isDark ? "rgba(9,9,26,0.30)"   : "rgba(245,245,247,0.48)";
  const textColor  = isDark ? "#ffffff"              : "#1d1d1f";
  const mutedColor = isDark ? "rgba(255,255,255,0.70)" : "rgba(29,29,31,0.60)";
  const opacityKf  = isDark ? [0.45, 0.72, 0.52, 0.45] : [0.38, 0.62, 0.46, 0.38];

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      data-section="hero-landing"
      style={{ backgroundColor: bgColor }}
    >
      {/* ── Blobs vivants ─────────────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }} aria-hidden="true">
        {BLOBS.map((b, i) => {
          const size = `clamp(${b.min}px, ${b.vw}vw, ${b.max}px)`;
          const blur = `clamp(${Math.round(b.min * 0.22)}px, ${(b.vw * 0.22).toFixed(1)}vw, ${Math.round(b.max * 0.22)}px)`;
          const color = isDark ? b.dk : b.lt;
          return (
            <motion.div
              key={i}
              animate={{
                x:       b.dx,
                y:       b.dy,
                scale:   [1, 1.18, 0.94, 1],
                opacity: opacityKf,
              }}
              transition={{
                duration:  b.dur,
                delay:     b.delay,
                repeat:    Infinity,
                ease:      "easeInOut",
                times:     [0, 0.38, 0.72, 1],
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

      {/* ── Couche verre dépoli ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:              "absolute",
          inset:                 0,
          zIndex:                2,
          backdropFilter:        "blur(24px)",
          WebkitBackdropFilter:  "blur(24px)",
          backgroundColor:       glassColor,
        }}
      />

      {/* ── Contenu ────────────────────────────────────────────────────── */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{ zIndex: 10 }}
      >
        <div className="flex items-center justify-center flex-1">
          <h1
            style={{
              fontFamily:  "var(--font-display)",
              fontSize:    "clamp(28px, 6.5vw, 80px)",
              fontWeight:  600,
              color:       textColor,
              letterSpacing: "-0.02em",
              lineHeight:  1.3,
              textAlign:   "center",
              opacity:     splashDone ? 1 : 0,
              transition:  "opacity 0.6s ease",
              paddingLeft: "clamp(16px, 5vw, 48px)",
              paddingRight:"clamp(16px, 5vw, 48px)",
              maxWidth:    "95vw",
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
      </div>

      {/* ── Bouton scroll ──────────────────────────────────────────────── */}
      {showScrollButton && (
        <button
          onClick={handleScroll}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110"
          style={{ animation: "fadeInUp 0.6s ease-in forwards", background: "none", border: "none", padding: "16px", zIndex: 20 }}
          aria-label="Scroll down to continue"
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: mutedColor, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {buttonText}
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: mutedColor }} />
        </button>
      )}

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) translateX(-50%); }
          to   { opacity: 1; transform: translateY(0)    translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
