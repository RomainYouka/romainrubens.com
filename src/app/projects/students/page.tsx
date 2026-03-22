"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    projectTitle: "students",
    role: "2025",
    tagline: "Contenu à venir...",
    scroll: "Descendre",
    backButton: "Retour au Portfolio"
  },
  EN: {
    projectTitle: "students",
    role: "2025",
    tagline: "Content coming soon...",
    scroll: "Scroll Down",
    backButton: "Back to Portfolio"
  },
  "ՀԱՅ": {
    projectTitle: "students",
    role: "2025",
    tagline: "Բովանդակությունը շուտով...",
    scroll: "Իջնել",
    backButton: "Վերադառնալ պորտֆոլիոյին"
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function StudentsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("FR");
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) setLanguage(savedLanguage);
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
  }, []);

  const t = translations[language] || translations["FR"];

  const handleBack = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(10);
    setIsExiting(true);
    setTimeout(() => { setShowOverlay(true); setTimeout(() => router.push("/projects"), 400); }, 300);
  };

  const handleScroll = () => {
    const nextSection = document.getElementById('project-content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#EBEFF0" }}>
      <AnimatePresence>
        {showOverlay && <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ backgroundColor: "#EBEFF0" }} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            className="w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={fadeInUp} className="absolute top-24 left-6 md:top-32 md:left-8 z-[100]">
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#1a237e]/20 hover:bg-[#1a237e] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2" className="group-hover:stroke-white transition-colors duration-300">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            </motion.div>

            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              <motion.div 
                animate={{
                  background: [
                    "linear-gradient(135deg, #0a0a0a 0%, #1a237e 50%, #283593 100%)",
                    "linear-gradient(135deg, #1a237e 0%, #283593 50%, #0a0a0a 100%)",
                    "linear-gradient(135deg, #283593 0%, #0a0a0a 50%, #1a237e 100%)",
                    "linear-gradient(135deg, #0a0a0a 0%, #1a237e 50%, #283593 100%)",
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              />
              
              <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center h-full pt-20">
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                  <motion.div variants={fadeInUp} className="mb-6">
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium tracking-wider uppercase">
                      {t.role}
                    </span>
                  </motion.div>
                  
                  <motion.h1 
                    variants={fadeInUp}
                    style={{ 
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(40px, 7vw, 88px)",
                      fontWeight: 600,
                      color: "white",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.15
                    }}
                  >
                    {t.projectTitle}
                  </motion.h1>
                  
                  <motion.p 
                    variants={fadeInUp}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(20px, 3vw, 32px)",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.8)",
                      marginTop: "24px",
                      letterSpacing: "-0.01em",
                      maxWidth: "800px"
                    }}
                  >
                    {t.tagline}
                  </motion.p>
                </div>
              </div>

              <motion.button
                variants={fadeInUp}
                onClick={handleScroll}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 z-20"
                style={{
                  background: "none",
                  border: "none",
                  padding: "16px",
                }}
                aria-label="Scroll down to continue"
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.7)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  }}
                >
                  {t.scroll}
                </span>
                <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "rgba(255, 255, 255, 0.7)" }} />
              </motion.button>
            </section>

            <section id="project-content" className="min-h-screen py-20 px-6 md:px-12">
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
