"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { Language } from "@/lib/language";
import { translations } from "./translations";

export const GoogleLanguage = createContext<Language>("EN");
export function ProjectCopy({ id, part, children }: { id: string; part?: number; children: ReactNode }) {
  const language = useContext(GoogleLanguage);
  const copy = translations[id];
  if (!copy || language === "EN" || part === -1) return children;
  const text = copy[language === "FR" ? 0 : 1];
  return <span style={{ lineHeight: "normal", whiteSpace: "pre-line" }}>{part === undefined ? text : text.split("\n\n")[part]}</span>;
}
