"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import MonitorCable from "./MonitorCable";
import s from "./home-scroll-scene.module.css";

/** Native scrolling drives transforms only; keyboard and touch keep their normal behaviour. */
export default function HomeScrollScene({ children, introduction }: { children: ReactNode; introduction: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = scene.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, travelFrame = 0, top = 0, distance = 1, cover = 1, viewportHeight = 1;
    const cancelTravel = () => cancelAnimationFrame(travelFrame);
    const discover = (event: Event) => {
      const intro = document.getElementById("personal-intro");
      if (!intro) return;
      event.preventDefault();
      cancelTravel();
      const start = window.scrollY, end = intro.getBoundingClientRect().top + start;
      if (reduced.matches) { window.scrollTo({ top: end, behavior: "instant" }); return; }
      const began = performance.now();
      const animate = (now: number) => {
        const t = Math.min(1, (now - began) / 3000);
        const ease = t < .5 ? 4*t*t*t : 1 - (-2*t+2)**3/2;
        window.scrollTo({ top: start + (end - start) * ease, behavior: "instant" });
        if (t < 1) travelFrame = requestAnimationFrame(animate);
      };
      travelFrame = requestAnimationFrame(animate);
    };
    const update = () => {
      frame = 0;
      const p = reduced.matches ? 0 : Math.max(0, Math.min(1, (window.scrollY - top) / distance));
      const eased = 1 - (1 - p) ** 3;
      const scale = cover + (1 - cover) * eased;
      root.style.setProperty("--screen-scale", String(scale));
      root.style.setProperty("--screen-rise", `${-viewportHeight * .01 * eased}px`);
      root.style.setProperty("--screen-radius", `${(window.innerWidth < 768 ? 38 : 3) * eased}px`);
      root.style.setProperty("--hardware-visible", p > .1 ? "visible" : "hidden");
      root.style.setProperty("--hardware-opacity", String(Math.max(0, (p - .18) / .65)));
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => {
      viewportHeight = window.innerHeight;
      const mobile = window.innerWidth < 768;
      root.setAttribute("data-home-device",mobile ? "iphone-18-pro" : "studio-display");
      const width = reduced.matches ? window.innerWidth : mobile ? Math.min(window.innerWidth*.72,viewportHeight*.31) : Math.min(1040,viewportHeight*.64*16/9,window.innerWidth*.74);
      const height = reduced.matches ? viewportHeight : width * (mobile ? 19.5/9 : 9/16);
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
    window.addEventListener("home-discover", discover);
    window.addEventListener("wheel", cancelTravel, { passive: true });
    window.addEventListener("touchstart", cancelTravel, { passive: true });
    window.addEventListener("keydown", cancelTravel);
    window.addEventListener("pointerdown", cancelTravel, { passive: true });
    window.addEventListener("lenis-scroll-to-top", cancelTravel);
    window.addEventListener("resize", resize, { passive: true });
    reduced.addEventListener("change", resize);
    resize();
    return () => { cancelAnimationFrame(frame); cancelTravel(); window.removeEventListener("home-discover", discover); window.removeEventListener("wheel", cancelTravel); window.removeEventListener("touchstart", cancelTravel); window.removeEventListener("keydown", cancelTravel); window.removeEventListener("pointerdown", cancelTravel); window.removeEventListener("lenis-scroll-to-top", cancelTravel); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", resize); reduced.removeEventListener("change", resize); };
  }, []);
  return <section className={s.experience} data-home-experience><div ref={scene} className={s.scene} data-home-scene>
    <div className={s.sticky}>
      <MonitorCable />
      <svg className={s.stand} aria-hidden="true" viewBox="0 0 200 120" fill="none"><defs><linearGradient id="studio-aluminium" x1="100" y1="0" x2="100" y2="108" gradientUnits="userSpaceOnUse"><stop stopColor="#8a8b8f"/><stop offset=".53" stopColor="#c4c5c8"/><stop offset=".9" stopColor="#a8a9ad"/><stop offset="1" stopColor="#e0e1e3"/></linearGradient><linearGradient id="studio-base"><stop stopColor="#919296"/><stop offset=".5" stopColor="#d9dade"/><stop offset="1" stopColor="#919296"/></linearGradient></defs><path fillRule="evenodd" d="M16 0H184V108H16V0Z M80 0A20 20 0 0 0 120 0H80Z" fill="url(#studio-aluminium)"/><path d="M16 108H184V115Q184 118 181 118H19Q16 118 16 115V108Z" fill="url(#studio-base)"/><path d="M18 116H182V118H18Z" fill="#7c7d81"/></svg>
      <div className={s.screen} data-home-screen><div className={s.surface}>{children}</div><span className={s.camera} aria-hidden="true" /><span className={s.phoneControls} aria-hidden="true" /></div>
      <div className={s.shadow} aria-hidden="true" />
    </div>
  </div><div className={s.continuation}>{introduction}</div></section>;
}
