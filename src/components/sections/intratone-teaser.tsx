"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const translations = {
  FR: "Ce projet sera visible dès le 23 Mars 2026",
  EN: "This project will be visible from March 23, 2026",
  ՀԱՅ: "Այս նախագիծը հասանելի կլինի 2026 թվականի մարտի 23-ից",
};

export default function IntratoneTeaser() {
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [isMounted, setIsMounted] = useState(false);

  const bannerTexts = {
    FR: "Nouvelle version disponible le 23.03.2026, avec de nouveaux projets et une navigation repensée.",
    EN: "A new version will be released on 23.03.2026, featuring new projects and a redesigned navigation.",
    ՀԱՅ: "Նոր տարբերակը հասանելի կլինի 23.03.2026-ին՝ նոր նախագծերով և վերամշակված նավիգացիայով։",
  };

  useEffect(() => {
    setIsMounted(true);
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (saved && ["FR", "EN", "ՀԱՅ"].includes(saved)) {
      setSelectedLanguage(saved);
    }

    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <section className="w-full bg-white py-12 px-5">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-16">
        {/* HTML/CSS Banner instead of image to solve visibility and language issues */}
        <div className="w-full flex justify-center -mb-8">
          <div 
            className="w-full max-w-[1000px] py-4 px-6 rounded-2xl flex items-center justify-center text-center"
            style={{ 
              backgroundColor: "#006400", 
              color: "white",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.5vw, 18px)",
              fontWeight: 500,
              lineHeight: 1.4
            }}
          >
            {bannerTexts[selectedLanguage]}
          </div>
        </div>

        {/* Intratone Teaser */}
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-[1000px] aspect-[2/1] mb-4">
            <Image
              src="/intratone/intratone-teaser.png"
              alt="Intratone Project Teaser"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p 
            className="w-full max-w-[1000px] text-right text-gray-500 font-light"
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.2vw, 16px)" }}
          >
            {translations[selectedLanguage]}
          </p>
        </div>

        {/* Google Maps Teaser */}
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-[1000px] aspect-[2/1] mb-4">
            <Image
              src="/googlemaps/googlemaps-teaser.png"
              alt="Google Maps Project Teaser"
              fill
              className="object-contain"
            />
          </div>
          <p 
            className="w-full max-w-[1000px] text-right text-gray-500 font-light"
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.2vw, 16px)" }}
          >
            {translations[selectedLanguage]}
          </p>
        </div>

        {/* Ayoo Teaser */}
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-[1000px] aspect-[2/1] mb-4">
            <Image
              src="/ayooapi/ayoo-teaser.png"
              alt="Ayoo Project Teaser"
              fill
              className="object-contain"
            />
          </div>
          <p 
            className="w-full max-w-[1000px] text-right text-gray-500 font-light"
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.2vw, 16px)" }}
          >
            {translations[selectedLanguage]}
          </p>
        </div>
      </div>
    </section>
  );
}
