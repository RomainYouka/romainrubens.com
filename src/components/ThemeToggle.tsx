"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Bouton dans la barre de navigation desktop (icône seule)
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-[42px] h-full transition-all hover:opacity-70"
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      style={{ color: "var(--theme-fg)" }}
    >
      {isDark
        ? <Sun className="h-[18px] w-[18px]" strokeWidth={2} />
        : <Moon className="h-[18px] w-[18px]" strokeWidth={2} />
      }
    </button>
  );
}

// Bouton dans le menu burger mobile (ligne avec icône + libellé)
const mobileLabels = {
  FR:  { dark: "Mode sombre",  light: "Mode clair"  },
  EN:  { dark: "Dark mode",    light: "Light mode"  },
  ՀԱՅ: { dark: "Մութ ռեժիմ", light: "Բաց ռեժիմ"  },
};

export function ThemeToggleMobile({ selectedLanguage, borderColor, onClose }: {
  selectedLanguage: "FR" | "EN" | "ՀԱՅ";
  borderColor: string;
  onClose?: () => void;
}) {
  const { isDark, toggleTheme } = useTheme();
  const labels = mobileLabels[selectedLanguage];

  return (
    <div className="border-t pt-4" style={{ borderColor }}>
      <button
        onClick={() => { toggleTheme(); onClose?.(); }}
        className="flex items-center gap-3 py-3 w-full transition-opacity hover:opacity-80"
        style={{ color: "var(--theme-fg)" }}
        aria-label={isDark ? labels.light : labels.dark}
      >
        {isDark
          ? <Sun className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
          : <Moon className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
        }
        <span className="text-lg font-medium">
          {isDark ? labels.light : labels.dark}
        </span>
      </button>
    </div>
  );
}
