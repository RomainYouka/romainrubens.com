"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

const images = [
"https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-1762126572983.png?width=8000&height=8000&resize=contain",
"https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-1762126573033.png?width=8000&height=8000&resize=contain",
"https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/3-1762126572971.png?width=8000&height=8000&resize=contain",
"https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/4-1762126573030.png?width=8000&height=8000&resize=contain",
"https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/5-1762126572852.png?width=8000&height=8000&resize=contain"];


export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const mouseStartX = useRef<number>(0);
  const mouseEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy load images when carousel becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Précharger images seulement quand le carrousel est visible
  useEffect(() => {
    if (!isVisible) return;

    const preloadImages = () => {
      extendedImages.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    };

    preloadImages();
  }, [isVisible, extendedImages]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToIndex = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  // Gestion de la boucle infinie
  useEffect(() => {
    if (!isTransitioning) return;

    const transitionEndTimer = setTimeout(() => {
      if (currentIndex === 0) {
        setCurrentIndex(images.length);
        setIsTransitioning(false);
      } else if (currentIndex === extendedImages.length - 1) {
        setCurrentIndex(1);
        setIsTransitioning(false);
      } else {
        setIsTransitioning(false);
      }
    }, 600);

    return () => clearTimeout(transitionEndTimer);
  }, [currentIndex, isTransitioning, extendedImages.length, images.length]);

  // Auto-play
  useEffect(() => {
    if (isPlaying && !isTransitioning) {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isTransitioning]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getRealIndex = () => {
    if (currentIndex === 0) return images.length - 1;
    if (currentIndex === extendedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe left - go next
        goToNext();
      } else {
        // Swipe right - go previous
        goToPrevious();
      }
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
    mouseEndX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    mouseEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (isTransitioning) return;
    
    const diff = mouseStartX.current - mouseEndX.current;
    const minDragDistance = 50;

    if (Math.abs(diff) > minDragDistance) {
      if (diff > 0) {
        // Drag left - go next
        goToNext();
      } else {
        // Drag right - go previous
        goToPrevious();
      }
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
    }
  };

  return (
    <section className="bg-[#F5F5F7] relative overflow-hidden select-none pb-8 mb-12">
      <div className="w-full relative">
        <div 
          className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={containerRef}
            className="flex items-center"
            style={{
              transform: isMobile 
                ? `translateX(calc(-${currentIndex * 70}vw - ${currentIndex * 20}px + 50vw - 35vw))`
                : `translateX(calc(-${currentIndex * 50}vw - ${currentIndex * 30}px + 25vw))`,
              transition: isTransitioning ? "transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
              willChange: "transform"
            }}>

            {extendedImages.map((image, index) => {
              const isCenter = index === currentIndex;
              const isLeft = index === currentIndex - 1;
              const isRight = index === currentIndex + 1;

              return (
                <div
                  key={`${image}-${index}`}
                  className="flex-shrink-0"
                  style={{
                    width: isMobile ? "70vw" : "50vw",
                    height: isMobile ? "35vw" : "25vw",
                    opacity: isCenter ? 1 : 0.4,
                    transition: "opacity 300ms ease",
                    marginRight: index < extendedImages.length - 1 ? (isMobile ? "2px" : "3px") : "0",
                    padding: "0",
                    margin: "0",
                    userSelect: "none",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: index === 2 || (index === 0 && currentIndex === 0) || (index === extendedImages.length - 1 && currentIndex === extendedImages.length - 1) ? "#F5F5F7" : "transparent",
                    cursor: (isLeft || isRight) && !isTransitioning ? "pointer" : "default"
                  }}
                  onClick={() => {
                    if (isLeft && !isTransitioning) {
                      goToPrevious();
                    } else if (isRight && !isTransitioning) {
                      goToNext();
                    }
                  }}
                >

                  <Image
                    src={image}
                    alt={`Image ${index}`}
                    fill
                    className="object-contain select-none"
                    draggable={false}
                    priority={true}
                    loading="eager"
                    sizes="50vw"
                    style={{
                      pointerEvents: (isLeft || isRight) ? "none" : "none"
                    }}
                    quality={100} />

                </div>);

            })}
          </div>
        </div>

        <div className="flex items-center justify-between max-w-[1200px] mx-auto px-8 mt-12 relative">
          <div className="flex-1" />
          
          <div className="flex justify-center gap-2">
            {images.map((_, index) =>
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === getRealIndex() ? "bg-[#1d1d1f] w-6" : "bg-[#D3D3D4]"}`
              }
              aria-label={`Go to image ${index + 1}`} />

            )}
          </div>

          <div className="flex-1 flex justify-end">
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-[#D3D3D4] flex items-center justify-center transition-all duration-300 hover:bg-[#E8E8ED] hover:scale-110"
              aria-label={isPlaying ? "Pause" : "Play"}>

              {isPlaying ?
              <Pause className="w-4 h-4 text-[#1d1d1f] fill-[#1d1d1f]" /> :

              <Play className="w-4 h-4 text-[#1d1d1f] fill-[#1d1d1f]" />
              }
            </button>
          </div>
        </div>
      </div>
    </section>);

}