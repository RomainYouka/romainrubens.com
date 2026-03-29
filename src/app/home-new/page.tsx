"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    discover: "Découvrir",
    viewProjects: "Voir les projets",
    aboutMe: "À propos",
    description: "Créatif enthousiaste alliant design UX/UI, conception industrielle et pensée stratégique.",
    bio: "Romain Rubens est un designer UX/UI et étudiant en design industriel passionné par la création d'expériences numériques intuitives et de produits innovants. Avec une approche holistique du design, il combine esthétique, fonctionnalité et usabilité pour résoudre des problèmes réels.",
  },
  EN: {
    discover: "Discover",
    viewProjects: "View Projects",
    aboutMe: "About",
    description: "Creative enthusiast combining UX/UI design, industrial design, and strategic thinking.",
    bio: "Romain Rubens is a UX/UI designer and industrial design student passionate about creating intuitive digital experiences and innovative products. With a holistic design approach, he combines aesthetics, functionality, and usability to solve real problems.",
  },
  ՀԱՅ: {
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
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  const handleScroll = () => {
    if (!showAbout && containerRef.current) {
      const heroHeight = window.innerHeight;
      if (containerRef.current.scrollTop > heroHeight * 0.3) {
        setShowAbout(true);
      }
    }
  };

  const scrollToAbout = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: window.innerHeight - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll bg-white snap-y snap-mandatory"
      onScroll={handleScroll}
    >
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
      <section className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 bg-white snap-start relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F5F5F5] opacity-40 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-3xl"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1d1d1f] leading-tight mb-6 md:mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Romain Rubens
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-[#6f6f6f] mb-10 md:mb-14 font-light leading-relaxed"
          >
            {t.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-8 md:px-10 py-3.5 md:py-4 bg-[#314DCB] text-white rounded-full font-semibold text-sm md:text-base transition-all hover:shadow-lg"
            >
              {t.discover}
            </motion.a>

            {/* Secondary CTA */}
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-8 md:px-10 py-3.5 md:py-4 bg-white border-2 border-[#1d1d1f] text-[#1d1d1f] rounded-full font-semibold text-sm md:text-base transition-all hover:bg-[#F5F5F5]"
            >
              {t.viewProjects}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <ChevronDown className="w-6 h-6 md:w-7 md:h-7 text-[#1d1d1f]/40" />
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={showAbout ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-b from-[#F5F5F5] to-white snap-start"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={showAbout ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-8 md:mb-10">
            {t.aboutMe}
          </h2>

          <p className="text-base md:text-lg lg:text-lg text-[#6f6f6f] leading-relaxed md:leading-8 font-light mb-8 md:mb-10">
            {t.bio}
          </p>

          {/* Stats or highlights can go here */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-12 border-t border-[#D0D0D0]">
            {[
              { label: "Années", value: "3+" },
              { label: "Projets", value: "15+" },
              { label: "Skills", value: "50+" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={showAbout ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
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
            animate={showAbout ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 md:mt-16"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-[#314DCB] text-white rounded-full font-semibold text-sm md:text-base hover:shadow-lg transition-all"
            >
              {t.discover}
              <ChevronDown className="w-4 h-4 md:w-5 md:h-5 rotate-[-90deg]" />
            </a>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
