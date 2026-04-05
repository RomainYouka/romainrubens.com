"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    title: "Plan du site",
    home: "Accueil",
    projects: "Projets",
    mobileProjects: "Projets mobiles",
    webProjects: "Projets web",
    diverseProjects: "Projets divers",
    skills: "Compétences",
    explorations: "Explorations",
    contact: "Contact",
    resume: "CV / Resume",
    legal: "Mentions légales",
    inProgress: "(en cours)",
    // Mobile projects
    intratone: "Intratone",
    ios26: "iOS 26",
    waveswitch: "Wave Switch",
    students: "Stratos",
    googlemaps: "Google Maps",
    renault: "Renault",
    // Web projects
    framasoft: "Framasoft",
    ayooapi: "AYOO API",
    // Diverse projects
    namequest: "NameQuest",
    vahansoghomonian: "Vahan Soghomonian",
    chaussezVousOuPas: "Chaussez-vous ou pas",
    sansnom: "Sans nom",
    // Explorations
    vibecoding: "Vibecoding",
    idorensburg: "Idorensburg",
    greenhouse: "Green House",
    cuizin: "CuizIN",
  },
  EN: {
    title: "Site Map",
    home: "Home",
    projects: "Projects",
    mobileProjects: "Mobile projects",
    webProjects: "Web projects",
    diverseProjects: "Diverse projects",
    skills: "Skills",
    explorations: "Explorations",
    contact: "Contact",
    resume: "CV / Resume",
    legal: "Legal Notice",
    inProgress: "(in progress)",
    // Mobile projects
    intratone: "Intratone",
    ios26: "iOS 26",
    waveswitch: "Wave Switch",
    students: "Stratos",
    googlemaps: "Google Maps",
    renault: "Renault",
    // Web projects
    framasoft: "Framasoft",
    ayooapi: "AYOO API",
    // Diverse projects
    namequest: "NameQuest",
    vahansoghomonian: "Vahan Soghomonian",
    chaussezVousOuPas: "Chaussez-vous ou pas",
    sansnom: "Sans nom",
    // Explorations
    vibecoding: "Vibecoding",
    idorensburg: "Idorensburg",
    greenhouse: "Green House",
    cuizin: "CuizIN",
  },
  ՀԱՅ: {
    title: "Կայքի քարտեզ",
    home: "Գլխավոր",
    projects: "Նախագծեր",
    mobileProjects: "Բջջային նախագծեր",
    webProjects: "Վեբ նախագծեր",
    diverseProjects: "Տարբեր նախագծեր",
    skills: "Հմտություններ",
    explorations: "Հետազոտություններ",
    contact: "Կապ",
    resume: "CV / Ռեզյումե",
    legal: "Իրավական տեղեկություններ",
    inProgress: "(կա՛մ վերամշակում)",
    // Mobile projects
    intratone: "Intratone",
    ios26: "iOS 26",
    waveswitch: "Wave Switch",
    students: "Stratos",
    googlemaps: "Google Maps",
    renault: "Renault",
    // Web projects
    framasoft: "Framasoft",
    ayooapi: "AYOO API",
    // Diverse projects
    namequest: "NameQuest",
    vahansoghomonian: "Vahan Soghomonian",
    chaussezVousOuPas: "Chaussez-vous ou pas",
    sansnom: "Sans nom",
    // Explorations
    vibecoding: "Vibecoding",
    idorensburg: "Idorensburg",
    greenhouse: "Green House",
    cuizin: "CuizIN",
  }
};

interface SectionItem {
  label: keyof typeof translations["FR"];
  href: string;
  isSubItem?: boolean;
  isClickable?: boolean;
}

interface Section {
  title: keyof typeof translations["FR"];
  items: SectionItem[];
}

const getSections = (): Section[] => [
  {
    title: "home",
    items: [
      { label: "home", href: "/" }
    ]
  },
  {
    title: "projects",
    items: [
      { label: "projects", href: "/projects", isSubItem: false, isClickable: true },
      { label: "mobileProjects", href: "#", isSubItem: true },
      { label: "intratone", href: "/projects/intratone", isSubItem: true, isClickable: true },
      { label: "ios26", href: "/projects/ios26", isSubItem: true, isClickable: true },
      { label: "waveswitch", href: "/projects/waveswitch", isSubItem: true, isClickable: true },
      { label: "students", href: "/projects/stratos", isSubItem: true, isClickable: false },
      { label: "googlemaps", href: "https://www.behance.net/gallery/247000211/Google-Maps-App-Extension", isSubItem: true, isClickable: true, target: "_blank", rel: "noopener noreferrer" },
      { label: "renault", href: "https://www.behance.net/gallery/246976591/Renault-App-Extension", isSubItem: true, isClickable: true, target: "_blank", rel: "noopener noreferrer" },
      { label: "googleplayios", href: "https://www.behance.net/gallery/246858627/Google-Play-on-iOS", isSubItem: true, isClickable: true, target: "_blank", rel: "noopener noreferrer" },
      { label: "webProjects", href: "#", isSubItem: true },
      { label: "framasoft", href: "/projects/framasoft", isSubItem: true, isClickable: true },
      { label: "ayooapi", href: "/projects/ayooapi", isSubItem: true, isClickable: false },
      { label: "diverseProjects", href: "#", isSubItem: true },
      { label: "namequest", href: "/projects/namequest", isSubItem: true, isClickable: true },
      { label: "vahansoghomonian", href: "/projects/vahansoghomonian", isSubItem: true, isClickable: true },
      { label: "chaussezVousOuPas", href: "/projects/chaussez-vous-ou-pas", isSubItem: true, isClickable: true },
      { label: "sansnom", href: "/projects/sansnom", isSubItem: true, isClickable: false },
    ]
  },
  {
    title: "skills",
    items: [
      { label: "skills", href: "/skills", isClickable: true }
    ]
  },
  {
    title: "explorations",
    items: [
      { label: "explorations", href: "/explorations", isSubItem: false, isClickable: true },
      { label: "vibecoding", href: "/explorations/vibecoding", isSubItem: true, isClickable: false },
      { label: "idorensburg", href: "/explorations/idorensburg", isSubItem: true, isClickable: false },
      { label: "greenhouse", href: "/explorations/greenhouse", isSubItem: true, isClickable: false },
      { label: "cuizin", href: "/explorations/cuizin", isSubItem: true, isClickable: false },
    ]
  },
  {
    title: "contact",
    items: [
      { label: "contact", href: "/contact", isClickable: true }
    ]
  },
  {
    title: "resume",
    items: [
      { label: "resume", href: "/resume", isClickable: true }
    ]
  },
  {
    title: "legal",
    items: [
      { label: "legal", href: "/legal", isClickable: true }
    ]
  }
];

export default function SitemapPage() {
  const [language, setLanguage] = useState<Language>("FR");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language;
    if (saved && ["FR", "EN", "ՀԱՅ"].includes(saved)) {
      setLanguage(saved);
    }

    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const t = translations[language];
  const sections = getSections();

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="flex-1 w-full flex justify-center pt-20 md:pt-24 pb-4 md:pb-24 px-4 md:px-8">
        <div className="w-full max-w-[1234px]">
          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-semibold mb-12 md:mb-16"
            style={{
              fontFamily: "var(--font-display)",
              color: "#1D1D1F",
              fontWeight: 600,
            }}
          >
            {t.title}
          </h1>

          {/* Content in editorial columns (desktop) */}
          <div
            style={{
              columnCount: 2,
              columnGap: "48px",
              fontFamily: "var(--font-body)",
              color: "#1D1D1F",
              fontSize: "15px",
              lineHeight: "1.8",
            }}
            className="hidden md:block"
          >
            {sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                style={{
                  breakInside: "avoid",
                  marginBottom: "16px",
                }}
              >
                {/* Section title */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "17px",
                    marginBottom: "12px",
                    color: "#1D1D1F",
                  }}
                >
                  {t[section.title]}
                </div>

                {/* Section items */}
                <div>
                  {section.items.map((item, itemIndex) => {
                    const isSubItemCategory = item.href === "#" && item.isSubItem;
                    const subItemPadding = item.isSubItem && !isSubItemCategory ? "24px" : "0px";
                    const isClickable = item.isClickable !== false;

                    return (
                      <div
                        key={itemIndex}
                        style={{
                          paddingLeft: subItemPadding,
                          marginBottom: isSubItemCategory ? "8px" : "4px",
                        }}
                      >
                        {isSubItemCategory ? (
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: "14px",
                              marginTop: "8px",
                              marginBottom: "6px",
                              color: "#1D1D1F",
                              opacity: 0.8,
                            }}
                          >
                            {t[item.label]}
                          </div>
                        ) : isClickable ? (
                          <Link
                            href={item.href}
                            style={{
                              color: "#314DCB",
                              textDecoration: "none",
                              cursor: "pointer",
                              display: "block",
                              breakInside: "avoid",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.textDecoration = "underline";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.textDecoration = "none";
                            }}
                          >
                            {t[item.label]}
                          </Link>
                        ) : (
                          <div
                            style={{
                              color: "#1D1D1F",
                              display: "block",
                              breakInside: "avoid",
                            }}
                          >
                            {t[item.label]} {t.inProgress}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile single column */}
          <div className="md:hidden flex flex-col gap-6">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {/* Section title */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "17px",
                    marginBottom: "12px",
                    color: "#1D1D1F",
                  }}
                >
                  {t[section.title]}
                </div>

                {/* Section items */}
                <div className="flex flex-col gap-2">
                  {section.items.map((item, itemIndex) => {
                    const isSubItemCategory = item.href === "#" && item.isSubItem;
                    const subItemPadding = item.isSubItem && !isSubItemCategory ? "16px" : "0px";
                    const isClickable = item.isClickable !== false;

                    return (
                      <div
                        key={itemIndex}
                        style={{
                          paddingLeft: subItemPadding,
                        }}
                      >
                        {isSubItemCategory ? (
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: "14px",
                              marginTop: "8px",
                              marginBottom: "6px",
                              color: "#1D1D1F",
                              opacity: 0.8,
                            }}
                          >
                            {t[item.label]}
                          </div>
                        ) : isClickable ? (
                          <Link
                            href={item.href}
                            style={{
                              color: "#314DCB",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.textDecoration = "underline";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.textDecoration = "none";
                            }}
                          >
                            {t[item.label]}
                          </Link>
                        ) : (
                          <div
                            style={{
                              color: "#1D1D1F",
                            }}
                          >
                            {t[item.label]} {t.inProgress}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
