import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const legacyLogoRedirects = new Set([
    '/icons/logo-rubens.png',
    '/animations/logo-animation.json',
  ]);

  if (legacyLogoRedirects.has(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/icons/icon.svg';
    const response = NextResponse.redirect(url, 308);
    response.headers.set('X-Robots-Tag', 'noindex, noimageindex, noarchive');
    return response;
  }

  const response = NextResponse.next();
  const isResumePdf =
    request.nextUrl.pathname.startsWith('/resume/') &&
    request.nextUrl.pathname.toLowerCase().endsWith('.pdf');

  // Empêche le clickjacking (chargement dans un iframe)
  response.headers.set('X-Frame-Options', isResumePdf ? 'SAMEORIGIN' : 'DENY');

  // Empêche le MIME-type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Désactive la détection XSS legacy (navigateurs anciens)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Force HTTPS pendant 2 ans, inclut sous-domaines
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  // Contrôle les infos envoyées dans le Referer
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Désactive les APIs sensibles non utilisées
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // Content Security Policy
  // - unsafe-inline requis pour les scripts anti-flash inline et les styles Tailwind
  // - frame-ancestors remplace X-Frame-Options pour les navigateurs modernes
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://slelguoygbfzlpylpxfs.supabase.co https://cloud.umami.is",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
      "img-src 'self' data: https:",
      "connect-src 'self' https://slelguoygbfzlpylpxfs.supabase.co https://ipapi.co https://api.sunrise-sunset.org https://cloud.umami.is",
      isResumePdf ? "frame-ancestors 'self'" : "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  return response;
}

export const config = {
  matcher: [
    // Applique sur toutes les routes sauf les fichiers statiques Next.js
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
