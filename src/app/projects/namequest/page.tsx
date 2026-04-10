"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  EN: {
    projectTitle: "NameQuest",
    tagline: "Educational Board Game",
    year: "2025",
    role: "2025",
    specPlayers: "2 to 6 players",
    specAge: "Ages 12+",
    specInfo: "Educational & Cultural",
    descriptionTitle: "About the project",
    description: "NameQuest is an educational and inclusive board game that explores family-name discrimination through a 55-space path representing different countries.\n\nMade up of individual, collective and trap cards, the game mixes anecdotes, general-knowledge questions and real-life situations.",
    challengeTitle: "The Challenge",
    challengeText: "Many people still report experiencing discrimination linked to their name, whether in administrative processes, in school environments or in everyday interactions.\n\nHow might we create an inclusive educational tool capable of sparking an honest, playful and accessible conversation about identity?",
    solutionTitle: "The Solution",
    solutionText: "Designed for 2 to 6 players, the game encourages reflection and conversation in a playful and accessible environment. The visual design is colorful, with laser-cut tokens and a strong cultural dimension.",
    processTitle: "Design Process",
    contextTitle: "Context & Research",
    contextText: "The project begins with a simple observation: a family name is never neutral.\nIt carries a story, an origin and a heritage. It can be a source of pride, but also of prejudice.",
    podcastTitle: "The Podcast",
    podcastCTA: "Listen to the narrative",
    visualsTitle: "Visual Identity",
    detailsTitle: "Game Components",
    boardDesignTitle: "Board Design",
    rulesTitle: "Game Rules",
    backButton: "Back to projects",
    scroll: "Discover the project"
  },
  FR: {
    projectTitle: "NameQuest",
    tagline: "Jeu de Société Éducatif",
    year: "2025",
    role: "2025",
    specPlayers: "2 à 6 joueurs",
    specAge: "Dès 12 ans",
    specInfo: "Éducatif & Culturel",
    descriptionTitle: "De quoi il s'agit",
    description: "NameQuest est un jeu de société éducatif et inclusif, abordant les discriminations liées aux noms de famille à travers un parcours de 55 cases représentant différents pays. Composé de cartes individuelles, collectives et pièges, le jeu mêle anecdotes, questions de culture générale et situations vécues.",
    challengeTitle: "Le Défi",
    challengeText: "Certaines personnes témoignent encore aujourd'hui de discriminations liées à leur nom, que ce soit dans les démarches administratives, dans le milieu scolaire ou dans les interactions du quotidien. Comment créer un support pédagogique inclusif, capable de provoquer une conversation honnête, ludique et accessible autour de l'identité ?",
    solutionTitle: "La Solution",
    solutionText: "Pensé pour 2 à 6 joueurs, le jeu invite à la réflexion et au dialogue dans un cadre ludique et accessible, avec un design coloré, des pions en découpe laser, et une forte dimension culturelle.",
    processTitle: "Processus de Design",
    contextTitle: "Contexte & Recherche",
    contextText: "Le projet part d'un constat simple : le nom de famille n'est jamais neutre. Il révèle une histoire, une origine et un héritage. Il peut être source de fierté mais aussi de préjugés.",
    podcastTitle: "Le Podcast",
    podcastCTA: "Écouter l'histoire",
    visualsTitle: "Identité Visuelle",
    detailsTitle: "Composants du Jeu",
    boardDesignTitle: "Conception du plateau",
    rulesTitle: "Règles du jeu",
    backButton: "Retour aux projets",
    scroll: "Découvrir le projet"
  },
  "ՀԱՅ": {
    projectTitle: "NameQuest",
    tagline: "Կրթական սեղանի խաղ",
    year: "2025",
    role: "2025",
    specPlayers: "2-ից 6 խաղացող",
    specAge: "12 տարեկանից սկսած",
    specInfo: "Կրթական և մշակութային",
    descriptionTitle: "Նախագծի մասին",
    description: "NameQuest-ը կրթական և ներառական սեղանի խաղ է, որը վերհանում է ազգանունների հիման վրա կիրառվող խտրականության խնդիրները՝ անցնելով 55 տարբեր երկրներ ներկայացնող ուղիով: Խաղը, բաղկացած լինելով անհատական, հավաքական և «թակարդ» քարտերից, միահյուսում է պատմական դիպվածները, ընդհանուր զարգացվածության հարցերն ու կյանքի իրական իրավիճակները:",
    challengeTitle: "Մարտահրավերը",
    challengeText: "Բազմաթիվ մարդիկ առ այսօր բախվում են իրենց ազգանվան հետ կապված խտրական դրսևորումների՝ լինի դա վարչական գործընթացներում, կրթական միջավայրում, թե ամենօրյա շփումներում: Ինչպե՞ս ստեղծել ներառական կրթական գործիք, որն ի զորու է ինքնության շուրջ ազնիվ, խաղային և մատչելի երկխոսություն հարուցել:",
    solutionTitle: "Լուծումը",
    solutionText: "2-ից 6 խաղացողների համար նախատեսված այս խաղը խրախուսում է խորհրդածությունն ու երկխոսությունը խաղային և հասանելի միջավայրում: Տեսողական ձևավորումը գունեղ է՝ լազերային մշակմամբ խաղաքարերով և ընդգծված մշակութային շեշտադրմամբ:",
    processTitle: "Դիզայնի գործընթացը",
    contextTitle: "Համատեքստ և հետազոտություն",
    contextText: "Նախագիծը սկսվում է մի պարզ դիտարկումից. ազգանունը երբեք չեզոք չէ: Այն կրում է պատմություն, ծագում և ժառանգություն: Այն կարող է լինել հպարտության աղբյուր, բայց նաև՝ նախապաշարմունքների պատճառ:",
    podcastTitle: "Փոդքաստ",
    podcastCTA: "Ունկնդրել պատմությունը",
    visualsTitle: "Տեսողական ինքնություն",
    detailsTitle: "Խաղի բաղադրիչները",
    boardDesignTitle: "Խաղատախտակի ձևավորումը",
    rulesTitle: "Խաղի կանոնները",
    backButton: "Վերադառնալ նախագծերին",
    scroll: "Բացահայտեք նախագիծը"
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

export default function NameQuestPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("FR");
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const imagesRef = useRef<HTMLVideoElement>(null);
  const screensRef = useRef<HTMLVideoElement>(null);
  const plateauRef = useRef<HTMLVideoElement>(null);
  const rulesRef = useRef<HTMLVideoElement>(null);
  const isImagesInView = useInView(imagesRef, { once: false, amount: 0.1 });
  const isScreensInView = useInView(screensRef, { once: false, amount: 0.1 });
  const isPlateauInView = useInView(plateauRef, { once: false, amount: 0.1 });
  const isRulesInView = useInView(rulesRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (imagesRef.current) {
      if (isImagesInView) {
        imagesRef.current.currentTime = 0;
        imagesRef.current.play().catch(() => {});
      } else {
        imagesRef.current.pause();
      }
    }
  }, [isImagesInView]);

  useEffect(() => {
    if (screensRef.current) {
      if (isScreensInView) {
        screensRef.current.currentTime = 0;
        screensRef.current.play().catch(() => {});
      } else {
        screensRef.current.pause();
      }
    }
  }, [isScreensInView]);

  useEffect(() => {
    if (plateauRef.current) {
      if (isPlateauInView) {
        plateauRef.current.currentTime = 0;
        plateauRef.current.play().catch(() => {});
      } else {
        plateauRef.current.pause();
      }
    }
  }, [isPlateauInView]);

  const prevIsRulesInView = useRef(false);
  useEffect(() => {
    if (rulesRef.current) {
      if (isRulesInView) {
        if (!prevIsRulesInView.current) {
          rulesRef.current.currentTime = 0;
        }
        rulesRef.current.play().catch(() => {});
      } else {
        rulesRef.current.pause();
      }
    }
    prevIsRulesInView.current = isRulesInView;
  }, [isRulesInView]);

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
    const firstAnimation = document.getElementById('visual-identity');
    if (firstAnimation) {
      firstAnimation.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main id="main-content" className="w-full min-h-screen" style={{ backgroundColor: "#EBEFF0" }}>
      <AnimatePresence>
        {showOverlay && <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ backgroundColor: "#EBEFF0" }} />}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            
            {/* Back Button - Fixed Absolute to Section */}
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

            {/* Hero Section - Full Width */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              {/* Animated Gradient Background */}
              <motion.div 
                animate={{
                  background: [
                    "linear-gradient(135deg, #13375a 0%, #1e4a7a 50%, #5A7FA4 100%)",
                    "linear-gradient(135deg, #1e4a7a 0%, #5A7FA4 50%, #13375a 100%)",
                    "linear-gradient(135deg, #5A7FA4 0%, #13375a 50%, #1e4a7a 100%)",
                    "linear-gradient(135deg, #13375a 0%, #1e4a7a 50%, #5A7FA4 100%)",
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

              {/* Scroll Down Button - Outside the text container, at the bottom of the blue background div */}
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

            {/* Visual Identity Animation 1 - Borderless, No Title */}
            <section id="visual-identity" className="w-full">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="w-full"
              >
                <video
                  ref={imagesRef}
                  src="/projects/namequest/namequest-animations-images.webm"
                  className="w-full h-auto"
                  muted
                  playsInline
                  onTimeUpdate={() => handleVideoTimeUpdate(imagesRef)}
                />
              </motion.div>
            </section>

            {/* Podcast Section - Animated Background - Below first mockup */}
            <section className="relative py-16 md:py-32 px-6 md:px-12 overflow-hidden">
              <motion.div 
                animate={{
                  background: [
                    "linear-gradient(135deg, #13375a 0%, #1e4a7a 50%, #5A7FA4 100%)",
                    "linear-gradient(135deg, #1e4a7a 0%, #5A7FA4 50%, #13375a 100%)",
                    "linear-gradient(135deg, #5A7FA4 0%, #13375a 50%, #1e4a7a 100%)",
                    "linear-gradient(135deg, #13375a 0%, #1e4a7a 50%, #5A7FA4 100%)",
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              />
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center mb-6 md:mb-10"
                >
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "8px"
                  }}>
                    {t.podcastCTA}
                  </h3>
                </motion.div>
                
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full flex justify-center px-4"
                >
                  <div className="w-full max-w-4xl">
                    <iframe 
                      style={{borderRadius: "12px"}}
                      src="https://open.spotify.com/embed/episode/03xwhLY3oo5cApzEvD9IvY?utm_source=generator&theme=0" 
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Project Overview / Intro */}
            <section className="py-24 px-6 md:px-12 bg-white">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <span className="inline-block px-4 py-2 bg-[#13375a]/10 rounded-full text-[#13375a] text-sm font-semibold tracking-wider uppercase mb-6">
                    {t.descriptionTitle}
                  </span>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 400,
                    color: "#424245",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line"
                  }}>
                    {t.description}
                  </p>
                  
                  {/* Project Rules / Specs Pilled badges */}
                  <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8">
                    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-[#13375a]/10 rounded-full text-[#13375a] text-xs md:text-sm font-medium whitespace-nowrap">
                      {t.specPlayers}
                    </span>
                    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-[#13375a]/10 rounded-full text-[#13375a] text-xs md:text-sm font-medium whitespace-nowrap">
                      {t.specAge}
                    </span>
                    <span className="px-4 py-2 bg-[#E8B86D]/20 rounded-full text-[#13375a] text-sm font-medium hidden md:inline-block">
                      {t.specInfo}
                    </span>
                    <span className="px-3 py-1.5 bg-[#E8B86D]/20 rounded-full text-[#13375a] text-xs font-medium whitespace-nowrap md:hidden">
                      {t.specInfo}
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="w-full flex justify-center px-6 md:px-12">
                <motion.div 
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="max-w-4xl w-full"
                >
                  <img 
                    src="/projects/namequest/namequest-board-full.png" 
                    alt="NameQuest Hero" 
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </section>

            {/* The Challenge Section */}
            <section className="relative py-24 bg-[#EBEFF0] overflow-hidden">
              <div className="w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-0">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full md:w-[45%] px-6 md:pl-24 text-center md:text-left"
                >
                  <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] text-sm font-semibold tracking-wider uppercase mb-6">
                    {t.challengeTitle}
                  </span>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 400,
                    color: "#424245",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line"
                  }}>
                    {t.challengeText}
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full md:w-[55%] flex justify-end items-center"
                >
                  <img 
                    src="/projects/namequest/namequest-board-detail.png" 
                    alt="NameQuest Board Detail" 
                    className="w-[85%] md:w-full h-auto object-cover object-left scale-100 md:scale-105 origin-right"
                    style={{ marginRight: "-2px" }}
                  />
                </motion.div>
              </div>
            </section>

            {/* Context Section */}
            <section className="py-24 bg-white">
              <div className="max-w-4xl mx-auto px-6 md:px-12">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center"
                >
                  <span className="inline-block px-4 py-2 bg-[#E8B86D]/20 rounded-full text-[#13375a] text-sm font-semibold tracking-wider uppercase mb-6">
                    {t.contextTitle}
                  </span>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 400,
                    color: "#424245",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line"
                  }}>
                    {t.contextText}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Board Design Animation - Responsive */}
            <section className="pt-12 w-full bg-white overflow-hidden">
              <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-12">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                  <span className="inline-block px-4 py-2 bg-[#E8B86D]/20 rounded-full text-[#13375a] text-sm font-semibold tracking-wider uppercase mb-6">
                    {t.boardDesignTitle}
                  </span>
                </motion.div>
              </div>
              
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="w-full flex flex-col items-center"
              >
                {/* Board Animation */}
                <div className="w-full">
                  {/* Desktop Version */}
                  <div className="hidden md:block w-full">
                    <video
                      ref={plateauRef}
                      src="/projects/namequest/namequest-animation-plateau-desktop.webm"
                      className="w-full h-auto"
                      muted
                      playsInline
                      onTimeUpdate={() => handleVideoTimeUpdate(plateauRef)}
                      style={{ backgroundColor: "#ffffff" }}
                    />
                  </div>
                  
                  {/* Mobile Version - Full Width No Borders */}
                  <div className="block md:hidden w-full">
                    <video
                      src="/projects/namequest/namequest-animation-plateau.webm"
                      className="w-full h-auto"
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                  </div>
                </div>

                {/* New Screens Animation integrated at the bottom of the section */}
                <div className="w-full bg-white py-24 px-6 md:px-12 mt-0">
                  <video
                    ref={screensRef}
                    src="/projects/namequest/namequest-screens-v3.webm"
                    className="w-full h-auto max-w-full mix-blend-multiply"
                    muted
                    playsInline
                    onTimeUpdate={() => handleVideoTimeUpdate(screensRef)}
                    style={{ backgroundColor: "#ffffff" }}
                  />
                </div>
              </motion.div>
            </section>

            {/* Rules Animation Section */}
            <section className="w-full bg-[#ECF1F3] overflow-hidden">
              <div className="max-w-4xl mx-auto px-6 md:px-12 text-center pt-8 mb-0">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                  <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] text-sm font-semibold tracking-wider uppercase mb-0">
                    {t.rulesTitle}
                  </span>
                </motion.div>
              </div>
              
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="w-full relative flex flex-col items-center"
              >
                <div className="w-full">
                  <video
                    ref={rulesRef}
                    src="/projects/namequest/namequest-animation-rules.webm"
                    className="w-full h-auto block"
                    muted
                    playsInline
                    onTimeUpdate={() => handleVideoTimeUpdate(rulesRef)}
                    style={{ backgroundColor: "#ECF1F3", display: "block" }}
                  />
                </div>

                {/* Back to Portfolio CTA - Overlay at bottom of video */}
                <motion.div
                  variants={fadeInUp}
                  className="absolute bottom-6 md:bottom-10 left-6 md:left-1/2 md:-translate-x-1/2 z-20"
                >
                  {/* Mobile Button: Circle with Arrow Left (Same as Top Button) */}
                  <button
                    onClick={handleBack}
                    className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-[#13375a] text-white transition-all transform hover:scale-110 shadow-xl active:scale-95"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>

                  {/* Desktop Button: Original Large Button with Text */}
                  <button
                    onClick={handleBack}
                    className="hidden md:flex items-center flex-row-reverse gap-3 mx-auto px-8 py-4 bg-[#13375a] text-white rounded-full font-bold hover:bg-[#5A7FA4] transition-all transform hover:scale-105 shadow-xl whitespace-nowrap"
                  >
                    {t.backButton}
                    <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180" />
                  </button>
                </motion.div>
              </motion.div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
