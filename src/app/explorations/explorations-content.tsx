"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExplorationSkeleton } from "@/components/ui/skeleton";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    title: "Projets personnels et exploratoires",
    soon: "Bientôt disponible",
    returnDate: "Cette page est en travaux",
  },
  EN: {
    title: "Personal and exploratory projects",
    soon: "Coming soon",
    returnDate: "Work in progress",
  },
  ՀԱՅ: {
    title: "Անհատական և հետազոտական նախագծեր",
    soon: "Շուտով",
    returnDate: "Ընթացքում է",
  },
};

const explorationsData = [
  {
    id: 1,
    image: "/explorations/bouton-bloc-vibecoding.jpg",
    slug: "vibecoding",
    isComingSoon: true,
    title: "Vibecoding",
    year: "2025"
  },
  {
    id: 2,
    image: "/explorations/bouton-bloc-idorensburg.jpg",
    slug: "idorensburg",
    isComingSoon: true,
    title: "Idorensburg",
    year: "2024"
  },
  {
    id: 3,
    image: "/explorations/bouton-bloc-greenhouse.jpg",
    slug: "greenhouse",
    isComingSoon: true,
    title: "Green House",
    year: "2025"
  },
  {
    id: 4,
    image: "/explorations/bouton-bloc-cuizin.jpg",
    slug: "cuizin",
    isComingSoon: true,
    title: "CuizIN",
    year: "2026"
  }
];

const blueBannerTextDesktop = {
  FR: "Des projets personnels et exploratoires, menés en parallèle de mes études.",
  EN: "Personal and exploratory projects, conducted alongside my studies.",
  ՀԱՅ: "Անհատական և հետազոտական նախագծեր՝ իմ ուսումնասիրության հետ զուգահեռ։",
};

const blueBannerTextTablet = {
  FR: "Des projets personnels et exploratoires,\nmenés en parallèle de mes études.",
  EN: "Personal and exploratory projects,\nconducted alongside my studies.",
  ՀԱՅ: "Անհատական և հետազոտական նախագծեր՝\nիմ ուսումնասիրության հետ զուգահեռ։",
};

const blueBannerTextMobile = {
  FR: "Des projets personnels et exploratoires,\nmenés en parallèle de mes études.",
  EN: "Personal and exploratory projects,\nconducted alongside my studies.",
  ՀԱՅ: "Անհատական և հետազոտական նախագծեր՝\nիմ ուսումնասիրության հետ զուգահեռ։",
};

const BlueBanner = ({ language }: { language: Language }) => {
  return (
    <>
      <div className="hidden lg:block w-full bg-[#314DCB] rounded-[12px] flex items-center justify-center py-3">
        <p
          className="text-white text-center font-semibold text-base leading-snug px-6 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0px",
          }}
        >
          {blueBannerTextDesktop[language]}
        </p>
      </div>

      <div className="hidden md:flex lg:hidden w-full bg-[#314DCB] rounded-[12px] items-center justify-center py-2.5">
        <p
          className="text-white text-center font-semibold text-[11px] leading-snug px-3 whitespace-pre-line"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0px",
          }}
        >
          {blueBannerTextTablet[language]}
        </p>
      </div>

      <div className="md:hidden w-full bg-[#314DCB] rounded-[12px] flex items-center justify-center py-2.5">
        <p
          className="text-white text-center font-semibold text-[9px] leading-snug px-3 whitespace-pre-line"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0px",
          }}
        >
          {blueBannerTextMobile[language]}
        </p>
      </div>
    </>
  );
};

const triggerHapticFeedback = () => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(10);
  }
};

interface ProjectCardProps {
  image: string;
  slug: string;
  onNavigate: (slug: string, rect: DOMRect) => void;
  isComingSoon?: boolean;
  language: Language;
  buttonImage: string;
  isPriority?: boolean;
}

const ProjectCard = ({ image, slug, onNavigate, isComingSoon, language, buttonImage, isPriority }: ProjectCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const t = translations[language];

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    triggerHapticFeedback();
    if (isComingSoon) {
      setIsClicked(prev => !prev);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    onNavigate(slug, rect);
  }, [slug, onNavigate, isComingSoon]);

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full aspect-[2.16/1] overflow-hidden rounded-[12px] border border-[#3F3F3F] cursor-pointer block"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: isComingSoon
          ? "0 10px 40px rgba(0,0,0,0.4)" 
          : "0 10px 40px rgba(0,0,0,0.15)" 
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Image
        src={image}
        alt={slug}
        fill
        className="object-cover"
        priority={isPriority}
        fetchPriority={isPriority ? "high" : "auto"}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
      />
      <div className="flex items-end justify-between p-0 h-full pl-[26px] pr-[13px] pb-[13px] relative z-10">
        <span className="font-light text-transparent text-[9px] tracking-[0] leading-[normal] select-none">
        </span>
        <div className="w-8 h-8 md:w-10 md:h-10 p-0 pointer-events-none flex-shrink-0">
          <img
            alt="Bouton retour"
            src={buttonImage}
            className="w-full h-full object-contain"
            style={{ imageRendering: "auto" }}
          />
        </div>
      </div>
      {isComingSoon && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 z-20">
          <span className="text-white font-bold text-center text-sm md:text-xl lg:text-2xl drop-shadow-lg">
            {isClicked ? t.returnDate : t.soon}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default function ExplorationsPageContent() {
  const [language, setLanguage] = useState<Language>("FR");
  const [isHydrated, setIsHydrated] = useState(false);
  const [expandingCard, setExpandingCard] = useState<{
    slug: string;
    rect: DOMRect;
    image: string;
  } | null>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    setIsHydrated(true);

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const handleNavigate = useCallback((slug: string, rect: DOMRect) => {
    const project = explorationsData.find(p => p.slug === slug);
    if (project && !project.isComingSoon) {
      setExpandingCard({ slug, rect, image: project.image });
    }
  }, []);

  const t = translations[language];
  const BUTTON_IMAGE = "/bouton-aller-sombre.png";

  return (
    <div className="bg-[#121212] min-h-screen selection:bg-blue-500/30">
      <AnimatePresence>
        {expandingCard && (
          <motion.div
            className="fixed z-[1100]"
            initial={{
              top: expandingCard.rect.top,
              left: expandingCard.rect.left,
              width: expandingCard.rect.width,
              height: expandingCard.rect.height,
              borderRadius: 14.44,
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
            }}
            transition={{
              duration: 0.25,
              ease: [0.32, 0.72, 0, 1],
            }}
            style={{
              backgroundColor: "#121212",
            }}
          />
        )}
      </AnimatePresence>

      <div className="w-full flex justify-center py-5 md:mt-[20px] md:mb-[20px]">
        <div className="flex w-full max-w-[1234px] h-auto px-4 md:px-8 lg:px-12 xl:px-4 mt-16 md:mt-[40px] relative flex-col items-center gap-6 md:gap-[50px]">
          
          {!isHydrated ? (
            <ExplorationSkeleton />
          ) : (
            <>
              <BlueBanner language={language} />

              <div className="w-full">
                <div className="bg-[#272727] border border-[#3F3F3F] h-10 lg:h-12 rounded-[20px] flex items-center justify-center w-full">
                  <span className="font-semibold text-[9px] sm:text-[11px] lg:text-[calc(10px+0.8vw)] leading-tight text-center text-[#FFFFFF]">
                    {t.title}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] w-full">
                {explorationsData.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    image={project.image}
                    slug={project.slug}
                    onNavigate={handleNavigate}
                    isComingSoon={project.isComingSoon}
                    language={language}
                    buttonImage={BUTTON_IMAGE}
                    isPriority={index < 2}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
