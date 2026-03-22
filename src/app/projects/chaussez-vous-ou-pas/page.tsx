"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, ZoomIn } from "lucide-react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    projectTitle: "Chaussez-vous ou pas",
    role: "2026",
    tagline: "Une exploration visuelle de nos rapports aux chaussures.",
    scroll: "Découvrir le projet",
    backButton: "Retour aux projets",
    zoomHint: "Survolez pour zoomer",
    clickHint: "Cliquez pour zoomer",
    highQuality: "Meilleure qualité (PDF)",
    descriptionTitle: "À propos du projet",
    description: "Ce projet naît d’une attention portée aux détails du quotidien. En choisissant de cadrer uniquement les pieds, les chaussures et le sol, le regard se détourne du visage pour observer autrement les individus et les espaces qu’ils traversent. Les images capturent des situations ordinaires comme attendre, marcher, voyager ou simplement être là. À travers ces fragments, les chaussures deviennent un signe. Elles parlent de confort, d’intimité, de normes sociales et de rapport aux lieux, sans jamais montrer directement les personnes.\n\nChaussez-vous ou pas interroge ainsi nos habitudes et nos gestes les plus simples. Entre intérieur et extérieur, privé et public, le projet propose une lecture sensible de la manière dont nous habitons les espaces et laissons des traces, parfois sans même nous en rendre compte."
  },
  EN: {
    projectTitle: "Chaussez-vous ou pas",
    role: "2026",
    tagline: "A visual exploration of our relationship with shoes.",
    scroll: "Discover the project",
    backButton: "Back to projects",
    zoomHint: "Hover to zoom",
    clickHint: "Click to zoom",
    highQuality: "Higher quality (PDF)",
    descriptionTitle: "About the project",
    description: "Step into your shoes or not\n\nThis project is born from an attention to everyday details. By choosing to frame only the feet, shoes, and the ground, the gaze turns away from the face to observe individuals and the spaces they move through differently. The images capture ordinary situations such as waiting, walking, traveling, or simply being there. Through these fragments, shoes become a sign. They speak of comfort, intimacy, social norms, and our relationship with places, without ever directly showing the people.\n\nChaussez-vous ou pas thus questions our simplest habits and gestures. Between interior and exterior, private and public, the project offers a sensitive reading of how we inhabit spaces and leave traces, sometimes without even realizing it."
  },
  "ՀԱՅ": {
    projectTitle: "Chaussez-vous ou pas",
    role: "2026",
    tagline: "Մեր կոշիկների հետ ունեցած հարաբերությունների տեսողական հետազոտություն:",
    scroll: "Բացահայտեք նախագիծը",
    backButton: "Վերադառնալ նախագծերին",
    zoomHint: "Անցեք մկնիկը՝ խոշորացնելու համար",
    clickHint: "Սեղմեք խոշորացնելու համար",
    highQuality: "Բարձր որակ (PDF)",
    descriptionTitle: "Նախագծի մասին",
    description: "Կոշիկներ հագեք թե ոչ\n\nԱյս նախագիծը ծնվել է առօրյա մանրուքների նկատմամբ ուշադրությունից: Ընտրելով միայն ոտքերը, կոշիկները և գետինը շրջանակելը՝ հայացքը հեռանում է դեմքից՝ այլ կերպ դիտարկելու անհատներին և նրանց անցած տարածությունները: Պատկերները ֆիքսում են սովորական իրավիճակներ, ինչպիսիք են սպասելը, քայլելը, ճանապարհորդելը կամ պարզապես այնտեղ լինելը: Այս բեկորների միջոցով կոշիկները դառնում են նշան: Նրանք խոսում են հարմարավետության, մտերմության, սոցիալական նորմերի և վայրերի հետ կապի մասին՝ առանց երբևէ ուղղակիորեն ցույց տալու մարդկանց:\n\nChaussez-vous ou pas-ը հարցականի տակ է դնում մեր ամենապարզ սովորություններն ու ժեստերը: Ներսի և դրսի, անձնականի և հանրայինի միջև նախագիծն առաջարկում է զգայուն ընթերցում այն մասին, թե ինչպես ենք մենք բնակեցնում տարածությունները և թողնում հետքեր, երբեմն նույնիսկ առանց դա գիտակցելու:"
  }
};

const MagnifierImage = ({ src, alt, hint, clickHint }: { src: string; alt: string; hint: string; clickHint: string }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const magnifierHeight = 200;
  const magnifierWidth = 300;
  const zoomLevel = 2.5;

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-12 group cursor-none">
      <div className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-700 ${!isLoaded ? 'bg-[#333333]/20 animate-pulse' : ''}`}>
        <img
          src={src}
          className={`w-full h-auto display-block transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          onClick={() => {
            setShowMagnifier(!showMagnifier);
          }}
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
          border: "2px solid rgba(255,255,255,0.5)",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          borderRadius: "inherit",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          zIndex: 50,
        }}
      />
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any } },
};

export default function ChaussezVousOuPasPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("FR");
  const [isExiting, setIsExiting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) setLanguage(savedLanguage);
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const t = translations[language] || translations["FR"];

  const handleBack = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(10);
    setIsExiting(true);
    setTimeout(() => { 
      setShowOverlay(true); 
      setTimeout(() => router.push("/projects"), 300); 
    }, 150);
  };

  const handleScroll = () => {
    const nextSection = document.getElementById('project-content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const images = [
    { src: "/projects/chaussez-vous-ou-pas/1.png", alt: "Chaussez-vous ou pas - 1" },
    { src: "/projects/chaussez-vous-ou-pas/2.png", alt: "Chaussez-vous ou pas - 2" },
    { src: "/projects/chaussez-vous-ou-pas/3.png", alt: "Chaussez-vous ou pas - 3" },
    { src: "/projects/chaussez-vous-ou-pas/4.png", alt: "Chaussez-vous ou pas - 4" },
    { src: "/projects/chaussez-vous-ou-pas/5.png", alt: "Chaussez-vous ou pas - 5" },
    { src: "/projects/chaussez-vous-ou-pas/6.png", alt: "Chaussez-vous ou pas - 6" },
    { src: "/projects/chaussez-vous-ou-pas/7.png", alt: "Chaussez-vous ou pas - 7" },
    { src: "/projects/chaussez-vous-ou-pas/8.png", alt: "Chaussez-vous ou pas - 8" },
    { src: "/projects/chaussez-vous-ou-pas/9.png", alt: "Chaussez-vous ou pas - 9" },
    { src: "/projects/chaussez-vous-ou-pas/10.png", alt: "Chaussez-vous ou pas - 10" },
    { src: "/projects/chaussez-vous-ou-pas/11.png", alt: "Chaussez-vous ou pas - 11" },
    { src: "/projects/chaussez-vous-ou-pas/12.png", alt: "Chaussez-vous ou pas - 12" },
    { src: "/projects/chaussez-vous-ou-pas/13.png", alt: "Chaussez-vous ou pas - 13" },
    { src: "/projects/chaussez-vous-ou-pas/14.png", alt: "Chaussez-vous ou pas - 14" }
  ];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#333333" }}>
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div key="content" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AnimatePresence>
              {showOverlay && <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ backgroundColor: "#EBEFF0" }} />}
            </AnimatePresence>

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
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-[#1d1d1f] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" className="transition-colors duration-300 group-hover:stroke-white">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              </motion.div>

              <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{
                    background: [
                      "linear-gradient(135deg, #333333 0%, #1d1d1f 50%, #333333 100%)",
                      "linear-gradient(135deg, #1d1d1f 0%, #333333 50%, #1d1d1f 100%)",
                      "linear-gradient(135deg, #333333 0%, #1d1d1f 50%, #333333 100%)",
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
                      <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/60 text-sm font-medium tracking-wider uppercase">
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
                        color: "rgba(255, 255, 255, 0.8)",
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

              <section id="project-content" className="min-h-screen py-24 px-6 md:px-12 bg-white flex flex-col items-center">
                <div className="max-w-4xl mx-auto text-center mb-16">
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <span className="inline-block px-4 py-2 bg-[#4A3728]/10 rounded-full text-[#4A3728] text-sm font-semibold tracking-wider uppercase mb-6">
                      {t.descriptionTitle}
                    </span>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(18px, 2vw, 24px)",
                      fontWeight: 400,
                      color: "#424245",
                      lineHeight: 1.7,
                      whiteSpace: "pre-line"
                    }}>
                      {t.description}
                    </p>
                  </motion.div>
                </div>

                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full">
                  {images.map((img, idx) => (
                    <motion.div key={idx} variants={fadeInUp}>
                      <MagnifierImage src={img.src} alt={img.alt} hint={t.zoomHint} clickHint={(t as any).clickHint} />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-20 mb-10 w-full flex flex-wrap justify-start md:justify-center items-center gap-4 px-6"
                >
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center gap-3 w-12 h-12 md:w-auto md:px-8 md:py-4 rounded-full bg-[#1d1d1f] text-white font-medium transition-all duration-300 hover:bg-[#2d2d2f] active:scale-[0.95] shadow-xl group"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform duration-300">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span className="hidden md:inline">{t.backButton}</span>
                  </button>

                  <a 
                    href="/projects/chaussez-vous-ou-pas/RUBENS_Romain_ChaussezVous_HQ.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-12 h-12 md:w-auto md:px-8 md:py-4 rounded-full bg-white border-2 border-[#333333] text-[#333333] font-medium transition-all duration-300 hover:bg-[#333333] hover:text-white active:scale-[0.95] shadow-xl group"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform duration-300">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    <span className="hidden md:inline">{(t as any).highQuality}</span>
                  </a>
                </motion.div>
              </section>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
