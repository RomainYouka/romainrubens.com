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
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [direction, setDirection] = useState<TransitionDirection>("up");
  const router = useRouter();

  const triggerTransition = useCallback(
    (href: string, dir: TransitionDirection = "up") => {
      if (phase !== "idle") return;

      setDirection(dir);
      setPhase("in");

      setTimeout(() => {
        router.push(href);

        setTimeout(() => {
          setPhase("out");

          setTimeout(() => {
            setPhase("idle");
          }, 750);
        }, 100);
      }, 780);
    },
    [phase, router]
  );

  return (
    <PageTransitionContext.Provider value={{ phase, direction, triggerTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
