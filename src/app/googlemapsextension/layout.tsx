import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Maps App Extension",
  description: "Google Maps App Extension by Romain Rubens: an accessible indoor navigation concept for Lyon’s Perrache transit hub, with contextual directions and floor-by-floor maps.",
  alternates: { canonical: "/googlemapsextension" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
