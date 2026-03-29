"use client";

import { useEffect, useRef } from "react";

export function useSnapScroll() {
  const isSnapRef = useRef(false);

  useEffect(() => {
    const getSnapPositions = () => {
      const sections = document.querySelectorAll("[data-section]");
      if (sections.length === 0) return [];

      const positions: number[] = [];
      
      // Position 0: Top of first section (Hero)
      positions.push(0);
      
      // Position 1: Top of second section (PersonalIntro) = end of Hero
      const heroSection = sections[0] as HTMLElement;
      if (heroSection) {
        positions.push(heroSection.offsetHeight);
      }
      
      // Position 2: Bottom of second section - show footer with part of PersonalIntro
      const personalIntroSection = sections[1] as HTMLElement;
      if (personalIntroSection) {
        const scrollToShowFooter = personalIntroSection.offsetTop + personalIntroSection.offsetHeight - window.innerHeight * 0.3;
        positions.push(Math.max(positions[1] + window.innerHeight, scrollToShowFooter));
      }
      
      return positions;
    };

    const handleWheel = (e: WheelEvent) => {
      const positions = getSnapPositions();
      if (positions.length === 0) return;

      // Ignore horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Skip if already snapping
      if (isSnapRef.current) return;

      e.preventDefault();

      // Find current snap position (closest to current scroll)
      const currentScroll = window.scrollY;
      let currentIndex = 0;
      let minDistance = Infinity;

      positions.forEach((pos, index) => {
        const distance = Math.abs(currentScroll - pos);
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = index;
        }
      });

      // Determine direction
      const direction = e.deltaY > 0 ? 1 : -1;
      let targetIndex = currentIndex + direction;

      // Clamp to valid range
      targetIndex = Math.max(0, Math.min(targetIndex, positions.length - 1));

      // If already at the target, don't snap
      if (targetIndex === currentIndex) return;

      // Snap animation
      isSnapRef.current = true;
      const startScroll = currentScroll;
      const targetScroll = positions[targetIndex];
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
