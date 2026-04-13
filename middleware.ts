import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Empêche le clickjacking (chargement dans un iframe)
  response.headers.set('X-Frame-Options', 'DENY');

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
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://slelguoygbfzlpylpxfs.supabase.co https://ipapi.co https://api.sunrise-sunset.org https://cloud.umami.is",
      "frame-ancestors 'none'",
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
