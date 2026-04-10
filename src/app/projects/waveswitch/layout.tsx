import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wave Switch",
  description: "Projet de design UX/UI — Wave Switch, interface de contrôle sonore innovante.",
};

export default function WaveswitchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
