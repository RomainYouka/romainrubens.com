# Romain Rubens Portfolio — replit.md

## Overview

This is a personal portfolio website for Romain Rubens, a UX/UI and industrial design student. The site showcases design projects, an about section, contact page, resume/CV, and explorations. It supports three languages: French (FR), English (EN), and Armenian (ՀԱՅ), with browser-language detection and user preference persistence via `localStorage`.

The site is built with **Next.js 15 (App Router)** using **TypeScript**, styled with **Tailwind CSS v4**, and uses **shadcn/ui** components. It runs on port 5000.

---

## User Preferences

Preferred communication style: Simple, everyday language.

---

## System Architecture

### Frontend Architecture

- **Framework**: Next.js 15 with App Router (RSC enabled). Pages under `src/app/` follow the file-based routing convention.
- **Language**: TypeScript throughout, with `strict` mode enabled.
- **Styling**: Tailwind CSS v4 (imported via `@import "tailwindcss"` in `globals.css`), with CSS variables for theming. The shadcn/ui component library uses the "new-york" style with the "neutral" base color.
- **Component Library**: shadcn/ui (Radix UI primitives + Tailwind). Components live in `src/components/ui/`.
- **Animations**: Framer Motion (`framer-motion` / `motion`) for page transitions and scroll-based animations. Lottie (`lottie-react`) for JSON-based animations in project pages.
- **Icons**: Lucide React.

### Directory Structure

```
src/
  app/                   # Next.js App Router pages
    page.tsx             # Home page
    layout.tsx           # Root layout (metadata, fonts, intro splash)
    not-found.tsx        # Custom 404 page
    contact/             # Contact page
    cv/                  # Redirects to PDF resume
    explorations/        # Explorations gallery page
    logo-assets/         # Internal logo asset utility page
    projects/            # Project detail pages (framasoft, namequest, ios26, waveswitch, etc.)
    resume/              # Resume/CV page
    resume-splash/       # Redirect page used for intro splash reset
  components/
    sections/            # Feature-level page sections (hero, navigation, footer, project components)
    ui/                  # shadcn/ui primitive components
    client-layout.tsx    # Client wrapper for navigation, footer, language sync
    intro-splash.tsx     # Animated greeting splash screen (shown once per session)
    language-sync.tsx    # Browser language detection + localStorage sync
  hooks/
    use-mobile.ts        # Mobile breakpoint detection hook
  lib/
    utils.ts             # `cn()` Tailwind class merger utility
  visual-edits/          # Dev-only component tagger loader (Turbopack custom loader)
public/
  projects/
    blocks/              # Project thumbnail images (WebP format for optimal performance)
  explorations/          # Exploration page images
  icons/                 # Favicons, logo SVG/PNG
  resume/                # PDF CV files (FR, EN, ՀԱՅ)
  framaspace-toolbar/    # Toolbar color images for Framaspace project
```

### Routing

- All pages are client components (`"use client"`) because they rely on `localStorage`, browser events, and animations.
- The root layout wraps everything in `<ClientLayout>` which mounts the global navigation, footer, and designer quotes section.
- The `IntroSplash` component shows a time-of-day greeting animation on first visit per session (controlled via `sessionStorage`).

### Internationalisation (i18n)

- **No external i18n library** — translations are plain TypeScript objects (`{ FR, EN, ՀԱՅ }`) colocated in each page/component file.
- Language preference is stored in `localStorage` under the key `"preferredLanguage"`.
- Language changes are broadcast app-wide using a custom DOM `CustomEvent` named `"languageChange"`, which all components listen to.
- `LanguageSync` component (mounted in root layout) seeds the preference from browser language if none is saved.

### State Management

- No global state library (no Redux, Zustand, etc.). State is local (`useState`/`useEffect`) per component, with `localStorage`/`sessionStorage` used for cross-page persistence and custom events for cross-component communication.

### Visual Editing (Dev Only)

- A custom Turbopack loader (`src/visual-edits/component-tagger-loader.js`) tags JSX/TSX elements with source metadata in development. This is conditionally applied only when `NODE_ENV !== "production"`.

### Performance Considerations

- Next.js `Image` component is used throughout for optimized image loading, with remote patterns allowing all HTTPS/HTTP hosts (images are hosted on Supabase storage).
- Project thumbnail images in `/public/projects/blocks/` use WebP format for optimal file size and performance.
- Intersection Observer is used in carousel/gallery components for lazy loading.
- Skeleton loading states (`src/components/ui/skeleton.tsx`) are shown while project grids load.

### Typography System (v2)

- **Font Stack**: All text uses CSS variables (`--font-body`, `--font-display`, `--font-armenian`) defined in `globals.css`.
- **Fonts**:
  - **Google Sans Variable** (body text, 100–900 weight): `/public/fonts/google-sans.woff2`
  - **Google Sans Flex Variable** (display/headings, 100–900 weight): `/public/fonts/google-sans-flex.woff2`
  - **Noto Sans Armenian Variable** (Armenian content, 100–900 weight): `/public/fonts/noto-sans-armenian.woff2`
- **Copyright Symbol**: In footer, the © symbol is rendered at `fontSize: 1.1em` to normalize visual size to match body text.
- **Removed**: All hardcoded Roboto, SF Pro Display, and SF Pro Text references (16 Roboto instances, 31 SF Pro instances removed).

---

## External Dependencies

### Hosting & Media Storage

- **Supabase Storage**: All project images are hosted on a Supabase storage bucket (`slelguoygbfzlpylpxfs.supabase.co`). Images are served via Supabase's image render API with width/height/resize parameters. No Supabase database or auth features are used — storage only.

### Fonts & Typography

- **Variable Fonts**: Three professional variable typefaces served locally from `/public/fonts/`:
  - **Google Sans** (`google-sans.woff2`, `google-sans-italic.woff2`) — Body text font for French/English (weight range 100–900, stretch 75–100%, font-display: swap)
  - **Google Sans Flex** (`google-sans-flex.woff2`) — Display/heading font for French/English (weight range 100–900, stretch 75–100%, supports GRAD, ROND, opsz, slnt, wdth, font-display: swap)
  - **Noto Sans Armenian** (`noto-sans-armenian.woff2`) — Armenian script text (weight range 100–900, stretch 75–100%, font-display: swap)
- **Font stack**: `@font-face` declarations in `globals.css` using `format("woff2-variations")` for variable font support
- **CSS Variables**: Font families managed via:
  - `--font-body`: "Google Sans" (for paragraph text, body, regular content)
  - `--font-display`: "Google Sans Flex" (for headings h1–h6, titles)
  - `--font-armenian`: "Noto Sans Armenian" (for Armenian content via `:lang(hy)` selector)
- **Language-aware styling**: Armenian content (`:lang(hy)`, `[lang="hy"]`) automatically uses Noto Sans Armenian variable font
- **Weight distribution**: Variable fonts support full 100–900 range; hierarchy uses: 400 (regular), 500 (medium), 600 (semibold), 700 (bold as needed)
- **Performance**: Local font serving with `font-display: swap` ensures instant text rendering, preload links in `<head>` for critical path optimization
- **Fallbacks**: System fonts (-apple-system, BlinkMacSystemFont, SF Pro Display/Text, system-ui, sans-serif) as graceful degradation

### Key npm Dependencies

| Package | Purpose |
|---|---|
| `next` | Framework |
| `react` / `react-dom` | UI runtime |
| `tailwindcss` | Utility CSS |
| `framer-motion` / `motion` | Animations and page transitions |
| `lottie-react` | JSON-based Lottie animations for project pages |
| `@radix-ui/*` | Accessible UI primitives (via shadcn/ui) |
| `class-variance-authority` | Component variant styling |
| `clsx` + `tailwind-merge` | Conditional class merging (`cn()`) |
| `lucide-react` | Icon set |
| `embla-carousel-react` | Carousel base (with autoplay/auto-scroll plugins) |
| `date-fns` | Date utilities |
| `@tailwindcss/typography` | Prose/rich text styling |
| `@hookform/resolvers` | Form validation (available but contact form uses mailto links) |
| `@babel/parser` | Used by the dev visual-edit component tagger |

### No Database

There is no database in use. All content is hardcoded in component files. No Drizzle, Prisma, or any ORM is present.

### No Authentication

There is no authentication or authorization layer.

### Environment Variables

- `NEXT_PUBLIC_SITE_URL`: Used in the root layout for structured data (JSON-LD). Falls back to `https://romainrubens.com`.