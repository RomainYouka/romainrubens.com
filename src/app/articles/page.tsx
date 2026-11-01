"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectSkeleton } from "@/components/ui/skeleton";
import { Analytics } from "@/lib/analytics";
import { type Language } from "@/lib/language";
import { articles } from "@/data/articles";

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
  onOpen: (url: string) => void;
  isPriority?: boolean;
}

const ArticleCard = ({ image, number, title, href, onOpen, isPriority }: ArticleCardProps) => {
  const handleClick = useCallback(() => {
    triggerHapticFeedback();
    window.dispatchEvent(new CustomEvent("blob-wink"));
    onOpen(href);
  }, [href, onOpen]);

  const label = `${number} — ${title}`;

  return (
    <div className="flex w-full flex-col items-start gap-6">
      <motion.button
        type="button"
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
          priority={isPriority}
          fetchPriority={isPriority ? "high" : "auto"}
          sizes="(max-width: 768px) 100vw, (max-width: 1234px) 50vw, 592px"
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
      </motion.button>
      <h2
        className="w-full text-left text-[18px] md:text-[24px] lg:text-[32px] leading-none"
        style={{ fontFamily: "var(--font-display)", color: "var(--theme-fg)" }}
      >
        <span className="font-semibold">{number} — </span>
        <span className="font-medium">{title}</span>
      </h2>
    </div>
  );
};

export default function ArticlesPage() {
  const [language, setLanguage] = useState<Language>("FR");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
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

  const handleOpen = useCallback((url: string) => {
    Analytics.contactClick("medium");
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <main
      id="main-content"
      className="w-full min-h-screen flex justify-center py-5 md:mt-[20px] pb-32 md:pb-12"
      style={{ backgroundColor: "var(--theme-bg)" }}
    >
      <div className="flex w-full max-w-[1234px] h-auto px-4 md:px-8 lg:px-12 xl:px-4 mt-16 md:mt-[40px] relative flex-col items-center gap-12 md:gap-[100px]">
        {!isHydrated ? (
          <ProjectSkeleton />
        ) : (
          <section className="flex flex-col items-center gap-6 md:gap-[50px] relative w-full">
            <h1 className="sr-only">Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] w-full">
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
        )}
      </div>
    </main>
  );
}
