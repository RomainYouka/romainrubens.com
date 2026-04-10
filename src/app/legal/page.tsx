"use client";

import { useState, useEffect } from "react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR: {
    title: "Mentions Légales",
    sections: [
      {
        heading: "Dénomination.",
        content: "Le présent site internet, accessible à l'adresse romainrubens.com, est édité par RUBENS Romain, étudiant en design industriel spécialisé en UX/UI et design d'interaction, domicilié en France."
      },
      {
        heading: "Contact.",
        content: "Pour toute prise de contact, demande ou information complémentaire, vous pouvez écrire à l'adresse suivante : contact@romainrubens.com."
      },
      {
        heading: "Signalement.",
        content: "Toute erreur, anomalie ou problème technique peut être signalé à l'adresse suivante : report@romainrubens.com."
      },
      {
        heading: "Hébergement.",
        content: "Le site est hébergé par Vercel Inc., plateforme de déploiement et d'hébergement d'applications web."
      },
      {
        heading: "Nom de domaine.",
        content: "Le nom de domaine romainrubens.com est la propriété exclusive de RUBENS Romain."
      },
      {
        heading: "Propriété intellectuelle.",
        content: "L'ensemble des contenus présents sur ce site, incluant de manière non exhaustive les projets, interfaces, visuels, textes, animations, fichiers et structure générale, est la propriété exclusive de RUBENS Romain sauf mention contraire.\nToute reproduction, représentation, modification, publication, transmission ou exploitation, totale ou partielle, sans autorisation écrite préalable est strictement interdite."
      },
      {
        heading: "Utilisation des ressources.",
        content: "Certains projets peuvent inclure des ressources accessibles telles que des fichiers Figma, documents PDF ou autres supports.\nToute utilisation, reproduction ou extraction, même partielle, de ces éléments est strictement interdite.\nToute demande doit être formulée par email à contact@romainrubens.com en précisant l'identité du demandeur, le contexte, l'objectif et les modalités d'utilisation envisagées.\nAucune autorisation n'est implicite."
      },
      {
        heading: "Données personnelles.",
        content: "Le site ne collecte aucune donnée personnelle.\nAucun formulaire de collecte n'est présent.\nLes interactions proposées redirigent vers des services tiers indépendants."
      },
      {
        heading: "Responsabilité.",
        content: "Les informations présentes sur ce site sont fournies à titre indicatif.\nRUBENS Romain ne saurait être tenu responsable des erreurs, omissions ou de l'interprétation et de l'usage des informations.\nLes liens externes ne sont pas sous le contrôle de l'éditeur."
      },
      {
        heading: "Validité.",
        content: "Les présentes mentions légales sont applicables à compter de leur mise en ligne et pour toute la durée d'exploitation du site."
      },
      {
        heading: "Modification.",
        content: "RUBENS Romain se réserve le droit de modifier à tout moment les présentes mentions légales afin de les adapter à l'évolution du site, de la législation ou de ses activités."
      }
    ]
  },
  EN: {
    title: "Legal Notice",
    sections: [
      {
        heading: "Identification.",
        content: "This website, accessible at romainrubens.com, is published by RUBENS Romain, an industrial design student specializing in UX/UI and interaction design, based in France."
      },
      {
        heading: "Contact.",
        content: "For any inquiries or requests, you may contact: contact@romainrubens.com."
      },
      {
        heading: "Reporting.",
        content: "Any issue, error, or technical problem can be reported at: report@romainrubens.com."
      },
      {
        heading: "Hosting.",
        content: "The website is hosted by Vercel Inc., a web application hosting and deployment platform."
      },
      {
        heading: "Domain name.",
        content: "The domain name romainrubens.com is the exclusive property of RUBENS Romain."
      },
      {
        heading: "Intellectual property.",
        content: "All content on this website, including but not limited to projects, interfaces, visuals, texts, animations, files, and overall structure, is the exclusive property of RUBENS Romain unless otherwise stated.\nAny reproduction, modification, distribution, or use, in whole or in part, without prior written permission is strictly prohibited."
      },
      {
        heading: "Use of resources.",
        content: "Some projects may include accessible resources such as Figma files, PDFs, or other materials.\nAny use, extraction, or reproduction, even partial, is strictly prohibited.\nRequests must be sent to contact@romainrubens.com specifying identity, context, purpose, and intended use.\nNo permission is granted implicitly."
      },
      {
        heading: "Personal data.",
        content: "This website does not collect any personal data.\nNo forms are used.\nInteractions redirect to external third-party services."
      },
      {
        heading: "Liability.",
        content: "The information provided on this website is for informational purposes only.\nRUBENS Romain cannot be held responsible for errors, omissions, or misuse of the information.\nExternal links are not under the control of the publisher."
      },
      {
        heading: "Validity.",
        content: "These legal notices are effective from the moment they are published and for the entire duration of the website's operation."
      },
      {
        heading: "Modification.",
        content: "RUBENS Romain reserves the right to modify these legal notices at any time."
      }
    ]
  },
  ՀԱՅ: {
    title: "Իրավական տեղեկություններ",
    sections: [
      {
        heading: "Նույնականացում։",
        content: "Այս կայքը, հասանելի romainrubens.com հասցեով, պատկանում և կառավարվում է RUBENS Romain-ի կողմից, որը արդյունաբերական դիզայնի ուսանող է՝ մասնագիտացած UX/UI և փոխազդեցության դիզայնում, և բնակվում է Ֆրանսիայում։"
      },
      {
        heading: "Կապ։",
        content: "Ցանկացած հարցման կամ հաղորդակցության համար կարող եք գրել՝ contact@romainrubens.com։"
      },
      {
        heading: "Խնդիրների հաղորդում։",
        content: "Ցանկացած սխալ կամ տեխնիկական խնդիր կարող եք հաղորդել՝ report@romainrubens.com։"
      },
      {
        heading: "Հոսթինգ։",
        content: "Կայքը հոսթինգ է ստանում Vercel Inc. հարթակի միջոցով։"
      },
      {
        heading: "Դոմենային անուն։",
        content: "romainrubens.com դոմենը պատկանում է բացառապես RUBENS Romain-ին։"
      },
      {
        heading: "Մտավոր սեփականություն։",
        content: "Կայքում ներկայացված բոլոր բովանդակությունները՝ ներառյալ նախագծերը, ինտերֆեյսները, վիզուալները, տեքստերը, անիմացիաները և կառուցվածքը, պատկանում են RUBENS Romain-ին, եթե այլ բան նշված չէ։\nՀանցակցային օգտագործում առանց նախնական գրավոր թույլտվության խստիվ արգելվում է։"
      },
      {
        heading: "Ռեսուրսների օգտագործում։",
        content: "Որոշ նախագծեր կարող են ներառել Figma ֆայլեր, PDF-ներ կամ այլ նյութեր։\nԱրդրանց օգտագործումը նույնիսկ մասամբ արգելվում է։\nՀարցումները պետք է ուղարկվեն contact@romainrubens.com հասցեին՝ նշելով նպատակը և օգտագործման պայմանները։"
      },
      {
        heading: "Անձնական տվյալներ։",
        content: "Կայքը չի հավաքում անձնական տվյալներ։\nՉկան ձևաթղթեր։\nԲոլոր գործողությունները փոխանցվում են արտաքին ծառայությունների։"
      },
      {
        heading: "Պատասխանատվություն։",
        content: "Տեղեկատվությունը տրամադրվում է տեղեկատվական նպատակներով։\nRUBENS Romain-ը պատասխանատվություն չի կրում հնարավոր սխալների կամ օգտագործման համար։"
      },
      {
        heading: "Վավերականություն։",
        content: "Այս իրավական տեղեկությունները գործում են հրապարակման պահից։"
      },
      {
        heading: "Փոփոխություններ։",
        content: "RUBENS Romain-ը իրավունք ունի փոփոխել այս իրավական տեղեկությունները ցանկացած պահի։"
      }
    ]
  }
};

export default function LegalPage() {
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

  return (
    <main id="main-content" className="flex flex-col w-full min-h-screen" style={{ backgroundColor: "var(--theme-bg-alt)" }}>
      <div className="flex-1 w-full flex justify-center pt-20 md:pt-24 pb-4 md:pb-24 px-4 md:px-8">
        <div className="w-full max-w-[1234px]">
          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-semibold mb-12 md:mb-16"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--theme-fg)",
              fontWeight: 600,
            }}
          >
            {t.title}
          </h1>

          {/* Content in editorial columns (not grid) */}
          <div
            style={{
              columnCount: 2,
              columnGap: "48px",
              fontFamily: "var(--font-body)",
              color: "var(--theme-fg)",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
            className="hidden md:block"
          >
            {t.sections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 mb-4 break-inside-avoid"
                style={{
                  breakInside: "avoid",
                }}
              >
                {/* Heading */}
                <span
                  style={{
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {section.heading}
                </span>

                {/* Content with email/contact links */}
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {section.content.split(/(contact@romainrubens\.com|report@romainrubens\.com|romainrubens\.com)/g).map((part, i) => {
                    const isEmail = part === "contact@romainrubens.com" || part === "report@romainrubens.com";
                    const isDomain = part === "romainrubens.com";
                    return isEmail || isDomain ? (
                      <a
                        key={i}
                        href={isEmail ? `mailto:${part}` : `https://${part}`}
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
                        {part}
                      </a>
                    ) : (
                      <span key={i}>{part}</span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile single column */}
          <div className="md:hidden flex flex-col gap-4">
            {t.sections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col gap-2"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--theme-fg)",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                {/* Heading */}
                <span
                  style={{
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {section.heading}
                </span>

                {/* Content with email/contact links */}
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {section.content.split(/(contact@romainrubens\.com|report@romainrubens\.com|romainrubens\.com)/g).map((part, i) => {
                    const isEmail = part === "contact@romainrubens.com" || part === "report@romainrubens.com";
                    const isDomain = part === "romainrubens.com";
                    return isEmail || isDomain ? (
                      <a
                        key={i}
                        href={isEmail ? `mailto:${part}` : `https://${part}`}
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
                        {part}
                      </a>
                    ) : (
                      <span key={i}>{part}</span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
