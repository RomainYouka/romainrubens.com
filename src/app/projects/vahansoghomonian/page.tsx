"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, ZoomIn } from "lucide-react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    projectTitle: "Vahan Soghomonian",
    role: "2024",
    tagline: "Un voyage à travers l'art et la culture arménienne.",
    scroll: "Découvrir l'article",
    backButton: "Retour aux projets",
    zoomHint: "Survolez pour zoomer",
    clickHint: "Cliquez pour zoomer",
    highQuality: "Meilleure qualité (PDF)",
    descriptionTitle: "À propos du projet",
    description: "Interview réalisée par : Matis Sophiyair-Landais & Romain Rubens\nConception Graphique : Romain Rubens\n\nLa réalisation de cet article sur Vahan Soghomonian, un artiste aux pratiques multiples mêle poésie, musique, photographie et installation. Son univers navigue entre héritage arménien, des récits personnels et expérimentations sensibles. Le projet met en lumière une œuvre profondément ancrée dans le réel et l'imaginaire, entre mémoire et création contemporaine.\n\nCette publication repose sur une interview menée avec l'artiste, enrichie par des archives, des photographies documentaires et une mise en page bilingue français-arménien. Le travail éditorial interroge la transmission artistique à travers un format hybride, entre récit et analyse visuelle.\n\nL'usage de l'arménien constitue à la fois un hommage à l'héritage de l'artiste et un geste personnel, traduisant un lien culturel partagé et un dialogue entre mémoire et création."
  },
  EN: {
    projectTitle: "Vahan Soghomonian",
    role: "2024",
    tagline: "A journey through Armenian art and culture.",
    scroll: "Read the article",
    backButton: "Back to projects",
    zoomHint: "Hover to zoom",
    clickHint: "Click to zoom",
    highQuality: "Higher quality (PDF)",
    descriptionTitle: "About the project",
    description: "Interview conducted by: Matis Sophiyair-Landais & Romain Rubens\nGraphic Design: Romain Rubens\n\nThis article about Vahan Soghomonian, an artist whose practice spans poetry, music, photography and installation, explores a universe shaped by Armenian heritage, personal narratives and sensitive experimentation. His work moves between reality and imagination, grounding contemporary creation in memory and lived experience.\n\nThe publication is built around an interview conducted with the artist, enriched with archives, documentary photographs and a bilingual French-Armenian layout. The editorial approach examines artistic transmission through a hybrid format that combines storytelling and visual analysis.\n\nThe use of Armenian is both a tribute to the artist's heritage and a personal gesture, reflecting a shared cultural connection and a dialogue between memory and creation."
  },
  "ՀԱՅ": {
    projectTitle: "Վահան Սողոմոնյան",
    role: "2024",
    tagline: "Ճանապարհորդություն հայկական արվեստի և մշակույթի միջոցով:",
    scroll: "Կարդալ հոդվածը",
    backButton: "Վերադառնալ նախագծերին",
    zoomHint: "Անցեք մկնիկը՝ խոշորացնելու համար",
    clickHint: "Սեղմեք խոշորացնելու համար",
    highQuality: "Բարձր որակ (PDF)",
    descriptionTitle: "Նախագծի մասին",
    description: "Հարցազրույց անցկացրել են՝ Matis Sophiyair-Landais & Romain Rubens\nԳրաֆիկական Դիզայն՝ Romain Rubens\n\nԱյս հոդվածը վերաբերում է Վահան Սողոմոնյանին՝ արվեստագետ, որի գործունեությունը ընդգրկում է բանաստեղծություն, երաժշտություն, լուսանկար և ինստալյացիա։ Հոդվածը բացահայտում է մի աշխարհ, որը ձևավորվում է հայկական ժառանգության, անձնական պատմությունների և զգայական փորձարկումների միջոցով։ Նրա ստեղծագործությունը շարժվում է իրականության և երևակայության միջև՝ ժամանակակից արվեստը հիմնավորելով հիշողության և ապրած փորձի վրա։\n\nՀրապարակումը կառուցված է արվեստագետի հետ անցկացված հարցազրույցի շուրջ՝ հարստացված արխիվային նյութերով, փաստավավերագրական լուսանկարներով և ֆրանսերեն–հայերեն երկլեզու ձևաորությամբ։ Խմբագրական մոտեցումը ուսումնասիրում է արվեստի փոխանցման գործընթացը՝ օգտագործելով հիբրիդային ձևաչափ, որը միավորում է պատմողական շերտերը և տեսողական վերլուծությունը։\n\nՀայերենի կիրառումը միաժամանակ հարգանքի տուրք է արվեստագետի ժառանգությանը և անձնական ժեստ՝ արտահայտող ընդհանուր մշակութային կապը և հիշողության ու ստեղծագործության միջև ձևավորվող երկխոսությունը։"
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
      <div className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-700 ${!isLoaded ? 'bg-[#3A2B1F]/20 animate-pulse' : ''}`}>
        <img
          src={src}
          className={`w-full h-auto display-block transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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

export default function VahanSoghomonianPage() {
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
    setTimeout(() => { setShowOverlay(true); setTimeout(() => router.push("/projects"), 300); }, 150);
  };

  const handleScroll = () => {
    document.getElementById('project-content')?.scrollIntoView({ behavior: "smooth" });
  };

  const images = [
    { src: "/projects/vahan/R1.webp", alt: "Arvest Magazine Cover" },
    { src: "/projects/vahan/R2.webp", alt: "Biography" },
    { src: "/projects/vahan/R3.webp", alt: "Current Projects" },
    { src: "/projects/vahan/R4.webp", alt: "Photography Projects" },
    { src: "/projects/vahan/R5.webp", alt: "Design and Inspiration" },
    { src: "/projects/vahan/R6.webp", alt: "Credits and Final Thoughts" }
  ];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#4A3728" }}>
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full">
            <AnimatePresence>
              {showOverlay && <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ backgroundColor: "#EBEFF0" }} />}
            </AnimatePresence>

            <motion.div className="w-full" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <motion.div variants={fadeInUp} className="absolute top-24 left-6 md:top-32 md:left-8 z-[100]">
                <button onClick={handleBack} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-[#6D5340] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A3728" strokeWidth="2" className="transition-colors duration-300 group-hover:stroke-white"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
              </motion.div>

              <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div animate={{ background: ["linear-gradient(135deg, #4A3728 0%, #3A2B1F 50%, #4A3728 100%)", "linear-gradient(135deg, #3A2B1F 0%, #4A3728 50%, #3A2B1F 100%)", "linear-gradient(135deg, #4A3728 0%, #3A2B1F 50%, #4A3728 100%)"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0" />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center h-full pt-20">
                  <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <motion.div variants={fadeInUp} className="mb-6"><span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/60 text-sm font-medium tracking-wider uppercase">{t.role}</span></motion.div>
                    <motion.h1 variants={fadeInUp} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 600, color: "white", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: "900px" }}>{t.projectTitle}</motion.h1>
                    <motion.p variants={fadeInUp} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 300, color: "rgba(255, 255, 255, 0.8)", marginTop: "24px", letterSpacing: "-0.01em", maxWidth: "700px" }}>{t.tagline}</motion.p>
                  </div>
                </div>
                <motion.button variants={fadeInUp} onClick={handleScroll} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 z-20" style={{ background: "none", border: "none", padding: "16px" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: "rgba(255, 255, 255, 0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.scroll}</span>
                  <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </motion.button>
              </section>

              <section id="project-content" className="min-h-screen py-24 px-6 md:px-12 bg-white flex flex-col items-center">
                <div className="max-w-4xl mx-auto text-center mb-16">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                    <span className="inline-block px-4 py-2 bg-[#4A3728]/10 rounded-full text-[#4A3728] text-sm font-semibold tracking-wider uppercase mb-6">{t.descriptionTitle}</span>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, color: "#424245", lineHeight: 1.7, whiteSpace: "pre-line" }}>{t.description}</p>
                  </motion.div>
                </div>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full">
                  {images.map((img, idx) => (
                    <motion.div key={idx} variants={fadeInUp}><MagnifierImage src={img.src} alt={img.alt} hint={t.zoomHint} clickHint={(t as any).clickHint} /></motion.div>
                  ))}
                </motion.div>
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-20 mb-10 w-full flex flex-wrap justify-start md:justify-center items-center gap-4 px-6">
                  <button onClick={handleBack} className="flex items-center justify-center gap-3 w-12 h-12 md:w-auto md:px-8 md:py-4 rounded-full bg-[#4A3728] text-white font-medium transition-all duration-300 hover:bg-[#5A4535] active:scale-[0.95] shadow-xl group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform duration-300"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    <span className="hidden md:inline">{t.backButton}</span>
                  </button>

                  <a 
                    href="/projects/vahan/RUBENS_Romain_Vahan_HQ.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-12 h-12 md:w-auto md:px-8 md:py-4 rounded-full bg-white border-2 border-[#4A3728] text-[#4A3728] font-medium transition-all duration-300 hover:bg-[#4A3728] hover:text-white active:scale-[0.95] shadow-xl group"
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
