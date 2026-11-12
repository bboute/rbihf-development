# Web App Agent Guide

This app's visual reference is the **Talent Pool page** (`app/talent-pool/page.tsx` + `components/talentpools/`). When building or restyling any page, match its look and feel exactly. Do not invent new visual patterns.

## Commands

Run from repo root unless noted. Run `nvm use` first so Node v24.15.0 is active.

- `pnpm dev` - Start development server
- `pnpm build` - Build all packages
- `pnpm lint` - Run ESLint across workspace
- `cd apps/web && pnpm typecheck` - Type check Next.js app
- `cd apps/web && pnpm lint:fix` - Fix linting issues

## Reference Implementation

- **Hub page**: `app/talent-pool/page.tsx` (server component) renders a full-bleed hero, then `<TalentPoolHub />`
- **Hub sections**: `components/talentpools/TalentPoolHub.tsx` (client component with age-group filter)
- **Category pages**: `app/talentpools/[category]/page.tsx` uses `CategoryHero`, `CategoryNavigation`, `EventList`
- **Data layer**: `lib/sanityClient.ts` (Sanity GROQ queries), types in `lib/talentPool.ts`

## Design Tokens

Semantic Tailwind tokens are defined in `packages/ui/src/styles/globals.css`. Always prefer tokens over raw hex:

| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#F5F2EB` (warm beige) | Page + light section background |
| `foreground` | `#111111` | Body text, headings on light |
| `primary` | `#111111` | Solid buttons, active filter pills, accents |
| `secondary` | `#C82B3A` (coral red) | Eyebrows, icons, provisional status, hover accents |
| `muted` | `#EFE8DB` | Filter track backgrounds |
| `muted-foreground` | `#6C675F` | Secondary text, meta labels |
| `border` | `#D6CCBC` | Dividers on light sections |
| `card` | `#FCFAF5` | Card surfaces |

Dark editorial sections use fixed deep-teal hexes (intentional, part of the look):

- Hero backdrop: `bg-[#102D35]`
- Dark content section: `bg-[#152E35]`
- Dark-section accent (soft coral): `text-[#F08992]`
- Dark-section text: `text-white` with opacity steps (`/85`, `/80`, `/75`, `/70`, `/65`, `/50`)

## Layout Rules

- **Container**: every section wraps content in `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- **Section rhythm**: use `section-rhythm` for page sections, giving 12px padding per edge on mobile, 16px on tablet, and 80px on desktop (24px / 32px / 160px total between adjacent sections). Preserve extra top spacing only for the first/hero section on a page. Add `scroll-mt-32` to sections targeted by anchor links.
- **Alternating backgrounds**: light (`bg-background`) → dark (`bg-[#152E35]`) → light (`bg-[#F5F2EB]`) → light (`bg-background`)
- **Asymmetric grids**: use fractional columns, e.g. `lg:grid-cols-[0.75fr_1.25fr]`, `lg:grid-cols-[1.2fr_0.8fr]`, `md:grid-cols-[7rem_1fr_auto]`
- **Dividers**: horizontal rules via `border-y border-border` on the list wrapper, with `border-t border-border` on rows after the first (`index > 0`). On dark sections use `border-white/15` / `divide-white/15`. Column dividers: `md:divide-x md:divide-border`
- **Page root**: `<main className="min-h-screen bg-background">`

## Typography

- **Font**: `font-sans` for body, `font-heading` for all display headings (never default sans for headings)
- **Eyebrow** (section label above heading): `text-xs font-bold uppercase tracking-[0.2em] text-secondary` — on dark sections `text-white/70` or `text-[#F08992]`
- **H1 (hero)**: `font-heading text-6xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl`
- **H2 (section)**: `font-heading text-4xl font-bold sm:text-5xl`, with `mt-3` after eyebrow
- **H3 (item title)**: `text-xl font-bold text-foreground` (or `font-heading text-2xl/3xl` for feature titles)
- **Body lead**: `text-lg leading-8 text-muted-foreground` (or `text-white/80` on dark)
- **Meta/labels**: `text-xs font-bold uppercase tracking-[0.08em–0.16em] text-muted-foreground`
- Headings are short, declarative sentences ("Know what comes next.", "Documents, ready when needed.")

## Hero Pattern

Full-bleed, bottom-aligned content, dark gradient over imagery:

```tsx
<section className="relative flex min-h-[78svh] items-end overflow-hidden bg-[#102D35] text-white">
  <Image src={...} alt={...} fill priority sizes="100vw" className="object-cover object-center" />
  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
  <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20">
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">{eyebrow}</p>
      <h1 className="mt-4 font-heading text-6xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">{description}</p>
      <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-white/85">
        {/* anchor links with lucide icon, className="inline-flex items-center gap-2 hover:text-white" */}
      </div>
    </div>
  </div>
</section>
```

Category pages use the shared `CategoryHero` component (supports `videoUrl`, `backHref`/`backLabel`, `primaryCta`) instead of hand-rolling a hero.

## Component Patterns

- **Status pill**: `rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em]` — confirmed: `bg-primary/10 text-primary`; provisional: `border border-secondary text-secondary`
- **Segmented filter**: pill group in `rounded-md border border-border bg-muted/40 p-1`; active option `bg-foreground text-background shadow-sm`, inactive `text-muted-foreground hover:text-foreground`; buttons use `aria-pressed`, container has `aria-label`
- **List rows**: CSS grid rows inside a `border-y` wrapper; date column uses `font-heading text-2xl font-bold`, meta column right-aligned on desktop (`md:justify-end`)
- **Buttons**: solid dark = `bg-foreground text-background hover:bg-foreground/85 rounded px-4 font-bold`; links = inline-flex with lucide `ArrowRight` and `group-hover:translate-x-1` arrow motion
- **Cards over imagery**: `group relative overflow-hidden rounded-md bg-black` + `Image fill` + gradient overlay `bg-gradient-to-t from-black/90 via-black/40 to-black/10`, content absolutely positioned at bottom, hover scale `group-hover:scale-105` with `transition-transform duration-700`
- **Empty states**: centered, icon (`h-8 w-8 text-muted-foreground`, `aria-hidden="true"`) + bold line + muted explanation line
- **Icons**: lucide-react only, sized `h-4 w-4` (inline) or `h-5 w-5` (feature), always `aria-hidden="true"`, colored `text-secondary` or `text-primary`
- **Numbered stages**: `font-mono text-sm text-secondary` index + heading + body, laid out in `md:grid-cols-3 md:divide-x md:divide-border` with `border-y border-border`

## Code Conventions

- **Server/client split**: pages are async server components fetching via `lib/sanityClient.ts`; interactivity (filters, state) lives in client components marked `"use client"` that receive data as typed props
- **Data fetching**: parallelize independent queries with `Promise.all`
- **Types**: strict TypeScript; define prop interfaces in `lib/*.ts` or co-located; no `any`; handle `noUncheckedIndexedAccess` (use `!` only after an explicit length check)
- **Dates**: format with `toLocaleDateString("en-BE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })`; wrap in `<time>` where semantic
- **Formatting**: Prettier, no semicolons in `apps/web` files
- **Imports**: `@/*` for app paths, `@workspace/ui/*` for shared UI; `next/image` for all imagery (always `fill` + `sizes` for full-bleed)
- **Naming**: PascalCase components, camelCase functions/variables; small pure helpers (formatters, filters) above the component in the same file
- **Accessibility**: `aria-hidden` on decorative icons, `aria-pressed` on toggles, `aria-current="page"` on active nav links, `aria-label` on nav/filter containers, semantic `<section>`/`<article>`/`<time>` elements
- **Links**: `next/link` for internal navigation; plain `<a>` only for downloads/external (`target="_blank" rel="noreferrer"`)

## Do / Don't

- **Do** copy structure and class strings from `TalentPoolHub.tsx` when building new sections
- **Do** keep one idea per section with an eyebrow + heading + supporting paragraph
- **Don't** introduce new colors, shadows, rounded card grids, or gradient buttons — the look is flat, editorial, divider-driven
- **Don't** use `bg-blue-500/10`, `text-gray-600`, or other raw Tailwind palette classes (legacy files like `PostList.tsx` still have them; do not copy that style)
- **Don't** add fixed-width wrappers around shared components; layout containers control sizing
