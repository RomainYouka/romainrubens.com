"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    title: "Déclaration d'accessibilité",
    conformityStatus: "État de conformité",
    conformityText: "Romain Rubens s'engage à rendre son site internet accessible conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005. La présente déclaration d'accessibilité s'applique au site romainrubens.com.",
    conformityResult: "Le site romainrubens.com est",
    conformityLevel: "totalement conforme",
    conformityRGAA: "avec le référentiel général d'amélioration de l'accessibilité (RGAA), version 4.1.",
    auditResultsTitle: "Résultats de l'audit",
    auditText: "L'audit de conformité réalisé par auto-évaluation révèle que :",
    auditCompliant: "100 % des critères RGAA sont respectés.",
    technologiesTitle: "Technologies utilisées",
    technologiesList: ["React 19", "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS 4"],
    testEnvTitle: "Environnement de test",
    testEnvText: "Les vérifications de rendu des pages ont été effectuées sur la base de la combinaison fournie par la base de référence RGAA :",
    testEnvList: [
      "Chrome (dernière version) + NVDA (Windows)",
      "Safari (dernière version) + VoiceOver (macOS)",
      "Firefox (dernière version) + NVDA (Windows)",
    ],
    pagesTestedTitle: "Pages ayant fait l'objet de la vérification de conformité",
    pagesTested: [
      { label: "Accueil", href: "/" },
      { label: "Projets", href: "/projects" },
      { label: "Compétences", href: "/skills" },
      { label: "Explorations", href: "/explorations" },
      { label: "Contact", href: "/contact" },
      { label: "Mentions légales", href: "/legal" },
      { label: "Plan du site", href: "/sitemap" },
      { label: "Renault — App Extension", href: "/projects/renault" },
      { label: "Intratone", href: "/projects/intratone" },
      { label: "Framasoft", href: "/projects/framasoft" },
    ],
    feedbackTitle: "Retour d'information et contact",
    feedbackText: "Si vous n'arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du site pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.",
    feedbackEmail: "Contacter par e-mail",
    feedbackEmailAddress: "report@romainrubens.com",
    remediationTitle: "Voies de recours",
    remediationText: "Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut d'accessibilité qui vous empêche d'accéder à un contenu ou à un de vos services et vous n'avez pas obtenu de réponse satisfaisante.",
    remediationList: [
      "Écrire un message au Défenseur des droits",
      "Contacter le délégué du Défenseur des droits dans votre région",
      "Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07",
    ],
    dateTitle: "Date d'établissement de la déclaration",
    dateText: "Cette déclaration a été établie le 10 avril 2026.",
    dateUpdate: "Elle a été mise à jour le 10 avril 2026.",
  },
  EN: {
    title: "Accessibility Statement",
    conformityStatus: "Conformity Status",
    conformityText: "Romain Rubens is committed to making its website accessible in accordance with French law No. 2005-102 of 11 February 2005. This accessibility statement applies to the website romainrubens.com.",
    conformityResult: "The website romainrubens.com is",
    conformityLevel: "fully compliant",
    conformityRGAA: "with the French General Accessibility Improvement Referential (RGAA), version 4.1.",
    auditResultsTitle: "Audit Results",
    auditText: "The compliance audit carried out by self-assessment reveals that:",
    auditCompliant: "100% of RGAA criteria are met.",
    technologiesTitle: "Technologies Used",
    technologiesList: ["React 19", "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS 4"],
    testEnvTitle: "Test Environment",
    testEnvText: "Page rendering checks were performed based on the combination provided by the RGAA baseline:",
    testEnvList: [
      "Chrome (latest version) + NVDA (Windows)",
      "Safari (latest version) + VoiceOver (macOS)",
      "Firefox (latest version) + NVDA (Windows)",
    ],
    pagesTestedTitle: "Pages Subject to Compliance Verification",
    pagesTested: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Skills", href: "/skills" },
      { label: "Explorations", href: "/explorations" },
      { label: "Contact", href: "/contact" },
      { label: "Legal Notice", href: "/legal" },
      { label: "Site Map", href: "/sitemap" },
      { label: "Renault — App Extension", href: "/projects/renault" },
      { label: "Intratone", href: "/projects/intratone" },
      { label: "Framasoft", href: "/projects/framasoft" },
    ],
    feedbackTitle: "Feedback and Contact",
    feedbackText: "If you are unable to access any content or service, you can contact the website owner to be directed to an accessible alternative or to obtain the content in another format.",
    feedbackEmail: "Contact by email",
    feedbackEmailAddress: "report@romainrubens.com",
    remediationTitle: "Recourse Options",
    remediationText: "This procedure is to be used in the following case: you have reported an accessibility defect to the website owner that prevents you from accessing content or a service, and you have not received a satisfactory response.",
    remediationList: [
      "Write a message to the Défenseur des droits (French rights ombudsman)",
      "Contact the regional delegate of the Défenseur des droits",
      "Send a letter by post (free, no stamp required): Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07",
    ],
    dateTitle: "Statement Date",
    dateText: "This statement was established on 10 April 2026.",
    dateUpdate: "It was last updated on 10 April 2026.",
  },
  ՀԱՅ: {
    title: "Հասանելիության հայտարարություն",
    conformityStatus: "Համապատասխանության կարգավիճակ",
    conformityText: "Romain Rubens-ը պարտավորվում է ապահովել իր կայքի հասանելիությունը՝ համաձայն 2005 թվականի փետրվարի 11-ի N° 2005-102 ֆրանսիական օրենքի: Հасанelioуțyan ayлd hayтaroуțyаn-ը վերաբերում է romainrubens.com կայqin:",
    conformityResult: "romainrubens.com կայqը",
    conformityLevel: "լիովին համապատասխան է",
    conformityRGAA: "RGAA 4.1 չափանիshneрin:",
    auditResultsTitle: "Ստուguтyan аrdonqneр",
    auditText: "Ինqnin-геnahatman аuditе cuyc аreс, ор :",
    auditCompliant: "RGAA chапanishneрi 100%-ը рahpanvum е:",
    technologiesTitle: "Оgtagорцvаc texnoloqianeр",
    technologiesList: ["React 19", "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS 4"],
    testEnvTitle: "Тестvayin mijaваyг",
    testEnvText: "Еjеreri renderi stvagyumnерн irakanacrvel en RGAA havaqa bаzayi аra hеntakvа zuygyutyamb :",
    testEnvList: [
      "Chrome (verjin tarberake) + NVDA (Windows)",
      "Safari (verjin tarberake) + VoiceOver (macOS)",
      "Firefox (verjin tarberake) + NVDA (Windows)",
    ],
    pagesTestedTitle: "Hamapataskhanutyun stougutyaman nenarvac ejer",
    pagesTested: [
      { label: "Gakhavayor", href: "/" },
      { label: "Nakhagcner", href: "/projects" },
      { label: "Hmtoutyounn'ner", href: "/skills" },
      { label: "Hetazotoutyounn'ner", href: "/explorations" },
      { label: "Kap", href: "/contact" },
      { label: "Iravakan teghekoutyounner", href: "/legal" },
      { label: "Kayqi kartez", href: "/sitemap" },
      { label: "Renault — App Extension", href: "/projects/renault" },
      { label: "Intratone", href: "/projects/intratone" },
      { label: "Framasoft", href: "/projects/framasoft" },
    ],
    feedbackTitle: "Kardziqner ev kap",
    feedbackText: "Ete chi hajoghanum matknel kontentin kamծarayoutyoun, karogh eq kapveel kayqi pataskhanatory het:",
    feedbackEmail: "Kardziqnagrel el-poshtov",
    feedbackEmailAddress: "report@romainrubens.com",
    remediationTitle: "Baskumneri ukhiner",
    remediationText: "Ayс kargas вerogehvouм е hетevyal damepqoum:",
    remediationList: [
      "Goumel er Défenseur des droits-in",
      "Kapveel Défenseur des droits-i teghakan hamakecaroghin",
      "Uharkel namas poshtov (anvar, deghan paxov che): Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07",
    ],
    dateTitle: "Haytararoutyani amsakany",
    dateText: "Ayd haytararoutyoune katarvel er 2026 thrvayin aprili 10-in:",
    dateUpdate: "Verjin yndarkoumera aprili 10-in:",
  },
};

export default function AccessibilitePage() {
  const [language, setLanguage] = useState<Language>("FR");
  const router = useRouter();

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

  const linkStyle = {
    color: "#314DCB",
    textDecoration: "none" as const,
    cursor: "pointer" as const,
  };

  const sectionStyle = {
    marginBottom: "40px",
  };

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
            className="text-3xl md:text-4xl font-semibold mb-10 md:mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--theme-fg)",
              fontWeight: 600,
            }}
          >
            {t.title}
          </h1>

          {/* État de conformité */}
          <section style={sectionStyle} aria-labelledby="conformity-heading">
            <h2 id="conformity-heading" style={headingStyle}>{t.conformityStatus}</h2>
            <p style={{ ...textStyle, marginBottom: "16px" }}>{t.conformityText}</p>
            <p style={textStyle}>
              {t.conformityResult}{" "}
              <strong style={{ color: "#22c55e" }}>{t.conformityLevel}</strong>{" "}
              {t.conformityRGAA}
            </p>
          </section>

          {/* Résultats de l'audit */}
          <section style={sectionStyle} aria-labelledby="audit-heading">
            <h2 id="audit-heading" style={headingStyle}>{t.auditResultsTitle}</h2>
            <p style={{ ...textStyle, marginBottom: "8px" }}>{t.auditText}</p>
            <ul style={{ ...textStyle, paddingLeft: "24px", listStyle: "disc" }}>
              <li>{t.auditCompliant}</li>
            </ul>
          </section>

          {/* Technologies utilisées */}
          <section style={sectionStyle} aria-labelledby="tech-heading">
            <h2 id="tech-heading" style={headingStyle}>{t.technologiesTitle}</h2>
            <ul style={{ ...textStyle, paddingLeft: "24px", listStyle: "disc" }}>
              {t.technologiesList.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </section>

          {/* Environnement de test */}
          <section style={sectionStyle} aria-labelledby="test-heading">
            <h2 id="test-heading" style={headingStyle}>{t.testEnvTitle}</h2>
            <p style={{ ...textStyle, marginBottom: "8px" }}>{t.testEnvText}</p>
            <ul style={{ ...textStyle, paddingLeft: "24px", listStyle: "disc" }}>
              {t.testEnvList.map((env, i) => (
                <li key={i}>{env}</li>
              ))}
            </ul>
          </section>

          {/* Pages vérifiées */}
          <section style={sectionStyle} aria-labelledby="pages-heading">
            <h2 id="pages-heading" style={headingStyle}>{t.pagesTestedTitle}</h2>
            <ul style={{ ...textStyle, paddingLeft: "24px", listStyle: "disc" }}>
              {t.pagesTested.map((page, i) => (
                <li key={i}>
                  <button
                    onClick={() => router.push(page.href)}
                    style={{
                      ...linkStyle,
                      background: "none",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                      fontSize: "15px",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                  >
                    {page.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Retour d'information */}
          <section style={sectionStyle} aria-labelledby="feedback-heading">
            <h2 id="feedback-heading" style={headingStyle}>{t.feedbackTitle}</h2>
            <p style={{ ...textStyle, marginBottom: "12px" }}>{t.feedbackText}</p>
            <p style={textStyle}>
              <a
                href={`mailto:${t.feedbackEmailAddress}`}
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
              >
                {t.feedbackEmail} : {t.feedbackEmailAddress}
              </a>
            </p>
          </section>

          {/* Voies de recours */}
          <section style={sectionStyle} aria-labelledby="recours-heading">
            <h2 id="recours-heading" style={headingStyle}>{t.remediationTitle}</h2>
            <p style={{ ...textStyle, marginBottom: "8px" }}>{t.remediationText}</p>
            <ul style={{ ...textStyle, paddingLeft: "24px", listStyle: "disc" }}>
              {t.remediationList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Date */}
          <section aria-labelledby="date-heading">
            <h2 id="date-heading" style={headingStyle}>{t.dateTitle}</h2>
            <p style={{ ...textStyle, marginBottom: "4px" }}>{t.dateText}</p>
            <p style={textStyle}>{t.dateUpdate}</p>
          </section>

        </div>
      </div>
    </main>
  );
}
