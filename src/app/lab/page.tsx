"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type Phase = "recede" | "imac" | "sky" | "sf" | "window" | "cowork" | "done";

const STARS = Array.from({ length: 110 }, (_, i) => ({
  x: ((i * 7919 + 1327) % 9973) / 9973 * 100,
  y: ((i * 6271 + 2341) % 9967) / 9967 * 100,
  r: 0.6 + (i % 4) * 0.45,
  op: 0.2 + (i % 7) * 0.1,
  tw: 1 + (i % 4) * 0.65,
}));

const CLOUDS = [
  { x: 4,  y: 12, w: 340, blur: 48, op: 0.92 },
  { x: 28, y: 44, w: 260, blur: 36, op: 0.85 },
  { x: 55, y: 8,  w: 400, blur: 60, op: 0.88 },
  { x: 70, y: 58, w: 300, blur: 42, op: 0.80 },
  { x: -6, y: 52, w: 440, blur: 64, op: 0.75 },
  { x: 42, y: 70, w: 220, blur: 30, op: 0.90 },
  { x: 15, y: 28, w: 380, blur: 52, op: 0.84 },
];

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
            {[0,1,2].map(i => <div key={i} style={{ height: 110, borderRadius: 10, background: isDark ? "#242424" : "#efefef" }} />)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Scene 2: iMac on desk ────────────────────────────────────────────────────
function IMacDeskScene({ isLeaving, isDark }: { isLeaving: boolean; isDark: boolean }) {
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        background: isDark
          ? "radial-gradient(ellipse at 50% 95%, #0c0c15 0%, #050508 100%)"
          : "radial-gradient(ellipse at 50% 95%, #e0e0ec 0%, #ccccd8 100%)",
        overflow: "hidden",
      }}
      animate={isLeaving ? { y: [0, 50], scale: [1, 0.88], opacity: [1, 0] } : {}}
      transition={{ duration: 1.0, ease: [0.4, 0, 1, 1] }}
    >
      {/* Ceiling/wall */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "50%",
        background: isDark
          ? "linear-gradient(180deg, #040408 0%, #0c0c15 100%)"
          : "linear-gradient(180deg, #d8d8e8 0%, #e0e0ec 100%)",
      }} />
      {/* Window light glow */}
      <div style={{
        position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
        width: "28vw", height: "38vh",
        background: `radial-gradient(ellipse at 50% 20%, ${isDark ? "rgba(50,90,200,0.18)" : "rgba(160,200,255,0.45)"} 0%, transparent 70%)`,
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      {/* Desk */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
        background: isDark
          ? "linear-gradient(180deg, #191920 0%, #0e0e14 100%)"
          : "linear-gradient(180deg, #c8bfae 0%, #a8a090 100%)",
        borderTop: `1px solid ${isDark ? "#252530" : "#b8b0a0"}`,
      }} />
      {/* Screen glow on desk */}
      <div style={{
        position: "absolute", bottom: "33%", left: "50%", transform: "translateX(-50%)",
        width: "min(480px, 52vw)", height: 28,
        background: `radial-gradient(ellipse, ${isDark ? "rgba(60,100,255,0.28)" : "rgba(49,77,203,0.16)"} 0%, transparent 80%)`,
        filter: "blur(14px)", pointerEvents: "none",
      }} />

      {/* iMac */}
      <motion.div
        initial={{ opacity: 0, y: 55, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        style={{ position: "absolute", bottom: "29%", left: "50%", transform: "translateX(-50%)" }}
      >
        <svg viewBox="0 0 560 330" style={{ width: "min(500px, 52vw)", display: "block", filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.6))" }}>
          <defs>
            <linearGradient id="if" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#ccccd2" : "#e8e8ee"} />
              <stop offset="100%" stopColor={isDark ? "#a8a8b0" : "#c8c8d0"} />
            </linearGradient>
            <linearGradient id="isbg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={isDark ? "#141428" : "#dde0f4"} />
              <stop offset="100%" stopColor={isDark ? "#08081a" : "#c8cee8"} />
            </linearGradient>
            <linearGradient id="ich" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#b0b0b8" : "#ccccD4"} />
              <stop offset="100%" stopColor={isDark ? "#989898" : "#bcbcc4"} />
            </linearGradient>
            <linearGradient id="ist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#b0b0b8" : "#d0d0d8"} />
              <stop offset="100%" stopColor={isDark ? "#808088" : "#b0b0b8"} />
            </linearGradient>
          </defs>
          {/* Body */}
          <rect x="12" y="10" width="536" height="260" rx="14" fill="url(#if)" />
          <rect x="17" y="14" width="526" height="253" rx="11" fill="#080810" />
          {/* Screen */}
          <rect x="18" y="15" width="524" height="232" rx="10" fill="url(#isbg)" />
          {/* Nav bar */}
          <rect x="22" y="18" width="516" height="20" rx="0" fill={isDark ? "rgba(18,18,35,0.9)" : "rgba(240,242,255,0.9)"} />
          <rect x="168" y="21" width="224" height="13" rx="6.5" fill={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} />
          <text x="280" y="31" textAnchor="middle" fontSize="6" fill={isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.28)"} fontFamily="-apple-system,sans-serif">romainrubens.com/lab</text>
          {/* Content */}
          <rect x="28" y="48" width="95" height="7" rx="3.5" fill={isDark ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.09)"} />
          <rect x="28" y="62" width="210" height="52" rx="7" fill={isDark ? "rgba(80,120,255,0.16)" : "rgba(49,77,203,0.1)"} />
          <rect x="252" y="62" width="130" height="52" rx="7" fill={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} />
          <rect x="396" y="62" width="146" height="52" rx="7" fill={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} />
          <rect x="28" y="128" width="48" height="5" rx="2.5" fill={isDark ? "rgba(80,120,255,0.5)" : "rgba(49,77,203,0.4)"} />
          {[0,1,2,3].map(i => <rect key={i} x={28} y={140 + i * 12} width={420 + (i%2)*36} height={5} rx="2.5" fill={isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"} />)}
          {[0,1,2].map(i => <rect key={i} x={28 + i * 180} y="190" width="168" height="44" rx="6" fill={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} />)}
          {/* Chin */}
          <rect x="12" y="256" width="536" height="34" rx="0" fill="url(#ich)" />
          <rect x="12" y="282" width="536" height="8" rx="0 0 10 10" fill={isDark ? "#8a8a94" : "#b4b4bc"} />
          {/* Stand */}
          <rect x="242" y="290" width="76" height="22" rx="4" fill="url(#ist)" />
          <ellipse cx="280" cy="320" rx="138" ry="11" fill={isDark ? "#7a7a82" : "#a8a8b0"} />
          <ellipse cx="280" cy="316" rx="134" ry="8" fill={isDark ? "#9898a0" : "#bebec6"} />
        </svg>
      </motion.div>

      {/* Keyboard */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ delay: 0.7, duration: 0.6 }}
        style={{
          position: "absolute", bottom: "16%", left: "50%", transform: "translateX(-50%)",
          width: "min(250px, 26vw)", height: 9, borderRadius: 4,
          background: isDark ? "#282832" : "#e0e0e8",
          boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.1)",
        }}
      />
      {/* Mouse */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ delay: 0.85, duration: 0.6 }}
        style={{
          position: "absolute", bottom: "13%",
          left: "calc(50% + min(145px, 15vw))",
          width: "min(42px, 4.5vw)", height: "min(58px, 6.5vw)",
          borderRadius: 22,
          background: isDark ? "#282830" : "#e4e4ec",
          boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.4)" : "0 2px 6px rgba(0,0,0,0.1)",
        }}
      />
    </motion.div>
  );
}

// ─── Scene 3: Sky / clouds ────────────────────────────────────────────────────
function SkyScene({ isLeaving, isDark }: { isLeaving: boolean; isDark: boolean }) {
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        background: isDark
          ? "linear-gradient(180deg, #020208 0%, #090918 100%)"
          : "linear-gradient(180deg, #2a5cc8 0%, #5a90e8 50%, #80b8f8 100%)",
        overflow: "hidden",
      }}
      animate={isLeaving ? { scale: [1, 1.25], y: [0, -60], opacity: [1, 0] } : {}}
      transition={{ duration: 0.9, ease: [0.4, 0, 1, 1] }}
    >
      {/* Stars - night */}
      {isDark && STARS.map((s, i) => (
        <motion.div key={i} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.r * 2, height: s.r * 2, borderRadius: "50%",
          background: "#ffffff", opacity: s.op,
        }}
          animate={{ opacity: [s.op, s.op * 0.25, s.op] }}
          transition={{ duration: s.tw, repeat: Infinity, ease: "easeInOut", delay: (i * 0.04) % 2.5 }}
        />
      ))}
      {/* Moon */}
      {isDark && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            position: "absolute", top: "10%", right: "14%",
            width: 64, height: 64, borderRadius: "50%",
            background: "radial-gradient(circle at 32% 32%, #f5f5e0, #d8d8b0)",
            boxShadow: "0 0 50px rgba(220,220,160,0.45), 0 0 90px rgba(180,180,120,0.2)",
          }}
        />
      )}
      {/* Sun haze - day */}
      {!isDark && (
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", height: "45%",
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,240,180,0.65) 0%, transparent 70%)",
        }} />
      )}
      {/* Clouds rushing upward */}
      {CLOUDS.map((c, i) => (
        <motion.div key={i}
          style={{
            position: "absolute",
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.w, height: c.w * 0.44,
            borderRadius: "50%",
            background: isDark ? `rgba(160,170,210,${c.op * 0.2})` : `rgba(255,255,255,${c.op})`,
            filter: `blur(${c.blur}px)`,
          }}
          animate={{ y: [0, -140 - i * 18], x: [0, (i % 2 === 0 ? -1 : 1) * 24] }}
          transition={{ duration: 2.0, ease: "easeIn", repeat: Infinity, repeatType: "loop", delay: i * 0.2 }}
        />
      ))}
      {/* Speed lines */}
      {Array.from({ length: 16 }, (_, i) => (
        <motion.div key={i}
          style={{
            position: "absolute",
            left: `${((i * 7 + 3) % 94)}%`, top: 0,
            width: 1, height: "100%",
            background: isDark
              ? "linear-gradient(180deg, transparent 0%, rgba(160,180,255,0.18) 50%, transparent 100%)"
              : "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
          }}
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 0.7 + (i % 4) * 0.14, repeat: Infinity, ease: "linear", delay: i * 0.07 }}
        />
      ))}
    </motion.div>
  );
}

// ─── Scene 4: San Francisco ───────────────────────────────────────────────────
function SFScene({ isLeaving, isDark }: { isLeaving: boolean; isDark: boolean }) {
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        background: isDark
          ? "linear-gradient(180deg, #03040e 0%, #080d1c 55%, #0d1020 100%)"
          : "linear-gradient(180deg, #3a6ace 0%, #6898e0 55%, #7aA8c8 100%)",
        overflow: "hidden",
      }}
      animate={isLeaving ? { scale: [1, 1.5], opacity: [1, 0] } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 1, 1] }}
    >
      {/* Stars at night */}
      {isDark && STARS.slice(0, 65).map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y * 0.55}%`,
          width: s.r * 1.4, height: s.r * 1.4,
          borderRadius: "50%", background: "#fff", opacity: s.op * 0.65,
        }} />
      ))}
      {/* Bay water */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "20%",
        background: isDark
          ? "linear-gradient(180deg, #080c18 0%, #04060e 100%)"
          : "linear-gradient(180deg, #4868a0 0%, #2a4070 100%)",
      }} />
      {/* Reflections in water */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "18%",
        background: isDark
          ? "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)"
          : "repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(255,255,255,0.07) 4px, rgba(255,255,255,0.07) 5px)",
      }} />

      {/* SF Skyline */}
      <motion.svg
        viewBox="0 0 1200 500"
        style={{ position: "absolute", bottom: "18%", width: "100%", height: "auto" }}
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1, scale: [1, 1.08] }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background buildings */}
        {[
          [20, 80, 140], [110, 60, 160], [180, 100, 120], [290, 80, 200],
          [860, 90, 150], [960, 70, 170], [1060, 110, 130], [1150, 60, 100],
        ].map(([x, w, h], i) => (
          <rect key={i} x={x} y={500 - h} width={w} height={h}
            fill={isDark ? `rgba(100,108,140,${0.45 + (i%3)*0.08})` : `rgba(140,155,180,${0.5 + (i%3)*0.08})`} />
        ))}
        {/* Mid buildings */}
        {[
          [380, 75, 180], [460, 80, 240], [700, 90, 210], [800, 65, 190],
        ].map(([x, w, h], i) => (
          <rect key={i} x={x} y={500 - h} width={w} height={h}
            fill={isDark ? `rgba(80,90,125,${0.55 + i*0.03})` : `rgba(120,140,168,${0.6 + i*0.03})`} />
        ))}
        {/* 555 California - stepped */}
        <rect x="548" y="220" width="110" height="280" fill={isDark ? "rgba(90,95,138,0.75)" : "rgba(110,125,158,0.72)"} />
        <rect x="558" y="180" width="90" height="40" fill={isDark ? "rgba(95,100,142,0.7)" : "rgba(115,130,162,0.68)"} />
        {/* Transamerica Pyramid */}
        <polygon points="668,500 768,500 718,162" fill={isDark ? "rgba(200,205,228,0.85)" : "rgba(200,210,225,0.88)"} />
        <rect x="706" y="212" width="10" height="80" fill={isDark ? "rgba(200,205,228,0.6)" : "rgba(200,210,225,0.6)"} />
        <rect x="718" y="212" width="10" height="80" fill={isDark ? "rgba(200,205,228,0.6)" : "rgba(200,210,225,0.6)"} />
        {/* Windows on pyramid */}
        {Array.from({ length: 14 }, (_, i) => {
          const row = Math.floor(i / 2);
          const col = i % 2;
          return <rect key={i} x={690 + col * 16} y={380 - row * 24} width={10} height={14}
            fill={isDark ? "rgba(255,240,160,0.65)" : "rgba(255,255,255,0.55)"} />;
        })}
        {/* Salesforce Tower - tallest, tapered */}
        <path d="M 780 500 L 860 500 L 856 350 L 835 140 L 820 130 L 805 140 L 784 350 Z"
          fill={isDark ? "rgba(160,175,220,0.88)" : "rgba(170,185,215,0.9)"} />
        <line x1="820" y1="130" x2="820" y2="95" stroke={isDark ? "rgba(160,175,220,0.7)" : "rgba(170,185,215,0.75)"} strokeWidth="4" />
        <circle cx="820" cy="94" r="4" fill={isDark ? "rgba(255,200,100,0.8)" : "rgba(255,200,100,0.6)"} />
        {/* Salesforce windows */}
        {Array.from({ length: 20 }, (_, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          return <rect key={i} x={790 + col * 14} y={420 - row * 50} width={10} height={20}
            fill={isDark ? "rgba(255,240,160,0.7)" : "rgba(255,255,255,0.6)"} />;
        })}
        {/* Bay Bridge hint (far right) */}
        <path d="M 1050 420 Q 1100 380 1150 420" stroke={isDark ? "rgba(140,150,190,0.5)" : "rgba(160,175,200,0.55)"} strokeWidth="3" fill="none" />
        <line x1="1100" y1="380" x2="1100" y2="500" stroke={isDark ? "rgba(140,150,190,0.4)" : "rgba(160,175,200,0.45)"} strokeWidth="2" />
        {/* Ground line */}
        <rect x="0" y="496" width="1200" height="4" fill={isDark ? "#08090f" : "#5070a0"} />
      </motion.svg>
    </motion.div>
  );
}

// ─── Scene 5: Glass window entry ──────────────────────────────────────────────
function WindowScene({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        background: isDark ? "#060810" : "#4070b8",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <motion.div
        style={{
          border: isDark ? "3px solid rgba(160,190,255,0.65)" : "3px solid rgba(255,255,255,0.82)",
          borderRadius: 5, overflow: "hidden", position: "relative",
          boxShadow: isDark
            ? "0 0 70px rgba(100,140,255,0.32), inset 0 0 40px rgba(80,120,255,0.1)"
            : "0 0 70px rgba(180,220,255,0.65), inset 0 0 40px rgba(200,230,255,0.25)",
        }}
        initial={{ width: "min(340px, 48vw)", height: "min(460px, 62vh)" }}
        animate={{ width: "220vw", height: "220vh", borderRadius: 0, borderWidth: 0, opacity: [1, 1, 0] }}
        transition={{ duration: 1.5, ease: [0.4, 0, 1, 1] }}
      >
        {/* Glass reflection */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(140deg, rgba(255,255,255,0.22) 0%, transparent 45%, rgba(255,255,255,0.08) 100%)",
        }} />
        {/* Interior behind glass */}
        <div style={{
          position: "absolute", inset: 0,
          background: isDark
            ? "radial-gradient(ellipse at 50% 85%, #141420 0%, #080810 100%)"
            : "radial-gradient(ellipse at 50% 85%, #f0f0fa 0%, #e0e0f0 100%)",
          opacity: 0.88,
        }} />
        {/* Frame dividers (curtain wall) */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 3,
          background: isDark ? "rgba(160,190,255,0.55)" : "rgba(255,255,255,0.75)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 3,
          background: isDark ? "rgba(160,190,255,0.55)" : "rgba(255,255,255,0.75)" }} />
        {/* Desk silhouette */}
        <div style={{
          position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
          width: "55%", height: 10,
          background: isDark ? "rgba(50,50,70,0.7)" : "rgba(160,155,145,0.7)",
          borderRadius: 3,
        }} />
      </motion.div>
      {/* Flash */}
      <motion.div
        style={{ position: "absolute", inset: 0, background: "#ffffff", pointerEvents: "none" }}
        animate={{ opacity: [0, 0, 0.9, 0] }}
        transition={{ duration: 1.5, times: [0, 0.62, 0.78, 1] }}
      />
    </motion.div>
  );
}

// ─── Scene 6: Coworking ───────────────────────────────────────────────────────
function CoworkScene({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        background: isDark
          ? "radial-gradient(ellipse at 50% 100%, #111118 0%, #070710 100%)"
          : "radial-gradient(ellipse at 50% 100%, #eaeaf4 0%, #d8d8e8 100%)",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Window wall with SF view */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "52%",
        display: "flex", gap: "2%", padding: "4% 4% 0",
        alignItems: "stretch",
      }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            flex: 1,
            border: isDark ? "1px solid rgba(100,130,200,0.22)" : "1px solid rgba(160,190,220,0.55)",
            background: isDark ? "rgba(30,40,90,0.14)" : "rgba(160,200,235,0.38)",
            borderRadius: 3, position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", bottom: "18%", left: 0, right: 0, height: "28%",
              background: isDark ? "rgba(70,80,120,0.35)" : "rgba(50,80,130,0.22)",
              clipPath: "polygon(0 40%, 12% 0%, 22% 55%, 38% 12%, 50% 0%, 62% 22%, 76% 8%, 88% 28%, 100% 18%, 100% 100%, 0 100%)",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "18%",
              background: isDark ? "rgba(10,15,30,0.6)" : "rgba(60,90,140,0.25)",
            }} />
          </div>
        ))}
      </div>
      {/* Ceiling */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "6%",
        background: isDark ? "#0c0c14" : "#d8d8e4",
      }} />
      {/* Desk */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "52%",
        background: isDark
          ? "linear-gradient(180deg, #1a1a24 0%, #10101a 100%)"
          : "linear-gradient(180deg, #ccc0ae 0%, #b0a898 100%)",
        borderTop: `1px solid ${isDark ? "#2a2a36" : "#b0a898"}`,
      }} />

      {/* MacBook */}
      <motion.div
        style={{ position: "absolute", bottom: "32%", left: "50%", transform: "translateX(-50%)" }}
        animate={{ scale: [1, 7], y: [0, 70] }}
        transition={{ duration: 1.9, ease: [0.4, 0, 1, 1], delay: 0.5 }}
      >
        <svg viewBox="0 0 400 240" style={{ width: "min(340px, 38vw)", display: "block", filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.55))" }}>
          <defs>
            <linearGradient id="mbl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#c8c8ce" : "#e0e0e8"} />
              <stop offset="100%" stopColor={isDark ? "#a0a0a8" : "#c0c0c8"} />
            </linearGradient>
            <linearGradient id="mbsbg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={isDark ? "#141428" : "#dde0f4"} />
              <stop offset="100%" stopColor={isDark ? "#08081a" : "#c8cee8"} />
            </linearGradient>
            <linearGradient id="mbb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#a8a8b0" : "#c8c8d0"} />
              <stop offset="100%" stopColor={isDark ? "#888890" : "#a0a0a8"} />
            </linearGradient>
          </defs>
          <rect x="8" y="4" width="384" height="216" rx="10" fill="url(#mbl)" />
          <rect x="12" y="8" width="376" height="209" rx="8" fill="#050508" />
          <rect x="13" y="9" width="374" height="207" rx="7" fill="url(#mbsbg)" />
          <rect x="17" y="12" width="366" height="18" rx="0" fill={isDark ? "rgba(18,18,35,0.9)" : "rgba(240,242,255,0.9)"} />
          <rect x="148" y="15" width="104" height="11" rx="5.5" fill={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} />
          <text x="200" y="23.5" textAnchor="middle" fontSize="5" fill={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.28)"} fontFamily="-apple-system,sans-serif">romainrubens.com/lab</text>
          <rect x="17" y="38" width="72" height="6" rx="3" fill={isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)"} />
          <text x="17" y="68" fontSize="18" fontWeight="900" fill={isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,20,0.88)"} fontFamily="system-ui,sans-serif">Lab.</text>
          {[0,1,2].map(i => <rect key={i} x={17 + i * 124} y="80" width="116" height="74" rx="6" fill={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} />)}
          <circle cx="200" cy="118" r="8" fill={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"} />
          <rect x="4" y="220" width="392" height="14" rx="3" fill="url(#mbb)" />
          <rect x="8" y="218" width="384" height="3" rx="1.5" fill={isDark ? "#505058" : "#888890"} />
        </svg>
      </motion.div>
      {/* Coffee cup */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          position: "absolute", bottom: "28%",
          left: "calc(50% + min(220px, 24vw))",
          width: 26, height: 30, borderRadius: "0 0 5px 5px",
          background: isDark ? "#252530" : "#ddd4c0",
          border: isDark ? "1px solid #353540" : "1px solid #c8c0b0",
        }}
      />
    </motion.div>
  );
}

// ─── Experiments ─────────────────────────────────────────────────────────────
const EXPERIMENTS = [
  { id: "chromatic", title: "Chromatic Engine", desc: "Systèmes de couleurs génératifs. Algorithmes, palettes, harmonie mathématique.", status: "WIP" as const, icon: "◉", no: "01" },
  { id: "typo",      title: "Typo Lab",         desc: "Expériences typographiques. Variation d'axes, display cinétique, rythme.", status: "WIP" as const, icon: "Aa", no: "02" },
  { id: "motion",    title: "Motion Catalog",   desc: "Bibliothèque de patterns d'animation. Physique, transitions, easing.", status: "SOON" as const, icon: "→", no: "03" },
  { id: "form",      title: "Form Study",       desc: "Interfaces brutalistes. Formulaires comme langage de design.", status: "CONCEPT" as const, icon: "□", no: "04" },
  { id: "signal",    title: "Signal",           desc: "Visualisation de données en temps réel. Graphes génératifs.", status: "CONCEPT" as const, icon: "∿", no: "05" },
  { id: "glitch",    title: "Glitch Machine",   desc: "Art génératif, corruptions visuelles contrôlées.", status: "WIP" as const, icon: "⌬", no: "06" },
];

// ─── Lab content ─────────────────────────────────────────────────────────────
function LabContent() {
  const { isDark } = useTheme();
  const dotColor = isDark ? "rgba(255,255,255,0.038)" : "rgba(0,0,0,0.04)";
  const border = isDark ? "#262630" : "#1d1d1f";

  return (
    <div
      id="main-content"
      style={{
        minHeight: "100vh",
        background: "var(--theme-bg)",
        color: "var(--theme-fg)",
        fontFamily: "var(--font-body)",
        backgroundImage: `radial-gradient(circle, ${dotColor} 1.2px, transparent 1.2px)`,
        backgroundSize: "22px 22px",
      }}
    >
      {/* Hero */}
      <div style={{ padding: "clamp(96px, 13vw, 136px) clamp(20px, 5vw, 56px) 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "inline-block", fontSize: "clamp(10px, 1vw, 12px)",
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--theme-accent)", fontWeight: 700,
          border: "2px solid var(--theme-accent)",
          padding: "4px 14px", borderRadius: 0, marginBottom: 26,
        }}>
          Espace expérimental — 2024→
        </div>
        <h1 style={{
          fontSize: "clamp(60px, 11vw, 120px)",
          fontFamily: "var(--font-display)", fontWeight: 900,
          letterSpacing: "-0.04em", lineHeight: 0.9, margin: "0 0 24px",
          textShadow: `3px 3px 0 var(--theme-accent)`,
        }}>
          Lab<span style={{ color: "var(--theme-accent)" }}>.</span>
        </h1>
        <p style={{
          fontSize: "clamp(14px, 1.7vw, 17px)", color: "var(--theme-muted)",
          maxWidth: 480, lineHeight: 1.68, margin: 0,
        }}>
          Territoire d'expérimentation. Des prototypes, des systèmes en construction, et des questions sans réponse — encore.
        </p>
      </div>

      {/* Thick divider */}
      <div style={{ margin: "0 clamp(20px, 5vw, 56px)", height: 3, background: "var(--theme-fg)" }} />

      {/* Grid — comic panel borders */}
      <div style={{
        padding: "0 clamp(20px, 5vw, 56px) 100px",
        maxWidth: 1200, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
      }}>
        {EXPERIMENTS.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: parseInt(exp.no) * 0.08 }}
            style={{
              border: `2px solid ${border}`,
              marginTop: -2, marginLeft: -2,
              padding: "28px 26px 24px",
              position: "relative",
              cursor: exp.status === "WIP" ? "pointer" : "default",
            }}
            whileHover={exp.status === "WIP" ? {
              backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
            } : {}}
          >
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", color: "var(--theme-muted)", marginBottom: 14 }}>
              {exp.no}
            </div>
            <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 14, color: "var(--theme-accent)", fontFamily: "var(--font-display)", fontWeight: 700 }}>
              {exp.icon}
            </div>
            <h2 style={{ fontSize: "clamp(17px, 1.9vw, 21px)", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 9px", lineHeight: 1.2 }}>
              {exp.title}
            </h2>
            <p style={{ fontSize: 13, color: "var(--theme-muted)", lineHeight: 1.62, margin: "0 0 20px" }}>
              {exp.desc}
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center",
              fontSize: 9.5, letterSpacing: "0.2em", fontWeight: 700,
              textTransform: "uppercase", borderRadius: 0,
              background: exp.status === "WIP" ? "var(--theme-accent)" : "transparent",
              color: exp.status === "WIP" ? "var(--theme-accent-fg)" : exp.status === "SOON" ? "var(--theme-accent)" : "var(--theme-muted)",
              border: exp.status !== "WIP" ? `1.5px solid ${exp.status === "SOON" ? "var(--theme-accent)" : "var(--theme-border)"}` : "none",
              padding: "3px 10px",
            }}>
              {exp.status === "WIP" ? "En cours" : exp.status === "SOON" ? "Bientôt" : "Concept"}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{
        borderTop: `2px solid ${border}`,
        padding: "18px clamp(20px, 5vw, 56px) 56px",
        fontSize: 10, color: "var(--theme-muted)",
        letterSpacing: "0.12em", textTransform: "uppercase",
      }}>
        D'autres expérimentations arrivent → 2025
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LabPage() {
  const [phase, setPhase] = useState<Phase>("recede");
  const { isDark } = useTheme();

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("imac"),   1000),
      setTimeout(() => setPhase("sky"),    3000),
      setTimeout(() => setPhase("sf"),     5500),
      setTimeout(() => setPhase("window"), 8400),
      setTimeout(() => setPhase("cowork"), 10000),
      setTimeout(() => setPhase("done"),   12200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "done") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        <LabContent />
      </motion.div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, overflow: "hidden" }}>
      {/* Skip */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.4 }}
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
        Passer
      </motion.button>

      <AnimatePresence mode="sync">
        {phase === "recede" && (
          <motion.div key="recede" style={{ position: "absolute", inset: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <RecedeScene isDark={isDark} />
          </motion.div>
        )}
        {phase === "imac" && (
          <motion.div key="imac" style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}>
            <IMacDeskScene isLeaving={false} isDark={isDark} />
          </motion.div>
        )}
        {phase === "sky" && (
          <motion.div key="sky" style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}>
            <SkyScene isLeaving={false} isDark={isDark} />
          </motion.div>
        )}
        {phase === "sf" && (
          <motion.div key="sf" style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}>
            <SFScene isLeaving={false} isDark={isDark} />
          </motion.div>
        )}
        {phase === "window" && (
          <motion.div key="window" style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <WindowScene isDark={isDark} />
          </motion.div>
        )}
        {phase === "cowork" && (
          <motion.div key="cowork" style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}>
            <CoworkScene isDark={isDark} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
