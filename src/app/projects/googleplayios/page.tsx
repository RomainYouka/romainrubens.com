"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { HorizontalScrollSection } from "@/components/projects/horizontal-scroll-section";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    projectTitle: "Google Play & iOS",
    role: "2025",
    tagline: "Refonte des stratégies de lancement multi-plateforme.",
    backButton: "Retour au Portfolio",
    scrollDown: "Découvrir",
    aboutTitle: "À propos du projet",
    aboutText: "Un projet stratégique visant à optimiser l'expérience utilisateur sur les stores Google Play et Apple App Store. Exploration des paradigmes de conception spécifiques à chaque plateforme et harmonisation de l'interface tout en respectant les guidelines natives.",
    approachTitle: "Approche de conception",
    approachText: "Analyse comparative des recommandations HIG (Human Interface Guidelines) d'Apple et des Material Design Guidelines de Google, avec création de composants adaptatifs qui respectent les conventions de chaque écosystème.",
    featuresTitle: "Stratégies clés",
    strategyGridTitle: "Éléments de design",
    strategyGridDescription: "Décourez les composants et stratégies adaptés à chaque plateforme.",
  },
  EN: {
    projectTitle: "Google Play & iOS",
    role: "2025",
    tagline: "Redesign of multi-platform launch strategies.",
    backButton: "Back to Portfolio",
    scrollDown: "Discover",
    aboutTitle: "About the project",
    aboutText: "A strategic project aimed at optimizing user experience on Google Play and Apple App Store. Exploration of design paradigms specific to each platform and harmonization of the interface while respecting native guidelines.",
    approachTitle: "Design approach",
    approachText: "Comparative analysis of Apple's HIG (Human Interface Guidelines) and Google's Material Design Guidelines, with creation of adaptive components that respect each ecosystem's conventions.",
    featuresTitle: "Key strategies",
    strategyGridTitle: "Design elements",
    strategyGridDescription: "Discover components and strategies tailored for each platform.",
  },
  ՀԱՅ: {
    projectTitle: "Google Play & iOS",
    role: "2025",
    tagline: "Բազմապլատֆորմային գործարկման ռազմավարության վերամշակում:",
    backButton: "Վերադառնալ պորտֆոլիոյի",
    scrollDown: "Բացահայտել",
    aboutTitle: "Նախագծի մասին",
    aboutText: "Ռազմավարական նախագիծ՝ Google Play-ի և Apple App Store-ի օգտատիրի փորձը օպտիմալացնելու համար: Յուրաքանչյուր պլատֆորմի համար հատուկ դիզայն ձեւավորման ուսումնասիրություն և ինտերֆեյսի ներդաշնակացում հաշվի առնելով ծանուցումներից:",
    approachTitle: "Դիզայն մեկնոցություն",
    approachText: "Apple-ի HIG (Human Interface Guidelines) և Google-ի Material Design Guidelines-ի համեմատական վերլուծություն՝ հարմարական բաղադրիչների ստեղծմամբ, որոնք հարգում են յուրաքանչյուր էկոհամակարգի կոնվենցիաները:",
    featuresTitle: "Հիմնական ռազմավարություն",
    strategyGridTitle: "Դիզայն տարրեր",
    strategyGridDescription: "Բացահայտեք յուրաքանչյուր պլատֆորմի համար հարմարեցված բաղադրիչներ և ռազմավարություն:",
  },
};

const StrategyCard = ({ 
  icon, 
  title, 
  description, 
  isIOS 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  isIOS: boolean;
}) => (
  <motion.div
    className={`flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300 ${
      isIOS
        ? "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-black"
        : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:border-black"
    }`}
    whileHover={{ y: -4 }}
  >
    <div className="text-3xl">{icon}</div>
    <div>
      <h3 className="font-semibold text-[#1d1d1f] mb-2">{title}</h3>
      <p className="text-sm text-[#666666]">{description}</p>
    </div>
    <div className={`mt-auto text-xs font-medium ${isIOS ? "text-gray-500" : "text-blue-600"}`}>
      {isIOS ? "iOS" : "Android"}
    </div>
  </motion.div>
);

export default function GooglePlayiOSPage() {
  const [language, setLanguage] = useState<Language>("FR");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language;
    if (saved && ["FR", "EN", "ՀԱՅ"].includes(saved)) setLanguage(saved);

    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
  }, []);

  const t = translations[language] || translations.FR;

  const strategyItems = [
    {
      id: "ios-design",
      content: (
        <StrategyCard
          icon="🎨"
          title={language === "FR" ? "Design iOS" : language === "EN" ? "iOS Design" : "iOS Դիզայն"}
          description={language === "FR" ? "Respekt des guidelines Apple HIG" : language === "EN" ? "Respect of Apple HIG guidelines" : "Apple HIG առաջարկությունների պահպանում"}
          isIOS={true}
        />
      ),
    },
    {
      id: "android-design",
      content: (
        <StrategyCard
          icon="🤖"
          title={language === "FR" ? "Design Android" : language === "EN" ? "Android Design" : "Android Դիզայն"}
          description={language === "FR" ? "Material Design 3 adaptation" : language === "EN" ? "Material Design 3 adaptation" : "Material Design 3 հարմարացում"}
          isIOS={false}
        />
      ),
    },
    {
      id: "navigation",
      content: (
        <StrategyCard
          icon="🧭"
          title={language === "FR" ? "Navigation" : language === "EN" ? "Navigation" : "Նավիգացիա"}
          description={language === "FR" ? "Patterns spécifiques à chaque OS" : language === "EN" ? "OS-specific patterns" : "ՕՀ-հատուկ օրինաչափեր"}
          isIOS={true}
        />
      ),
    },
    {
      id: "typography",
      content: (
        <StrategyCard
          icon="📝"
          title={language === "FR" ? "Typographie" : language === "EN" ? "Typography" : "Տպել"}
          description={language === "FR" ? "Système de polices adaptatif" : language === "EN" ? "Adaptive font system" : "Հարմարական տառատեսակի համակարգ"}
          isIOS={false}
        />
      ),
    },
    {
      id: "colors",
      content: (
        <StrategyCard
          icon="🎨"
          title={language === "FR" ? "Palette couleurs" : language === "EN" ? "Color palette" : "Գույնային ցանց"}
          description={language === "FR" ? "Dark/Light modes optimisés" : language === "EN" ? "Optimized Dark/Light modes" : "Օպտիմալացված Dark/Light ռեժիմներ"}
          isIOS={true}
        />
      ),
    },
    {
      id: "interactions",
      content: (
        <StrategyCard
          icon="⚡"
          title={language === "FR" ? "Interactions" : language === "EN" ? "Interactions" : "Փոխազդեցություններ"}
          description={language === "FR" ? "Feedback haptique et animations" : language === "EN" ? "Haptic feedback & animations" : "Haptic արձագանք և անիմացիաներ"}
          isIOS={false}
        />
      ),
    },
  ];

  return (
    <main className="w-full min-h-screen bg-white" style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-16 md:pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#1d1d1f] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.backButton}
        </Link>

        <div className="mb-12">
          <motion.span
            className="inline-block text-xs font-medium text-[#999999] mb-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t.role}
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-6 max-w-3xl">
            {t.projectTitle}
          </h1>
          <p className="text-xl md:text-2xl text-[#666666] max-w-2xl leading-relaxed">
            {t.tagline}
          </p>
        </div>

        {/* CTA */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 flex items-center gap-2 text-sm text-[#999999]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          {t.scrollDown}
        </motion.div>
      </motion.div>

      {/* About Section */}
      <motion.section
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 border-t border-[#E5E5E5]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-6">
              {t.aboutTitle}
            </h2>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed mb-8">
              {t.aboutText}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
            <h3 className="font-semibold text-[#1d1d1f] mb-4">{t.approachTitle}</h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              {t.approachText}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Horizontal Scroll Section */}
      <HorizontalScrollSection
        title={t.strategyGridTitle}
        description={t.strategyGridDescription}
        items={strategyItems}
        backgroundColor="bg-[#F5F5F5]"
        itemWidth="w-80"
      />

      {/* Comparison Section */}
      <motion.section
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-12">
          {language === "FR" ? "Comparaison des paradigmes" : language === "EN" ? "Paradigm comparison" : "Պարադիգմի համեմատություն"}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* iOS Card */}
          <motion.div
            className="p-8 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-6">iOS / iPadOS</h3>
            <ul className="space-y-4">
              {[
                { label: language === "FR" ? "Navigation" : "Navigation", desc: "Bottom Tab Bar" },
                { label: language === "FR" ? "Boutons" : "Buttons", desc: "Filled & Bordered" },
                { label: language === "FR" ? "Animations" : "Animations", desc: "Haptic feedback" },
                { label: language === "FR" ? "Polices" : "Fonts", desc: "San Francisco" },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-sm font-medium text-[#1d1d1f]">{item.label}</span>
                  <span className="text-xs text-[#999999]">{item.desc}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Android Card */}
          <motion.div
            className="p-8 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-6">Android</h3>
            <ul className="space-y-4">
              {[
                { label: language === "FR" ? "Navigation" : "Navigation", desc: "Bottom Navigation" },
                { label: language === "FR" ? "Boutons" : "Buttons", desc: "Elevated & Outlined" },
                { label: language === "FR" ? "Animations" : "Animations", desc: "Haptic + Ripple" },
                { label: language === "FR" ? "Polices" : "Fonts", desc: "Roboto" },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex justify-between items-center pb-3 border-b border-blue-200 last:border-0"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-sm font-medium text-[#1d1d1f]">{item.label}</span>
                  <span className="text-xs text-[#999999]">{item.desc}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        className="w-full border-t border-[#E5E5E5] py-16 md:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm text-[#999999] mb-6">
            {language === "FR" ? "Explorez d'autres projets" : language === "EN" ? "Explore other projects" : "Հետազոտեք այլ նախագծեր"}
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1d1d1f] hover:bg-black rounded-lg transition-colors"
          >
            {language === "FR" ? "Retour aux projets" : language === "EN" ? "Back to projects" : "Վերադառնալ նախագծերին"}
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
