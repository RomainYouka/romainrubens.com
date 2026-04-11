"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

// Icône personnalisée avec deux chevrons opposés
const OpposingArrows = ({ className }: {className?: string;}) =>
<svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className={className}>

    {/* Chevron gauche */}
    <polyline points="9 17 4 12 9 7" />
    {/* Chevron droit */}
    <polyline points="15 7 20 12 15 17" />
  </svg>;


function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation initiale: glisse de 0% à 80% au montage
  useEffect(() => {
    const timer = setTimeout(() => {
      setSliderPosition(80);
    }, 300);

    // Marquer l'animation comme terminée APRÈS la durée de transition
    const animationEndTimer = setTimeout(() => {
      setHasAnimated(true);
    }, 300 + 1200); // 300ms delay + 1200ms transition

    return () => {
      clearTimeout(timer);
      clearTimeout(animationEndTimer);
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !hasAnimated) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = x / rect.width * 100;

    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    if (hasAnimated) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] overflow-hidden select-none"
      style={{
        cursor: hasAnimated ? isDragging ? 'grabbing' : 'col-resize' : 'default',
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}>

      {/* Image Après (fond) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-contain pointer-events-none"
          draggable={false}
          quality={85}
          sizes="(max-width: 768px) 100vw, 50vw" />

      </div>

      {/* Image Avant (clip selon slider) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: hasAnimated ? 'none' : 'clip-path 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'clip-path'
        }}>

        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-contain pointer-events-none"
          draggable={false}
          quality={85}
          sizes="(max-width: 768px) 100vw, 50vw" />

      </div>

      {/* Barre de séparation - réduite en hauteur pour s'aligner avec les images */}
      <div
        className="absolute top-[5%] bottom-[5%] w-1 bg-black shadow-lg"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          transition: hasAnimated ? 'none' : 'left 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'left'
        }}>

        {/* Cercle avec icône */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-200 hover:scale-110"
          onMouseDown={handleMouseDown}
          onTouchStart={() => hasAnimated && setIsDragging(true)}>

          <OpposingArrows className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Labels Avant/Après */}
      <div className="absolute bottom-[8%] left-4 text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {beforeLabel}
      </div>
      <div className="absolute bottom-[8%] right-4 text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {afterLabel}
      </div>
    </div>);

}

const translations = {
  FR: {
    before: "Avant",
    after: "Après"
  },
  EN: {
    before: "Before",
    after: "After"
  },
  ՀԱՅ: {
    before: "Առաջ",
    after: "Հետո"
  }
};

export default function ProjectBeforeAfter() {
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");

  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !translations[saved]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const currentTranslations = translations[selectedLanguage];

  return (
    <section
      className="bg-[#000000] py-8 md:py-12 !w-full !h-full"
      style={{
        fontFamily: "var(--font-body)",
        scrollMarginTop: "80px"
      }}>

      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Grid 2 colonnes desktop, 1 colonne mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Comparaison 1: Framaspace Fichiers */}
          <BeforeAfterSlider
            beforeImage="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/avant1-1762193411769.png?width=8000&height=8000&resize=contain"
            afterImage="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/apres1-1762193411914.png?width=8000&height=8000&resize=contain"
            beforeLabel={currentTranslations.before}
            afterLabel={currentTranslations.after} />


          {/* Comparaison 2: Framaspace Agenda */}
          <BeforeAfterSlider
            beforeImage="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/avant2-1762193411773.png?width=8000&height=8000&resize=contain"
            afterImage="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/apres2-1762193411903.png?width=8000&height=8000&resize=contain"
            beforeLabel={currentTranslations.before}
            afterLabel={currentTranslations.after} />

        </div>
      </div>
    </section>);

}