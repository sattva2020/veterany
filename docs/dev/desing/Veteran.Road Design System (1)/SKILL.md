---
name: veteran-road-design
description: Use this skill to generate well-branded interfaces and assets for «Ветеран. Дорога до нового життя» (Veteran.Road) — a Ukrainian NGO supporting veterans and their families. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping marketing pages, slide decks, fundraising materials, reports, and related artifacts in both Ukrainian (primary) and English.
user-invocable: true
---

Read the `README.md` file within this skill first — it holds the content fundamentals, visual foundations, and iconography rules that define the brand.

## What's here

- `README.md` — brand overview, content tone, visual system, iconography
- `colors_and_type.css` — drop-in CSS variables (colors + semantic type)
- `fonts/` — Oswald (heading) and Montserrat (body), served locally via `@font-face`
- `assets/` — circular monogram PNG logos
- `preview/*.html` — reference cards for every foundation (colors, type, buttons, cards, badges, spacing, shadows, radii, iconography, brand)
- `ui_kits/website/` — click-through recreation of the marketing site (hero → activities → steps → join → footer + help modal)

## How to work with this skill

If creating **visual artifacts** (slides, mocks, throwaway prototypes, fundraising one-pagers, event pages, social cards):
1. Copy `colors_and_type.css`, `fonts/`, and any logo from `assets/` into your output folder.
2. Reference `ui_kits/website/index.html` for component patterns — don't reinvent buttons, cards, step flows.
3. Output self-contained HTML files for viewing.

If working on **production code**:
1. Read README + colors_and_type.css to learn the palette + scale.
2. Lift exact hex/spacing values from the tokens block.
3. Consult the source repo (`sattva2020/veterany`) for implementation specifics (Payload CMS + Next.js).

## If invoked with no guidance

Ask the user what they want to build (web page? slide? fundraising ad? annual report spread?), ask 3–5 focused questions about audience/channel/tone, then act as an expert brand designer and output either HTML artifacts or production code per their need. Lead with Ukrainian copy unless told otherwise.

## Non-negotiables
- Uppercase Oswald for headings; mixed-case Montserrat for body
- Brand red (#C8102E) is for primary action and accent only — never for large backgrounds
- Never use purple/teal gradients, emoji cards, or rounded-with-left-border-only cards
- Icons: lucide stroke icons for UI, filled glyphs only for social
- Tone: warm, direct, dignified — never pitying, never militaristic bravado
