"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const translations = {
  FR: {
    title: "UX/UI Designer · Smart home",
    textMain: "Je suis étudiant en design industriel avec une pratique centrée sur l'UX/UI et le design d'interaction.",
    textGray1: " Mon travail porte sur la manière dont les interfaces s'organisent dans des usages réels, des contraintes concrètes et des systèmes du quotidien.",
    textMain2: " Je porte un intérêt particulier aux environnements connectés dans l'espace domestique,",
    textGray2: " tout en développant une approche applicable à des contextes numériques plus larges.",
    ctaProjects: "Voir mes projets",
    ctaSkills: "Mes compétences",
  },
  EN: {
    title: "UX/UI Designer · Smart home",
    textMain: "I'm an industrial design student with a practice focused on UX/UI and interaction design.",
    textGray1: " My work explores how interfaces organize themselves in real-world usage, concrete constraints, and everyday systems.",
    textMain2: " I have a particular interest in connected environments in domestic spaces,",
    textGray2: " while developing an approach applicable to broader digital contexts.",
    ctaProjects: "View my projects",
    ctaSkills: "My skills",
  },
  ՀԱՅ: {
    title: "UX/UI Դիզայներ · Smart home",
    textMain: "Ես industrial design ուսանող եմ՝ UX/UI և interaction design կենտրոնացված պրակտիկայով։",
    textGray1: " Իմ աշխատանքը ուսումնասիրում է, թե ինչպես են ինտերֆեյսները կազմակերպվում իրական օգտագործման, կոնկրետ սահմանափակումների և առօրյա համակարգերում։",
    textMain2: " Ես հատկապես հետաքրքրված եմ կապակցված միջավայրերով մեր տնային տարածքում,",
    textGray2: " միաժամանակ զարգացնելով մոտեցում, որը կիրառելի է ավելի լայն թվային համատեքստերում։",
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
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

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
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
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
      {/* Main section - same as home page */}
      <section
        id={id}
        className="w-full min-h-screen flex items-center"
        data-section="personal-intro"
        style={{
          backgroundColor: "var(--theme-bg-alt)",
          paddingTop: "clamp(80px, 10vw, 120px)",
          paddingBottom: "clamp(80px, 10vw, 120px)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="w-full">
          <div className="container max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full">
            <div
              style={{
                textAlign: "center",
                opacity: isFading ? 0 : 1,
                transition: `opacity ${transitionDuration} ease-in-out`,
              }}
            >
              {/* Title */}
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 5vw, 56px)",
                  fontWeight: 600,
                  color: "var(--theme-fg)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.018em",
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
                  marginBottom: "clamp(48px, 8vw, 88px)",
                  display: "inline-block",
                }}
              >
                <span style={{ color: "var(--theme-fg)" }}>{content.textMain}</span>
                <span style={{ color: "var(--theme-muted)" }}>{content.textGray1}</span>
                <span style={{ color: "var(--theme-fg)" }}>{content.textMain2}</span>
                <span style={{ color: "var(--theme-muted)" }}>{content.textGray2}</span>
              </div>

              {/* CTA Button - Wider and responsive */}
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    setShowOverlay(true);
                    setTimeout(() => {
                      router.push("/projects");
                    }, 250);
                  }}
                  disabled={showOverlay}
                  className="bg-[#314DCB] text-white font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed inline-flex items-center py-3 px-6 sm:py-4 sm:px-8 md:py-4 md:px-10 text-sm sm:text-base"
                >
                  {content.ctaProjects}
                  <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" />
                </button>
              </div>

              {/* Genius overlay transition */}
              <AnimatePresence>
                {showOverlay && (
                  <>
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0,
                        borderRadius: "50%",
                      }}
                      animate={{
                        opacity: 0.5,
                        scale: 1.5,
                        borderRadius: "50%",
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.15,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        x: "-50%",
                        y: "-50%",
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "#314DCB",
                        filter: "blur(40px)",
                        zIndex: 9998,
                      }}
                    />
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.32, 0.72, 0, 1],
                        delay: 0.05,
                      }}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "#314DCB",
                        zIndex: 9999,
                      }}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}