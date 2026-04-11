"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import GlobalNavigation from "@/components/sections/global-navigation";
import GlobalFooter from "@/components/sections/global-footer";
import IntroSplash from "@/components/intro-splash";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TimeThemePopup } from "@/components/TimeThemePopup";
import { PageTransitionProvider } from "@/contexts/PageTransitionContext";
import { PageTransitionOverlay } from "@/components/PageTransitionOverlay";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";

  // Mise à jour de la langue du document selon la préférence de l'utilisateur
  useEffect(() => {
    const updateMetaDescription = (language: string) => {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `RomainRubens (${language})`);
      }
      const langMap: Record<string, string> = { FR: "fr", EN: "en", ՀԱՅ: "hy" };
      document.documentElement.lang = langMap[language] || "en";
    };

    const savedLanguage = localStorage.getItem("preferredLanguage") || "EN";
    updateMetaDescription(savedLanguage);

    const handleLanguageChange = (event: CustomEvent) => {
      updateMetaDescription(event.detail);
    };
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
  }, []);

  // Masquer le footer sur la page CV
  useEffect(() => {
    if (isResumePage) {
      const footer = document.querySelector("footer");
      if (footer) (footer as HTMLElement).style.display = "none";
    }
  }, [isResumePage]);

  return (
    <>
      {!isResumePage && <GlobalNavigation onShowQuotes={() => {}} />}
      <IntroSplash />
      {children}
      {!isResumePage && <GlobalFooter />}
      <TimeThemePopup />
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PageTransitionProvider>
        <LayoutContent>{children}</LayoutContent>
        <PageTransitionOverlay />
      </PageTransitionProvider>
    </ThemeProvider>
  );
}
