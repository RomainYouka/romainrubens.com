"use client";

import { useEffect, useRef, useState } from "react";

export function useSnapScroll() {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastWheelTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 50) return;
      lastWheelTimeRef.current = now;

      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const scrollThreshold = 50;
      if (Math.abs(e.deltaY) < scrollThreshold) return;

      e.preventDefault();
      setIsScrolling(true);

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      const allSections = document.querySelectorAll("[data-section]");
      let nextSection = null;

      if (direction > 0) {
        for (const section of allSections) {
          const rect = (section as HTMLElement).getBoundingClientRect();
          if (rect.top > viewportHeight * 0.5) {
            nextSection = section;
            break;
          }
        }
      } else {
        const sectionsArray = Array.from(allSections);
        for (let i = sectionsArray.length - 1; i >= 0; i--) {
          const section = sectionsArray[i];
          const rect = (section as HTMLElement).getBoundingClientRect();
          if (rect.top < -viewportHeight * 0.5) {
            nextSection = section;
            break;
          }
        }
      }

      if (nextSection) {
        const targetScroll = (nextSection as HTMLElement).offsetTop;
        const duration = 600;
        const startScroll = currentScroll;
        const distance = targetScroll - startScroll;
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
          } else {
            setIsScrolling(false);
          }
        };

        animate();
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isScrolling]);

  return { isScrolling };
}
