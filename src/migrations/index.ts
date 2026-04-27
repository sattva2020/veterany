// Migrations cleared after switch from SQLite to Postgres adapter (2026-04-27).
// The previous files (20260417_*, 20260427_*) were SQLite-specific (PRAGMA, ALTER TABLE
// rebuild patterns) and are not portable to Postgres. Schema is now synchronized via
// Drizzle push (postgresAdapter({ push: true })) on each container start.
//
// To switch to versioned migrations later: set push: false in payload.config.ts,
// run `payload migrate:create` against a live Postgres, and import the generated
// modules below.
export const migrations: Array<{
  up: (...args: any[]) => Promise<void>
  down: (...args: any[]) => Promise<void>
  name: string
}> = []
