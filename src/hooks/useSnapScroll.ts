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
      const footerSection = sections.length > 2 ? (sections[2] as HTMLElement) : null;

      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Determine current state
      const personalIntroTop = personalIntroSection.offsetTop;
      const footerTop = footerSection?.offsetTop ?? document.body.scrollHeight;

      let currentStateIndex = 0;
      
      if (currentScroll >= footerTop - viewportHeight + 100) {
        currentStateIndex = 2;
      } else if (currentScroll >= personalIntroTop - 50) {
        currentStateIndex = 1;
      } else {
        currentStateIndex = 0;
      }

      // Determine direction
      const direction = e.deltaY > 0 ? 1 : -1;
      let targetStateIndex = currentStateIndex + direction;

      // Clamp to valid range
      targetStateIndex = Math.max(0, Math.min(targetStateIndex, 2));

      // If already at the target, don't snap
      if (targetStateIndex === currentStateIndex) return;

      isSnapRef.current = true;

      // Use scrollIntoView for smooth native behavior
      if (targetStateIndex === 0) {
        // State 1: Top of hero
        heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (targetStateIndex === 1) {
        // State 2: Top of PersonalIntro (same as "Découvrir" button)
        personalIntroSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (targetStateIndex === 2) {
        // State 3: Top of Footer
        if (footerSection) {
          footerSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      // Reset snap flag after animation completes
      setTimeout(() => {
        isSnapRef.current = false;
      }, 650);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return {};
}
