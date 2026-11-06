"use client";

import { detectLanguage } from "@/lib/language";
import { SFIcon, ExternalLinkBadge } from "@/components/SFIcon";
import { accessibilityAudit } from "@/data/accessibility-audit";

import { useState, useEffect } from "react";

type Language = "FR" | "EN" | "ՀԱՅ";

const translations = {
  FR:{title:"Accessibilité"},
  EN:{title:"Accessibility"},
  ՀԱՅ:{title:"Հասանելիություն"},
};

export default function AccessibilitePage() {
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

  const copy = {
    FR:{
      date:"Novembre 2026",status:"Conformité non évaluée",standards:"Références et cadre réglementaire",
      standardText:"Objectif : WCAG 2.2 niveau AA. Le référentiel français publié est le RGAA 4.1.2. Le RGAA 5 est encore en préparation lors de cette mise à jour. Un audit complet, incluant des tests manuels, reste nécessaire pour établir une conformité.",
      legal:"Ce portfolio suit une démarche volontaire. L’applicabilité des obligations légales dépend du statut de l’éditeur et des services proposés : cette page ne constitue ni une certification ni une déclaration réglementaire de conformité.",
      results:"Performance et accessibilité mesurées",scope:"Accueil en production uniquement · 6 novembre 2026 · Lighthouse 13.6.0",
      caution:"Ces mesures de laboratoire ne concernent ni toutes les pages ni la preview future. Un score d’accessibilité n’est pas un pourcentage de conformité WCAG ou RGAA. Aucune donnée terrain suffisante n’était disponible dans ce rapport.",
      mobile:"Mobile",desktop:"Ordinateur",performance:"Performance",accessibility:"Accessibilité",best:"Bonnes pratiques",seo:"SEO",report:"Consulter le rapport Google",
      findings:"Points à améliorer",findingText:"Le rapport de production signale un contraste insuffisant dans les textes secondaires de la présentation et un LCP mobile de 3,3 s. Le contraste a été revu dans future, mais cette correction n’est pas encore mesurée sur la production. Les tests avec lecteurs d’écran, le zoom, les documents PDF et les pages de projets restent à auditer de façon complète.",
      controls:"Fonctions et contrôles",controlText:"Lien d’évitement, focus visible, langue du document, mode monochrome et prise en compte de la réduction des animations. Le défilement par écrans sur l’accueil garde un défilement libre lorsque le contenu dépasse la hauteur disponible ou en cas de zoom tactile, afin de ne pas rendre du contenu inaccessible.",
      contact:"Signaler une difficulté",contactText:"Indiquez la page, le navigateur, l’appareil et la difficulté rencontrée. Une solution alternative pourra être recherchée.",
      update:"Dernière mise à jour",sources:"Sources officielles",notFull:"Audit partiel · aucune conformité totale revendiquée",
    },
    EN:{
      date:"November 2026",status:"Conformance not evaluated",standards:"Standards and legal context",
      standardText:"Target: WCAG 2.2 Level AA. The published French framework is RGAA 4.1.2; RGAA 5 is still being prepared at this update. A full audit, including manual testing, is required to establish conformance.",
      legal:"This portfolio takes a voluntary approach. Legal obligations depend on the publisher’s status and services offered. This page is neither a certification nor a statutory conformance statement.",
      results:"Measured performance and accessibility",scope:"Production homepage only · 6 November 2026 · Lighthouse 13.6.0",
      caution:"These lab measurements do not cover every page or the future preview. An accessibility score is not a WCAG or RGAA compliance percentage. This report had insufficient real-user field data.",
      mobile:"Mobile",desktop:"Desktop",performance:"Performance",accessibility:"Accessibility",best:"Best practices",seo:"SEO",report:"Open the Google report",
      findings:"Improvements still needed",findingText:"The production report flags low contrast in secondary introduction text and a mobile LCP of 3.3 s. Contrast has been revised in future, but the change has not yet been measured in production. Screen readers, zoom, PDF documents and project pages still require comprehensive auditing.",
      controls:"Features and checks",controlText:"Skip link, visible focus, document language, monochrome mode and reduced-motion support. Home’s screen-by-screen scrolling falls back to free scrolling when content exceeds the viewport or touch zoom is active, so content remains reachable.",
      contact:"Report an accessibility issue",contactText:"Include the page, browser, device and issue you encountered so an alternative can be explored.",
      update:"Last updated",sources:"Official sources",notFull:"Partial audit · no claim of full conformance",
    },
    ՀԱՅ:{
      date:"Նոյեմբեր 2026",status:"Համապատասխանությունը գնահատված չէ",standards:"Չափորոշիչներ և իրավական համատեքստ",
      standardText:"Նպատակ՝ WCAG 2.2, AA մակարդակ։ Ֆրանսիայի հրապարակված շրջանակը RGAA 4.1.2-ն է, իսկ RGAA 5-ը դեռ պատրաստման փուլում է։ Համապատասխանությունը հաստատելու համար անհրաժեշտ է ամբողջական աուդիտ՝ ներառյալ ձեռքով ստուգումները։",
      legal:"Այս պորտֆոլիոն հետևում է կամավոր մոտեցման։ Իրավական պարտավորությունները կախված են հրատարակչի կարգավիճակից և առաջարկվող ծառայություններից։ Այս էջը հավաստագիր կամ իրավական համապատասխանության հայտարարություն չէ։",
      results:"Չափված արդյունավետություն և հասանելիություն",scope:"Միայն հրապարակված գլխավոր էջը · 6 նոյեմբերի 2026 · Lighthouse 13.6.0",
      caution:"Լաբորատոր չափումները չեն ընդգրկում բոլոր էջերը կամ future նախադիտումը։ Հասանելիության միավորը WCAG կամ RGAA համապատասխանության տոկոս չէ։ Զեկույցում իրական օգտատերերի բավարար տվյալներ չկային։",
      mobile:"Բջջային",desktop:"Համակարգիչ",performance:"Արդյունավետություն",accessibility:"Հասանելիություն",best:"Լավագույն գործելակերպեր",seo:"SEO",report:"Բացել Google-ի զեկույցը",
      findings:"Բարելավման կետեր",findingText:"Հրապարակված տարբերակի զեկույցը նշում է ներկայացման երկրորդական տեքստի թույլ կոնտրաստը և բջջային LCP՝ 3.3 վ։ Կոնտրաստը վերանայվել է future-ում, սակայն դեռ չի չափվել հրապարակված կայքում։ Էկրանի ընթերցիչները, խոշորացումը, PDF-ները և նախագծերի էջերը դեռ պահանջում են ամբողջական աուդիտ։",
      controls:"Գործառույթներ և ստուգումներ",controlText:"Հիմնական բովանդակությանն անցնելու հղում, տեսանելի ֆոկուս, փաստաթղթի լեզու, մոնոխրոմ ռեժիմ և նվազեցված անիմացիաներ։ Երբ բովանդակությունը գերազանցում է էկրանի բարձրությունը կամ միացված է հպումով խոշորացումը, գլխավոր էջը պահպանում է ազատ ոլորումը։",
      contact:"Հայտնել հասանելիության խնդրի մասին",contactText:"Նշեք էջը, դիտարկիչը, սարքը և հանդիպած խնդիրը՝ այլընտրանքային լուծում գտնելու համար։",
      update:"Վերջին թարմացում",sources:"Պաշտոնական աղբյուրներ",notFull:"Մասնակի աուդիտ · ամբողջական համապատասխանություն չի հայտարարվում",
    },
  }[language];
  const cardStyle={backgroundColor:"var(--theme-bg)",borderColor:"var(--theme-border)",color:"var(--theme-fg)"};
  const headingStyle={color:"var(--theme-fg)"};
  return <main id="main-content" className="w-full min-h-screen px-4 md:px-8 pt-24 md:pt-28 pb-24" style={{backgroundColor:"var(--theme-bg-alt)",color:"var(--theme-fg)"}}>
    <div className="max-w-[1202px] mx-auto">
      <h1 className="text-3xl md:text-5xl font-semibold mb-4" style={headingStyle}>{t.title}</h1>
      <p className="mb-2" style={{color:"var(--theme-subtle)"}}>{copy.update} · {copy.date}</p>
      <p className="mb-10" style={headingStyle}>{copy.notFull}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-[20px] border p-5 md:p-6 md:col-span-2" style={cardStyle}>
          <h2 className="text-xl md:text-2xl font-semibold mb-4" style={headingStyle}>{copy.standards}</h2>
          <p className="font-semibold mb-3" style={headingStyle}>{copy.status}</p>
          <p className="mb-4 leading-relaxed" style={headingStyle}>{copy.standardText}</p>
          <p className="leading-relaxed" style={{color:"var(--theme-subtle)"}}>{copy.legal}</p>
        </section>
        <section className="rounded-[20px] border p-5 md:p-6 md:col-span-2" style={cardStyle}>
          <h2 className="text-xl md:text-2xl font-semibold mb-3" style={headingStyle}>{copy.results}</h2>
          <p className="mb-6 text-sm" style={{color:"var(--theme-subtle)"}}>{copy.scope}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(["mobile","desktop"] as const).map(device=><div key={device} className="rounded-[16px] border p-5" style={{borderColor:"var(--theme-pill-border)",backgroundColor:"var(--theme-pill-bg)"}}>
              <h3 className="text-lg font-semibold mb-4" style={headingStyle}>{copy[device]}</h3>
              <dl className="grid grid-cols-2 gap-4">
                {([["performance",copy.performance],["accessibility",copy.accessibility],["bestPractices",copy.best],["seo",copy.seo]] as const).map(([key,label])=><div key={key}><dt className="text-sm">{label}</dt><dd className="text-3xl font-semibold mt-1"><span data-audit-score={accessibilityAudit[device][key]} style={accessibilityAudit[device][key] === 100 ? { color: "var(--theme-success-aaa)" } : undefined}>{accessibilityAudit[device][key]}</span><span className="text-sm font-normal">/100</span></dd></div>)}
              </dl>
              <p className="text-sm mt-5" style={{color:"var(--theme-subtle)"}}>LCP {accessibilityAudit[device].lcp} · TBT {accessibilityAudit[device].tbt} · CLS {accessibilityAudit[device].cls}</p>
              <a href={accessibilityAudit.report+"?form_factor="+device} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between gap-3 min-h-11 underline underline-offset-4" style={headingStyle}>{copy.report}<ExternalLinkBadge /></a>
            </div>)}
          </div>
          <p className="mt-6 text-sm leading-relaxed" style={{color:"var(--theme-subtle)"}}>{copy.caution}</p>
        </section>
        <section className="rounded-[20px] border p-5 md:p-6" style={cardStyle}>
          <h2 className="text-xl md:text-2xl font-semibold mb-4" style={headingStyle}>{copy.findings}</h2>
          <p className="leading-relaxed" style={headingStyle}>{copy.findingText}</p>
        </section>
        <section className="rounded-[20px] border p-5 md:p-6" style={cardStyle}>
          <h2 className="text-xl md:text-2xl font-semibold mb-4" style={headingStyle}>{copy.controls}</h2>
          <p className="leading-relaxed" style={headingStyle}>{copy.controlText}</p>
        </section>
        <section className="rounded-[20px] border p-5 md:p-6" style={cardStyle}>
          <h2 className="text-xl md:text-2xl font-semibold mb-4" style={headingStyle}>{copy.sources}</h2>
          <ul className="space-y-2">
            {[["WCAG 2.2 · W3C","https://www.w3.org/TR/WCAG22/"],["RGAA 4.1.2 · DINUM","https://accessibilite.numerique.gouv.fr/"],["Directive européenne · DGCCRF","https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/la-nouvelle-directive-europeenne-accessibilite-pour-des-produits-et-des-services-accessibles-aux-personnes-en-situation"]].map(([label,href])=><li key={href}><a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 min-h-11 underline underline-offset-4" style={headingStyle}>{label}<ExternalLinkBadge /></a></li>)}
          </ul>
        </section>
        <section className="rounded-[20px] border p-5 md:p-6" style={cardStyle}>
          <h2 className="text-xl md:text-2xl font-semibold mb-4" style={headingStyle}>{copy.contact}</h2>
          <p className="mb-5 leading-relaxed" style={headingStyle}>{copy.contactText}</p>
          <a href="mailto:report@romainrubens.com" className="flex items-center justify-between gap-3 rounded-full border px-5 py-3 min-h-12" style={{...headingStyle,borderColor:"var(--theme-pill-border)",backgroundColor:"var(--theme-pill-bg)"}}>report@romainrubens.com<SFIcon name="envelope" size={20} /></a>
        </section>
      </div>
    </div>
  </main>;
}
