"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const contactTranslations = {
  FR: {
    heading: "Prenez contact",
    downloadPortfolio: "Télécharger mon Portfolio (.pdf)",
    viewResume: "Voir mon CV",
    viewLinkedIn: "Voir mon LinkedIn",
    emailMe: "M'envoyer un mail",
    readMedium: "Me lire sur Medium",
    explorePinterest: "Explorer mon Pinterest",
    viewBehance: "Voir mon Behance",
  },
  EN: {
    heading: "Get in touch",
    downloadPortfolio: "Download my Portfolio (.pdf)",
    viewResume: "View my Resume",
    viewLinkedIn: "View my LinkedIn",
    emailMe: "Email me",
    readMedium: "Read me on Medium",
    explorePinterest: "Explore my Pinterest",
    viewBehance: "View my Behance",
  },
  ՀԱՅ: {
    heading: "Կապ հաստատեք",
    downloadPortfolio: "Ներբեռնել իմ Պորտֆոլիո (.pdf)",
    viewResume: "Տեսնել իմ CV",
    viewLinkedIn: "Տեսնել իմ LinkedIn",
    emailMe: "Ուղարկել ինձ էլ․փոստ",
    readMedium: "Կարդացեք ինձ Medium-ում",
    explorePinterest: "Բացահայտեք իմ Pinterest-ը",
    viewBehance: "Տեսնել իմ Behance",
  },
};

const PDFIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2H5C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9l-7-7z" fill="currentColor" />
    <path d="M16 9h-7V2v7z" fill="currentColor" opacity="0.3" />
  </svg>
);

const GmailLogo = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 4H2C0.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-10 6L2 8V6l10 6 10-6v2z" fill="currentColor" />
  </svg>
);

const LinkedInLogo = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MediumLogo = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const PinterestLogo = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.396 2.966 7.396 6.929 0 4.135-2.607 7.462-6.225 7.462-1.214 0-2.354-.629-2.746-1.373l-.749 2.853c-.271 1.031-1.002 2.324-1.492 3.12 1.13.348 2.324.537 3.559.537 6.621 0 11.988-5.367 11.988-11.987C23.987 5.367 18.621 0 12.017 0z" />
  </svg>
);

const BehanceLogo = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3333 3333" fill="currentColor" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
    <path d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm-408 1059c57 0 109 5 156 15s87 27 121 49c33 23 59 53 78 91 18 37 27 85 27 140 0 60-14 110-41 151-28 40-68 73-122 99 74 21 128 58 164 111s54 117 54 192c0 61-12 113-35 157-24 44-55 80-94 108s-85 49-136 62c-50 13-102 20-156 20H696V1060h563zm704 96h484v118h-484v-118zm108 890c36 35 87 52 154 52 48 0 90-12 124-36s55-50 63-77h209c-34 104-85 178-154 223s-153 67-250 67c-68 0-129-11-184-33s-101-53-140-93c-38-40-67-88-88-144-20-56-31-118-31-184 0-65 11-125 32-181 22-56 51-104 91-145 39-41 86-73 140-96 54-24 114-35 181-35 73 0 137 14 192 43 55 28 100 67 135 115s60 103 76 164 21 125 17 193h-624c0 68 23 133 59 167zm273-454c-28-31-76-48-134-48-38 0-69 6-94 19s-45 29-60 48-26 39-32 61c-6 21-10 40-11 57h387c-6-61-27-105-55-137zm-1118-50c47 0 85-11 116-33 30-22 45-58 45-108 0-28-5-51-15-69s-24-32-41-42-36-17-58-21-44-6-67-6H960v279h266zm14 508c26 0 50-2 73-8 24-5 44-13 62-25 17-12 32-27 43-48 11-20 16-46 16-77 0-61-17-105-52-132-34-26-80-39-137-39H960v329h281v1z"/>
  </svg>
);

export default function ContactPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !contactTranslations[saved]) {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const currentTranslations = contactTranslations[selectedLanguage];

  const handleDownloadPortfolio = () => {
    const link = document.createElement("a");
    link.href = "/resume/RUBENS Romain (Portfolio).pdf";
    link.download = "RUBENS_Romain_Portfolio.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewResume = () => {
    localStorage.setItem("resumeLanguage", selectedLanguage);
    router.push("/resume");
  };

  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/in/romain-rubens-ba660323b/", "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    window.location.href = "mailto:hello@romainrubens.com?subject=Contact — romainrubens.com";
  };

  const handleMedium = () => {
    window.open("https://medium.com/@romainrubens/01-un-jour-je-serai-designer-d8662f384749", "_blank", "noopener,noreferrer");
  };

  const handlePinterest = () => {
    window.open("https://www.pinterest.com/rubensromain/_created", "_blank", "noopener,noreferrer");
  };

  const handleBehance = () => {
    window.open("https://www.behance.net/rubensromain", "_blank", "noopener,noreferrer");
  };

  return (
    <main
      id="main-content"
      className="min-h-screen pt-20 md:pt-24"
      style={{ fontFamily: "var(--font-body)", backgroundColor: "var(--theme-bg-alt)" }}
    >
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-24">
        <div className="w-full max-w-md text-center">
          <h1
            className={`font-bold text-3xl md:text-5xl mb-12 md:mb-16 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
              color: "var(--theme-fg)",
            }}
          >
            {currentTranslations.heading}
          </h1>

          <div
            className={`flex flex-col gap-3 md:gap-4 transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            {/* Download Portfolio Button */}
            <button
              onClick={handleDownloadPortfolio}
              className="w-full py-4 px-6 bg-[#314DCB] text-white font-semibold text-base rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <PDFIcon className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.downloadPortfolio}</span>
            </button>

            {/* View Resume Button */}
            <button
              onClick={handleViewResume}
              className="w-full py-4 px-6 font-semibold text-base rounded-full border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2" style={{ backgroundColor: "var(--theme-card-bg)", color: "var(--theme-fg)", borderColor: "var(--theme-border)" }}
            >
              <PDFIcon className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.viewResume}</span>
            </button>

            {/* View LinkedIn Button */}
            <button
              onClick={handleLinkedIn}
              className="w-full py-4 px-6 font-semibold text-base rounded-full border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2" style={{ backgroundColor: "var(--theme-card-bg)", color: "var(--theme-fg)", borderColor: "var(--theme-border)" }}
            >
              <LinkedInLogo className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.viewLinkedIn}</span>
            </button>

            {/* Email Button */}
            <button
              onClick={handleEmail}
              className="w-full py-4 px-6 font-semibold text-base rounded-full border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2" style={{ backgroundColor: "var(--theme-card-bg)", color: "var(--theme-fg)", borderColor: "var(--theme-border)" }}
            >
              <GmailLogo className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.emailMe}</span>
            </button>

            {/* Read Medium Button */}
            <button
              onClick={handleMedium}
              className="w-full py-4 px-6 font-semibold text-base rounded-full border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2" style={{ backgroundColor: "var(--theme-card-bg)", color: "var(--theme-fg)", borderColor: "var(--theme-border)" }}
            >
              <MediumLogo className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.readMedium}</span>
            </button>

            {/* Explore Pinterest Button */}
            <button
              onClick={handlePinterest}
              className="w-full py-4 px-6 font-semibold text-base rounded-full border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2" style={{ backgroundColor: "var(--theme-card-bg)", color: "var(--theme-fg)", borderColor: "var(--theme-border)" }}
            >
              <PinterestLogo className="w-4 h-4 flex-shrink-0 overflow-visible" />
              <span>{currentTranslations.explorePinterest}</span>
            </button>

            {/* View Behance Button */}
            <button
              onClick={handleBehance}
              className="w-full py-4 px-6 font-semibold text-base rounded-full border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2" style={{ backgroundColor: "var(--theme-card-bg)", color: "var(--theme-fg)", borderColor: "var(--theme-border)" }}
            >
              <BehanceLogo className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.viewBehance}</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
