"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Languages, Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle, ThemeToggleMobile } from "@/components/ThemeToggle";

// Animated Burger Icon Component
const AnimatedBurgerIcon = ({ isOpen, isDark }: { isOpen: boolean, isDark: boolean }) => {
  const bgColor = isDark ? "bg-[#FFFFFF]" : "bg-[#1d1d1f]";
  return (
    <div className="relative flex flex-col justify-center items-center" style={{ width: "18px", height: "18px" }}>
      <span
        className={`absolute h-0.5 ${bgColor} transition-all duration-500 ease-in-out`}
        style={{
          width: "18px",
          transform: isOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-5px) rotate(0deg)',
        }}
      />
      <span
        className={`absolute h-0.5 ${bgColor} transition-all duration-500 ease-in-out`}
        style={{
          width: "18px",
          transform: isOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(5px) rotate(0deg)',
        }}
      />
    </div>
  );
};

// Logo image component
const LogoIcon = (props: React.ImgHTMLAttributes<HTMLImageElement> & { isDark?: boolean; iconSrc?: string }) => {
  const { isDark, iconSrc = "/icons/icon.svg", ...imgProps } = props;
  return (
    <img
      src={iconSrc}
      alt="Romain Rubens"
      role="img"
      width={32}
      height={32}
      {...imgProps}
    />
  );
};

// Translation data
const translations = {
  FR: {
    home: "Accueil",
    projects: "Projets",
    skills: "Compétences",
    explorations: "Explorations",
    contact: "Contact",
    resume: "CV"
  },
  EN: {
    home: "Home",
    projects: "Projects",
    skills: "Skills",
    explorations: "Explorations",
    contact: "Contact",
    resume: "Resume"
  },
  ՀԱՅ: {
    home: "Գլխավոր",
    projects: "Նախագծեր",
    skills: "Հմտություններ",
    explorations: "Հետազոտություններ",
    contact: "Կապ",
    resume: "Ռեզյումե"
  }
};
const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
  isScrolled,
  onToggle,
  isDark
}: {selectedLanguage: string;onLanguageChange: (lang: string) => void; isScrolled: boolean; onToggle: (open: boolean) => void; isDark: boolean}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  // Fixed width to accommodate globe icon
  const FIXED_WIDTH = 42;
  
  // Animation timing
  const TOOLBAR_ANIMATION_DURATION = 300;
  const LANGUAGE_CHANGE_DELAY = 500;

  // Show ALL languages
  const allLanguages = ["FR", "EN", "ՀԱՅ"];
  
  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const topPosition = 64;
        setDropdownPosition({
          top: topPosition,
          left: buttonRect.left
        });
        setIsPositioned(true);
      }
    };

    if (shouldShowDropdown) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setIsPositioned(false);
    }
  }, [shouldShowDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShouldShowDropdown(false);
        onToggle(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShouldShowDropdown(false);
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onToggle]);

  const handleLanguageSelect = (code: string) => {
    onLanguageChange(code);
    setTimeout(() => {
      setIsOpen(false);
      setShouldShowDropdown(false);
      onToggle(false);
    }, LANGUAGE_CHANGE_DELAY);
  };

  const handleClick = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 200);
    
    if (!isOpen) {
      onToggle(true);
      setIsOpen(true);
      setTimeout(() => {
        setShouldShowDropdown(true);
      }, TOOLBAR_ANIMATION_DURATION);
    } else {
      setIsOpen(false);
      setShouldShowDropdown(false);
      onToggle(false);
    }
  };

  const textColor      = isDark ? "#FFFFFF" : "#1d1d1f";
  const bgColor        = isDark ? "#191919" : "#FFFFFF";
  const hoverBgColor   = isDark ? "#343434" : "#F5F5F7";
  const borderColor    = isDark ? "#616161" : "#D3D3D4";
  const selectedBg     = isDark ? "#314DCB" : "#1d1d1f";
  const selectedBorder = isDark ? "#5194FF" : "transparent";
  const selectedColor  = "#FFFFFF";

  return (
    <div className="relative" ref={dropdownRef} style={{ margin: 0, padding: 0 }}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="flex items-center justify-center h-full transition-all hover:opacity-70"
        aria-label="Select language"
        aria-expanded={isOpen}
        style={{
          minWidth: `${FIXED_WIDTH}px`,
          width: `${FIXED_WIDTH}px`,
          padding: 0,
          margin: 0,
          border: 'none',
          background: 'none',
          color: textColor,
          transitionDuration: "180ms",
          transitionTimingFunction: "ease-in-out",
          transitionProperty: "opacity, transform",
          transform: isClicking ? "scale(0.92)" : "scale(1)"
        }}>
        <Languages className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </button>
      
      {isPositioned && (
        <div
          className={`fixed overflow-hidden transition-all ${
            shouldShowDropdown 
              ? "opacity-100 translate-y-0 duration-[240ms] ease-in-out" 
              : "opacity-0 -translate-y-2 pointer-events-none duration-[200ms] ease-in-out"
          }`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${FIXED_WIDTH}px`,
            borderRadius: "0 0 8px 8px",
            borderLeft: `1px solid ${borderColor}`,
            borderRight: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
            borderTop: "none",
            backgroundColor: bgColor,
            zIndex: 1001
          }}>

          <div className="flex flex-col">
            {allLanguages.map((lang) => {
              const isSelected = lang === selectedLanguage;
              return (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className="w-full py-2 text-center transition-all duration-[200ms]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: "14px",
                    padding: "8px 0",
                    backgroundColor: isSelected ? selectedBg : "transparent",
                    color: isSelected ? selectedColor : textColor,
                    border: `1px solid ${isSelected ? selectedBorder : "transparent"}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = hoverBgColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}>
                  <span className="uppercase">{lang}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const ResumeButton = ({ selectedLanguage, isDark }: { selectedLanguage: "FR" | "EN" | "ՀԱՅ", isDark: boolean }) => {
  const currentTranslations = translations[selectedLanguage];
  const [resumeValidating, setResumeValidating] = useState(false);
  
  const handleDownload = () => {
    setResumeValidating(true);
    setTimeout(() => {
      setResumeValidating(false);
    }, 2200);
    
    const pdfFiles = {
      FR: "/resume/RUBENS_Romain_cv.pdf",
      EN: "/resume/RUBENS_Romain_Resume.pdf",
      ՀԱՅ: "/resume/RUBENS_Romain_Ամփոփում.pdf"
    };
    
    const pdfUrl = pdfFiles[selectedLanguage];
    const pdfFileNames = {
      FR: "RUBENS_Romain_cv.pdf",
      EN: "RUBENS_Romain_Resume.pdf",
      ՀԱՅ: "RUBENS_Romain_Ամփոփում.pdf"
    };
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfFileNames[selectedLanguage];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bgColor = isDark ? "#314DCB" : "#1d1d1f";
  const btnBorder = isDark ? "#5194FF" : "transparent";
  const textColor = "#ffffff";

  return (
    <button
      onClick={handleDownload}
      disabled={resumeValidating}
      className="relative flex items-center justify-center transition-all font-medium text-sm no-underline disabled:cursor-not-allowed"
      aria-label={`Download ${currentTranslations.resume}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${btnBorder}`,
        borderRadius: "980px",
        padding: "8px 16px",
        height: "36px",
        minWidth: "95px",
        width: "95px",
        transitionDuration: "180ms",
        transitionTimingFunction: "ease-in-out",
        transitionProperty: "opacity, background-color, transform",
        outline: "none",
        boxShadow: "none"
      }}
      onMouseEnter={(e) => {
        if (!resumeValidating) {
          e.currentTarget.style.opacity = "0.85";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
      onMouseDown={(e) => {
        if (!resumeValidating) {
          e.currentTarget.style.transform = "scale(0.97)";
        }
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}>
      <span style={{ textAlign: "center", width: "100%" }}>{currentTranslations.resume}</span>
      
      <div 
        className={`absolute inset-0 flex items-center justify-center rounded-[980px] transition-opacity ${
          resumeValidating ? 'opacity-100 duration-[200ms]' : 'opacity-0 duration-[180ms] pointer-events-none'
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <Check 
          className="w-5 h-5" 
          strokeWidth={2.5} 
          style={{ color: textColor }}
        />
      </div>
    </button>
  );
};

const GlobalNavigation = ({ onShowQuotes }: { onShowQuotes?: () => void }) => {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const isExplorationsPage = pathname === "/explorations";
  const logoIconSrc = isScrolled
    ? (isDark ? "/icons/icon.short.white.svg" : "/icons/icon.short.svg")
    : (isDark ? "/icons/icon.white.svg" : "/icons/icon.svg");

  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !translations[saved]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
  }, []);

  const handleLanguageChange = (lang: string) => {
    const validLang = lang as "FR" | "EN" | "ՀԱՅ";
    setSelectedLanguage(validLang);
    localStorage.setItem("preferredLanguage", validLang);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: validLang }));
  };

  const handleLogoClick = () => {
    setLogoAnimating(true);
    setTimeout(() => setLogoAnimating(false), 260);
    if (onShowQuotes) onShowQuotes();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!languageDropdownOpen && !isMenuOpen) {
        setIsScrolled(window.scrollY > 8);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [languageDropdownOpen, isMenuOpen]);

  const handleLanguageDropdownToggle = (open: boolean) => {
    setLanguageDropdownOpen(open);
    if (open) {
      setIsScrolled(false);
    } else {
      if (!isMenuOpen) {
        setIsScrolled(window.scrollY > 8);
      }
    }
  };

  const handleMenuToggle = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    if (newMenuState) {
      setIsScrolled(false);
    } else {
      if (window.scrollY > 8) {
        setIsScrolled(true);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    window.dispatchEvent(new CustomEvent("menuStateChange", { detail: isMenuOpen }));
  }, [isMenuOpen]);

  useEffect(() => {
    const handleLightboxStateChange = (event: CustomEvent<boolean>) => {
      setIsLightboxOpen(event.detail);
    };
    window.addEventListener("flashconceptLightboxStateChange", handleLightboxStateChange as EventListener);
    window.addEventListener("vahanLightboxStateChange", handleLightboxStateChange as EventListener);
    return () => {
      window.removeEventListener("flashconceptLightboxStateChange", handleLightboxStateChange as EventListener);
      window.removeEventListener("vahanLightboxStateChange", handleLightboxStateChange as EventListener);
    };
  }, []);

  const currentTranslations = translations[selectedLanguage];

  const navLinks = [
    { name: currentTranslations.home, href: "/" },
    { name: currentTranslations.projects, href: "/projects" },
    { name: currentTranslations.skills, href: "/skills" },
    { name: currentTranslations.explorations, href: "/explorations" },
    { name: currentTranslations.contact, href: "/contact" }
  ];

  const prefersReducedMotion = useMemo(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
    []);

  const textColor    = "var(--theme-fg)";
  const navBgColor   = "var(--theme-nav-bg)";
  const borderColor  = "var(--theme-border)";
  const scrolledBgColor = "var(--theme-nav-scrolled)";

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ease-in-out ${
          isLightboxOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          paddingTop: isScrolled ? "12px" : "0",
          paddingLeft: isScrolled ? "12px" : "0",
          paddingRight: isScrolled ? "12px" : "0"
        }}>

        <div
          className={`transition-all duration-300 ease-in-out ${
            isScrolled ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""
          }`}
          style={{
            backgroundColor: isScrolled ? scrolledBgColor : navBgColor,
            backdropFilter: isScrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
            borderRadius: isScrolled ? "980px" : "0",
            borderBottom: isScrolled ? "none" : `1px solid ${borderColor}`
          }}>
          <div className="mx-auto h-16 max-w-[1200px] px-6">
            <nav role="navigation" aria-label="Navigation principale" className="flex h-full w-full items-center justify-between">
              <div className="hidden h-full w-full items-center justify-between lg:flex">
                <a
                  href="/"
                  onClick={handleLogoClick}
                  aria-label="Home"
                  className={`flex items-center hover:opacity-80 transition-all h-full cursor-pointer relative ${
                    prefersReducedMotion ? (logoAnimating ? 'opacity-60' : 'opacity-100') : ''
                  }`}
                  style={{
                    color: textColor,
                    transitionDuration: prefersReducedMotion ? '120ms' : '230ms',
                    transform: logoAnimating && !prefersReducedMotion ? 'scale(0.98)' : 'scale(1)',
                    overflow: 'hidden'
                  }}>
                  <LogoIcon className="h-4 w-auto fill-current relative z-10" isDark={isExplorationsPage} iconSrc={logoIconSrc} />
                </a>
                
                <div className="flex items-center h-full gap-10">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className="flex items-center transition-all h-full font-medium text-sm px-3 no-underline hover:underline focus-visible:underline active:hover:underline"
                      style={{
                        color: textColor,
                        textDecorationColor: textColor,
                        textDecorationThickness: "1px",
                        textUnderlineOffset: "2px",
                        transitionDuration: "180ms",
                        transitionTimingFunction: "ease-in-out"
                      }}>
                      {link.name}
                    </Link>
                  ))}
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                    isScrolled={isScrolled}
                    onToggle={handleLanguageDropdownToggle}
                    isDark={isDark} />
                  <ThemeToggle />
                  <ResumeButton selectedLanguage={selectedLanguage} isDark={isDark} />
                </div>
              </div>

              <div className="flex w-full items-center justify-between lg:hidden">
                <a
                  href="/"
                  onClick={handleLogoClick}
                  aria-label="Home"
                  className={`flex items-center hover:opacity-80 transition-all cursor-pointer relative ${
                    prefersReducedMotion ? (logoAnimating ? 'opacity-60' : 'opacity-100') : ''
                  }`}
                  style={{
                    color: textColor,
                    transitionDuration: prefersReducedMotion ? '120ms' : '230ms',
                    transform: logoAnimating && !prefersReducedMotion ? 'scale(0.98)' : 'scale(1)',
                    overflow: 'hidden'
                  }}>
                  <LogoIcon className="h-3.5 w-auto fill-current relative z-10" isDark={isExplorationsPage} iconSrc={logoIconSrc} />
                </a>
                <div className="flex items-center h-9 gap-5">
                  <ResumeButton selectedLanguage={selectedLanguage} isDark={isDark} />
                  <div className="flex items-center justify-center h-9">
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={handleLanguageChange}
                      isScrolled={isScrolled}
                      onToggle={handleLanguageDropdownToggle}
                      isDark={isDark} />
                  </div>
                  <button
                    onClick={handleMenuToggle}
                    className="flex items-center justify-center h-9 transition-opacity duration-200 hover:opacity-80"
                    style={{ color: textColor }}
                    aria-label="Toggle menu">
                    <AnimatedBurgerIcon isOpen={isMenuOpen} isDark={isDark} />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 top-16 z-40 transition-all duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ backgroundColor: navBgColor }}
      >
        <div className="h-full overflow-y-auto px-6 pt-8 flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-4 text-lg font-medium border-b hover:opacity-80 transition-opacity"
                style={{ color: textColor, borderColor: borderColor }}
                onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </div>
          <ThemeToggleMobile selectedLanguage={selectedLanguage} borderColor={borderColor} />
        </div>
      </div>
    </>
  );
};

export default GlobalNavigation;
