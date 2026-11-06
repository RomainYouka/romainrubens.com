"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

type TransitionPhase = "idle" | "in" | "out";
export type TransitionDirection = "up" | "down";

interface PageTransitionContextType {
  phase: TransitionPhase;
  effect: "return" | "flight";
  origin: { x: number; y: number };
  direction: TransitionDirection;
  triggerTransition: (href: string, direction?: TransitionDirection, reason?: "logo" | "projects-cta", origin?: { x: number; y: number }) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  phase: "idle",
  effect: "return",
  origin: { x: 0, y: 0 },
  direction: "up",
  triggerTransition: () => {},
});

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase,setPhase]=useState<TransitionPhase>("idle");
  const [effect,setEffect]=useState<"return" | "flight">("return");
  const [origin,setOrigin]=useState({ x: 0, y: 0 });
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const destination=useRef<string | null>(null);
  const [direction, setDirection] = useState<TransitionDirection>("up");
  const router = useRouter();
  const pathname=usePathname();
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  useLayoutEffect(()=>{
    if(pathname!==destination.current) return;
    destination.current=null;
    timers.current.forEach(clearTimeout);
    window.scrollTo({top:0,behavior:"instant"});
    setPhase("out");
    timers.current=[setTimeout(()=>setPhase("idle"),850)];
  },[pathname]);

  const triggerTransition = useCallback(
    (href: string, dir: TransitionDirection = "up", reason?: "logo" | "projects-cta", source?: { x: number; y: number }) => {
      setDirection(dir);
      timers.current.forEach(clearTimeout);
      destination.current=null;
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
      const flight = reason === "projects-cta";
      setOrigin(source ?? { x: innerWidth / 2, y: innerHeight / 2 });
      setEffect(flight ? "flight" : "return");
      destination.current=href;
      setPhase("in");
      // Reveal only once the destination commits, including on slower connections.
      timers.current=[
        setTimeout(()=>router.push(href),1100),
        setTimeout(()=>{ destination.current=null; setPhase("idle"); },12000),
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
