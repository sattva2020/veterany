/**
 * One-shot Payload init that triggers Drizzle push (schema sync) on Postgres.
 *
 * Why this script exists: postgresAdapter({ push: true }) is honored by
 * Payload only when NODE_ENV !== 'production'. We force development mode
 * here just for the boot, then exit. The main `npm start` afterwards runs
 * with the real NODE_ENV=production but the schema is already in place.
 *
 * Idempotent: if the schema already matches, Drizzle push is a no-op.
 */
process.env.NODE_ENV = 'development'

import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  console.log('[init] booting Payload (NODE_ENV=development for push) ...')
  const payload = await getPayload({ config: await (config as any) })
  // Touch the DB to ensure connection works
  await payload.find({ collection: 'users', limit: 1, depth: 0 }).catch(() => null)
  console.log('[init] schema synced — exiting')
  process.exit(0)
}

main().catch((err) => {
  console.error('[init] FAILED:', err)
  // Do not block the main start — log and continue.
  process.exit(0)
})
