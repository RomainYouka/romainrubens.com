import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "iOS 26",
  description: "Exploration design — concepts d'interface pour iOS 26.",
  path: "/projects/ios26",
});

export default function Ios26Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
