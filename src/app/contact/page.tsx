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
    viewBehance: "Voir mon Behance (À venir)",
  },
  EN: {
    heading: "Get in touch",
    downloadPortfolio: "Download my Portfolio (.pdf)",
    viewResume: "View my Resume",
    viewLinkedIn: "View my LinkedIn",
    emailMe: "Email me",
    readMedium: "Read me on Medium",
    explorePinterest: "Explore my Pinterest",
    viewBehance: "View my Behance (Coming soon)",
  },
  ՀԱՅ: {
    heading: "Կապ հաստատեք",
    downloadPortfolio: "Ներբեռնել իմ Պորտֆոլիո (.pdf)",
    viewResume: "Տեսնել իմ CV",
    viewLinkedIn: "Տեսնել իմ LinkedIn",
    emailMe: "Ուղարկել ինձ էլ․փոստ",
    readMedium: "Կարդացեք ինձ Medium-ում",
    explorePinterest: "Բացահայտեք իմ Pinterest-ը",
    viewBehance: "Տեսնել իմ Behance (Շատ շուտով)",
  },
};

const PDFIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2H5C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9l-7-7z" fill="currentColor" />
    <path d="M16 9h-7V2v7z" fill="currentColor" opacity="0.3" />
  </svg>
);

const GmailLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 4H2C0.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-10 6L2 8V6l10 6 10-6v2z" fill="currentColor" />
  </svg>
);

const LinkedInLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MediumLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const PinterestLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.396 2.966 7.396 6.929 0 4.135-2.607 7.462-6.225 7.462-1.214 0-2.354-.629-2.746-1.373l-.749 2.853c-.271 1.031-1.002 2.324-1.492 3.12 1.13.348 2.324.537 3.559.537 6.621 0 11.988-5.367 11.988-11.987C23.987 5.367 18.621 0 12.017 0z" />
  </svg>
);

const BehanceLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.228h-8.949c.02 1.892 1.087 2.972 2.367 2.972 1.218 0 1.895-.584 2.287-1.335h3.923zM14.27 10.11h4.905c-.147-1.344-.933-2.148-2.477-2.148-1.559 0-2.586.886-2.428 2.148zM3.5 5h8v2h-8zm0 5h8v2h-8zm0 5h8v2h-8z" />
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
      className="min-h-screen bg-[#F5F5F5] pt-20 md:pt-24"
      style={{
        fontFamily: "var(--font-body)",
      }}
    >
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-24">
        <div className="w-full max-w-md text-center">
          <h1
            className={`font-bold text-[#1d1d1f] text-3xl md:text-5xl mb-12 md:mb-16 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
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
              className="w-full py-4 px-6 bg-white text-[#1d1d1f] font-semibold text-base rounded-full border border-[#d3d3d4] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <PDFIcon className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.viewResume}</span>
            </button>

            {/* View LinkedIn Button */}
            <button
              onClick={handleLinkedIn}
              className="w-full py-4 px-6 bg-white text-[#1d1d1f] font-semibold text-base rounded-full border border-[#d3d3d4] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <LinkedInLogo className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.viewLinkedIn}</span>
            </button>

            {/* Email Button */}
            <button
              onClick={handleEmail}
              className="w-full py-4 px-6 bg-white text-[#1d1d1f] font-semibold text-base rounded-full border border-[#d3d3d4] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <GmailLogo className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.emailMe}</span>
            </button>

            {/* Read Medium Button */}
            <button
              onClick={handleMedium}
              className="w-full py-4 px-6 bg-white text-[#1d1d1f] font-semibold text-base rounded-full border border-[#d3d3d4] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <MediumLogo className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.readMedium}</span>
            </button>

            {/* Explore Pinterest Button */}
            <button
              onClick={handlePinterest}
              className="w-full py-4 px-6 bg-white text-[#1d1d1f] font-semibold text-base rounded-full border border-[#d3d3d4] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <PinterestLogo className="w-4 h-4 flex-shrink-0" />
              <span>{currentTranslations.explorePinterest}</span>
            </button>

            {/* View Behance Button */}
            <button
              onClick={handleBehance}
              className="w-full py-4 px-6 bg-white text-[#1d1d1f] font-semibold text-base rounded-full border border-[#d3d3d4] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
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
