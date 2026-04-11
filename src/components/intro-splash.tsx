"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const getGreetings = () => {
  const hour = new Date().getHours();
  
  if (hour >= 0 && hour < 12) {
    return { hy: "\u0532\u0561\u0580\u056b \u056c\u0578\u0582\u0575\u057d", en: "Good morning", fr: "Bonjour" };
  } else if (hour >= 12 && hour < 17) {
    return { hy: "\u0532\u0561\u0580\u056b \u0585\u0580", en: "Good afternoon", fr: "Bonjour" };
  } else {
    return { hy: "\u0532\u0561\u0580\u056b \u0565\u0580\u0565\u056f\u0578", en: "Good evening", fr: "Bonsoir" };
  }
};

const TIMING = {
  enter: 800,
  hold: 600,
  exit: 500,
};

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [animationPhase, setAnimationPhase] = useState<"enter" | "hold" | "exit">("enter");
  const [greeting, setGreeting] = useState({ hy: "Բարի լույս", en: "Good day", fr: "Bonjour" });
  const pathname = usePathname();

  const greetingSequence = [greeting.hy, greeting.en, greeting.fr];

  const handleDismiss = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("introSeen", "true");
      sessionStorage.removeItem("comingFromResume");
      document.body.style.overflow = "";
    }, 500);
  }, []);

  useEffect(() => {
    if (pathname === "/resume") return;

    const comingFromResume = sessionStorage.getItem("comingFromResume");
    const introSeen = sessionStorage.getItem("introSeen");
    
    const shouldShow = introSeen !== "true" && comingFromResume !== "true";
    
    if (!shouldShow) {
      if (comingFromResume === "true") {
        sessionStorage.setItem("introSeen", "true");
      }
      sessionStorage.removeItem("comingFromResume");
      return;
    }

    setGreeting(getGreetings());
    document.body.style.overflow = "hidden";
    setIsVisible(true);
    
    requestAnimationFrame(() => {
      setCurrentIndex(0);
      setAnimationPhase("enter");
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [pathname]);

  useEffect(() => {
    if (!isVisible || currentIndex < 0 || isFadingOut) return;

    let timeout: NodeJS.Timeout;

    if (animationPhase === "enter") {
      requestAnimationFrame(() => {
        setAnimationPhase("hold");
      });
      timeout = setTimeout(() => {}, TIMING.enter);
    } else if (animationPhase === "hold") {
      timeout = setTimeout(() => setAnimationPhase("exit"), TIMING.hold);
    } else if (animationPhase === "exit") {
      timeout = setTimeout(() => {
        if (currentIndex < greetingSequence.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setAnimationPhase("enter");
        } else {
          handleDismiss();
        }
      }, TIMING.exit);
    }

    return () => clearTimeout(timeout);
  }, [isVisible, currentIndex, animationPhase, greetingSequence.length, isFadingOut, handleDismiss]);

  useEffect(() => {
    if (isVisible && !isFadingOut) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
          handleDismiss();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isVisible, isFadingOut, handleDismiss]);

  const isTestingWCAG = false; // Set to true to hide splash during testing
  if (!isVisible || isTestingWCAG) return null;

  const getTextStyles = (): React.CSSProperties => {
    if (animationPhase === "enter") {
      return {
        transform: "translateY(8px)",
        opacity: 0,
        filter: "blur(4px)",
      };
    } else if (animationPhase === "hold") {
      return {
        transform: "translateY(0px)",
        opacity: 1,
        filter: "blur(0px)",
        transition: `all ${TIMING.enter}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      };
    } else {
      return {
        transform: "translateY(-8px)",
        opacity: 0,
        filter: "blur(4px)",
        transition: `all ${TIMING.exit}ms cubic-bezier(0.55, 0.085, 0.68, 0.53)`,
      };
    }
  };

  const currentText = greetingSequence[currentIndex] || "";

  return (
    <>
      <noscript>
        <style>{`
          #intro-splash-overlay {
            display: none !important;
          }
        `}</style>
      </noscript>

      <div
        id="intro-splash-overlay"
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#1d1d1f",
          zIndex: 10000,
          opacity: isFadingOut ? 0 : 1,
          transition: isFadingOut ? "opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
          cursor: isFadingOut ? "default" : "pointer",
          pointerEvents: isFadingOut ? "none" : "auto",
        }}
        onClick={!isFadingOut ? handleDismiss : undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Welcome greeting"
      >
        <div 
          className="flex flex-col items-center justify-center gap-4"
          style={{
            minHeight: "120px",
          }}
        >
          <span
            key={currentIndex}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px, 10vw, 72px)",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              textAlign: "center",
              willChange: "transform, opacity, filter",
              ...getTextStyles(),
            }}
          >
            {currentText}
          </span>

        </div>

        {!isFadingOut && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white hover:text-white transition-colors duration-200"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 16px",
            }}
            aria-label="Skip introduction"
          >
            Skip
          </button>
        )}
      </div>
    </>
  );
}
