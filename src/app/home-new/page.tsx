"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    title: "Romain Rubens",
    subtitle: "UX/UI Designer",
    discover: "Découvrir",
    viewProjects: "Voir les projets",
    aboutMe: "À propos",
    description: "Créatif enthousiaste alliant design UX/UI, conception industrielle et pensée stratégique.",
    bio: "Romain Rubens est un designer UX/UI et étudiant en design industriel passionné par la création d'expériences numériques intuitives et de produits innovants. Avec une approche holistique du design, il combine esthétique, fonctionnalité et usabilité pour résoudre des problèmes réels.",
  },
  EN: {
    title: "Romain Rubens",
    subtitle: "UX/UI Designer",
    discover: "Discover",
    viewProjects: "View Projects",
    aboutMe: "About",
    description: "Creative enthusiast combining UX/UI design, industrial design, and strategic thinking.",
    bio: "Romain Rubens is a UX/UI designer and industrial design student passionate about creating intuitive digital experiences and innovative products. With a holistic design approach, he combines aesthetics, functionality, and usability to solve real problems.",
  },
  ՀԱՅ: {
    title: "Romain Rubens",
    subtitle: "UX/UI Designer",
    discover: "Հայտնաբերել",
    viewProjects: "Տեսնել նախագծերը",
    aboutMe: "Մասին",
    description: "Ստեղծական ընկերասեր, որը միավորում է UX/UI դիզայն, արդյունաբերական դիզայն և ռազմավարական մտածողություն:",
    bio: "Romain Rubens-ը UX/UI դիզայներ և արդյունաբերական դիզայնի ուսանող է, ով կրքի լեցուն է ստեղծել ինտուիտիվ թվային փորձեր և նորարար ապրանքներ: Ամբողջական դիզայն մոտեցմամբ, նա համատեղում է էսթետիկա, ֆունկցիոնալություն և օգտագործելիություն:",
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
            className="text-base md:text-lg lg:text-xl text-[#9C9C9C] font-light mb-8 md:mb-10"
          >
            {t.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base lg:text-lg text-[#D0D0D0] mb-16 md:mb-20 font-light leading-relaxed"
          >
            {t.description}
          </motion.p>
        </motion.div>

        {/* Bottom CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 md:px-6"
        >
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center">
            {/* Primary CTA - Découvrir */}
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex-1 sm:flex-initial px-8 md:px-10 py-3.5 md:py-4 bg-[#314DCB] text-white rounded-full font-semibold text-sm md:text-base transition-all hover:bg-[#4462E5] hover:shadow-lg"
            >
              {t.discover}
            </motion.button>

            {/* Secondary CTA - Voir les projets */}
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex-1 sm:flex-initial px-8 md:px-10 py-3.5 md:py-4 bg-[#2a2a2c] text-[#FFFFFF] rounded-full font-semibold text-sm md:text-base transition-all hover:bg-[#404043] text-center"
            >
              {t.viewProjects}
            </motion.a>
          </div>
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
            {t.aboutMe}
          </h2>

          <p className="text-base md:text-lg lg:text-lg text-[#6f6f6f] leading-relaxed md:leading-8 font-light mb-8 md:mb-10">
            {t.bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-12 border-t border-[#D0D0D0]">
            {[
              { label: "Années", value: "3+" },
              { label: "Projets", value: "15+" },
              { label: "Skills", value: "50+" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1d1d1f] mb-2">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-[#6f6f6f]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA to projects */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mt-12 md:mt-16"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-[#314DCB] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#4462E5] hover:shadow-lg transition-all"
            >
              {t.viewProjects}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
