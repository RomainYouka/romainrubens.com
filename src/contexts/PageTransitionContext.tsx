"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type TransitionPhase = "idle" | "in" | "out";
export type TransitionDirection = "up" | "down";

interface PageTransitionContextType {
  phase: TransitionPhase;
  direction: TransitionDirection;
  triggerTransition: (href: string, direction?: TransitionDirection) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  phase: "idle",
  direction: "up",
  triggerTransition: () => {},
});

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase,setPhase]=useState<TransitionPhase>("idle");
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const [direction, setDirection] = useState<TransitionDirection>("up");
  const router = useRouter();
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);

  const triggerTransition = useCallback(
    (href: string, dir: TransitionDirection = "up") => {
      setDirection(dir);
      timers.current.forEach(clearTimeout);
      if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPhase("idle"); router.push(href); return;
      }
      router.prefetch(href);
      setPhase("in");
      // Bounded reveal: no dependency on animation callbacks or network responses.
      timers.current=[
        setTimeout(()=>{ router.push(href); if(href==="/") window.scrollTo({top:0,behavior:"instant"}); },880),
        setTimeout(()=>setPhase("out"),930),
        setTimeout(()=>setPhase("idle"),1850),
      ];
    },
    [router]
  );

  return (
    <PageTransitionContext.Provider value={{ phase, direction, triggerTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
