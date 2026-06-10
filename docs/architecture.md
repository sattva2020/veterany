[← Getting Started](getting-started.md) · [Назад к README](../README.md) · [Configuration →](configuration.md)

# Architecture

Высокоуровневый взгляд на структуру проекта. Полные правила зависимостей и примеры кода — в `.ai-factory/ARCHITECTURE.md`.

## Паттерн

**Modular Monolith.** Один деплой, чёткие границы между модулями:

- `app/(frontend)` — публичный сайт и кабинет
- `app/(payload)` — админка и API Payload CMS
- `collections/`, `globals/` — декларативная схема CMS
- `components/` — UI (`landing/` для секций лендинга)
- `lib/` — серверные сервисы (i18n, словари, Payload-клиент, landing-data)
- `dictionaries/` — JSON-словари UI
- `styles/`, `migrations/`, `middleware.ts`, `payload.config.ts`

## Структура директорий

```
src/
├── app/
│   ├── (frontend)/     # публичный сайт + кабинет
│   │   ├── [locale]/   # /uk, /en — локализованные страницы лендинга
│   │   ├── api/        # фронтовые API-маршруты (crm-webhook)
│   │   ├── booking/    # бронирование консультаций
│   │   ├── cabinet/    # login / profile / consultations
│   │   └── privacy/
│   ├── (payload)/      # админка и API Payload
│   ├── robots.ts
│   └── sitemap.ts
├── collections/        # Payload-коллекции (9 штук)
├── globals/            # SiteSettings
├── components/
│   └── landing/        # секции лендинга
├── lib/                # i18n, dictionaries, payload-client, landing-data
├── dictionaries/       # uk.json, en.json
├── styles/globals.css
├── migrations/
├── middleware.ts       # i18n-редирект
├── payload.config.ts   # композиционный корень CMS
└── payload-types.ts    # авто-сгенерированные типы
```

## Границы модулей и правила зависимостей

| Модуль | Может импортировать | Не может |
|--------|--------------------|----------|
| `app/(frontend)` | `components/`, `lib/`, `dictionaries/`, типы `payload-types.ts` | `app/(payload)` |
| `app/(payload)` | стандартные Payload-зависимости | `components/landing/` |
| `collections/`, `globals/` | `payload` и его типы | React, JSX, Next.js-роуты |
| `components/landing/` | дочерние UI-компоненты | Payload-клиенты, fetch-запросы |
| `lib/` | `collections/`, `globals/` (только типы), `payload-config` | JSX/React-компоненты |
| `dictionaries/` | только данные, не код | любые модули |

## Как собираются данные лендинга

1. Запрос на `/` → middleware добавляет локаль → `/uk` (или `/en` по `Accept-Language`).
2. Next.js рендерит `app/(frontend)/[locale]/page.tsx` (серверный компонент, `dynamic = 'force-dynamic'`).
3. Страница параллельно через `Promise.all` получает:
   - `getDictionary(locale)` — UI-словарь из `src/dictionaries/<locale>.json`
   - `getLandingData(locale)` — CMS-данные через `getPayloadClient()` (local API)
4. Данные сериализуются (plain JS-объекты) и передаются в клиентские секции как props.

```ts
const [dict, data] = await Promise.all([
  getDictionary(locale as Locale),
  getLandingData(locale),
])
```

## Локализация

Два независимых слоя:

- **Роутинг:** `src/middleware.ts` добавляет префикс `/uk` или `/en`, читает cookie `NEXT_LOCALE` и `Accept-Language`. Источник допустимых локалей — `src/lib/i18n.ts`.
- **Контент:** Payload localization (`localization` в `payload.config.ts`). Поля с `localized: true` хранятся отдельно на каждой локали. Админка — только на украинском (`supportedLanguages: { uk }`).

Подробнее — в [CMS](cms.md).

## Ключевые инварианты

- Серверные компоненты по умолчанию; `'use client'` — только при необходимости state/effects.
- Запросы к Payload — на сервере, через `lib/payload-client.ts`. Клиент получает готовые `cmsData` props.
- Все пользовательские строки — через словари или локализованные поля Payload.
- `src/payload-types.ts` — сгенерирован; не править вручную.
- Прямой SQL-доступ к базе Postgres запрещён — только через Payload (Local API / миграции).

## Смотрите также

- [Configuration](configuration.md) — переменные окружения и алиасы импортов.
- [CMS](cms.md) — коллекции, локализация контента, генерация типов.
- [Deployment](deployment.md) — как это собирается и запускается в продакшене.
