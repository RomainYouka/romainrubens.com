"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectSkeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/contexts/ThemeContext";
import { BehanceRedirectOverlay } from "@/components/BehanceRedirectOverlay";


type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    mobileProjects: "Projets mobiles",
    webProjects: "Projets web",
    miscProjects: "Projets divers",
    soon: "Bientôt disponible",
    returnDate: "En cours de réalisation",
    strateSoon: "Bientôt disponible",
    strateWorkInProgress: "Cette page est en travaux",
  },
  EN: {
    mobileProjects: "Mobile projects",
    webProjects: "Web projects",
    miscProjects: "Diverse projects",
    soon: "Coming soon",
    returnDate: "Work in progress",
    strateSoon: "Coming soon",
    strateWorkInProgress: "Work in progress",
  },
  ՀԱՅ: {
    mobileProjects: "Բջջային նախագծեր",
    webProjects: "Վեբ նախագծեր",
    miscProjects: "Տարբեր նախագծեր",
    soon: "Շուտով",
    returnDate: "Ընթացքում է",
    strateSoon: "Շուտով",
    strateWorkInProgress: "Այս էջը ներկայումս վերանորոգվում է",
  },
};

const mobileProjects = [
  {
    id: 1,
    image: "/projects/blocks/intratone-light.png",
    darkImage: "/projects/blocks/intratone-dark.png",
    year: "",
    slug: "intratone",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 2,
    image: "/projects/blocks/ios26-light.png",
    darkImage: "/projects/blocks/ios26-dark.png",
    year: "",
    slug: "ios26",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 3,
    image: "/projects/blocks/waveswitch-light.png",
    darkImage: "/projects/blocks/waveswitch-dark.png",
    year: "",
    slug: "waveswitch",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 4,
    image: "/projects/blocks/googlemaps-light.png",
    darkImage: "/projects/blocks/googlemaps-dark.png",
    year: "",
    slug: "googlemaps",
    externalUrl: "https://www.behance.net/gallery/247000211/Google-Maps-App-Extension",
    isComingSoon: false,
    isPriority: true,
  },
  {
    id: 7,
    image: "/projects/blocks/googleplayios-light.png",
    darkImage: "/projects/blocks/googleplayios-dark.png",
    year: "",
    slug: "googleplayios",
    externalUrl: "https://www.behance.net/gallery/246858627/Google-Play-on-iOS",
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 6,
    image: "/projects/blocks/renault-light.png",
    darkImage: "/projects/blocks/renault-dark.png",
    year: "",
    slug: "renault",
    externalUrl: "https://www.behance.net/gallery/246976591/Renault-App-Extension",
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 5,
    image: "/projects/blocks/stratos-light.png",
    darkImage: "/projects/blocks/stratos-dark.png",
    year: "",
    slug: "stratos",
    externalUrl: "https://www.behance.net/gallery/247046537/Stratos-Campus-App",
    isComingSoon: false,
    isPriority: false,
  },
];

const webProjects = [
  {
    id: 2,
    image: "/projects/blocks/framasoft-light.png",
    darkImage: "/projects/blocks/framasoft-dark.png",
    year: "2024",
    slug: "framasoft",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
  {
    id: 1,
    image: "/projects/blocks/ayooapi-light.png",
    darkImage: "/projects/blocks/ayooapi-dark.png",
    year: "2026",
    slug: "ayooapi",
    externalUrl: undefined as string | undefined,
    isComingSoon: true,
  },
];

const diversProjects = [
  {
    id: 1,
    image: "/projects/blocks/namequest-light.png",
    darkImage: "/projects/blocks/namequest-dark.png",
    year: "2025",
    slug: "namequest",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
  {
    id: 2,
    image: "/projects/blocks/vahan-light.png",
    darkImage: "/projects/blocks/vahan-dark.png",
    year: "2024",
    slug: "vahansoghomonian",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
  {
    id: 3,
    image: "/projects/blocks/chaussez-vous-ou-pas-light.png",
    darkImage: "/projects/blocks/chaussez-vous-ou-pas-dark.png",
    year: "2026",
    slug: "chaussez-vous-ou-pas",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
];

const triggerHapticFeedback = () => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(10);
  }
};

const scrollToSection = (sectionId: string) => {
  triggerHapticFeedback();
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
};

const NavigationButtons = ({ activeSection, language }: { activeSection: "mobile" | "web" | "divers"; language: Language }) => {
  const t = translations[language];
  const sections: Array<{ id: "mobile" | "web" | "divers"; label: string }> = [
    { id: "mobile",  label: t.mobileProjects },
    { id: "web",     label: t.webProjects    },
    { id: "divers",  label: t.miscProjects   },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 lg:gap-[17px] w-full">
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(`section-${id}`)}
            className="h-10 lg:h-12 rounded-[20px] transition-all duration-200 cursor-pointer flex items-center justify-center border active:scale-[0.98]"
            style={{
              backgroundColor: isActive ? "var(--theme-btn-bg)"  : "var(--theme-pill-bg)",
              borderColor:     "var(--theme-pill-border)",
              color:           isActive ? "var(--theme-btn-fg)"  : "var(--theme-fg)",
            }}
          >
            <span className="font-semibold text-[9px] sm:text-[11px] lg:text-[calc(10px+0.8vw)] tracking-[-0.02em] sm:tracking-[0] leading-tight text-center">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const greenBannerTextDesktop = {
  FR: "Une sélection de projets conçus à partir d'usages réels, de contraintes concrètes et de contextes précis.",
  EN: "A selection of projects shaped by real-world uses, concrete constraints, and specific contexts.",
  ՀԱՅ: "Իրական օգտագործումների վրա հիմնված նախագծերի ընտրանի։",
};

const greenBannerTextTablet = {
  FR: "Une sélection de projets conçus à partir d'usages réels,\nde contraintes concrètes et de contextes précis.",
  EN: "A selection of projects shaped by real-world uses,\nconcrete constraints, and specific contexts.",
  ՀԱՅ: "Իրական օգտագործումների վրա հիմնված\nնախագծերի ընտրանի։",
};

const greenBannerTextMobile = {
  FR: "Une sélection de projets conçus à partir d'usages réels,\nde contraintes concrètes et de contextes précis.",
  EN: "A selection of projects shaped by real-world uses,\nconcrete constraints, and specific contexts.",
  ՀԱՅ: "Իրական օգտագործումների վրա հիմնված\nնախագծերի ընտրանի։",
};

const GreenBanner = ({ language }: { language: Language }) => {
  return (
    <>
      <div className="hidden lg:block w-full bg-[#314DCB] rounded-[12px] flex items-center justify-center py-3">
        <p className="text-white text-center font-semibold text-base leading-snug px-6 whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0px" }}>
          {greenBannerTextDesktop[language]}
        </p>
      </div>
      <div className="hidden md:flex lg:hidden w-full bg-[#314DCB] rounded-[12px] items-center justify-center py-2.5">
        <p className="text-white text-center font-semibold text-[11px] leading-snug px-3 whitespace-pre-line" style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0px" }}>
          {greenBannerTextTablet[language]}
        </p>
      </div>
      <div className="md:hidden w-full bg-[#314DCB] rounded-[12px] flex items-center justify-center py-2.5">
        <p className="text-white text-center font-semibold text-[9px] leading-snug px-3 whitespace-pre-line" style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0px" }}>
          {greenBannerTextMobile[language]}
        </p>
      </div>
    </>
  );
};

interface ProjectCardProps {
  image: string;
  darkImage?: string;
  year: string;
  slug: string;
  onNavigate: (slug: string, rect: DOMRect) => void;
  onExternalNavigate: (url: string) => void;
  externalUrl?: string;
  isComingSoon?: boolean;
  language: Language;
  isPriority?: boolean;
}

const ProjectCard = ({ image, darkImage, year, slug, onNavigate, onExternalNavigate, externalUrl, isComingSoon, language, isPriority }: ProjectCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { isDark } = useTheme();
  const t = translations[language];

  useEffect(() => { setImgError(false); }, [isDark]);

  const resolvedImage = isDark && darkImage && !imgError ? darkImage : image;

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    triggerHapticFeedback();
    if (externalUrl) {
      window.dispatchEvent(new CustomEvent("blob-wink"));
      onExternalNavigate(externalUrl);
      return;
    }
    if (isComingSoon) {
      setIsClicked(prev => !prev);
      return;
    }
    window.dispatchEvent(new CustomEvent("blob-wink"));
    const rect = e.currentTarget.getBoundingClientRect();
    onNavigate(slug, rect);
  }, [externalUrl, slug, onNavigate, onExternalNavigate, isComingSoon]);

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full aspect-[2.16/1] overflow-hidden rounded-[14.44px] cursor-pointer block"
      style={{ border: "1px solid var(--theme-pill-border)" }}
      whileHover={{ scale: 1.02, boxShadow: isComingSoon ? "0 10px 40px rgba(0,0,0,0.4)" : "0 10px 40px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Image
        src={resolvedImage}
        alt={slug}
        fill
        className="object-cover"
        priority={isPriority}
        fetchPriority={isPriority ? "high" : "auto"}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        onError={() => setImgError(true)}
      />
      {externalUrl && (
        <div className="absolute top-[11px] left-[11px] z-10 pointer-events-none">
          <div style={{
            width: 28, height: 28,
            borderRadius: 8,
            backgroundColor: "var(--theme-bg)",
            border: "1px solid var(--theme-pill-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 1.5H11.5M11.5 1.5V5.5M11.5 1.5L5.5 7.5M5 2.5H2C1.72 2.5 1.5 2.72 1.5 3V11C1.5 11.28 1.72 11.5 2 11.5H10C10.28 11.5 10.5 11.28 10.5 11V8" stroke="var(--theme-pill-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
      <div className="flex items-end justify-end p-0 h-full pr-[13px] pb-[13px] relative z-10">
        <div className="w-8 h-8 md:w-10 md:h-10 p-0 pointer-events-none flex-shrink-0">
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="27" cy="27" r="26.0723" transform="rotate(180 27 27)" style={{ fill: "var(--theme-bg)", stroke: "var(--theme-pill-border)" }} strokeWidth="1.8553"/>
            <path d="M23.32 34.3633L30.0142 27.6691L30.6836 26.9996L23.32 19.636" style={{ stroke: "var(--theme-pill-border)" }} strokeWidth="3.71061"/>
          </svg>
        </div>
      </div>
      {isComingSoon && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 z-20">
          <span className="text-white font-bold text-center text-sm md:text-xl lg:text-2xl drop-shadow-lg">
            {isClicked ? t.returnDate : t.soon}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default function PortfolioPage() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("FR");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [hideToolbar, setHideToolbar] = useState(false);
  const [expandingCard, setExpandingCard] = useState<{
    slug: string;
    rect: DOMRect;
    image: string;
  } | null>(null);
  const [behanceRedirect, setBehanceRedirect] = useState<string | null>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && ["FR", "EN", "ՀԱՅ"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    const handleLanguageChange = (event: CustomEvent<Language>) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    const handleMenuStateChange = (event: CustomEvent<boolean>) => setIsMobileMenuOpen(event.detail);
    window.addEventListener("menuStateChange", handleMenuStateChange as EventListener);
    setIsHydrated(true);
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setIsFooterVisible(rect.top < window.innerHeight);
      }
    };
    const handleProjectOpen = () => setHideToolbar(true);
    window.addEventListener("projectOpen", handleProjectOpen);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
      window.removeEventListener("menuStateChange", handleMenuStateChange as EventListener);
      window.removeEventListener("projectOpen", handleProjectOpen);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sortProjects = (projects: typeof mobileProjects) =>
    [...projects].sort((a, b) => Number(!!a.isComingSoon) - Number(!!b.isComingSoon));

  const allProjects = [...mobileProjects, ...webProjects, ...diversProjects];

  const handleExternalNavigate = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setBehanceRedirect(url);
  }, []);

  const handleNavigate = useCallback((slug: string, rect: DOMRect) => {
    const project = allProjects.find(p => p.slug === slug);
    if (project) {
      setExpandingCard({ slug, rect, image: project.image });
      setTimeout(() => {
        router.push(`/projects/${slug}`);
      }, 200);
    }
  }, [router, allProjects]);

  return (
    <>
      <BehanceRedirectOverlay
        url={behanceRedirect}
        language={language}
        onDismiss={() => setBehanceRedirect(null)}
      />

      <AnimatePresence>
        {expandingCard && (
          <motion.div
            className="fixed z-50"
            initial={{
              top: expandingCard.rect.top,
              left: expandingCard.rect.left,
              width: expandingCard.rect.width,
              height: expandingCard.rect.height,
              borderRadius: 14.44,
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
            }}
            transition={{
              duration: 0.25,
              ease: [0.32, 0.72, 0, 1],
            }}
            style={{ backgroundColor: "var(--theme-bg-alt)" }}
          />
        )}
      </AnimatePresence>


      <main id="main-content" className="w-full min-h-screen flex justify-center py-5 md:mt-[20px] pb-32 md:pb-12" style={{ backgroundColor: "var(--theme-bg)" }}>
        <div className="flex w-full max-w-[1234px] h-auto px-4 md:px-8 lg:px-12 xl:px-4 mt-16 md:mt-[40px] relative flex-col items-center gap-12 md:gap-[100px]">
          {!isHydrated ? (
            <div className="w-full flex flex-col gap-12 md:gap-[100px]">
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </div>
          ) : (
            <>
              <section id="section-mobile" className="flex flex-col items-center gap-6 md:gap-[50px] relative w-full">
                <GreenBanner language={language} />
                <NavigationButtons activeSection="mobile" language={language} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] w-full">
                  {sortProjects(mobileProjects)
                                        .map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      image={project.image}
                      darkImage={"darkImage" in project ? project.darkImage : undefined}
                      year={project.year}
                      slug={project.slug}
                      onNavigate={handleNavigate}
                      onExternalNavigate={handleExternalNavigate}
                      externalUrl={project.externalUrl}
                      isComingSoon={project.isComingSoon}
                      language={language}
                      isPriority={index < 4}
                    />
                  ))}
                </div>
              </section>

              <section id="section-web" className="flex flex-col items-center gap-6 md:gap-[50px] relative w-full">
                <NavigationButtons activeSection="web" language={language} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] w-full">
                  {sortProjects(webProjects)
                                        .map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      image={project.image}
                      darkImage={"darkImage" in project ? project.darkImage : undefined}
                      year={project.year}
                      slug={project.slug}
                      onNavigate={handleNavigate}
                      onExternalNavigate={handleExternalNavigate}
                      externalUrl={project.externalUrl}
                      isComingSoon={project.isComingSoon}
                      language={language}
                      isPriority={index < 4}
                    />
                  ))}
                </div>
              </section>

              <section id="section-divers" className="flex flex-col items-center gap-6 md:gap-[50px] relative w-full">
                <NavigationButtons activeSection="divers" language={language} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] w-full">
                  {sortProjects(diversProjects)
                                        .map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      image={project.image}
                      darkImage={"darkImage" in project ? project.darkImage : undefined}
                      year={project.year}
                      slug={project.slug}
                      onNavigate={handleNavigate}
                      onExternalNavigate={handleExternalNavigate}
                      externalUrl={project.externalUrl}
                      isComingSoon={project.isComingSoon}
                      language={language}
                      isPriority={index < 4}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
