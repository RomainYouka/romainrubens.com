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
    <html lang="en" className={`${googleSans.variable} ${googleSansFlex.variable} ${notoSansArmenian.variable}`}>
      <head>
        {/* Anti-flash : applique le thème et la couleur du navigateur avant le rendu React */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){var h=new Date().getHours();if(h>=19||h<6)t='dark';}if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#191919');}else{var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#ffffff');}}catch(e){}})()` }} />
        <meta name="theme-color" content="#ffffff" />
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