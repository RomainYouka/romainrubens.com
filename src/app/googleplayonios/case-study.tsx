"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { detectLanguage, type Language } from "@/lib/language";
import { GoogleLanguage } from "./ProjectCopy";
import base from "../renaultextensionapp/project.module.css";
import s from "./project.module.css";

const copy = {
  EN: { introducing: "Introducing", discover: "Discover the project", title: ["Alternative distribution", "on iOS in the EU"], quote: "To reflect the DMA’s requirements, users in the EU can install apps from alternative app marketplaces and directly from an authorized developer’s website. After agreeing to the Alternative Terms Addendum for Apps in the EU, developers can access alternative app marketplace distribution in App Store Connect, as well as request access to APIs for Web Distribution and operating an alternative app marketplace.", thought: "This project explores what Google Play could look like if it were designed specifically for iOS rather than simply adapted from Android.", explore: "Explore more", back: "Back to projects", next: "Next project" },
  FR: { introducing: "Présentation", discover: "Découvrir le projet", title: ["Distribution alternative", "sur iOS dans l’UE"], quote: "Pour répondre aux exigences du DMA, les utilisateurs de l’UE peuvent installer des applications depuis des boutiques alternatives et directement depuis le site d’un développeur autorisé. Après avoir accepté l’avenant aux conditions alternatives pour les applications dans l’UE, les développeurs peuvent accéder à la distribution via des boutiques alternatives dans App Store Connect et demander l’accès aux API de distribution web et d’exploitation d’une boutique alternative.", thought: "Ce projet explore ce que pourrait être Google Play s’il était conçu spécifiquement pour iOS, plutôt que simplement adapté d’Android.", explore: "Explorer davantage", back: "Retour aux projets", next: "Projet suivant" },
  ՀԱՅ: { introducing: "Ներկայացնում ենք", discover: "Բացահայտել նախագիծը", title: ["Այլընտրանքային տարածում", "iOS-ում՝ ԵՄ տարածքում"], quote: "DMA-ի պահանջներին համապատասխան՝ ԵՄ օգտատերերը կարող են հավելվածներ տեղադրել այլընտրանքային խանութներից և անմիջապես լիազորված մշակողի կայքից։ ԵՄ հավելվածների այլընտրանքային պայմանների հավելվածն ընդունելուց հետո մշակողները կարող են App Store Connect-ում օգտվել այլընտրանքային խանութների տարածումից և դիմել վեբ տարածման ու այլընտրանքային խանութի կառավարման API-ների համար։", thought: "Այս նախագիծը ուսումնասիրում է, թե ինչպիսին կարող է լինել Google Play-ը, եթե այն հատուկ նախագծվեր iOS-ի համար, այլ ոչ պարզապես հարմարեցվեր Android-ից։", explore: "Բացահայտել ավելին", back: "Վերադառնալ նախագծերին", next: "Հաջորդ նախագիծը" },
};
function Star() { return <img src="/projects/googleplay-ios/star.svg" width={32} height={32} alt="" />; }
const quoteHighlights: Record<Language, string[]> = { EN: ["users in the EU can install apps from alternative app marketplaces", "developers can access alternative app marketplace"], FR: ["les utilisateurs de l’UE peuvent installer des applications depuis des boutiques alternatives", "les développeurs peuvent accéder à la distribution via des boutiques alternatives"], ՀԱՅ: ["ԵՄ օգտատերերը կարող են հավելվածներ տեղադրել այլընտրանքային խանութներից", "մշակողները կարող են App Store Connect-ում օգտվել այլընտրանքային խանութների տարածումից"] };
const thoughtHighlights: Record<Language, string[]> = { EN: ["Google Play could look like", "for iOS"], FR: ["ce que pourrait être Google Play", "spécifiquement pour iOS"], ՀԱՅ: ["ինչպիսին կարող է լինել Google Play-ը", "հատուկ նախագծվեր iOS-ի համար"] };
function Highlight({ text, phrases }: { text: string; phrases: string[] }) {
  let parts: { text: string; accent: boolean }[] = [{ text, accent: false }];
  for (const phrase of phrases) parts = parts.flatMap(part => part.accent ? [part] : part.text.split(phrase).flatMap((text, index) => index ? [{ text: phrase, accent: true }, { text, accent: false }] : [{ text, accent: false }]));
  return parts.map((part, i) => part.accent ? <em key={i}>{part.text}</em> : part.text);
}
export default function CaseStudy({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");
  const [scale, setScale] = useState<number>();
  const container = useRef<HTMLElement>(null), intro = useRef<HTMLElement>(null);
  const t = copy[language];
  useEffect(() => {
    setLanguage(detectLanguage());
    const change = (event: Event) => { const value = (event as CustomEvent<Language>).detail; if (value in copy) setLanguage(value); };
    window.addEventListener("languageChange", change);
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width <= 900 ? 1 : entry.contentRect.width / 1920));
    if (container.current) observer.observe(container.current);
    return () => { observer.disconnect(); window.removeEventListener("languageChange", change); };
  }, []);
  const descend = () => {
    if (!intro.current) return;
    const top = intro.current.getBoundingClientRect().top + window.scrollY;
    if (!window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: top, cancelable: true }))) return;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <GoogleLanguage.Provider value={language}><main id="main-content" ref={container} className={`${base.page} ${s.page}`} lang={language === "ՀԱՅ" ? "hy" : language.toLowerCase()}>
    <div className={`${base.canvas} ${s.canvas}`} style={{ zoom: scale } as CSSProperties}>
      <section className={s.hero}><div className={s.heroGroup}><div className={s.heroTitles}><p className={s.kicker}><Star />{t.introducing}</p><h1><strong>Google Play</strong><span>on iOS</span></h1><p className={s.year}>2026</p></div><button className={s.down} onClick={descend} aria-label={t.discover}><ArrowDown size={33} /></button></div></section>
      <section ref={intro} id="googleplay-introduction" className={s.intro}><div className={s.firstQuote}><h2><em>{t.title[0]}</em> <span>{t.title[1]}</span></h2><blockquote><p>“<Highlight text={t.quote} phrases={quoteHighlights[language]} />”</p><cite><a href="https://developer.apple.com/support/dma-and-apps-in-the-eu/" target="_blank" rel="noopener noreferrer">Developer.apple.com</a></cite></blockquote></div><blockquote className={s.thought}><p>“<Highlight text={t.thought} phrases={thoughtHighlights[language]} />”</p><cite>Romain Rubens</cite></blockquote></section>
      {children}
      <div className={s.exploreBackdrop}><nav className={s.explore} aria-label={t.explore}><div className={s.brand}>Google Play <span>on iOS</span></div><p className={s.kicker}><Star />{t.explore}</p><div className={s.links}><Link href="/projects"><ArrowLeft size={29} />{t.back}</Link><Link className={s.next} href="/goupildigitalecosystem">{t.next}<ArrowRight size={29} /></Link></div></nav></div>
    </div>
  </main></GoogleLanguage.Provider>;
}
