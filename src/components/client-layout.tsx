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
import { ThemeSwitchOverlay } from "@/components/ThemeSwitchOverlay";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import StarScrollTop from "@/components/StarScrollTop";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";

  // Mise à jour de la langue du document selon la préférence de l'utilisateur
  useEffect(() => {
    const metaDescriptions: Record<string, string> = {
      FR: "Je suis étudiant en design industriel avec une pratique centrée sur l'UX/UI et le design d'interaction. Mon travail porte sur la manière dont les interfaces s'organisent dans des usages réels, des contraintes concrètes et des systèmes du quotidien.",
      EN: "I'm an industrial design student with a practice focused on UX/UI and interaction design. My work explores how interfaces organize themselves in real-world usage, concrete constraints, and everyday systems.",
      ՀԱՅ: "Ես industrial design ուսանող եմ՝ UX/UI և interaction design կենտրոնացված պրակտիկայով։ Իմ աշխատանքը ուսումնասիրում է, թե ինչպես են ինտերֆեյսները կազմակերպվում իրական օգտագործման և առօրյա համակարգերում։",
    };

    const updateDocumentLanguage = (language: string) => {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", metaDescriptions[language] || metaDescriptions.FR);
      }
      const langMap: Record<string, string> = { FR: "fr", EN: "en", ՀԱՅ: "hy" };
      document.documentElement.lang = langMap[language] || "fr";
    };

    const savedLanguage = localStorage.getItem("preferredLanguage") || "FR";
    updateDocumentLanguage(savedLanguage);

    const handleLanguageChange = (event: CustomEvent) => {
      updateDocumentLanguage(event.detail);
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
        <SmoothScrollProvider>
          <LayoutContent>{children}</LayoutContent>
          <PageTransitionOverlay />
          <ThemeSwitchOverlay />
          <StarScrollTop />
        </SmoothScrollProvider>
      </PageTransitionProvider>
    </ThemeProvider>
  );
}
