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

      setPhase("in"); // rideau monte et couvre l'écran

      setTimeout(() => {
        router.push(href); // navigation pendant que l'écran est couvert

        setTimeout(() => {
          setPhase("out"); // rideau continue sa montée, révèle la nouvelle page

          setTimeout(() => {
            setPhase("idle"); // nettoyage (panneau déjà hors écran)
          }, 580);
        }, 120);
      }, 520);
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
