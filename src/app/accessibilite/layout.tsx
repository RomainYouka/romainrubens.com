import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité",
  description: "Déclaration d'accessibilité RGAA 4.1 du site romainrubens.com — état de conformité, résultats d'audit et contacts.",
};

export default function AccessibiliteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
