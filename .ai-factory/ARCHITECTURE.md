# Архитектура: Modular Monolith

## Обзор

Проект `Veteran.Road` — это модульный монолит на Next.js 15 App Router, в который встроена headless CMS Payload v3. Один деплой-юнит, одна кодовая база, но строгие границы между модулями: публичный сайт (`(frontend)`), админка/API CMS (`(payload)`), CMS-домен (коллекции и глобалы), серверные сервисы (`lib/`) и UI-секции лендинга (`components/landing/`).

Этот паттерн выбран потому, что:
- Команда маленькая (1–3 человека), независимый деплой подсистем не нужен.
- Доменная сложность средняя: несколько бизнес-сущностей (новости, активности, профили ветеранов, консультации, заявки), но без многосервисной интеграции.
- Next.js + Payload жёстко связаны фреймворком — Clean Architecture/DDD дали бы лишнюю прослойку без выгоды, а плоская Layered Architecture не выдерживает рост числа коллекций и секций.
- Route Groups Next.js (`(frontend)`, `(payload)`) и Payload-коллекции уже выступают естественными границами модулей.

## Обоснование решения

- **Тип проекта:** многоязычный CMS-сайт с публичным лендингом, кабинетом ветерана и формами обращений.
- **Стек:** Next.js 15 (App Router) + React 19 + TypeScript ESM + Payload CMS 3 (SQLite/Lexical) + Sass.
- **Ключевой фактор:** один деплой, чёткое разделение «публичный сайт vs админка vs CMS-домен», возможность безболезненно добавлять новые коллекции/секции без переписывания соседей.

## Структура папок

```
src/
├── app/
│   ├── (frontend)/                  # МОДУЛЬ: публичный сайт + кабинет
│   │   ├── [locale]/                # Локализованные страницы лендинга
│   │   ├── api/                     # Фронтовые API-маршруты (crm-webhook)
│   │   ├── booking/                 # Бронирование консультаций
│   │   ├── cabinet/                 # Кабинет ветерана: login / profile / consultations
│   │   ├── privacy/                 # Политика приватности
│   │   ├── layout.tsx               # Layout фронта
│   │   └── page.tsx                 # Корневой редирект (без локали)
│   ├── (payload)/                   # МОДУЛЬ: админка и API Payload
│   │   ├── admin/
│   │   ├── api/
│   │   ├── custom.scss
│   │   └── layout.tsx
│   ├── layout.tsx                   # Общий root layout
│   ├── robots.ts
│   └── sitemap.ts
├── collections/                     # МОДУЛЬ: CMS-домен (Payload-коллекции)
│   ├── Activities.ts
│   ├── ContactSubmissions.ts
│   ├── Consultations.ts
│   ├── JoinOptions.ts
│   ├── Media.ts
│   ├── News.ts
│   ├── Partners.ts
│   ├── Users.ts
│   └── VeteranProfiles.ts
├── globals/                         # МОДУЛЬ: CMS-глобалы (SiteSettings)
│   └── SiteSettings.ts
├── components/                      # МОДУЛЬ: UI-компоненты
│   ├── landing/                     # Подмодуль: секции лендинга (Hero, About, …)
│   ├── Header.tsx / Footer.tsx / ChatWidget.tsx / …
│   ├── icons.tsx
│   └── JsonLd.tsx / Analytics.tsx
├── lib/                             # МОДУЛЬ: серверные утилиты и клиенты
│   ├── i18n.ts                      # Источник истины по локалям
│   ├── dictionaries.ts              # Загрузчик JSON-словарей
│   ├── landing-data.ts              # Сборка данных лендинга из CMS
│   └── payload-client.ts            # Local API-клиент Payload
├── dictionaries/                    # Статика: JSON-словари UI (uk, en)
├── styles/                          # Глобальные стили лендинга
├── migrations/                      # Миграции БД Payload
├── middleware.ts                    # i18n-роутинг
├── payload.config.ts                # Композиционный корень CMS-модуля
└── payload-types.ts                 # Авто-сгенерированные типы (read-only)
```

## Модули и их публичный API

| Модуль | Зона ответственности | Публичный API | Запрещено |
|--------|----------------------|---------------|-----------|
| `app/(frontend)` | Рендер публичного сайта и кабинета | Маршруты Next.js, fetch через `lib/` | Импорт из `app/(payload)`, прямой доступ к `database.db` |
| `app/(payload)` | Админка и API Payload | Стандартные роуты Payload | Импорт UI из `components/landing/` |
| `collections/`, `globals/` | Декларация схемы CMS | Named export `CollectionConfig` / `GlobalConfig` | Импорт UI-компонентов и React-логики |
| `components/` | UI-блоки и виджеты | Default export React-компонента | Прямые fetch к Payload, обращения к БД |
| `components/landing/` | Секции лендинга | Default export секции, props из `dict` + `cmsData` | Внутренние fetch'и (данные приходят пропсами с сервера) |
| `lib/` | Серверные сервисы (i18n, dictionaries, payload-client, landing-data) | Named exports функций | React-зависимости, JSX |
| `dictionaries/` | Тексты UI | JSON-файлы по локалям | Логика — только данные |

## Правила зависимостей

```
            (frontend)  ───►  components ───►  (нет fronend-зависимостей)
                │                  │
                ▼                  ▼
              lib/  ─────────►  lib/  ◄────────  (payload)
                │                                    │
                ▼                                    ▼
        collections/, globals/  ◄─── payload.config.ts
                │
                ▼
            payload (фреймворк)
```

- ✅ `app/(frontend)/**` импортирует из `components/`, `lib/`, `dictionaries/`, типов `payload-types.ts`.
- ✅ `lib/` импортирует из `collections/`, `globals/` (только типы), `payload-types.ts`, `payload.config.ts`.
- ✅ `components/landing/**` принимает данные через props; для статических текстов — через `dict` (UI-словарь), для CMS — через `cmsData` (сериализованные значения).
- ✅ `payload.config.ts` — единственная точка композиции CMS-модуля: сюда импортируются все `collections/*` и `globals/*`.
- ❌ `app/(frontend)/**` НЕ импортирует из `app/(payload)/**` (и наоборот). Если нужен общий код — вынести в `lib/`.
- ❌ `components/**` НЕ читает данные из Payload напрямую. Все запросы — в `lib/payload-client.ts` и `lib/landing-data.ts`, на сервере.
- ❌ `collections/**` и `globals/**` НЕ зависят от React, JSX, маршрутов Next.js.
- ❌ `dictionaries/**` НЕ содержат кода — только данные.
- ❌ Никто не дёргает `database.db` напрямую — только через Payload.

## Коммуникация между модулями

- **Сервер → CMS:** серверные компоненты и сервисы вызывают Payload через local API в `lib/payload-client.ts`. Никаких HTTP-вызовов к `(payload)/api` из фронта.
- **CMS → Frontend:** данные передаются как сериализованные `cmsData` через props. Серверная страница (`app/(frontend)/[locale]/page.tsx`) собирает данные из `getLandingData()` и `getDictionary()` параллельно через `Promise.all`, нормализует и передаёт в client/server-компоненты.
- **Локализация:** middleware (`src/middleware.ts`) → префикс `/uk|/en`; страница валидирует через `isValidLocale` и зовёт `notFound()` иначе. UI-словари — `lib/dictionaries.ts`, CMS-локализация — поля `localized: true` в коллекциях.
- **Внешние интеграции:** входящие интеграции (CRM-вебхук) — изолированный route в `app/(frontend)/api/crm-webhook/`. Исходящие — будущие сервисы помещать в `lib/integrations/<vendor>.ts`.
- **State в браузере:** клиентские компоненты с `'use client'` управляют только своим UI-состоянием. Глобальный store не вводить, пока нет реальной необходимости.

## Ключевые принципы

1. **Стабильные границы маршрутов.** Route groups `(frontend)` и `(payload)` неизменяемы — они задают границы между публичной и административной частями. Не создавать «общую» группу, общий код выносить в `lib/` или `components/`.
2. **CMS — единственный источник динамического контента.** Любой контент, который редактируется не разработчиком, живёт в Payload-коллекциях/глобалах. UI читает его через `lib/`, а не хардкодит.
3. **Серверный fetch, чистые компоненты.** Запросы к Payload — на сервере. Клиентские компоненты получают готовые сериализованные данные. Нельзя вызывать Payload local API из `'use client'`-компонента.
4. **Локализация — слой, а не if.** Любой пользовательский текст идёт либо через UI-словарь (`dictionaries/<locale>.json`), либо через локализованное поле Payload. Не разбрасывать `if (locale === 'uk') ...` по компонентам.
5. **Минимум `any`.** Используйте сгенерированные типы `payload-types.ts`. Допустимо `as any` точечно в слое сериализации (как в `app/(frontend)/[locale]/page.tsx`), но не глубже одного уровня.
6. **Декларативная конфигурация Payload.** Коллекции и глобалы — чистые конфиги без сторонних эффектов. Хуки/access-функции стараться держать рядом с коллекцией, в том же файле.
7. **Совместимость с одним деплоем.** Не вводить отдельные сервисы/процессы без необходимости. Фоновые задачи — через Payload jobs или Next.js route handlers с явным запуском.

## Примеры кода

### Получение данных лендинга на сервере

```ts
// src/app/(frontend)/[locale]/page.tsx
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { getLandingData } from '@/lib/landing-data'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const [dict, data] = await Promise.all([
    getDictionary(locale as Locale),
    getLandingData(locale),
  ])

  // Сериализация для клиентских компонентов — единственное место, где допустим `as any`.
  const cmsActivities = data.activities.map((a: any) => ({
    title: a.title || '',
    description: a.shortDescription || '',
    icon: a.icon || '📋',
  }))

  return <ActivitiesSection locale={locale} dict={dict.activities} cmsData={cmsActivities} />
}
```

### Декларация Payload-коллекции (доменный слой)

```ts
// src/collections/News.ts
import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: { uk: 'Новина', en: 'News Item' },
    plural: { uk: 'Новини', en: 'News' },
  },
  access: { read: () => true },           // явная политика доступа
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'tag', 'publishDate', 'status'] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true,
      label: { uk: 'Заголовок', en: 'Title' } },
    { name: 'excerpt', type: 'textarea', required: true, localized: true,
      label: { uk: 'Короткий опис', en: 'Excerpt' } },
    // …
  ],
}
```

### Композиционный корень CMS

```ts
// src/payload.config.ts
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users, Media, Activities, News, Partners, JoinOptions,
         ContactSubmissions, VeteranProfiles, Consultations } from './collections/*'
import { SiteSettings } from './globals/SiteSettings'

export default buildConfig({
  collections: [Users, Media, Activities, News, Partners, JoinOptions,
                ContactSubmissions, VeteranProfiles, Consultations],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || 'file:./database.db' } }),
})
```

### Серверный сервис (granica `lib/`)

```ts
// src/lib/payload-client.ts (упрощённо)
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}
```

```ts
// src/lib/landing-data.ts (упрощённо)
import { getPayloadClient } from './payload-client'

export async function getLandingData(locale: string) {
  const payload = await getPayloadClient()
  const [activities, news, partners, joinOptions, settings] = await Promise.all([
    payload.find({ collection: 'activities', locale, limit: 100 }),
    payload.find({ collection: 'news', locale, where: { status: { equals: 'published' } } }),
    payload.find({ collection: 'partners', locale }),
    payload.find({ collection: 'joinOptions', locale }),
    payload.findGlobal({ slug: 'site-settings', locale }),
  ])
  return {
    activities: activities.docs,
    news: news.docs,
    partners: partners.docs,
    joinOptions: joinOptions.docs,
    settings,
  }
}
```

### Локализация UI

```ts
// src/lib/i18n.ts — единственный источник истины по локалям
export const locales = ['uk', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'uk'
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
```

## Анти-паттерны

- ❌ **Импорт из `app/(payload)` в `app/(frontend)`** (или наоборот). Если код общий — переносите в `lib/` или `components/`.
- ❌ **Fetch к Payload из клиентского компонента.** Все запросы — на сервере, через `lib/payload-client.ts`. Клиент получает уже готовые `cmsData` props.
- ❌ **Хардкод текста в компоненте.** UI-строки — в `dictionaries/<locale>.json`, контент — в Payload-коллекциях. Не плодить `if (locale === ...)`.
- ❌ **`'use client'` без причины.** Серверный рендеринг по умолчанию; клиентские компоненты — только при необходимости state/effects/браузерных API.
- ❌ **Любой код в `dictionaries/`.** Это статические JSON-словари, не модули.
- ❌ **Прямой SQL/доступ к `database.db`.** Только через Payload. Это сохраняет инварианты, hooks и access-контроль.
- ❌ **Ручная правка `payload-types.ts`.** Файл генерируется (`npm run generate:types`); ручные изменения будут затёрты.
- ❌ **Создание «общей» route group `(shared)`** или утилит, которые импортируются и из `(frontend)`, и из `(payload)`. Общий слой — это `lib/` и `components/`, а не ещё одна группа маршрутов.
- ❌ **Глобальный state-менеджер** (Redux/Zustand/Jotai) без явной необходимости. Пока всё хорошо живёт в локальном state клиентских компонентов и серверном fetch.
- ❌ **Использование `process.env.PAYLOAD_SECRET || 'default-secret-change-me'`** в продакшене. Дефолт допустим только локально; на любом сервере secret должен прийти из окружения.
