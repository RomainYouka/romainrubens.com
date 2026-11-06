"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { detectLanguage, type Language } from "@/lib/language";
import { content } from "./content";
import base from "../renaultextensionapp/project.module.css";
import s from "./project.module.css";

const assets = "/projects/stratos/";
function Highlight({ text }: { text:string }) { return <>{text.split("**").map((part,i)=>i%2 ? <em key={i}>{part}</em> : part)}</>; }
function Brand() { return <div className={`${base.title} ${s.brand}`}><span className={s.wordmark}><img src={`${assets}title.svg`} width={217} height={63} alt="Stratos" /></span><span>Campus App</span></div>; }
function Star() { return <img src={`${assets}star.svg`} width={32} height={32} alt="" />; }

export default function StratosPage() {
  const [language,setLanguage] = useState<Language>("EN");
  const [scale,setScale] = useState<number>();
  const container = useRef<HTMLElement>(null);
  const intro = useRef<HTMLElement>(null);
  const t=content[language];
  useEffect(()=>{
    setLanguage(detectLanguage());
    const onLanguage=(event:Event)=>{const next=(event as CustomEvent<Language>).detail;if(next in content)setLanguage(next);};
    window.addEventListener("languageChange",onLanguage);
    const observer=new ResizeObserver(([entry])=>setScale(entry.contentRect.width<=900?1:entry.contentRect.width/1920));
    if(container.current)observer.observe(container.current);
    return ()=>{observer.disconnect();window.removeEventListener("languageChange",onLanguage);};
  },[]);
  const descend=()=>{
    if(!intro.current)return;
    const top=intro.current.getBoundingClientRect().top+window.scrollY;
    if(!window.dispatchEvent(new CustomEvent("lenis-scroll-to",{detail:top,cancelable:true})))return;
    window.scrollTo({top,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  };
  const cardText=(i:number)=><div className={base.cardText}><h3><Highlight text={t.cards[i][0]} /></h3><p>{t.cards[i][1]}</p></div>;
  return <main id="main-content" ref={container} className={`${base.page} ${s.page}`} lang={language==="ՀԱՅ"?"hy":language.toLowerCase()}>
    <div className={`${base.canvas} ${s.canvas}`} style={{zoom:scale} as CSSProperties}>
      <section className={`${base.hero} ${s.hero}`} aria-label="Stratos Campus App">
        <div className={base.heroGroup}><div className={base.heroTitles}>
          <div className={base.kicker}><Star />{t.intro}</div><h1><Brand /></h1><p className={base.year}>2026</p>
        </div><button className={`${base.down} ${s.down}`} onClick={descend} aria-label={t.down}><ArrowDown size={33} /></button></div>
      </section>
      <section ref={intro} id="introduction" className={`${base.intro} ${s.intro}`}>
        <div className={base.introBody}><div className={base.firstQuote}>
          <h2><em>{t.heading[0]}</em> <span>{t.heading[1]}</span></h2>
          <blockquote><a className={s.source} href="https://www.figma.com/design/qhvML04mkKn4SqStMUK8Dk?node-id=2-477" target="_blank" rel="noopener noreferrer"><p><Highlight text={t.quote} /></p><cite>{t.school}</cite></a></blockquote>
        </div><blockquote className={`${base.personal} ${s.personal}`}><p><Highlight text={t.personal} /></p><cite>Romain Rubens</cite></blockquote></div>
      </section>
      <section className={s.showcase}><div className={s.phones}><img src={`${assets}students.webp`} width={4096} height={1899} alt={t.mockup} loading="lazy" decoding="async" /></div></section>
      <section className={s.design}><div className={`${base.case} ${s.case}`}>
        <div className={base.statement}><h2 className={`${base.pill} ${s.pill}`}>{t.question}</h2><p><Highlight text={t.questionText} /></p></div>
        <div className={base.cards}>
          <div className={`${base.row} ${s.row}`}>
            <article className={`${base.card} ${s.card} ${s.swipe}`}><img src={`${assets}swipe.webp`} width={164} height={237} alt="" loading="lazy" />{cardText(0)}</article>
            <article className={`${base.card} ${s.card} ${s.group}`}><img src={`${assets}groups.webp`} width={247} height={78} alt="" loading="lazy" />{cardText(1)}</article>
          </div>
          <article className={`${base.card} ${s.card} ${s.create}`}><div className={s.createImages}>{[1,2,3].map((n)=><img key={n} src={`${assets}create${n}.webp`} width={n===1?189:190} height={n===1?108:149} alt="" loading="lazy" />)}</div>{cardText(2)}</article>
          <div className={`${base.row} ${s.row}`}>
            <article className={`${base.card} ${s.card} ${s.search}`}><img src={`${assets}search.svg`} width={116} height={116} alt="" loading="lazy" />{cardText(3)}</article>
            <article className={`${base.card} ${s.card} ${s.strate}`}><div className={base.cardText}>{language==="EN"?<h3><img src={`${assets}strate.svg`} width={256} height={38} alt="Built for Strate" loading="lazy" /></h3>:<h3><Highlight text={t.cards[4][0]} /></h3>}<p>{t.cards[4][1]}</p></div></article>
          </div>
        </div>
        <div className={base.statement}><h2 className={`${base.pill} ${s.pill}`}>{t.proposal}</h2><p><Highlight text={t.proposalText} /></p></div>
      </div></section>
      <section className={s.screens} aria-label={t.screens}><div className={s.screenStack}>{[1,2,3,4,5,6,7].map(n=><figure key={n} className={s.screen}><img src={`${assets}screens${n}-4096.webp`} srcSet={`${assets}screens${n}-960.webp 960w, ${assets}screens${n}-2400.webp 2400w, ${assets}screens${n}-4096.webp 4096w`} sizes="(max-width:900px) calc(100vw - 32px), 76vw" width={4096} height={1670} alt={`${t.screens} — ${n}/7`} loading="lazy" decoding="async" /></figure>)}</div></section>
      <section className={s.stores} aria-label={t.stores}>
        <div className={s.badges}>
          <img src={`${assets}appstore.svg`} width={319} height={87} alt="App Store — concept" loading="lazy" />
          <div className={s.storeBadge}><img src={`${assets}storebase.svg`} width={319} height={87} alt="" /><img className={s.play} src={`${assets}play.svg`} alt="Google Play — concept" /></div>
          <div className={s.galaxy}><span aria-hidden="true" /><img src={`${assets}galaxy.svg`} alt="Galaxy Store — concept" /></div>
          <div className={s.storeBadge}><img src={`${assets}storebase.svg`} width={319} height={87} alt="" /><img className={s.huawei} src={`${assets}huawei.svg`} alt="Amazon Appstore — concept" /></div>
          <div className={s.storeBadge}><img src={`${assets}storebase.svg`} width={319} height={87} alt="" /><img className={s.xiaomi} src={`${assets}xiaomi.svg`} alt="Microsoft Store — concept" /></div>
        </div>
      </section>
      <nav className={`${base.explore} ${s.explore}`} aria-label={t.explore}><Brand /><div className={base.kicker}><Star />{t.explore}</div><div className={base.links}><Link href="/projects"><ArrowLeft size={29} />{t.back}</Link><Link href="/projects/intratone" className={base.next}>{t.next}<ArrowRight size={29} /></Link></div></nav>
    </div>
  </main>;
}
