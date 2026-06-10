# Veteran.Road

> Многоязычный сайт ГО «Ветеран. Дорога до нового життя» с headless CMS и кабинетом ветерана.

Next.js 15 + Payload CMS v3 + PostgreSQL. Публичный лендинг, кабинет ветерана, формы обращений и бронирование консультаций. Локализация uk/en одновременно на уровне роутинга (middleware) и контента CMS.

## Быстрый старт

```bash
npm install
# создайте .env по списку переменных из docs/configuration.md
npm run dev            # http://localhost:3000
```

Админка Payload: `http://localhost:3000/admin` (после `npm run dev`).

## Ключевые возможности

- **Лендинг на двух языках** — секции Hero, About, Activities, How We Work, News, Testimonials, Partners, Join, Contacts с локализованными префиксами `/uk` и `/en`.
- **Payload CMS v3** — 9 коллекций (Activities, News, Partners, JoinOptions, ContactSubmissions, VeteranProfiles, Consultations, Media, Users) и глобал SiteSettings.
- **Кабинет ветерана** — логин, профиль, история консультаций.
- **Бронирование консультаций** и CRM-вебхук для интеграций.
- **SEO/AI-search** — `robots.ts`, `sitemap.ts`, JSON-LD, `llms.txt` для AI-краулеров.
- **Docker-сборка** — готовый multi-stage Dockerfile.

## Пример использования

Лендинг рендерится сервером, данные собираются параллельно из CMS и словарей:

```ts
// src/app/(frontend)/[locale]/page.tsx
const [dict, data] = await Promise.all([
  getDictionary(locale as Locale),
  getLandingData(locale),
])
```

Новая новость создаётся в админке `/admin`, попадает в коллекцию `news` и автоматически появляется в секции News после рендеринга страницы.

---

## Документация

| Руководство | Описание |
|-------------|----------|
| [Getting Started](docs/getting-started.md) | Установка, локальный запуск, первый логин в админку |
| [Architecture](docs/architecture.md) | Структура проекта, модули, границы зависимостей |
| [Configuration](docs/configuration.md) | Переменные окружения, конфиг-файлы, алиасы |
| [CMS](docs/cms.md) | Коллекции Payload, локализация контента, генерация типов |
| [Deployment](docs/deployment.md) | Docker-сборка, миграции, продакшен-чеклист |

Базовые правила и конвенции проекта — в `.ai-factory/rules/base.md`.
Архитектурные решения — в `.ai-factory/ARCHITECTURE.md`.

## Лицензия

Проприетарный проект ГО «Ветеран. Дорога до нового життя». Все права защищены.
