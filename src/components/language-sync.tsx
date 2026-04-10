"use client";

import { useEffect } from "react";

const langMap: Record<string, string> = {
  FR: "fr",
  EN: "en",
  ՀԱՅ: "hy",
};

function applyLang(code: string) {
  const htmlLang = langMap[code] ?? "fr";
  document.documentElement.setAttribute("lang", htmlLang);
}

export function LanguageSync() {
  useEffect(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem("preferredLanguage");

    if (saved) {
      applyLang(saved);
    } else {
      // If no saved preference, try to match browser language
      const browserLang = navigator.language.split('-')[0].toUpperCase();
      let targetLang: "FR" | "EN" | "ՀԱՅ" = "FR"; // Default to FR

      if (browserLang === "EN") {
        targetLang = "EN";
      } else if (browserLang === "HY") {
        targetLang = "ՀԱՅ";
      }

      localStorage.setItem("preferredLanguage", targetLang);
      applyLang(targetLang);
      window.dispatchEvent(new CustomEvent("languageChange", { detail: targetLang }));
    }

    // Listen for future language changes
    const handleLanguageChange = (event: CustomEvent<string>) => {
      applyLang(event.detail);
    };
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
  }, []);

  return null;
}
