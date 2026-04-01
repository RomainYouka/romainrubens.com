"use client";

import { useEffect } from "react";

export function LanguageSync() {
  useEffect(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem("preferredLanguage");
    if (saved) return;

    // If no saved preference, try to match browser language
    const browserLang = navigator.language.split('-')[0].toUpperCase();
    let targetLang: "FR" | "EN" | "ՀԱՅ" | "AM" = "EN"; // Default to EN

    if (browserLang === "FR") {
      targetLang = "FR";
    } else if (browserLang === "HY") {
      targetLang = "ՀԱՅ";
    }

    localStorage.setItem("preferredLanguage", targetLang);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: targetLang }));
  }, []);

  return null;
}
