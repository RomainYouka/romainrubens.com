/**
 * Umami Analytics — wrapper typé
 * Zéro cookie, RGPD compliant, pas de bannière nécessaire.
 *
 * Usage :
 *   import { track } from "@/lib/analytics";
 *   track("project_click", { project: "Framasoft", language: "FR" });
 */

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

export function track(
  event: string,
  data?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  if (!window.umami) return;
  try {
    window.umami.track(event, data);
  } catch {
    // silencieux — ne jamais bloquer l'UX pour l'analytics
  }
}

// ─── Events typés ─────────────────────────────────────────────────────────────

export const Analytics = {
  /** Clic sur une carte projet */
  projectClick: (name: string, category: string, language: string) =>
    track("project_click", { project: name, category, language }),

  /** Redirection vers Behance */
  behanceRedirect: (project: string) =>
    track("behance_redirect", { project }),

  /** Clic sur un lien de contact */
  contactClick: (type: "email" | "linkedin" | "behance" | "medium" | "pinterest" | "cal") =>
    track("contact_click", { type }),

  /** Vue de la page CV */
  resumeView: (language: string) =>
    track("resume_view", { language }),

  /** Changement de langue */
  languageChange: (from: string, to: string) =>
    track("language_change", { from, to }),

  /** Changement de thème */
  themeToggle: (to: "dark" | "light") =>
    track("theme_toggle", { theme: to }),
} as const;
