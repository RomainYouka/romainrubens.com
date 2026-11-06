"use client";
import { CardOpenBadge, ExternalLinkBadge } from "@/components/SFIcon";
import { ListingBanner, listingPageClassName, listingContainerClassName, listingSectionClassName, listingGridClassName } from "@/components/ListingLayout";

import { detectLanguage } from "@/lib/language";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Analytics } from "@/lib/analytics";
import { type Language } from "@/lib/language";
import { articles } from "@/data/articles";

const translations = {
  FR: {
    title: "Articles",
    subtitle: "Mes réflexions de designer sur les interfaces, les écosystèmes connectés et les usages qui façonnent notre quotidien.",
  },
  EN: {
    title: "Articles",
    subtitle: "My reflections as a designer on interfaces, connected ecosystems, and the ways we use technology in everyday life.",
  },
  ՀԱՅ: {
    title: "Հոդվածներ",
    subtitle: "Իմ՝ որպես դիզայների մտորումները ինտերֆեյսների, կապակցված էկոհամակարգերի և մեր առօրյան ձևավորող տեխնոլոգիաների կիրառման մասին։",
  },
};

const triggerHapticFeedback = () => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(10);
  }
};

interface ArticleCardProps {
  image: string;
  number: string;
  title: string;
  href: string;
  language: Language;
  onOpen: () => void;
  isPriority?: boolean;
}

const ArticleCard = ({ image, number, title, href, language, onOpen, isPriority }: ArticleCardProps) => {
  const handleClick = useCallback(() => {
    triggerHapticFeedback();
    window.dispatchEvent(new CustomEvent("blob-wink"));
    onOpen();
  }, [onOpen]);

  const label = `${number} — ${title}`;

  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-2 md:gap-3" style={{ containerType: "inline-size" }}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        data-card-pill
        className="relative w-full aspect-[2.16/1] overflow-hidden rounded-[14.44px] cursor-pointer block p-0"
        style={{ border: "1px solid var(--theme-pill-border)", background: "transparent", textDecoration: "none" }}
        whileHover={{ boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-label={label}
      >
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover"
          style={{ objectPosition: number === "04" ? "right center" : "center center" }}
          priority={isPriority}
          fetchPriority={isPriority ? "high" : "auto"}
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 57px), (max-width: 1279px) calc(50vw - 73px), 576px"
        />
<div className="absolute top-[11px] left-[11px] z-10 pointer-events-none"><ExternalLinkBadge /></div>
        <div className="flex items-end justify-end p-0 h-full pr-[13px] pb-[13px] relative z-10">
          <CardOpenBadge language={language} />
        </div>
      </motion.a>
      <h2
        data-article-heading
        className="w-full min-w-0 text-left text-[18px] leading-none"
        style={{ fontFamily: "var(--font-display)", color: "var(--theme-fg)", fontSize: "calc(min(32px, 4.4cqw) - 2pt)" }}
      >
        <span className="inline-block whitespace-nowrap">
          <span className="font-semibold">{number} — </span>
          <span className="font-medium">{title}</span>
        </span>
      </h2>
    </div>
  );
};

export default function ArticlesPage() {
  const [language, setLanguage] = useState<Language>("EN");
  useEffect(() => {
    const savedLanguage = detectLanguage() as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const handleOpen = useCallback(() => {
    Analytics.contactClick("medium");
  }, []);

  return (
    <main
      id="main-content"
      className={listingPageClassName}
      style={{ backgroundColor: "var(--theme-bg)" }}
    >
      <div className={listingContainerClassName}>
          <h1 className="sr-only">{translations[language].title}</h1>
          <section className={listingSectionClassName}>
            <ListingBanner kind="articles" language={language} />
            {/* Reserve the category row so the first cards align with Projects. */}
            <div aria-hidden="true" className="h-10 lg:h-12 w-full shrink-0" />
            <div className={listingGridClassName}>
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  image={article.image}
                  number={article.number}
                  title={article.title[language]}
                  href={article.href[language]}
                  language={language}
                  onOpen={handleOpen}
                  isPriority={index < 2}
                />
              ))}
            </div>
          </section>
      </div>
    </main>
  );
}
