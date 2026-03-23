# Romain Rubens — Portfolio

Personal portfolio website for Romain Rubens (UX/UI and industrial design student).

## Tech Stack
- **Framework**: Next.js 16.2.1 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Runtime**: Port 5000 via `npx next dev -p 5000 -H 0.0.0.0`

## Languages Supported
FR (French), EN (English), ՀԱՅ (Armenian) — preference stored in `localStorage`.

## Architecture

### Pages
- `/` — Home (personal intro with CTA buttons)
- `/projects` — Projects listing
- `/skills` — Skills page (dynamic, loads from `src/data/skills.json`)
- `/skills/open/close` — Admin interface (password protected)
- `/explorations` — Explorations
- `/contact` — Contact
- `/resume` — Resume/CV

### Key Files
- `src/data/skills.json` — Skills data (categories + ratings), edited via admin UI
- `src/app/api/skills/route.ts` — GET /api/skills
- `src/app/api/skills/update/route.ts` — POST /api/skills/update (auth required)
- `src/components/sections/global-navigation.tsx` — Global nav with language switcher
- `src/components/sections/personal-intro.tsx` — Home intro with CTA buttons

### Admin Interface
- URL: `/skills/open/close`
- Password: stored only in `src/app/api/skills/update/route.ts`
- Features: Add/rename/delete categories and skills, reorder, edit star ratings (1-5)
- Changes persist to `src/data/skills.json` on save

## Engineering Standards
- No AI-generated labels, no CSS filters/hue-rotate for icons
- Background colors: `#F5F5F5` (parent pages), `#EBEFF0` (sub-project pages only)
- White cards with `#E5E5E5` borders
- `lg` breakpoint = desktop, `md`–`lg` = tablet, below `md` = mobile
- Resume PDF map: FR→`RUBENS_Romain_cv.pdf`, EN→`RUBENS_Romain_Resume.pdf`, ՀԱՅ→`RUBENS_Romain_Ամփোnfum.pdf`
- Star images: `/public/skills/stars-{0-5}.png`
