# AGENTS.md

> Структурная карта проекта для AI-агентов и новых разработчиков. Поддерживается AI Factory; обновляется при значимых изменениях структуры. Не дублируйте сюда содержимое других документов — ссылайтесь.

## Обзор проекта

Многоязычный (uk/en) сайт ГО «Ветеран. Дорога до нового життя» на Next.js 15 + Payload CMS v3. Лендинг, кабинет ветерана, формы обращений, бронирование консультаций, CRM-вебхук. Подробности — в `.ai-factory/DESCRIPTION.md`.

## Стек технологий

- **Язык:** TypeScript 5.7 (ESM, `"type": "module"`)
- **Фреймворк:** Next.js 15.4 App Router + React 19
- **CMS:** Payload CMS 3.82 (`@payloadcms/next`, `@payloadcms/ui`, Lexical rich text)
- **База данных:** SQLite (`@payloadcms/db-sqlite`, файл `database.db`)
- **Стили:** Sass + плоский `globals.css`
- **Изображения:** Sharp 0.34
- **GraphQL:** `graphql` 16 (для Payload)
- **Контейнеризация:** Dockerfile

## Структура проекта

```
veterany/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # публичный сайт + кабинет
│   │   │   ├── [locale]/        # локализованные страницы лендинга (uk, en)
│   │   │   ├── api/             # фронтовые API-маршруты (crm-webhook)
│   │   │   ├── booking/         # форма бронирования консультации
│   │   │   ├── cabinet/         # кабинет ветерана: login / profile / consultations
│   │   │   ├── privacy/         # страница политики приватности
│   │   │   ├── layout.tsx       # корневой layout фронта
│   │   │   └── page.tsx         # корневой редирект (без локали)
│   │   ├── (payload)/           # админка и API Payload CMS
│   │   │   ├── admin/           # админка
│   │   │   ├── api/             # REST/GraphQL Payload
│   │   │   ├── custom.scss      # кастомизация админки
│   │   │   └── layout.tsx
│   │   ├── layout.tsx           # общий root layout
│   │   ├── robots.ts            # robots.txt
│   │   └── sitemap.ts           # sitemap.xml
│   ├── collections/             # Payload-коллекции (Activities, News, Partners, JoinOptions, ContactSubmissions, VeteranProfiles, Consultations, Media, Users)
│   ├── globals/                 # Payload globals (SiteSettings)
│   ├── components/              # общие React-компоненты + landing/ — секции лендинга
│   │   └── landing/             # Hero, About, Activities, HowWeWork, News, Testimonials, Partners, Join, Contacts
│   ├── dictionaries/            # JSON-словари UI (uk.json, en.json)
│   ├── lib/                     # серверные утилиты: i18n, dictionaries, payload-client, landing-data
│   ├── styles/                  # globals.css
│   ├── migrations/              # миграции БД Payload
│   ├── middleware.ts            # i18n-роутинг (редирект на /<locale>)
│   ├── payload.config.ts        # конфигурация Payload CMS
│   └── payload-types.ts         # авто-сгенерированные типы Payload (не править вручную)
├── public/                      # статика (llms.txt, media/)
├── docs/dev/desing/             # дизайн-референсы и эмблемы (опечатка в имени папки сохранена)
├── .ai-factory/                 # контекст AI Factory (config, DESCRIPTION, ARCHITECTURE, rules)
├── .claude/                     # установленные skills и agents AI Factory
├── .mcp.json                    # MCP-серверы (github, filesystem, postgres, chromeDevtools, playwright)
├── Dockerfile                   # multi-stage сборка
├── next.config.ts               # Next.js + withPayload
├── tsconfig.json                # TypeScript (strict, paths: @/* и @payload-config)
├── package.json                 # скрипты: dev, build, start, payload, generate:types
└── database.db                  # SQLite БД (НЕ коммитить)
```

## Ключевые точки входа

| Файл | Назначение |
|------|------------|
| `src/app/(frontend)/[locale]/page.tsx` | Главная страница лендинга, собирает все секции |
| `src/app/(frontend)/[locale]/layout.tsx` | Локализованный layout фронта |
| `src/app/(payload)/admin/` | Админка Payload CMS |
| `src/middleware.ts` | i18n-редирект и матчер маршрутов |
| `src/payload.config.ts` | Регистрация коллекций, локалей, БД, секретов Payload |
| `src/lib/i18n.ts` | Источник истины по списку локалей |
| `src/lib/payload-client.ts` | Клиент Payload local API для серверных компонентов |
| `src/lib/landing-data.ts` | Загрузка данных лендинга из CMS |
| `src/lib/dictionaries.ts` | Загрузчик JSON-словарей UI |
| `next.config.ts` | Next.js + withPayload + sass loadPaths |

## Документация

| Документ | Путь | Описание |
|----------|------|----------|
| Дизайн-референсы | `docs/dev/desing/` | Скриншоты текущего дизайна, эмблемы, референсы |
| Исходное ТЗ | `Сайт ГО.docx` / `.docx.md` | Первичное описание сайта (украинский) |
| llms.txt | `public/llms.txt` | Описание для AI-краулеров |

## AI-контекстные файлы

| Файл | Назначение |
|------|------------|
| `AGENTS.md` | Структурная карта проекта (этот файл) |
| `.ai-factory/DESCRIPTION.md` | Описание проекта, стек, нефункциональные требования |
| `.ai-factory/ARCHITECTURE.md` | Архитектурные паттерны, границы модулей, правила зависимостей |
| `.ai-factory/config.yaml` | Конфигурация AI Factory (язык UI/артефактов, git, пути) |
| `.ai-factory/rules/base.md` | Базовые правила и конвенции проекта |
| `.ai-factory.json` | Манифест установленных skills и MCP |
| `.mcp.json` | Настройка MCP-серверов |

## Правила для агентов

- **Не коммитить** `database.db`, `.env`, `tsconfig.tsbuildinfo`, содержимое `.next/`, `node_modules/`.
- **Секреты только через env:** `PAYLOAD_SECRET`, `DATABASE_URI`, `GITHUB_TOKEN`, `DATABASE_URL`. Никаких хардкодов.
- **Алиасы импортов:** использовать `@/...` и `@payload-config`, не относительные пути `../../`.
- **Локализация:** любое новое UI-сообщение — в `src/dictionaries/{uk,en}.json`; любое поле CMS, видимое пользователю — `localized: true` + label/options через `{ uk, en }`.
- **Типы Payload (`src/payload-types.ts`)** генерируются командой `npm run generate:types` — не править вручную.
- **MCP `postgres`** прописан в `.mcp.json`, но проект использует SQLite — не запускать миграции/SQL-операции через postgres MCP против рабочей БД.
- **Базовая ветка git — `master`**; новые фичи в ветках `feature/...`. Не пушить и не делать force-push без явного запроса.
- **Декомпозиция shell-команд:** разбивайте составные команды.
  - Неправильно: `git checkout master && git pull`
  - Правильно: сначала `git checkout master`, затем `git pull origin master`
- **Не запускать деструктивные операции** (`rm -rf`, `git reset --hard`, `--no-verify`) без явного подтверждения пользователя.
