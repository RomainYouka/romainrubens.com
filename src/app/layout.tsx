import type { Metadata, Viewport } from "next";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import Script from "next/script";
import IntroSplashWrapper from "@/components/intro-splash-wrapper";
import ClientLayout from "@/components/client-layout";
import { LanguageSync } from "@/components/language-sync";
import { Google_Sans, Google_Sans_Flex } from "next/font/google";

const googleSans = Google_Sans({
  subsets: ["latin", "armenian"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "SF Pro Text", "system-ui", "sans-serif"],
});

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "system-ui", "sans-serif"],
});

const siteUrlMeta = process.env.NEXT_PUBLIC_SITE_URL || "https://romainrubens.com";
const defaultTitle = "Romain Rubens - UX/UI Designer · Smart Ecosystems";
const defaultDescription =
  "Je suis étudiant en design industriel avec une pratique centrée sur l'UX/UI et le design d'interaction. Mon travail porte sur la manière dont les interfaces s'organisent dans des usages réels, des contraintes concrètes et des systèmes du quotidien.";
const logoImage = "/icons/icon.svg";

export const metadata: Metadata = {
  applicationName: "Romain Rubens",
  title: {
    default: defaultTitle,
    template: "%s - Romain Rubens",
  },
  description: defaultDescription,
  metadataBase: new URL(siteUrlMeta),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Romain Rubens",
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrlMeta,
    images: [{ url: logoImage, width: 701, height: 76, alt: "Logo Romain Rubens" }],
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: defaultDescription,
    images: [logoImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${googleSans.variable} ${googleSansFlex.variable}`}>
      <head>
        {/* Anti-flash : applique le thème et la couleur du navigateur avant le rendu React */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#191919');}else{var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#ffffff');}if(localStorage.getItem('dyslexic')==='1'){document.documentElement.setAttribute('data-dyslexic','true');}var a=localStorage.getItem('accentColor');if(a&&a!=='blue'){document.documentElement.setAttribute('data-accent',a);}}catch(e){}})()` }} />
        <meta name="theme-color" content="#ffffff" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://hxhketfuzhwtrvmvnzln.supabase.co" />
        <link rel="preconnect" href="https://cloud.umami.is" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Romain Rubens",
              "url": siteUrlMeta,
              "image": `${siteUrlMeta}${logoImage}`,
              "logo": `${siteUrlMeta}${logoImage}`,
              "description": defaultDescription,
              "jobTitle": "UX/UI Designer · Smart Ecosystems",
              "sameAs": [
                "https://www.linkedin.com/in/romain-rubens-ba660323b/",
                "https://www.behance.net/rubensromain"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {/* Lien d'évitement — critère RGAA 12.7 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:no-underline"
          style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-accent-fg)" }}
        >
          Aller au contenu principal
        </a>
        <LanguageSync />
        <IntroSplashWrapper />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="https://romainrubens.com"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
        />
        {process.env.NEXT_PUBLIC_UMAMI_ID && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            data-domains="romainrubens.com"
            strategy="afterInteractive"
          />
        )}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
