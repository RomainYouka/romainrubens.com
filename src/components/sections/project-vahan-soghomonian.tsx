"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectVahanProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  FR: {
    title: "Article d'Artiste",
    year: "Conception : 2024",
    description: "La réalisation de cet article sur Vahan Soghomonian, un artiste aux pratiques multiples mêle poésie, musique, photographie et installation. Son univers navigue entre héritage arménien, des récits personnels et expérimentations sensibles. Le projet met en lumière une œuvre profondément ancrée dans le réel et l'imaginaire, entre mémoire et création contemporaine.\n\nCette publication repose sur une interview menée avec l'artiste, enrichie par des archives, des photographies documentaires et une mise en page bilingue français-arménien. Le travail éditorial interroge la transmission artistique à travers un format hybride, entre récit et analyse visuelle.\n\nL'usage de l'arménien constitue à la fois un hommage à l'héritage de l'artiste et un geste personnel, traduisant un lien culturel partagé et un dialogue entre mémoire et création.",
    collaboration: "Interview réalisée par : Matis Sophiyair-Landais & Romain Rubens\nConception Graphique : Romain Rubens",
    viewAllScreens: "Voir toutes les pages",
    viewLess: "Réduire"
  },
  EN: {
    title: "Artist Article",
    year: "Designed in 2024",
    description: "This article about Vahan Soghomonian, an artist whose practice spans poetry, music, photography and installation, explores a universe shaped by Armenian heritage, personal narratives and sensitive experimentation. His work moves between reality and imagination, grounding contemporary creation in memory and lived experience.\n\nThe publication is built around an interview conducted with the artist, enriched with archives, documentary photographs and a bilingual French-Armenian layout. The editorial approach examines artistic transmission through a hybrid format that combines storytelling and visual analysis.\n\nThe use of Armenian is both a tribute to the artist's heritage and a personal gesture, reflecting a shared cultural connection and a dialogue between memory and creation.",
    collaboration: "Interview conducted by: Matis Sophiyair-Landais & Romain Rubens\nGraphic Design: Romain Rubens",
    viewAllScreens: "View all pages",
    viewLess: "Show less"
  },
  ՀԱՅ: {
    title: "Արտիստի Հոդված",
    year: "Նախագծված 2024-ին",
    description: "Այս հոդվածը վերաբերում է Վահան Սողոմոնյանին՝ արվեստագետ, որի գործունեությունը ընդգրկում է բանաստեղծություն, երաժշտություն, լուսանկար և ինստալյացիա։ Հոդվածը բացահայտում է մի աշխարհ, որը ձևավորվում է հայկական ժառանգության, անձնական պատմությունների և զգայական փորձարկումների միջոցով։ Նրա ստեղծագործությունը շարժվում է իրականության և երևակայության միջև՝ ժամանակակից արվեստը հիմնավորելով հիշողության և ապրած փորձի վրա։\n\nՀրապարակումը կառուցված է արվեստագետի հետ անցկացված հարցազրույցի շուրջ՝ հարստացված արխիվային նյութերով, փաստավավերագրական լուսանկարներով և ֆրանսերեն–հայերեն երկլեզու ձևաորությամբ։ Խմբագրական մոտեցումը ուսումնասիրում է արվեստի փոխանցման գործընթացը՝ օգտագործելով հիբրիդային ձևաչափ, որը միավորում է պատմողական շերտերը և տեսողական վերլուծությունը։\n\nՀայերենի կիրառումը միաժամանակ հարգանքի տուրք է արվեստագետի ժառանգությանը և անձնական ժեստ՝ արտահայտող ընդհանուր մշակութային կապը և հիշողության ու ստեղծագործության միջև ձևավորվող երկխոսությունը։",
    collaboration: "Հարցազրույց անցկացրել են՝ Matis Sophiyair-Landais & Romain Rubens\nԳրաֆիկական Դիզայն՝ Romain Rubens",
    viewAllScreens: "Տեսնել բոլոր էջերը",
    viewLess: "Թաքցնել"
  }
};

const vahanImages = [
  { id: "1", src: "/assets/vahan/R1_1763887052895.png" },
  { id: "2", src: "/assets/vahan/R2_1763887050325.png" },
  { id: "3", src: "/assets/vahan/R3_1763887050325.png" },
  { id: "4", src: "/assets/vahan/R4_1763887050325.png" },
  { id: "5", src: "/assets/vahan/R5_1763887050325.png" },
  { id: "6", src: "/assets/vahan/R6_1763887050325.png" }
];

export default function ProjectVahanSoghomonian({ language }: ProjectVahanProps) {
  const [showAllImages, setShowAllImages] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleToggleImages = useCallback(() => {
    setShowAllImages(prev => {
      if (!prev) return true;
      // Scroll to button after closing
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 50);
      return false;
    });
  }, []);

  const handleOpenLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxImage(vahanImages[index].src);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  }, []);

  const handleNextImage = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % vahanImages.length);
    setLightboxImage(prev => vahanImages[(vahanImages.findIndex(img => img.src === prev) + 1) % vahanImages.length].src);
  }, []);

  const handlePrevImage = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + vahanImages.length) % vahanImages.length);
    setLightboxImage(prev => vahanImages[(vahanImages.findIndex(img => img.src === prev) - 1 + vahanImages.length) % vahanImages.length].src);
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, handleCloseLightbox, handleNextImage, handlePrevImage]);

  const t = translations[language];
  const visibleImages = useMemo(() => 
    showAllImages ? vahanImages : vahanImages.slice(0, 1),
    [showAllImages]
  );

  return (
    <section
      id="vahan-soghomonian"
      className="w-full bg-white"
      style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
        scrollMarginTop: "80px"
      }}
    >
      <div className="container max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col-reverse md:flex-row md:items-start gap-12 md:gap-16">
          <div className="w-full md:w-[45%] lg:w-[50%]">
            <div className="space-y-4">
              {visibleImages.map((image, idx) => {
                const isInitial = idx === 0;
                const imageIndex = vahanImages.findIndex(img => img.id === image.id);
                return (
                  <button
                    key={image.id}
                    onClick={() => handleOpenLightbox(imageIndex)}
                    className="relative overflow-hidden rounded-lg w-full cursor-pointer group hover:opacity-80 transition-opacity duration-200"
                    style={{
                      aspectRatio: image.id === "1" ? "9/12" : "2/1",
                      border: 'none',
                      padding: 0,
                      background: 'transparent'
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={`Article page ${image.id}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 400px"
                      className="object-cover"
                      priority={isInitial}
                      loading={isInitial ? "eager" : "lazy"}
                      quality={isInitial ? 85 : 75}
                    />
                  </button>
                );
              })}
            </div>

            {vahanImages.length > 1 && (
              <div ref={buttonRef} className="flex justify-center mt-8 md:mt-12">
                {!showAllImages ? (
                  <button
                    onClick={handleToggleImages}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      letterSpacing: "-0.01em"
                    }}
                  >
                    {t.viewAllScreens}
                    <ChevronDown className="w-4 h-4 transition-none" />
                  </button>
                ) : (
                  <button
                    onClick={handleToggleImages}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      letterSpacing: "-0.01em"
                    }}
                  >
                    {t.viewLess}
                    <ChevronDown className="w-4 h-4 rotate-180 transition-none" />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex-1" style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "#86868b",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 12px)"
              }}
            >
              {t.year}
            </div>

            <h2
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
            </h2>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.3vw, 15px)",
                fontWeight: 500,
                color: "#86868b",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                marginBottom: "clamp(16px, 2vw, 20px)",
                whiteSpace: "pre-wrap"
              }}
            >
              {t.collaboration}
            </div>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                whiteSpace: "pre-line"
              }}
            >
              {t.description}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={handleCloseLightbox}
        >
          {/* Image Container - stops click propagation */}
          <div 
            className="relative w-full h-full flex items-center justify-center px-4 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt={`Article page ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              quality={95}
              priority
            />

            {/* Navigation Buttons */}
            {vahanImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  disabled={lightboxIndex === 0}
                  className={`pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full transition-all duration-100 ease-out ${
                    lightboxIndex > 0
                      ? "bg-[#F5F5F7] text-[#1D1D1F] hover:scale-[1.05] active:scale-[0.95] cursor-pointer"
                      : "bg-[#E5E5E7] text-[#A1A1A6] cursor-not-allowed"
                  }`}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  disabled={lightboxIndex === vahanImages.length - 1}
                  className={`pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full transition-all duration-100 ease-out ${
                    lightboxIndex < vahanImages.length - 1
                      ? "bg-[#F5F5F7] text-[#1D1D1F] hover:scale-[1.05] active:scale-[0.95] cursor-pointer"
                      : "bg-[#E5E5E7] text-[#A1A1A6] cursor-not-allowed"
                  }`}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseLightbox();
              }}
              className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F7] text-[#1D1D1F] transition-all duration-100 ease-out hover:scale-[1.05] active:scale-[0.95] z-[10001]"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
