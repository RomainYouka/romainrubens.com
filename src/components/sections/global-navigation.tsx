"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Languages, Check, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import type { AccentColor } from "@/contexts/ThemeContext";
import { ThemeToggle, ThemeToggleMobile } from "@/components/ThemeToggle";
import { usePageTransition } from "@/contexts/PageTransitionContext";
import { detectLanguage, type Language } from "@/lib/language";
import { Analytics } from "@/lib/analytics";

// ─── Accent options ──────────────────────────────────────────────────────────
const ACCENT_OPTIONS: { id: AccentColor; light: string; dark: string; mono?: boolean }[] = [
  { id: "blue",   light: "#314DCB", dark: "#5194FF" },
  { id: "pink",   light: "#B2003A", dark: "#FF376C" },
  { id: "green",  light: "#004430", dark: "#53C999" },
  { id: "orange", light: "#B24400", dark: "#FFA269" },
  { id: "mono",   light: "#1d1d1f", dark: "#f5f5f5", mono: true },
];

// ─── Animated burger ────────────────────────────────────────────────────────
const AnimatedBurgerIcon = ({ isOpen, isDark }: { isOpen: boolean; isDark: boolean }) => {
  const bg = isDark ? "bg-[#FFFFFF]" : "bg-[#1d1d1f]";
  return (
    <div className="relative flex flex-col justify-center items-center" style={{ width: 18, height: 18 }}>
      <span
        className={`absolute h-0.5 ${bg} transition-all duration-500 ease-in-out`}
        style={{ width: 18, transform: isOpen ? "translateY(0) rotate(45deg)" : "translateY(-5px) rotate(0deg)" }}
      />
      <span
        className={`absolute h-0.5 ${bg} transition-all duration-500 ease-in-out`}
        style={{ width: 18, transform: isOpen ? "translateY(0) rotate(-45deg)" : "translateY(5px) rotate(0deg)" }}
      />
    </div>
  );
};

// ─── Brand logo ──────────────────────────────────────────────────────────────
const BrandLogo = ({ isScrolled, className }: { isScrolled: boolean; className?: string }) => {
  const basename = isScrolled ? "logo-rubens" : "logo-romain-rubens";
  const src = `/icons/${basename}.svg`;
  const width = isScrolled ? 389 : 699;
  const maskStyles: React.CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  return (
    <span
      role="img"
      aria-label={isScrolled ? "Rubens" : "Romain Rubens"}
      className={`relative block flex-none ${className ?? ""}`}
      style={{ ...maskStyles, aspectRatio: `${width} / 76`, backgroundColor: "var(--theme-fg)" }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 aspect-square"
        style={{
          WebkitMaskImage: "url(/icons/icon.svg)",
          maskImage: "url(/icons/icon.svg)",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          backgroundColor: "var(--theme-accent)",
        }}
      />
    </span>
  );
};

// ─── Traductions nav ─────────────────────────────────────────────────────────
const translations = {
  FR:  { home: "Accueil", projects: "Projets",    skills: "Compétences",   contact: "Contact", resume: "CV",      accentLabel: "Couleur principale" },
  EN:  { home: "Home",    projects: "Projects",   skills: "Skills",        contact: "Contact", resume: "Resume",  accentLabel: "Main color"         },
  ՀԱՅ: { home: "Գլխավոր", projects: "Նախագծեր", skills: "Հմտություններ", contact: "Կապ",     resume: "Ռեզյումե", accentLabel: "Հիմնական գույն"  },
};

// ─── Bouton CV ───────────────────────────────────────────────────────────────
const ResumeButton = ({ selectedLanguage, isDark, compact = false }: { selectedLanguage: Language; isDark: boolean; compact?: boolean }) => {
  const t = translations[selectedLanguage];
  const [validating, setValidating] = useState(false);
  const compactWidth: Record<Language, number> = { FR: 60, EN: 72, ՀԱՅ: 80 };
  const buttonWidth = compact ? compactWidth[selectedLanguage] : 95;

  const handleDownload = () => {
    setValidating(true);
    setTimeout(() => setValidating(false), 2200);
    const files: Record<Language, string> = {
      FR: "/resume/RUBENS_Romain_cv.pdf",
      EN: "/resume/RUBENS_Romain_Resume.pdf",
      ՀԱՅ: "/resume/RUBENS_Romain_Ամփոփում.pdf",
    };
    const names: Record<Language, string> = {
      FR: "RUBENS_Romain_cv.pdf",
      EN: "RUBENS_Romain_Resume.pdf",
      ՀԱՅ: "RUBENS_Romain_Ամփոփում.pdf",
    };
    const a = document.createElement("a");
    a.href = files[selectedLanguage];
    a.download = names[selectedLanguage];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={validating}
      aria-label={`Download ${t.resume}`}
      className="relative flex items-center justify-center font-medium text-sm no-underline disabled:cursor-not-allowed"
      style={{
        backgroundColor: "var(--theme-accent)", color: "var(--theme-accent-fg)",
        border: `1px solid var(--theme-accent)`,
        borderRadius: 980, padding: compact ? "8px 12px" : "8px 16px", height: 36,
        minWidth: buttonWidth, width: buttonWidth,
        transition: "opacity 180ms ease, background-color 180ms ease, transform 180ms ease",
        outline: "none",
      }}
      onMouseEnter={(e) => { if (!validating) e.currentTarget.style.opacity = "0.85"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseDown={(e) => { if (!validating) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <span style={{ textAlign: "center", width: "100%", fontSize: compact && selectedLanguage === "ՀԱՅ" ? 12 : undefined }}>
        {t.resume}
      </span>
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-[980px] transition-opacity ${
          validating ? "opacity-100 duration-[200ms]" : "opacity-0 duration-[180ms] pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--theme-accent)" }}
      >
        <Check className="w-5 h-5" style={{ color: "var(--theme-accent-fg)" }} strokeWidth={2.5} />
      </div>
    </button>
  );
};

// ─── Sélecteur de langue ─────────────────────────────────────────────────────
interface LangSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  isDark: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  languages?: readonly string[];
}

const LanguageSelector = ({ selectedLanguage, onLanguageChange, isDark, isOpen, onOpen, onClose, languages = ["FR", "EN", "ՀԱՅ"] }: LangSelectorProps) => {
  const buttonRef   = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState<{ top: number; left: number }>({ top: 80, left: 0 });

  useEffect(() => {
    if (!isOpen) return;
    const calc = () => {
      if (!buttonRef.current) return;
      const r = buttonRef.current.getBoundingClientRect();
      const dropW = dropdownRef.current?.offsetWidth ?? 80;
      setDropPos({ top: r.bottom + 8, left: r.left + r.width / 2 - dropW / 2 });
    };
    calc();
    const t = setTimeout(calc, 420);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 60);
    const handler = (e: MouseEvent) => {
      if (!armed) return;
      if (!buttonRef.current?.offsetParent) return;
      if (!buttonRef.current?.contains(e.target as Node) && !dropdownRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => { clearTimeout(arm); document.removeEventListener("mousedown", handler); };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleSelect = (lang: string) => { onLanguageChange(lang); onClose(); };

  const textColor  = isDark ? "#FFFFFF" : "#1d1d1f";
  const dropBg     = isDark ? "rgba(24,24,28,0.97)"    : "rgba(252,252,254,0.97)";
  const dropBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const divider    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const hoverBg    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Changer la langue"
        className="flex items-center justify-center"
        style={{
          minWidth: 42, width: 42, height: "100%",
          background: "none", border: "none", padding: 0, cursor: "pointer",
          color: textColor,
          transition: "opacity 180ms ease, transform 180ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        onMouseDown={(e)  => { e.currentTarget.style.transform = "scale(0.90)"; }}
        onMouseUp={(e)    => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Languages className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            role="listbox"
            aria-label="Sélection de la langue"
            initial={{ opacity: 0, scaleY: 0,   filter: "blur(6px)" }}
            animate={{ opacity: 1, scaleY: 1,   filter: "blur(0px)" }}
            exit={  { opacity: 0, scaleY: 0,   filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 22, mass: 0.65 }}
            style={{
              position:             "fixed",
              top:                  dropPos.top,
              left:                 dropPos.left,
              transformOrigin:      "top center",
              backgroundColor:      dropBg,
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border:               `1px solid ${dropBorder}`,
              borderRadius:         14,
              overflow:             "hidden",
              zIndex:               1100,
              minWidth:             80,
              maxHeight:            "min(70vh, 520px)",
              overflowY:            "auto",
              boxShadow: isDark
                ? "0 16px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)"
                : "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            {languages.map((lang, idx) => {
              const isSel = lang === selectedLanguage;
              return (
                <button
                  key={lang}
                  role="option"
                  aria-selected={isSel}
                  onClick={() => handleSelect(lang)}
                  style={{
                    display:      "block",
                    width:        "100%",
                    padding:      "12px 22px",
                    textAlign:    "center",
                    fontSize:     14,
                    fontFamily:   "var(--font-body)",
                    fontWeight:   isSel ? 600 : 500,
                    background:   isSel ? "var(--theme-accent)" : "transparent",
                    color:        isSel ? "var(--theme-accent-fg)" : textColor,
                    border:       "none",
                    cursor:       "pointer",
                    transition:   "background 140ms ease",
                    borderBottom: idx < languages.length - 1 ? `1px solid ${divider}` : "none",
                  }}
                  onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = hoverBg; }}
                  onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
                >
                  {lang}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Sélecteur de couleur d'accent ──────────────────────────────────────────
interface ColorPickerProps {
  accentColor: AccentColor;
  onAccentChange: (color: AccentColor) => void;
  isDark: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  options?: typeof ACCENT_OPTIONS;
}

const ColorPicker = ({ accentColor, onAccentChange, isDark, isOpen, onOpen, onClose, options = ACCENT_OPTIONS }: ColorPickerProps) => {
  const buttonRef   = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState<{ top: number; left: number }>({ top: 80, left: 0 });

  useEffect(() => {
    if (!isOpen) return;
    const calc = () => {
      if (!buttonRef.current) return;
      const r = buttonRef.current.getBoundingClientRect();
      const dropW = dropdownRef.current?.offsetWidth ?? 120;
      setDropPos({ top: r.bottom + 8, left: r.left + r.width / 2 - dropW / 2 });
    };
    calc();
    const t = setTimeout(calc, 420);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 60);
    const handler = (e: MouseEvent) => {
      if (!armed) return;
      if (!buttonRef.current?.offsetParent) return;
      if (!buttonRef.current?.contains(e.target as Node) && !dropdownRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => { clearTimeout(arm); document.removeEventListener("mousedown", handler); };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const textColor  = isDark ? "#FFFFFF" : "#1d1d1f";
  const dropBg     = isDark ? "rgba(24,24,28,0.97)"    : "rgba(252,252,254,0.97)";
  const dropBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
        aria-label="Changer la couleur principale"
        className="flex items-center justify-center"
        style={{
          minWidth: 42, width: 42, height: "100%",
          background: "none", border: "none", padding: 0, cursor: "pointer",
          color: textColor,
          transition: "opacity 180ms ease, transform 180ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        onMouseDown={(e)  => { e.currentTarget.style.transform = "scale(0.90)"; }}
        onMouseUp={(e)    => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Palette className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scaleY: 0,   filter: "blur(6px)" }}
            animate={{ opacity: 1, scaleY: 1,   filter: "blur(0px)" }}
            exit={  { opacity: 0, scaleY: 0,   filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 22, mass: 0.65 }}
            style={{
              position:             "fixed",
              top:                  dropPos.top,
              left:                 dropPos.left,
              transformOrigin:      "top center",
              backgroundColor:      dropBg,
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border:               `1px solid ${dropBorder}`,
              borderRadius:         14,
              padding:              "12px 14px",
              zIndex:               1100,
              boxShadow: isDark
                ? "0 16px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)"
                : "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              {options.map((opt) => {
                const isSel = opt.id === accentColor;
                const swatch = isDark ? opt.dark : opt.light;
                const bg = opt.mono
                  ? "linear-gradient(to right, #1d1d1f 50%, #f5f5f5 50%)"
                  : swatch;
                return (
                  <button
                    key={opt.id}
                    onClick={() => { onAccentChange(opt.id); onClose(); }}
                    aria-label={opt.id}
                    aria-pressed={isSel}
                    style={{
                      width: 22, height: 22,
                      borderRadius: "50%",
                      background: bg,
                      backgroundOrigin: "border-box",
                      border: isSel ? `2px solid ${isDark ? "#ffffff" : "#1d1d1f"}` : "2px solid transparent",
                      cursor: "pointer",
                      padding: 0,
                      transition: "transform 140ms ease, box-shadow 140ms ease",
                      boxShadow: isSel ? `0 0 0 1px ${opt.mono ? "#888" : swatch}` : "none",
                      outline: "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Color picker mobile (dans le burger menu) ───────────────────────────────
const ColorPickerMobile = ({ accentColor, onAccentChange, isDark, selectedLanguage, borderColor }: {
  accentColor: AccentColor;
  onAccentChange: (color: AccentColor) => void;
  isDark: boolean;
  selectedLanguage: Language;
  borderColor: string;
}) => {
  const t = translations[selectedLanguage];
  return (
    <div className="border-b pb-4 mb-0" style={{ borderColor }}>
      <div className="flex items-center justify-between py-3">
        <span className="text-lg font-medium" style={{ color: "var(--theme-fg)" }}>
          {t.accentLabel}
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {ACCENT_OPTIONS.map((opt) => {
            const isSel = opt.id === accentColor;
            const swatch = isDark ? opt.dark : opt.light;
            const bg = opt.mono
              ? "linear-gradient(to right, #1d1d1f 50%, #f5f5f5 50%)"
              : swatch;
            return (
              <button
                key={opt.id}
                onClick={() => onAccentChange(opt.id)}
                aria-pressed={isSel}
                aria-label={opt.id}
                style={{
                  width: 26, height: 26,
                  borderRadius: "50%",
                  background: bg,
                  backgroundOrigin: "border-box",
                  border: isSel ? `2px solid ${isDark ? "#ffffff" : "#1d1d1f"}` : "2px solid transparent",
                  cursor: "pointer",
                  padding: 0,
                  transition: "transform 140ms ease",
                  boxShadow: isSel ? `0 0 0 1px ${opt.mono ? "#888" : swatch}` : "none",
                  outline: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Navigation principale ───────────────────────────────────────────────────
const GlobalNavigation = ({ onShowQuotes }: { onShowQuotes?: () => void }) => {
  const { isDark, accentColor, setAccentColor } = useTheme();
  const pathname = usePathname();
  const { triggerTransition } = usePageTransition();

  const [scrolledY, setScrolledY] = useState(false);
  const [langForceExpanded, setLangForceExpanded] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const scrolledYRef = useRef(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => detectLanguage());
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);


  const isScrolled = scrolledY && !langForceExpanded && !langOpen && !isMenuOpen && !colorPickerOpen;


  useEffect(() => { setSelectedLanguage(detectLanguage()); }, []);

  useEffect(() => {
    const handler = (e: CustomEvent<Language>) => setSelectedLanguage(e.detail);
    window.addEventListener("languageChange", handler as EventListener);
    return () => window.removeEventListener("languageChange", handler as EventListener);
  }, []);

  const handleLanguageChange = useCallback((lang: string) => {
    const l = lang as Language;
    Analytics.languageChange(selectedLanguage, l);
    setSelectedLanguage(l);
    localStorage.setItem("preferredLanguage", l);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: l }));
  }, [selectedLanguage]);

  useEffect(() => {
    const handler = () => {
      const nextScrolled = window.scrollY > 8;
      if (scrolledYRef.current === nextScrolled) return;
      scrolledYRef.current = nextScrolled;
      setScrolledY(nextScrolled);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openLangDropdown = useCallback(() => {
    if (scrolledY) {
      setLangForceExpanded(true);
      setTimeout(() => setLangOpen(true), 380);
    } else {
      setLangOpen(true);
    }
  }, [scrolledY]);

  const closeLangDropdown = useCallback(() => {
    setLangOpen(false);
    setTimeout(() => setLangForceExpanded(false), 280);
  }, []);

  const openColorPicker = useCallback(() => {
    if (scrolledY) {
      setLangForceExpanded(true);
      setTimeout(() => setColorPickerOpen(true), 380);
    } else {
      setColorPickerOpen(true);
    }
  }, [scrolledY]);

  const closeColorPicker = useCallback(() => {
    setColorPickerOpen(false);
    setTimeout(() => setLangForceExpanded(false), 280);
  }, []);

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setLogoAnimating(true);
    setTimeout(() => setLogoAnimating(false), 260);
    if (pathname === "/") {
      if (onShowQuotes) onShowQuotes();
    } else {
      triggerTransition("/", "down");
    }
  }, [pathname, onShowQuotes, triggerTransition]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    window.dispatchEvent(new CustomEvent("menuStateChange", { detail: isMenuOpen }));
  }, [isMenuOpen]);

  useEffect(() => {
    const handler = (e: CustomEvent<boolean>) => setIsLightboxOpen(e.detail);
    window.addEventListener("flashconceptLightboxStateChange", handler as EventListener);
    window.addEventListener("vahanLightboxStateChange", handler as EventListener);
    return () => {
      window.removeEventListener("flashconceptLightboxStateChange", handler as EventListener);
      window.removeEventListener("vahanLightboxStateChange", handler as EventListener);
    };
  }, []);

  const prefersReducedMotion = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    []
  );

  const t           = translations[selectedLanguage];
  const textColor   = "var(--theme-fg)";
  const navBgColor  = "var(--theme-nav-bg)";
  const borderColor = "var(--theme-border)";
  const scrolledBg  = "var(--theme-nav-scrolled)";
  const visualScrolled = isScrolled;

  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.projects, href: "/projects" },
    { name: t.skills, href: "/skills" },
    { name: t.contact, href: "/contact" },
  ];

  const logoProps = {
    onClick: handleLogoClick,
    "aria-label": "Home",
    href: "/",
    className: `flex items-center hover:opacity-80 h-full cursor-pointer relative ${
      prefersReducedMotion ? (logoAnimating ? "opacity-60" : "opacity-100") : ""
    }`,
    style: {
      color: textColor,
      transitionDuration: prefersReducedMotion ? "120ms" : "230ms",
      transform: logoAnimating && !prefersReducedMotion ? "scale(0.98)" : "scale(1)",
      transition: "opacity 230ms ease, transform 230ms ease",
    } as React.CSSProperties,
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[1000] ${
          isLightboxOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          paddingTop:    visualScrolled ? "12px" : "0",
          paddingLeft:   visualScrolled ? "12px" : "0",
          paddingRight:  visualScrolled ? "12px" : "0",
          transition: "opacity 300ms ease-in-out, padding 380ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            backgroundColor: visualScrolled ? scrolledBg : navBgColor,
            backdropFilter: visualScrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: visualScrolled ? "blur(12px)" : "none",
            borderRadius: visualScrolled ? "980px" : "0",
            borderBottom: visualScrolled ? "none" : `1px solid ${borderColor}`,
            boxShadow: visualScrolled ? (isDark ? "0 4px 20px rgba(255,255,255,0.07)" : "0 4px 12px rgba(0,0,0,0.08)") : "none",
            transition:
              "background-color 380ms cubic-bezier(0.4,0,0.2,1), " +
              "border-radius 380ms cubic-bezier(0.4,0,0.2,1), " +
              "box-shadow 380ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div className="mx-auto h-16 max-w-[1200px] px-4 md:px-6">
            <nav
              role="navigation"
              aria-label="Navigation principale"
              dir="ltr"
              className="flex h-full w-full items-center justify-between"
              style={{ direction: "ltr" }}
            >

              {/* ── Desktop ── */}
              <div className="hidden h-full w-full items-center justify-between lg:flex">
                <a {...logoProps}>
                  <BrandLogo isScrolled={visualScrolled} className="h-4 w-auto relative z-10" />
                </a>

                <div className="flex items-center h-full gap-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center h-full font-medium text-sm px-3 no-underline hover:underline focus-visible:underline"
                      style={{
                        color: textColor,
                        textDecorationColor: textColor,
                        textDecorationThickness: "1px",
                        textUnderlineOffset: "2px",
                        transition: "opacity 180ms ease",
                        position: "relative",
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <ColorPicker
                    accentColor={accentColor}
                    onAccentChange={setAccentColor}
                    isDark={isDark}
                    isOpen={colorPickerOpen}
                    onOpen={openColorPicker}
                    onClose={closeColorPicker}
                    options={ACCENT_OPTIONS}
                  />
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                    isDark={isDark}
                    isOpen={langOpen}
                    onOpen={openLangDropdown}
                    onClose={closeLangDropdown}
                  />
                  <ThemeToggle />
                  <ResumeButton selectedLanguage={selectedLanguage} isDark={isDark} />
                </div>
              </div>

              {/* ── Mobile ── */}
              <div
                className="flex w-full items-center justify-between lg:hidden"
                style={{
                  direction: "ltr",
                  flexDirection: "row",
                }}
              >
                <div className="flex h-9 min-w-0 flex-1 items-center justify-start">
                  <a {...logoProps} className={logoProps.className.replace("h-full", "")}>
                    <BrandLogo isScrolled className="h-4" />
                  </a>
                </div>

                <div className="flex h-9 min-w-0 flex-none flex-row items-center justify-end gap-2">
                  <ResumeButton selectedLanguage={selectedLanguage} isDark={isDark} compact />
                  <div className="flex items-center justify-center h-9">
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={handleLanguageChange}
                      isDark={isDark}
                      isOpen={langOpen}
                      onOpen={openLangDropdown}
                      onClose={closeLangDropdown}
                    />
                  </div>
                  <button
                    onClick={handleMenuToggle}
                    className="flex h-9 w-9 flex-none items-center justify-center transition-opacity duration-200 hover:opacity-80"
                    style={{ color: textColor }}
                    aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                  >
                    <AnimatedBurgerIcon isOpen={isMenuOpen} isDark={isDark} />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Menu mobile overlay ── */}
      <div
        id="mobile-navigation"
        className={`fixed inset-0 top-16 z-40 transition-all duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!isMenuOpen}
        style={{ backgroundColor: navBgColor }}
      >
        <div className="h-full overflow-y-auto px-6 pt-8 flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-4 text-lg font-medium border-b hover:opacity-80 transition-opacity"
                style={{
                  color: textColor,
                  borderColor,
                  display: "flex", alignItems: "center", gap: 8,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-0">
            <ColorPickerMobile
              accentColor={accentColor}
              onAccentChange={setAccentColor}
              isDark={isDark}
              selectedLanguage={selectedLanguage}
              borderColor={borderColor}
            />
            <ThemeToggleMobile selectedLanguage={selectedLanguage} borderColor={borderColor} onClose={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalNavigation;
