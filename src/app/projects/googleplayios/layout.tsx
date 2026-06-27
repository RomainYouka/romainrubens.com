import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Google Play on iOS",
  description: "Projet de design UX/UI — concept d'application Google Play adapté pour iOS.",
  path: "/projects/googleplayios",
});

export default function GooglePlayIosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
