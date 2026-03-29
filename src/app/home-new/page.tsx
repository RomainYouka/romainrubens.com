"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    title: "Romain Rubens",
    subtitle: "UX/UI Designer · Smart home",
    approach: "Mon approche",
    bio: "Je suis étudiant en design industriel avec une pratique centrée sur l'UX/UI et le design d'interaction. Mon travail porte sur la manière dont les interfaces s'organisent dans des usages réels, des contraintes concrètes et des systèmes du quotidien. Je porte un intérêt particulier aux environnements connectés dans l'espace domestique, tout en développant une approche applicable à des contextes numériques plus larges.",
  },
  EN: {
    title: "Romain Rubens",
    subtitle: "UX/UI Designer · Smart home",
    approach: "My approach",
    bio: "I am a student in industrial design with a practice centered on UX/UI and interaction design. My work focuses on how interfaces organize themselves in real uses, concrete constraints, and everyday systems. I take a particular interest in connected environments in the home space, while developing an approach applicable to broader digital contexts.",
  },
  ՀԱՅ: {
    title: "Romain Rubens",
    subtitle: "UX/UI Designer · Smart home",
    approach: "Իմ մոտեցումը",
    bio: "Ես արդյունաբերական դիզայնի ուսանող եմ, որի պրակտիկան կենտրոնացած է UX/UI-ի և փոխազդեցության դիզայնի վրա: Իմ աշխատանքը կենտրոնանում է այն բանի վրա, թե ինչպես ինտերֆեյսները կազմակերպվում են իրական օգտագործման, կոնկրետ սահմանափակումների և առօրյա համակարգերի մեջ: Ես հատուկ հետաքրքրություն ունեմ տնային տարածքում միացված միջավայրերի նկատմամբ, միաժամանակ մշակելով լայն թվային համատեքստերում կիրառելի մոտեցում:",
  },
};

export default function HomeNewPage() {
  const [language, setLanguage] = useState<Language>("FR");
  const [showAbout, setShowAbout] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
        setShowAbout(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
      setShowAbout(true);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Language Selector */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 border border-[#D0D0D0]">
        {(["FR", "EN", "ՀԱՅ"] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => {
              setLanguage(lang);
              localStorage.setItem("language", lang);
            }}
            className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
              language === lang
                ? "bg-[#1d1d1f] text-white"
                : "text-[#1d1d1f] hover:bg-[#F5F5F5]"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 bg-[#1d1d1f] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl relative z-10"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-2 md:mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-base md:text-lg lg:text-xl text-[#9C9C9C] font-light"
          >
            {t.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-16 md:py-20 bg-[#F5F5F5]"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-8 md:mb-10">
            {t.approach}
          </h2>

          <p className="text-base md:text-lg lg:text-lg text-[#6f6f6f] leading-relaxed md:leading-8 font-light">
            {t.bio}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
