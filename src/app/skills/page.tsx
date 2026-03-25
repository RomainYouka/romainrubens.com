"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
    ratingLabels: { 1: "Débutant", 2: "Bonne maîtrise", 4: "Maîtrise avancée", 5: "Maîtrise parfaite" },
    lastUpdatedPrefix: "Dernière mise à jour :",
    loading: "Chargement…",
  },
  EN: {
    title: "Skills",
    subtitle: "A cross-functional overview of my expertise in design, interaction, and digital tools.",
    ratingLabels: { 1: "Beginner", 2: "Good Mastery", 4: "Advanced Mastery", 5: "Complete Mastery" },
    lastUpdatedPrefix: "Last updated:",
    loading: "Loading…",
  },
  ՀԱՅ: {
    title: "Հմտություններ",
    subtitle: "Իմ փորձի ընդարձակ ակնարկ դիզայնի, փոխազդեցության և թվային գործիքների ոլորտում.",
    ratingLabels: { 1: "Սկսնակ", 2: "Լավ տիրապետում", 4: "Առաջադեմ տիրապետում", 5: "Կատարյալ տիրապետում" },
    lastUpdatedPrefix: "Վերջին թարմացում՝",
    loading: "Բեռնում…",
  },
};

const getSkillName = (names: Skill["names"], language: Language): string => {
  return names[language] || names.EN;
};

const StarRating = ({ rating }: { rating: number }) => {
  const clamped = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="relative w-20 h-5 flex-shrink-0">
      <Image
        src={`/skills/stars-${clamped}.png`}
        alt={`${clamped} out of 5 stars`}
        fill
        sizes="80px"
        className="object-contain"
      />
    </div>
  );
};

export default function SkillsPage() {
  const [language, setLanguage] = useState<Language>("FR");
  const [data, setData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);

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

  const t = uiTranslations[language] || uiTranslations.FR;
  const sortedCategories = data?.categories
    ? [...data.categories].sort((a, b) => a.order - b.order)
    : [];

  return (
    <main className="min-h-screen bg-[#F5F5F5] w-full" style={{ fontFamily: "var(--font-body)" }}>
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">

        <div className="mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] mb-4">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-[#666666] leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        <div className="mb-16 md:mb-20 p-6 md:p-8 bg-white border border-[#E5E5E5] rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {([1, 2, 4, 5] as const).map((rating) => (
              <div key={rating} className="flex flex-col items-center gap-3">
                <div className="relative w-24 h-6">
                  <Image
                    src={`/skills/stars-${rating}.png`}
                    alt={`${rating} stars`}
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
                <p className="text-sm md:text-base text-center font-medium text-[#1d1d1f]">
                  {t.ratingLabels[rating]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-[#999999] text-base">{t.loading}</p>
          </div>
        )}

        {!loading && sortedCategories.map((category, idx) => (
          <div key={category.id} className={idx < sortedCategories.length - 1 ? "mb-16 md:mb-20" : "mb-0"}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mb-8">
              {category.names[language] || category.names.FR}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-4 rounded-lg bg-white border border-[#E5E5E5]">
                  <span className="text-sm md:text-base font-medium text-[#1d1d1f]">
                    {getSkillName(skill.names, language)}
                  </span>
                  <StarRating rating={skill.rating} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {!loading && data?.lastUpdated && (
          <div className="text-center mt-16">
            <p className="text-xs md:text-sm text-[#999999]">
              {t.lastUpdatedPrefix} {data.lastUpdated}
            </p>
          </div>
        )}

      </section>
    </main>
  );
}
