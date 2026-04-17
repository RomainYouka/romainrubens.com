"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Phase state machine ─────────────────────────────────────────────────────
type Phase = "monitor" | "zoomout" | "clouds" | "glasses" | "lens" | "done";

// ─── Deterministic pseudo-random values (avoids SSR/hydration mismatch) ──────
const STARS = Array.from({ length: 60 }, (_, i) => ({
  left: `${((i * 17 + 13) % 97)}%`,
  top:  `${((i * 23 + 7)  % 94)}%`,
  size: (i % 3) + 1,
  op:   0.25 + (i % 6) * 0.09,
}));

const CLOUD_CONFIGS = [
  { left: "3%",   top: "28%", w: "38vw", h: "20vw", blur: 36, spd: 3.2, del: 0.0, op: 0.88 },
  { left: "30%",  top: "58%", w: "30vw", h: "16vw", blur: 28, spd: 2.7, del: 0.6, op: 0.82 },
  { left: "54%",  top: "16%", w: "44vw", h: "24vw", blur: 42, spd: 3.9, del: 1.0, op: 0.92 },
  { left: "70%",  top: "52%", w: "34vw", h: "18vw", blur: 32, spd: 3.1, del: 0.3, op: 0.86 },
  { left: "-8%",  top: "44%", w: "48vw", h: "26vw", blur: 46, spd: 4.3, del: 0.8, op: 0.78 },
  { left: "14%",  top: "76%", w: "26vw", h: "14vw", blur: 22, spd: 2.4, del: 1.3, op: 0.90 },
  { left: "76%",  top: "78%", w: "38vw", h: "20vw", blur: 34, spd: 3.6, del: 0.4, op: 0.84 },
  { left: "42%",  top: "36%", w: "52vw", h: "28vw", blur: 50, spd: 4.8, del: 0.2, op: 0.70 },
];

// ─── Monitor Scene ───────────────────────────────────────────────────────────
function MonitorScene({ phase }: { phase: Phase }) {
  const isZooming = phase === "zoomout";

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 50% 60%, #0d1025 0%, #080812 60%, #04040a 100%)",
      perspective: "1400px", perspectiveOrigin: "50% 50%",
      overflow: "hidden",
    }}>
      {/* Room grid floor */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }}>
        <defs>
          <pattern id="lab-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4466ff" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lab-grid)" />
      </svg>

      {/* Desk glow strip */}
      <div style={{
        position: "absolute", bottom: "18%", left: "50%", transform: "translateX(-50%)",
        width: "65%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(49,77,203,0.4) 20%, rgba(80,120,255,0.7) 50%, rgba(49,77,203,0.4) 80%, transparent)",
        boxShadow: "0 0 40px 8px rgba(49,77,203,0.18)",
      }} />

      {/* Monitor + peripherals container */}
      <motion.div
        animate={isZooming ? {
          scale: [1, 0.92, 0.55, 0.18, 0.04],
          y: [0, -8, -30, -120, -300],
          rotateX: [0, 3, 12, 28, 45],
          opacity: [1, 1, 1, 0.7, 0],
        } : { scale: 1, y: 0, rotateX: 0, opacity: 1 }}
        transition={{ duration: isZooming ? 1.1 : 0, ease: [0.4, 0, 0.3, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", transformStyle: "preserve-3d" }}
      >
        {/* Monitor body */}
        <div style={{
          width: "clamp(320px, 58vw, 680px)",
          height: "clamp(200px, 36vw, 430px)",
          background: "linear-gradient(160deg, #1c1c2c 0%, #141420 100%)",
          borderRadius: "10px 10px 3px 3px",
          border: "2px solid #252535",
          boxShadow: "0 0 80px rgba(49,77,203,0.12), inset 0 0 40px rgba(0,0,0,0.6), 0 30px 60px rgba(0,0,0,0.7)",
          overflow: "hidden", position: "relative",
        }}>
          {/* Screen inner glow */}
          <div style={{
            position: "absolute", inset: 0,
            boxShadow: "inset 0 0 30px rgba(49,77,203,0.08)",
            pointerEvents: "none", zIndex: 10, borderRadius: 8,
          }} />

          {/* Browser chrome */}
          <div style={{
            height: 30, background: "#0e0e1a",
            display: "flex", alignItems: "center",
            paddingLeft: 12, gap: 6,
            borderBottom: "1px solid #252535",
          }}>
            {[["#ff5f57","#e04040"],["#febc2e","#d0960e"],["#28c840","#1a9e30"]].map(([bg], i) => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: bg, boxShadow: `0 0 4px ${bg}44` }} />
            ))}
            {/* URL bar */}
            <div style={{
              marginLeft: 18, width: "clamp(100px, 24%, 220px)", height: 16,
              borderRadius: 8, background: "#191928",
              border: "1px solid #2a2a3a",
              display: "flex", alignItems: "center", paddingLeft: 8, gap: 4,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840", opacity: 0.8 }} />
              <span style={{ fontSize: 9, color: "#7788aa", fontFamily: "monospace", letterSpacing: "0.03em" }}>
                romainrubens.com
              </span>
            </div>
            {/* Tabs */}
            <div style={{ marginLeft: 12, display: "flex", gap: 4 }}>
              {[80, 60, 50].map((w, i) => (
                <div key={i} style={{
                  width: w, height: 18, borderRadius: "4px 4px 0 0",
                  background: i === 0 ? "#1a1a2e" : "transparent",
                  border: i === 0 ? "1px solid #252535" : "none",
                  display: "flex", alignItems: "center", paddingLeft: 6,
                }}>
                  <div style={{ width: w - 16, height: 4, borderRadius: 2, background: i === 0 ? "#3a3a5a" : "#222235", opacity: 0.7 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Page content — simplified site */}
          <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)", height: "calc(100% - 30px)", overflow: "hidden", position: "relative" }}>
            {/* Nav */}
            <div style={{
              height: 26, background: "rgba(255,255,255,0.96)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center",
              paddingLeft: 14, paddingRight: 14, gap: 0,
            }}>
              <div style={{ width: 12, height: 9, background: "var(--theme-accent)", borderRadius: 2, transform: "rotate(12deg)", marginRight: 10, opacity: 0.9 }} />
              <div style={{ display: "flex", gap: 16, flex: 1 }}>
                {[28, 22, 28, 24].map((w, i) => (
                  <div key={i} style={{ width: w, height: 4, background: "#ccc", borderRadius: 2 }} />
                ))}
              </div>
              <div style={{ width: 28, height: 12, background: "var(--theme-accent)", borderRadius: 6, marginLeft: "auto" }} />
            </div>

            {/* Hero blobs + text */}
            <div style={{ position: "relative", height: "55%", overflow: "hidden" }}>
              {[
                { l: "4%",  t: "5%",  w: 80,  h: 60,  op: 0.14 },
                { l: "22%", t: "-3%", w: 65,  h: 48,  op: 0.11 },
                { l: "42%", t: "12%", w: 90,  h: 66,  op: 0.16 },
                { l: "62%", t: "2%",  w: 70,  h: 52,  op: 0.13 },
                { l: "78%", t: "18%", w: 100, h: 74,  op: 0.10 },
                { l: "-2%", t: "45%", w: 110, h: 80,  op: 0.09 },
                { l: "88%", t: "38%", w: 85,  h: 63,  op: 0.12 },
              ].map((b, i) => (
                <div key={i} style={{
                  position: "absolute", left: b.l, top: b.t,
                  width: b.w, height: b.h,
                  borderRadius: "50%", opacity: b.op,
                  background: "var(--theme-accent)",
                  filter: "blur(22px)",
                }} />
              ))}
              {/* Centered text placeholder */}
              <div style={{
                position: "absolute", bottom: "20%", left: "50%",
                transform: "translateX(-50%)", width: "60%", textAlign: "center",
              }}>
                <div style={{ width: "90%", height: 12, background: "#1d1d1f", borderRadius: 4, margin: "0 auto 6px", opacity: 0.85 }} />
                <div style={{ width: "60%", height: 8,  background: "#bbb",    borderRadius: 3, margin: "0 auto 4px" }} />
                <div style={{ width: "40%", height: 8,  background: "#bbb",    borderRadius: 3, margin: "0 auto" }} />
              </div>
            </div>

            {/* Card grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)",
              gap: 6, padding: "8px 12px",
            }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  height: 32, background: "#f0f0f3",
                  borderRadius: 6, border: "1px solid rgba(0,0,0,0.05)",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Monitor stand + base */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: 38, height: 28,
            background: "linear-gradient(180deg, #1c1c2c, #252530)",
            clipPath: "polygon(22% 0%,78% 0%,100% 100%,0% 100%)",
          }} />
          <div style={{ width: 110, height: 5, background: "#1a1a28", borderRadius: "0 0 18px 18px" }} />
        </div>

        {/* Keyboard */}
        <div style={{
          marginTop: 12,
          width: "clamp(270px, 48vw, 560px)",
          height: 18,
          background: "#0f0f1c",
          borderRadius: 5,
          border: "1px solid #1e1e2e",
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: 2, padding: "0 8px",
        }}>
          {Array.from({ length: 26 }, (_, i) => (
            <div key={i} style={{
              width: i === 12 ? 36 : 11,
              height: 9,
              background: "#1a1a2c",
              borderRadius: 2,
              boxShadow: "0 1px 0 #0a0a14",
            }} />
          ))}
        </div>

        {/* Mouse */}
        <div style={{
          position: "absolute",
          right: "calc(50% - clamp(155px, 29vw, 330px))",
          bottom: -12,
          width: 18, height: 26,
          background: "#111120",
          borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
          border: "1px solid #222235",
        }}>
          <div style={{ position: "absolute", top: 5, left: "50%", transform: "translateX(-50%)", width: 1, height: 9, background: "#252540" }} />
        </div>
      </motion.div>

      {/* Launch flash — white burst when zooming */}
      {isZooming && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.9, 0] }}
          transition={{ duration: 1.1, times: [0, 0.7, 0.85, 1] }}
          style={{ position: "absolute", inset: 0, background: "white", pointerEvents: "none" }}
        />
      )}
    </div>
  );
}

// ─── Clouds Scene ────────────────────────────────────────────────────────────
function CloudsScene({ phase }: { phase: Phase }) {
  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden",
      background: "linear-gradient(180deg, #06080f 0%, #0d1638 15%, #1a4090 40%, #4a80d0 65%, #90bce8 85%, #d8eef8 100%)",
    }}>
      {/* Speed lines */}
      {Array.from({ length: 14 }, (_, i) => (
        <motion.div
          key={i}
          animate={{ y: ["-10vh", "115vh"], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 0.6 + (i % 5) * 0.12,
            delay: (i * 0.18) % 1.4,
            repeat: Infinity, ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${4 + i * 6.5}%`,
            top: 0,
            width: 1.5,
            height: `${15 + (i % 4) * 10}vh`,
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.55), transparent)",
            borderRadius: 1,
          }}
        />
      ))}

      {/* Clouds */}
      {CLOUD_CONFIGS.map((c, i) => (
        <motion.div
          key={i}
          animate={{ y: ["120vh", "-60vh"], opacity: [0, c.op, c.op, 0] }}
          transition={{
            duration: c.spd,
            delay: c.del,
            repeat: Infinity,
            ease: "linear",
            opacity: { times: [0, 0.1, 0.85, 1] },
          }}
          style={{
            position: "absolute",
            left: c.left,
            width: c.w, height: c.h,
            borderRadius: "50% 45% 55% 48% / 42% 52% 48% 58%",
            background: "white",
            filter: `blur(${c.blur}px)`,
          }}
        />
      ))}

      {/* Altitude indicator — subtle fade to space */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "35%",
        background: "linear-gradient(180deg, rgba(4,5,12,0.95) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── Glasses Scene ───────────────────────────────────────────────────────────
function GlassesScene({ phase }: { phase: Phase }) {
  const isApproaching = phase === "glasses";
  const isEntering    = phase === "lens";

  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 50% 40%, #0d1638 0%, #080a18 55%, #030408 100%)",
    }}>
      {/* Stars */}
      {STARS.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: s.left, top: s.top,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "white", opacity: s.op,
        }} />
      ))}

      {/* Ambient space glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw", height: "60vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(49,77,203,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Glasses */}
      <motion.div
        animate={
          isApproaching ? { scale: [0.04, 0.12, 0.32, 0.72, 1.0], opacity: [0, 0.7, 1, 1, 1] } :
          isEntering    ? { scale: [1.0, 1.6], opacity: [1, 0.3] } :
                          { scale: 0.04, opacity: 0 }
        }
        transition={{
          duration: isApproaching ? 1.8 : isEntering ? 0.85 : 0,
          ease: isApproaching ? [0.16, 1, 0.3, 1] : [0.55, 0, 1, 0.45],
        }}
        style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <svg
          viewBox="0 0 620 230"
          style={{ width: "min(88vw, 740px)", height: "auto" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="g-lens-l" cx="38%" cy="32%" r="65%">
              <stop offset="0%"   stopColor="#1e2e60" stopOpacity="0.95" />
              <stop offset="55%"  stopColor="#0a1230" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#040810" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="g-lens-r" cx="38%" cy="32%" r="65%">
              <stop offset="0%"   stopColor="#1e2e60" stopOpacity="0.95" />
              <stop offset="55%"  stopColor="#0a1230" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#040810" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="g-glow-l" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="#314DCB" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#314DCB" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g-glow-r" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="#314DCB" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#314DCB" stopOpacity="0" />
            </radialGradient>
            <filter id="f-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="f-frame" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Ambient lens glow */}
          <ellipse cx="157" cy="115" rx="125" ry="96"  fill="url(#g-glow-l)" />
          <ellipse cx="463" cy="115" rx="125" ry="96"  fill="url(#g-glow-r)" />

          {/* Lens glass fill */}
          <ellipse cx="157" cy="115" rx="120" ry="92"  fill="url(#g-lens-l)" />
          <ellipse cx="463" cy="115" rx="120" ry="92"  fill="url(#g-lens-r)" />

          {/* Outer frame */}
          <ellipse cx="157" cy="115" rx="122" ry="94"  stroke="#2c3660" strokeWidth="3" fill="none" filter="url(#f-frame)" />
          <ellipse cx="463" cy="115" rx="122" ry="94"  stroke="#2c3660" strokeWidth="3" fill="none" filter="url(#f-frame)" />

          {/* Inner rim */}
          <ellipse cx="157" cy="115" rx="120" ry="92"  stroke="#5a6898" strokeWidth="1" fill="none" />
          <ellipse cx="463" cy="115" rx="120" ry="92"  stroke="#5a6898" strokeWidth="1" fill="none" />

          {/* Bridge */}
          <path d="M 277 104 C 294 90 326 90 343 104" stroke="#3a4470" strokeWidth="3.5" fill="none" strokeLinecap="round" filter="url(#f-frame)" />
          <path d="M 277 104 C 294 90 326 90 343 104" stroke="#8090c0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Nose pad */}
          <rect x="288" y="112" width="44" height="7" rx="3.5" fill="#252840" stroke="#3a4060" strokeWidth="0.5" />

          {/* Left temple */}
          <path d="M 37 105 L -8 92"  stroke="#2c3660" strokeWidth="5"   strokeLinecap="round" />
          <path d="M 37 105 L -8 92"  stroke="#7080a8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Right temple */}
          <path d="M 583 105 L 628 92" stroke="#2c3660" strokeWidth="5"   strokeLinecap="round" />
          <path d="M 583 105 L 628 92" stroke="#7080a8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Left lens AR HUD */}
          <g opacity="0.5">
            <rect  x="92"  y="82"  width="56" height="5"  rx="2.5" fill="#4466ee" />
            <rect  x="92"  y="93"  width="36" height="3.5" rx="1.8" fill="#6688ff" opacity="0.7" />
            <rect  x="92"  y="102" width="46" height="3.5" rx="1.8" fill="#6688ff" opacity="0.7" />
            <circle cx="204" cy="138" r="20" stroke="#4466ee" strokeWidth="1.2" fill="none" />
            <circle cx="204" cy="138" r="13" stroke="#4466ee" strokeWidth="0.6" fill="none" opacity="0.6" />
            <circle cx="204" cy="138" r="4"  fill="#4466ee" opacity="0.4" />
            <line x1="184" y1="138" x2="224" y2="138" stroke="#4466ee" strokeWidth="0.5" opacity="0.4" />
            <line x1="204" y1="118" x2="204" y2="158" stroke="#4466ee" strokeWidth="0.5" opacity="0.4" />
          </g>

          {/* Right lens AR HUD */}
          <g opacity="0.5">
            <rect  x="398" y="82"  width="56" height="5"  rx="2.5" fill="#4466ee" />
            <rect  x="398" y="93"  width="36" height="3.5" rx="1.8" fill="#6688ff" opacity="0.7" />
            <rect  x="398" y="102" width="46" height="3.5" rx="1.8" fill="#6688ff" opacity="0.7" />
            <circle cx="510" cy="138" r="20" stroke="#4466ee" strokeWidth="1.2" fill="none" />
            <circle cx="510" cy="138" r="13" stroke="#4466ee" strokeWidth="0.6" fill="none" opacity="0.6" />
            <circle cx="510" cy="138" r="4"  fill="#4466ee" opacity="0.4" />
            <line x1="490" y1="138" x2="530" y2="138" stroke="#4466ee" strokeWidth="0.5" opacity="0.4" />
            <line x1="510" y1="118" x2="510" y2="158" stroke="#4466ee" strokeWidth="0.5" opacity="0.4" />
          </g>

          {/* Lens specular reflections */}
          <ellipse cx="118" cy="84"  rx="28" ry="12" fill="rgba(255,255,255,0.055)" transform="rotate(-18,118,84)"  />
          <ellipse cx="424" cy="84"  rx="28" ry="12" fill="rgba(255,255,255,0.055)" transform="rotate(-18,424,84)"  />
        </svg>

        {/* Label */}
        <motion.p
          animate={isApproaching ? { opacity: [0, 0, 0.65], y: [8, 8, 0] } : { opacity: 0 }}
          transition={{ duration: 1.8, times: [0, 0.65, 1] }}
          style={{
            marginTop: 14, color: "rgba(140,165,220,0.75)",
            fontSize: 11, letterSpacing: "0.3em",
            fontFamily: "monospace", textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          RR Lab — AR Interface v0.1
        </motion.p>
      </motion.div>

      {/* Lens portal reveal — expanding circle from right lens center */}
      {isEntering && (
        <motion.div
          initial={{ clipPath: "circle(0% at 75% 50%)" }}
          animate={{ clipPath: "circle(140% at 75% 50%)" }}
          transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 75% 50%, #0a1228 0%, #040810 60%)",
          }}
        />
      )}
    </div>
  );
}

// ─── Experiment cards ────────────────────────────────────────────────────────
const EXPERIMENTS = [
  {
    id: "chromatic", status: "WIP",     title: "Chromatic Engine",
    desc: "Générateur de palettes adaptatif basé sur la luminosité ambiante et les préférences perceptuelles.",
    hue: "var(--theme-accent)",
  },
  {
    id: "typo",      status: "BIENTÔT", title: "Typo Lab",
    desc: "Variables de fonte réactives à la vitesse de lecture et au contexte émotionnel du contenu.",
    hue: "#B2003A",
  },
  {
    id: "motion",    status: "CONCEPT", title: "Motion Catalog",
    desc: "200+ microinteractions catégorisées par intention, friction et vitesse de décodage.",
    hue: "#004430",
  },
  {
    id: "spatial",   status: "WIP",     title: "Spatial UI",
    desc: "Composants interface optimisés pour la réalité augmentée et les surfaces 3D.",
    hue: "#6030C0",
  },
  {
    id: "neural",    status: "BIENTÔT", title: "Neural Aesthetics",
    desc: "Génération de compositions à partir de contraintes sémantiques et de vision artificielle.",
    hue: "#B24400",
  },
  {
    id: "sound",     status: "CONCEPT", title: "Sound Design",
    desc: "Le son comme couche de feedback. Expériences audio-visuelles synchronisées au centième.",
    hue: "#8800A8",
  },
] as const;

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  "WIP":     { color: "var(--theme-accent)",  bg: "rgba(49,77,203,0.1)"  },
  "BIENTÔT": { color: "#febc2e",              bg: "rgba(254,188,46,0.1)" },
  "CONCEPT": { color: "#86868b",              bg: "rgba(134,134,139,0.1)" },
};

function ExperimentCard({ exp, index, isDark }: {
  exp: typeof EXPERIMENTS[number];
  index: number;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const s = STATUS_STYLE[exp.status] ?? STATUS_STYLE["CONCEPT"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 28px 24px",
        borderRadius: 20,
        background: isDark ? "#343434" : "#ffffff",
        border: `1px solid ${isDark ? "#616161" : "rgba(0,0,0,0.07)"}`,
        cursor: "default",
        transform: hovered ? "translateY(-5px)" : "translateY(0px)",
        boxShadow: hovered
          ? isDark ? "0 20px 48px rgba(0,0,0,0.45)" : "0 14px 36px rgba(0,0,0,0.10)"
          : "none",
        transition: "transform 220ms ease, box-shadow 220ms ease",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", top: -50, right: -50,
        width: 140, height: 140, borderRadius: "50%",
        background: exp.hue, opacity: hovered ? 0.13 : 0.05,
        filter: "blur(40px)", pointerEvents: "none",
        transition: "opacity 300ms ease",
      }} />

      {/* Status badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "4px 10px", borderRadius: 12, marginBottom: 14,
        background: s.bg,
        border: `1px solid ${s.color}28`,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color }} />
        <span style={{
          fontSize: 9, fontWeight: 700,
          letterSpacing: "0.14em", color: s.color,
          fontFamily: "var(--font-body)", textTransform: "uppercase",
        }}>
          {exp.status}
        </span>
      </div>

      <h3 style={{
        fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em",
        margin: "0 0 8px", color: "var(--theme-fg)",
      }}>
        {exp.title}
      </h3>

      <p style={{
        fontSize: 13.5, color: "var(--theme-muted)",
        lineHeight: 1.6, margin: 0,
      }}>
        {exp.desc}
      </p>

      {/* Bottom color bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2.5,
        background: exp.hue,
        opacity: hovered ? 0.85 : 0,
        transition: "opacity 220ms ease",
        borderRadius: "0 0 20px 20px",
      }} />
    </motion.div>
  );
}

// ─── Lab page content ────────────────────────────────────────────────────────
function LabContent() {
  const { isDark } = useTheme();

  return (
    <div id="main-content" style={{
      minHeight: "100vh",
      background: "var(--theme-bg)",
      color: "var(--theme-fg)",
      fontFamily: "var(--font-body)",
    }}>
      {/* Hero */}
      <div style={{ padding: "clamp(96px, 14vw, 140px) 32px 64px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px", borderRadius: 20, marginBottom: 22,
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)"}`,
        }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--theme-accent)",
              boxShadow: "0 0 6px var(--theme-accent)",
            }}
          />
          <span style={{
            fontSize: 10.5, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--theme-muted)",
            fontWeight: 600,
          }}>
            Espace expérimental
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(52px, 9vw, 104px)",
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 0.95,
          margin: "0 0 24px",
        }}>
          Lab<span style={{ color: "var(--theme-accent)" }}>.</span>
        </h1>

        <p style={{
          fontSize: "clamp(15px, 1.8vw, 18px)",
          color: "var(--theme-muted)",
          maxWidth: 480, lineHeight: 1.65,
          margin: 0,
        }}>
          Territoire d'expérimentation. Des prototypes, des systèmes en construction,
          et des questions sans réponse — encore.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        padding: "0 32px 120px",
        maxWidth: 1200, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 20,
      }}>
        {EXPERIMENTS.map((exp, i) => (
          <ExperimentCard key={exp.id} exp={exp} index={i} isDark={isDark} />
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        textAlign: "center", paddingBottom: 60,
        fontSize: 12, color: "var(--theme-muted)",
        letterSpacing: "0.05em",
      }}>
        D'autres expérimentations arrivent.
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function LabPage() {
  const [phase, setPhase] = useState<Phase>("monitor");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("zoomout"),  900),
      setTimeout(() => setPhase("clouds"),   2100),
      setTimeout(() => setPhase("glasses"),  4500),
      setTimeout(() => setPhase("lens"),     6100),
      setTimeout(() => setPhase("done"),     7100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "done") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1 }}>
        <LabContent />
      </motion.div>
    );
  }

  return (
    <>
      {/* Full-screen animation overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 10000, overflow: "hidden" }}>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 1.6 }}
          whileHover={{ opacity: 1 }}
          onClick={() => setPhase("done")}
          style={{
            position: "fixed", top: 20, right: 20, zIndex: 10010,
            padding: "7px 18px", borderRadius: 20,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.85)",
            fontSize: 12, letterSpacing: "0.06em",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            fontFamily: "var(--font-body)",
          }}
        >
          Passer
        </motion.button>

        {/* Phase: monitor */}
        <AnimatePresence>
          {(phase === "monitor" || phase === "zoomout") && (
            <motion.div
              key="monitor"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MonitorScene phase={phase} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase: clouds */}
        <AnimatePresence>
          {phase === "clouds" && (
            <motion.div
              key="clouds"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0, y: "60%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <CloudsScene phase={phase} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase: glasses + lens */}
        <AnimatePresence>
          {(phase === "glasses" || phase === "lens") && (
            <motion.div
              key="glasses"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassesScene phase={phase} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
