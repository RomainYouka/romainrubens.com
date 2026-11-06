"use client";

import { detectLanguage } from "@/lib/language";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import DiodeBackground from "@/components/DiodeBackground";


const translations = {
  FR:  { text: "Bonjour, moi c'est Romain Rubens",  button: "Découvrir"  },
  EN:  { text: "Hello, I'm Romain Rubens",          button: "Discover"   },
  ՀԱՅ: { text: "Ողջույն, ես Ռոման Ռուբենս եմ",     button: "ԲԱՑԱՀԱՅТЕЛ" },
};

export default function HeroLanding() {

  const [displayedText,     setDisplayedText]     = useState("");
  const [selectedLanguage,  setSelectedLanguage]  = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isTyping,          setIsTyping]          = useState(false);
  const [showScrollButton,  setShowScrollButton]  = useState(false);
  const [btnVisible,        setBtnVisible]        = useState(false);
  const splashDone                         = true;
  const [showInitialCursor, setShowInitialCursor] = useState(true);
  const [greeting, setGreeting] = useState("Bonjour");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      setGreeting(hour >= 6 && hour < 18 ? "Bonjour" : "Bonsoir");
    };
    updateGreeting();
    const timer = window.setInterval(updateGreeting, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const fullText   = selectedLanguage === "FR" ? `${greeting}, moi c'est Romain Rubens` : translations[selectedLanguage].text;
  const buttonText = translations[selectedLanguage].button;

  // ── Langue ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      const comingFromResume = sessionStorage.getItem("comingFromResume");
      if (comingFromResume === "true") sessionStorage.setItem("introSeen", "true");
    }
    let saved = detectLanguage() as "FR" | "EN" | "ՀԱՅ" | null;
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
    document.getElementById("personal-intro")?.scrollIntoView({ behavior: "smooth" });
  };

  // Always dark for readable white text, independently of the site theme.
  const textColor = "#ffffff";
  const mutedColor = "rgba(255,255,255,0.72)";

  return (
    <section
      className="relative w-full h-[100dvh] overflow-hidden"
      data-section="hero-landing"
      style={{ backgroundColor: "#050507" }}
    >
      <DiodeBackground />

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
