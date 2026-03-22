import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import IntroSplashWrapper from "@/components/intro-splash-wrapper";
import ClientLayout from "@/components/client-layout";
import { LanguageSync } from "@/components/language-sync";

export const metadata: Metadata = {
  title: "Romain Rubens",
  description: "RomainRubens (EN)",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romainrubens.com";
  
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/google-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/google-sans-flex.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Romain Rubens",
              "url": siteUrl,
              "logo": `${siteUrl}/icons/icon.svg`
            })
          }}
        />
      </head>
      <body className="antialiased bg-white">
        <LanguageSync />
        <IntroSplashWrapper />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}