"use client";

import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { detectLanguage, type Language } from "@/lib/language";
import { content } from "./content";
import assets from "./assets.json";
import exports from "./exported-assets.json";
import base from "../renaultextensionapp/project.module.css";
import s from "./project.module.css";
import { ProjectHeroVideo } from "@/components/project-native/ProjectHeroVideo";

type AssetName = keyof typeof assets;
const prefix = "/projects/goupil/";
const NativeFigures = createContext<Record<string, ReactNode>>({});
const exampleScores = [1, 2, 3, 0, 4, 0, 1, 1];
const componentGroups: [number, AssetName[]][] = [
  [2, ["header-1", "header-2"]], [3, ["search-1", "search-2"]],
  [4, ["progress"]], [5, ["actions-1", "actions-2"]],
  [6, ["language-1", "language-2"]], [7, ["navigation"]],
  [8, ["number"]], [9, ["contents"]],
];

function Highlight({ text }: { text: string }) {
  return <>{text.split("**").map((part, i) => i % 2 ? <em key={i}>{part}</em> : part)}</>;
}
function Brand() {
  return <span className={s.brand} aria-label="Goupil">
    <img src={prefix + "logo-icon.svg"} width={106.05} height={107.189} alt="" />
    <img src={prefix + "logo-type.svg"} width={339.903} height={54.9688} alt="" />
  </span>;
}
function Star() { return <img src={prefix + "star.svg"} width={32} height={32} alt="" />; }
function RatingIcon({ score }: { score: number }) { return <img src={prefix + `rating-${score}.svg`} width={24} height={24} alt="" />; }
function Visual({ name, alt = "", className = "" }: { name: AssetName; alt?: string; className?: string }) {
  const asset = assets[name];
  const native = useContext(NativeFigures)[name];
  const exported=(exports as Record<string,{width:number;height:number}>)[name];
  if(exported) return <img src={`${prefix}exports/${name}.webp`} width={exported.width} height={exported.height} alt={alt} loading="lazy" decoding="async" className={className} />;
  if (native) return <div role="img" aria-label={alt} className={`${s.nativeFigure} ${className}`} style={{ width: `min(100%, ${asset.width}px)`, aspectRatio: `${asset.width}/${asset.height}` }}><div style={{ width: asset.width, height: asset.height, zoom: `calc(100cqw / ${asset.width}px)` }}>{native}</div></div>;
  return <img src={prefix + name + ".webp"} width={asset.width} height={asset.height} alt={alt} loading="lazy" decoding="async" className={className} />;
}
function Statement({ title, text }: { title: string; text: string }) {
  return <div className={s.statement}><h2>{title}</h2><p><Highlight text={text} /></p></div>;
}
function FigureHeading({ category, title }: { category: string; title: string }) {
  return <div className={s.figureHeading}><p>{category}</p><h3>{title}</h3></div>;
}

export default function GoupilDigitalEcosystemPage({ nativeFigures }: { nativeFigures: Record<string, ReactNode> }) {
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
  const statement = (index: number) => <Statement title={t.statements[index][0]} text={t.statements[index][1]} />;
  return <NativeFigures.Provider value={nativeFigures}><main id="main-content" ref={container} className={`${base.page} ${s.page}`} lang={language === "ՀԱՅ" ? "hy" : language.toLowerCase()}>
    <div className={`${base.canvas} ${s.canvas}`} style={{ zoom: scale } as CSSProperties}>
      <section className={s.hero} aria-label="Goupil — Digital Ecosystem & Design System">
        <ProjectHeroVideo className={s.heroBackground} poster={prefix + "hero-poster.avif"} src={prefix + "hero.webm"} />
        <div className={s.heroGroup}>
          <div className={s.heroTitles}><p className={s.kicker}><Star />{t.introducing}</p><h1><span className="sr-only">Goupil — Digital Ecosystem &amp; Design System</span><Brand /></h1><p className={s.year}>2026</p></div>
          <button className={s.down} onClick={descend} aria-label={t.discover}><ArrowDown size={33} /></button>
        </div>
      </section>
      <section ref={intro} className={s.intro} id="goupil-introduction">
        <div className={s.firstQuote}><h2><em>{t.heading[0]}</em> <span>{t.heading[1]}</span></h2><div className={s.introText}>{t.intro.slice(0,2).map(text=><p key={text}><Highlight text={text} /></p>)}</div></div>
        <blockquote>{t.intro.slice(2).map(text=><p key={text}><Highlight text={text} /></p>)}<cite>Romain Rubens</cite></blockquote>
      </section>
      <section className={s.showcase} aria-label="SyGo">
        <img src={prefix + "showcase-background.webp"} width={1920} height={1507} alt="" loading="lazy" decoding="async" className={s.showcaseBackground} />
        <div className={s.tablet}><Visual name="showcase-tablet" alt="SyGo — Goupil Design System" /></div>
      </section>
      <section className={s.foundations}>
        <div className={s.foundationStack}>
          <Visual name="cover" alt="Goupil — SyGo Design System" />
          <div className={s.statementPair}>{statement(0)}{statement(1)}</div>
          <div><FigureHeading category={t.foundation} title={t.foundationTitles[0]} /><div className={s.colorStack}>{(["colors-system","colors-state","colors-accent"] as const).map(name=><Visual key={name} name={name} alt={t.foundationTitles[0]} />)}</div></div>
          <div><FigureHeading category={t.foundation} title={t.foundationTitles[1]} /><Visual name="typography" alt={t.foundationTitles[1]} /></div>
          <div><FigureHeading category={t.foundation} title={t.foundationTitles[2]} /><Visual name="icons" alt={t.foundationTitles[2]} /></div>
          <div><FigureHeading category={t.foundation} title={t.foundationTitles[3]} /><Visual name="foundations" alt={t.foundationTitles[3]} /></div>
        </div>
      </section>
      <section className={s.grids}>{statement(2)}<div className={s.gridFigures}><Visual name="grids" alt={t.statements[2][0]} /><Visual name="grids-edge" alt={t.statements[2][0]} /></div></section>
      <section className={s.components}>
        <div className={s.componentStack}>
          {statement(3)}
          <div><FigureHeading category={t.component} title={t.componentTitles[0]} /><Visual name="component-icons" alt={t.componentTitles[0]} /></div>
          <div><FigureHeading category={t.component} title={t.componentTitles[1]} />
            <div className={s.buttonFigures}><Visual name="button-info-1" alt={t.componentTitles[1]} /><Visual name="button-info-2" alt={t.componentTitles[1]} />
              <div className={s.buttonColumns}><div>{Array.from({length:8},(_,i)=><Visual key={i} name={`button-left-${i}` as AssetName} alt={t.componentTitles[1]} />)}</div><div>{Array.from({length:7},(_,i)=><Visual key={i} name={`button-right-${i}` as AssetName} alt={t.componentTitles[1]} />)}</div></div>
            </div>
          </div>
          {componentGroups.map(([index,names])=><div key={index}><FigureHeading category={t.component} title={t.componentTitles[index]} /><div className={s.componentFigures}>{names.map(name=><Visual key={name} name={name} alt={t.componentTitles[index]} />)}</div></div>)}
        </div>
      </section>
      <section className={s.usability}>
        <h2><strong>{t.usability.split(" ")[0]}</strong> {t.usability.split(" ").slice(1).join(" ")}</h2>
        <div className={s.ratings}>{t.ratings.map((label,i)=><span key={label}><RatingIcon score={i} /><span><strong>{i}</strong>/5</span> {label}</span>)}</div>
        <div className={s.usabilityColumns}><div className={s.criteria}>{[0,4].map(start=><div className={s.criteriaColumn} key={start}>{t.criteria.slice(start,start+4).map(([title,text,example])=><div key={title}><p><strong>{title}. </strong>{text}</p><p>{example}</p></div>)}</div>)}</div>
          <div className={s.example}><h3>{t.example}</h3>{[0,4].map(start=><div className={s.exampleRow} key={start}>{t.criteria.slice(start,start+4).map(([title],offset)=>{const i=start+offset;return <div className={s.examplePill} key={title}><RatingIcon score={exampleScores[i]} /><p><strong>{exampleScores[i]}</strong>/5 <span>{title.toLocaleLowerCase(language === "ՀԱՅ" ? "hy" : language.toLowerCase())}</span></p></div>;})}</div>)}</div>
        </div>
      </section>
      <section className={s.ecosystem}>{statement(4)}<div className={s.ecosystemFigures}>
        <Visual name="ecosystem-brand" alt="Goupil Digital Ecosystem" className={s.ecosystemBrand} />
        {(["eco-configurator","eco-shop","eco-parts","eco-warranty"] as const).map(name=><Visual key={name} name={name} alt={name.replace("eco-","Goupil — ")} />)}
      </div></section>
      <section className={s.experiences}>{statement(5)}<div className={s.experienceFigures}>
        {Array.from({length:8},(_,i)=><figure key={i}><figcaption><span>{t.before}</span><ArrowRight size={24} /><span>{t.after}</span></figcaption><Visual name={`experience-${i}` as AssetName} alt={`Goupil — ${t.before} / ${t.after} · ${i+1}`} /></figure>)}
      </div></section>
      <section className={s.modes}>{statement(6)}<div className={s.modeFigures}><Visual name="mode-light" alt="Goupil — Light" /><Visual name="mode-dark" alt="Goupil — Dark" /></div></section>
      <nav className={s.explore} aria-label={t.explore}><Brand /><p className={s.kicker}><Star />{t.explore}</p><div className={s.links}><Link href="/projects"><ArrowLeft size={24} />{t.back}</Link><Link href="/googleplayonios" className={s.next}>{t.next}<ArrowRight size={24} /></Link></div></nav>
    </div>
  </main></NativeFigures.Provider>;
}
