"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { detectLanguage, type Language } from "@/lib/language";
import { content } from "./content";
import base from "../renaultextensionapp/project.module.css";
import s from "./project.module.css";

const assets = "/projects/googlemaps-extension/";
function Highlight({ text }: { text: string }) {
  return <>{text.split("**").map((part, i) => i % 2 ? <em key={i}>{part}</em> : part)}</>;
}
function Brand() {
  return <span className={s.brand}><span><strong>Google</strong> Maps</span><span>Extension</span></span>;
}
function Star() {
  return <img src="/projects/googlemaps-extension/star.svg" alt="" width={32} height={32} />;
}
function Asset({ name, alt = "", width, height, className }: { name: string; alt?: string; width: number; height: number; className?: string }) {
  return <img src={`${assets}${name}.webp`} alt={alt} width={width} height={height} className={className} loading="lazy" decoding="async" />;
}

export default function GoogleMapsExtensionPage() {
  const [language, setLanguage] = useState<Language>("EN");
  const [scale, setScale] = useState<number>();
  const container = useRef<HTMLElement>(null);
  const intro = useRef<HTMLElement>(null);
  const t = content[language];

  useEffect(() => {
    setLanguage(detectLanguage());
    const onLanguage = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next in content) setLanguage(next);
    };
    window.addEventListener("languageChange", onLanguage);
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width <= 900 ? 1 : entry.contentRect.width / 1920));
    if (container.current) observer.observe(container.current);
    return () => { observer.disconnect(); window.removeEventListener("languageChange", onLanguage); };
  }, []);

  const descend = () => {
    if (!intro.current) return;
    const top = intro.current.getBoundingClientRect().top + window.scrollY;
    if (!window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: top, cancelable: true }))) return;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const cardText = (index: number) => <div className={s.cardText}><h3><Highlight text={t.cards[index][0]} /></h3><p>{t.cards[index][1]}</p></div>;

  return <main id="main-content" ref={container} className={`${base.page} ${s.page}`} lang={language === "ՀԱՅ" ? "hy" : language.toLowerCase()}>
    <div className={`${base.canvas} ${s.canvas}`} style={{ zoom: scale } as CSSProperties}>
      <section className={s.hero} aria-label="Google Maps App Extension">
        <div className={s.heroGroup}><div className={s.heroTitles}>
          <p className={s.kicker}><Star /><span>{t.introducing}</span></p>
          <h1><Brand /></h1>
          <p className={s.year}>2026</p>
        </div><button className={s.down} onClick={descend} aria-label={t.discover}><ArrowDown size={33} /></button></div>
      </section>
      <section ref={intro} className={s.intro}>
        <div className={s.firstQuote}><h2><em>{t.heading[0]}</em> <span>{t.heading[1]}</span></h2>
          <blockquote><p>“<Highlight text={t.quote} />”</p><cite>Romain Rubens</cite></blockquote>
        </div>
        <blockquote className={s.testimony}><p>“<Highlight text={t.testimony} />”</p><cite>{t.user}</cite></blockquote>
      </section>
      <section className={s.showcase} aria-label={t.hero}>
        <div className={s.heroVisual}><Asset name="heroShapes" width={444} height={996} /><Asset name="heroPhones" width={1184} height={1180} alt={t.hero} /></div>
      </section>
      <section className={s.design}>
        <div className={s.case}>
          <div className={s.statement}><h2 className={s.pill}>{t.question}</h2><p><Highlight text={t.questionText} /></p></div>
          <div className={s.cards}>
            <article className={`${s.card} ${s.uncoordinated}`}><Asset name="signage" width={392} height={175} />{cardText(0)}</article>
            <div className={s.row}><article className={`${s.card} ${s.negative}`}><Asset name="survey" width={323} height={183} />{cardText(1)}</article><article className={`${s.card} ${s.minutes}`}>{cardText(2)}</article></div>
            <article className={`${s.card} ${s.interactive}`}><Asset name="bar" width={591} height={141} />{cardText(3)}</article>
            <div className={s.row}><article className={`${s.card} ${s.missing}`}>{cardText(4)}</article><article className={`${s.card} ${s.chick}`}><Asset name="chick" width={94} height={118} />{cardText(5)}</article></div>
          </div>
          <div className={s.statement}><h2 className={s.pill}>{t.proposal}</h2><p>{t.proposalText}</p></div>
        </div>
      </section>
      <section className={s.research}>
        <div className={s.researchStack}>
          {t.research.map(([title, text], i) => <article key={i} className={`${s.researchCard} ${s.researchPair}`}>
            <Asset name={i === 0 ? "maps" : "constraints"} width={i === 0 ? 539 : 557} height={i === 0 ? 312 : 402} />
            <div><h3>{title}</h3><p>{text}</p></div>
          </article>)}
          <article className={`${s.researchCard} ${s.personas}`}><div className={s.personaRow}>
            {t.personas.map((text, i) => <div className={s.persona} key={i}><Asset name={`persona${i + 1}`} width={[246,144,161][i]} height={[124,209,159][i]} /><p>{text}</p></div>)}
          </div><h3>{t.personasTitle}</h3></article>
          <article className={`${s.researchCard} ${s.flow}`}><Asset name="flow" width={870} height={415} alt={t.flow} /></article>
        </div>
      </section>
      <section className={s.screens} aria-label={t.screens}><div className={s.screenGrid}>
        {Array.from({ length: 30 }, (_, i) => <Asset key={i} name={`screen-${String(i + 1).padStart(2,"0")}`} width={382} height={830} alt={`${t.screens} — ${i + 1}/30`} />)}
      </div></section>
      <section className={s.field}><Asset name="field" width={1920} height={890} alt={t.field} /></section>
      <section className={s.applications}><div className={s.applicationStack}>
        <div className={`${s.applicationHeading} ${s.apple}`}><h2>{t.other}</h2><Asset name="appleLogo" width={262} height={71} alt="Apple Plans" /></div>
        <div className={`${s.applicationScreens} ${s.apple}`}><Asset name="apple" width={1034} height={669} alt="Apple Maps — Perrache" /></div>
        <div className={`${s.applicationHeading} ${s.tcl}`}><h2>{t.local}</h2><Asset name="tclLogo" width={174} height={70} alt="TCL" /></div>
        <div className={`${s.applicationScreens} ${s.tcl}`}><Asset name="tcl" width={1034} height={668} alt="TCL — Perrache" /></div>
      </div></section>
      <nav className={s.explore} aria-label={t.explore}>
        <Brand /><p className={s.kicker}><Star /><span>{t.explore}</span></p>
        <div className={s.links}><Link href="/projects"><ArrowLeft size={29} />{t.back}</Link><Link className={s.next} href="/projects/googleplayios">{t.next}<ArrowRight size={29} /></Link></div>
      </nav>
    </div>
  </main>;
}
