# CLAUDE.md — Glottia Landing Page

Guidance for AI agents (and humans) working in this repository. Read this before making changes.

---

## Important considerations (operational guardrails)

- **Do NOT run `pnpm dev`, `pnpm build`, `astro dev`, `astro build`, or `astro preview` on every iteration** to "preview" the result. These are slow, hold the terminal, and are unnecessary for most edits. Only run a build when the user explicitly asks, or once at the end of a large multi-file change to sanity-check for compile errors — not after each small edit.
- **Do NOT install, add, or upgrade any dependency.** The stack is frozen (see below). If you believe a new package is genuinely required, **stop and ask first**.
- **Fonts:** load **DM Sans only**, via native `<link>` tags to Google Fonts in `BaseLayout.astro`. No font packages, no `@fontsource`, no self-hosting unless explicitly approved.
- **Icons:** use the inline-SVG `Icon.astro` component. Do **not** wire up `astro-icon` — no Iconify icon-set packages are installed.
- Prefer editing existing components over creating new ones. Keep the component model modular and data-driven via `i18n.ts`.

---

## Product

**Glottia** is a gamified language-learning app (ages 16–40). Users discover in-person conversation **meetups ("encuentros")** by language and level at nearby venues (e.g. *Café Central, Madrid*), join them, **check in with a QR**, then take short **quizzes** worth points. Progress is tracked as a **FluencyScore**, with **streaks**, achievements, and a weekly **ranking/leaderboard**. App bottom-nav: *Learn · Social · Practice · Profile*. Reference persona: *Sofía Martínez*. **There is no merchant/café-owner side** — cafés are venues, not customers. Source of truth for the product is the Figma file "Glottia Mock Ups". Brand mark is a lime-green coffee cup with conversation waves (`public/glottia-logo.webp`).

## Stack (frozen — do not change)

- **Astro** `6.4.2` (static output, Vercel adapter)
- **TailwindCSS** `4.3.0` via `@tailwindcss/vite`
- **tailwind-animations** `1.0.1` (CSS-only utilities)
- **astro-icon** is in `package.json` but intentionally **unused** (see guardrails)
- **@astrojs/vercel** adapter
- Package manager: **pnpm**. Node `>=22.12.0`.

## Commands (for reference — see guardrails before running)

| Command | Purpose |
|---|---|
| `pnpm dev` | Local dev server. Run only when the user asks. |
| `pnpm build` | Production build → `dist/` + `.vercel/output`. Use sparingly, e.g. one final check. |
| `pnpm preview` | Preview a built site. |

---

## Design system

Defined in `src/styles/global.css` using Tailwind v4 `@theme` + runtime CSS variables.

**Brand colors (constant across themes):**
- Primary `#AADD00` · Secondary `#7AA300` · Tertiary `#E8F5B0` · Neutral `#141414`

**Light / Dark theming:**
- Class-based dark mode: `@custom-variant dark (&:where(.dark, .dark *))`. The `.dark` class lives on `<html>`.
- Semantic tokens resolve from runtime CSS vars so a single class flips the whole UI. Use these in components instead of hard-coded colors:
  - `bg-canvas` (page), `bg-surface` / `bg-elevated` (cards)
  - `text-heading` (titles), `text-body` (paragraphs), `text-muted` (secondary)
  - `border-border`
  - `text-accent` / `bg-accent-soft` — readable green accent (darker green in light mode, lime in dark mode). **Use `text-accent`, not `text-primary`, for small text/links** — raw `#AADD00` fails contrast on light backgrounds.
- `.text-gradient-brand` — theme-aware gradient headline highlight.
- Theme toggle: a FOUC-safe `is:inline` script in `BaseLayout.astro` `<head>` sets `.dark` from `localStorage['glottia:theme']` or `prefers-color-scheme` before paint; the header button toggles and persists it.

**Fixed-light surfaces:** phone/app mockups (`mockups/HeroAppPreview`, `demo/DemoAppInterface`) and the footer are intentionally fixed (light "screens" / dark footer) regardless of site theme — they mimic real product UI / match the reference design.

**Typography:** DM Sans (400–800), loaded in the layout head.

---

## Architecture

```
src/
  styles/global.css        # @theme tokens, light/dark vars, base resets, .text-gradient-brand
  utils/i18n.ts            # EN/ES dictionaries (source of truth) + helpers
  layouts/BaseLayout.astro # <head> (SEO/OG/hreflang), theme bootstrap, ES auto-redirect,
                           # header (nav + lang switch + theme toggle), dark footer, slots
  components/
    Icon.astro             # inline-SVG icon set (name -> path map)
    sections/
      HeroSection.astro    # hero: copy + phone + floating cards + stat strip
      PlatformIntro.astro  # centered statement + 4 KPI cards
      FeatureSection.astro # REUSABLE alternating feature block; prop: index (0..1)
      CtaBand.astro        # gradient call-to-action band
      DemoSection.astro    # /demo page body (copy + interactive phone)
    mockups/               # presentational UI mockups (data from i18n)
      HeroAppPreview.astro # static app Home screen for the hero phone (greeting, FluencyScore, meetups)
      MeetupMockup.astro   # feature 1 — meetup card + floating level/points chips
      ProgressMockup.astro # feature 2 — FluencyScore ring, skill bars, weekly rank
    demo/
      MobileMockShell.astro   # pure CSS phone frame (bezel, notch, cream screen)
      DemoAppInterface.astro  # interactive demo (vanilla JS): Home → Meetup → Quiz → Ranking
  pages/
    index.astro            # EN home  → Hero, PlatformIntro, 2× FeatureSection, CtaBand
    demo.astro             # EN demo
    es/index.astro         # ES home (same composition)
    es/demo.astro          # ES demo
```

### Homepage flow (current, post-redesign)
`HeroSection → PlatformIntro → FeatureSection(0 meetups) → FeatureSection(1 progress/gamification, reversed) → CtaBand`. The footer comes from `BaseLayout`.

> Note: the old **"5W + 2H" `ProblemSolutionSection`** and `MVPSection` were removed earlier. The landing was then re-aligned to the real Figma product: the demo is the learner journey (Home → Meetup → Quiz → Ranking), and the second feature is **progress & gamification** (FluencyScore, quizzes, streaks, ranking) — the previously-invented "café/merchant dashboard" was dropped because the product has no merchant side. Keep copy faithful to the app (meetups, FluencyScore, Madrid/Café Central, CEFR levels — not bookings/PEN/Lima).

---

## Internationalization

- Source of truth: `src/utils/i18n.ts`. `en` is typed as `Dictionary`; `es` is checked against it, so the locales **cannot drift** — add a key to `en` first, then `es`.
- Routing: English at `/`, Spanish under `/es/`. `getLangFromUrl(Astro.url)` resolves the active language; components self-resolve it (pages stay thin).
- Helpers: `useTranslations(lang)`, `localizePath(path, lang)`, `alternatePath(url, target)`.
- `BaseLayout` emits canonical + `hreflang` (en / es / x-default) and a one-time `navigator.language`-based redirect from `/` to `/es/` for Spanish browsers.
- **Content is data-driven:** sections/mockups iterate over arrays/objects in the dictionary. To change copy, edit `i18n.ts` — not the templates.

---

## Conventions & standards

Project skills live in `.agents/skills/` (astro-framework, tailwind-css-patterns, frontend-design, accessibility, seo, typescript-advanced-types). Honor them. Key rules:

- **Astro components:** frontmatter order = imports → `interface Props` → destructure with defaults → logic → template. Use `class:list` for conditional classes, slots for composition. Never touch `window`/`document` in frontmatter (server-side).
- **Styling:** Tailwind utilities with semantic tokens; reserve scoped `<style>` for things utilities can't express. This is **Tailwind v4** — use `bg-linear-to-*` (not `bg-gradient-to-*`), and `size-*` tokens. A linter may auto-rewrite arbitrary values to tokens.
- **Animations:** `tailwind-animations` utilities (`animate-fade-in-up`, `animate-float`, `animate-delay-*`, `animate-duration-*`, and scroll-triggered `view-animate-*`). `global.css` imports it via `@import "tailwind-animations";` — **not** `@plugin` (the `@plugin` form breaks the production build because the package is CSS-only).
- **Accessibility:** keep the skip link, semantic landmarks (`header`/`main`/`footer`/`nav`), `aria-label`s, focus-visible rings; respect `prefers-reduced-motion` (handled globally in `global.css`).
- **Client JS:** vanilla, scoped inside component `<script>` tags (the demo screen toggle, theme toggle, hero CTA loading state). No UI framework, no state library.

---

## Assets & config

- `public/glottia-logo.webp` — brand mark (also favicon / OG image).
- `astro.config.mjs` — sets `site: "https://glottia.app"` (update to the real production domain) for canonical/OG absolute URLs; registers the Tailwind Vite plugin and Vercel adapter.
