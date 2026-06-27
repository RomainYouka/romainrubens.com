import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Compétences",
  description: "Compétences de Romain Rubens en design UX/UI, design d'interaction, prototypage et outils de conception.",
  path: "/skills",
});

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
