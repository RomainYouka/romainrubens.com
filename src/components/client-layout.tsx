"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import GlobalNavigation from "@/components/sections/global-navigation";
import GlobalFooter from "@/components/sections/global-footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";
  const isExplorationsPage = pathname === "/explorations";

  useEffect(() => {
    document.body.style.transition = "background-color 0.3s ease";
    document.body.style.backgroundColor = isExplorationsPage ? "#121212" : "#ffffff";
  }, [isExplorationsPage]);

  useEffect(() => {
    // Hide footer on resume page
    if (isResumePage) {
      const footer = document.querySelector('footer');
      if (footer) {
        (footer as HTMLElement).style.display = 'none';
      }
    }
  }, [isResumePage]);

  useEffect(() => {
    const updateMetaDescription = (language: string) => {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `RomainRubens (${language})`);
      }
      
      // Update html lang attribute
      const langMap: Record<string, string> = {
        "FR": "fr",
        "EN": "en",
        "ՀԱՅ": "hy"
      };
      document.documentElement.lang = langMap[language] || "en";
    };

    // Set initial description based on saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage") || "EN";
    updateMetaDescription(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      updateMetaDescription(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <>
      {!isResumePage && <GlobalNavigation onShowQuotes={() => {}} />}
      {children}
      {!isResumePage && <GlobalFooter />}
    </>
  );
}