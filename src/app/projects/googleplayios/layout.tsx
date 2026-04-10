import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Play on iOS",
  description: "Projet de design UX/UI — concept d'application Google Play adapté pour iOS.",
};

export default function GooglePlayIosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
