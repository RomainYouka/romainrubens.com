import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stratos — Campus App",
  description: "Projet de design UX/UI — Stratos, application mobile pour campus universitaire.",
};

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
