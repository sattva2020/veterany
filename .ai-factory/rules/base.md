# Базовые правила проекта Veteran.Road

> Авто-определённые конвенции из анализа кодовой базы. Дополняйте по мере необходимости.

## Конвенции именования

- **React-компоненты:** PascalCase, `*.tsx`. Расположение — `src/components/<Feature>.tsx` или `src/components/landing/<Section>.tsx`. Имя файла совпадает с экспортируемым компонентом (`HeroSection.tsx` → `export default HeroSection`).
- **Утилиты и lib-модули:** kebab-case, `*.ts` (`landing-data.ts`, `payload-client.ts`, `i18n.ts`).
- **Payload-коллекции:** PascalCase в имени файла, named export с тем же именем (`News.ts` → `export const News: CollectionConfig`). `slug` коллекции в lowerCamelCase или одно слово без разделителей (`news`, `joinOptions`).
- **Маршруты Next.js App Router:** route segments — kebab-case (`cabinet/profile`, `crm-webhook`); группы маршрутов в круглых скобках (`(frontend)`, `(payload)`); динамические сегменты в квадратных скобках (`[locale]`).
- **Переменные/функции:** lowerCamelCase. Типы и интерфейсы — PascalCase. Константы конфигурации модуля — lowerCamelCase (`locales`, `defaultLocale`); внешние env через `process.env.UPPER_SNAKE`.
- **Словари локализации:** `src/dictionaries/<locale>.json` (двухбуквенный код локали).

## Структура модулей

- `src/app/(frontend)/` — публичный сайт, кабинет, фронтовые API-маршруты.
- `src/app/(payload)/` — админка Payload и его API. Не смешивать с фронтом.
- `src/app/(frontend)/[locale]/` — единственная точка локализованного рендеринга страниц лендинга.
- `src/collections/` — конфиги Payload-коллекций. Один файл — одна коллекция, один export.
- `src/globals/` — глобальные объекты Payload (например, `SiteSettings`).
- `src/components/` — общие компоненты; `src/components/landing/` — секции лендинга.
- `src/lib/` — серверные утилиты и клиенты (Payload local API, словари, i18n).
- `src/dictionaries/` — статические JSON-словари локализации UI (отдельно от локализованных полей CMS).
- `src/styles/` — общие стили; стили админки Payload в `src/app/(payload)/`.
- `src/migrations/` — миграции БД.
- Алиасы импортов: `@/*` → `./src/*`, `@payload-config` → `./src/payload.config.ts`. Использовать алиасы, а не относительные `../../`.

## TypeScript

- `strict: true` включён — не вводить `any` без необходимости. Где Payload возвращает «сырые» данные для клиентских компонентов, временные `as any` допустимы (см. `app/(frontend)/[locale]/page.tsx`), но изолируйте их в одном месте сериализации.
- ESM (`"type": "module"`); все импорты — ES-синтаксис, никаких `require`.
- Типы Payload генерируются: `npm run generate:types` → `src/payload-types.ts`. Не править вручную.
- `moduleResolution: bundler` — расширения `.js` в импортах TS-файлов не нужны.

## React и Next.js

- App Router. По умолчанию серверные компоненты; директива `'use client'` ставится только там, где нужны state/effects/браузерные API (`HeroSection`, `ChatWidget`, и т.п.).
- Лендинг: `dynamic = 'force-dynamic'` — данные подтягиваются на каждый запрос. Не отключать без необходимости.
- Параметры маршрута приходят как `Promise` (Next 15): `params: Promise<{ locale: string }>` и `await params`.
- Серверные данные тянуть параллельно через `Promise.all` (см. `[locale]/page.tsx`).
- Не валидировать локаль в каждом компоненте — это делает middleware и `isValidLocale` на странице.

## Локализация (i18n)

- Допустимые локали — единственный источник истины: `src/lib/i18n.ts` (`locales`, `defaultLocale`, `isValidLocale`). Любое расширение локалей — туда + `payload.config.ts` + словари.
- UI-словари: `src/dictionaries/{uk,en}.json`, доступ через `getDictionary(locale)`.
- CMS-контент локализуется самим Payload: поля помечать `localized: true`, label/options — объектом `{ uk, en }`. Сохраняйте оба языка для нового контента.
- Middleware уже добавляет префикс локали; внутри страниц используйте локализованные ссылки `/${locale}/...`.

## Payload CMS

- Адаптер БД — SQLite (`@payloadcms/db-sqlite`); URL берётся из `DATABASE_URI` или дефолтного `file:./database.db`. Не коммитить `database.db` и `.env`.
- `secret` Payload — только из `PAYLOAD_SECRET` (дефолт `default-secret-change-me` использовать запрещено в любых средах кроме локалки).
- Редактор — Lexical (`@payloadcms/richtext-lexical`).
- Доступы (`access`) задавать явно для каждой коллекции; публичный read — только там, где это осознано (`News`, `Activities`, `Partners`, `JoinOptions`).
- Для запроса контента из Next.js использовать local API через `src/lib/payload-client.ts`, не дёргать REST/GraphQL изнутри сервера.

## Стили

- Глобальные стили — `src/styles/globals.css` (CSS, без Tailwind). Sass поддерживается (`sass` в зависимостях, `sassOptions.loadPaths` для путей Payload UI).
- Стили админки Payload подключаются отдельно в `src/app/(payload)/` и трогать их без причины не нужно.
- Не смешивайте стили лендинга и админки.

## Обработка ошибок

- На страницах с `params` валидировать локаль и звать `notFound()` из `next/navigation` для 404 (см. `[locale]/page.tsx`).
- Для опциональных данных из Payload использовать защитные значения по умолчанию (`a.icon || '📋'`, `s.testimonials || []`) — не падать на пустых полях CMS.
- Не глотать ошибки в API-маршрутах: возвращать корректные статусы и логировать причину.

## Логирование

- Отдельная библиотека логирования не используется. По умолчанию — `console.*` в серверных компонентах и API-маршрутах. Не вводить кастомный логгер без обсуждения.
- Никаких чувствительных данных (токены, email пользователей, тела платежей) в логи.

## Тестирование и проверки

- В `package.json` пока нет `lint` и `test` скриптов. Если нужно гарантировать качество — заводите явные команды (`next lint`, `tsc --noEmit`, фреймворк тестов) и фиксируйте в `aif-build-automation`.
- Для типов: `npx tsc --noEmit` — единственная сейчас доступная статическая проверка.

## Безопасность и переменные окружения

- Любые секреты — только через переменные окружения. Никогда не коммитить значения. Минимально известные переменные: `PAYLOAD_SECRET`, `DATABASE_URI`, `GITHUB_TOKEN`, `DATABASE_URL` (для MCP postgres).
- `.env`, `database.db`, `tsconfig.tsbuildinfo` не должны попадать в коммиты.
- Любые публичные ссылки/URL пользователей — только из проверенных источников.

## Git и коммиты

- Базовая ветка — `master`. Новые фичи — в ветках с префиксом `feature/` (см. `.ai-factory/config.yaml`).
- Не пушить и не делать force-push без явного запроса от пользователя.
- Не использовать `--no-verify` — если хук падает, чинить причину.
