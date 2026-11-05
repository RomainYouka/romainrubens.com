import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Renault App Extension",
  description: "An academic UX/UI and critical design project exploring shared mobility quotas with Renault — Romain Rubens and Erwan Hodonou.",
  alternates: { canonical: "/renaultextensionapp" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
