"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type Phase = "recede" | "sfwindow" | "clouds" | "forest" | "earth" | "dark" | "done";
type Language = "FR" | "EN" | "ՀԱՅ";

// ─── Letterbox bars ───────────────────────────────────────────────────────────
function Letterbox() {
  return (
    <>
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, height: "9vh", background: "#000", transformOrigin: "top", zIndex: 10005, pointerEvents: "none" }}
      />
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }}
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "9vh", background: "#000", transformOrigin: "bottom", zIndex: 10005, pointerEvents: "none" }}
      />
    </>
  );
}

// ─── Scene 1: Page recedes ────────────────────────────────────────────────────
function RecedeScene({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: isDark ? "#0a0a0f" : "#f0f0f5",
      perspective: "1400px",
    }}>
      <motion.div
        style={{
          width: "min(860px, 88vw)", height: "min(560px, 78vh)",
          background: isDark ? "#1d1d1f" : "#ffffff",
          borderRadius: 14,
          boxShadow: isDark
            ? "0 0 0 1px #2a2a2a, 0 40px 100px rgba(0,0,0,0.8)"
            : "0 0 0 1px #e0e0e0, 0 40px 100px rgba(0,0,0,0.12)",
          overflow: "hidden",
          transformOrigin: "50% 50%",
        }}
        animate={{ scale: [1, 0.55], y: [0, -60], rotateX: [0, 6], opacity: [1, 0] }}
        transition={{ duration: 1.0, ease: [0.4, 0, 1, 1] }}
      >
        <div style={{
          height: 50, background: isDark ? "rgba(25,25,25,0.95)" : "rgba(255,255,255,0.95)",
          borderBottom: `1px solid ${isDark ? "#2a2a2a" : "#e8e8e8"}`,
          display: "flex", alignItems: "center", padding: "0 20px", gap: 10,
        }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--theme-accent)" }} />
          <div style={{ width: 110, height: 9, borderRadius: 5, background: isDark ? "#333" : "#e0e0e0" }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: 56, height: 24, borderRadius: 12, background: "var(--theme-accent)", opacity: 0.8 }} />
        </div>
        <div style={{ padding: "36px 28px" }}>
          <div style={{ width: 180, height: 12, borderRadius: 6, background: isDark ? "#2a2a2a" : "#efefef", marginBottom: 14 }} />
          <div style={{ width: "65%", height: 44, borderRadius: 8, background: isDark ? "#222" : "#f4f4f4", marginBottom: 18 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ height: 110, borderRadius: 10, background: isDark ? "#242424" : "#efefef" }} />)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Scene 2: SF Skyscraper Window Exit ──────────────────────────────────────
function SFWindowScene() {
  return (
    <motion.div
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* SF city video */}
      <motion.div
        style={{ position: "absolute", inset: "-5%" }}
        animate={{ scale: [1.0, 1.8] }}
        transition={{ duration: 3.5, ease: [0.5, 0, 1, 1] }}
      >
        <video autoPlay muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88) saturate(1.25) blur(1.5px)" }}
        >
          <source src="/videos/lab/sf.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Interior - ceiling/floor */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, transparent 20%, transparent 76%, rgba(0,0,0,0.6) 100%)",
      }} />
      {/* Side walls */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "8%", background: "rgba(6,8,18,0.88)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "8%", background: "rgba(6,8,18,0.88)", pointerEvents: "none" }} />

      {/* Curtain wall mullions */}
      <motion.svg
        viewBox="0 0 100 100" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 3.5, times: [0, 0.62, 1] }}
      >
        {[8, 26, 44, 62, 80, 92].map((x, i) => (
          <rect key={`v${i}`} x={x} y={0} width={i === 0 || i === 5 ? 2 : 1} height={100}
            fill={`rgba(150,162,190,${i === 0 || i === 5 ? 0.85 : 0.55})`} />
        ))}
        {[10, 35, 60, 85, 90].map((y, i) => (
          <rect key={`h${i}`} x={8} y={y} width={84} height={i === 0 || i === 4 ? 1.6 : 0.7}
            fill={`rgba(150,162,190,${i === 0 || i === 4 ? 0.8 : 0.42})`} />
        ))}
        {[8, 26, 44, 62].map((x, xi) =>
          [10, 35, 60].map((y, yi) => (
            <line key={`s${xi}${yi}`} x1={x + 2} y1={y + 2} x2={x + 7} y2={y + 10}
              stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
          ))
        )}
      </motion.svg>

      {/* Glass reflection sweep */}
      <motion.div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(200,220,255,0.14) 0%, transparent 45%, rgba(200,220,255,0.06) 100%)",
        }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 3.5, ease: "easeIn" }}
      />

      {/* White flash — exiting the window */}
      <motion.div
        style={{ position: "absolute", inset: 0, background: "#fff", pointerEvents: "none" }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 3.5, times: [0, 0.72, 1] }}
      />
    </motion.div>
  );
}

// ─── Scene 3: Flying through clouds ──────────────────────────────────────────
function CloudsScene() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (ref.current) ref.current.playbackRate = 2.2; }, []);

  return (
    <motion.div
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#08101a" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        style={{ position: "absolute", inset: "-5%" }}
        animate={{ scale: [1.0, 1.12] }}
        transition={{ duration: 6, ease: [0.4, 0, 1, 1] }}
      >
        <video ref={ref} autoPlay muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.1) contrast(1.06) saturate(0.88)" }}
        >
          <source src="/videos/lab/clouds.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.65) 100%)",
      }} />

      {/* Speed lines */}
      {Array.from({ length: 14 }, (_, i) => (
        <motion.div key={i}
          style={{
            position: "absolute", left: `${(i * 7 + 3) % 95}%`, top: 0,
            width: 1, height: "100%", pointerEvents: "none",
            background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
          }}
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 0.32 + (i % 4) * 0.06, repeat: Infinity, ease: "linear", delay: i * 0.04 }}
        />
      ))}
    </motion.div>
  );
}

// ─── Scene 4: Forest — mist evaporating ──────────────────────────────────────
function ForestScene() {
  return (
    <motion.div
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a120a" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
    >
      <motion.div
        style={{ position: "absolute", inset: "-5%" }}
        animate={{ scale: [1.07, 1.0] }}
        transition={{ duration: 5.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <video autoPlay muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.9) saturate(1.12)" }}
        >
          <source src="/videos/lab/forest.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Mist evaporating */}
      <motion.div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 130% 80% at 50% 18%, rgba(255,255,255,0.92) 0%, rgba(240,246,255,0.65) 42%, rgba(215,232,255,0.18) 68%, transparent 100%)",
        }}
        animate={{ opacity: [1, 0.55, 0] }}
        transition={{ duration: 5, times: [0, 0.38, 1], ease: "easeOut" }}
      />

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.5) 100%)",
      }} />

      {/* Dark earth appearing at bottom */}
      <motion.div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 90% 55% at 50% 90%, #05040202 0%, rgba(0,0,0,0.0) 40%)",
        }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 5.5, times: [0, 0.68, 1] }}
      />
    </motion.div>
  );
}

// ─── Scene 5: Zoom into dark earth ───────────────────────────────────────────
function EarthScene() {
  return (
    <motion.div
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        style={{
          borderRadius: "50%",
          background: "radial-gradient(circle, #1c1408 0%, #0e0c06 45%, #050402 75%, #000 100%)",
          boxShadow: "0 0 120px 40px rgba(0,0,0,1)",
        }}
        animate={{ width: ["55vmin", "400vmax"], height: ["55vmin", "400vmax"] }}
        transition={{ duration: 2, ease: [0.4, 0, 1, 1] }}
      />
    </motion.div>
  );
}

// ─── Scene 6: Darkness → light ───────────────────────────────────────────────
function DarkScene() {
  return (
    <motion.div
      style={{ position: "absolute", inset: 0, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,252,240,1) 0%, rgba(255,245,200,0.85) 25%, rgba(255,240,180,0.3) 65%, transparent 100%)",
        }}
        animate={{
          width:  ["0px", "0px", "8px", "2px", "14px", "5px", "250vmax"],
          height: ["0px", "0px", "8px", "2px", "14px", "5px", "250vmax"],
          opacity: [0, 0, 1, 0.3, 1, 0.75, 1],
        }}
        transition={{ duration: 1.5, times: [0, 0.18, 0.34, 0.47, 0.61, 0.73, 1], ease: "easeOut" }}
      />
    </motion.div>
  );
}

// ─── Experiments ─────────────────────────────────────────────────────────────
const LAB_COPY = {
  FR: {
    eyebrow: "Laboratoire UX/UI — designer codé",
    title: ["Le laboratoire", "d'un designer", "UX/UI."],
    intro:
      "Une page-manifeste pour montrer comment je pense, code et polis une interface: structure, contraste, couleur, animation et précision d'exécution.",
    pills: ["Systèmes visuels", "Couleur active", "Motion calibrée", "Prototypes vivants"],
    boardEyebrow: "Comment c'est fait",
    boardTitle: "Precision board",
    boardLines: [
      "Grille d'abord, style ensuite.",
      "Chaque couleur sert un rythme visuel.",
      "L'animation guide avant de séduire.",
      "Le code reste lisible, modulable, mesuré.",
    ],
    metrics: [
      { value: "0.5px", label: "tolérance visuelle" },
      { value: "12fps→60fps", label: "budget motion contrôlé" },
      { value: "3 couches", label: "hiérarchie couleur" },
      { value: "100%", label: "intention sur chaque détail" },
    ],
    experimentsTitle: "Chantiers du laboratoire",
    experimentsIntro:
      "Des pistes concrètes pour un designer UX/UI qui code: outils visuels, moteurs de style, tests d'interaction, surfaces de narration.",
    protocolTitle: "Méthode de fabrication",
    protocolIntro:
      "Apprendre, appliquer, coder: chaque étude suit une boucle courte, observable et raffinée jusqu'à ce que l'interface devienne nette.",
    standardsTitle: "Standards internes",
    standardsIntro:
      "Le but n'est pas d'ajouter des effets. Le but est de construire une présence visuelle cohérente, précise et mémorable.",
    motionTitle: "Motion direction",
    motionIntro:
      "Une animation utile doit clarifier la hiérarchie, renforcer le geste et conserver une sensation de maîtrise.",
    outputLabel: "Sortie",
    skip: "Passer",
    status: { WIP: "En cours", SOON: "Bientôt", CONCEPT: "Concept" },
    footer: "Lab en évolution continue — designer UX/UI, code, système, couleur, mouvement.",
  },
  EN: {
    eyebrow: "UX/UI laboratory — designer coded",
    title: ["The laboratory", "of a UX/UI", "designer."],
    intro:
      "A manifesto page to show how I think, code and polish an interface: structure, contrast, color, animation and execution quality.",
    pills: ["Visual systems", "Active color", "Calibrated motion", "Living prototypes"],
    boardEyebrow: "How it is built",
    boardTitle: "Precision board",
    boardLines: [
      "Grid first, style second.",
      "Every color supports visual rhythm.",
      "Animation guides before it dazzles.",
      "Code stays readable, modular and measured.",
    ],
    metrics: [
      { value: "0.5px", label: "visual tolerance" },
      { value: "12fps→60fps", label: "controlled motion budget" },
      { value: "3 layers", label: "color hierarchy" },
      { value: "100%", label: "intent on every detail" },
    ],
    experimentsTitle: "Lab tracks",
    experimentsIntro:
      "Concrete paths for a UX/UI designer who codes: visual tools, style engines, interaction tests and narrative surfaces.",
    protocolTitle: "Build method",
    protocolIntro:
      "Learn, apply, code: every study follows a short, observable loop until the interface feels sharp.",
    standardsTitle: "Internal standards",
    standardsIntro:
      "The goal is not to stack effects. The goal is to build a visual presence that feels coherent, precise and memorable.",
    motionTitle: "Motion direction",
    motionIntro:
      "Useful animation should clarify hierarchy, reinforce gesture and keep a sense of control.",
    outputLabel: "Output",
    skip: "Skip",
    status: { WIP: "In progress", SOON: "Soon", CONCEPT: "Concept" },
    footer: "Lab in continuous evolution — UX/UI designer, code, system, color, motion.",
  },
  ՀԱՅ: {
    eyebrow: "UX/UI լաբորատորիա — դիզայների կողմից կոդավորված",
    title: ["UX/UI", "դիզայների", "լաբորատորիա."],
    intro:
      "Մանիֆեստային էջ, որը ցույց է տալիս, թե ինչպես եմ մտածում, կոդավորում և հղկում ինտերֆեյսը՝ կառուցվածք, հակադրություն, գույն, անիմացիա և կատարման ճշգրտություն։",
    pills: ["Տեսողական համակարգեր", "Ակտիվ գույն", "Կշռված motion", "Կենդանի պրոտոտիպեր"],
    boardEyebrow: "Ինչպես է կառուցված",
    boardTitle: "Precision board",
    boardLines: [
      "Նախ ցանցը, հետո ոճը։",
      "Յուրաքանչյուր գույն սպասարկում է ռիթմը։",
      "Անիմացիան նախ ուղղորդում է, հետո տպավորում։",
      "Կոդը մնում է ընթեռնելի, ճկուն և չափված։",
    ],
    metrics: [
      { value: "0.5px", label: "տեսողական հանդուրժողականություն" },
      { value: "12fps→60fps", label: "վերահսկվող motion բյուջե" },
      { value: "3 շերտ", label: "գունային հիերարխիա" },
      { value: "100%", label: "մտադրություն ամեն դետալում" },
    ],
    experimentsTitle: "Լաբորատոր ուղղություններ",
    experimentsIntro:
      "Գործնական հետքեր UX/UI դիզայների համար, ով նաև կոդավորում է՝ տեսողական գործիքներ, ոճի շարժիչներ, փոխազդեցության թեստեր և պատմողական մակերեսներ։",
    protocolTitle: "Կառուցման մեթոդ",
    protocolIntro:
      "Սովորել, կիրառել, կոդավորել․ յուրաքանչյուր փորձարկում անցնում է կարճ և տեսանելի ցիկլով, մինչև ինտերֆեյսը դառնա հստակ։",
    standardsTitle: "Ներքին ստանդարտներ",
    standardsIntro:
      "Նպատակը պարզապես էֆեկտներ ավելացնելը չէ։ Նպատակը համահունչ, ճշգրիտ և հիշվող տեսողական ներկայություն կառուցելն է։",
    motionTitle: "Motion ուղղություն",
    motionIntro:
      "Օգտակար անիմացիան պետք է պարզեցնի հիերարխիան, ուժեղացնի ժեստը և պահպանի վերահսկվող զգացողություն։",
    outputLabel: "Արդյունք",
    skip: "Բաց թողնել",
    status: { WIP: "Ընթացքում", SOON: "Շուտով", CONCEPT: "Կոնցեպտ" },
    footer: "Lab-ը շարունակաբար զարգանում է — UX/UI դիզայներ, կոդ, համակարգ, գույն, շարժում։",
  },
} as const;

const EXPERIMENTS = [
  {
    id: "chromatic",
    title: "Chromatic Engine",
    desc: {
      FR: "Un moteur de palettes pour tester contraste, tension et hiérarchie avant même le premier écran final.",
      EN: "A palette engine to test contrast, tension and hierarchy before the first final screen.",
      ՀԱՅ: "Գունապնակների շարժիչ՝ հակադրությունը, լարվածությունը և հիերարխիան փորձարկելու համար դեռևս վերջնական էկրանից առաջ։",
    },
    output: {
      FR: "Nuanciers, règles d'accent, rapports de contraste.",
      EN: "Color ramps, accent rules, contrast ratios.",
      ՀԱՅ: "Գունաշարեր, accent-ի կանոններ, հակադրության հարաբերակցություններ։",
    },
    status: "WIP" as const,
    icon: "◉",
    no: "01",
  },
  {
    id: "typo",
    title: "Typo Lab",
    desc: {
      FR: "Études de rythmes typographiques, échelles expressives et systèmes de titrage qui tiennent à l'écran.",
      EN: "Studies in typographic rhythm, expressive scales and headline systems that hold on screen.",
      ՀԱՅ: "Տառատեսակային ռիթմերի, արտահայտիչ չափաշարերի և վերնագրային համակարգերի ուսումնասիրություն, որոնք աշխատում են էկրանին։",
    },
    output: {
      FR: "Titres display, ratios, règles de respiration.",
      EN: "Display headlines, ratios, breathing rules.",
      ՀԱՅ: "Display վերնագրեր, հարաբերակցություններ, շնչառության կանոններ։",
    },
    status: "WIP" as const,
    icon: "Aa",
    no: "02",
  },
  {
    id: "motion",
    title: "Motion Catalog",
    desc: {
      FR: "Bibliothèque de transitions et de comportements: vitesse, inertie, coupe nette, continuité visuelle.",
      EN: "A library of transitions and behaviors: speed, inertia, sharp cuts and visual continuity.",
      ՀԱՅ: "Անցումների և վարքագծերի գրադարան՝ արագություն, իներցիա, հստակ կտրումներ և տեսողական շարունակականություն։",
    },
    output: {
      FR: "Courbes, timings, règles de déclenchement.",
      EN: "Curves, timings, trigger rules.",
      ՀԱՅ: "Կորեր, timing-ներ, գործարկման կանոններ։",
    },
    status: "SOON" as const,
    icon: "→",
    no: "03",
  },
  {
    id: "form",
    title: "Form Study",
    desc: {
      FR: "Des interfaces plus radicales où le formulaire devient composition, rythme et personnalité de marque.",
      EN: "More radical interfaces where the form becomes composition, rhythm and brand personality.",
      ՀԱՅ: "Ավելի կտրուկ ինտերֆեյսներ, որտեղ form-ը դառնում է կոմպոզիցիա, ռիթմ և բրենդի անհատականություն։",
    },
    output: {
      FR: "Patterns de saisie, microcopie, structure.",
      EN: "Input patterns, microcopy, structure.",
      ՀԱՅ: "Մուտքագրման pattern-ներ, microcopy, կառուցվածք։",
    },
    status: "CONCEPT" as const,
    icon: "□",
    no: "04",
  },
  {
    id: "signal",
    title: "Signal",
    desc: {
      FR: "Des visualisations vivantes pour raconter un état système sans perdre la lisibilité ni le calme.",
      EN: "Living visualizations that tell a system state without losing readability or calm.",
      ՀԱՅ: "Կենդանի վիզուալիզացիաներ՝ համակարգի վիճակը պատմելու համար առանց ընթեռնելիությունն ու հանգստությունը կորցնելու։",
    },
    output: {
      FR: "Graphes, pulses, surfaces de monitoring.",
      EN: "Graphs, pulses, monitoring surfaces.",
      ՀԱՅ: "Գրաֆիկներ, pulse-եր, monitoring մակերեսներ։",
    },
    status: "CONCEPT" as const,
    icon: "∿",
    no: "05",
  },
  {
    id: "glitch",
    title: "Glitch Machine",
    desc: {
      FR: "Des accidents visuels contrôlés pour injecter de l'énergie sans sacrifier la lisibilité du système.",
      EN: "Controlled visual accidents that inject energy without sacrificing system legibility.",
      ՀԱՅ: "Վերահսկվող տեսողական խափանումներ, որոնք էներգիա են տալիս՝ առանց համակարգի ընթեռնելիությունը զոհաբերելու։",
    },
    output: {
      FR: "Textures, ruptures, artefacts dirigés.",
      EN: "Textures, ruptures, directed artifacts.",
      ՀԱՅ: "Տեքստուրաներ, խզումներ, ուղղորդված արտեֆակտներ։",
    },
    status: "WIP" as const,
    icon: "⌬",
    no: "06",
  },
];

const PROTOCOL = [
  {
    no: "01",
    title: { FR: "Observer", EN: "Observe", ՀԱՅ: "Դիտարկել" },
    text: {
      FR: "Je récolte des références, des contraintes et des irritants réels avant de dessiner quoi que ce soit.",
      EN: "I gather references, constraints and real friction points before drawing anything.",
      ՀԱՅ: "Մինչ որևէ բան նկարելը՝ հավաքում եմ հղումներ, սահմանափակումներ և իրական friction կետեր։",
    },
  },
  {
    no: "02",
    title: { FR: "Structurer", EN: "Structure", ՀԱՅ: "Կառուցել" },
    text: {
      FR: "Je pose une grille, des ratios et une hiérarchie pour que l'impact visuel reste maîtrisé.",
      EN: "I set a grid, ratios and hierarchy so the visual impact stays controlled.",
      ՀԱՅ: "Սահմանում եմ ցանց, հարաբերակցություններ և հիերարխիա, որպեսզի տեսողական ազդեցությունը վերահսկելի մնա։",
    },
  },
  {
    no: "03",
    title: { FR: "Animer", EN: "Animate", ՀԱՅ: "Անիմացնել" },
    text: {
      FR: "Le mouvement sert la lecture: entrée, accent, relais, disparition. Rien n'est décoratif par défaut.",
      EN: "Motion serves reading: entry, accent, relay, exit. Nothing is decorative by default.",
      ՀԱՅ: "Շարժումը ծառայում է ընթերցմանը՝ մուտք, շեշտադրում, փոխանցում, ելք։ Լռելյայն ոչինչ զուտ դեկոր չէ։",
    },
  },
  {
    no: "04",
    title: { FR: "Polir", EN: "Polish", ՀԱՅ: "Հղկել" },
    text: {
      FR: "Je réécris le code et j'épure les détails jusqu'à ce que l'expérience paraisse évidente.",
      EN: "I rewrite code and refine details until the experience feels obvious.",
      ՀԱՅ: "Վերագրում եմ կոդը և մաքրում դետալները, մինչև փորձառությունը դառնա ինքնաբացատրելի։",
    },
  },
];

const STANDARDS = [
  {
    value: "Grid / contrast / cadence",
    text: {
      FR: "Chaque écran doit rester fort même sans image, grâce à sa structure.",
      EN: "Every screen should stay strong even without imagery, thanks to structure.",
      ՀԱՅ: "Յուրաքանչյուր էկրան պետք է ուժեղ մնա նույնիսկ առանց պատկերների՝ իր կառուցվածքի շնորհիվ։",
    },
  },
  {
    value: "Color as signal",
    text: {
      FR: "La couleur sert à orienter, pas à maquiller.",
      EN: "Color is there to direct, not to disguise.",
      ՀԱՅ: "Գույնը պետք է ուղղորդի, ոչ թե պարզապես զարդարի։",
    },
  },
  {
    value: "Motion as syntax",
    text: {
      FR: "L'animation indique une relation spatiale ou une priorité d'usage.",
      EN: "Animation should indicate a spatial relationship or a usage priority.",
      ՀԱՅ: "Անիմացիան պետք է ցույց տա տարածական կապ կամ օգտագործման առաջնահերթություն։",
    },
  },
  {
    value: "Readable code",
    text: {
      FR: "Une interface forte vaut plus quand son implémentation reste claire.",
      EN: "A strong interface matters more when its implementation stays clear.",
      ՀԱՅ: "Ուժեղ ինտերֆեյսն ավելի արժեքավոր է, երբ դրա իրականացումը մնում է պարզ։",
    },
  },
];

function getReveal(shouldReduceMotion: boolean, delay = 0, y = 24) {
  if (shouldReduceMotion) return {};
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay },
  };
}

function LabContent({ language, shouldReduceMotion }: { language: Language; shouldReduceMotion: boolean }) {
  const { isDark } = useTheme();
  const t = LAB_COPY[language];
  const dotColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const ink = "var(--theme-fg)";
  const bg = "var(--theme-bg)";
  const panel = "var(--theme-card-bg)";
  const border = ink;
  const accent = "var(--theme-accent)";
  const accentFg = "var(--theme-accent-fg)";
  const muted = "var(--theme-muted)";
  const softPanel = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)";
  const hardShadow = isDark ? "10px 10px 0 rgba(0,0,0,0.45)" : "10px 10px 0 rgba(29,29,31,0.96)";
  const halftone = `radial-gradient(circle, ${dotColor} 1.6px, transparent 1.6px)`;
  const stripe = `repeating-linear-gradient(135deg, transparent 0 16px, ${isDark ? "rgba(255,255,255,0.05)" : "rgba(29,29,31,0.06)"} 16px 32px)`;
  const statuses = t.status;

  return (
    <main
      id="main-content"
      style={{
        minHeight: "100vh",
        background: bg,
        color: ink,
        fontFamily: "var(--font-body)",
        backgroundImage: `${halftone}, linear-gradient(180deg, ${isDark ? "#111118" : "#ffffff"} 0%, ${bg} 58%)`,
        backgroundSize: "18px 18px, auto",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "clamp(92px, 12vw, 132px) clamp(20px, 4.4vw, 52px) 84px" }}>
        <motion.section
          className="lab-hero"
          {...getReveal(shouldReduceMotion)}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.08fr) minmax(320px, 0.92fr)",
            gap: 28,
            alignItems: "stretch",
            marginBottom: 28,
          }}
        >
          <div style={{
            border: `3px solid ${border}`,
            background: stripe,
            boxShadow: hardShadow,
            padding: "clamp(24px, 4vw, 40px)",
            position: "relative",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: `2px solid ${border}`,
              background: accent,
              color: accentFg,
              padding: "7px 12px",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 22,
            }}>
              <span>{t.eyebrow}</span>
            </div>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(54px, 9vw, 110px)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              margin: "0 0 22px",
              textTransform: "uppercase",
            }}>
              {t.title[0]}
              <br />
              <span style={{ color: accent, textShadow: `4px 4px 0 ${ink}` }}>{t.title[1]}</span>
              <br />
              {t.title[2]}
            </h1>
            <p style={{
              maxWidth: 620,
              fontSize: "clamp(15px, 1.9vw, 19px)",
              lineHeight: 1.58,
              color: muted,
              margin: "0 0 26px",
            }}>
              {t.intro}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {t.pills.map((pill, index) => (
                <motion.div
                  key={pill}
                  {...getReveal(shouldReduceMotion, index * 0.05, 10)}
                  style={{
                    border: `2px solid ${border}`,
                    background: index % 2 === 0 ? panel : accent,
                    color: index % 2 === 0 ? ink : accentFg,
                    padding: "10px 14px",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {pill}
                </motion.div>
              ))}
            </div>
            <motion.div
              aria-hidden="true"
              animate={shouldReduceMotion ? {} : { x: ["-15%", "105%"] }}
              transition={shouldReduceMotion ? {} : { duration: 2.8, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", left: 0, bottom: 18, width: 120, height: 7, background: accent }}
            />
          </div>

          <motion.div
            {...getReveal(shouldReduceMotion, 0.08)}
            style={{
              border: `3px solid ${border}`,
              background: panel,
              boxShadow: hardShadow,
              padding: 18,
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              gap: 14,
              minHeight: 420,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: muted, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>
                  {t.boardEyebrow}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
                  {t.boardTitle}
                </div>
              </div>
              <div style={{
                transform: "rotate(-4deg)",
                border: `2px solid ${border}`,
                background: accent,
                color: accentFg,
                padding: "8px 12px",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}>
                Pop art / UX
              </div>
            </div>

            <div className="lab-board-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 12, alignItems: "stretch" }}>
              <div style={{
                border: `3px solid ${border}`,
                background: `linear-gradient(135deg, ${accent} 0%, ${accent} 24%, ${softPanel} 24%, ${softPanel} 100%)`,
                minHeight: 230,
                padding: 18,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
                  Designer-coded interface
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 14 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ height: 76, border: `2px solid ${border}`, background: i === 0 ? ink : panel }} />
                  ))}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 74px)", lineHeight: 0.9, letterSpacing: "-0.06em", textTransform: "uppercase" }}>
                  UX<br />UI
                </div>
                <motion.div
                  aria-hidden="true"
                  animate={shouldReduceMotion ? {} : { rotate: [0, 6, -4, 0], scale: [1, 1.02, 1] }}
                  transition={shouldReduceMotion ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute", right: -18, bottom: -26,
                    width: 130, height: 130, borderRadius: "50%",
                    border: `3px solid ${border}`, background: bg,
                    display: "grid", placeItems: "center",
                    fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800,
                  }}
                >
                  01
                </motion.div>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {t.boardLines.map((line, index) => (
                  <motion.div
                    key={line}
                    {...getReveal(shouldReduceMotion, index * 0.04, 12)}
                    style={{
                      border: `2px solid ${border}`,
                      background: index % 2 === 0 ? softPanel : bg,
                      padding: "14px 14px 16px",
                    }}
                  >
                    <div style={{ fontSize: 10, color: muted, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.45, fontWeight: 700 }}>{line}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lab-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10 }}>
              {t.metrics.map((metric) => (
                <div key={metric.label} style={{ border: `2px solid ${border}`, background: bg, padding: "12px 10px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 800, lineHeight: 1 }}>
                    {metric.value}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 10, color: muted, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.4 }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          {...getReveal(shouldReduceMotion, 0.05)}
          style={{
            border: `3px solid ${border}`,
            background: accent,
            color: accentFg,
            boxShadow: hardShadow,
            padding: "18px clamp(18px, 2.5vw, 26px)",
            marginBottom: 30,
          }}
        >
          <div className="lab-ribbon" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14, fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            <div>Precision</div>
            <div>Visual syntax</div>
            <div>Motion standards</div>
            <div>Pop attitude</div>
          </div>
        </motion.section>

        <section style={{ marginBottom: 36 }}>
          <motion.div {...getReveal(shouldReduceMotion, 0.06)} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: muted, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
              {t.experimentsTitle}
            </div>
            <p style={{ maxWidth: 760, margin: 0, fontSize: 16, lineHeight: 1.65, color: muted }}>
              {t.experimentsIntro}
            </p>
          </motion.div>

          <div className="lab-experiments-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 18 }}>
            {EXPERIMENTS.map((exp, index) => (
              <motion.article
                key={exp.id}
                {...getReveal(shouldReduceMotion, index * 0.05)}
                whileHover={shouldReduceMotion ? {} : { y: -5, rotate: index % 2 === 0 ? -0.3 : 0.3 }}
                style={{ border: `3px solid ${border}`, background: index % 2 === 0 ? panel : softPanel, boxShadow: hardShadow, padding: 20, position: "relative", overflow: "hidden" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 10, color: muted, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>
                      {exp.no}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 48, height: 48, border: `2px solid ${border}`, background: accent, color: accentFg, display: "grid", placeItems: "center", fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 800 }}>
                        {exp.icon}
                      </div>
                      <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1, fontFamily: "var(--font-display)", letterSpacing: "-0.03em", textTransform: "uppercase" }}>
                        {exp.title}
                      </h2>
                    </div>
                  </div>
                  <div style={{ transform: "rotate(-4deg)", border: `2px solid ${exp.status === "WIP" ? accent : border}`, background: exp.status === "WIP" ? accent : bg, color: exp.status === "WIP" ? accentFg : ink, padding: "8px 10px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {statuses[exp.status]}
                  </div>
                </div>
                <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.62, color: muted }}>{exp.desc[language]}</p>
                <div style={{ borderTop: `2px solid ${border}`, paddingTop: 14, display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: muted, letterSpacing: "0.18em", textTransform: "uppercase" }}>{t.outputLabel}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, fontWeight: 700 }}>{exp.output[language]}</div>
                </div>
                <motion.div
                  aria-hidden="true"
                  animate={shouldReduceMotion ? {} : { x: ["-100%", "0%", "100%"] }}
                  transition={shouldReduceMotion ? {} : { duration: 3.4 + index * 0.2, repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", left: 0, bottom: 0, width: "42%", height: 6, background: accent }}
                />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="lab-bottom-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.92fr) minmax(0, 1.08fr)", gap: 24, marginBottom: 36 }}>
          <motion.div {...getReveal(shouldReduceMotion, 0.04)} style={{ border: `3px solid ${border}`, background: panel, boxShadow: hardShadow, padding: "20px 20px 24px" }}>
            <div style={{ fontSize: 11, color: muted, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>{t.protocolTitle}</div>
            <p style={{ margin: "0 0 18px", fontSize: 15, lineHeight: 1.62, color: muted }}>{t.protocolIntro}</p>
            <div style={{ display: "grid", gap: 12 }}>
              {PROTOCOL.map((step, index) => (
                <motion.div key={step.no} {...getReveal(shouldReduceMotion, index * 0.05, 10)} style={{ border: `2px solid ${border}`, background: index % 2 === 0 ? bg : softPanel, padding: "14px 14px 16px" }}>
                  <div style={{ fontSize: 10, color: muted, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>{step.no}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1, marginBottom: 8, textTransform: "uppercase" }}>{step.title[language]}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.58, color: muted }}>{step.text[language]}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...getReveal(shouldReduceMotion, 0.08)} style={{ border: `3px solid ${border}`, background: stripe, boxShadow: hardShadow, padding: "20px 20px 24px", display: "grid", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: muted, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>{t.standardsTitle}</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.62, color: muted }}>{t.standardsIntro}</p>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {STANDARDS.map((item, index) => (
                <div className="lab-standard-row" key={item.value} style={{ display: "grid", gridTemplateColumns: "minmax(120px, 150px) 1fr", gap: 14, border: `2px solid ${border}`, background: index % 2 === 0 ? bg : panel, padding: 14 }}>
                  <div style={{ border: `2px solid ${border}`, background: accent, color: accentFg, fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", padding: "10px 12px", alignSelf: "start" }}>{item.value}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.58, color: muted }}>{item.text[language]}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <motion.section {...getReveal(shouldReduceMotion, 0.05)} style={{ border: `3px solid ${border}`, background: panel, boxShadow: hardShadow, padding: "20px 20px 24px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: muted, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>{t.motionTitle}</div>
          <p style={{ margin: "0 0 18px", fontSize: 15, lineHeight: 1.62, color: muted, maxWidth: 760 }}>{t.motionIntro}</p>
          <div className="lab-motion-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
            {[
              { title: "Entry", value: "240ms", width: "72%" },
              { title: "Relay", value: "420ms", width: "88%" },
              { title: "Exit", value: "180ms", width: "56%" },
            ].map((item, index) => (
              <div key={item.title} style={{ border: `2px solid ${border}`, background: index === 1 ? softPanel : bg, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1, textTransform: "uppercase" }}>{item.title}</div>
                  <div style={{ fontSize: 10, color: muted, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>{item.value}</div>
                </div>
                <div style={{ height: 18, border: `2px solid ${border}`, background: panel, overflow: "hidden" }}>
                  <motion.div
                    animate={shouldReduceMotion ? {} : { x: ["-8%", "6%", "-8%"] }}
                    transition={shouldReduceMotion ? {} : { duration: 2 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: item.width, height: "100%", background: accent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div style={{ borderTop: `3px solid ${border}`, paddingTop: 16, fontSize: 11, color: muted, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          {t.footer}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 980px) {
          .lab-hero, .lab-bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 760px) {
          .lab-board-grid, .lab-standard-row { grid-template-columns: 1fr !important; }
          .lab-metrics, .lab-ribbon, .lab-motion-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .lab-metrics, .lab-ribbon, .lab-motion-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LabPage() {
  const [phase, setPhase] = useState<Phase>("recede");
  const [language, setLanguage] = useState<Language>("FR");
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  // Preload videos
  useEffect(() => {
    ["/videos/lab/sf.mp4", "/videos/lab/clouds.mp4", "/videos/lab/forest.mp4"].forEach(src => {
      const v = document.createElement("video");
      v.src = src; v.preload = "auto"; v.muted = true; v.load();
    });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language | null;
    if (saved && ["FR", "EN", "ՀԱՅ"].includes(saved)) setLanguage(saved);
  }, []);

  useEffect(() => {
    const handle = (e: CustomEvent<Language>) => setLanguage(e.detail);
    window.addEventListener("languageChange", handle as EventListener);
    return () => window.removeEventListener("languageChange", handle as EventListener);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) { setPhase("done"); return; }
    const alreadySeen = sessionStorage.getItem("labIntroSeen");
    if (alreadySeen === "1") { setPhase("done"); return; }
    sessionStorage.setItem("labIntroSeen", "1");

    const timers = [
      setTimeout(() => setPhase("sfwindow"), 2000),
      setTimeout(() => setPhase("clouds"),   5500),
      setTimeout(() => setPhase("forest"),   11500),
      setTimeout(() => setPhase("earth"),    17000),
      setTimeout(() => setPhase("dark"),     19000),
      setTimeout(() => setPhase("done"),     20500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [shouldReduceMotion]);

  if (phase === "done") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        <LabContent language={language} shouldReduceMotion={!!shouldReduceMotion} />
      </motion.div>
    );
  }

  const showLetterbox = ["sfwindow", "clouds", "forest"].includes(phase);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, overflow: "hidden" }}>
      <AnimatePresence>
        {showLetterbox && <Letterbox key="lb" />}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: 1.5 }}
        whileHover={{ opacity: 1 }}
        onClick={() => setPhase("done")}
        style={{
          position: "fixed", top: 20, right: 20, zIndex: 10010,
          padding: "7px 18px", borderRadius: 20,
          background: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.22)",
          color: "rgba(255,255,255,0.82)", fontSize: 12, letterSpacing: "0.08em",
          cursor: "pointer", fontFamily: "var(--font-body)",
        }}
      >
        {LAB_COPY[language].skip}
      </motion.button>

      <AnimatePresence mode="sync">
        {phase === "recede" && (
          <motion.div key="recede" style={{ position: "absolute", inset: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <RecedeScene isDark={isDark} />
          </motion.div>
        )}
        {phase === "sfwindow" && (
          <motion.div key="sfwindow" style={{ position: "absolute", inset: 0 }}>
            <SFWindowScene />
          </motion.div>
        )}
        {phase === "clouds" && (
          <motion.div key="clouds" style={{ position: "absolute", inset: 0 }}>
            <CloudsScene />
          </motion.div>
        )}
        {phase === "forest" && (
          <motion.div key="forest" style={{ position: "absolute", inset: 0 }}>
            <ForestScene />
          </motion.div>
        )}
        {phase === "earth" && (
          <motion.div key="earth" style={{ position: "absolute", inset: 0 }}>
            <EarthScene />
          </motion.div>
        )}
        {phase === "dark" && (
          <motion.div key="dark" style={{ position: "absolute", inset: 0 }}>
            <DarkScene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
