[Назад к README](../README.md) · [Architecture →](architecture.md)

# Getting Started

Инструкция по развёртыванию проекта локально: от клонирования до первого логина в Payload-админку.

## Предварительные требования

| Инструмент | Минимальная версия | Зачем |
|------------|-------------------|-------|
| Node.js | 20.x (LTS), 22.x поддерживается | Next.js 15, Payload 3 |
| npm | 10.x | Менеджер пакетов |
| Git | любая актуальная | Клонирование репозитория |
| PostgreSQL | 14+ (рекомендуется 16) | База данных (локально или в Docker) |

Node 22 используется в Dockerfile — он же рекомендуется на сервере.

## Установка зависимостей

```bash
git clone https://github.com/sattva2020/veterany.git
cd veterany
npm install
```

Первая установка подтягивает Next.js 15, React 19, Payload 3 и все пиры.

## Настройка окружения

Создайте файл `.env` в корне проекта:

```bash
PAYLOAD_SECRET=<длинная-случайная-строка>
DATABASE_URI=postgres://veterany:<password>@localhost:5432/veterany
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CRM_WEBHOOK_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

Подробное описание переменных — в [Configuration](configuration.md). Никогда не коммитьте `.env`.

## Первый запуск

```bash
npm run dev
```

Next.js стартует в dev-режиме на Webpack (`next dev --webpack`). Откройте:

- `http://localhost:3000` — лендинг (редиректит на `/uk`)
- `http://localhost:3000/admin` — админка Payload

При первом заходе в `/admin` Payload попросит создать первого пользователя — это будет админ. После создания войдите и наполните коллекции тестовыми данными.

## Проверка, что всё работает

1. На главной `http://localhost:3000/uk` должны отрендериться секции Hero, About, Activities и т.д.
2. Переключение на `/en` меняет язык интерфейса (через словари) и данные CMS (через `localized` поля).
3. В админке должны быть видны коллекции: Activities, News, Partners, JoinOptions, ContactSubmissions, VeteranProfiles, Consultations, Media, Users.
4. Глобальный объект `Site Settings` должен открываться и сохраняться без ошибок.

## Полезные скрипты

| Команда | Что делает |
|---------|-----------|
| `npm run dev` | Dev-сервер Next.js (Webpack) |
| `npm run build` | Продакшен-сборка |
| `npm run start` | Запуск продакшен-сборки |
| `npm run payload` | Прямой запуск Payload CLI (миграции, seed) |
| `npm run generate:types` | Регенерация `src/payload-types.ts` из коллекций |

## Типичные проблемы

- **`PAYLOAD_SECRET` дефолтный** — Payload напечатает предупреждение. Для локалки это ок, но НЕ допускайте этого на сервере.
- **Порт 3000 занят** — запустите `PORT=3001 npm run dev` (или аналог на Windows PowerShell).
- **Postgres недоступен** — проверьте, что контейнер/служба Postgres запущена и `DATABASE_URI` указывает на неё (`docker compose up -d postgres`).

## Следующие шаги

- Прочитайте [Architecture](architecture.md) — как устроен проект.
- Настройте env-переменные по [Configuration](configuration.md).
- Разберитесь с CMS: [CMS](cms.md).

## Смотрите также

- [Architecture](architecture.md) — модули и границы зависимостей.
- [Configuration](configuration.md) — все переменные окружения.
- [Deployment](deployment.md) — как собрать Docker-образ и выкатить.
