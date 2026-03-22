"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------------- DATA ---------------------- */

type SlideId = "orange-hy" | "orange" | "orange-en" | "violet-hy" | "violet" | "violet-en";

type Slide = {
  id: SlideId;
  gradient: string;
  title: string;
  bodyLines: string[];       // lignes de corps (sans la signature)
  accentColor: string;       // couleur du corps + signature
  strikeDesigner?: boolean;  // barre « Je suis designer. »
  strikeText?: string;       // texte à barrer (défaut: "Je suis designer.")
  forceLines?: number;       // nombre de lignes visé pour le bloc texte (3 ou 4)
};

const SLIDES: Slide[] = [
  {
    id: "orange-hy",
    gradient: "linear-gradient(90deg, #D72E3E 0%, #EB6037 100%)",
    title: "Ես դիզայներ եմ։ Ես ստեղծագործում եմ փորձություններ մարդկանց համար։",
    bodyLines: [
      "Ամեն ինչ պետք է մտածված լինի այն մարդկանց համար, ովքեր շփվում են, օգտագործում են և մեծանում են դրա հետ։",
      "Խոսքը պարզապես «գեղեցիկ» ինչ–որ բան ստեղծելու մասին չէ, այլ՝ լավը ստեղծելու մասին է։"
    ],
    accentColor: "#FAC0CC",
    strikeDesigner: true,
    strikeText: "Ես դիզայներ եմ։",
    forceLines: 3
  },
  {
    id: "orange",
    gradient: "linear-gradient(90deg, #D72E3E 0%, #EB6037 100%)",
    title: "Je suis designer. Je suis créateur d'expérience utilisateur.",
    bodyLines: [
      "Tout doit être pensé pour celles et ceux qui interagissent,",
      "qui utilisent et qui grandissent avec.",
      "Il ne s'agit pas de concevoir quelque chose de « beau », mais de concevoir quelque chose de bien."
    ],
    accentColor: "#FAC0CC",
    strikeDesigner: true,
    strikeText: "Je suis designer.",
    forceLines: 3
  },
  {
    id: "orange-en",
    gradient: "linear-gradient(90deg, #D72E3E 0%, #EB6037 100%)",
    title: "I am a designer. I am a user experience creator.",
    bodyLines: [
      "Everything must be shaped for the people who interact,",
      "who use, and who grow with what we design.",
      "The goal is not to create something \"beautiful\", but to create something right."
    ],
    accentColor: "#FAC0CC",
    strikeDesigner: true,
    strikeText: "I am a designer.",
    forceLines: 3
  },
  {
    id: "violet-hy",
    gradient: "linear-gradient(90deg, #583396 0%, #705CD9 100%)",
    title: "Իմ երազանքը ստեղծելն է, նորարարելը և հեղափոխելը։",
    bodyLines: [
      "Երբ ինչ–որ բան գործում է՝ փոփոխելու կարիք չկա։",
      "Երբ ինչ–որ բան չի գործում՝ նորարարելու պահանջ է առաջանում։",
      "Երբ ինչ–որ բան այլևս չի գործում՝ հեղափոխելու անհրաժեշտությունն է ծնվում։"
    ],
    accentColor: "#BEB8D9",
    forceLines: 4
  },
  {
    id: "violet",
    gradient: "linear-gradient(90deg, #583396 0%, #705CD9 100%)",
    title: "Mon rêve est de créer, d'innover et de révolutionner.",
    bodyLines: [
      "Lorsque quelque chose fonctionne, changer n'existe pas,",
      "Lorsque quelque chose ne fonctionne pas, le besoin d'innover apparaît,",
      "et lorsque quelque chose ne fonctionne plus, le besoin de révolutionner s'impose."
    ],
    accentColor: "#BEB8D9",
    forceLines: 4
  },
  {
    id: "violet-en",
    gradient: "linear-gradient(90deg, #583396 0%, #705CD9 100%)",
    title: "My dream is to create, to innovate, and to revolutionize.",
    bodyLines: [
      "When something works, there is no need to change it.",
      "When something does not work, the need to innovate appears.",
      "And when something no longer works at all, the need to revolutionize becomes essential."
    ],
    accentColor: "#BEB8D9",
    forceLines: 4
  }
];

/* --------------- HOOK: container width --------------- */

function useContainerWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState<number>(1440);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      setW(cr.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return { ref, w };
}

/* ---------------------- COMPONENT ---------------------- */

export default function HomeSlides() {
  const [index, setIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");

  const { ref, w } = useContainerWidth();

  // Filter slides by language
  const filteredSlides = useMemo(() => {
    if (selectedLanguage === "FR") {
      return SLIDES.filter(s => s.id !== "orange-hy" && s.id !== "orange-en" && s.id !== "violet-hy" && s.id !== "violet-en");
    } else if (selectedLanguage === "EN") {
      return SLIDES.filter(s => s.id !== "orange-hy" && s.id !== "orange" && s.id !== "violet-hy" && s.id !== "violet");
    } else { // ՀԱՅ
      return SLIDES.filter(s => s.id !== "orange" && s.id !== "orange-en" && s.id !== "violet" && s.id !== "violet-en");
    }
  }, [selectedLanguage]);

  const current = filteredSlides[index] || filteredSlides[0];

  // Reset index when language changes
  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !["FR", "EN", "ՀԱՅ"].includes(saved)) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
    setIndex(0);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
      setIndex(0);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  /* ---- tailles d'écran ---- */
  const isMobile = w <= 480;
  const isTablet = w > 480 && w <= 900;

  /* ---- hauteur fluide clampée ---- */
  const sectionHeight = useMemo(() => {
    // ~22% de la largeur, borné entre 220 et 325
    const h = Math.round(w * 0.22);
    return Math.max(220, Math.min(325, h));
  }, [w]);

  /* ---- échelle continue pour la typo ----
     Base de référence : 1440 (48/18). On compresse un peu l'orange
     pour garantir 1 ligne + 3 lignes. Le violet vise 4 lignes.
     Minimum 0.50 pour assurer lisibilité sur mobile. */
  const baseScale = Math.max(0.50, Math.min(1, w / 1440));
  const titleBase = 48;
  const textBase = 18;

  const perSlideK = (current.id === "orange" || current.id === "orange-hy" || current.id === "orange-en") ? 0.90
                  : (current.id === "violet" || current.id === "violet-hy" || current.id === "violet-en") ? 0.96
                  : 1.00;

  const titleSize = Math.round(titleBase * baseScale * perSlideK);
  const textSize  = Math.round(textBase  * baseScale * perSlideK);

  const titleLH = 1.22;              // compact, Apple-like
  const textLH  = (current.id === "violet" || current.id === "violet-en") ? 1.32 : 1.36;

  const gapTitleToBody = Math.max(10, Math.round(14 * baseScale));
  const gapLines = Math.max(4, Math.round(6 * baseScale));

  /* ---- flèches ---- */
  const arrowDiameter = isMobile ? 28 : isTablet ? 36 : 44;
  const arrowIcon     = Math.round(arrowDiameter * 0.45);
  const arrowSidePad  = isMobile ? 12 : 20;

  /* ---- entrée douce ---- */
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 90);
    return () => clearTimeout(t);
  }, []);

  /* ---- clavier ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  /* ---- swipe / drag ---- */
  const drag = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false });
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, dragging: true };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    const dx = e.clientX - drag.current.startX;
    const threshold = Math.max(40, w * 0.04);
    if (dx <= -threshold) next();
    if (dx >=  threshold) prev();
  };

  const next = () => setIndex((v) => Math.min(v + 1, filteredSlides.length - 1));
  const prev = () => setIndex((v) => Math.max(v - 1, 0));

  return (
    <section
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{
        height: sectionHeight,
        width: "100%",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 420ms ease, transform 420ms ease",
        fontFamily: "var(--font-display)",
        position: "relative",
        overflow: "hidden"
      }}
      aria-roledescription="carousel"
      aria-label="Intro slides"
    >
      {/* conteneur des slides */}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 480ms cubic-bezier(.2,.8,.2,1)",
          willChange: "transform"
        }}
      >
        {filteredSlides.map((s) => (
          <div
            key={s.id}
            style={{
              minWidth: "100%",
              height: "100%",
              background: s.gradient,
              display: "grid",
              placeItems: "center" // ← verrouille le centrage vertical & horizontal
            }}
          >
            {/* bloc typographique centré */}
            <div
              style={{
                width: "min(92%, 1200px)",
                textAlign: "center",
                color: "#fff",
                // garde une marge de sécurité avec les flèches
                paddingLeft: arrowDiameter + arrowSidePad + 8,
                paddingRight: arrowDiameter + arrowSidePad + 8
              }}
            >
              {/* Titre */}
              <h2
                style={{
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: -0.2,
                  lineHeight: titleLH,
                  fontSize: `${titleSize}px`,
                  color: "#FFFFFF",
                  maxWidth: !isTablet && !isMobile ? "100%" : "min(95%, 1100px)",
                  marginInline: "auto",
                  whiteSpace: !isTablet && !isMobile && current.id === "orange" ? "nowrap" : "normal",
                  wordWrap: "break-word",
                  overflowWrap: "break-word"
                }}
              >
                {s.strikeDesigner && s.strikeText ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        textDecorationColor: "#FFFFFF",
                        textDecorationThickness: "2px",
                        opacity: 0.85
                      }}
                    >
                      {s.strikeText}
                    </span>{" "}
                    {s.title.replace(s.strikeText + " ", "")}
                  </>
                ) : (
                  s.title
                )}
              </h2>

              {/* espace titre → corps */}
              <div style={{ height: gapTitleToBody }} />

              {/* Corps + signature dans le même bloc */}
              <div
                style={{
                  color: s.accentColor,
                  fontWeight: 600,
                  fontSize: `${textSize}px`,
                  lineHeight: textLH,
                  maxWidth: "min(92%, 1100px)",
                  marginInline: "auto"
                }}
              >
                {s.bodyLines.map((line, li) => (
                  <div key={li} style={{ marginTop: li === 0 ? 0 : gapLines }}>
                    {line}
                  </div>
                ))}
                <div style={{ marginTop: gapLines }}>
                  Romain Rubens
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* flèches rondes, centrées verticalement */}
      {index > 0 && (
        <button
          onClick={prev}
          aria-label="Slide précédent"
          style={{
            position: "absolute",
            left: `clamp(${arrowSidePad}px, 2.5vw, 24px)`,
            top: "50%",
            transform: "translateY(-50%)",
            width: arrowDiameter,
            height: arrowDiameter,
            borderRadius: 9999,
            display: "grid",
            placeItems: "center",
            background: "rgba(255,255,255,.20)",
            backdropFilter: "saturate(1.2) blur(6px)",
            border: "none",
            cursor: "pointer"
          }}
        >
          <ChevronLeft size={arrowIcon} color="#fff" />
        </button>
      )}

      {index < filteredSlides.length - 1 && (
        <button
          onClick={next}
          aria-label="Slide suivant"
          style={{
            position: "absolute",
            right: `clamp(${arrowSidePad}px, 2.5vw, 24px)`,
            top: "50%",
            transform: "translateY(-50%)",
            width: arrowDiameter,
            height: arrowDiameter,
            borderRadius: 9999,
            display: "grid",
            placeItems: "center",
            background: "rgba(255,255,255,.20)",
            backdropFilter: "saturate(1.2) blur(6px)",
            border: "none",
            cursor: "pointer"
          }}
        >
          <ChevronRight size={arrowIcon} color="#fff" />
        </button>
      )}
    </section>
  );
}