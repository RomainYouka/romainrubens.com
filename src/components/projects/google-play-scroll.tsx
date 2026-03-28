"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GooglePlayScrollProps {
  sections: {
    id: string;
    image: string;
    isCarousel?: boolean;
    carouselItems?: string[];
  }[];
}

export const GooglePlayScroll = ({ sections }: GooglePlayScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeCarousel, setActiveCarousel] = useState<string | null>(null);
  const [carouselStates, setCarouselStates] = useState<Record<string, number>>({});

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

  const handleCarouselScroll = (id: string) => {
    const carousel = carouselRefs.current[id];
    if (carousel) {
      const scrollPos = carousel.scrollLeft;
      const itemWidth = carousel.clientWidth;
      const currentIndex = Math.round(scrollPos / itemWidth);
      setCarouselStates((prev) => ({
        ...prev,
        [id]: currentIndex,
      }));
    }
  };

  const scrollCarouselTo = (id: string, direction: "left" | "right") => {
    const carousel = carouselRefs.current[id];
    if (carousel) {
      const itemWidth = carousel.clientWidth;
      const scrollAmount = direction === "right" ? itemWidth : -itemWidth;
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
          className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8"
        >
          {section.isCarousel ? (
            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-[14.44px] border border-[#E5E5E5] bg-white">
                <div
                  ref={(el) => {
                    if (el) carouselRefs.current[section.id] = el;
                  }}
                  className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory"
                  style={{
                    scrollBehavior: "smooth",
                    scrollSnapType: "x mandatory",
                  }}
                  onScroll={() => handleCarouselScroll(section.id)}
                >
                  <img
                    src={section.image}
                    alt={section.id}
                    className="w-full h-auto flex-shrink-0 snap-start"
                    draggable="false"
                  />
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={() => scrollCarouselTo(section.id, "left")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-[#1d1d1f]" />
                </button>

                <button
                  onClick={() => scrollCarouselTo(section.id, "right")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-[#1d1d1f]" />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1d1d1f]/30"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full rounded-[14.44px] border border-[#E5E5E5] overflow-hidden bg-white">
              <img
                src={section.image}
                alt={section.id}
                className="w-full h-auto"
                draggable="false"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
