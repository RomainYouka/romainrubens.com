"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  EN: {
    projectTitle: "WaveSwitch",
    tagline: "Educational Case Study",
    year: "2025",
    role: "2025",
    specPlayers: "Industrial Design",
    specAge: "UX/UI",
    specInfo: "Interactive",
    description: "WaveSwitch is an innovative project exploring new ways of interaction through physical and digital interfaces.",
    detailsTitle: "Project Components",
    backButton: "Back to Portfolio",
    scroll: "Scroll Down"
  },
  FR: {
    projectTitle: "WaveSwitch",
    tagline: "Étude de cas pédagogique",
    year: "2025",
    role: "2025",
    specPlayers: "Design Industriel",
    specAge: "UX/UI",
    specInfo: "Interactif",
    description: "WaveSwitch est un projet innovant explorant de nouvelles formes d'interaction à travers des interfaces physiques et digitales.",
    detailsTitle: "Composants du Projet",
    backButton: "Retour au Portfolio",
    scroll: "Descendre"
  },
  "ՀԱՅ": {
    projectTitle: "WaveSwitch",
    tagline: "Կրթական դեյսի ուսումնասիրություն",
    year: "2025",
    role: "2025",
    specPlayers: "Արդյունաբերական դիզայն",
    specAge: "UX/UI",
    specInfo: "Ինտերակտիվ",
    description: "WaveSwitch-ը նորարարական նախագիծ է, որն ուսումնասիրում է փոխազդեցության նոր ձևեր ֆիզիկական և թվային միջերեսների միջոցով:",
    detailsTitle: "Նախագծի բաղադրիչները",
    backButton: "Հետ",
    scroll: "Լողալ"
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function WaveSwitchPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("FR");
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const ficheRef = useRef<HTMLVideoElement>(null);
  const isFicheInView = useInView(ficheRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (ficheRef.current) {
      if (isFicheInView) {
        ficheRef.current.currentTime = 0;
        ficheRef.current.play().catch(() => {});
      } else {
        ficheRef.current.pause();
      }
    }
  }, [isFicheInView]);

  const handleVideoTimeUpdate = (ref: React.RefObject<HTMLVideoElement | null>) => {
    if (ref.current) {
      const video = ref.current;
      if (video.currentTime >= video.duration * 0.995) {
        video.pause();
        video.currentTime = video.duration * 0.995;
      }
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) setLanguage(savedLanguage);
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
  }, []);

  const t = translations[language];

  const handleBack = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(10);
    setIsExiting(true);
    setTimeout(() => { setShowOverlay(true); setTimeout(() => router.push("/projects"), 400); }, 300);
  };

  const handleScroll = () => {
    const nextSection = document.getElementById('project-intro');
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
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            
            {/* Back Button */}
            <motion.div 
              variants={itemVariants}
              className="absolute top-24 left-6 md:top-32 md:left-8 z-[100]"
            >
              <button 
                onClick={handleBack} 
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#5A7FA4]/20 hover:bg-[#5A7FA4] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A7FA4" strokeWidth="2" className="md:w-6 md:h-6 group-hover:stroke-white transition-colors duration-300">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            </motion.div>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
              <motion.div 
                animate={{
                  background: [
                    "linear-gradient(135deg, #13375a 0%, #1e4a7a 50%, #5A7FA4 100%)",
                    "linear-gradient(135deg, #1e4a7a 0%, #5A7FA4 50%, #13375a 100%)",
                    "linear-gradient(135deg, #5A7FA4 0%, #13375a 50%, #1e4a7a 100%)",
                    "linear-gradient(135deg, #13375a 0%, #1e4a7a 50%, #5A7FA4 100%)",
                  ],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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
                      fontFamily: "var(--font-display)",
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

                <motion.button
                  variants={fadeInUp}
                  onClick={handleScroll}
                  className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{ background: "none", border: "none", padding: "16px", zIndex: 20 }}
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: "rgba(255, 255, 255, 0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {t.scroll}
                  </span>
                  <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </motion.button>
              </div>
            </section>

            {/* Intro Section */}
            <section id="project-intro" className="py-24 px-6 md:px-12">
              <div className="max-w-6xl mx-auto">
                <motion.div 
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(32px, 4vw, 48px)",
                      fontWeight: 700,
                      color: "#13375a",
                      marginBottom: "24px",
                      letterSpacing: "-0.02em"
                    }}>
                      {t.tagline}
                    </h2>
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(16px, 1.5vw, 20px)",
                      fontWeight: 400,
                      color: "#424245",
                      lineHeight: 1.7,
                      whiteSpace: "pre-line"
                    }}>
                      {t.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-8">
                      <span className="px-4 py-2 bg-[#13375a]/10 rounded-full text-[#13375a] text-sm font-medium">
                        {t.specPlayers}
                      </span>
                      <span className="px-4 py-2 bg-[#13375a]/10 rounded-full text-[#13375a] text-sm font-medium">
                        {t.specAge}
                      </span>
                      <span className="px-4 py-2 bg-[#E8B86D]/20 rounded-full text-[#13375a] text-sm font-medium">
                        {t.specInfo}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Components Section */}
            <section className="py-24">
              <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-12">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                  <span className="inline-block px-4 py-2 bg-[#13375a]/10 rounded-full text-[#13375a] text-sm font-semibold tracking-wider uppercase mb-6">
                    {t.detailsTitle}
                  </span>
                </motion.div>
              </div>
              
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="w-full"
              >
                <video
                  ref={ficheRef}
                  src="/projects/namequest/namequest-animations-details.webm"
                  className="w-full h-auto"
                  muted
                  playsInline
                  onTimeUpdate={() => handleVideoTimeUpdate(ficheRef)}
                />
              </motion.div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 px-6 text-center">
              <motion.button
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={handleBack}
                className="group flex items-center flex-row-reverse gap-3 mx-auto px-8 py-4 bg-[#13375a] text-white rounded-full font-bold hover:bg-[#5A7FA4] transition-all transform hover:scale-105 shadow-xl"
              >
                {t.backButton}
                <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180" />
              </motion.button>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
