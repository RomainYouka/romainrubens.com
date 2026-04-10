import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compétences",
  description: "Compétences de Romain Rubens en design UX/UI, design d'interaction, prototypage et outils de conception.",
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
