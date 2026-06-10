# Veterany Project — Claude Code Context

## Project
lightrag_project: veterany

## What This Is
Website for Ukrainian veterans NGO "Ветеран. Дорога до нового життя" (Veteran. Road to a New Life).
Built with **Next.js 15 + Payload CMS 3 + PostgreSQL + React 19**.

## Current State (2026-04-17)
- **Bilingual**: UK (default) + EN with middleware auto-detection
- **CMS**: Payload with localization, all content manageable via admin
- **SEO**: sitemap.xml, robots.txt, JSON-LD, llms.txt
- **Design System**: `docs/dev/desing/Veteran.Road Design System (2)/` — from Claude Design
- **Deployed**: Hetzner 159.69.186.215, Docker Compose в /opt/veterany (см. docker-compose.yml)
- **Admin**: `/admin` — Ukrainian UI, all collections + Site Settings with 9 tabs

## Key Architecture
```
src/
  app/(frontend)/[locale]/    — i18n routing (uk/en)
  app/(frontend)/[locale]/page.tsx — main page, fetches CMS data
  components/landing/         — 9 section components (Hero, About, Activities, etc.)
  components/Header.tsx       — locale-aware with language switcher
  dictionaries/uk.json, en.json — static UI strings
  globals/SiteSettings.ts     — 9 tabs (General, Hero, Contacts, Social, About, Details, How We Work, Testimonials, SEO)
  collections/                — Activities, News, Partners, JoinOptions, etc.
  lib/landing-data.ts         — CMS data fetching
  lib/i18n.ts                 — locale config
  middleware.ts               — Accept-Language + cookie detection
  styles/globals.css          — design system tokens (shadows, radii, spacing)
```

## CMS Data (filled via API)
- Site Settings: all tabs filled (UK + EN)
- Activities: 7 items with emoji icons (UK + EN)
- News: 3 published articles (UK + EN)
- Partners: 13 with uploaded logos
- JoinOptions: 4 items (UK + EN)

## IMPORTANT: Array fields in SiteSettings
`localized: true` was REMOVED from fields inside arrays (stats.label, steps.title/description, testimonials.*) because Payload SQLite adapter doesn't handle localized fields inside arrays properly. These fields store single-language values.

## NEXT TASK: Redesign with Variant C
Source: `docs/dev/desing/Veteran.Road Design System (2)/redesign/`
Files: index.html, sections.css, app.js, i18n.js, placeholder.js, testimonials.js, timeline.js

### What to implement:
1. **Hero Variant C (Story-format)** — two-column: left text with drop-cap story + CTA, right portrait photo with caption. Replace current HeroSection.
2. **Timeline Section** — interactive 4-step timeline with animated progress line, detail card expansion, replaces "Схема роботи"
3. **Testimonials Carousel** — full-width carousel with photo + quote + audio player UI, replaces static testimonials grid

### CSS tokens already synced in globals.css:
--shadow-sm/md/lg/xl/red/gold, --radius-sm/md/lg/xl/2xl/pill, --s-1 through --s-30

## Admin Credentials
Никогда не хранить учётные данные в репозитории. Доступ к админке — у владельца проекта (менеджер паролей).

## Hosting
- Hetzner 159.69.186.215, Docker Compose в /opt/veterany (без Dokploy)
- Persistent volumes: postgres-data (БД) + media-files (/app/public/media)
- After DB wipe: миграции применяются на старте контейнера; первый админ создаётся через /admin; сид-данные — scripts/*.mjs с env SEED_* (запускать из PowerShell — bash на Windows портит UTF-8 кириллицу)

## Design System Colors
Navy #0a1628, Red #c8102e, Gold #d4a843, Cream #faf7f2
Fonts: Oswald (headings), Montserrat (body)
