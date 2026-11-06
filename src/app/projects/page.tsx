"use client";
import { CardOpenBadge, ExternalLinkBadge } from "@/components/SFIcon";
import { ListingBanner, listingPageClassName, listingContainerClassName, listingSectionClassName, listingGridClassName } from "@/components/ListingLayout";

import { detectLanguage } from "@/lib/language";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
    image: "/projects/blocks/intratone-light.webp",
    darkImage: "/projects/blocks/intratone-dark.webp",
    year: "",
    slug: "intratone",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 2,
    image: "/projects/blocks/ios26-light.webp",
    darkImage: "/projects/blocks/ios26-dark.webp",
    year: "",
    slug: "ios26",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 3,
    image: "/projects/blocks/waveswitch-light.webp",
    darkImage: "/projects/blocks/waveswitch-dark.webp",
    year: "",
    slug: "waveswitch",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 4,
    image: "/projects/blocks/googlemaps-light.webp",
    darkImage: "/projects/blocks/googlemaps-dark.webp",
    year: "",
    slug: "googlemaps",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: true,
  },
  {
    id: 7,
    image: "/projects/blocks/googleplayios-light.webp",
    darkImage: "/projects/blocks/googleplayios-dark.webp",
    year: "",
    slug: "googleplayios",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 6,
    image: "/projects/blocks/renault-light.webp",
    darkImage: "/projects/blocks/renault-dark.webp",
    year: "",
    slug: "renault",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
  {
    id: 5,
    image: "/projects/blocks/stratos-light.webp",
    darkImage: "/projects/blocks/stratos-dark.webp",
    year: "",
    slug: "stratos",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
    isPriority: false,
  },
];

const webProjects = [
  {
    id: 2,
    image: "/projects/blocks/framasoft-light.webp",
    darkImage: "/projects/blocks/framasoft-dark.webp",
    year: "2024",
    slug: "framasoft",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
  {
    id: 3,
    image: "/projects/blocks/goupil-light-trimmed.webp",
    darkImage: "/projects/blocks/goupil-dark-trimmed.webp",
    year: "2026",
    slug: "goupil",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
];

const diversProjects = [
  {
    id: 1,
    image: "/projects/blocks/namequest-light.webp",
    darkImage: "/projects/blocks/namequest-dark.webp",
    year: "2025",
    slug: "namequest",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
  {
    id: 2,
    image: "/projects/blocks/vahan-light.webp",
    darkImage: "/projects/blocks/vahan-dark.webp",
    year: "2024",
    slug: "vahansoghomonian",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
  {
    id: 3,
    image: "/projects/blocks/chaussez-vous-ou-pas-light.webp",
    darkImage: "/projects/blocks/chaussez-vous-ou-pas-dark.webp",
    year: "2026",
    slug: "chaussez-vous-ou-pas",
    externalUrl: undefined as string | undefined,
    isComingSoon: false,
  },
];

type ProjectListItem = (typeof mobileProjects | typeof webProjects | typeof diversProjects)[number];

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
            data-project-category
            aria-current={isActive ? "true" : undefined}
            className="h-10 lg:h-12 rounded-[20px] transition-colors duration-200 cursor-pointer flex items-center justify-center border"
            style={{
              backgroundColor: isActive ? "var(--theme-btn-bg)" : "var(--category-hover-bg, var(--theme-pill-bg))",
              borderColor:     "var(--theme-pill-border)",
              color:           isActive ? "var(--theme-btn-fg)" : "var(--category-hover-fg, var(--theme-fg))",
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
  const reduceMotion = useReducedMotion();
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
      data-card-pill
      className="relative w-full aspect-[2.16/1] rounded-[14.44px] cursor-pointer block"
      style={{ border: "1px solid var(--theme-pill-border)" }}
      whileHover={{ scale: reduceMotion ? 1 : 1.02, boxShadow: isComingSoon ? "0 10px 40px rgba(0,0,0,0.4)" : "0 10px 40px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Image
        src={resolvedImage}
        alt={slug}
        fill
        className="object-cover"
        style={{borderRadius:"inherit"}}
        priority={isPriority}
        fetchPriority={isPriority ? "high" : "auto"}
        sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 57px), (max-width: 1279px) calc(50vw - 73px), 576px"
        onError={() => setImgError(true)}
      />
      {externalUrl && (
<div className="absolute top-[11px] left-[11px] z-10 pointer-events-none"><ExternalLinkBadge /></div>
      )}
      <div className="flex items-end justify-end p-0 h-full pr-[13px] pb-[13px] relative z-10">
          <CardOpenBadge language={language} />
      </div>
      {isComingSoon && (
        <div className="absolute inset-0 rounded-[inherit] bg-black/40 flex items-center justify-center p-4 z-20">
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
  const [language, setLanguage] = useState<Language>("EN");
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
    const savedLanguage = detectLanguage() as Language;
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

  const sortProjects = (projects: ProjectListItem[]) =>
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
        router.push(slug === "renault" ? "/renaultextensionapp" : slug === "stratos" ? "/stratosapp" : slug === "googlemaps" ? "/googlemapsextension" : slug === "googleplayios" ? "/googleplayonios" : slug === "goupil" ? "/goupildigitalecosystem" : `/projects/${slug}`);
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


      <main id="main-content" className={listingPageClassName} style={{ backgroundColor: "var(--theme-bg)" }}>
        <div className={listingContainerClassName}>
          {!isHydrated ? (
            <div className="w-full flex flex-col gap-12 md:gap-[100px]">
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </div>
          ) : (
            <>
              <section id="section-mobile" className={listingSectionClassName}>
                <ListingBanner kind="projects" language={language} />
                <NavigationButtons activeSection="mobile" language={language} />
                <div className={listingGridClassName}>
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
                      isPriority={index < 2}
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
                      isPriority={index < 2}
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
                      isPriority={index < 2}
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
