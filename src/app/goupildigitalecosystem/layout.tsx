import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Goupil — Digital Ecosystem & SyGo Design System",
  description: "Romain Rubens’s internship project at Goupil: UX research, product strategy, connected vehicle services and the SyGo design system.",
  path: "/goupildigitalecosystem",
});

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
