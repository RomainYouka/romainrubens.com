"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Recréé à chaque changement de route : garantit l'activation/désactivation correcte
  useLayoutEffect(() => {
    // These full-page case studies must not inherit the catalogue's scroll offset.
    const resetProjectScroll = (pathname === "/renaultextensionapp" || pathname === "/stratosapp" || pathname === "/googlemapsextension") && !window.location.hash;
    if (resetProjectScroll) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // La page d'accueil garde un scroll natif fiable, notamment au zoom.
    if (pathname === "/") return;

    // Respecte prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    if (resetProjectScroll) lenis.scrollTo(0, { immediate: true, force: true });

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

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("lenis-scroll-to-top", onScrollToTop);
      window.removeEventListener("lenis-scroll-to", onScrollTo);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]); // ← pathname dans les deps : Lenis se recrée à chaque route

  return <>{children}</>;
}
