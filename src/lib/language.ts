export type Language = "FR" | "EN" | "ՀԱՅ";
export const LANGUAGES: Language[] = ["FR", "EN", "ՀԱՅ"];

/**
 * Détecte la langue à afficher :
 * 1. Préférence sauvegardée (localStorage) — priorité absolue
 * 2. Langue du navigateur / appareil
 * 3. Anglais par défaut
 */
export function detectLanguage(): Language {
  if (typeof window === "undefined") return "EN";
  const saved = localStorage.getItem("preferredLanguage");
  if (saved === "FR" || saved === "EN" || saved === "ՀԱՅ") return saved;
  const lang = (
    navigator.language ||
    (navigator.languages && navigator.languages[0]) ||
    ""
  )
    .split("-")[0]
    .toLowerCase();
  if (lang === "fr") return "FR";
  if (lang === "hy") return "ՀԱՅ";
  return "EN";
}
