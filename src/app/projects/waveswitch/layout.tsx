import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Wave Switch",
  description: "Projet de design UX/UI — Wave Switch, interface de contrôle sonore innovante.",
  path: "/projects/waveswitch",
});

export default function WaveswitchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
