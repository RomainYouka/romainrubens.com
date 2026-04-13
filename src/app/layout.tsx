import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import IntroSplashWrapper from "@/components/intro-splash-wrapper";
import ClientLayout from "@/components/client-layout";
import { LanguageSync } from "@/components/language-sync";
import { Google_Sans, Google_Sans_Flex, Noto_Sans_Armenian } from "next/font/google";

const googleSans = Google_Sans({
  subsets: ["latin"],
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

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-armenian",
  display: "swap",
  fallback: ["-apple-system", "system-ui", "sans-serif"],
});

const siteUrlMeta = process.env.NEXT_PUBLIC_SITE_URL || "https://romainrubens.com";

export const metadata: Metadata = {
  title: {
    default: "Romain Rubens — Designer UX/UI",
    template: "%s — Romain Rubens",
  },
  description: "Portfolio de Romain Rubens, étudiant en design industriel spécialisé UX/UI et design d'interaction.",
  metadataBase: new URL(siteUrlMeta),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Romain Rubens",
    title: "Romain Rubens — Designer UX/UI",
    description: "Portfolio de Romain Rubens, étudiant en design industriel spécialisé UX/UI et design d'interaction.",
    url: siteUrlMeta,
    images: [{ url: "/icons/icon.svg", width: 512, height: 512, alt: "Romain Rubens" }],
  },
  twitter: {
    card: "summary",
    title: "Romain Rubens — Designer UX/UI",
    description: "Portfolio de Romain Rubens, étudiant en design industriel spécialisé UX/UI et design d'interaction.",
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
    <html lang="fr" className={`${googleSans.variable} ${googleSansFlex.variable} ${notoSansArmenian.variable}`}>
      <head>
        {/* Anti-flash : applique le thème et la couleur du navigateur avant le rendu React */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#191919');}else{var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#ffffff');}var c=localStorage.getItem('highContrast');document.documentElement.setAttribute('data-contrast',c==='1'?'high':'normal');}catch(e){}})()` }} />
        <meta name="theme-color" content="#ffffff" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        <link rel="preconnect" href="https://cloud.umami.is" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Romain Rubens",
              "url": siteUrlMeta,
              "image": `${siteUrlMeta}/icons/icon.svg`,
              "jobTitle": "Designer UX/UI",
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-sm focus:font-semibold focus:no-underline"
          style={{ backgroundColor: "#314DCB" }}
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
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {process.env.NEXT_PUBLIC_UMAMI_ID && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            data-domains="romainrubens.com"
            data-do-not-track="true"
            strategy="afterInteractive"
          />
        )}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}