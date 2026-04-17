# Veteran.Road Design System

Design system for **NGO "Ветеран. Дорога до нового життя"** (Veteran. Road to a New Life), a Ukrainian non-governmental organization that provides comprehensive support for veterans and their families returning to civilian life.

> Founded 2021, based in Kyiv, Ukraine. Seven core programs: psychological support, rehabilitation, legal aid, employment, housing, family support, education.

## Index of this design system

Root files:
- `README.md` — this file (brand overview, content + visual foundations, iconography)
- `SKILL.md` — Agent Skill manifest for cross-tool use
- `colors_and_type.css` — tokens: colors + semantic type + radii + shadows + spacing
- `fonts/` — Oswald (heading) + Montserrat (body) WOFF2s, loaded via `@font-face`
- `assets/emblem-monogram.png` — circular "ВД" monogram

Folders:
- `preview/` — one HTML card per foundation (colors, type, buttons, forms, cards, steps, badges, brand, iconography, radii, shadows, spacing). Rendered in the Design System tab.
- `ui_kits/website/` — click-through recreation of the landing page (hero → about → activities → steps → join → footer + help modal). Start from `ui_kits/website/index.html`.

## Sources
- **GitHub codebase**: `sattva2020/veterany` (default branch `master`) — Next.js 15 + Payload CMS 3 + React 19. Bilingual (Ukrainian / English).
- **Brand asset**: `emblem-monogram.png` from the repo root — the official circular monogram "ВД" logo.
- **Copy reference**: `public/llms.txt`, `src/dictionaries/uk.json`, `src/dictionaries/en.json`.
- **CSS source of truth**: `src/styles/globals.css` (60 KB of tokens and component styles).

---

## Content Fundamentals

**Tone.** Solemn, warm, direct. Copy is written **for** veterans and their families — never about them. The brand treats veterans as active subjects returning to a new life, not as passive recipients of help.

**Voice.** First person plural ("Ми" / "We"), second person for the reader ("ви" / "you"). Never clinical.

**Bilingual.** Ukrainian is primary, English is secondary. All UI strings live in `src/dictionaries/uk.json` + `en.json`. Do not write Russian.

**Casing.** Headings/CTAs are in **UPPERCASE** via CSS `text-transform`. Body copy uses normal sentence case. Ukrainian quotation marks are guillemets: «Ветеран». English uses curly quotes "like this".

**No emoji in copy.** The codebase DOES use single emoji as program/card icons (🧠 💪 ⚖️ 💼 🏠 👨‍👩‍👧‍👦 📚 🤝 🏢 💡 ⭐) — these are **placeholders**, replace with proper SVG/icon work whenever possible. Never emoji in prose.

**Sample copy — the voice in action:**
- Hero: "Ветеран. *Дорога до нового життя.* Підтримка. Відновлення. Нові можливості."
- About: "Ми поруч, коли це найбільш потрібно."
- Mission: "Повернення — це не кінець служби, а початок нового шляху."
- CTA: "Потребую допомоги" / "I Need Help" — direct, permission-giving.
- Closing: "Працюємо щоденно, щоб жоден захисник не залишився наодинці."

**Numbers are credibility.** Stats are shown prominently (500+ veterans helped, 50+ partners, 24/7 hotline, 3 years active). Always paired with labels, never floating.

---

## Visual Foundations

**Palette.** Three brand colors, used deliberately:
- **Navy** `#0a1628` — primary ground. Full-bleed hero, footer, "Join" section. Commands gravity and authority.
- **Red** `#c8102e` — singular CTA color. Never decorative. Used for primary buttons, the logo disc, eyebrow labels, hover accents.
- **Gold** `#d4a843` — secondary accent. Subtitles on dark, hover borders, "donate/join" variant button, decorative ring on images.
- Supporting: **Cream** `#faf7f2` (warm light sections), **White** `#ffffff` (cards), **Navy-mid** `#162a4a`, **Blue** `#1e3a5f` (gradient fills).

**Typography.** Two families, no third.
- **Oswald** for headings (400/500/600/700/800). Condensed, serious, state-memorial feel. Always uppercase for H1/H2/hero.
- **Montserrat** for body (400/500/600/700). Geometric, clean, readable.
- No serif. No script. Numerals use `font-variant-numeric: tabular-nums`.

**Backgrounds.**
- Dark sections use layered radial glows (`rgba(200,16,46,0.08)`), grid-line patterns at 4% opacity, and decorative rotated rounded squares with gold borders at ~12% opacity.
- Light sections (`about`, `news`) overlay a subtle fractal-noise SVG at 2–2.5% opacity for texture.
- **No gradients as primary fills** — gradients appear only as (a) hero bg layered over navy, (b) subtle top-border accents on footer, (c) progress bars (red → gold).

**Imagery.** Photography should be warm, documentary, human-focused. Real veterans and real moments — never stock. Images are placed in rounded 16px containers with a gold offset-border accent behind them (`bottom: -12px; right: -12px`).

**Animation.**
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)` (out), `cubic-bezier(0.65, 0, 0.35, 1)` (in-out). Duration 0.3–0.9s.
- Entrances: fade-up 30px, staggered 0.1s between siblings. Intersection-Observer driven.
- Pulsing red dot on hero badge (2s infinite). Hero bg has subtle parallax.
- No bounce, no spring, no "fun" motion. Motion is purposeful and quiet.

**Hover.**
- Buttons: `translateY(-2px)` + colored shadow (`0 8px 32px rgba(200,16,46,0.4)`).
- Cards: `translateY(-6px)` + `0 20px 56px rgba(10,22,40,0.12)`, border-color fades to transparent.
- Links: underline grows from left in red, 2px, 0.3s.
- Activity cards: top red accent bar scales from 0→100% left-to-right; bottom gold glow line expands from center.
- Icons in cards invert on hover (bg fills red, icon turns white, `scale(1.08)`).

**Press.** Buttons don't dramatically shrink. Implied press is via the return of translateY to 0.

**Borders.** `#e0dbd3` cream-dark for all light-surface borders, always 1px. On dark, `rgba(255,255,255,0.12)`. Hover borders use red or gold depending on surface.

**Shadows.** Two systems:
- **Neutral** (on light): `0 4px 16px rgba(10,22,40,0.06)` → `0 20px 56px rgba(10,22,40,0.12)`.
- **Colored** (on CTA): red `0 8px 32px rgba(200,16,46,0.4)`, gold `0 8px 32px rgba(212,168,67,0.3)`.

**Radii.** 4 (lang switch), 6 (header button), 8 (primary button), 10 (form field), 12–16 (cards), 20 (form panel/modal), 50% (avatars, logo disc, step numbers), 100px (pill badge).

**Cards.** White `#fff` fill, 1px `#e0dbd3` border, `border-radius: 16px`, padding `40px 32px` (feature) or `28px` (compact). Hover lifts -6px.

**Transparency & blur.** Used sparingly: glassmorphism appears on `.join-card` (`rgba(255,255,255,0.06)` + `backdrop-filter: blur(12px)`) and on the scrolled header (`rgba(10,22,40,0.97)` + blur 12px). Never decorative blur.

**Layout.** Max container width 1200px, 24px gutter. 12-column mental model but CSS Grid is primary. Hero is full-viewport min-height. Sections are `120px 0` vertical padding.

**Custom cursor.** Primary buttons override cursor with a 32x32 SVG — red disc + white play triangle. This is brand signature. Outline buttons use a navy+gold variant.

**Numeric emphasis.** Stats use tabular-nums; large numerical watermarks appear faint cream-dark behind activity cards (`.card-number`, 48px 800-weight) — gives each card a quiet ordinal.

---

## Iconography

**Custom React icon set.** `src/components/icons.tsx` ships 22+ hand-written SVG icons at 24×24 viewBox, 2px stroke, rounded caps, no fill (for UI) or solid fill (for social). Style matches **Lucide Icons** / **Feather Icons** exactly — stroke-based, geometric, 2px weight. See `assets/icons.tsx` in this design system.

**Substitution guidance.** If you need an icon not shipped in `icons.tsx`, pull from **Lucide** (`https://unpkg.com/lucide-static@latest/icons/<name>.svg`) — same visual language. Never mix with filled/chunky icon sets (Material, Heroicons-solid).

**Social icons are filled.** Facebook, Instagram, YouTube, Telegram, TikTok, Viber use brand-accurate filled glyphs at 14–18px inside 40–44px circular outlined containers.

**Program icons use single emoji** in the current codebase (🧠 psychological, 💪 rehab, ⚖️ legal, 💼 employment, 🏠 housing, 👨‍👩‍👧‍👦 family, 📚 education). These are temporary — treat as design debt. When designing new surfaces, prefer the outline SVG style of `icons.tsx` or keep the emoji if that's what you're matching.

**Never invent SVG illustrations.** The brand does not use hand-drawn illustrations. If imagery is needed, use a photography placeholder rectangle with the cream-dark overlay style shown in `about-image`.

**Unicode characters as icons.** Not used. Avoid.

---

## Index of this design system

```
README.md                     ← this file
SKILL.md                      ← Agent-SKills compatible entry point
colors_and_type.css           ← CSS custom properties for colors + type
assets/
  emblem-monogram.png         ← official circular monogram logo
  icons.tsx                   ← full SVG icon set (copied from codebase)
preview/
  *.html                      ← registered design-system preview cards
ui_kits/
  website/                    ← landing-page UI kit (primary product)
    index.html                ← interactive recreation
    *.jsx                     ← componentized building blocks
```

### UI kits

The repo is a single product: a **bilingual Next.js marketing + cabinet website**. There is one UI kit:
- `ui_kits/website/` — landing page, help modal, chat widget, authenticated "Cabinet" dashboard.

No mobile app, no desktop app, no separate marketing site. The Payload CMS admin UI is out of scope (it's Payload's built-in UI, not designed by this brand).

---

## Substitutions & caveats

- **Fonts are loaded from Google Fonts CDN** — Oswald + Montserrat. The original repo also loads from Google Fonts, so this is a 1:1 match, no substitution.
- **Emblem PNG is the only raster asset** shipped. No photography ships with the codebase — all photos are placeholder rectangles labeled "Фото команди" / "Фото сесії".
- **Program icons are emoji** in the codebase; flagged as design debt above.
