"use client";

import { motion } from "framer-motion";
import { Moon } from "lucide-react";
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
    evening: { title: "Fin de journée", body: "Le soleil se couche. Voulez-vous passer en mode sombre ?", yes: "Mode sombre", no: "Non merci" },
    morning: { title: "Début de journée", body: "Vous commencez tôt. Voulez-vous activer le mode sombre ?", yes: "Mode sombre", no: "Non merci" },
  },
  EN: {
    evening: { title: "End of day", body: "The sun is setting. Would you like to switch to dark mode?", yes: "Dark mode", no: "No thanks" },
    morning: { title: "Early start", body: "Starting early? Would you like to enable dark mode?", yes: "Dark mode", no: "No thanks" },
  },
  ՀԱՅ: {
    evening: { title: "Օրվա վերջ", body: "Արևն է մտնում։ Ցանկանու՞մ եք անցնել մութ ռեժիմի:", yes: "Մութ ռեժիմ", no: "Ոչ" },
    morning: { title: "Վաղ առավոտ", body: "Ցանկանու՞մ եք ակտիվացնել մութ ռեժիմը:", yes: "Մութ ռեժիմ", no: "Ոչ" },
  },
};

export function TimeThemePopup() {
  const { showTimePopup, dismissTimePopup, setTheme } = useTheme();

  if (!showTimePopup) return null;

  const lang = getStoredLanguage();
  const t = text[lang][showTimePopup];

  const handleAccept = () => {
    setTheme("dark");
    dismissTimePopup();
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[2000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Fond assombri avec flou */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
        onClick={dismissTimePopup}
      />

      {/* Carte du popup */}
      <motion.div
        className="relative rounded-2xl shadow-2xl p-6 w-[320px] max-w-[90vw]"
        style={{ backgroundColor: "#1a1a1a", border: "1px solid #3f3f3f" }}
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Moon className="h-5 w-5 flex-shrink-0" style={{ color: "#314DCB" }} strokeWidth={2} />
          <span className="font-semibold text-white text-base">{t.title}</span>
        </div>
        <p className="text-sm mb-5" style={{ color: "#86868b" }}>{t.body}</p>
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#314DCB", color: "#ffffff" }}
          >
            {t.yes}
          </button>
          <button
            onClick={dismissTimePopup}
            className="flex-1 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#272727", color: "#ffffff", border: "1px solid #3f3f3f" }}
          >
            {t.no}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
