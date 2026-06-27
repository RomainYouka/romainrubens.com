"use client";

import { useEffect, useRef } from "react";

export function useSnapScroll() {
  const isAnimatingRef = useRef(false);
  const wheelIntentRef = useRef(0);
  const releaseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const release = () => {
      if (releaseTimerRef.current) window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = window.setTimeout(() => {
        isAnimatingRef.current = false;
        wheelIntentRef.current = 0;
      }, 820);
    };

    const scrollTo = (top: number) => {
      isAnimatingRef.current = true;
      window.scrollTo({ top, behavior: "smooth" });
      release();
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const hero = document.querySelector<HTMLElement>('[data-section="hero-landing"]');
      const intro = document.querySelector<HTMLElement>('[data-section="personal-intro"]');
      if (!hero || !intro) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const heroHeight = hero.offsetHeight;
      const introTop = intro.offsetTop;
      const currentY = window.scrollY;
      const viewport = window.innerHeight;

      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      wheelIntentRef.current =
        Math.sign(wheelIntentRef.current) === direction
          ? wheelIntentRef.current + event.deltaY
          : event.deltaY;

      const threshold = event.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? 72 : 3;
      if (Math.abs(wheelIntentRef.current) < threshold) return;

      const nearHero = currentY < heroHeight * 0.72;
      const nearIntroTop = currentY > introTop - viewport * 0.28 && currentY < introTop + viewport * 0.45;

      if (direction > 0 && nearHero) {
        event.preventDefault();
        scrollTo(introTop);
        return;
      }

      if (direction < 0 && nearIntroTop) {
        event.preventDefault();
        scrollTo(0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (releaseTimerRef.current) window.clearTimeout(releaseTimerRef.current);
    };
  }, []);

  return {};
}
