"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowLeft } from "lucide-react";
import Image from "next/image";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    projectTitle: "Framaspace",
    role: "2024",
    tagline: "Refonte visuelle axée sur l'essentiel.",
    scroll: "Découvrir le projet",
    backButton: "Retour aux projets",
    descriptionTitle: "À propos du projet",
    description: "Collaboration : Thalia Mehio\n\nFramaspace est un service open source de collaboration et de stockage en ligne. Nous avons revu l'esthétique de cet interface afin de le rendre plus interatif et plus compréhensible par ses utilisateurs. L'objectif était de moderniser l'interface tout en respectant l'esthétique libre du projet. Un travail a été mené sur la typographie, la palette de couleurs, la lisibilité, et la cohérence visuelle.\n\nNous avons élaboré une narration visuelle sobre mais marquante, où chaque phrase d'accroche guide l'utilisateur avec complicité. L'esthétique vient soutenir l'usage, dans une interface pensée pour être à la fois lisible, cohérente et engageante.",
    webInterface: "Interface web",
    colorCustomization: "Personnalisation colorée",
    navigationBars: "Barres de navigation",
    beforeLabel: "Avant",
    afterLabel: "Après"
  },
  EN: {
    projectTitle: "Framaspace",
    role: "2024",
    tagline: "Visual Redesign Focused on Essentials.",
    scroll: "Discover the project",
    backButton: "Back to projects",
    descriptionTitle: "About the project",
    description: "Collaboration: Thalia Mehio\n\nFramaspace is an open-source platform for online collaboration and file storage. We redesigned its visual identity to make the interface more interactive and easier for users to understand. The goal was to modernize the experience while staying true to the project's open-source values.\n\nWe worked on typography, color palette, readability and overall visual consistency. We developed a visual narrative that is simple yet striking, where every headline guides the user with clarity and intention. The aesthetic supports the functionality, resulting in an interface designed to be readable, coherent and engaging.",
    webInterface: "Web interface",
    colorCustomization: "Color Customization",
    navigationBars: "Navigation Bars",
    beforeLabel: "Before",
    afterLabel: "After"
  },
  "ՀԱՅ": {
    projectTitle: "Framaspace",
    role: "2024",
    tagline: "Տեսողական վերափոխում՝ կենտրոնացած էականի վրա:",
    scroll: "Բացահայտել նախագիծը",
    backButton: "Վերադառնալ նախագծերին",
    descriptionTitle: "Նախագծի մասին",
    description: "Համագործակցություն՝ Thalia Mehio\n\nFramaspace-ը բաց կոդով համագործակցության և առցանց պահպանման ծառայություն է: Մենք վերանայել ենք այս միջերեսի գեղագիտությունը՝ այն օգտատերերի համար ավելի ինտերակտիվ և հասկանալի դարձնելու համար: Նպատակն էր արդիականացնել միջերեսը՝ միաժամանակ հարգելով նախագծի ազատ գեղագիտությունը: Աշխատանք է տարվել տպագրության, գունապնակի, ընթեռնելիության և տեսողական հետևողականության վրա:\n\nՄենք մշակել ենք զուսպ, բայց տպավորիչ տեսողական պատմություն, որտեղ յուրաքանչյուր որսացող արտահայտություն ուղղորդում է օգտատիրոջը: Գեղագիտությունը գալիս է աջակցելու օգտագործմանը՝ միջերեսում, որը նախագծված է լինելու միաժամանակ ընթեռնելի, հետևողական և գրավիչ:",
    webInterface: "Վեբ միջերես",
    colorCustomization: "Գունավոր անհատականացում",
    navigationBars: "Նավարկման սանդղակներ",
    beforeLabel: "Առաջ",
    afterLabel: "Հետո"
  }
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

function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel, afterLabel }: { beforeImage: string; afterImage: string; beforeLabel: string; afterLabel: string }) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsInView(true);
          setHasStarted(true);
          setTimeout(() => setSliderPosition(80), 300);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !hasStarted) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-[16/10] overflow-hidden select-none rounded-xl shadow-2xl" style={{ cursor: hasStarted ? (isDragging ? 'grabbing' : 'col-resize') : 'default' }} onMouseDown={() => hasStarted && setIsDragging(true)} onMouseUp={() => setIsDragging(false)} onMouseLeave={() => setIsDragging(false)} onMouseMove={(e) => isDragging && handleMove(e.clientX)} onTouchStart={() => hasStarted && setIsDragging(true)} onTouchEnd={() => setIsDragging(false)} onTouchMove={(e) => isDragging && e.touches[0] && handleMove(e.touches[0].clientX)}>
      <div className="absolute inset-0">
        <Image src={afterImage} alt={afterLabel} fill className="object-cover object-top pointer-events-none bg-[#f9f9f9]" unoptimized />
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, transition: 'clip-path 1200ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <Image src={beforeImage} alt={beforeLabel} fill className="object-cover object-top pointer-events-none bg-[#f9f9f9]" unoptimized />
      </div>
      <div className="absolute top-0 bottom-0 w-1 bg-[#FF6B6B] shadow-lg" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)', transition: 'left 1200ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#FF6B6B]/10 backdrop-blur-md rounded-full border-2 border-[#FF6B6B] shadow-xl flex items-center justify-center">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="3" className="w-5 h-5"><polyline points="9 17 4 12 9 7" /><polyline points="15 7 20 12 15 17" /></svg>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium">{beforeLabel}</div>
      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium">{afterLabel}</div>
    </div>
  );
}

function ToolbarSection({ title }: { title: string }) {
  return (
    <div className="w-full flex flex-col items-center pt-8 pb-24 bg-white overflow-hidden">
      <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] text-sm font-semibold tracking-wider uppercase mb-12">{title}</span>
      <div className="w-full px-0">
        <img 
          src="/projects/framaspace/full-toolbar.png" 
          alt="Navigation Bars" 
          className="w-full h-auto block"
          width="1920"
          height="1200"
        />
      </div>
    </div>
  );
}

export default function FramasoftPage() {
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

  return (
    <main id="main-content" className="w-full min-h-screen bg-[#6e3667]">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div key="content" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AnimatePresence>
              {showOverlay && <motion.div className="fixed inset-0 z-50 bg-[#EBEFF0]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />}
            </AnimatePresence>

            <motion.div className="w-full" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <motion.div variants={fadeInUp} className="absolute top-24 left-6 md:top-32 md:left-8 z-[100]">
                <button onClick={handleBack} className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-[#6e3667] active:scale-[0.95] transition-all duration-300 hover:-translate-x-1 group shadow-lg">
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6e3667" strokeWidth="2" className="transition-colors duration-300 group-hover:stroke-white"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
              </motion.div>

              <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{ 
                    background: [
                      "linear-gradient(135deg, #6e3667 0%, #4a2445 50%, #6e3667 100%)", 
                      "linear-gradient(135deg, #4a2445 0%, #6e3667 50%, #4a2445 100%)", 
                      "linear-gradient(135deg, #6e3667 0%, #4a2445 50%, #6e3667 100%)"
                    ] 
                  }} 
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
                  className="absolute inset-0" 
                />
                
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center pt-20">
                  <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <motion.div variants={fadeInUp} className="mb-6">
                      <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium tracking-wider uppercase">{t.role}</span>
                    </motion.div>
                    <motion.h1 variants={fadeInUp} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 600, color: "white", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: "900px" }}>{t.projectTitle}</motion.h1>
                    <motion.p variants={fadeInUp} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 300, color: "rgba(255, 255, 255, 0.9)", marginTop: "24px", letterSpacing: "-0.01em", maxWidth: "700px" }}>{t.tagline}</motion.p>
                  </div>
                </div>

                <motion.button variants={fadeInUp} onClick={handleScroll} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 z-20" style={{ background: "none", border: "none", padding: "16px" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: "rgba(255, 255, 255, 0.8)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.scroll}</span>
                  <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "rgba(255, 255, 255, 0.8)" }} />
                </motion.button>
              </section>

              <section id="project-content" className="py-24 px-6 md:px-12 bg-white flex flex-col items-center">
                <div className="max-w-4xl mx-auto text-center mb-24">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                    <span className="inline-block px-4 py-2 bg-[#0A84FF]/10 rounded-full text-[#0A84FF] text-sm font-semibold tracking-wider uppercase mb-6">{t.descriptionTitle}</span>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, color: "#424245", lineHeight: 1.7, whiteSpace: "pre-line" }}>{t.description}</p>
                  </motion.div>
                </div>

                <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-24 mb-12">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-col items-center">
                    <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] text-sm font-semibold tracking-wider uppercase mb-12">{t.webInterface}</span>
                    
                    <div className="flex flex-col gap-16 w-full">
                      <div className="w-full">
                        <BeforeAfterSlider 
                          beforeImage="/projects/framaspace/files-before.png" 
                          afterImage="/projects/framaspace/files-after.png" 
                          beforeLabel={t.beforeLabel} 
                          afterLabel={t.afterLabel} 
                        />
                      </div>
                      
                      <div className="w-full">
                        <BeforeAfterSlider 
                          beforeImage="/projects/framaspace/calendar-before.png" 
                          afterImage="/projects/framaspace/calendar-after.png" 
                          beforeLabel={t.beforeLabel} 
                          afterLabel={t.afterLabel} 
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full flex flex-col items-center">
                    <span className="inline-block px-4 py-2 bg-[#FF6B6B]/10 rounded-full text-[#FF6B6B] text-sm font-semibold tracking-wider uppercase mb-12">{t.colorCustomization}</span>
                    <div className="w-full overflow-hidden rounded-xl">
                      <img 
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/rnybtevfdcz-1762190003461.png?width=8000&height=8000&resize=contain" 
                        alt="Color Customization" 
                        className="w-full h-auto block" 
                      />
                    </div>
                  </motion.div>
                </div>
              </section>

              <section className="bg-white">
                <ToolbarSection title={t.navigationBars} />
              </section>

              <section className="py-24 bg-white">
                <div className="w-full px-6 flex justify-start md:justify-center">
                  <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex flex-col items-start md:items-center">
                    <div className="hidden md:block">
                      <button onClick={handleBack} className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#6e3667] text-white font-bold text-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group">
                        <ArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
                        {t.backButton}
                      </button>
                    </div>
                    <div className="md:hidden">
                      <button onClick={handleBack} className="flex items-center justify-center w-12 h-12 rounded-full bg-[#6e3667] text-white active:scale-95 transition-all shadow-md">
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
