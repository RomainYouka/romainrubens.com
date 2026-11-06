"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import s from "./home-scroll-scene.module.css";

/** Native scrolling drives transforms only; keyboard and touch keep their normal behaviour. */
export default function HomeScrollScene({ children }: { children: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = scene.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, top = 0, distance = 1, cover = 1, viewportHeight = 1;
    const update = () => {
      frame = 0;
      const p = reduced.matches ? 0 : Math.max(0, Math.min(1, (window.scrollY - top) / distance));
      const eased = 1 - (1 - p) ** 3;
      const scale = cover + (1 - cover) * eased;
      root.style.setProperty("--screen-scale", String(scale));
      root.style.setProperty("--screen-rise", `${-viewportHeight * .01 * eased}px`);
      root.style.setProperty("--screen-radius", `${12 * eased}px`);
      root.style.setProperty("--hardware-opacity", String(Math.max(0, (p - .18) / .65)));
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => {
      viewportHeight = window.innerHeight;
      const width = reduced.matches ? window.innerWidth : Math.min(1040, viewportHeight * .64 * 16 / 9, window.innerWidth * (window.innerWidth < 768 ? .88 : .74));
      const height = reduced.matches ? viewportHeight : width * 9 / 16;
      cover = reduced.matches ? 1 : Math.max(window.innerWidth / width, viewportHeight / height);
      root.style.setProperty("--screen-width", `${width}px`);
      root.style.setProperty("--screen-height", `${height}px`);
      root.style.setProperty("--home-cover", String(cover));
      top = root.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, root.offsetHeight - viewportHeight);
      update();
      window.dispatchEvent(new Event("home-screen-resize"));
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    reduced.addEventListener("change", resize);
    resize();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", resize); reduced.removeEventListener("change", resize); };
  }, []);
  return <div ref={scene} className={s.scene} data-home-scene>
    <div className={s.sticky}>
      <div className={s.stand} aria-hidden="true"><span /></div>
      <div className={s.screen} data-home-screen><div className={s.surface}>{children}</div><span className={s.camera} aria-hidden="true" /></div>
      <div className={s.shadow} aria-hidden="true" />
    </div>
  </div>;
}
