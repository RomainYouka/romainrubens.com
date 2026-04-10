"use client";

import { useState, useEffect } from "react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    title: "Accessibilité",
    intro: "Ce site s'inscrit dans une démarche volontaire d'accessibilité numérique. Les choix de conception s'appuient sur les recommandations du RGAA 4 (Référentiel Général d'Amélioration de l'Accessibilité) et des WCAG 2.1, sans pour autant constituer une déclaration de conformité officielle.",

    approachTitle: "Notre démarche",
    approachText: "Une attention particulière est portée aux points suivants :",
    approachList: [
      "Navigation au clavier et gestion du focus",
      "Compatibilité avec les technologies d'assistance (lecteurs d'écran)",
      "Contraste des couleurs et lisibilité des textes",
      "Structure sémantique des pages (titres, landmarks, listes)",
      "Alternatives textuelles pour les éléments non textuels",
      "Indication de la langue de la page",
      "Lien d'évitement vers le contenu principal",
    ],

    techTitle: "Technologies utilisées",
    techText: "Le site est développé avec les technologies suivantes :",
    techList: ["React 19", "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS 4"],

    limitsTitle: "Limites connues",
    limitsText: "Certaines parties du site peuvent encore présenter des imperfections en matière d'accessibilité. Ce site est un portfolio en constante évolution, et des améliorations sont apportées de manière continue. Aucune conformité totale n'est revendiquée.",

    contactTitle: "Une difficulté ? Contactez-nous",
    contactText: "Si vous rencontrez une difficulté pour accéder à un contenu ou utiliser une fonctionnalité, vous pouvez le signaler à l'adresse suivante. Une réponse sera apportée dans les meilleurs délais.",
    contactEmail: "report@romainrubens.com",

    dateTitle: "Dernière mise à jour",
    dateText: "Avril 2026",
  },
  EN: {
    title: "Accessibility",
    intro: "This website reflects a voluntary commitment to digital accessibility. Design decisions are guided by the RGAA 4 and WCAG 2.1 guidelines, without constituting an official compliance declaration.",

    approachTitle: "Our approach",
    approachText: "Particular attention is paid to the following:",
    approachList: [
      "Keyboard navigation and focus management",
      "Compatibility with assistive technologies (screen readers)",
      "Colour contrast and text readability",
      "Semantic page structure (headings, landmarks, lists)",
      "Text alternatives for non-text elements",
      "Page language declaration",
      "Skip link to main content",
    ],

    techTitle: "Technologies used",
    techText: "The site is built with the following technologies:",
    techList: ["React 19", "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS 4"],

    limitsTitle: "Known limitations",
    limitsText: "Some parts of the site may still have accessibility imperfections. This site is an evolving portfolio, and improvements are made on an ongoing basis. No claim of full conformity is made.",

    contactTitle: "Experiencing difficulties? Get in touch",
    contactText: "If you experience difficulty accessing content or using a feature, you can report it at the address below. A response will be provided as soon as possible.",
    contactEmail: "report@romainrubens.com",

    dateTitle: "Last updated",
    dateText: "April 2026",
  },
  ՀԱՅ: {
    title: "Հասանելիություն",
    intro: "Այս կայքը արտացոլում է թվային հասանելիության կամավոր պարտավորություն։ Նախագծման որոշումները հիմնված են RGAA 4 և WCAG 2.1 ուղեցույցների վրա, սակայն չեն հանդիսանում պաշտոնական համապատասխանության հայտարարություն։",

    approachTitle: "Մեր մոտեցումը",
    approachText: "Հատուկ ուշադրություն է դարձվում հետևյալ կետերին.",
    approachList: [
      "Ստեղնաշարի նավիգացիա և ֆոկուսի կառավարում",
      "Օժանդակ տեխնոլոգիաների հետ համատեղելիություն",
      "Գույների կոնտրաստ և տեքստի ընթեռնելիություն",
      "Էջերի իմաստային կառուցվածք",
      "Ոչ տեքստային տարրերի այլընտրանքներ",
      "Էջի լեզվի հայտարարություն",
      "Հիմնական բովանդակությանն անցնելու հղում",
    ],

    techTitle: "Օgtagорцvаc texnoloqianeр",
    techText: "Կայqը mшakvum е hетевyal texnoloqianeрov.",
    techList: ["React 19", "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS 4"],

    limitsTitle: "Հայтni саhmanafaкoumneр",
    limitsText: "Кayqi orosh мaseрum karог ен dеgbum hаsanelioуțyan kaтarelагoutyounneр: Аyd кayqə шаруnakaуtyounn шарауnak portfolio е, ev barelагoumneрn ирakanacrvoum en andrаdz: Лiovin hamapatasvanoуțyan oreve haуtsatroуm chi kaтarvoum:",

    contactTitle: "Khoнdир? Kapveq mer het",
    contactText: "Ете baхarel eq kontentin matknelov кam goгcarkoutyoun оgtagорцelov, karogh eq hayshoumel hетevi hascein: Pahanjvoum е sрa voronq pahanj tnein:",
    contactEmail: "report@romainrubens.com",

    dateTitle: "Vervjin bнaкoum",
    dateText: "Apрil 2026",
  },
};

export default function AccessibilitePage() {
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

  const sectionStyle = { marginBottom: "40px" };

  const headingStyle = {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "20px",
    color: "var(--theme-fg)",
    marginBottom: "12px",
  };

  const textStyle = {
    fontFamily: "var(--font-body)",
    color: "var(--theme-fg)",
    fontSize: "15px",
    lineHeight: "1.7",
  };

  const subtleText = {
    ...textStyle,
    color: "var(--theme-fg)",
    opacity: 0.7,
  };

  return (
    <main
      id="main-content"
      className="flex flex-col w-full min-h-screen"
      style={{ backgroundColor: "var(--theme-bg-alt)" }}
    >
      <div className="flex-1 w-full flex justify-center pt-20 md:pt-24 pb-16 md:pb-24 px-4 md:px-8">
        <div className="w-full max-w-[800px]">

          {/* Titre */}
          <h1
            className="text-3xl md:text-4xl font-semibold mb-6 md:mb-10"
            style={{ fontFamily: "var(--font-display)", color: "var(--theme-fg)", fontWeight: 600 }}
          >
            {t.title}
          </h1>

          {/* Introduction */}
          <p style={{ ...textStyle, marginBottom: "48px", opacity: 0.85, fontSize: "16px", lineHeight: "1.8" }}>
            {t.intro}
          </p>

          {/* Démarche */}
          <section style={sectionStyle} aria-labelledby="approach-heading">
            <h2 id="approach-heading" style={headingStyle}>{t.approachTitle}</h2>
            <p style={{ ...textStyle, marginBottom: "12px" }}>{t.approachText}</p>
            <ul style={{ ...textStyle, paddingLeft: "20px", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {t.approachList.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--theme-accent)", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies */}
          <section style={sectionStyle} aria-labelledby="tech-heading">
            <h2 id="tech-heading" style={headingStyle}>{t.techTitle}</h2>
            <p style={{ ...textStyle, marginBottom: "12px" }}>{t.techText}</p>
            <ul style={{ ...textStyle, paddingLeft: "20px", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
              {t.techList.map((tech, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "var(--theme-accent)", fontWeight: 700, flexShrink: 0 }}>—</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Limites */}
          <section style={sectionStyle} aria-labelledby="limits-heading">
            <h2 id="limits-heading" style={headingStyle}>{t.limitsTitle}</h2>
            <p style={subtleText}>{t.limitsText}</p>
          </section>

          {/* Contact */}
          <section
            aria-labelledby="contact-heading"
            style={{
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid var(--theme-border)",
              backgroundColor: "var(--theme-card-bg)",
            }}
          >
            <h2 id="contact-heading" style={{ ...headingStyle, marginBottom: "8px" }}>{t.contactTitle}</h2>
            <p style={{ ...textStyle, marginBottom: "16px", opacity: 0.8 }}>{t.contactText}</p>
            <a
              href={`mailto:${t.contactEmail}`}
              style={{
                display: "inline-block",
                color: "var(--theme-accent)",
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
            >
              {t.contactEmail}
            </a>
          </section>

          {/* Date */}
          <p style={{ ...subtleText, marginTop: "40px", fontSize: "13px" }}>
            {t.dateTitle} · {t.dateText}
          </p>

        </div>
      </div>
    </main>
  );
}
