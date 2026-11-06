"use client";

import { detectLanguage } from "@/lib/language";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { usePageTransition } from "@/contexts/PageTransitionContext";

const translations = {
  FR: {
    title: "Designer UX/UI · Produits Numériques & Écosystèmes Connectés",
    textMain: "Designer UX/UI et étudiant en design d’interaction, je conçois des produits numériques et des écosystèmes connectés.",
    textGray1: " J’associe recherche utilisateur, esprit critique et pensée systémique pour comprendre les besoins et simplifier les systèmes complexes.",
    textMain2: " Des parcours aux design systems, je cherche à rendre les expériences utiles, accessibles et cohérentes.",
    textGray2: " En collaboration avec les développeurs, je veille à préserver le sens du design dans le produit final.",
    ctaProjects: "Voir mes projets",
    ctaSkills: "Mes compétences",
  },
  EN: {
    title: "UX/UI Designer · Digital Products & Connected Ecosystems",
    textMain: "I’m a UX/UI designer and interaction design student, creating digital products and connected ecosystems.",
    textGray1: " I combine user research, critical thinking, and systems thinking to understand people’s needs and simplify complex systems.",
    textMain2: " From user journeys to design systems, I aim to make experiences useful, accessible, and consistent.",
    textGray2: " Working alongside developers, I help preserve the intent of the design in the final product.",
    ctaProjects: "View my projects",
    ctaSkills: "My skills",
  },
  ՀԱՅ: {
    title: "UX/UI դիզայներ · Թվային պրոդուկտներ և կապակցված էկոհամակարգեր",
    textMain: "Ես UX/UI դիզայներ և փոխազդեցության դիզայնի ուսանող եմ․ նախագծում եմ թվային պրոդուկտներ և կապակցված էկոհամակարգեր։",
    textGray1: " Օգտատերերի հետազոտությունը, քննադատական և համակարգային մտածողությունն ինձ օգնում են հասկանալ մարդկանց կարիքները և պարզեցնել բարդ համակարգերը։",
    textMain2: " Օգտատերերի ուղիներից մինչև դիզայն համակարգեր՝ ձգտում եմ ստեղծել օգտակար, հասանելի և համահունչ փորձառություններ։",
    textGray2: " Ծրագրավորողների հետ համագործակցելով՝ պահպանում եմ դիզայնի մտահղացումը վերջնական պրոդուկտում։",
    ctaProjects: "Տեսեք իմ նախագծերը",
    ctaSkills: "Իմ հմտությունները",
  },
};

// PDF file mapping for downloads
const pdfFiles = {
  FR: "/resume/RUBENS_Romain_cv.pdf",
  EN: "/resume/RUBENS_Romain_Resume.pdf",
  ՀԱՅ: "/resume/RUBENS_Romain_Ամփոփում.pdf"
};

const pdfFileNames = {
  FR: "RUBENS_Romain_cv.pdf",
  EN: "RUBENS_Romain_Resume.pdf",
  ՀԱՅ: "RUBENS_Romain_Ամփոփում.pdf"
};

export default function PersonalIntro({ id = "personal-intro" }: { id?: string }) {
  const { isDark } = useTheme();
  const { triggerTransition } = usePageTransition();
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const transitionDuration = prefersReducedMotion ? "1ms" : "200ms";

  const handleCVDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2200);

    const pdfUrl = pdfFiles[selectedLanguage];
    const fileName = pdfFileNames[selectedLanguage];

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let saved = detectLanguage() as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !translations[saved]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      if (prefersReducedMotion) {
        setSelectedLanguage(event.detail);
      } else {
        setIsFading(true);
        setTimeout(() => {
          setSelectedLanguage(event.detail);
          setIsFading(false);
        }, 200);
      }
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const content = translations[selectedLanguage];

  // Split text to find LinkedIn and CV/Resume links and make them clickable
  const renderTextWithLinks = (text: string) => {
    // Match LinkedIn (both "LinkedIn" and Armenian «LinkedIn»–ը)
    const linkedInPattern = /«?LinkedIn»?–?ը?/i;
    // Match CV/Resume (télécharger mon CV, download my resume, ներբեռնել իմ ռեզյումեն)
    const cvPattern = /(télécharger mon CV|download my resume|ներբեռնել իմ ռեզյումեն)/i;
    
    // Split by LinkedIn first
    const linkedInParts = text.split(linkedInPattern);
    
    if (linkedInParts.length === 1) {
      // No LinkedIn found, just look for CV/Resume
      const cvParts = text.split(cvPattern);
      if (cvParts.length === 1) {
        return text;
      }
      return (
        <>
          {cvParts[0]}
          <button
            onClick={handleCVDownload}
            disabled={isDownloading}
            style={{
              color: "#1d1d1f",
              textDecoration: "none",
              background: "none",
              border: "none",
              padding: "0",
              cursor: "pointer",
              transition: `color ${transitionDuration} ease-in-out`,
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0A66C2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1d1d1f";
            }}
            onFocus={(e) => {
              e.currentTarget.style.color = "#0A66C2";
              e.currentTarget.style.outline = "2px solid #0A66C2";
              e.currentTarget.style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.color = "#1d1d1f";
              e.currentTarget.style.outline = "none";
            }}
          >
            <u>{cvParts[1]}</u>
          </button>
          {cvParts[2]}
        </>
      );
    }

    // LinkedIn found, now check for CV in the last part
    const lastPart = linkedInParts[linkedInParts.length - 1];
    const cvParts = lastPart.split(cvPattern);
    
    const linkedInLink = (
      <a
        href="https://www.linkedin.com/in/romain-rubens-ba660323b/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-block"
        style={{
          color: "#1d1d1f",
          textDecoration: "none",
          transition: `color ${transitionDuration} ease-in-out`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#0A66C2";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#1d1d1f";
        }}
        onFocus={(e) => {
          e.currentTarget.style.color = "#0A66C2";
          e.currentTarget.style.outline = "2px solid #0A66C2";
          e.currentTarget.style.outlineOffset = "2px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.color = "#1d1d1f";
          e.currentTarget.style.outline = "none";
        }}
      >
        LinkedIn
        <span
          className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#0A66C2] group-hover:w-full"
          style={{
            transition: `width ${transitionDuration} ease-in-out`,
          }}
        />
      </a>
    );

    const cvButton = (
      <button
        onClick={handleCVDownload}
        disabled={isDownloading}
        className="group relative inline-block"
        style={{
          color: "#1d1d1f",
          textDecoration: "none",
          background: "none",
          border: "none",
          padding: "0",
          cursor: "pointer",
          transition: `color ${transitionDuration} ease-in-out`,
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#333333";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#1d1d1f";
        }}
        onFocus={(e) => {
          e.currentTarget.style.color = "#333333";
          e.currentTarget.style.outline = "2px solid #333333";
          e.currentTarget.style.outlineOffset = "2px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.color = "#1d1d1f";
          e.currentTarget.style.outline = "none";
        }}
      >
        {cvParts[1] || ""}
        <span
          className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3C3C3C] group-hover:w-full"
          style={{
            transition: `width ${transitionDuration} ease-in-out`,
          }}
        />
      </button>
    );

    if (cvParts.length === 1) {
      return (
        <>
          {linkedInParts[0]}
          {linkedInLink}
          {linkedInParts[1]}
        </>
      );
    }

    return (
      <>
        {linkedInParts[0]}
        {linkedInLink}
        {cvParts[0]}
        {cvButton}
        {cvParts[2]}
      </>
    );
  };

  return (
    <>
      {/* Main section */}
      <section
        id={id}
        className="w-full min-h-[100dvh] flex items-center"
        data-section="personal-intro"
        style={{
          backgroundColor: isDark ? "#191919" : "#F5F5F5",
          paddingTop: "clamp(64px, 8vw, 100px)",
          paddingBottom: "clamp(64px, 8vw, 100px)",
        }}
      >
        <div className="w-full">
          <div
            className="container max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                opacity: isFading ? 0 : 1,
                transition: `opacity ${transitionDuration} ease-in-out`,
              }}
            >
              {/* Title */}
              <h2
                className="personal-intro-title"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4.6vw, 52px)",
                  fontWeight: 600,
                  color: "var(--theme-fg)",
                  lineHeight: 1.15,
                  letterSpacing: 0,
                  marginBottom: "clamp(24px, 3vw, 40px)",
                }}
              >
                {content.title}
              </h2>

              {/* Text with colored sections */}
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.8vw, 18px)",
                  fontWeight: 500,
                  color: "var(--theme-fg)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.018em",
                  marginBottom: "clamp(32px, 6vw, 64px)",
                  display: "inline-block",
                }}
              >
                <span style={{ color: "var(--theme-fg)" }}>{content.textMain}</span>
                <span style={{ color: "var(--theme-subtle)" }}>{content.textGray1}</span>
                <span style={{ color: "var(--theme-fg)" }}>{content.textMain2}</span>
                <span style={{ color: "var(--theme-subtle)" }}>{content.textGray2}</span>
              </div>

              {/* CTA Button - Wider and responsive */}
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={() => triggerTransition("/projects")}
                  className="font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 inline-flex items-center py-3 px-6 sm:py-4 sm:px-8 md:py-4 md:px-10 text-sm sm:text-base"
                  style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-accent-fg)" }}
                >
                  {content.ctaProjects}
                  <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .personal-intro-title { text-wrap: balance; }
      `}</style>
    </>
  );
}
