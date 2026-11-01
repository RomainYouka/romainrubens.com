"use client";

import { detectLanguage } from "@/lib/language";

import { useState, useEffect, useCallback, useRef } from "react";
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
  onOpen: () => void;
  isPriority?: boolean;
}

const ArticleCard = ({ image, number, title, href, onOpen, isPriority }: ArticleCardProps) => {
  const handleClick = useCallback(() => {
    triggerHapticFeedback();
    window.dispatchEvent(new CustomEvent("blob-wink"));
    onOpen();
  }, [onOpen]);

  const label = `${number} — ${title}`;

  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-3 md:gap-6">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full aspect-[2.16/1] overflow-hidden rounded-[14.44px] cursor-pointer block p-0"
        style={{ border: "1px solid var(--theme-pill-border)", background: "transparent" }}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
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
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc((100vw - 114px) / 2), 455px"
        />
        <div className="absolute top-[11px] left-[11px] z-10 pointer-events-none">
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: "var(--theme-bg)",
              border: "1px solid var(--theme-pill-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.5 1.5H11.5M11.5 1.5V5.5M11.5 1.5L5.5 7.5M5 2.5H2C1.72 2.5 1.5 2.72 1.5 3V11C1.5 11.28 1.72 11.5 2 11.5H10C10.28 11.5 10.5 11.28 10.5 11V8"
                stroke="var(--theme-pill-border)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-end justify-end p-0 h-full pr-[13px] pb-[13px] relative z-10">
          <div className="w-8 h-8 md:w-10 md:h-10 p-0 pointer-events-none flex-shrink-0">
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle
                cx="27"
                cy="27"
                r="26.0723"
                transform="rotate(180 27 27)"
                style={{ fill: "var(--theme-bg)", stroke: "var(--theme-pill-border)" }}
                strokeWidth="1.8553"
              />
              <path
                d="M23.32 34.3633L30.0142 27.6691L30.6836 26.9996L23.32 19.636"
                style={{ stroke: "var(--theme-pill-border)" }}
                strokeWidth="3.71061"
              />
            </svg>
          </div>
        </div>
      </motion.a>
      <h2
        data-article-heading
        className="w-full min-w-0 text-left text-[18px] leading-none"
        style={{ fontFamily: "var(--font-display)", color: "var(--theme-fg)", fontSize: "var(--article-title-size, 18px)" }}
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
  const [isHydrated, setIsHydrated] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const heading = grid?.querySelectorAll<HTMLElement>("[data-article-heading]")[1];
    const text = heading?.firstElementChild as HTMLElement | null;
    if (!grid || !heading || !text) return;
    let disposed = false;
    const fit = () => {
      if (disposed) return;
      // All titles share the second article's fitted size in the current language.
      text.style.fontSize = "32px";
      const width = text.getBoundingClientRect().width;
      if (width > 0) grid.style.setProperty("--article-title-size", `${Math.min(32, 32 * heading.clientWidth / width)}px`);
      text.style.removeProperty("font-size");
    };
    const observer = new ResizeObserver(fit);
    observer.observe(grid);
    void document.fonts.ready.then(fit);
    fit();
    return () => { disposed = true; observer.disconnect(); };
  }, [language, isHydrated]);

  useEffect(() => {
    const savedLanguage = detectLanguage() as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    setIsHydrated(true);
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
      className="w-full min-h-screen"
      style={{ backgroundColor: "var(--theme-bg)" }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "var(--theme-fg)" }}>
            {translations[language].title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--theme-muted)" }}>
            {translations[language].subtitle}
          </p>
        </div>
          <section className="flex flex-col items-center gap-6 md:gap-[50px] relative w-full">
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 md:gap-[50px] w-full">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  image={article.image}
                  number={article.number}
                  title={article.title[language]}
                  href={article.href[language]}
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
