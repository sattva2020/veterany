[← Configuration](configuration.md) · [Назад к README](../README.md) · [Deployment →](deployment.md)

# CMS

Контент сайта управляется через Payload CMS v3. Этот документ описывает коллекции, локализацию, доступ в админку и генерацию типов.

## Админка

- URL: `http://localhost:3000/admin` (локально) или `https://<your-domain>/admin` (продакшен).
- Интерфейс админки локализован на украинский (`i18n.supportedLanguages: { uk }` в `payload.config.ts`).
- Первый пользователь создаётся при первом заходе в `/admin` — он становится админом.
- Дата-формат в админке: `dd.MM.yyyy`.

## Коллекции

| Slug | Файл | Назначение | Публичный read |
|------|------|-----------|----------------|
| `users` | `src/collections/Users.ts` | Пользователи Payload (админы, редакторы) | ❌ |
| `media` | `src/collections/Media.ts` | Загруженные изображения и файлы | — (зависит от доступа) |
| `activities` | `src/collections/Activities.ts` | Направления деятельности организации | ✅ |
| `news` | `src/collections/News.ts` | Новости (с тегами, статусом draft/published) | ✅ |
| `partners` | `src/collections/Partners.ts` | Партнёры, логотипы, ссылки | ✅ |
| `joinOptions` | `src/collections/JoinOptions.ts` | Варианты «как вступить» | ✅ |
| `contactSubmissions` | `src/collections/ContactSubmissions.ts` | Заявки из контактной формы | ❌ |
| `veteranProfiles` | `src/collections/VeteranProfiles.ts` | Профили ветеранов (кабинет) | зависит от политики |
| `consultations` | `src/collections/Consultations.ts` | Заявки на консультации, брони | зависит от политики |

### Глобалы

| Slug | Файл | Назначение |
|------|------|-----------|
| `site-settings` | `src/globals/SiteSettings.ts` | Глобальные настройки: шаги «как мы работаем», статистика, отзывы |

## Локализация контента

Payload хранит локализованные поля отдельно на каждой локали:

```ts
{
  name: 'title',
  type: 'text',
  required: true,
  localized: true,                        // ← ключевое
  label: { uk: 'Заголовок', en: 'Title' },
}
```

Правила:

- Поля, видимые пользователю (заголовок, текст, slug), помечайте `localized: true`.
- Служебные поля (даты, теги, статусы) обычно не локализуются.
- `label` у полей и `labels.singular/plural` у коллекций — объект `{ uk, en }`.
- Варианты `select` с видимыми пользователю значениями — тоже локализуются через `label: { uk, en }`.

При добавлении новой локали:
1. Добавьте код в `src/lib/i18n.ts` (`locales`).
2. Добавьте объект в `localization.locales` в `src/payload.config.ts`.
3. Создайте `src/dictionaries/<locale>.json` со всеми ключами.
4. Обновите `i18n.supportedLanguages` в `payload.config.ts` при необходимости.

## Получение данных из CMS

Запросы к Payload выполняются **на сервере** через local API:

```ts
// src/lib/payload-client.ts
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}
```

```ts
// Пример — src/lib/landing-data.ts
const payload = await getPayloadClient()
const news = await payload.find({
  collection: 'news',
  locale,
  where: { status: { equals: 'published' } },
})
```

- Не вызывайте Payload из `'use client'`-компонентов.
- Не обращайтесь к базе Postgres напрямую — hooks/access-правила Payload обязательны.

## Генерация типов

Коллекции декларативные, но TypeScript не знает о них автоматически. Типы генерируются командой:

```bash
npm run generate:types
```

Вывод — `src/payload-types.ts`. Команду запускайте после любых изменений в схемах (добавили поле, коллекцию, глобал). Файл **не править вручную**.

## Миграции БД

Миграции генерируются Payload CLI:

```bash
npx payload migrate:create    # сгенерировать миграцию по diff-у схемы
npx payload migrate           # применить новые миграции
```

Миграции живут в `src/migrations/`. В Docker продакшен-старте миграции применяются автоматически:

```dockerfile
CMD ["sh", "-c", "npx payload migrate && npm start"]
```

## Media

- Загруженные файлы хранятся в `public/media/` (обслуживаются Next.js как статика).
- Изображения обрабатываются через `sharp`.
- Коллекция `Media` — отдельная сущность Payload; другие коллекции ссылаются на неё через `type: 'upload', relationTo: 'media'`.

## Доступы

Политика `access` задаётся явно для каждой коллекции. Для публично читаемых (`news`, `activities`, `partners`, `joinOptions`) — `read: () => true`. Для внутренних (`users`, `contactSubmissions`) — ограничено. Проверяйте и задавайте явно при добавлении новой коллекции.

## Смотрите также

- [Architecture](architecture.md) — как CMS-данные доходят до лендинга.
- [Configuration](configuration.md) — env-переменные Payload (`PAYLOAD_SECRET`, `DATABASE_URI`).
- [Deployment](deployment.md) — миграции и секреты на сервере.
