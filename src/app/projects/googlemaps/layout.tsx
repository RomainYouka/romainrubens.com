import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Google Maps App Extension",
  description: "Projet de design UX/UI — extension de l'application Google Maps pour enrichir l'expérience de navigation.",
  path: "/projects/googlemaps",
});

export default function GoogleMapsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
