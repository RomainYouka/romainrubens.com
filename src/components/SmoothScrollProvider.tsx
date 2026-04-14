"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Recréé à chaque changement de route : garantit l'activation/désactivation correcte
  useEffect(() => {
    // Pas de scroll smooth sur la page d'accueil (scroll natif spécifique)
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

    // Permet à n'importe quel composant de déclencher un scroll to top via Lenis
    const onScrollToTop = () => lenis.scrollTo(0, { immediate: false });
    window.addEventListener("lenis-scroll-to-top", onScrollToTop);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("lenis-scroll-to-top", onScrollToTop);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]); // ← pathname dans les deps : Lenis se recrée à chaque route

  return <>{children}</>;
}
