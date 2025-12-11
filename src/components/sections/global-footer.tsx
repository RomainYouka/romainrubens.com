"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const footerTranslations = {
  FR: {
    copyright: "© 2025 Romain Rubens. Tous droits réservés.",
    logoGuide: "Guide d'utilisation du logo",
    reportProblem: "Signaler un problème",
  },
  EN: {
    copyright: "© 2025 Romain Rubens. All rights reserved.",
    logoGuide: "Logo usage guidelines",
    reportProblem: "Report a problem",
  },
  ՀԱՅ: {
    copyright: "© 2025 Ռոման Ռուբենս. Բոլոր իրավունքները պաշտպանված են.",
    logoGuide: "Լոգոյի օգտագործման ուղեցույց",
    reportProblem: "Տեղեկացնել խնդրի վերաբերյալ",
  },
};

const GlobalFooter = () => {
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");

  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !footerTranslations[saved]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
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

  return (
    <footer
      className="bg-[#FFFFFF] border-t border-[#D3D3D4]"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-6 md:py-6">
        <div className="flex flex-col-reverse items-start gap-3 md:flex-row md:items-center md:justify-between md:min-h-[80px] md:gap-4">
          <p className="text-[10px] md:text-xs text-[#3C3C3C] font-normal leading-relaxed">
            {currentTranslations.copyright}
          </p>
          <div className="flex items-center gap-4 md:gap-6 order-first md:order-last">
            <a
              href="/logo-guidelines.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] md:text-xs text-[#3C3C3C] font-medium hover:text-[#EA4335] transition-all duration-160 relative inline-block group active:scale-[0.98] whitespace-nowrap"
            >
              <span className="relative">
                {currentTranslations.logoGuide}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#EA4335] transition-all duration-160 group-hover:w-full" />
              </span>
            </a>
            <a
              href="mailto:report@romainrubens.com?subject=Issue report — romainrubens.com&body=FR : Décrivez le problème rencontré :%0D%0A- De quel type de problème s'agit-il ? (affichage, interaction, traduction, lien, autre)%0D%0A- Détaillez ici le problème :%0D%0A%0D%0A%0D%0AEN : Describe the issue you encountered:%0D%0A- What kind of problem is it? (display, interaction, translation, link, other)%0D%0A- Please describe the issue in detail:%0D%0A%0D%0A%0D%0AՀԱՅ : Նկարագրեք հանդիպած խնդիրը․%0D%0A- Ինչ տեսակի խնդիր է դա (ցուցադրում, փոխազդեցություն, թարգմանություն, հղում, այլ)%0D%0A- Նկարագրեք խնդիրը մանրամասն․%0D%0A%0D%0A%0D%0A"
              className="text-[10px] md:text-xs text-[#3C3C3C] font-medium hover:text-[#EA4335] transition-all duration-160 relative inline-block group active:scale-[0.98] whitespace-nowrap"
            >
              <span className="relative">
                {currentTranslations.reportProblem}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#EA4335] transition-all duration-160 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;