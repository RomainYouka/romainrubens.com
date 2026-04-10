import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iOS 26",
  description: "Exploration design — concepts d'interface pour iOS 26.",
};

export default function Ios26Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
