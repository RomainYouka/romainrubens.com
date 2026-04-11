"use client";

import { useEffect } from "react";
import { detectLanguage } from "@/lib/language";

const langMap: Record<string, string> = {
  FR: "fr",
  EN: "en",
  ՀԱՅ: "hy",
};

function applyLang(code: string) {
  document.documentElement.setAttribute("lang", langMap[code] ?? "en");
}

export function LanguageSync() {
  useEffect(() => {
    const lang = detectLanguage();
    // Sauvegarder si pas déjà fait
    if (!localStorage.getItem("preferredLanguage")) {
      localStorage.setItem("preferredLanguage", lang);
    }
    applyLang(lang);
    // Notifier tous les composants de la langue initiale
    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }));

    const handleLanguageChange = (event: CustomEvent<string>) => {
      applyLang(event.detail);
    };
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
  }, []);

  return null;
}
