"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

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
  ES: {
    copyright: "© 2026 Romain Rubens. Todos los derechos reservados.",
    reportProblem: "Informar de un problema",
    legal: "Aviso legal",
    sitemap: "Mapa del sitio",
    accessibility: "Accesibilidad",
    dyslexicOn: "Modo dislexia",
    dyslexicOff: "Modo dislexia",
  },
  DE: {
    copyright: "© 2026 Romain Rubens. Alle Rechte vorbehalten.",
    reportProblem: "Problem melden",
    legal: "Impressum",
    sitemap: "Sitemap",
    accessibility: "Barrierefreiheit",
    dyslexicOn: "Dyslexie-Modus",
    dyslexicOff: "Dyslexie-Modus",
  },
  IT: {
    copyright: "© 2026 Romain Rubens. Tutti i diritti riservati.",
    reportProblem: "Segnala un problema",
    legal: "Note legali",
    sitemap: "Mappa del sito",
    accessibility: "Accessibilità",
    dyslexicOn: "Modalità dislessia",
    dyslexicOff: "Modalità dislessia",
  },
  RU: {
    copyright: "© 2026 Romain Rubens. Все права защищены.",
    reportProblem: "Сообщить о проблеме",
    legal: "Правовая информация",
    sitemap: "Карта сайта",
    accessibility: "Доступность",
    dyslexicOn: "Режим дислексии",
    dyslexicOff: "Режим дислексии",
  },
  KO: {
    copyright: "© 2026 Romain Rubens. 모든 권리 보유.",
    reportProblem: "문제 신고",
    legal: "법적 고지",
    sitemap: "사이트맵",
    accessibility: "접근성",
    dyslexicOn: "난독증 모드",
    dyslexicOff: "난독증 모드",
  },
  JA: {
    copyright: "© 2026 Romain Rubens. 無断転載を禁じます。",
    reportProblem: "問題を報告",
    legal: "法的情報",
    sitemap: "サイトマップ",
    accessibility: "アクセシビリティ",
    dyslexicOn: "ディスレクシアモード",
    dyslexicOff: "ディスレクシアモード",
  },
  ZH: {
    copyright: "© 2026 Romain Rubens. 保留所有权利。",
    reportProblem: "报告问题",
    legal: "法律信息",
    sitemap: "网站地图",
    accessibility: "无障碍",
    dyslexicOn: "阅读障碍模式",
    dyslexicOff: "阅读障碍模式",
  },
  AR: {
    copyright: "© 2026 Romain Rubens. جميع الحقوق محفوظة.",
    reportProblem: "الإبلاغ عن مشكلة",
    legal: "المعلومات القانونية",
    sitemap: "خريطة الموقع",
    accessibility: "إمكانية الوصول",
    dyslexicOn: "وضع عسر القراءة",
    dyslexicOff: "وضع عسر القراءة",
  },
};
type FooterLanguage = keyof typeof footerTranslations;

const GlobalFooter = () => {
  const router = useRouter();
  const { isDyslexic, toggleDyslexic } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<FooterLanguage>("FR");

  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as FooterLanguage | null;
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
