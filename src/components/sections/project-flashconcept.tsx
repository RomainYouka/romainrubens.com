"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectFlashConceptProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  FR: {
    title: "FlashConcept",
    year: "Conception : 2025",
    collaboration: "Collaboration : Eubin Bark & Erwan Hodonou",
    description: "Le concept est un site accessible depuis un QR code présent sur l'étiquette du vêtement. Il rassemble les principales données liées à la fabrication : consommation d'eau, électricité, émissions de CO₂, matières utilisées, conditions de travail et potentiel de recyclabilité. Le site permet également de consulter une carte retraçant le parcours complet du produit, depuis l'origine des fibres jusqu'à l'assemblage final, avec des indications sur les lieux et les conditions de production. L'objectif est d'apporter davantage de transparence sur ce que représente réellement la fabrication d'un vêtement.",
    showMoreButton: "Voir tous les écrans",
    showLessButton: "Réduire"
  },
  EN: {
    title: "FlashConcept",
    year: "Designed in 2025",
    collaboration: "Collaboration: Eubin Bark & Erwan Hodonou",
    description: "The concept is a website accessible through a QR code printed on the clothing label. It brings together the key data related to the production of the garment: water and electricity consumption, CO₂ emissions, materials used, working conditions and recyclability potential.\nThe site also includes a map showing the full journey of the product, from the origin of the fibers to the final assembly, with details about locations and production conditions.\n\nThe goal is to offer greater transparency about what the making of a garment truly represents.",
    showMoreButton: "View all screens",
    showLessButton: "Show less"
  },
  ՀԱՅ: {
    title: "FlashConcept",
    year: "Ձևավորվել 2025-ին",
    collaboration: "Համագործակցություն՝ Eubin Bark & Erwan Hodonou",
    description: "Հայտարարությունն ստույգ հասանելի է հագուստի պիտակի վրա տեղադրված QR կոդի միջոցով: Այն միավորում է հագուստի արտադրման հետ կապված հիմնական տվյալները՝ ջրի և էլեկտրաէներգիայի սպառումը, CO₂ արտանետումները, օգտագործված նյութերը, աշխատանքային պայմանները և վերամշակման ներուժը:\nՏեղանիշը նաև ներառում է քարտեզ, որը ցույց է տալիս ապրանքի լրիվ ուղին՝ մանրաթելերի ծագումից մինչև վերջնական վերամշակումը, տեղեկատվության հետ պահանջվածի վայրերի և արտադրական պայմանների մասին:\n\nՀետևել ավելի շատ թափանցիկության մասին, թե ինչ է իսկապես ներկայացնում հագուստի արտադրումը:",
    showMoreButton: "Տեսնել բոլոր էկրանները",
    showLessButton: "Թաքցնել"
  }
};

const flashConceptImages = ["1a", "2", "3", "1.2", "4", "5", "1.3", "6", "7"];

export default function ProjectFlashConcept({ language }: ProjectFlashConceptProps) {
  const [showAllImages, setShowAllImages] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const t = translations[language];
  
  const visibleImages = showAllImages ? flashConceptImages : flashConceptImages.slice(0, 3);
  
  const currentImageIndex = lightboxImage ? flashConceptImages.indexOf(lightboxImage) : -1;
  const canGoPrevious = currentImageIndex > 0;
  const canGoNext = currentImageIndex >= 0 && currentImageIndex < flashConceptImages.length - 1;

  const handleToggleImages = () => {
    if (showAllImages) {
      setShowAllImages(false);
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      flashConceptImages.slice(3).forEach(num => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `/flashconcept/${num}.png`;
        document.head.appendChild(link);
      });
      setShowAllImages(true);
    }
  };

  const handleImageClick = (imageNum: string) => {
    if (!showAllImages) setShowAllImages(true);
    setLightboxImage(imageNum);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("flashconceptLightboxStateChange", { detail: true }));
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "";
    window.dispatchEvent(new CustomEvent("flashconceptLightboxStateChange", { detail: false }));
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setLightboxImage(flashConceptImages[currentImageIndex - 1]);
    }
  };

  const goToNextImage = () => {
    if (currentImageIndex < flashConceptImages.length - 1) {
      setLightboxImage(flashConceptImages[currentImageIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      if (e.key === "ArrowLeft") goToPreviousImage();
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  return (
    <section
      id="flashconcept"
      className="w-full bg-white"
      style={{ scrollMarginTop: "80px" }}
    >
      <div ref={sectionRef} className="opacity-100 translate-y-0">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-12 md:py-20">
          <div className="mb-8 md:mb-12">
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "var(--theme-subtle)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 12px)"
              }}
            >
              {t.year}
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#1D1D1F",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(16px, 2vw, 24px)"
              }}
            >
              {t.title}
            </h3>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.3vw, 15px)",
                fontWeight: 500,
                color: "var(--theme-subtle)",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                marginBottom: "clamp(16px, 2vw, 20px)"
              }}
            >
              {t.collaboration}
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                whiteSpace: "pre-line",
                marginBottom: "clamp(24px, 3vw, 32px)"
              }}
            >
              {t.description}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full" style={{ maxWidth: "900px" }}>
              {visibleImages.map((num, index) => {
                const isInitial = index < 3;
                return (
                  <div 
                    key={`${num}-${index}`}
                    className="relative w-full overflow-hidden rounded-lg md:rounded-xl transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      aspectRatio: "9/19.5",
                      opacity: isInitial ? 1 : (showAllImages ? 1 : 0),
                      transform: isInitial ? 'translateY(0)' : (showAllImages ? 'translateY(0)' : 'translateY(20px)'),
                      transitionDelay: showAllImages ? `${(index - 3) * 50}ms` : '0ms',
                      maxHeight: isInitial ? 'none' : (showAllImages ? '100%' : '0'),
                    }}
                    onClick={() => handleImageClick(num)}
                  >
                    <Image
                      src={`/flashconcept/${num}.png`}
                      alt={`FlashConcept - Screen ${num}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      className="object-contain"
                      priority={isInitial}
                      loading={isInitial ? "eager" : "lazy"}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div ref={buttonRef} className="flex justify-center mt-8 md:mt-12">
            <button
              onClick={handleToggleImages}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                letterSpacing: "-0.01em"
              }}
            >
              {showAllImages ? t.showLessButton : t.showMoreButton}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllImages ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center px-4 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/flashconcept/${lightboxImage}.png`}
              alt={`FlashConcept - Screen ${lightboxImage}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {canGoPrevious && (
              <button
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
            )}

            {canGoNext && (
              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentImageIndex + 1} / {flashConceptImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
