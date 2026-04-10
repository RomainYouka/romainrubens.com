"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, Play, Pause, SkipForward, ArrowLeft } from "lucide-react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    projectTitle: "Wave Switch & App",
    role: "2025",
    tagline: "Un interrupteur sans contact activé par geste, conçu pour un avenir spéculatif.",
    scroll: "Découvrir le projet",
    backButton: "Retour aux projets",
    descriptionTitle: "À propos du projet",
    description: "WaveSwitch est un interrupteur sans contact activé par geste. Conçu pour un avenir spéculatif en 2080, où les humains vivent avec des champignons cutanés médicaux et esthétiques nés des transformations mondiales, il s'appuie sur l'intelligence artificielle pour traduire le mouvement en action.\n\nAu-delà de l'objet lui-même, son sens réside dans l'interface web et mobile : personnalisation des gestes, retour visuel en temps réel et suivi des interactions.",
    zoomHint: "Survolez pour zoomer",
    clickHint: "Cliquez pour zoomer",
    play: "Lire",
    pause: "Pause",
    section1Title: "Contexte du projet",
    section1Content: "Ce projet explore la frontière entre objets tangibles et systèmes interactifs, où le design existe non seulement sous forme physique mais dans la relation entre l'humain et la machine. L'interrupteur devient un moyen de questionner notre connexion au geste, à la médiation technologique et à l'évolution de l'environnement domestique ou professionnel.",
    section2Title: "Interface mobile",
    section2Content: "L'application mobile permet aux utilisateurs de personnaliser leurs gestes, de visualiser un retour en temps réel et de suivre l'historique de leurs interactions avec le système.",
    section3Title: "Vision spéculative",
    section3Content: "Dans un monde futuriste où les champignons cutanés sont devenus une norme médicale et esthétique, WaveSwitch propose une interaction qui respecte cette nouvelle réalité corporelle, évitant tout contact direct avec les surfaces.",
    productInterface: "INTERFACE DU PRODUIT",
    techSpecs: "CARACTÉRISTIQUES TECHNIQUES"
  },
  EN: {
    projectTitle: "Wave Switch & App",
    role: "2025",
    tagline: "A touchless, gesture-activated switch designed for a speculative future.",
    scroll: "Discover the project",
    backButton: "Back to projects",
    descriptionTitle: "About the project",
    description: "WaveSwitch is a touchless, gesture-activated switch. It is designed for a speculative future in 2080, where humans live with medical and aesthetic skin fungi shaped by global transformations. The device uses artificial intelligence to translate movement into action.\n\nBeyond the object itself, the project finds its meaning in the web and mobile interfaces. Users can customize their gestures, see real-time feedback and track their interactions as they use the system.",
    zoomHint: "Hover to zoom",
    clickHint: "Click to zoom",
    play: "Play",
    pause: "Pause",
    section1Title: "Project context",
    section1Content: "This project explores the boundary between tangible objects and interactive systems, where design exists not only as a physical form but also in the relationship between humans and machines. The switch becomes a way to question our connection to gesture, technological mediation and the changing nature of domestic or professional environments.",
    section2Title: "Mobile interface",
    section2Content: "The mobile application allows users to customize their gestures, visualize real-time feedback and track the history of their interactions with the system.",
    section3Title: "Speculative vision",
    section3Content: "In a futuristic world where skin fungi have become a medical and aesthetic norm, WaveSwitch offers an interaction that respects this new bodily reality, avoiding any direct contact with surfaces.",
    productInterface: "PRODUCT INTERFACE",
    techSpecs: "TECHNICAL SPECIFICATIONS"
  },
  "ՀԱՅ": {
    projectTitle: "Wave Switch & App",
    role: "2025",
    tagline: "Շփում չպահանջող, ժեստով ակտիվացվող անջատիչ՝ նախագծված սպեկուլատիվ ապագայի համար:",
    scroll: "Բացահայտել նախագիծը",
    backButton: "Վերադառնալ նախագծերին",
    descriptionTitle: "Նախագծի մասին",
    description: "WaveSwitch-ը շփում չպահանջող, ժեստով ակտիվացվող անջատիչ է։ Ստեղծված է 2080 թվականի սպեկուլատիվ ապագայի համար, որտեղ մարդիկ ապրում են բժշկական ու գեղագիտական նշանակություն ունեցող մաշկային սնկերի հետ՝ գլոբալ փոփոխությունների հետևանքով առաջացած նոր իրականության մեջ։\n\nՍարքը հիմնված է արհեստական բանականության վրա, որը շարժումը վերածում է գործողության։ Սակայն WaveSwitch-ի իմաստը միայն առարկայում չէ․ նախագծի էությունը իրեն ընդգրկում է նաև վեբ և շարժական միջերեսները։",
    zoomHint: "Անցկացրեք մկնիկը խոշորացնելու համար",
    clickHint: "Սեղմեք խոշորացնելու համար",
    play: "Նվագարկել",
    pause: "Դադարեցնել",
    section1Title: "Նախագծի համատեքստը",
    section1Content: "Այս նախագիծը ուսումնասիրում է շոշափելի առարկաների և ինտերակտիվ համակարգերի սահմանը, որտեղ դիզայնը գոյություն ունի ոչ միայն ֆիզիկական ձևով, այլև մարդու և մեքենայի փոխհարաբերության մեջ։",
    section2Title: "Բջջային միջերես",
    section2Content: "Բջջային հավելվածը թույլ է տալիս օգտատերերին անհատականացնել իրենց ժեստերը, տեսնել իրական ժամանակում հետադարձ կապ և հետևել իրենց փոխազդեցությունների պատմությանը:",
    section3Title: "Սպեկուլատիվ տեսլական",
    section3Content: "Ապագայում, որտեղ մաշկային սնկերը դարձել են բժշկական և գեղագիտական նորմ, WaveSwitch-ը առաջարկում է փոխազդեցություն, որը հարգում է այս նոր մարմնական իրականությունը:",
    productInterface: "ԱՊՐԱՆՔԻ ՄԻՋԵՐԵՍԸ",
    techSpecs: "ՏԵԽՆԻԿԱԿԱՆ ԲՆՈՒԹԱԳԻՐ"
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

export default function WaveSwitchPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("FR");
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRefFinal = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) setLanguage(savedLanguage);
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.5 };
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          if (video === videoRefFinal.current) {
            video.currentTime = 0;
            video.play().catch(() => {});
          } else {
            video.play().catch(() => {});
            if (video === videoRef1.current) setIsPlaying1(true);
            if (video === videoRef2.current) setIsPlaying2(true);
          }
        } else {
          video.pause();
          if (video === videoRef1.current) setIsPlaying1(false);
          if (video === videoRef2.current) setIsPlaying2(false);
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    if (videoRef1.current) observer.observe(videoRef1.current);
    if (videoRef2.current) observer.observe(videoRef2.current);
    if (videoRefFinal.current) observer.observe(videoRefFinal.current);
    return () => observer.disconnect();
  }, []);

  const handleFinalVideoTimeUpdate = () => {
    const video = videoRefFinal.current;
    if (!video) return;
    if (video.currentTime >= video.duration - 1) {
      video.pause();
      video.currentTime = video.duration - 1;
    }
  };

  const t = translations[language] || translations["FR"];

  const handleBack = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(10);
    setIsExiting(true);
      setTimeout(() => { setShowOverlay(true); setTimeout(() => router.push("/projects"), 300); }, 150);
  };

  const handleScroll = () => {
    document.getElementById('project-content')?.scrollIntoView({ behavior: "smooth" });
  };

  const togglePlayPause1 = () => {
    const videoElement = videoRef1.current;
    if (!videoElement) return;
    if (isPlaying1) {
      videoElement.pause();
      setIsPlaying1(false);
    } else {
      videoElement.play().catch(() => {});
      setIsPlaying1(true);
    }
  };

  const skipForward1 = () => {
    const videoElement = videoRef1.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };

  const togglePlayPause2 = () => {
    const videoElement = videoRef2.current;
    if (!videoElement) return;
    if (isPlaying2) {
      videoElement.pause();
      setIsPlaying2(false);
    } else {
      videoElement.play().catch(() => {});
      setIsPlaying2(true);
    }
  };

  const skipForward2 = () => {
    const videoElement = videoRef2.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };

  return (
    <main id="main-content" className="w-full min-h-screen" style={{ backgroundColor: "#0A84FF" }}>
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full">
            <AnimatePresence>
              {showOverlay && <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ backgroundColor: "#EBEFF0" }} />}
            </AnimatePresence>

            <motion.div className="w-full" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <motion.div variants={fadeInUp} className="absolute top-24 left-6 md:top-32 md:left-8 z-[100]">
                <button onClick={handleBack} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-[#0A84FF] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg">
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" strokeWidth="2" className="transition-colors duration-300 group-hover:stroke-white"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
              </motion.div>

              <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{
                    background: [
                      "linear-gradient(135deg, #0A84FF 0%, #0066CC 50%, #0A84FF 100%)",
                      "linear-gradient(135deg, #0066CC 0%, #0A84FF 50%, #0066CC 100%)",
                      "linear-gradient(135deg, #0A84FF 0%, #0066CC 50%, #0A84FF 100%)",
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
                        lineHeight: 1.15,
                        maxWidth: "900px"
                      }}
                    >
                      {t.projectTitle}
                    </motion.h1>
                    
                    <motion.p 
                      variants={fadeInUp}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(18px, 2.5vw, 28px)",
                        fontWeight: 300,
                        color: "rgba(255, 255, 255, 0.9)",
                        marginTop: "24px",
                        letterSpacing: "-0.01em",
                        maxWidth: "700px"
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
                  style={{ background: "none", border: "none", padding: "16px" }}
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: "rgba(255, 255, 255, 0.8)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {t.scroll}
                  </span>
                  <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "rgba(255, 255, 255, 0.8)" }} />
                </motion.button>
              </section>

              <section id="project-content" className="py-24 px-6 md:px-12 bg-white flex flex-col items-center">
                <div className="max-w-4xl mx-auto text-center mb-16">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                    <span className="inline-block px-4 py-2 bg-[#0A84FF]/10 rounded-full text-[#0A84FF] text-sm font-semibold tracking-wider uppercase mb-6">
                      {t.descriptionTitle}
                    </span>
                    <p className="mb-8" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, color: "#424245", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                      {t.description}
                    </p>
                  </motion.div>
                </div>

                {/* Interface Mobile Section */}
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center mb-24">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] text-sm font-semibold tracking-wider uppercase mb-6">
                      {t.section2Title}
                    </span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, color: "#424245", lineHeight: 1.7 }}>
                      {t.section2Content}
                    </p>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full md:w-auto md:flex-shrink-0 mx-auto"
                    style={{ maxWidth: "min(85vw, 400px)" }}
                  >
                    <div style={{ width: "100%", overflow: "hidden", borderRadius: "clamp(12px, 2vw, 20px)" }}>
                      <video
                        ref={videoRef1}
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/4730AC9B-6273-4BD0-A10F-373F327D9B3B-1762106663715.mp4"
                        loop
                        muted
                        playsInline
                        preload="auto"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                    <div className="flex items-center justify-center gap-3" style={{ marginTop: "-20px", position: "relative", zIndex: 10 }}>
                      <button onClick={togglePlayPause1} className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#0A84FF] text-white font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]">
                        {isPlaying1 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying1 ? t.pause : t.play}
                      </button>
                      <button onClick={skipForward1} className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#0A84FF] text-white font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]">
                        <SkipForward className="w-4 h-4" />
                        +5s
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Contexte du Projet Section */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex flex-col items-center">
                    <span className="inline-block px-4 py-2 bg-[#0A84FF]/10 rounded-full text-[#0A84FF] text-sm font-semibold tracking-wider uppercase mb-6">
                      {t.section1Title}
                    </span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, color: "#424245", lineHeight: 1.7, maxWidth: "800px" }}>
                      {t.section1Content}
                    </p>
                  </motion.div>
                </div>

                {/* Interface du Produit Section */}
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] text-sm font-semibold tracking-wider uppercase mb-6">
                      {t.productInterface}
                    </span>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full flex flex-col items-center mb-12"
                  >
                    <div style={{ width: "100%", maxWidth: "600px", overflow: "hidden", borderRadius: "clamp(12px, 2vw, 20px)" }}>
                      <video
                        ref={videoRef2}
                        src="/projects/waveswitch/mockup waveswitch_2.mp4"
                        loop
                        muted
                        playsInline
                        preload="auto"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-5">
                      <button onClick={togglePlayPause2} className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#0A84FF] text-white font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]">
                        {isPlaying2 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying2 ? t.pause : t.play}
                      </button>
                      <button onClick={skipForward2} className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#0A84FF] text-white font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]">
                        <SkipForward className="w-4 h-4" />
                        +5s
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              <section className="bg-[#F5F5F5] py-24 flex flex-col items-center">
                {/* Final Video Section */}
                <div className="w-full flex flex-col items-center mb-24">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] text-sm font-semibold tracking-wider uppercase mb-6">
                      {t.techSpecs}
                    </span>
                  </motion.div>
                  <motion.div 
                    variants={fadeInUp} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }}
                    className="w-full max-w-5xl mx-auto px-6"
                  >
                    <div style={{ width: "100%", overflow: "hidden", borderRadius: "clamp(12px, 2vw, 20px)" }}>
                      <video
                        ref={videoRefFinal}
                        src="/projects/waveswitch/waveswitch-final.mp4"
                        muted
                        playsInline
                        preload="auto"
                        onTimeUpdate={handleFinalVideoTimeUpdate}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Back Navigation */}
                <div className="w-full px-6 flex justify-start md:justify-center">
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col items-start md:items-center"
                  >
                    <div className="hidden md:block">
                      <button 
                        onClick={handleBack} 
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#0A84FF] text-white font-bold text-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
                      >
                        <ArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
                        {t.backButton}
                      </button>
                    </div>
                    <div className="md:hidden">
                      <button 
                        onClick={handleBack} 
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0A84FF] text-white active:scale-95 transition-all shadow-md"
                      >
                        <ArrowLeft className="w-6 h-6" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
