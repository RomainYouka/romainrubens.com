export type Language = "FR" | "EN" | "ՀԱՅ";
export const LANGUAGES: Language[] = ["FR", "EN", "ՀԱՅ"];

/**
 * Détecte la langue à afficher :
 * 1. Choix manuel pendant la session — priorité absolue
 * 2. Langue du navigateur / appareil
 * 3. Anglais par défaut
 */
export function detectLanguage(): Language {
  if (typeof window === "undefined") return "EN";
  let saved: string | null = null;
  try { saved = sessionStorage.getItem("preferredLanguage"); } catch { /* Storage can be disabled. */ }
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
