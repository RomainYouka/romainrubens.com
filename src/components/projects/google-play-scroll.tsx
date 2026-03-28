"use client";

import { useEffect, useRef, useState } from "react";

interface GooglePlayScrollProps {
  sections: {
    id: string;
    image: string;
    isCarousel?: boolean;
  }[];
}

export const GooglePlayScroll = ({ sections }: GooglePlayScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeCarousel, setActiveCarousel] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!activeCarousel) return;

      const carousel = carouselRefs.current[activeCarousel];
      if (!carousel) return;

      const isCarouselAtEnd =
        carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;
      const isCarouselAtStart = carousel.scrollLeft === 0;

      if (e.deltaY > 0 && !isCarouselAtEnd) {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      } else if (e.deltaY < 0 && !isCarouselAtStart) {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      }
    };

    const handleScroll = () => {
      sections.forEach((section) => {
        if (!section.isCarousel) return;

        const element = container.querySelector(
          `[data-section="${section.id}"]`
        ) as HTMLElement;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const isInViewport =
          rect.top < containerRect.height && rect.bottom > containerRect.top;

        if (isInViewport) {
          setActiveCarousel(section.id);
        }
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeCarousel, sections]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll overflow-x-hidden bg-white"
      style={{ scrollBehavior: "smooth" }}
    >
      {sections.map((section) => (
        <div
          key={section.id}
          data-section={section.id}
          className={`w-full ${section.isCarousel ? "flex overflow-x-auto" : ""}`}
        >
          {section.isCarousel ? (
            <div
              ref={(el) => {
                if (el) carouselRefs.current[section.id] = el;
              }}
              className="flex flex-shrink-0 overflow-x-auto scroll-smooth gap-0"
              style={{ scrollBehavior: "smooth" }}
            >
              <img
                src={section.image}
                alt={section.id}
                className="w-full h-auto flex-shrink-0"
                draggable="false"
              />
            </div>
          ) : (
            <img
              src={section.image}
              alt={section.id}
              className="w-full h-auto"
              draggable="false"
            />
          )}
        </div>
      ))}
    </div>
  );
};
