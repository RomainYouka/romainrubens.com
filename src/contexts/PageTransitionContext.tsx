"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type TransitionPhase = "idle" | "in" | "out";

interface PageTransitionContextType {
  phase: TransitionPhase;
  triggerTransition: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  phase: "idle",
  triggerTransition: () => {},
});

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const router = useRouter();

  const triggerTransition = useCallback(
    (href: string) => {
      if (phase !== "idle") return;

      setPhase("in"); // lamelles montent et couvrent l'écran

      setTimeout(() => {
        router.push(href); // navigation pendant que l'écran est couvert

        setTimeout(() => {
          setPhase("out"); // lamelles continuent leur montée, révèlent la nouvelle page

          setTimeout(() => {
            setPhase("idle"); // nettoyage (lamelles déjà hors écran)
          }, 750);
        }, 100);
      }, 780);
    },
    [phase, router]
  );

  return (
    <PageTransitionContext.Provider value={{ phase, triggerTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
