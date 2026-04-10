"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

type Language = "FR" | "EN" | "ՀԱՅ";

const text = {
  FR:  {
    title: "Personnaliser l'affichage",
    body: "Choisissez le thème qui vous convient.",
    toDark: "Mode sombre",
    toLight: "Mode clair",
  },
  EN:  {
    title: "Customise display",
    body: "Choose the theme that suits you.",
    toDark: "Dark mode",
    toLight: "Light mode",
  },
  ՀԱՅ: {
    title: "Հարմարեցնել ցուցադրումը",
    body: "Ընտրեք ձեզ հարմար թեման:",
    toDark: "Մութ ռեժիմ",
    toLight: "Բաց ռեժիմ",
  },
};

const SHOW_DELAY_MS   = 3000;
const AUTO_DISMISS_MS = 11000;

export function HomeThemeToast() {
  const { isDark, setTheme } = useTheme();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<Language>("FR");

  useEffect(() => {
    if (pathname !== "/") { setVisible(false); return; }

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

  const handleSwitch = (target: "dark" | "light") => {
    setTheme(target);
    dismiss();
  };

  const t = text[lang];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-24 right-4 md:bottom-8 md:right-6 z-[500] w-[280px]"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 12, scale: 0.94 }}
          transition={{ type: "spring", damping: 28, stiffness: 340, mass: 0.75 }}
        >
          <div
            className="overflow-hidden"
            style={{
              borderRadius: "20px",
              backgroundColor: isDark ? "#343434" : "#ffffff",
              border: `1px solid ${isDark ? "#616161" : "rgba(0,0,0,0.08)"}`,
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.4)"
                : "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {/* Bande de couleur supérieure */}
            <div
              className="h-[3px] w-full"
              style={{
                background: "linear-gradient(90deg, #314DCB 0%, #7c3aed 100%)",
              }}
            />

            <div className="p-4">
              {/* En-tête */}
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center w-6 h-6 rounded-lg flex-shrink-0"
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg, #1e3a8a, #314DCB)"
                        : "linear-gradient(135deg, #314DCB, #7c3aed)",
                    }}
                  >
                    {isDark
                      ? <Sun  className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                      : <Moon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                    }
                  </div>
                  <span
                    className="font-semibold text-[13px] leading-tight"
                    style={{ color: "var(--theme-fg)" }}
                  >
                    {t.title}
                  </span>
                </div>
                <button
                  onClick={dismiss}
                  className="flex-shrink-0 ml-2 flex items-center justify-center w-5 h-5 rounded-full transition-all"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                    color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
                  }}
                  aria-label="Fermer"
                >
                  <X className="h-2.5 w-2.5" strokeWidth={2.5} />
                </button>
              </div>

              {/* Description */}
              <p className="text-[12px] mb-3.5 pl-8" style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#86868b" }}>
                {t.body}
              </p>

              {/* Boutons côte à côte */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleSwitch("dark")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-medium transition-all duration-150 active:scale-95"
                  style={
                    isDark
                      ? { backgroundColor: "#343434", color: "rgba(255,255,255,0.55)", border: "1px solid #616161" }
                      : { background: "linear-gradient(135deg, #1e3a8a, #314DCB)", color: "#ffffff", boxShadow: "0 2px 8px rgba(49,77,203,0.3)" }
                  }
                >
                  <Moon className="w-3 h-3" strokeWidth={2} />
                  {t.toDark}
                </button>
                <button
                  onClick={() => handleSwitch("light")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-medium transition-all duration-150 active:scale-95"
                  style={
                    !isDark
                      ? { backgroundColor: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.45)", border: "1px solid rgba(0,0,0,0.08)" }
                      : { background: "linear-gradient(135deg, #e8e8e8, #ffffff)", color: "#1d1d1f", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }
                  }
                >
                  <Sun className="w-3 h-3" strokeWidth={2} />
                  {t.toLight}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
