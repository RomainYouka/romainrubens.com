"use client";

import { useEffect, useRef, useState } from "react";
import DiodeBackground from "@/components/DiodeBackground";
import { setupHomeAutoAdvance } from "@/lib/home-auto-advance";
import s from "./hero-landing.module.css";

const headline = "hello future.";

export default function HeroLanding() {
  const [displayedText, setDisplayedText] = useState("");
  const [complete, setComplete] = useState(false);
  const autoAdvance = useRef<ReturnType<typeof setupHomeAutoAdvance> | null>(null);

  useEffect(() => {
    const controller = setupHomeAutoAdvance(() => {
      const event = new Event("home-discover", { cancelable: true });
      if (window.dispatchEvent(event)) document.getElementById("personal-intro")?.scrollIntoView({ behavior: "smooth" });
    });
    autoAdvance.current = controller;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setTimeout>;
    if (reduced) {
      setDisplayedText(headline);
      setComplete(true);
    } else {
      let length = 0;
      const type = () => {
        setDisplayedText(headline.slice(0, ++length));
        if (length < headline.length) timer = setTimeout(type, 90);
        else setComplete(true);
      };
      timer = setTimeout(type, 700);
    }
    return () => { clearTimeout(timer); controller.dispose(); autoAdvance.current = null; };
  }, []);

  useEffect(() => {
    if (!complete) return;
    // Let the author credit finish fading in before the 2.5-second reading pause.
    const timer = setTimeout(() => autoAdvance.current?.ready(), 350);
    return () => clearTimeout(timer);
  }, [complete]);

  return <section className={s.hero} data-section="hero-landing">
    <DiodeBackground />
    <div className={s.content}>
      <div className={s.lockup} data-home-lockup data-intro-ready={complete} lang="en">
        <h1 className={s.title}>
          <span className="sr-only">{headline}</span>
          <span className={s.reserve} aria-hidden="true">{headline}</span>
          <span className={s.typed} aria-hidden="true">{displayedText}<span className={s.cursor} data-complete={complete}>|</span></span>
        </h1>
        <p className={s.author}>by <em>Romain</em> <strong>Rubens</strong></p>
      </div>
    </div>
  </section>;
}
