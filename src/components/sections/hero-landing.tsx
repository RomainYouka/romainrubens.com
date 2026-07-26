"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import type { AccentColor } from "@/contexts/ThemeContext";

const PALETTE_MAP: Record<AccentColor, string[]> = {
  blue:   ["#141429", "#121C3B", "#162973", "#1D389F", "#2446C0", "#2651CD", "#3461E5"],
  pink:   ["#1a0008", "#2d000f", "#4a0018", "#700025", "#96003A", "#B2003A", "#d4004a"],
  green:  ["#060f0c", "#0a1f18", "#0d2a1e", "#103a2a", "#155038", "#1a6848", "#28a070"],
  orange: ["#1a0c00", "#2e1800", "#4a2800", "#6e3c00", "#8c5000", "#b26000", "#e08040"],
  mono:   ["#111111", "#1d1d1d", "#2a2a2a", "#383838", "#484848", "#5a5a5a", "#6e6e6e"],
};

// 24 blobs en grille 6×4 — couverture totale gauche/droite/coins.
const BLOBS = [
  // ── Rangée 1 (haut) ──
  { c:0, vw:56, min:215, max:690, left: "3%", top: "2%",  delay:0.0,  dur:6.2, dx:[-12, 22, -8,-12], dy:[-10, 20,  6,-10] },
  { c:4, vw:48, min:190, max:600, left:"21%", top:"-2%",  delay:1.4,  dur:5.8, dx:[ 16,-14, 20, 16], dy:[ 12,-18,  8, 12] },
  { c:6, vw:52, min:205, max:645, left:"39%", top: "1%",  delay:2.8,  dur:6.8, dx:[-18, 14,-22,-18], dy:[  8,-14, 16,  8] },
  { c:1, vw:46, min:185, max:575, left:"57%", top: "4%",  delay:0.6,  dur:5.4, dx:[ 20,-16, 14, 20], dy:[-12, 18, -8,-12] },
  { c:3, vw:54, min:215, max:670, left:"75%", top:"-1%",  delay:1.9,  dur:7.2, dx:[-14, 20,-18,-14], dy:[ 16,-12, 20, 16] },
  { c:2, vw:50, min:200, max:620, left:"93%", top: "6%",  delay:3.2,  dur:6.0, dx:[ 18,-22, 12, 18], dy:[-16, 12,-20,-16] },
  // ── Rangée 2 (haut-milieu) ──
  { c:5, vw:50, min:200, max:620, left: "3%", top:"32%",  delay:1.1,  dur:5.6, dx:[ 14,-18, 22, 14], dy:[-18, 14,-16,-18] },
  { c:2, vw:44, min:175, max:550, left:"21%", top:"28%",  delay:3.5,  dur:7.4, dx:[-20, 16,-14,-20], dy:[ 14,-20, 18, 14] },
  { c:0, vw:56, min:220, max:695, left:"39%", top:"34%",  delay:0.3,  dur:6.4, dx:[ 22,-18, 16, 22], dy:[-12, 22,-14,-12] },
  { c:4, vw:48, min:190, max:595, left:"57%", top:"30%",  delay:2.1,  dur:5.8, dx:[-16, 22,-20,-16], dy:[ 20,-14, 12, 20] },
  { c:6, vw:42, min:168, max:520, left:"75%", top:"36%",  delay:4.0,  dur:6.6, dx:[ 18,-14, 24, 18], dy:[-14, 20,-18,-14] },
  { c:1, vw:52, min:205, max:645, left:"93%", top:"27%",  delay:1.6,  dur:7.0, dx:[-22, 18,-16,-22], dy:[ 16,-22, 14, 16] },
  // ── Rangée 3 (bas-milieu) ──
  { c:3, vw:48, min:192, max:600, left: "3%", top:"62%",  delay:2.4,  dur:6.2, dx:[ 16,-20, 18, 16], dy:[-20, 16,-18,-20] },
  { c:6, vw:54, min:215, max:670, left:"21%", top:"58%",  delay:0.8,  dur:5.6, dx:[-18, 14,-22,-18], dy:[ 18,-16, 14, 18] },
  { c:2, vw:46, min:185, max:575, left:"39%", top:"64%",  delay:3.8,  dur:7.6, dx:[ 20,-16, 14, 20], dy:[-14, 20,-12,-14] },
  { c:5, vw:52, min:205, max:645, left:"57%", top:"60%",  delay:1.5,  dur:6.0, dx:[-14, 20,-18,-14], dy:[ 22,-18, 16, 22] },
  { c:0, vw:44, min:175, max:550, left:"75%", top:"66%",  delay:2.9,  dur:5.4, dx:[ 24,-20, 16, 24], dy:[-16, 14,-20,-16] },
  { c:4, vw:50, min:200, max:620, left:"93%", top:"57%",  delay:0.5,  dur:6.8, dx:[-20, 16,-24,-20], dy:[ 14,-22, 18, 14] },
  // ── Rangée 4 (bas) ──
  { c:1, vw:52, min:205, max:645, left: "3%", top:"88%",  delay:3.1,  dur:6.4, dx:[ 18,-22, 14, 18], dy:[-18, 12,-22,-18] },
  { c:3, vw:46, min:185, max:575, left:"21%", top:"92%",  delay:1.3,  dur:5.8, dx:[-16, 20,-12,-16], dy:[ 20,-16, 14, 20] },
  { c:5, vw:50, min:200, max:620, left:"39%", top:"86%",  delay:2.6,  dur:7.2, dx:[ 14,-18, 22, 14], dy:[-22, 18,-14,-22] },
  { c:0, vw:44, min:175, max:550, left:"57%", top:"90%",  delay:0.9,  dur:6.0, dx:[-18, 14,-20,-18], dy:[ 16,-20, 22, 16] },
  { c:2, vw:56, min:220, max:695, left:"75%", top:"84%",  delay:3.7,  dur:5.6, dx:[ 22,-18, 14, 22], dy:[-14, 22,-10,-14] },
  { c:6, vw:48, min:192, max:600, left:"93%", top:"88%",  delay:1.7,  dur:6.6, dx:[-20, 16,-18,-20], dy:[ 12,-18, 20, 12] },
];

const translations = {
  FR:  { text: "Hey, moi c'est Romain Rubens",      button: "Découvrir"  },
  EN:  { text: "Hello, I'm Romain Rubens",          button: "Discover"   },
  ՀԱՅ: { text: "Ողջույն, ես Ռոման Ռուբենս եմ",     button: "ԲԱՑԱՀԱՅТЕЛ" },
};

export default function HeroLanding() {
  const { isDark, accentColor } = useTheme();
  const PALETTE = PALETTE_MAP[accentColor];
  const sectionRef = useRef<HTMLElement | null>(null);

  const [displayedText,     setDisplayedText]     = useState("");
  const [selectedLanguage,  setSelectedLanguage]  = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [isTyping,          setIsTyping]          = useState(false);
  const [showScrollButton,  setShowScrollButton]  = useState(false);
  const [btnVisible,        setBtnVisible]        = useState(false);
  const splashDone                         = true;
  const [showInitialCursor, setShowInitialCursor] = useState(true);
  const [userInteracted,    setUserInteracted]    = useState(false);
  const [animateBackground, setAnimateBackground] = useState(true);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setAnimateBackground(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setAnimateBackground(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ── Couleurs selon thème ─────────────────────────────────────────────────────
  // La section hero est toujours en mode sombre, quel que soit le thème global
  const bgColor    = "#09091a";
  const glassColor = "rgba(9,9,26,0.22)";
  const glassBlur  = "20px";
  const textColor  = "#ffffff";
  const mutedColor = "rgba(255,255,255,0.72)";
  const opacityKf  = [0.50, 0.75, 0.60, 0.50];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      data-section="hero-landing"
      style={{ backgroundColor: bgColor }}
    >
      {/* ── Blobs vivants ─────────────────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }} aria-hidden="true">
        {BLOBS.map((b, i) => {
          const color = PALETTE[b.c];
          const size  = `clamp(${b.min}px, ${b.vw}vw, ${b.max}px)`;
          const blur  = `clamp(${Math.round(b.min * 0.22)}px, ${(b.vw * 0.22).toFixed(1)}vw, ${Math.round(b.max * 0.22)}px)`;
          return (
            <motion.div
              key={i}
              animate={animateBackground ? {
                x: b.dx,
                y: b.dy,
                scale: [1, 1.20, 0.92, 1],
                opacity: opacityKf,
              } : {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 0.58,
              }}
              transition={animateBackground ? {
                duration: b.dur,
                delay: b.delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.35, 0.70, 1],
              } : {
                duration: 0.2,
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
                willChange:      animateBackground ? "transform, opacity" : "auto",
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
