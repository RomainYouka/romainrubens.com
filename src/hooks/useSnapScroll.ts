"use client";

import { useEffect, useRef } from "react";

export function useSnapScroll() {
  const isSnapRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling
      e.preventDefault();

      // Ignore horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Get all snap sections
      const sections = document.querySelectorAll("[data-section]");
      if (sections.length === 0) return;

      // Skip if already snapping
      if (isSnapRef.current) return;

      // Find current section (the one most visible)
      let currentIndex = 0;
      let maxVisibleHeight = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          currentIndex = index;
        }
      });

      // Determine direction and target index
      const direction = e.deltaY > 0 ? 1 : -1;
      let targetIndex = currentIndex + direction;

      // Clamp to valid range
      targetIndex = Math.max(0, Math.min(targetIndex, sections.length - 1));

      // If already at the target, don't snap
      if (targetIndex === currentIndex) return;

      // Get target position
      const targetSection = sections[targetIndex] as HTMLElement;
      const targetTop = targetSection.offsetTop;

      // Snap animation
      isSnapRef.current = true;

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
        } else {
          isSnapRef.current = false;
        }
      };

      animate();
    };

    // Use capture phase to intercept before other handlers
    window.addEventListener("wheel", handleWheel, { passive: false, capture: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return {};
}
