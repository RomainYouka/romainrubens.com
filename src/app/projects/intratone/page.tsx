"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, Play, Pause, ZoomIn } from "lucide-react";
import Lottie from "lottie-react";
import helloAnimation from "./hello.json";

type Language = "FR" | "EN" | "ՀԱՅ";

const MagnifierImage = ({ src, alt, hint, clickHint }: { src: string; alt: string; hint: string; clickHint: string }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const magnifierHeight = 200;
  const magnifierWidth = 300;
  const zoomLevel = 2.5;

  return (
    <div className="relative w-full max-w-[1000px] mx-auto mb-12 group cursor-none">
      <div className={`relative overflow-hidden transition-all duration-700 ${!isLoaded ? 'bg-[#13375A]/5 animate-pulse' : ''}`}>
        <img
          src={src}
          className={`w-full h-auto block transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onMouseEnter={(e) => {
            const { width, height } = e.currentTarget.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const { top, left } = e.currentTarget.getBoundingClientRect();
            setXY([e.pageX - left - window.pageXOffset, e.pageY - top - window.pageYOffset]);
          }}
          onMouseLeave={() => setShowMagnifier(false)}
          onClick={() => setShowMagnifier(!showMagnifier)}
        />
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{hint}</span>
          <span className="md:hidden">{clickHint}</span>
        </div>
      </div>
      <div
        style={{
          display: showMagnifier ? "block" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1",
          border: "1px solid rgba(255,255,255,0.2)",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          zIndex: 50,
        }}
      />
    </div>
  );
};

const translations = {
  FR: {
    projectTitle: "Intratone",
    role: "2026",
    tagline: "Refonte de l'écosystème Intratone pour les particuliers.",
    scroll: "Découvrir le projet",
    backButton: "Retour au Portfolio",
    aboutTitle: "À propos du projet",
    aboutText: "L’application Intratone est une application d’outils techniques ayant l’objectif d’interconnecter un portail/portillon du même écosystème aux habitants. Elle est disponible sur iOS et Android.",
    problemTitle: "La problématique",
    problemText: "Here, we redesign the interface intended for private users. Since it is a restricted application, access requires compatible equipment, credentials provided by the property manager, and a previously configured Intratone intercom. The basic interface is not intended for the general public. This is why the current architecture is designed for utilitarian use, with dense technical vocabulary and an information hierarchy that is not optimized for an average user.",
    objectivesTitle: "Objectives",
    objectivesText: "As part of this redesign, the goal is to modernize the overall experience: clarify user paths, reduce friction related to settings, improve the readability of main actions (opening a gate, managing badges, consulting access), and structure pages so that users can immediately find their way in a system that historically prioritizes functionality over user comfort.",
    componentsTitle: "Components",
    accessibilityTitle: "Design equitable experiences for everyone",
    accessibilityText: "This phase of work is dedicated to selecting and validating interface colors. Palettes were tested across different types of color blindness to ensure consistent perception of hierarchies, states, and contrast. The goal isn't to create a different experience, but an equivalent, readable and undegraded experience for all users.",
    existingTitle: "Existing version",
    wireframeTitle: "Wireframe",
    userFlowTitle: "User Flow",
    viewHighRes: "View high resolution",
    zoomHint: "Hover to zoom",
    clickHint: "Click to zoom",
    newVersionTitle: "New Version"
  },
  EN: {
    projectTitle: "Intratone",
    role: "2026",
    tagline: "Redesign of the Intratone ecosystem for private users.",
    scroll: "Discover the project",
    backButton: "Back to Portfolio",
    aboutTitle: "About the project",
    aboutText: "The Intratone app is a technical tool designed to interconnect a gate/door within the same ecosystem for residents. It is available on iOS and Android.",
    problemTitle: "The Problem",
    problemText: "Here, we redesign the interface intended for private users. Since it is a restricted application, access requires compatible equipment, credentials provided by the property manager, and a previously configured Intratone intercom. The basic interface is not intended for the general public. This is why the current architecture is designed for utilitarian use, with dense technical vocabulary and an information hierarchy that is not optimized for an average user.",
    objectivesTitle: "Objectives",
    objectivesText: "As part of this redesign, the goal is to modernize the overall experience: clarify user paths, reduce friction related to settings, improve the readability of main actions (opening a gate, managing badges, consulting access), and structure pages so that users can immediately find their way in a system that historically prioritizes functionality over user comfort.",
    componentsTitle: "Components",
    accessibilityTitle: "Design equitable experiences for everyone",
    accessibilityText: "This phase of work is dedicated to selecting and validating interface colors. Palettes were tested across different types of color blindness to ensure consistent perception of hierarchies, states, and contrast. The goal isn't to create a different experience, but an equivalent, readable and undegraded experience for all users.",
    existingTitle: "Existing version",
    wireframeTitle: "Wireframe",
    userFlowTitle: "User Flow",
    viewHighRes: "View high resolution",
    zoomHint: "Hover to zoom",
    clickHint: "Click to zoom",
    newVersionTitle: "New Version"
  },
  "ՀԱՅ": {
    projectTitle: "Intratone",
    role: "2026",
    tagline: "Intratone էկոհամակարգի վերաձևավորում անհատ օգտվողների համար:",
    scroll: "Բացահայտեք նախագիծը",
    backButton: "Վերադառնալ պորտֆոլիո",
    aboutTitle: "Նախագծի մասին",
    aboutText: "Intratone հավելվածը տեխնիկական գործիքների հավաքածու է, որի նպատակն է նույն էկոհամակարգին պատկանող դարպասը կամ դռնակը միացնել բնակիչներին։ Այն հասանելի է ինչպես iOS, այնպես էլ Android հարթակներում։",
    problemTitle: "Խնդիրը",
    problemText: "Այս աշխատանքի շրջանակում մենք վերանայում ենք այն ինտերֆեյսը, որը նախատեսված է անհատ օգտագործողի համար։ Քանի որ խոսքը սահմանափակ հասանելիություն ունեցող հավելվածի մասին է, դրա օգտագործումը պահանջում է համատեղելի սարքավորում, շենքի կառավարչի կամ սինդիկի կողմից տրամադրված մուտքային տվյալներ, ինչպես նաև նախապես կարգավորված Intratone ինտերկոմի առկայություն։",
    objectivesTitle: "Նպատակները",
    objectivesText: "Վերաձևավորման այս նախագծի հիմնական նպատակը ընդհանուր օգտագործման փորձի արդիականացումն է․ պարզեցնել օգտվողի ուղիները, նվազեցնել կարգավորումների հետ կապված շփման բարդությունները, բարելավել հիմնական գործողությունների ընթեռնելիությունը (դարպասի բացում, բեյջերի կառավարում, մուտքերի դիտում) և կառուցել էջերի հստակ կազմակերպում, որը թույլ կտա օգտագործողին անմիջապես կողմնորոշվել մի համակարգում, որն ի սկզբանե առավելություն է տվել ֆունկցիոնալությանը՝ օգտագործման հարմարավետության հաշվին։",
    componentsTitle: "Բաղադրիչները",
    accessibilityTitle: "Արդար փորձի նախագծում բոլորի համար",
    accessibilityText: "Այս աշխատանքային փուլը նվիրված է ինտերֆեյսի գունային ընտրությանը և հաստատմանը։ Գունային պալիտրաները փորձարկվել են դալտոնիզմի տարբեր տեսակների պայմաններում՝ ապահովելու համար հիերարխիաների, վիճակների և կոնտրաստների համահունչ ընկալումը։ Նպատակը տարբեր փորձառություն առաջարկելը չէ, այլ բոլոր օգտագործողների համար հավասար, ընթեռնելի և չխաթարված օգտագործման փորձ ապահովելը։",
    existingTitle: "Գոյություն ունեցող տարբերակը",
    wireframeTitle: "Wireframe",
    userFlowTitle: "Օգտագործողի ուղին",
    viewHighRes: "Դիտել բարձր որակով",
    zoomHint: "Անցեք մկնիկը՝ խոշորացնելու համար",
    clickHint: "Սեղմեք խոշորացնելու համար",
    newVersionTitle: "Նոր Տարբերակ"
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

export default function IntratonePage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("FR");
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPlayingAvant, setIsPlayingAvant] = useState(true);
  const [isPlayingWireframe, setIsPlayingWireframe] = useState(true);
  const [isPlayingNouveau2, setIsPlayingNouveau2] = useState(true);
  
  const videoAvantRef = useRef<HTMLVideoElement>(null);
  const videoWireframeRef = useRef<HTMLVideoElement>(null);
  const videoNouveau2Ref = useRef<HTMLVideoElement>(null);
  const videoHeroRef = useRef<HTMLVideoElement>(null);

  const handleHeroVideoTimeUpdate = () => {
    const video = videoHeroRef.current;
    if (!video) return;
    if (video.currentTime >= video.duration - 0.5) {
      video.pause();
      video.currentTime = video.duration - 0.5;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoHeroRef.current) {
            videoHeroRef.current.currentTime = 0;
            videoHeroRef.current.play();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoHeroRef.current) {
      observer.observe(videoHeroRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  const togglePlayAvant = () => {
    if (videoAvantRef.current) {
      if (isPlayingAvant) videoAvantRef.current.pause();
      else videoAvantRef.current.play();
      setIsPlayingAvant(!isPlayingAvant);
    }
  };

  const togglePlayWireframe = () => {
    if (videoWireframeRef.current) {
      if (isPlayingWireframe) videoWireframeRef.current.pause();
      else videoWireframeRef.current.play();
      setIsPlayingWireframe(!isPlayingWireframe);
    }
  };

  const togglePlayNouveau2 = () => {
    if (videoNouveau2Ref.current) {
      if (isPlayingNouveau2) videoNouveau2Ref.current.pause();
      else videoNouveau2Ref.current.play();
      setIsPlayingNouveau2(!isPlayingNouveau2);
    }
  };

  return (
    <main id="main-content" className="w-full min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      <AnimatePresence>
        {showOverlay && <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ backgroundColor: "#F5F5F5" }} />}
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
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#13375A]/20 hover:bg-[#13375A] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#13375A" strokeWidth="2" className="group-hover:stroke-white transition-colors duration-300">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            </motion.div>

            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
              <motion.div 
                animate={{
                  background: [
                    "linear-gradient(135deg, #13375A 0%, #1e4d7d 50%, #2963a0 100%)",
                    "linear-gradient(135deg, #1e4d7d 0%, #2963a0 50%, #13375A 100%)",
                    "linear-gradient(135deg, #2963a0 0%, #13375A 50%, #1e4d7d 100%)",
                    "linear-gradient(135deg, #13375A 0%, #1e4d7d 50%, #2963a0 100%)",
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

            <section id="project-content" className="bg-[#F5F5F5] py-20">
              <div className="w-full mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <div className="inline-block px-4 py-1.5 bg-[#007AFF]/10 rounded-full mb-6 max-w-[90%] mx-auto text-center">
                    <span className="text-[#007AFF] text-sm font-semibold tracking-wide uppercase block">
                      {t.aboutTitle}
                    </span>
                  </div>
                  
                  <div className="w-full max-w-[800px] mb-20 px-6">
                    <p className="text-[#13375A] text-lg md:text-xl leading-relaxed text-center opacity-80">
                      {t.aboutText}
                    </p>
                  </div>

                  <div className="w-full mb-24 relative overflow-hidden">
                    <video
                      ref={videoHeroRef}
                      src="/projects/intratone/nouvelle_hero_v2.webm"
                      className="w-full h-auto block"
                      muted
                      playsInline
                      onTimeUpdate={handleHeroVideoTimeUpdate}
                    />
                  </div>

                  <div className="inline-block px-4 py-1.5 bg-[#E31E24]/10 rounded-full mb-10 max-w-[90%] mx-auto text-center">
                    <span className="text-[#E31E24] text-sm font-semibold tracking-wide uppercase block">
                      {t.existingTitle}
                    </span>
                  </div>

                  <div className="w-full max-w-[800px] mb-12 px-6">
                    <p className="text-[#13375A] text-lg md:text-xl leading-relaxed text-center opacity-80">
                      {t.problemText}
                    </p>
                  </div>

                  <div className="w-full max-w-[1400px] mb-24 relative group overflow-hidden">
                    <video
                      ref={videoAvantRef}
                      src="/projects/intratone/avant.webm"
                      className="w-[101%] h-auto -ml-[0.5%] scale-[1.01]"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <button
                      onClick={togglePlayAvant}
                      className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {isPlayingAvant ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                    </button>
                  </div>

                  <div className="inline-block px-4 py-1.5 bg-[#E31E24]/10 rounded-full mb-10 max-w-[90%] mx-auto text-center">
                    <span className="text-[#E31E24] text-sm font-semibold tracking-wide uppercase block">
                      {t.userFlowTitle}
                    </span>
                  </div>

                  <div className="w-full max-w-[800px] mb-12 px-6">
                    <p className="text-[#13375A] text-lg md:text-xl leading-relaxed text-center opacity-80">
                      {t.objectivesText}
                    </p>
                  </div>

                  <div className="w-full mb-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="w-full max-w-[1000px] mx-auto mb-12 group cursor-pointer"
                      onClick={() => window.open("/projects/intratone/user-flow.pdf", "_blank")}
                    >
                      <div className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:scale-[1.01]">
                        <img
                          src="/projects/intratone/user-flow.png"
                          className="w-full h-auto block"
                          alt="Intratone User Flow"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                          <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 transform translate-y-0">
                            <ZoomIn className="w-4 h-4" />
                            <span>{language === "FR" ? "Cliquez pour afficher en grand" : 
                                   language === "EN" ? "Click to enlarge" : 
                                   "Սեղմեք՝ մեծացնելու համար"}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* New Section: Components & Accessibility */}
                  <section className="w-full bg-white py-24 -mx-6 px-6">
                    <div className="max-w-[1400px] mx-auto flex flex-col items-center">
                      <div className="inline-block px-4 py-1.5 bg-[#13375A]/10 rounded-full mb-10 max-w-[90%] mx-auto text-center">
                        <span className="text-[#13375A] text-sm font-semibold tracking-wide uppercase block">
                          {t.componentsTitle}
                        </span>
                      </div>
                      
                      <div className="w-full max-w-[1200px] mb-24">
                        <img
                          src="/projects/intratone/composants.png"
                          className="w-full h-auto block"
                          alt="Intratone Components"
                        />
                      </div>

                      <div className="inline-block px-4 py-1.5 bg-[#13375A]/10 rounded-full mb-10 max-w-[90%] mx-auto text-center">
                        <span className="text-[#13375A] text-sm font-semibold tracking-wide uppercase block">
                          {t.accessibilityTitle}
                        </span>
                      </div>

                      <div className="w-full max-w-[800px] mb-12 px-6">
                        <p className="text-[#13375A] text-lg md:text-xl leading-relaxed text-center opacity-80">
                          {t.accessibilityText}
                        </p>
                      </div>

                      <div className="w-full max-w-[1200px]">
                        <img
                          src="/projects/intratone/daltonisme.png"
                          className="w-full h-auto block"
                          alt="Intratone Accessibility Colors"
                        />
                      </div>
                    </div>
                  </section>

                  <div className="inline-block px-4 py-1.5 bg-[#E31E24]/10 rounded-full mb-10 mt-12 max-w-[90%] mx-auto text-center">
                    <span className="text-[#E31E24] text-sm font-semibold tracking-wide uppercase block">
                      {t.wireframeTitle}
                    </span>
                  </div>

                  <div className="w-full max-w-[1400px] mb-24 relative group overflow-hidden">
                    <video
                      ref={videoWireframeRef}
                      src="/projects/intratone/wireframe.webm"
                      className="w-[101%] h-auto -ml-[0.5%] scale-[1.01]"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <button
                      onClick={togglePlayWireframe}
                      className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {isPlayingWireframe ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="bg-[#C3DAE6] py-20">
              <div className="w-full mx-auto flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="inline-block px-4 py-1.5 bg-[#E31E24]/10 rounded-full mb-10 max-w-[90%] mx-auto text-center">
                    <span className="text-[#E31E24] text-sm font-semibold tracking-wide uppercase block">
                      {t.newVersionTitle}
                    </span>
                  </div>

                  <div className="w-full max-w-[1400px] mb-24 relative group overflow-hidden">
                    <video
                      ref={videoNouveau2Ref}
                      src="/projects/intratone/showreel.webm"
                      className="w-[101%] h-auto -ml-[0.5%] scale-[1.01]"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <button
                      onClick={togglePlayNouveau2}
                      className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {isPlayingNouveau2 ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                    </button>
                  </div>

                  {/* Figma Section */}
                  <div className="flex flex-col items-center mb-12">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="inline-block px-4 py-1.5 bg-black/10 rounded-full mb-6 max-w-[90%] mx-auto text-center"
                    >
                      <span className="text-black/60 text-sm font-semibold tracking-wide uppercase block">
                        {language === "FR" ? "Explorer les coulisses !" : 
                         language === "EN" ? "Explore the behind the scenes!" : 
                         "Բացահայտեք կուլիսները"}
                      </span>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="text-[#13375A] text-lg font-medium mb-8 text-center opacity-80 max-w-[600px]"
                    >
                      {language === "FR" ? "Comprendre comment le produit fonctionne, pas seulement à quoi il ressemble." : 
                       language === "EN" ? "Understand how the product works, not just what it looks like." : 
                       "Հասկանալ, թե ինչպես է աշխատում արտադրանքը, այլ ոչ թե միայն ինչ տեսք ունի այն:"}
                    </motion.p>

                    <motion.a
                      href="https://www.figma.com/design/YBxvVFK5fzhVkXuzdMUaFH/RUBENS-Romain---Intratone--Aper%C3%A7u-website-?node-id=0-1&t=Q9fvRu1HLNc8e4dd-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-[#13375A] text-white rounded-full font-bold text-sm md:text-lg shadow-xl shadow-blue-900/20 transition-all w-fit md:w-auto justify-center md:min-w-[300px]"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 28.5C19 25.9837 20.0009 23.5706 21.7825 21.7891C23.564 20.0076 25.9772 19.0067 28.4935 19.0067C31.0098 19.0067 33.4229 20.0076 35.2045 21.7891C36.986 23.5706 37.987 25.9837 37.987 28.5C37.987 31.0163 36.986 33.4294 35.2045 35.2109C33.4229 36.9924 31.0098 37.9933 28.4935 37.9933C25.9772 37.9933 23.564 36.9924 21.7825 35.2109C20.0009 33.4294 19 31.0163 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0.0130005 47.4933C0.0130005 44.977 1.01389 42.5639 2.79547 40.7824C4.57705 39.0008 6.99017 38 9.5065 38H19.013V47.4933C19.013 50.0097 18.0121 52.4228 16.2305 54.2044C14.449 55.9859 12.0358 56.9868 9.5195 56.9868C7.00317 56.9868 4.59005 55.9859 2.80847 54.2044C1.02689 52.4228 0.026001 50.0097 0.026001 47.4933H0.0130005Z" fill="#0ACF83"/>
                        <path d="M0.0130005 28.5C0.0130005 25.9837 1.01389 23.5706 2.79547 21.7891C4.57705 20.0076 6.99017 19.0067 9.5065 19.0067H19.013V38H9.5065C6.99017 38 4.57705 36.9991 2.79547 35.2176C1.01389 33.4361 0.0130005 31.023 0.0130005 28.5Z" fill="#A259FF"/>
                        <path d="M0.0130005 9.50667C0.0130005 6.99034 1.01389 4.57722 2.79547 2.79564C4.57705 1.01405 6.99017 0.0131836 9.5065 0.0131836H19.013V19.0065H9.5065C6.99017 19.0065 4.57705 18.0056 2.79547 16.2241C1.01389 14.4425 0.0130005 12.0293 0.0130005 9.51318L0.0130005 9.50667Z" fill="#F24E1E"/>
                        <path d="M19.013 0.0131836H28.5195C31.0358 0.0131836 33.4489 1.01407 35.2305 2.79565C37.0121 4.57723 38.013 6.99036 38.013 9.50667C38.013 12.023 37.0121 14.4361 35.2305 16.2177C33.4489 17.9993 31.0358 19.0001 28.5195 19.0001H19.013V0.0131836Z" fill="#FF7262"/>
                      </svg>
                      {language === "FR" ? "Accéder au fichier Figma" : 
                       language === "EN" ? "Access the Figma file" : 
                       "Մուտք գործել Figma ֆայլ"}
                    </motion.a>

                    <motion.a
                      href="https://www.figma.com/proto/YBxvVFK5fzhVkXuzdMUaFH/RUBENS-Romain---Intratone--Aper%C3%A7u-website-?page-id=0%3A1&node-id=1-1808&p=f&viewport=572%2C192%2C0.05&t=B8YwqGi4rOTrQ3ag-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A1808"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="mt-4 inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-[#13375A] text-white rounded-full font-bold text-sm md:text-lg shadow-xl shadow-blue-900/20 transition-all w-fit md:w-auto justify-center md:min-w-[300px]"
                    >
                      <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                      {language === "FR" ? "Voir le prototype Figma" : 
                       language === "EN" ? "View the Figma prototype" : 
                       "Դիտել Figma նախատիպը"}
                    </motion.a>
                  </div>

                  <div className="mt-24 w-full px-6 flex justify-start md:justify-center pb-20">
                    {/* Desktop Button */}
                    <button
                      onClick={handleBack}
                      className="hidden md:flex group relative items-center gap-3 px-8 py-4 bg-white border border-[#13375A]/20 text-[#13375A] rounded-full font-bold text-lg transition-all duration-300 hover:bg-[#13375A] hover:text-white active:scale-[0.98] shadow-md hover:shadow-xl"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      {t.backButton}
                    </button>

                    {/* Mobile Button */}
                    <button
                      onClick={handleBack}
                      className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#13375A]/20 hover:bg-[#13375A] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#13375A" strokeWidth="2" className="group-hover:stroke-white transition-colors duration-300">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
