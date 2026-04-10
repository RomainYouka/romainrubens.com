import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Prenez contact avec Romain Rubens — designer UX/UI disponible pour des opportunités professionnelles.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
