"use client";

import { detectLanguage } from "@/lib/language";
import { siteTitle, profileSearchDescription } from "@/lib/profile";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { usePageTransition } from "@/contexts/PageTransitionContext";
import { LazyMotion, domAnimation } from "framer-motion";
import GlobalNavigation from "@/components/sections/global-navigation";
import GlobalFooter from "@/components/sections/global-footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PageTransitionProvider } from "@/contexts/PageTransitionContext";
import { ThemeSwitchOverlay } from "@/components/ThemeSwitchOverlay";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import StarScrollTop from "@/components/StarScrollTop";

const defaultTitle = siteTitle;
const PageTransitionOverlay=dynamic(()=>import("@/components/PageTransitionOverlay").then(m=>m.PageTransitionOverlay),{ssr:false});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {phase}=usePageTransition();
  const isResumePage = pathname === "/resume";

  // Mise à jour de la langue du document selon la préférence de l'utilisateur
  useEffect(() => {
    const updateDocumentLanguage = (language: string) => {
      if (pathname === "/") {
        document.title = defaultTitle;
      }
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && pathname === "/") {
        metaDescription.setAttribute("content", profileSearchDescription);
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
      {!isResumePage && <GlobalNavigation />}
      {children}
      {!isResumePage && pathname !== "/" && pathname !== "/contact" && <GlobalFooter />}
      {phase!=="idle" && <PageTransitionOverlay />}
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
