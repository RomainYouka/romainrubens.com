"use client";

import { useEffect, useRef } from "react";

export function useSnapScroll() {
  const isSnapRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Ignore horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Skip if already snapping
      if (isSnapRef.current) return;

      const sections = document.querySelectorAll("[data-section]");
      if (sections.length < 2) return;

      e.preventDefault();

      const heroSection = sections[0] as HTMLElement;
      const personalIntroSection = sections[1] as HTMLElement;
      
      const heroHeight = heroSection.offsetHeight;
      const personalIntroHeight = personalIntroSection.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Define exact snap positions
      const snapPositions = [
        0,                                    // State 1: Top of page (Hero)
        heroHeight,                           // State 2: Top of PersonalIntro
        heroHeight + personalIntroHeight - viewportHeight * 0.3  // State 3: Footer visible + PersonalIntro
      ];

      const currentScroll = window.scrollY;

      // Determine current state based on scroll position
      let currentStateIndex = 0;
      
      if (currentScroll >= snapPositions[2] - 50) {
        currentStateIndex = 2;
      } else if (currentScroll >= snapPositions[1] - 50) {
        currentStateIndex = 1;
      } else {
        currentStateIndex = 0;
      }

      // Determine direction
      const direction = e.deltaY > 0 ? 1 : -1;
      let targetStateIndex = currentStateIndex + direction;

      // Clamp to valid range
      targetStateIndex = Math.max(0, Math.min(targetStateIndex, snapPositions.length - 1));

      // If already at the target, don't snap
      if (targetStateIndex === currentStateIndex) return;

      // Snap animation
      isSnapRef.current = true;
      const startScroll = currentScroll;
      const targetScroll = snapPositions[targetStateIndex];
      const distance = targetScroll - startScroll;
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
        } else {
          isSnapRef.current = false;
        }
      };

      animate();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return {};
}
