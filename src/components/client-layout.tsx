"use client";

import { detectLanguage } from "@/lib/language";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation } from "framer-motion";
import GlobalNavigation from "@/components/sections/global-navigation";
import GlobalFooter from "@/components/sections/global-footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PageTransitionProvider } from "@/contexts/PageTransitionContext";
import { ThemeSwitchOverlay } from "@/components/ThemeSwitchOverlay";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import StarScrollTop from "@/components/StarScrollTop";

const defaultTitle = "Romain Rubens - UX/UI Designer · Smart Ecosystems";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";

  // Mise à jour de la langue du document selon la préférence de l'utilisateur
  useEffect(() => {
    const metaDescriptions: Record<string, string> = {
      FR: "Portfolio de Romain Rubens, designer UX/UI spécialisé dans les écosystèmes connectés, le design d'interaction et les interfaces du quotidien.",
      EN: "I'm an industrial design student with a practice focused on UX/UI and interaction design. My work explores how interfaces organize themselves in real-world usage, concrete constraints, and everyday systems.",
      ՀԱՅ: "Ես industrial design ուսանող եմ՝ UX/UI և interaction design կենտրոնացված պրակտիկայով։ Իմ աշխատանքը ուսումնասիրում է, թե ինչպես են ինտերֆեյսները կազմակերպվում իրական օգտագործման և առօրյա համակարգերում։",
    };

    const updateDocumentLanguage = (language: string) => {
      if (pathname === "/") {
        document.title = defaultTitle;
      }
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", metaDescriptions[language] || metaDescriptions.FR);
      }
      const langMap: Record<string, string> = { FR: "fr", EN: "en", ՀԱՅ: "hy" };
      document.documentElement.lang = langMap[language] || "fr";
    };

    const savedLanguage = detectLanguage() || "FR";
    updateDocumentLanguage(savedLanguage);

    const handleLanguageChange = (event: CustomEvent) => {
      updateDocumentLanguage(event.detail);
    };
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
  }, [pathname]);

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
      {children}
      {!isResumePage && <GlobalFooter />}
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider>
        <PageTransitionProvider>
          <SmoothScrollProvider>
            <LayoutContent>{children}</LayoutContent>
            <ThemeSwitchOverlay />
            <StarScrollTop />
          </SmoothScrollProvider>
        </PageTransitionProvider>
      </ThemeProvider>
    </LazyMotion>
  );
}
