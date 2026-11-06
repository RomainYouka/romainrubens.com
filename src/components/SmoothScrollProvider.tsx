"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Recréé à chaque changement de route : garantit l'activation/désactivation correcte
  useLayoutEffect(() => {
    // These full-page case studies must not inherit the catalogue's scroll offset.
    const resetProjectScroll = (pathname === "/renaultextensionapp" || pathname === "/stratosapp" || pathname === "/googlemapsextension") && !window.location.hash;
    if (resetProjectScroll) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Three native snap positions: hero, introduction, then the footer's end.
    if (pathname === "/") {
      document.documentElement.setAttribute("data-home-snap", "true");
      return () => document.documentElement.removeAttribute("data-home-snap");
    }

    // Respecte prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cancelled = false;
    let cleanup = () => {};
    // Home uses native scrolling: keep this library out of its initial bundle.
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        lerp: 0.07,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

    // Permet à n'importe quel composant de déclencher un scroll to top via Lenis
      const onScrollToTop = () => lenis.scrollTo(0, { immediate: false });
      window.addEventListener("lenis-scroll-to-top", onScrollToTop);
      const onScrollTo = (event: Event) => { event.preventDefault(); lenis.scrollTo((event as CustomEvent<number>).detail); };
      window.addEventListener("lenis-scroll-to", onScrollTo);

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("lenis-scroll-to-top", onScrollToTop);
        window.removeEventListener("lenis-scroll-to", onScrollTo);
        lenis.destroy();
        lenisRef.current = null;
      };
    }).catch(() => {
      // Native scrolling remains available if the optional enhancement fails.
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]); // ← pathname dans les deps : Lenis se recrée à chaque route

  return <>{children}</>;
}
