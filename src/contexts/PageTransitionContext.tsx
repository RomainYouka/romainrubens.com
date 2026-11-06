"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

type TransitionPhase = "idle" | "in" | "out";
export type TransitionDirection = "up" | "down";

interface PageTransitionContextType {
  phase: TransitionPhase;
  effect: "strips" | "spiral";
  origin: { x: number; y: number };
  direction: TransitionDirection;
  triggerTransition: (href: string, direction?: TransitionDirection, reason?: "logo" | "projects-cta", origin?: { x: number; y: number }) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  phase: "idle",
  effect: "strips",
  origin: { x: 0, y: 0 },
  direction: "up",
  triggerTransition: () => {},
});

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase,setPhase]=useState<TransitionPhase>("idle");
  const [effect,setEffect]=useState<"strips" | "spiral">("strips");
  const [origin,setOrigin]=useState({ x: 0, y: 0 });
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const [direction, setDirection] = useState<TransitionDirection>("up");
  const router = useRouter();
  const pathname=usePathname();
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);

  const triggerTransition = useCallback(
    (href: string, dir: TransitionDirection = "up", reason?: "logo" | "projects-cta", source?: { x: number; y: number }) => {
      setDirection(dir);
      timers.current.forEach(clearTimeout);
      if (reason === "logo" && pathname === "/" && href === "/") {
        setPhase("idle");
        window.dispatchEvent(new Event("lenis-scroll-to-top"));
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        return;
      }
      const shouldAnimate = (reason === "logo" && href === "/") || (reason === "projects-cta" && pathname === "/" && href === "/projects");
      if(!shouldAnimate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPhase("idle"); router.push(href); return;
      }
      router.prefetch(href);
      const spiral = reason === "projects-cta";
      setOrigin(source ?? { x: innerWidth / 2, y: innerHeight / 2 });
      setEffect(spiral ? "spiral" : "strips");
      setPhase("in");
      // Bounded reveal: no dependency on animation callbacks or network responses.
      timers.current=[
        setTimeout(()=>{ router.push(href); if(href==="/") window.scrollTo({top:0,behavior:"instant"}); },spiral ? 1050 : 880),
        setTimeout(()=>setPhase("out"),spiral ? 1150 : 930),
        setTimeout(()=>setPhase("idle"),1850),
      ];
    },
    [router,pathname]
  );

  return (
    <PageTransitionContext.Provider value={{ phase, direction, effect, origin, triggerTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
