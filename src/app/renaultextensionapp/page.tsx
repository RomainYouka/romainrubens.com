"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { detectLanguage, type Language } from "@/lib/language";
import { content } from "./content";
import s from "./project.module.css";

const assets = "/projects/renault/";
function Highlight({ text }: { text: string }) {
  return <>{text.split("**").map((part, index) => index % 2 ? <em key={index}>{part}</em> : part)}</>;
}
function Credits({ text }: { text: string }) {
  const profiles: Record<string, string> = { "Erwan Hodonou": "https://www.linkedin.com/in/erwan-hodonou-37471b1ba/", "Fanny Parise": "https://www.linkedin.com/in/fanny-parise/" };
  return <>{text.split("**").map((part, index) => {
    const name = Object.keys(profiles).find(name => part.startsWith(name));
    return index % 2 ? <em key={index}>{name ? <a href={profiles[name]} target="_blank" rel="noopener noreferrer">{part}</a> : part}</em> : part;
  })}</>;
}
function Title() {
  return <div className={s.title}><span className={s.wordmark}><img src={`${assets}title.svg`} alt="Renault" width={289} height={56} /></span><span>App Extension</span></div>;
}
function Star() { return <img src={`${assets}star.svg`} width={32} height={32} alt="" />; }

export default function RenaultExtensionPage() {
  const [language, setLanguage] = useState<Language>("EN");
  const container = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLElement>(null);
  const [scale, setScale] = useState<number>();
  const t = content[language];
  useEffect(() => {
    setLanguage(detectLanguage());
    const onLanguage = (event: Event) => {
      const value = (event as CustomEvent<Language>).detail;
      if (value in content) setLanguage(value);
    };
    window.addEventListener("languageChange", onLanguage);
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width <= 900 ? 1 : Math.min(1, entry.contentRect.width / 1920)));
    if (container.current) observer.observe(container.current);
    return () => { observer.disconnect(); window.removeEventListener("languageChange", onLanguage); };
  }, []);
  const descend = () => {
    const element = intro.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    if (!window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: top, cancelable: true }))) return;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const cardText = (index: number) => <div className={s.cardText}><h3><Highlight text={t.cards[index][0]} /></h3><p>{t.cards[index][1]}</p></div>;
  return <main id="main-content" ref={container} className={s.page} lang={language === "ՀԱՅ" ? "hy" : language.toLowerCase()}>
    <div className={s.canvas} style={{ zoom: scale } as CSSProperties}>
      <section className={s.hero} aria-label="Renault App Extension">
        <img className={s.background} src={`${assets}hero.png`} alt="" fetchPriority="high" />
        <div className={s.heroGroup}>
          <div className={s.heroTitles}><div className={s.kicker}><Star />{t.introducing}</div><h1><Title /></h1><p className={s.year}>2026</p></div>
          <button onClick={descend} className={s.down} aria-label={t.down}><ArrowDown size={33} /></button>
        </div>
      </section>
      <section ref={intro} id="introduction" className={s.intro}>
        <img className={s.background} src={`${assets}intro.png`} alt="" />
        <div className={s.introBody}><div className={s.firstQuote}>
          <h2><em>{t.measure[0]}</em> <span>{t.measure[1]}</span></h2>
          <blockquote><p><Highlight text={t.quote} /></p><cite>Cahier Ethno-Design, Strate × Renault</cite></blockquote>
        </div><blockquote className={s.personal}><p><Highlight text={t.personal} /></p><cite>Romain Rubens &amp; Erwan Hodonou</cite></blockquote></div>
      </section>
      <section className={s.mockup}><img src={`${assets}active.png`} alt={t.activeAlt} width={1762} height={1212} loading="lazy" /></section>
      <section className={s.design}>
        <div className={s.case}>
          <div className={s.statement}><h2 className={s.pill}>{t.question}</h2><p><Highlight text={t.questionText} /></p></div>
          <div className={s.cards}>
            <div className={s.row}>
              <article className={s.card}><div className={s.measureCard}><div className={s.bars} aria-hidden="true"><i /><i /><i /><i /></div>{cardText(0)}</div></article>
              <article className={s.card}><div className={s.quotaText}>{cardText(1)}</div></article>
            </div>
            <article className={`${s.card} ${s.wide}`}><div className={s.household}>
              <div className={s.people}>{["megane.png", "r5.png", "r4.png", "person.svg"].map((file, i) => <div className={s.person} key={file}><img src={assets + file} width={130} height={87} alt="" loading="lazy" /><span>{[t.me, "Aurélie", "Max", t.add][i]}</span></div>)}</div>{cardText(2)}
            </div></article>
            <div className={s.row}>
              <article className={s.card}><div className={s.discipline}>{cardText(3)}</div></article>
              <article className={s.card}><div className={s.shame}><div className={s.phoneCrop}><img src={`${assets}shame.png`} alt="" loading="lazy" /></div>{cardText(4)}</div></article>
            </div>
            <article className={`${s.card} ${s.wide}`}><div className={s.workaround}><div className={s.quotaDemo}><div><p><em>{t.quota}</em> <small>km</small></p><span>{t.weekly}</span></div><img src={`${assets}switch.svg`} width={78} height={48} alt="" /></div>{cardText(5)}</div></article>
          </div>
          <div className={s.statement}><h2 className={s.pill}>{t.proposal}</h2><p><Highlight text={t.proposalText} /></p></div>
        </div>
      </section>
      <section className={s.mockup}><img src={`${assets}inactive.png`} width={1462} height={1212} alt={t.inactiveAlt} loading="lazy" /></section>
      <section className={s.credits}><div className={s.statement}><h2 className={s.pill}>{t.credit}</h2><p><Credits text={t.credits} /></p></div></section>
      <nav className={s.explore} aria-label={t.explore}><Title /><div className={s.kicker}><Star />{t.explore}</div><div className={s.links}><Link href="/projects"><ArrowLeft size={29} />{t.back}</Link><Link href="/projects/students" className={s.next}>{t.next}<ArrowRight size={29} /></Link></div></nav>
    </div>
  </main>;
}
