"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { usePathname } from "next/navigation";

const footerTranslations = {
  FR: {
    copyright: "© 2026 Romain Rubens. Tous droits réservés.",
    reportProblem: "Signaler un problème",
    legal: "Mentions légales",
    sitemap: "Plan du site",
    accessibility: "Accessibilité",
    dyslexicOn: "Mode dyslexique",
    dyslexicOff: "Mode dyslexique",
  },
  EN: {
    copyright: "© 2026 Romain Rubens. All rights reserved.",
    reportProblem: "Report a problem",
    legal: "Legal Notice",
    sitemap: "Site Map",
    accessibility: "Accessibility",
    dyslexicOn: "Dyslexic mode",
    dyslexicOff: "Dyslexic mode",
  },
  ՀԱՅ: {
    copyright: "© 2026 Ռոման Ռուբենս. Բոլոր իրավունքները պաշտպանված են.",
    reportProblem: "Տեղեկացնել խնդրի վերաբերյալ",
    legal: "Իրավական տեղեկություններ",
    sitemap: "Կայքի քարտեզ",
    accessibility: "Հասանելիություն",
    dyslexicOn: "Դիսլեքսիկ ռեժիմ",
    dyslexicOff: "Դիսլեքսիկ ռեժիմ",
  },
};

const GlobalFooter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDyslexic, toggleDyslexic } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");

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

  const bgColor    = "var(--theme-nav-bg)";
  const textColor  = "var(--theme-fg)";
  const borderColor = "var(--theme-border)";

  return (
    <>
    <footer
      role="contentinfo"
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
        <div className="flex flex-wrap items-center justify-start md:justify-center gap-1 text-[10px] md:text-xs" style={{ color: "var(--theme-subtle)" }}>
          <a
            href="mailto:report@romainrubens.com"
            style={{
              color: "var(--theme-subtle)",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--theme-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--theme-subtle)";
            }}
          >
            {currentTranslations.reportProblem}
          </a>
          <span style={{ color: "var(--theme-subtle)" }}>|</span>
          <button
            onClick={() => router.push("/legal")}
            style={{
              color: "var(--theme-subtle)",
              textDecoration: "none",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--theme-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--theme-subtle)";
            }}
          >
            {currentTranslations.legal}
          </button>
          <span style={{ color: "var(--theme-subtle)" }}>|</span>
          <button
            onClick={() => router.push("/sitemap")}
            style={{
              color: "var(--theme-subtle)",
              textDecoration: "none",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--theme-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--theme-subtle)";
            }}
          >
            {currentTranslations.sitemap}
          </button>
          <span style={{ color: "var(--theme-subtle)" }}>|</span>
          <button
            onClick={() => router.push("/accessibility")}
            style={{
              color: "var(--theme-subtle)",
              textDecoration: "none",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--theme-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--theme-subtle)";
            }}
          >
            {currentTranslations.accessibility}
          </button>
          <span style={{ color: "var(--theme-subtle)" }}>|</span>
          <button
            onClick={toggleDyslexic}
            aria-pressed={isDyslexic}
            style={{
              color: isDyslexic ? "var(--theme-accent)" : "var(--theme-subtle)",
              textDecoration: "none",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--theme-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDyslexic ? "var(--theme-accent)" : "var(--theme-subtle)";
            }}
          >
            {isDyslexic ? currentTranslations.dyslexicOff : currentTranslations.dyslexicOn}
          </button>

        </div>
      </div>
    </footer>
    </>
  );
};

export default GlobalFooter;
