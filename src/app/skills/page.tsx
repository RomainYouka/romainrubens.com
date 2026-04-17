"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

type Language = "FR" | "EN" | "ՀԱՅ";

interface Skill {
  id: string;
  names: { EN: string; FR?: string; ՀԱՅ?: string };
  rating: number;
}

interface Category {
  id: string;
  names: { FR: string; EN: string; ՀԱՅ: string };
  order: number;
  skills: Skill[];
}

interface SkillsData {
  lastUpdated: string;
  categories: Category[];
}

const uiTranslations = {
  FR: {
    title: "Compétences",
    subtitle: "Une vision transversale de mes savoir-faire en design, interaction et outils numériques.",
    designSystem: "Design System",
    ratingLabels: { 1: "Débutant", 2: "Bonne maîtrise", 4: "Maîtrise avancée", 5: "Maîtrise parfaite" },
    lastUpdatedPrefix: "Dernière mise à jour :",
    loading: "Chargement…",
  },
  EN: {
    title: "Skills",
    subtitle: "A cross-functional overview of my expertise in design, interaction, and digital tools.",
    designSystem: "Design System",
    ratingLabels: { 1: "Beginner", 2: "Good Mastery", 4: "Advanced Mastery", 5: "Complete Mastery" },
    lastUpdatedPrefix: "Last updated:",
    loading: "Loading…",
  },
  ՀԱՅ: {
    title: "Հմտություններ",
    subtitle: "Իմ փորձի ընդարձակ ակնարկ դիզայնի, փոխազդեցության և թվային գործիքների ոլորտում.",
    designSystem: "Design System",
    ratingLabels: { 1: "Սկսնակ", 2: "Լավ տիրապետում", 4: "Առաջադեմ տիրապետում", 5: "Կատարյալ տիրապետում" },
    lastUpdatedPrefix: "Վերջին թարմացում՝",
    loading: "Բեռնում…",
  },
};

const getSkillName = (names: Skill["names"], language: Language): string => {
  return names[language] || names.EN;
};

// Path de l'étoile, normalisé sur un viewBox 179.728 × 172.595
const STAR_PATH = "M168.126 124.883L167.147 124.601L108.471 107.718L114.781 168.913L114.888 169.955L113.843 170.014L78.3483 172.029L77.3309 172.087L77.2923 171.069L74.9662 109.539L15.081 135.382L14.1001 135.805L13.742 134.798L1.66023 100.746L1.3294 99.8115L2.26037 99.4725L63.2018 77.2499L21.4805 27.7533L20.836 26.9892L21.5992 26.3444L49.3062 2.95385L50.1177 2.26846L50.7529 3.12008L89.535 55.1644L122.883 1.7872L123.461 0.862422L124.332 1.51737L153.041 23.088L153.826 23.6785L153.25 24.4745L117.726 73.5158L176.898 88.2131L177.886 88.4588L168.126 124.883Z";
const VB_W = 179.728;
const VB_H = 172.595;

const StarRating = ({ rating, size = 18 }: { rating: number; size?: number }) => {
  const { isDark } = useTheme();
  const clamped = Math.min(5, Math.max(0, Math.round(rating)));

  const fullFill   = "var(--theme-accent)";
  const fullStroke = "var(--theme-accent)";
  const emptyFill  = isDark ? "#505050" : "#D0D0D0";
  const emptyStroke = isDark ? "#505050" : "#D0D0D0";

  const starH  = size;
  const starW  = starH * (VB_W / VB_H);
  const gap    = 2;
  const totalW = starW * 5 + gap * 4;
  const scale  = starH / VB_H;

  return (
    <svg
      width={totalW}
      height={starH}
      viewBox={`0 0 ${totalW} ${starH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const isFull = i <= clamped;
        const x = (i - 1) * (starW + gap);
        return (
          <path
            key={i}
            transform={`translate(${x}, 0) scale(${scale})`}
            d={STAR_PATH}
            style={{ fill: isFull ? fullFill : emptyFill, stroke: isFull ? fullStroke : emptyStroke }}
            strokeWidth={2}
          />
        );
      })}
    </svg>
  );
};

export default function SkillsPage() {
  const [language, setLanguage] = useState<Language>("FR");
  const [data, setData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language;
    if (saved && ["FR", "EN", "ՀԱՅ"].includes(saved)) setLanguage(saved);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
  }, []);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const t = uiTranslations[language] || uiTranslations.FR;
  const sortedCategories = data?.categories
    ? [...data.categories].sort((a, b) => {
        if (a.order === b.order) {
          const aComingSoon = a.skills.some((skill) => skill.id.includes("soon") || skill.id.includes("wip"));
          const bComingSoon = b.skills.some((skill) => skill.id.includes("soon") || skill.id.includes("wip"));
          if (aComingSoon !== bComingSoon) return aComingSoon ? 1 : -1;
        }
        return a.order - b.order;
      })
    : [];

  return (
    <main id="main-content" className="min-h-screen w-full" style={{ backgroundColor: "var(--theme-bg-alt)", fontFamily: "var(--font-body)" }}>
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">

        <div className="mb-16 md:mb-20">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              color: "var(--theme-fg)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 500ms cubic-bezier(0.25,0.1,0.25,1), transform 500ms cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            {t.title}
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--theme-muted)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 500ms cubic-bezier(0.25,0.1,0.25,1), transform 500ms cubic-bezier(0.25,0.1,0.25,1)",
              transitionDelay: "80ms",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        <div
          className="mb-16 md:mb-20 p-6 md:p-8 rounded-lg border"
          style={{
            backgroundColor: "var(--theme-card-bg)",
            borderColor: "var(--theme-card-border)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.97)",
            transition: "opacity 500ms cubic-bezier(0.25,0.1,0.25,1), transform 500ms cubic-bezier(0.25,0.1,0.25,1)",
            transitionDelay: "160ms",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {([1, 2, 4, 5] as const).map((rating) => (
              <div key={rating} className="flex flex-col items-center gap-3">
                <StarRating rating={rating} size={22} />
                <p className="text-sm md:text-base text-center font-medium" style={{ color: "var(--theme-fg)" }}>
                  {t.ratingLabels[rating]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-base" style={{ color: "var(--theme-muted)" }}>{t.loading}</p>
          </div>
        )}

        {!loading && sortedCategories.map((category, idx) => (
          <div key={category.id} className={idx < sortedCategories.length - 1 ? "mb-16 md:mb-20" : "mb-0"}>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "var(--theme-fg)" }}>
              {category.id === "design-system" && language === "FR"
                ? t.designSystem
                : category.names[language] || category.names.FR}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-4 rounded-lg border" style={{ backgroundColor: "var(--theme-card-bg)", borderColor: "var(--theme-card-border)" }}>
                  <span className="text-sm md:text-base font-medium" style={{ color: "var(--theme-fg)" }}>
                    {getSkillName(skill.names, language)}
                  </span>
                  <StarRating rating={skill.rating} size={18} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {!loading && data?.lastUpdated && (
          <div className="text-center mt-16">
            <p className="text-xs md:text-sm" style={{ color: "var(--theme-muted)" }}>
              {t.lastUpdatedPrefix} {data.lastUpdated}
            </p>
          </div>
        )}

      </section>
    </main>
  );
}
