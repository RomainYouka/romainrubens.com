import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Goupil — Digital Ecosystem & Design System",
  description: "Projet de design UX/UI — écosystème digital Goupil et design system.",
  path: "/projects/goupil",
});

export default function GoupilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
