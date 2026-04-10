import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorations",
  description: "Explorations créatives et expérimentations design de Romain Rubens.",
};

export default function ExplorationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
