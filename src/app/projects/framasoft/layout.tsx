import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Framasoft",
  description: "Projet de design UX/UI — refonte du site Framasoft, organisation française du logiciel libre.",
};

export default function FramasoftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
