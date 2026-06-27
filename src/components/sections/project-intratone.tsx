"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const translations = {
  EN: {
    year: "In progress 2025",
    title: "Complete Redesign of Intratone App",
    description: "Project publication in January 2026. You can already consult the user flow and wireframes.",
    pdfTitle: "Download user flow",
    pdfMessage: "Would you like to download the user flow to view it larger?",
    pdfCancel: "Cancel",
    pdfDownload: "Download"
  },
  FR: {
    year: "Projet en cours 2025",
    title: "Refonte complète de l'Application Intratone",
    description: "Publication du projet en Janvier 2026. Vous pouvez d'ores et déjà consulter le parcours utilisateur et les wireframes.",
    pdfTitle: "Télécharger le chemin d'utilisateur",
    pdfMessage: "Voulez-vous télécharger le flux utilisateur pour le consulter en plus grand ?",
    pdfCancel: "Annuler",
    pdfDownload: "Télécharger"
  },
  ՀԱՅ: {
    year: "Ընթացքում 2025",
    title: "Intratone հավելվածի Ամբողջական Վերանախագծում",
    description: "Նախագիծի հրապարակում հունվարի 2026 թ. Դուք արդեն կարող եք ծանոթանալ օգտատիրոջ հոսքին և մետաղալարերին:",
    pdfTitle: "Ներբեռնել օգտատիրոջ հոսքը",
    pdfMessage: "Ցանկանու՞մ եք ներբեռնել օգտատիրոջ հոսքը այն ավելի մեծ տեսնելու համար:",
    pdfCancel: "Չեղարկել",
    pdfDownload: "Ներբեռնել"
  }
};

interface ProjectIntratoneProps {
  language?: "EN" | "FR" | "ՀԱՅ";
}

export default function ProjectIntratone({ language = "EN" }: ProjectIntratoneProps) {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const content = translations[language];

  return (
    <section
      id="intratone"
      className="bg-black !w-full !h-full"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        scrollMarginTop: "80px"
      }}>

      <div className="container max-w-[1200px] mx-auto px-5 md:px-10" style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)"
      }}>
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-16 mb-12 md:mb-0">
          <div
            className="w-full md:w-auto md:flex-shrink-0 mx-auto md:mx-0"
            style={{
              maxWidth: "min(85vw, 400px)"
            }}>

            <div
              style={{
                width: "100%",
                borderRadius: "clamp(18px, 2.5vw, 32px)",
                overflow: "hidden",
                backgroundColor: "#000",
                cursor: "pointer",
                transition: "transform 200ms ease-out"
              }}
              onClick={() => setShowImageZoom(true)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.01)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}>

              <Image
                src="/intratone/wireframes.png"
                alt="Intratone Wireframes"
                width={400}
                height={600}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block"
                }}
                quality={90}
              />

            </div>
          </div>

          <div className="flex-1" style={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "var(--theme-subtle)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 12px)"
              }}>
              {content.year}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(20px, 2.5vw, 32px)"
              }}>
              {content.title}
            </h2>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#f5f5f7",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                marginBottom: "clamp(20px, 2.5vw, 32px)"
              }}>
              {content.description}
            </div>
          </div>
        </div>

        {/* User Flow PDF - clickable to download */}
        <div className="flex justify-center mt-12 md:mt-16" style={{
          paddingBottom: "clamp(48px, 6vw, 80px)"
        }}>
          <div
            onClick={() => {
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              if (isMobile) {
                const link = document.createElement("a");
                link.href = "/intratone/user-flow.pdf";
                link.download = "RUBENS_Romain_(Intratone_-_Parcours_utilisateur)_1765896968955.pdf";
                link.click();
              } else {
                setShowPDFModal(true);
              }
            }}
            className="w-full max-w-5xl rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
            style={{
              maxHeight: "400px",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <Image 
              src="/intratone/user-flow-preview.jpg" 
              alt="Intratone User Flow"
              width={1600}
              height={900}
              style={{ width: "100%", height: "auto" }}
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        </div>
      </div>

      {/* Image Fullscreen Modal - for first image */}
      {showImageZoom && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center overflow-auto"
          onClick={() => setShowImageZoom(false)}
        >
          <div 
            className="relative w-full flex items-center justify-center px-2 md:px-4 py-4"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Image 
              src="/intratone/wireframes.png" 
              alt="Wireframes - Full Screen"
              width={1600}
              height={900}
              style={{ maxWidth: "95%", maxHeight: "90vh", width: "auto", height: "auto" }}
              quality={90}
              sizes="(max-width: 768px) 100vw, 95vw"
            />

            <button
              onClick={() => setShowImageZoom(false)}
              className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F7] text-[#1d1d1f] transition-all duration-100 ease-out hover:scale-[1.05] active:scale-[0.95] z-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PDF Modal - for second image */}
      {showPDFModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowPDFModal(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(18px, 2vw, 22px)",
                fontWeight: 600,
                color: "#1D1D1F",
                marginBottom: "12px"
              }}
            >
              {content.pdfTitle}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                fontWeight: 400,
                color: "var(--theme-subtle)",
                lineHeight: 1.5,
                marginBottom: "24px"
              }}
            >
              {content.pdfMessage}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPDFModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-[#F5F5F7] text-[#1D1D1F] font-medium transition-all duration-200 hover:bg-[#E5E5E7]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px"
                }}
              >
                {content.pdfCancel}
              </button>

              <a
                href="/projects/intratone/user-flow.pdf"
                download
                className="flex-1 px-4 py-2 rounded-lg bg-[#1D1D1F] text-white font-medium transition-all duration-200 hover:bg-[#333335] text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  textDecoration: "none"
                }}
                onClick={() => setShowPDFModal(false)}
              >
                {content.pdfDownload}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
