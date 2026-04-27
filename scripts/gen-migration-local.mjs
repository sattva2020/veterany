/**
 * Local migration generator using embedded-postgres.
 *
 * Why: @payloadcms/db-postgres push mode is disabled in production, so we need
 * actual migration files. To run `payload migrate:create` we need a live
 * Postgres. Rather than asking the user to start Docker Desktop, this script
 * boots a temporary embedded Postgres on localhost, runs migrate:create, then
 * shuts it down.
 *
 * Run: node scripts/gen-migration-local.mjs
 */
import EmbeddedPostgres from 'embedded-postgres'
import path from 'node:path'
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'

const dataDir = path.resolve('.embedded-pg-data')
const port = 55432
const user = 'pgtest'
const password = 'pgtest'

async function main() {
  if (fs.existsSync(dataDir)) {
    console.log('cleaning previous data dir')
    fs.rmSync(dataDir, { recursive: true, force: true })
  }

  const pg = new EmbeddedPostgres({
    databaseDir: dataDir,
    user,
    password,
    port,
    persistent: false,
  })

  console.log('initialising embedded-postgres ...')
  await pg.initialise()
  console.log('starting ...')
  await pg.start()
  console.log('creating database "veterany" ...')
  await pg.createDatabase('veterany')

  const url = `postgres://${user}:${password}@localhost:${port}/veterany`
  console.log('DB URL:', url)

  console.log('running payload migrate:create ...')
  const r = spawnSync(
    'npx',
    ['cross-env', `DATABASE_URI=${url}`, 'NODE_ENV=development', 'payload', 'migrate:create', '--name', 'initial_postgres'],
    { stdio: 'inherit', shell: true },
  )

  console.log('stopping embedded-postgres ...')
  await pg.stop()

  if (r.status !== 0) {
    process.exit(r.status || 1)
  }
  console.log('Done. Migration file generated under src/migrations/. Inspect, commit, push.')
}

main().catch((err) => {
  console.error('FAILED:', err)
  process.exit(1)
})
