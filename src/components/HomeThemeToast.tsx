"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

type Language = "FR" | "EN" | "ՀԱՅ";

const text = {
  FR:  { title: "Changer le thème", body: "Passez en mode sombre ou clair à tout moment.", action: "Changer" },
  EN:  { title: "Change theme",     body: "Switch to dark or light mode anytime.",          action: "Switch"  },
  ՀԱՅ: { title: "Փոխել թեման",    body: "Ցանկացած պահի անցեք մութ կամ բաց ռեժիմի:",     action: "Փոխել"  },
};

const SHOW_DELAY_MS   = 3000;  // apparaît 3s après l'arrivée
const AUTO_DISMISS_MS = 11000; // disparaît automatiquement après 11s

export function HomeThemeToast() {
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<Language>("FR");

  useEffect(() => {
    if (pathname !== "/") { setVisible(false); return; }

    // Ne pas afficher si l'utilisateur a déjà une préférence ou a déjà vu ce toast
    if (localStorage.getItem("theme")) return;
    if (sessionStorage.getItem("homeToastDismissed")) return;

    const l = localStorage.getItem("preferredLanguage") as Language;
    if (["FR", "EN", "ՀԱՅ"].includes(l)) setLang(l);

    const showTimer    = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    const dismissTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("homeToastDismissed", "1");
    }, AUTO_DISMISS_MS);

    return () => { clearTimeout(showTimer); clearTimeout(dismissTimer); };
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("homeToastDismissed", "1");
  };

  const handleToggle = () => {
    toggleTheme();
    dismiss();
  };

  const t = text[lang];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-24 right-4 md:bottom-8 md:right-6 z-[500] w-[260px]"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div
            className="rounded-2xl p-4 shadow-xl"
            style={{
              backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
              border: `1px solid ${isDark ? "#3f3f3f" : "#d3d3d4"}`,
            }}
          >
            {/* En-tête */}
            <div className="flex items-start justify-between mb-1.5">
              <span className="font-semibold text-sm" style={{ color: "var(--theme-fg)" }}>
                {t.title}
              </span>
              <button
                onClick={dismiss}
                className="ml-2 opacity-40 hover:opacity-80 transition-opacity"
                aria-label="Fermer"
              >
                <X className="h-3.5 w-3.5" style={{ color: "var(--theme-fg)" }} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs mb-3" style={{ color: "#86868b" }}>{t.body}</p>

            {/* Bouton d'action */}
            <button
              onClick={handleToggle}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full text-xs font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--theme-btn-bg)", color: "var(--theme-btn-fg)" }}
            >
              {isDark
                ? <Sun  className="h-3.5 w-3.5" strokeWidth={2} />
                : <Moon className="h-3.5 w-3.5" strokeWidth={2} />
              }
              {t.action}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
