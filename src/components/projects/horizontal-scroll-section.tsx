"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HorizontalScrollItem {
  id: string;
  content: React.ReactNode;
  width?: string;
}

interface HorizontalScrollSectionProps {
  title?: string;
  description?: string;
  items: HorizontalScrollItem[];
  backgroundColor?: string;
  itemWidth?: string;
}

export const HorizontalScrollSection = ({
  title,
  description,
  items,
  backgroundColor = "bg-white",
  itemWidth = "w-96",
}: HorizontalScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollerRef.current) {
        const isOverflow = scrollerRef.current.scrollWidth > scrollerRef.current.clientWidth;
        setIsScrollable(isOverflow);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [items]);

  const handleHorizontalScroll = () => {
    if (scrollerRef.current) {
      const scrollLeft = scrollerRef.current.scrollLeft;
      const scrollWidth = scrollerRef.current.scrollWidth - scrollerRef.current.clientWidth;
      const progress = scrollLeft / (scrollWidth || 1);
      setScrollProgress(Math.min(progress, 1));
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`w-full py-16 md:py-24 ${backgroundColor}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {(title || description) && (
          <div className="mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base md:text-lg text-[#666666] max-w-2xl">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollerRef}
            onScroll={handleHorizontalScroll}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "thin",
            }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                className={`${itemWidth} md:${itemWidth} flex-shrink-0 snap-start`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                {item.content}
              </motion.div>
            ))}
          </div>

          {/* Progress Indicator */}
          {isScrollable && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 h-1 bg-[#E5E5E5] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#1d1d1f]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${scrollProgress * 100}%` }}
                  transition={{ type: "tween", duration: 0.2 }}
                />
              </div>
              <span className="text-xs text-[#999999] font-medium whitespace-nowrap">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Scroll Hint */}
        {isScrollable && scrollProgress < 0.95 && (
          <motion.div
            className="mt-6 flex items-center gap-2 text-xs text-[#999999]"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H6" />
            </svg>
            Scroll pour découvrir
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
