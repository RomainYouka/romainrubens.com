import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Maps App Extension",
  description: "Projet de design UX/UI — extension de l'application Google Maps pour enrichir l'expérience de navigation.",
};

export default function GoogleMapsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
