import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vahan Soghomonian",
  description: "Projet de design — site portfolio pour l'artiste Vahan Soghomonian.",
};

export default function VahanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
