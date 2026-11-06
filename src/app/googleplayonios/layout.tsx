import { createPageMetadata } from "@/lib/page-metadata";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], variable: "--font-project-roboto", display: "swap", preload: false });
export const metadata = createPageMetadata({ title: "Google Play on iOS", description: "A native iOS interpretation of Google Play: interface design, a design system, components and alternative app distribution in Europe.", path: "/googleplayonios" });
export default function Layout({ children }: { children: React.ReactNode }) { return <div className={roboto.variable}>{children}</div>; }
