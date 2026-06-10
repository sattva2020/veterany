[← Architecture](architecture.md) · [Назад к README](../README.md) · [CMS →](cms.md)

# Configuration

Переменные окружения, конфигурационные файлы и алиасы проекта.

## Переменные окружения

Живут в `.env` в корне проекта. Файл **не должен** попадать в git.

| Переменная | Обязательна | По умолчанию | Описание |
|------------|-------------|--------------|----------|
| `PAYLOAD_SECRET` | ✅ да | `default-secret-change-me` (только dev) | Секрет Payload для подписи JWT. Любая длинная случайная строка. |
| `DATABASE_URI` | ✅ да | — | Строка подключения PostgreSQL: `postgres://user:pass@host:5432/dbname`. В production обязательна — без неё приложение не стартует. |
| `NEXT_PUBLIC_SITE_URL` | ✅ да | `http://localhost:3000` | Полный URL сайта. Используется в `sitemap.ts` и SEO-метаданных. |
| `CRM_WEBHOOK_URL` | ⚠️ при интеграции | — | URL для пересылки обращений в CRM (`src/app/(frontend)/api/crm-webhook`). |
| `NEXT_PUBLIC_GA_ID` | ⚪ опционально | — | ID Google Analytics 4 (`G-XXXXX…`). |
| `NEXT_PUBLIC_META_PIXEL_ID` | ⚪ опционально | — | ID Meta Pixel. |
| `DATABASE_URL` | ⚪ опционально | — | Используется только MCP-сервером `postgres` (см. `.mcp.json`) для инструментов разработки. |
| `GITHUB_TOKEN` | ⚪ опционально | — | Использует MCP-сервер `github`. |
| `PORT` | ⚪ опционально | `3000` | Порт Next.js-сервера. |
| `NEXT_TELEMETRY_DISABLED` | ⚪ опционально | `0` | В Dockerfile установлено `1`. |

### Генерация `PAYLOAD_SECRET`

Любая длинная случайная строка, например:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Никогда** не используйте дефолтное значение на сервере.

## Конфигурационные файлы

| Файл | Что конфигурирует |
|------|-------------------|
| `next.config.ts` | Next.js + `withPayload`. Sass `loadPaths` подключают стили Payload UI. |
| `tsconfig.json` | TypeScript (strict, ES2017 target, ESM, `paths`). |
| `src/payload.config.ts` | Payload: коллекции, глобалы, локализация, БД, редактор, секрет. |
| `src/middleware.ts` | i18n-редирект, матчер маршрутов. |
| `src/lib/i18n.ts` | Источник истины по локалям (`['uk', 'en']`, default `uk`). |
| `Dockerfile` | Сборка продакшен-образа (Node 22 Alpine). |
| `.mcp.json` | MCP-серверы для AI-агентов (github, filesystem, postgres, chromeDevtools, playwright). |
| `.ai-factory/config.yaml` | Настройки AI Factory (язык, git, пути). |

## Алиасы импортов

Определены в `tsconfig.json`:

| Алиас | Путь | Использование |
|-------|------|---------------|
| `@/*` | `./src/*` | Любые внутренние модули: `import { locales } from '@/lib/i18n'`. |
| `@payload-config` | `./src/payload.config.ts` | Используется Payload runtime: `import config from '@payload-config'`. |

Относительные пути `../../` в импортах **не использовать**.

## Локали и словари

- Список доступных локалей задаётся в `src/lib/i18n.ts` (`locales`, `defaultLocale`). Это единственный источник истины для фронта и middleware.
- Payload-локализация настроена в `src/payload.config.ts` (`localization.locales`, `defaultLocale`, `fallback: true`).
- UI-словари — в `src/dictionaries/<locale>.json`. Добавление новой локали требует:
  1. добавить код в `src/lib/i18n.ts`;
  2. добавить `locale` в `payload.config.ts`;
  3. создать `src/dictionaries/<locale>.json`;
  4. обновить `supportedLanguages` в `i18n` админки Payload при необходимости.

## Что лежит в `.gitignore`

На всякий случай убедитесь, что игнорируется:

```
node_modules/
.next/
.env
database.db
database.db-*
tsconfig.tsbuildinfo
docs-html/
```

Файл `Сайт ГО.docx` содержит исходное ТЗ — оставайтесь осторожны при коммитах с `git add .`.

## Смотрите также

- [Getting Started](getting-started.md) — как создать `.env` и запустить локально.
- [CMS](cms.md) — параметры локализации и коллекций.
- [Deployment](deployment.md) — какие переменные окружения нужны на сервере.
