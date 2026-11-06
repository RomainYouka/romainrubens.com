"use client";

import { detectLanguage } from "@/lib/language";
import { articles } from "@/data/articles";

import { useState, useEffect } from "react";
import Link from "next/link";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    title: "Plan du site",
    home: "Accueil",
    projects: "Projets",
    articles: "Articles",
    article01: "01 — Un jour, je serai Designer",
    article02: "02 — La maison connectée change de dimension",
    article03: "03 — Comprendre avant de concevoir",
    article04: "04 — De l’autre côté de l’interface",
    mobileProjects: "Projets mobiles",
    webProjects: "Projets web",
    diverseProjects: "Projets divers",
    skills: "Compétences",
    explorations: "Explorations",
    contact: "Contact",
    resume: "CV / Resume",
    legal: "Mentions légales",
    accessibility: "Accessibilité",
    inProgress: "(en cours)",
    // Mobile projects
    intratone: "Intratone",
    ios26: "iOS 26",
    waveswitch: "Wave Switch",
    students: "Students",
    googlemaps: "Google Maps",
    googleplayios: "Google Play on iOS",
    renault: "Renault",
    // Web projects
    framasoft: "Framasoft",
    goupil: "Goupil",
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
    articles: "Articles",
    article01: "01 — One Day, I’ll Be a Designer",
    article02: "02 — The Smart Home Enters a New Era",
    article03: "03 — Understanding Before Designing",
    article04: "04 — On the Other Side of the Interface",
    mobileProjects: "Mobile projects",
    webProjects: "Web projects",
    diverseProjects: "Diverse projects",
    skills: "Skills",
    explorations: "Explorations",
    contact: "Contact",
    resume: "CV / Resume",
    legal: "Legal Notice",
    accessibility: "Accessibility",
    inProgress: "(in progress)",
    // Mobile projects
    intratone: "Intratone",
    ios26: "iOS 26",
    waveswitch: "Wave Switch",
    students: "Students",
    googlemaps: "Google Maps",
    googleplayios: "Google Play on iOS",
    renault: "Renault",
    // Web projects
    framasoft: "Framasoft",
    goupil: "Goupil",
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
    articles: "Հոդվածներ",
    article01: "01 — Մի օր ես դիզայներ կլինեմ",
    article02: "02 — Խելացի տունը մտնում է նոր դարաշրջան",
    article03: "03 — Հասկանալ նախքան ձևավորելը",
    article04: "04 — Ինտերֆեյսի մյուս կողմում",
    mobileProjects: "Բջջային նախագծեր",
    webProjects: "Վեբ նախագծեր",
    diverseProjects: "Տարբեր նախագծեր",
    skills: "Հմտություններ",
    explorations: "Հետազոտություններ",
    contact: "Կապ",
    resume: "CV / Ռեզյումե",
    legal: "Իրավական տեղեկություններ",
    accessibility: "Հասանելիություն",
    inProgress: "(կա՛մ վերամշակում)",
    // Mobile projects
    intratone: "Intratone",
    ios26: "iOS 26",
    waveswitch: "Wave Switch",
    students: "Students",
    googlemaps: "Google Maps",
    googleplayios: "Google Play on iOS",
    renault: "Renault",
    // Web projects
    framasoft: "Framasoft",
    goupil: "Goupil",
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
  target?: string;
  rel?: string;
}

interface Section {
  title: keyof typeof translations["FR"];
  items: SectionItem[];
}

const getSections = (language: Language): Section[] => [
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
      { label: "students", href: "/stratosapp", isSubItem: true, isClickable: true },
      { label: "googlemaps", href: "/googlemapsextension", isSubItem: true, isClickable: true },
      { label: "renault", href: "/renaultextensionapp", isSubItem: true, isClickable: true },
      { label: "googleplayios", href: "https://www.behance.net/gallery/246858627/Google-Play-on-iOS", isSubItem: true, isClickable: true, target: "_blank", rel: "noopener noreferrer" },
      { label: "webProjects", href: "#", isSubItem: true },
      { label: "framasoft", href: "/projects/framasoft", isSubItem: true, isClickable: true },
      { label: "goupil", href: "https://www.behance.net/gallery/253535235/Goupil-Digital-Ecosystem-UXUI-Design-System", isSubItem: true, isClickable: true, target: "_blank", rel: "noopener noreferrer" },
      { label: "diverseProjects", href: "#", isSubItem: true },
      { label: "namequest", href: "/projects/namequest", isSubItem: true, isClickable: true },
      { label: "vahansoghomonian", href: "/projects/vahansoghomonian", isSubItem: true, isClickable: true },
      { label: "chaussezVousOuPas", href: "/projects/chaussez-vous-ou-pas", isSubItem: true, isClickable: true },
    ]
  },
  {
    title: "articles",
    items: [
      { label: "articles", href: "/articles", isClickable: true },
      ...articles.map((article, index): SectionItem => ({ label: (["article01", "article02", "article03", "article04"] as const)[index], href: article.href[language], isSubItem: true, isClickable: true, target: "_blank", rel: "noopener noreferrer" })),
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
  },
  {
    title: "accessibility",
    items: [
      { label: "accessibility", href: "/accessibility", isClickable: true }
    ]
  }
];

export default function SitemapPage() {
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    const saved = detectLanguage() as Language;
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
  const sections = getSections(language);

  return (
    <main id="main-content" className="w-full min-h-screen px-4 md:px-8 pt-24 md:pt-28 pb-24" style={{backgroundColor:"var(--theme-bg-alt)",color:"var(--theme-fg)"}}>
      <div className="max-w-[1202px] mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4" style={{color:"var(--theme-fg)"}}>{t.title}</h1>
        <p className="mb-10 max-w-2xl" style={{color:"var(--theme-subtle)"}}>
          {language==="FR" ? "Toutes les pages et tous les projets, accessibles directement depuis un seul endroit." : language==="EN" ? "Every page and project, with direct access from one place." : "Բոլոր էջերն ու նախագծերը՝ մեկ վայրից անմիջապես հասանելի։"}
        </p>
        <nav aria-label={t.title} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map(section=>{
            const entry=section.items.find(item=>item.label===section.title);
            const children=section.items.filter(item=>item.label!==section.title);
            return <section key={section.title} className={`rounded-[20px] border p-5 md:p-6 ${section.title==="projects" || section.title==="home" ? "md:col-span-2" : ""}`} style={{borderColor:"var(--theme-border)",backgroundColor:"var(--theme-bg)"}}>
              <h2 className="text-xl md:text-2xl font-semibold">
                <Link href={entry?.href || "/"} className="flex items-center justify-between gap-4 min-h-12 rounded-full px-5 py-3 border no-underline hover:no-underline hover:opacity-80 transition-opacity" style={{color:"var(--theme-fg)",backgroundColor:"var(--theme-pill-bg)",borderColor:"var(--theme-pill-border)"}}>
                  <span>{t[section.title]}</span><span aria-hidden="true">→</span>
                </Link>
              </h2>
              {children.length>0 && <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {children.map(item=><li key={item.label} className={item.href==="#" ? "sm:col-span-2" : ""}>
                  {item.href==="#" ? <h3 className="text-sm font-semibold mt-5 mb-2" style={{color:"var(--theme-subtle)"}}>{t[item.label]}</h3>
                    : <Link href={item.href} target={item.target} rel={item.rel} className="flex items-center justify-between gap-3 min-h-11 py-2 px-2 rounded-lg hover:underline underline-offset-4" style={{color:"var(--theme-fg)"}}>
                      <span>{t[item.label]}</span>
                      <span aria-hidden="true">{item.target==="_blank" ? "↗" : "→"}</span>
                      {item.target==="_blank" && <span className="sr-only">{language==="FR" ? "(nouvel onglet)" : language==="EN" ? "(new tab)" : "(նոր ներդիր)"}</span>}
                    </Link>}
                </li>)}
              </ul>}
            </section>;
          })}
        </nav>
      </div>
    </main>
  );
}
