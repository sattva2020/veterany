# Website UI Kit

Single-product UI kit for the Veteran.Road bilingual marketing site. Recreates the landing page sections from `sattva2020/veterany/src/components/landing/*` as a click-through prototype.

## Screens included in `index.html`

1. **Sticky header** — logo disc + wordmark, nav, EN/UA switch, red "Потребую допомоги" CTA (opens modal).
2. **Hero** — navy bg with grid + gold deco ring + red radial glow, pulsing badge, progress bar.
3. **About** — photo placeholder with gold offset-border accent + 3 stat cards.
4. **Activities** — 7 program cards with watermark numbers, icon discs, hover-lift + red top bar.
5. **How We Work** — 4 step circles connected by red→gold gradient line.
6. **Join** — glassmorphism cards on navy with gold CTA.
7. **Footer** — 4-col grid, gradient top accent, social disc icons.
8. **Help Modal** — triggered from 3 places (header CTA, hero CTA, Join CTA).

All copy is Ukrainian — primary brand language. For English, consult `src/dictionaries/en.json` in the source repo.

## Not included
- `/cabinet` authenticated dashboard
- `/privacy` long-form policy page
- News + Testimonials + Partners + full Contact form
- Chat widget

These exist in the source codebase (`src/app/(frontend)/**`) and can be added if needed. The kit prioritizes the most-visited surfaces.
