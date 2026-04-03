"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const footerTranslations = {
  FR: {
    copyright: "© 2026 Romain Rubens. Tous droits réservés.",
    logoGuide: "Guide d'utilisation du logo (ancienne version)",
    reportProblem: "Signaler un problème",
    legal: "Mentions légales",
    sitemap: "Plan du site",
  },
  EN: {
    copyright: "© 2026 Romain Rubens. All rights reserved.",
    logoGuide: "Logo usage guidelines (old)",
    reportProblem: "Report a problem",
    legal: "Legal Notice",
    sitemap: "Site Map",
  },
  ՀԱՅ: {
    copyright: "© 2026 Ռոման Ռուբենս. Բոլոր իրավունքները պաշտպանված են.",
    logoGuide: "Լոգոյի օգտագործման ուղեցույց (հին)",
    reportProblem: "Տեղեկացնել խնդրի վերաբերյալ",
    legal: "Իրավական տեղեկություններ",
    sitemap: "Կայքի քարտեզ",
  },
};

const GlobalFooter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [showOverlay, setShowOverlay] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const isExplorationsPage = pathname === "/explorations";

  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !footerTranslations[saved as keyof typeof footerTranslations]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved as "FR" | "EN" | "ՀԱՅ");
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const currentTranslations = footerTranslations[selectedLanguage];

  const bgColor = isExplorationsPage ? "#121212" : "#FFFFFF";
  const textColor = isExplorationsPage ? "#FFFFFF" : "#1d1d1f";
  const borderColor = isExplorationsPage ? "#3F3F3F" : "#D3D3D4";

  const pdfFiles = {
    FR: "/resume/RUBENS_Romain_Logo_Guidelines_FR.pdf",
    EN: "/resume/RUBENS_Romain_Logo_Guidelines_EN.pdf",
    ՀԱՅ: "/resume/RUBENS_Romain_Logo_Guidelines_EN.pdf",
  };
  
  const pdfUrl = pdfFiles[selectedLanguage];

  const handleNavigation = (href: string) => {
    setShowOverlay(true);
    setPendingPath(href);
    setTimeout(() => {
      router.push(href);
    }, 250);
  };

  return (
    <>
      {/* Blue overlay transition */}
      <AnimatePresence>
        {showOverlay && (
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                borderRadius: "50%",
              }}
              animate={{
                opacity: 0.5,
                scale: 1.5,
                borderRadius: "50%",
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "100vw",
                height: "100vh",
                backgroundColor: "#314DCB",
                filter: "blur(40px)",
                zIndex: 9998,
              }}
            />
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: [0.32, 0.72, 0, 1],
                delay: 0.05,
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#314DCB",
                zIndex: 9999,
              }}
            />
          </>
        )}
      </AnimatePresence>
    <footer
      className="border-t transition-colors duration-300"
      data-section="footer"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-6 md:py-6">
        <p className="text-xs md:text-sm font-semibold leading-relaxed mb-4 md:mb-6 pb-4 md:pb-6 border-b" style={{ color: textColor, borderColor: borderColor }}>
          {currentTranslations.copyright}
        </p>

        {/* Footer links section */}
        <div className="flex flex-wrap items-center justify-start md:justify-center gap-1 text-[10px] md:text-xs" style={{ color: "#6e6e73" }}>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#6e6e73",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#314DCB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6e6e73";
            }}
          >
            {currentTranslations.logoGuide}
          </a>
          <span style={{ color: "#6e6e73" }}>|</span>
          <a
            href="mailto:report@romainrubens.com"
            style={{
              color: "#6e6e73",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#314DCB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6e6e73";
            }}
          >
            {currentTranslations.reportProblem}
          </a>
          <span style={{ color: "#6e6e73" }}>|</span>
          <button
            onClick={() => handleNavigation("/legal")}
            style={{
              color: "#6e6e73",
              textDecoration: "none",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#314DCB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6e6e73";
            }}
          >
            {currentTranslations.legal}
          </button>
          <span style={{ color: "#6e6e73" }}>|</span>
          <button
            onClick={() => handleNavigation("/sitemap")}
            style={{
              color: "#6e6e73",
              textDecoration: "none",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#314DCB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6e6e73";
            }}
          >
            {currentTranslations.sitemap}
          </button>
        </div>
      </div>
    </footer>
    </>
  );
};

export default GlobalFooter;
