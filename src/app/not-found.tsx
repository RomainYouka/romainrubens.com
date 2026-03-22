"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const translations = {
  FR: { 
    text: "404 — Cette page a disparu.",
    subtext: "Probablement partie faire un café.",
    button: "Retourner à l'accueil"
  },
  EN: { 
    text: "404 — This page has disappeared.",
    subtext: "Probably went to get a coffee.",
    button: "Back to home"
  },
  ՀԱՅ: { 
    text: "404 — Այս էջը անհետացել է։",
    subtext: "Հավանաբար գնացել է սուրճ խմել։",
    button: "Վերադառնալ տուն"
  }
};

export default function NotFound() {
  const [displayedText, setDisplayedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showInitialCursor, setShowInitialCursor] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const fullText = translations[selectedLanguage].text;
  const buttonText = translations[selectedLanguage].button;
  const subtextStr = translations[selectedLanguage].subtext;

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (saved && translations[saved]) {
      setSelectedLanguage(saved);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    setShowInitialCursor(true);
    const timer = setTimeout(() => {
      setShowInitialCursor(false);
      setIsTyping(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<"FR" | "EN" | "ՀԱՅ">;
      setSelectedLanguage(customEvent.detail);
      setDisplayedText("");
      setIsTyping(true);
      setShowButton(false);
      setShowInitialCursor(true);
    };

    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    } else if (displayedText.length === fullText.length) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowButton(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [displayedText, isTyping, fullText]);

  if (!isMounted) {
    return (
      <section className="relative w-full h-screen overflow-hidden bg-white">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/fond-romain-rubens-1762169393726.png?width=8000&height=8000&resize=contain"
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 7vw, 80px)", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.3, textAlign: "center" }}>
            {fullText}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/fond-romain-rubens-1762169393726.png?width=8000&height=8000&resize=contain"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Typing Animation Text - Center */}
        <div className="flex flex-col items-center justify-center flex-1 gap-6">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 7vw, 80px)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              textAlign: "center",
              whiteSpace: "normal",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              paddingLeft: "clamp(16px, 5vw, 48px)",
              paddingRight: "clamp(16px, 5vw, 48px)",
              maxWidth: "95vw"
            }}
          >
            {showInitialCursor && !displayedText ? (
              <span style={{ animation: "blink 0.7s infinite", display: "inline", lineHeight: "inherit" }}>|</span>
            ) : displayedText ? (
              <span style={{ display: "inline", lineHeight: "inherit" }}>
                {displayedText}
                <span style={{ animation: isTyping ? "blink 0.7s infinite" : "none", opacity: isTyping ? 1 : 0, display: "inline", lineHeight: "inherit", transition: "opacity 0.1s ease", marginLeft: "-0.05em", whiteSpace: "nowrap" }}>|</span>
              </span>
            ) : (
              <span style={{ visibility: "hidden", display: "inline", lineHeight: "inherit" }}>{fullText}</span>
            )}
          </h1>

          {/* Subtext - appears after typing animation */}
          {!isTyping && displayedText && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.5vw, 18px)",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.6)",
                letterSpacing: "-0.01em",
                textAlign: "center",
                paddingLeft: "clamp(16px, 5vw, 48px)",
                paddingRight: "clamp(16px, 5vw, 48px)",
                maxWidth: "95vw",
                animation: "fadeInAndBounce 0.6s ease-in forwards"
              }}
            >
              {subtextStr}
            </p>
          )}
        </div>
      </div>

      {/* Back to Home Button - Bottom */}
      {showButton && (
        <Link
          href="/"
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 group"
          style={{
            animation: "fadeInAndBounce 0.6s ease-in forwards",
            background: "none",
            border: "none",
            padding: "16px",
            zIndex: 20,
            textDecoration: "none"
          }}
          aria-label="Back to home"
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: "-0.01em",
              transition: "color 0.3s ease"
            }}
            className="group-hover:text-white"
          >
            {buttonText}
          </span>
          <ChevronRight className="w-4 h-4" style={{ color: "rgba(255, 255, 255, 0.7)", transition: "color 0.3s ease" }} />
        </Link>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        @keyframes fadeInAndBounce {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
