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

      const heroSection = sections[0] as HTMLElement;
      const personalIntroSection = sections[1] as HTMLElement;
      const footerSection = sections.length > 2 ? (sections[2] as HTMLElement) : null;

      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      const direction = e.deltaY > 0 ? 1 : -1;

      // Determine current state more precisely
      let currentStateIndex = 0;
      if (currentScroll > personalIntroSection.offsetTop + viewportHeight * 0.5) {
        currentStateIndex = 2;
      } else if (currentScroll > personalIntroSection.offsetTop - 100) {
        currentStateIndex = 1;
      } else {
        currentStateIndex = 0;
      }

      // Special logic: in state 2, only snap UP to state 1, allow natural scroll DOWN
      if (currentStateIndex === 1 && direction > 0) {
        // Scrolling DOWN in state 2 - allow natural scroll, don't snap
        return;
      }

      // Calculate target state
      let targetStateIndex = currentStateIndex + direction;
      targetStateIndex = Math.max(0, Math.min(targetStateIndex, 2));

      if (targetStateIndex === currentStateIndex) return;

      e.preventDefault();
      isSnapRef.current = true;

      const startScroll = currentScroll;
      let targetScroll = 0;

      if (targetStateIndex === 0) {
        targetScroll = 0;
      } else if (targetStateIndex === 1) {
        // Scroll to top of PersonalIntro (same as button)
        targetScroll = personalIntroSection.offsetTop;
      } else if (targetStateIndex === 2) {
        // Scroll to footer
        targetScroll = footerSection?.offsetTop ?? personalIntroSection.offsetTop + personalIntroSection.offsetHeight - viewportHeight * 0.3;
      }

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
