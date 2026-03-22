"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, ExternalLink } from "lucide-react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    portfolio: "Accéder au Portfolio",
    viewCV: "Voir le CV",
    cvTitle: "Curriculum Vitae",
    cvSubtitle: "Romain Rubens"
  },
  EN: {
    portfolio: "Access to Portfolio",
    viewCV: "View Resume",
    cvTitle: "Resume",
    cvSubtitle: "Romain Rubens"
  },
  ՀԱՅ: {
    portfolio: "Դիտել պորտֆոլիոն",
    viewCV: "Դիտել Կենսագրությունը",
    cvTitle: "Կենսագրություն",
    cvSubtitle: "Ռոման Ռուբենս"
  }
};

const allLanguages: Language[] = ["FR", "EN", "ՀԱՅ"];

export default function ResumePage() {
  const [language, setLanguage] = useState<Language>("EN");
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clickedBtn, setClickedBtn] = useState<Language | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const originalOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHeight = document.documentElement.style.height;
    const originalBodyHeight = document.body.style.height;
    
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
    document.body.style.height = "100vh";
    
    const style = document.createElement("style");
    style.id = "resume-page-style";
    style.textContent = `
      html, body {
        overflow: hidden !important;
        height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    document.head.appendChild(style);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    
    const saved = localStorage.getItem("resumeLanguage");
    if (saved && (saved === "FR" || saved === "EN" || saved === "ՀԱՅ")) {
      setLanguage(saved as Language);
    } else {
      localStorage.setItem("resumeLanguage", "EN");
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.height = originalHeight;
      document.body.style.height = originalBodyHeight;
      const styleTag = document.getElementById("resume-page-style");
      if (styleTag) styleTag.remove();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeLanguage", language);
  }, [language]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (isMobile) {
      setClickedBtn(newLang);
      setTimeout(() => setClickedBtn(null), 200);
    }
  };

  const handlePortfolioClick = () => {
    localStorage.setItem("preferredLanguage", language);
    sessionStorage.setItem("comingFromResume", "true");
    router.push("/");
  };

  const getPdfUrl = () => {
    const pdfMap: Record<Language, string> = {
      FR: "/resume/RUBENS_Romain_cv.pdf",
      EN: "/resume/RUBENS_Romain_Resume.pdf",
      ՀԱՅ: "/resume/RUBENS_Romain_Ամփոփում.pdf"
    };
    return pdfMap[language];
  };

  const handleViewPdf = () => {
    window.open(getPdfUrl(), "_blank");
  };

  const getSeparatorConfig = () => {
    if (language === "EN") {
      return { left: false, right: false };
    } else if (language === "FR") {
      return { left: false, right: true };
    } else {
      return { left: true, right: false };
    }
  };

  if (!mounted) {
    return null;
  }

  const getButtonColor = (lang: Language) => {
    if (isMobile && clickedBtn === lang) {
      return "#314DCB";
    }
    return language === lang ? "#314DCB" : "#1d1d1f";
  };

  const getTextColor = (lang: Language) => {
    if (language === lang) {
      return "#FFFFFF";
    }
    return "#FFFFFF";
  };

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", backgroundColor: isMobile ? "#f5f5f5" : "#ffffff", margin: 0, padding: 0, position: "relative" }}>
      {isMobile ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "70px",
            width: "100%",
            height: "calc(100vh - 70px)",
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "24px"
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#1d1d1f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FileText size={40} color="#ffffff" strokeWidth={1.5} />
            </div>
            
            <div>
              <h1 style={{ 
                fontSize: "24px", 
                fontWeight: 700, 
                color: "#333333", 
                margin: "0 0 8px 0",
                letterSpacing: "-0.02em"
              }}>
                {translations[language].cvTitle}
              </h1>
              <p style={{ 
                fontSize: "16px", 
                color: "#666666", 
                margin: 0 
              }}>
                {translations[language].cvSubtitle}
              </p>
            </div>
            
            <button
              onClick={handleViewPdf}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "9999px",
                backgroundColor: "#1d1d1f",
                color: "#FFFFFF",
                border: "none",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s ease"
              }}
            >
              {translations[language].viewCV}
              <ExternalLink size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "0",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <iframe
            key={`pdf-${language}`}
            src={getPdfUrl()}
            style={{ 
              border: "none", 
              margin: 0, 
              padding: 0,
              display: "block",
              width: "100%",
              height: "100%"
            }}
            loading="lazy"
          />
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          zIndex: 1000,
          pointerEvents: "auto"
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: "9999px",
            overflow: "hidden",
            height: "44px",
            backgroundColor: "#1d1d1f",
            border: "2px solid #1d1d1f"
          }}
        >
          {allLanguages.map((lang, index) => {
            const showRightBorder = (language === "FR" && index === 1) || (language === "ՀԱՅ" && index === 0);
            
            return (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              style={{
                backgroundColor: getButtonColor(lang),
                color: getTextColor(lang),
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                flex: 1,
                minWidth: "44px",
                height: "44px",
                padding: "0 8px",
                border: "none",
                borderRight: showRightBorder ? "1px solid #8a8a8a" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                lineHeight: "1",
                marginTop: "-2.5px"
              }}
              onMouseEnter={!isMobile ? (e) => {
                if (language !== lang) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#314DCB";
                }
              } : undefined}
              onMouseLeave={!isMobile ? (e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = getButtonColor(lang);
                (e.currentTarget as HTMLButtonElement).style.color = getTextColor(lang);
              } : undefined}
            >
              {lang}
            </button>
            );
          })}
        </div>

        <button
          onClick={handlePortfolioClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px 14px 24px",
            borderRadius: "9999px",
            backgroundColor: "#1d1d1f",
            color: "#FFFFFF",
            border: "2px solid #1d1d1f",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background-color 0.2s ease",
            lineHeight: "1",
            height: "44px",
            boxSizing: "border-box",
            marginTop: "-2.5px"
          }}
          onMouseEnter={!isMobile ? (e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#314DCB";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#314DCB";
          } : undefined}
          onMouseLeave={!isMobile ? (e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1d1d1f";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1d1d1f";
          } : undefined}
        >
          {translations[language].portfolio}
          <ArrowRight 
            size={16} 
            style={{ 
              display: "inline",
              strokeWidth: 2,
              vectorEffect: "non-scaling-stroke"
            }} 
          />
        </button>
      </div>
    </div>
  );
}
