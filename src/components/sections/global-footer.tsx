"use client";

import { detectLanguage } from "@/lib/language";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const footerTranslations = {
  FR: {
    copyright: "© 2026 Romain Rubens. Tous droits réservés.",
    reportProblem: "Signaler un problème",
    legal: "Mentions légales",
    sitemap: "Plan du site",
    accessibility: "Accessibilité",
  },
  EN: {
    copyright: "© 2026 Romain Rubens. All rights reserved.",
    reportProblem: "Report a problem",
    legal: "Legal Notice",
    sitemap: "Site Map",
    accessibility: "Accessibility",
  },
  ՀԱՅ: {
    copyright: "© 2026 Ռոման Ռուբենս. Բոլոր իրավունքները պաշտպանված են.",
    reportProblem: "Տեղեկացնել խնդրի վերաբերյալ",
    legal: "Իրավական տեղեկություններ",
    sitemap: "Կայքի քարտեզ",
    accessibility: "Հասանելիություն",
  },
  ES: {
    copyright: "© 2026 Romain Rubens. Todos los derechos reservados.",
    reportProblem: "Informar de un problema",
    legal: "Aviso legal",
    sitemap: "Mapa del sitio",
    accessibility: "Accesibilidad",
  },
  DE: {
    copyright: "© 2026 Romain Rubens. Alle Rechte vorbehalten.",
    reportProblem: "Problem melden",
    legal: "Impressum",
    sitemap: "Sitemap",
    accessibility: "Barrierefreiheit",
  },
  IT: {
    copyright: "© 2026 Romain Rubens. Tutti i diritti riservati.",
    reportProblem: "Segnala un problema",
    legal: "Note legali",
    sitemap: "Mappa del sito",
    accessibility: "Accessibilità",
  },
  RU: {
    copyright: "© 2026 Romain Rubens. Все права защищены.",
    reportProblem: "Сообщить о проблеме",
    legal: "Правовая информация",
    sitemap: "Карта сайта",
    accessibility: "Доступность",
  },
  KO: {
    copyright: "© 2026 Romain Rubens. 모든 권리 보유.",
    reportProblem: "문제 신고",
    legal: "법적 고지",
    sitemap: "사이트맵",
    accessibility: "접근성",
  },
  JA: {
    copyright: "© 2026 Romain Rubens. 無断転載を禁じます。",
    reportProblem: "問題を報告",
    legal: "法的情報",
    sitemap: "サイトマップ",
    accessibility: "アクセシビリティ",
  },
  ZH: {
    copyright: "© 2026 Romain Rubens. 保留所有权利。",
    reportProblem: "报告问题",
    legal: "法律信息",
    sitemap: "网站地图",
    accessibility: "无障碍",
  },
  AR: {
    copyright: "© 2026 Romain Rubens. جميع الحقوق محفوظة.",
    reportProblem: "الإبلاغ عن مشكلة",
    legal: "المعلومات القانونية",
    sitemap: "خريطة الموقع",
    accessibility: "إمكانية الوصول",
  },
};
type FooterLanguage = keyof typeof footerTranslations;

// Match the final navigation panel of each case study, independently of theme.
const projectPalettes: Record<string, { background: string; foreground: string; secondary: string; border: string }> = {
  "/googleplayonios": { background: "#f4f4f5", foreground: "#1d1d1f", secondary: "#676767", border: "#d3d3d4" },
  "/renaultextensionapp": { background: "#efdf00", foreground: "#1d1d1f", secondary: "#1d1d1f", border: "#777000" },
  "/stratosapp": { background: "#007afe", foreground: "#121417", secondary: "#121417", border: "#143d69" },
  "/googlemapsextension": { background: "#007786", foreground: "#ffffff", secondary: "#c1edf5", border: "#c1edf5" },
  "/goupildigitalecosystem": { background: "#18181b", foreground: "#ffffff", secondary: "#c7c7cc", border: "#616161" },
};

const GlobalFooter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const projectPalette = projectPalettes[pathname];
  const [selectedLanguage, setSelectedLanguage] = useState<FooterLanguage>("EN");

  useEffect(() => {
    let saved = detectLanguage() as FooterLanguage | null;
    if (!saved || !footerTranslations[saved as keyof typeof footerTranslations]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<FooterLanguage>) => {
      if (footerTranslations[event.detail]) setSelectedLanguage(event.detail);
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
      dir="ltr"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        direction: "ltr",
        ...(projectPalette ? { "--theme-nav-bg": projectPalette.background, "--theme-fg": projectPalette.foreground, "--theme-border": projectPalette.border, "--theme-subtle": projectPalette.secondary, "--theme-accent": projectPalette.foreground } as React.CSSProperties : {}),
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
        </div>
      </div>
    </footer>
    </>
  );
};

export default GlobalFooter;
