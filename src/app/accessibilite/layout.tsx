import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Démarche d'accessibilité numérique de romainrubens.com — approche basée sur les standards RGAA 4 et WCAG 2.1.",
};

export default function AccessibiliteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
