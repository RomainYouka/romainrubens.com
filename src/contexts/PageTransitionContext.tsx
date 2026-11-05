"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
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
  // Navigation must never be gated by a decorative animation or timer.
  const phase: TransitionPhase = "idle";
  const [direction, setDirection] = useState<TransitionDirection>("up");
  const router = useRouter();

  const triggerTransition = useCallback(
    (href: string, dir: TransitionDirection = "up") => {
      setDirection(dir);
      router.push(href);
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
