"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Languages, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle, ThemeToggleMobile } from "@/components/ThemeToggle";
import { usePageTransition } from "@/contexts/PageTransitionContext";
import { detectLanguage, type Language } from "@/lib/language";

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

// ─── Logo ────────────────────────────────────────────────────────────────────
const LogoIcon = (props: React.ImgHTMLAttributes<HTMLImageElement> & { isDark?: boolean; iconSrc?: string }) => {
  const { isDark, iconSrc = "/icons/icon.svg", ...imgProps } = props;
  return <img src={iconSrc} alt="Romain Rubens" role="img" width={32} height={32} {...imgProps} />;
};

// ─── Traductions nav ─────────────────────────────────────────────────────────
const translations = {
  FR: { home: "Accueil", projects: "Projets", skills: "Compétences", contact: "Contact", resume: "CV" },
  EN: { home: "Home", projects: "Projects", skills: "Skills", contact: "Contact", resume: "Resume" },
  ՀԱՅ: { home: "Գլխավոր", projects: "Նախագծեր", skills: "Հմտություններ", contact: "Կապ", resume: "Ռեզյումե" },
};

// ─── Bouton CV ───────────────────────────────────────────────────────────────
const ResumeButton = ({ selectedLanguage, isDark }: { selectedLanguage: Language; isDark: boolean }) => {
  const t = translations[selectedLanguage];
  const [validating, setValidating] = useState(false);

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

  const bg     = "#314DCB";
  const border = isDark ? "#5194FF" : "#314DCB";

  return (
    <button
      onClick={handleDownload}
      disabled={validating}
      aria-label={`Download ${t.resume}`}
      className="relative flex items-center justify-center font-medium text-sm no-underline disabled:cursor-not-allowed"
      style={{
        backgroundColor: bg, color: "#ffffff", border: `1px solid ${border}`,
        borderRadius: 980, padding: "8px 16px", height: 36, minWidth: 95, width: 95,
        transition: "opacity 180ms ease, background-color 180ms ease, transform 180ms ease",
        outline: "none",
      }}
      onMouseEnter={(e) => { if (!validating) e.currentTarget.style.opacity = "0.85"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseDown={(e) => { if (!validating) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <span style={{ textAlign: "center", width: "100%" }}>{t.resume}</span>
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-[980px] transition-opacity ${
          validating ? "opacity-100 duration-[200ms]" : "opacity-0 duration-[180ms] pointer-events-none"
        }`}
        style={{ backgroundColor: bg }}
      >
        <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
    </button>
  );
};

// ─── Sélecteur de langue ─────────────────────────────────────────────────────
interface LangSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: string) => void;
  isDark: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const LanguageSelector = ({ selectedLanguage, onLanguageChange, isDark, isOpen, onOpen, onClose }: LangSelectorProps) => {
  const buttonRef  = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState<{ top: number; left: number }>({ top: 80, left: 0 });
  const LANGS: Language[] = ["FR", "EN", "ՀԱՅ"];

  // ── Calcule la position centrée sur le bouton ──────────────────────────────
  // Appelé immédiatement ET après l'animation d'expansion de la nav (420ms)
  useEffect(() => {
    if (!isOpen) return;
    const calc = () => {
      if (!buttonRef.current) return;
      const r = buttonRef.current.getBoundingClientRect();
      const dropW = dropdownRef.current?.offsetWidth ?? 80;
      setDropPos({
        top:  r.bottom + 8,
        left: r.left + r.width / 2 - dropW / 2,
      });
    };
    calc();
    const t = setTimeout(calc, 420);
    return () => clearTimeout(t);
  }, [isOpen]);

  // ── Click extérieur ────────────────────────────────────────────────────────
  // IMPORTANT : deux instances de LanguageSelector coexistent (desktop + mobile).
  // On ne traite le click-outside QUE si ce composant est visuellement actif
  // (offsetParent !== null), sinon l'instance cachée ferme le dropdown par erreur.
  useEffect(() => {
    if (!isOpen) return;
    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 60);
    const handler = (e: MouseEvent) => {
      if (!armed) return;
      if (!buttonRef.current?.offsetParent) return; // instance cachée → ignorer
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => { clearTimeout(arm); document.removeEventListener("mousedown", handler); };
  }, [isOpen, onClose]);

  // ── Escape ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleSelect = (lang: Language) => {
    onLanguageChange(lang);
    onClose();
  };

  const textColor  = isDark ? "#FFFFFF"              : "#1d1d1f";
  const dropBg     = isDark ? "rgba(24,24,28,0.97)"  : "rgba(252,252,254,0.97)";
  const dropBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const divider    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const hoverBg    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
  const selectedBg = "#314DCB";

  return (
    <>
      {/* ── Bouton langue ── */}
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

      {/* ── Dropdown — sort de la nav vers le bas comme une goutte d'eau ── */}
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
              boxShadow: isDark
                ? "0 16px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)"
                : "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            {LANGS.map((lang, idx) => {
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
                    background:   isSel ? selectedBg : "transparent",
                    color:        isSel ? "#ffffff"  : textColor,
                    border:       "none",
                    cursor:       "pointer",
                    transition:   "background 140ms ease",
                    borderBottom: idx < LANGS.length - 1 ? `1px solid ${divider}` : "none",
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

// ─── Navigation principale ───────────────────────────────────────────────────
const GlobalNavigation = ({ onShowQuotes }: { onShowQuotes?: () => void }) => {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const { triggerTransition } = usePageTransition();

  // ── État scroll (réel) vs état visuel ──
  const [scrolledY, setScrolledY] = useState(false);       // scroll détecté
  const [langForceExpanded, setLangForceExpanded] = useState(false); // nav forcée plein largeur
  const [langOpen, setLangOpen] = useState(false);         // dropdown visible

  // ── Autres états ──
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => detectLanguage());
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Nav en mode pillule uniquement si scrollé ET pas de dropdown / menu ouvert
  const isScrolled = scrolledY && !langForceExpanded && !langOpen && !isMenuOpen;

  const isExplorationsPage = pathname === "/explorations";
  const logoIconSrc = isScrolled
    ? (isDark ? "/icons/icon.short.white.svg" : "/icons/icon.short.svg")
    : (isDark ? "/icons/icon.white.svg" : "/icons/icon.svg");

  // ── Langue initiale ──
  useEffect(() => {
    setSelectedLanguage(detectLanguage());
  }, []);

  useEffect(() => {
    const handler = (e: CustomEvent<Language>) => setSelectedLanguage(e.detail);
    window.addEventListener("languageChange", handler as EventListener);
    return () => window.removeEventListener("languageChange", handler as EventListener);
  }, []);

  const handleLanguageChange = useCallback((lang: string) => {
    const l = lang as Language;
    setSelectedLanguage(l);
    localStorage.setItem("preferredLanguage", l);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: l }));
  }, []);

  // ── Scroll detection ──
  useEffect(() => {
    const handler = () => setScrolledY(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── Ouvrir le dropdown (si pillule → expand nav d'abord, puis afficher) ──
  const openLangDropdown = useCallback(() => {
    if (scrolledY) {
      setLangForceExpanded(true);
      setTimeout(() => setLangOpen(true), 380);
    } else {
      setLangOpen(true);
    }
  }, [scrolledY]);

  // ── Fermer le dropdown (puis laisser la nav reprendre son état pillule) ──
  const closeLangDropdown = useCallback(() => {
    setLangOpen(false);
    setTimeout(() => setLangForceExpanded(false), 280);
  }, []);

  // ── Logo ──
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

  // ── Menu mobile ──
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    window.dispatchEvent(new CustomEvent("menuStateChange", { detail: isMenuOpen }));
  }, [isMenuOpen]);

  // ── Lightbox ──
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

  const t          = translations[selectedLanguage];
  const textColor  = "var(--theme-fg)";
  const navBgColor = "var(--theme-nav-bg)";
  const borderColor = "var(--theme-border)";
  const scrolledBg = "var(--theme-nav-scrolled)";

  const navLinks = [
    { name: t.home,         href: "/" },
    { name: t.projects,     href: "/projects" },
    { name: t.skills,       href: "/skills" },
    { name: t.contact,      href: "/contact" },
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
          // padding animé → transition douce pillule ↔ plein largeur
          paddingTop:    isScrolled ? "12px" : "0",
          paddingLeft:   isScrolled ? "12px" : "0",
          paddingRight:  isScrolled ? "12px" : "0",
          transition: "opacity 300ms ease-in-out, padding 380ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            backgroundColor: isScrolled ? scrolledBg : navBgColor,
            backdropFilter:       isScrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
            borderRadius:  isScrolled ? "980px" : "0",
            borderBottom:  isScrolled ? "none" : `1px solid ${borderColor}`,
            boxShadow:     isScrolled ? (isDark ? "0 4px 20px rgba(255,255,255,0.07)" : "0 4px 12px rgba(0,0,0,0.08)") : "none",
            transition:
              "background-color 380ms cubic-bezier(0.4,0,0.2,1), " +
              "border-radius 380ms cubic-bezier(0.4,0,0.2,1), " +
              "box-shadow 380ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div className="mx-auto h-16 max-w-[1200px] px-6">
            <nav role="navigation" aria-label="Navigation principale" className="flex h-full w-full items-center justify-between">

              {/* ── Desktop ── */}
              <div className="hidden h-full w-full items-center justify-between lg:flex">
                <a {...logoProps}>
                  <LogoIcon className="h-4 w-auto fill-current relative z-10" isDark={isExplorationsPage} iconSrc={logoIconSrc} />
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
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}

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
              <div className="flex w-full items-center justify-between lg:hidden">
                <a {...logoProps} className={logoProps.className.replace("h-full", "")}>
                  <LogoIcon className="h-3.5 w-auto fill-current" isDark={isExplorationsPage} iconSrc={logoIconSrc} />
                </a>

                <div className="flex items-center h-9 gap-5">
                  <ResumeButton selectedLanguage={selectedLanguage} isDark={isDark} />
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
                    className="flex items-center justify-center h-9 transition-opacity duration-200 hover:opacity-80"
                    style={{ color: textColor }}
                    aria-label="Toggle menu"
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
                style={{ color: textColor, borderColor }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <ThemeToggleMobile selectedLanguage={selectedLanguage} borderColor={borderColor} onClose={() => setIsMenuOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default GlobalNavigation;
