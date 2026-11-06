"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { detectLanguage, type Language } from "@/lib/language";
import { SFIcon } from "@/components/SFIcon";

const translations = {
  "FR": {
    "title": "Mentions légales",
    "date": "Mise à jour · 6 novembre 2026",
    "intro": "Édition du site, droits d’utilisation et protection des données.",
    "sections": [
      [
        "Éditeur et publication",
        "romainrubens.com est un portfolio personnel non commercial édité par Romain Rubens, responsable de la publication. Il présente ses projets, articles et travaux de design. Aucune vente en ligne n’est proposée.\nContact éditorial et demandes d’autorisation : hello@romainrubens.com."
      ],
      [
        "Hébergement",
        "Vercel Inc.\n440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.\nTéléphone publié par Vercel pour son contact juridique : +1 559 288 7060.\nCoordonnées de référence : vercel.com/legal/dmca-policy."
      ],
      [
        "Droits sur les contenus",
        "Les créations originales de Romain Rubens sont protégées par le droit d’auteur. Les marques, logos, photographies, interfaces et ressources de tiers restent soumis aux droits de leurs titulaires. Les projets collectifs demeurent soumis aux droits des coauteurs.\nSauf licence indiquée ou exception légale, toute reproduction, adaptation, diffusion ou exploitation nécessite l’autorisation préalable du titulaire des droits. L’accès à un PDF ou fichier Figma ne transfère aucun droit de propriété intellectuelle."
      ],
      [
        "Projets et marques citées",
        "Les concepts et projets académiques documentent un travail de design. La présence d’une marque n’implique ni partenariat, ni validation, ni commercialisation du concept par cette marque, sauf indication expresse dans le projet."
      ],
      [
        "Données personnelles",
        "L’accès au site implique le traitement de données techniques par les prestataires d’hébergement et de sécurité, notamment les adresses IP et informations de requête, pour délivrer et protéger le service. Les coordonnées et messages que vous adressez volontairement par courriel servent à répondre à votre demande, sur la base de l’intérêt légitime de l’éditeur à gérer ces échanges.\nLes échanges ne sont conservés que pendant la durée nécessaire à leur traitement et, le cas échéant, à la défense des droits de l’éditeur. Les durées des journaux techniques et les éventuels transferts hors de l’Espace économique européen dépendent des contrats et politiques des prestataires concernés."
      ],
      [
        "Préférences et mesure d’audience",
        "Le navigateur mémorise des préférences de langue, d’apparence et de contraste dans ses stockages locaux ou de session. Vous pouvez les effacer dans ses paramètres.\nLorsque la mesure d’audience est configurée, Umami Cloud reçoit des événements de consultation et d’interaction. L’absence de cookies ne suffit pas à établir une exemption de consentement : celle-ci dépend de la configuration et des conditions applicables. Aucune certification CNIL n’est revendiquée."
      ],
      [
        "Vos droits et signalements",
        "Pour exercer vos droits d’accès, de rectification, d’effacement, de limitation ou d’opposition lorsqu’ils s’appliquent : hello@romainrubens.com. Une vérification proportionnée de votre identité peut être nécessaire. Vous pouvez également saisir la CNIL.\nPour une erreur, une atteinte à vos droits, une demande de rectification ou de droit de réponse : report@romainrubens.com. Indiquez la page, les faits concernés et un moyen de vous répondre."
      ],
      [
        "Disponibilité et cadre applicable",
        "L’éditeur veille à l’exactitude des informations et au fonctionnement du site, sans garantir l’absence d’erreurs ou d’interruptions. Les services externes, notamment Medium, LinkedIn, Behance et Cal.com, appliquent leurs propres conditions et politiques de confidentialité.\nCes informations sont établies au regard du droit français, notamment de la LCEN et des règles de protection des données, sans priver les visiteurs des dispositions impératives applicables ni limiter les responsabilités auxquelles la loi interdit de déroger."
      ]
    ]
  },
  "EN": {
    "title": "Legal notice",
    "date": "Updated · 6 November 2026",
    "intro": "Website publishing information, content usage rights and personal data protection.",
    "sections": [
      [
        "Publisher and publication",
        "romainrubens.com is a personal, non-commercial portfolio published by Romain Rubens, who is responsible for publication. It presents his design work, projects and articles. No online sales are offered.\nEditorial enquiries and permission requests: hello@romainrubens.com."
      ],
      [
        "Hosting",
        "Vercel Inc.\n440 N Barranca Ave #4133, Covina, CA 91723, United States.\nTelephone published by Vercel for its legal contact: +1 559 288 7060.\nReference contact details: vercel.com/legal/dmca-policy."
      ],
      [
        "Content rights",
        "Romain Rubens’s original creations are protected by copyright. Third-party trademarks, logos, photographs, interfaces and resources remain subject to their owners’ rights. Collaborative projects remain subject to their co-authors’ rights.\nUnless a licence or statutory exception applies, reproduction, adaptation, distribution or exploitation requires the relevant rights holder’s prior permission. Access to a PDF or Figma file does not transfer intellectual property rights."
      ],
      [
        "Projects and trademarks",
        "Concepts and academic projects document design work. Mentioning a brand does not imply partnership, endorsement or commercial release by that brand, unless expressly stated in the project."
      ],
      [
        "Personal data",
        "Accessing the website involves processing technical data by hosting and security providers, including IP addresses and request information, to deliver and protect the service. Contact details and messages you voluntarily send by email are used to respond to your enquiry, based on the publisher’s legitimate interest in handling correspondence.\nCorrespondence is retained only as needed to handle the enquiry and, where necessary, protect legal rights. Technical log retention and any transfers outside the European Economic Area depend on the relevant providers’ contracts and policies."
      ],
      [
        "Preferences and audience measurement",
        "The browser stores language, appearance and contrast preferences in local or session storage. You can clear these in your browser settings.\nWhen audience measurement is configured, Umami Cloud receives page-view and interaction events. A cookie-free tool is not automatically exempt from consent requirements: exemption depends on its configuration and applicable conditions. No CNIL certification is claimed."
      ],
      [
        "Your rights and reporting",
        "To exercise applicable rights of access, rectification, erasure, restriction or objection: hello@romainrubens.com. Proportionate identity verification may be necessary. You may also complain to the French data protection authority, CNIL.\nFor an error, content affecting your rights, a correction or right-of-reply request: report@romainrubens.com. Include the precise page, relevant facts and a way to contact you."
      ],
      [
        "Availability and applicable framework",
        "The publisher seeks to keep information accurate and the website working, without guaranteeing uninterrupted or error-free access. External services, including Medium, LinkedIn, Behance and Cal.com, apply their own terms and privacy policies.\nThis information refers to French law, including the LCEN and data protection rules, without depriving visitors of mandatory protections or excluding liability that cannot lawfully be excluded."
      ]
    ]
  },
  "ՀԱՅ": {
    "title": "Իրավական տեղեկություններ",
    "date": "Թարմացում · 6 նոյեմբերի 2026",
    "intro": "Կայքի հրատարակիչը, օգտագործման իրավունքներն ու տվյալների պաշտպանությունը։",
    "sections": [
      [
        "Հրատարակիչ և հրապարակում",
        "romainrubens.com-ը Ռոմեն Ռուբենսի անձնական, ոչ առևտրային պորտֆոլիոն է։ Նա կայքի հրատարակիչն ու հրապարակման պատասխանատուն է։ Կայքը ներկայացնում է նրա դիզայնի նախագծերն ու հոդվածները և չի առաջարկում առցանց վաճառք։\nԽմբագրական հարցեր և թույլտվություններ՝ hello@romainrubens.com։"
      ],
      [
        "Հոսթինգ",
        "Vercel Inc.\n440 N Barranca Ave #4133, Covina, CA 91723, ԱՄՆ։\nVercel-ի հրապարակած իրավական կապի հեռախոս՝ +1 559 288 7060։\nՊաշտոնական կոնտակտներ՝ vercel.com/legal/dmca-policy։"
      ],
      [
        "Բովանդակության իրավունքներ",
        "Ռոմեն Ռուբենսի ինքնատիպ ստեղծագործությունները պաշտպանված են հեղինակային իրավունքով։ Երրորդ անձանց ապրանքանիշերը, լոգոները, լուսանկարներն ու ինտերֆեյսները մնում են համապատասխան իրավատերերի սեփականությունը։ Համատեղ նախագծերի նկատմամբ պահպանվում են համահեղինակների իրավունքները։\nԲացառությամբ նշված լիցենզիայի կամ օրենքով նախատեսված դեպքերի՝ վերարտադրումը, փոփոխումը կամ տարածումը պահանջում է իրավատիրոջ նախնական թույլտվությունը։ PDF կամ Figma ֆայլի հասանելիությունը չի փոխանցում մտավոր սեփականության իրավունքներ։"
      ],
      [
        "Նախագծեր և ապրանքանիշեր",
        "Հայեցակարգերն ու ուսումնական նախագծերը ներկայացնում են դիզայնի աշխատանքը։ Ապրանքանիշի հիշատակումը չի նշանակում գործընկերություն, հաստատում կամ հայեցակարգի առևտրայնացում, եթե այլ բան հստակ նշված չէ։"
      ],
      [
        "Անձնական տվյալներ",
        "Կայքի աշխատանքի և անվտանգության համար մատակարարները մշակում են տեխնիկական տվյալներ՝ ներառյալ IP հասցեներն ու հարցումների տեղեկությունները։ Ձեր կամավոր ուղարկած նամակներն ու կոնտակտները մշակվում են հարցմանը պատասխանելու համար՝ նամակագրությունը վարելու օրինական շահի հիմքով։\nՆամակագրությունը պահվում է հարցման մշակման և անհրաժեշտության դեպքում իրավունքների պաշտպանության համար անհրաժեշտ ժամանակով։ Տեխնիկական մատյանների պահպանման ժամկետներն ու Եվրոպական տնտեսական տարածքից դուրս փոխանցումները կախված են մատակարարների պայմանագրերից և քաղաքականություններից։"
      ],
      [
        "Նախընտրություններ և վիճակագրություն",
        "Դիտարկիչը տեղային կամ նստաշրջանի պահոցներում հիշում է լեզվի, տեսքի և կոնտրաստի նախընտրությունները։ Դրանք կարող եք ջնջել կարգավորումներում։\nԵրբ լսարանի չափումը կարգավորված է, Umami Cloud-ը ստանում է դիտումների և գործողությունների իրադարձություններ։ Cookie-ների բացակայությունն ինքնին չի ազատում համաձայնության պահանջից․ դա կախված է կարգավորումներից և կիրառելի պայմաններից։ CNIL-ի հավաստագրում չի հայտարարվում։"
      ],
      [
        "Ձեր իրավունքներն ու հաղորդումները",
        "Հասանելիության, ուղղման, ջնջման, սահմանափակման կամ առարկության կիրառելի իրավունքներն իրականացնելու համար գրեք hello@romainrubens.com։ Կարող է անհրաժեշտ լինել ինքնության համաչափ ստուգում։ Կարող եք նաև դիմել CNIL-ին։\nՍխալների, իրավունքների խախտումների, ուղղման կամ պատասխանի իրավունքի հարցումների համար՝ report@romainrubens.com։ Նշեք էջը, փաստերն ու կապի միջոցը։"
      ],
      [
        "Հասանելիություն և իրավական շրջանակ",
        "Հրատարակիչը ձգտում է ապահովել ճշգրիտ տեղեկություններ և կայքի աշխատանքը՝ առանց անխափան կամ անսխալ հասանելիություն երաշխավորելու։ Medium, LinkedIn, Behance և Cal.com արտաքին ծառայությունները կիրառում են իրենց պայմաններն ու քաղաքականությունները։\nՏեղեկությունները կազմված են ֆրանսիական իրավունքի, ներառյալ LCEN-ի և տվյալների պաշտպանության կանոնների հիմքով՝ չզրկելով այցելուներին կիրառելի պարտադիր պաշտպանությունից և չսահմանափակելով օրենքով չբացառվող պատասխանատվությունը։"
      ]
    ]
  }
};

const references = [
  ["LCEN · Article 1-1", "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164"],
  ["CNIL", "https://www.cnil.fr/"],
  ["Vercel · Legal contact", "https://vercel.com/legal/dmca-policy"],
  ["Vercel · Privacy", "https://vercel.com/legal/privacy-policy"],
  ["Umami · Privacy", "https://umami.is/privacy"],
];

export default function LegalPage() {
  const [language, setLanguage] = useState<Language>("EN");
  useEffect(() => {
    setLanguage(detectLanguage());
    const onLanguage = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next in translations) setLanguage(next);
    };
    window.addEventListener("languageChange", onLanguage);
    return () => window.removeEventListener("languageChange", onLanguage);
  }, []);
  const t = translations[language];
  const cardStyle = { backgroundColor: "var(--theme-bg)", borderColor: "var(--theme-border)", color: "var(--theme-fg)" };
  return <main id="main-content" className="w-full min-h-screen px-4 md:px-8 pt-24 md:pt-28 pb-24" style={{ backgroundColor: "var(--theme-bg-alt)", color: "var(--theme-fg)" }}>
    <div className="max-w-[1202px] mx-auto">
      <h1 className="text-3xl md:text-5xl font-semibold mb-4" style={{ color: "var(--theme-fg)" }}>{t.title}</h1>
      <p className="mb-2" style={{ color: "var(--theme-subtle)" }}>{t.date}</p>
      <p className="mb-10 max-w-2xl leading-relaxed" style={{ color: "var(--theme-fg)" }}>{t.intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.sections.map(([heading, text], i) => <section key={heading} className={`rounded-[20px] border p-5 md:p-6 ${i === 0 ? "md:col-span-2" : ""}`} style={cardStyle}>
          <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: "var(--theme-fg)" }}>{heading}</h2>
          <p className="leading-relaxed whitespace-pre-line" style={{ color: "var(--theme-fg)" }}>{text.split(/(hello@romainrubens\.com|report@romainrubens\.com)/g).map((part, j) => part.includes("@") ? <a key={j} href={`mailto:${part}`} className="underline underline-offset-4 break-words" style={{ color: "var(--theme-fg)" }}>{part}</a> : part)}</p>
        </section>)}
        <section className="rounded-[20px] border p-5 md:p-6 md:col-span-2" style={cardStyle}>
          <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: "var(--theme-fg)" }}>{language === "FR" ? "Références et services" : language === "EN" ? "References and services" : "Հղումներ և ծառայություններ"}</h2>
          <ul data-sitemap-icons className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {references.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 min-h-11 underline underline-offset-4" style={{ color: "var(--theme-fg)" }}>{label}<SFIcon name="share" size={18} /></a></li>)}
          </ul>
          <Link href="/accessibility" className="mt-6 flex items-center justify-between min-h-12 border rounded-full px-5 py-3 gap-4" style={{ color: "var(--theme-fg)", borderColor: "var(--theme-pill-border)", backgroundColor: "var(--theme-pill-bg)" }}>{language === "FR" ? "Consulter l’accessibilité" : language === "EN" ? "Read accessibility information" : "Կարդալ հասանելիության մասին"}<SFIcon name="arrow-light" size={20} /></Link>
        </section>
      </div>
    </div>
  </main>;
}
