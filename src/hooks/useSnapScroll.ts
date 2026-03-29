"use client";

import { useEffect, useRef } from "react";

export function useSnapScroll() {
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSnapRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        const sections = document.querySelectorAll("[data-section]");
        if (sections.length === 0) return;

        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let closestSection: Element | null = null;
        let closestDistance = Infinity;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = window.scrollY + rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - sectionCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        });

        if (closestSection) {
          const targetTop = (closestSection as HTMLElement).offsetTop;
          const now = Date.now();

          if (now - lastSnapRef.current > 600) {
            lastSnapRef.current = now;

            const startScroll = window.scrollY;
            const distance = targetTop - startScroll;
            const duration = 600;
            const startTime = Date.now();

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);

              const easeInOutCubic = (t: number) => {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
              };

              const newScroll = startScroll + distance * easeInOutCubic(progress);
              window.scrollTo(0, newScroll);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            animate();
          }
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return {};
}
