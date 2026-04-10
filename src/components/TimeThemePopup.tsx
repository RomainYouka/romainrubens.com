"use client";

import { motion } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

type Language = "FR" | "EN" | "ՀԱՅ";

function getStoredLanguage(): Language {
  try {
    const lang = localStorage.getItem("preferredLanguage") as Language;
    return ["FR", "EN", "ՀԱՅ"].includes(lang) ? lang : "FR";
  } catch {
    return "FR";
  }
}

const text = {
  FR: {
    evening: {
      title: "Il commence à faire nuit",
      body: "Le soleil se couche. Basculer en mode sombre pour plus de confort ?",
      yes: "Passer en mode sombre",
      no: "Rester en mode clair",
    },
    morning: {
      title: "Vous commencez tôt",
      body: "Il fait encore nuit dehors. Activer le mode sombre pour vos yeux ?",
      yes: "Activer le mode sombre",
      no: "Rester en mode clair",
    },
  },
  EN: {
    evening: {
      title: "Evening is here",
      body: "The sun is setting. Switch to dark mode for a more comfortable experience?",
      yes: "Switch to dark mode",
      no: "Stay in light mode",
    },
    morning: {
      title: "Early riser",
      body: "Still dark outside. Enable dark mode to be easier on your eyes?",
      yes: "Enable dark mode",
      no: "Stay in light mode",
    },
  },
  ՀԱՅ: {
    evening: {
      title: "Երեկո է",
      body: "Արևն է մտնում։ Անցե՞ք մութ ռեժիմի ավելի հարմարավետ փորձի համար:",
      yes: "Անցնել մութ ռեժիմի",
      no: "Մնալ բաց ռեժիմում",
    },
    morning: {
      title: "Վաղ վեր կացած",
      body: "Դրսում դեռ մութ է։ Ակտիվացնե՞ք մութ ռեժիմը աչքերի համար:",
      yes: "Ակտիվացնել մութ ռեժիմ",
      no: "Մնալ բաց ռեժիմում",
    },
  },
};

export function TimeThemePopup() {
  const { showTimePopup, dismissTimePopup, setTheme } = useTheme();

  if (!showTimePopup) return null;

  const lang = getStoredLanguage();
  const t = text[lang][showTimePopup];
  const isEvening = showTimePopup === "evening";

  const handleAccept = () => {
    setTheme("dark");
    dismissTimePopup();
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-end sm:items-center justify-center z-[2000] px-4 pb-8 sm:pb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Overlay avec flou */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        onClick={dismissTimePopup}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />

      {/* Carte principale */}
      <motion.div
        className="relative w-full max-w-[400px] overflow-hidden"
        style={{
          borderRadius: "24px",
          backgroundColor: "#111111",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
        initial={{ scale: 0.9, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 24, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
      >
        {/* Dégradé décoratif en fond */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: isEvening
              ? "radial-gradient(ellipse at 30% 0%, rgba(49,77,203,0.25) 0%, transparent 65%)"
              : "radial-gradient(ellipse at 70% 0%, rgba(120,80,220,0.2) 0%, transparent 65%)",
          }}
        />

        <div className="relative p-7">
          {/* Bouton fermer */}
          <button
            onClick={dismissTimePopup}
            className="absolute top-5 right-5 flex items-center justify-center w-7 h-7 rounded-full transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>

          {/* Icône */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-2xl mb-5"
            style={{
              background: isEvening
                ? "linear-gradient(135deg, #1e3a8a 0%, #314DCB 100%)"
                : "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
              boxShadow: isEvening
                ? "0 8px 24px rgba(49,77,203,0.4)"
                : "0 8px 24px rgba(124,58,237,0.4)",
            }}
          >
            {isEvening
              ? <Moon className="w-6 h-6 text-white" strokeWidth={1.8} />
              : <Sun className="w-6 h-6 text-white" strokeWidth={1.8} />
            }
          </div>

          {/* Titre */}
          <h2 className="text-white font-semibold text-[18px] leading-snug mb-2 pr-8">
            {t.title}
          </h2>

          {/* Corps */}
          <p className="text-[14px] leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.5)" }}>
            {t.body}
          </p>

          {/* Boutons */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleAccept}
              className="w-full py-3.5 rounded-[14px] text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
              style={{
                background: isEvening
                  ? "linear-gradient(135deg, #1e3a8a 0%, #314DCB 100%)"
                  : "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
                color: "#ffffff",
                boxShadow: isEvening
                  ? "0 4px 14px rgba(49,77,203,0.4)"
                  : "0 4px 14px rgba(124,58,237,0.35)",
              }}
            >
              {t.yes}
            </button>
            <button
              onClick={dismissTimePopup}
              className="w-full py-3.5 rounded-[14px] text-sm font-medium transition-all duration-150 active:scale-[0.98]"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {t.no}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
