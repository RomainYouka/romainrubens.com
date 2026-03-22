'use client';

import { useEffect, useRef } from 'react';

export function FramaspaceToolbarSection() {
  const toolbarImages = [
    { id: 1, src: '/framaspace-toolbar/red.png', alt: 'Red toolbar' },
    { id: 2, src: '/framaspace-toolbar/blue.png', alt: 'Blue toolbar' },
    { id: 3, src: '/framaspace-toolbar/yellow.png', alt: 'Yellow toolbar' },
    { id: 4, src: '/framaspace-toolbar/orange.png', alt: 'Orange toolbar' },
    { id: 5, src: '/framaspace-toolbar/green.png', alt: 'Green toolbar' },
    { id: 6, src: '/framaspace-toolbar/cyan.png', alt: 'Cyan toolbar' },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let position = 0;
    const speed = 0.3;
    let lastFrameTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastFrameTime;
      
      if (deltaTime >= 16) {
        lastFrameTime = now;
        position += speed;
        
        const scrollWidth = container.scrollWidth / 2;
        if (position >= scrollWidth) {
          position = 0;
        }

        container.style.transform = `translateX(-${position}px)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="w-full bg-black py-0 overflow-hidden">
      <div 
        ref={containerRef}
        className="flex gap-2 md:gap-3 px-4 md:px-8 py-8 md:py-12"
        style={{
          width: 'fit-content',
        }}
      >
        {/* Affiche les images 2 fois pour créer un carrousel infini */}
        {[...Array(2)].map((_, repetition) =>
          toolbarImages.map((image) => (
            <img
              key={`${repetition}-${image.id}`}
              src={image.src}
              alt={image.alt}
              className="flex-shrink-0 h-auto rounded-lg"
              style={{
                width: 'clamp(2000px, 180vw, 2800px)',
                display: 'block',
              }}
            />
          ))
        )}
      </div>
    </section>
  );
}
