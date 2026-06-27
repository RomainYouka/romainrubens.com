import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo",
  robots: { index: false, follow: false },
};

export default function LogoAssetsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
