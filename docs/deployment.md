[← CMS](cms.md) · [Назад к README](../README.md)

# Deployment

Сборка и деплой продакшен-версии. Основной путь — Docker-образ из корневого `Dockerfile`.

## Продакшен-чеклист

- [ ] `PAYLOAD_SECRET` — длинная случайная строка, НЕ дефолтная.
- [ ] `DATABASE_URI` — строка подключения PostgreSQL (`postgres://user:pass@host:5432/dbname`).
- [ ] `NEXT_PUBLIC_SITE_URL` — полный URL с протоколом (`https://veteran.example`).
- [ ] `.env` с секретами НЕ в образе — только через переменные окружения контейнера.
- [ ] Volume для данных Postgres (`/var/lib/postgresql/data`) — иначе БД потеряется при пересоздании контейнера.
- [ ] Volume для `public/media` — иначе загруженные файлы потеряются.
- [ ] HTTPS на reverse-proxy (nginx/Caddy/Traefik).
- [ ] SEO: `NEXT_PUBLIC_SITE_URL` совпадает с реальным доменом, `robots.ts` и `sitemap.ts` отдают правильные URL.

## Сборка Docker-образа

```bash
docker build -t veteran-road:latest .
```

Что делает `Dockerfile`:

1. Базовый образ `node:22-alpine` + `libc6-compat` (для нативных модулей).
2. `npm ci --production=false` — все зависимости, включая dev.
3. `npx payload generate:importmap` — importmap для админки.
4. Копирует Payload UI CSS в `src/app/(payload)/payload-base.css` и `payload-components.css`.
5. Делает `npm run build` с dummy `PAYLOAD_SECRET=build-time-secret-placeholder` и stub `DATABASE_URI` (только на этапе сборки; живая БД для сборки не нужна).
6. На старте контейнера: `npx payload migrate && npm start`.

**Важно:** dummy-секрет в Dockerfile используется только чтобы Payload не падал на этапе `next build`. В рантайме нужно передать реальный `PAYLOAD_SECRET` через переменные окружения.

## Запуск контейнера

```bash
docker run -d \
  --name veteran-road \
  -p 3000:3000 \
  -e PAYLOAD_SECRET="<длинная-случайная-строка>" \
  -e DATABASE_URI="postgres://veterany:<password>@postgres:5432/veterany" \
  -e NEXT_PUBLIC_SITE_URL="https://veteran.example" \
  -e CRM_WEBHOOK_URL="https://crm.example/webhook" \
  -v veteran-db:/app/data \
  -v veteran-media:/app/public/media \
  veteran-road:latest
```

Создайте volumes заранее:

```bash
docker volume create veteran-db
docker volume create veteran-media
```

## Миграции БД

В Dockerfile команда запуска — `npx payload migrate && npm start`. Миграции применяются **перед** запуском Next.js. Если миграция падает, контейнер не стартует — это ожидаемое поведение.

Генерация новых миграций делается локально и коммитится в `src/migrations/`:

```bash
npx payload migrate:create
```

После ребилда образа миграции применятся автоматически.

## Обновление

1. Обновите код (git pull).
2. При изменениях в схеме — сгенерируйте миграцию (`npx payload migrate:create`), закоммитьте.
3. Пересоберите образ: `docker build -t veteran-road:latest .`.
4. Перезапустите контейнер: `docker stop veteran-road && docker rm veteran-road && docker run …` (или через `docker compose up -d --build`).
5. Проверьте логи старта: `docker logs -f veteran-road` — должно появиться «Migrated» и «Listening on port 3000».

## Health-check и мониторинг

В проекте нет выделенного `/health`-endpoint. Как минимум мониторьте:

- HTTP 200 на `GET /` (редирект `/uk`) и `GET /uk`.
- Ответ `GET /admin` (страница логина).
- Размер базы Postgres и свободное место на volume.
- Свободное место в `public/media`.

## Reverse-proxy

Проксируйте `:3000` за nginx/Caddy/Traefik с HTTPS. Пример Caddy:

```caddyfile
veteran.example {
  reverse_proxy localhost:3000
}
```

Next.js стоит за прокси, HTTPS-терминация — на уровне прокси.

## Бэкапы

Минимальный набор:

- База Postgres — резервное копирование по расписанию (`pg_dump -Fc` из контейнера postgres, например через cron на хосте).
- `public/media/` — rsync/rclone в S3-совместимое хранилище.

## Безопасность

- Не включайте `NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_META_PIXEL_ID` без cookie-баннера, если того требует юрисдикция.
- Проверьте, что админка `/admin` за reverse-proxy не открывает ошибок без авторизации (попробуйте без cookie).
- Регулярно обновляйте Payload и Next.js — в стеке CVE могут появляться.

## Смотрите также

- [Configuration](configuration.md) — полный список env-переменных.
- [CMS](cms.md) — миграции и Media.
- [Getting Started](getting-started.md) — локальный запуск как базовая проверка перед сборкой.
