import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Accessibility",
  description: "Démarche d'accessibilité numérique de romainrubens.com — approche basée sur le RGAA 4.1.2 et les WCAG 2.2.",
  path: "/accessibility",
});

export default function AccessibiliteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
