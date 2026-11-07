"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { detectLanguage, type Language } from "@/lib/language";
import { SplitAction } from "@/components/SplitAction";
import { getLostSignalFrame, getSpeechEnvelope, lostDialogue } from "@/lib/lost-signal";
import s from "./not-found.module.css";

const copy = {
  FR: { title: "Vous êtes sorti du cadre.", description: "Cette page n’existe pas. Le reste de l’univers, si.", home: "Retour à l’accueil", projects: "Explorer les projets", signal: "L’accueil est toujours là.", error: "Erreur 404" },
  EN: { title: "You went beyond the frame.", description: "This page doesn’t exist. The rest of the universe does.", home: "Back to home", projects: "Explore the projects", signal: "Home is still here.", error: "Error 404" },
  ՀԱՅ: { title: "Դուք դուրս եք եկել շրջանակից։", description: "Այս էջը գոյություն չունի։ Բայց մնացած աշխարհը տեղում է։", home: "Վերադառնալ գլխավոր էջ", projects: "Դիտել նախագծերը", signal: "Գլխավոր էջը տեղում է։", error: "Սխալ 404" },
};

function BrandMark() {
  return <svg viewBox="0 0 512 512" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M234.667 448V307.2L135.467 406.933L105.067 376.533L204.8 277.333H64V234.667H204.8L105.067 135.467L135.467 105.067L234.667 204.8V64H277.333V204.8L376.533 105.067L406.933 135.467L307.2 234.667H448V277.333H307.2L406.933 376.533L376.533 406.933L277.333 307.2V448H234.667Z" /></svg>;
}

export default function NotFound() {
  const [language, setLanguage] = useState<Language>("EN");
  const [signal, setSignal] = useState(() => getLostSignalFrame(0));
  const scene = useRef<HTMLElement>(null);
  const wave = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!signal.speaking || reduced.matches) return;
    const text = lostDialogue[language][signal.line];
    const animations = Array.from(wave.current?.children ?? []).map((bar, index) =>
      bar.animate(getSpeechEnvelope(text, index, signal.voice), { duration: signal.next, easing: "linear", fill: "forwards" })
    );
    const stop = () => animations.forEach(animation => animation.cancel());
    reduced.addEventListener("change", stop);
    return () => { stop(); reduced.removeEventListener("change", stop); };
  }, [language, signal]);
  useEffect(() => {
    let start = performance.now();
    let hiddenAt = document.hidden ? start : 0;
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      if (document.hidden) return;
      const frame = getLostSignalFrame(performance.now() - start);
      setSignal(frame);
      timer = setTimeout(update, Math.max(16, frame.next));
    };
    const visibility = () => {
      if (document.hidden) { hiddenAt = performance.now(); clearTimeout(timer); }
      else { if (hiddenAt) start += performance.now() - hiddenAt; hiddenAt = 0; update(); }
    };
    update();
    document.addEventListener("visibilitychange", visibility);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  useEffect(() => {
    setLanguage(detectLanguage());
    const change = (event: Event) => {
      const value = (event as CustomEvent<Language>).detail;
      if (value in copy) setLanguage(value);
    };
    window.addEventListener("languageChange", change);
    return () => window.removeEventListener("languageChange", change);
  }, []);
  const t = copy[language];

  return (
    <main id="main-content" data-not-found data-theme="dark" className={s.scene} ref={scene}
      onPointerMove={event => {
        if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        scene.current?.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width - .5) * 18}px`);
        scene.current?.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height - .5) * 12}px`);
      }} onPointerLeave={() => { scene.current?.style.setProperty("--mx", "0px"); scene.current?.style.setProperty("--my", "0px"); }}>
      <div className={s.texture} aria-hidden="true" />
      <div className={s.particles} aria-hidden="true">{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ "--x": `${(i * 37 + 7) % 100}%`, "--y": `${(i * 23 + 11) % 100}%`, "--delay": `${-i * .7}s`, "--color": ["#ff637c", "#7cdda9", "#729cff"][i % 3] } as CSSProperties} />)}</div>
      <div className={s.topline}>
        <Link href="/" className={s.brand} aria-label={`Romain Rubens — ${t.home}`}><BrandMark /> Romain Rubens</Link>
      </div>
      <section className={s.center} aria-labelledby="lost-title">
        <div className={s.art} aria-hidden="true">
          <span className={s.four}>4</span>
          <div className={s.portal}>
            <div className={s.halo} />
            <div className={s.rings}><i /><i /><i /><i /><i /></div>
            <div className={s.core}><span><BrandMark /></span></div>
            <span className={s.crosshair}>+</span>
          </div>
          <span className={`${s.four} ${s.lastFour}`}>4</span>
        </div>
        <div className={s.message}>
          <p className={s.eyebrow}>{t.error}</p>
          <h1 id="lost-title">{t.title}</h1>
          <p className={s.description}>{t.description}</p>
          <div className={s.actions}>
            <SplitAction primary href="/">{t.home}</SplitAction>
            <SplitAction href="/projects">{t.projects}</SplitAction>
          </div>
        </div>
      </section>
      <div className={s.bottomline}>
        <div className={s.telemetry} data-speaking={signal.speaking} data-voice={signal.voice} data-silent={signal.silent} aria-hidden={signal.silent}>
          <span className={s.wave} ref={wave} aria-hidden="true">{Array.from({ length: 17 }, (_, i) => <i key={i} />)}</span>
          <span className={s.caption} key={`${signal.voice}-${signal.line}`}>{lostDialogue[language][signal.line]}</span>
        </div>
      </div>
    </main>
  );
}
