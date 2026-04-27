/**
 * Upload hero-1.png to Payload Media and bind it to SiteSettings.heroPortrait
 * for both UK and EN locales using the Payload Local API (no HTTP, no JWT login).
 *
 * Run: npx tsx scripts/upload-hero-portrait.ts
 *      Optionally: pass --cleanup to delete the source file after success.
 *
 * Idempotent: re-uses an existing Media doc with the same alt text.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'node:path'
import fs from 'node:fs'

const SOURCE_REL = 'public/media/img/hero-1.png'
const ALT = 'Портрет ветерана. Дорога до нового життя'

async function main() {
  const cleanup = process.argv.includes('--cleanup')
  const projectRoot = process.cwd()
  const sourceAbs = path.resolve(projectRoot, SOURCE_REL)

  if (!fs.existsSync(sourceAbs)) {
    throw new Error(`Source file not found: ${sourceAbs}`)
  }

  console.log('==> Booting Payload (Local API)…')
  const payload = await getPayload({ config: await (config as any) })

  console.log('==> Looking for existing Media with this alt')
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: ALT } },
    limit: 1,
    depth: 0,
  })

  let mediaId: string | number
  if (existing.docs.length > 0) {
    mediaId = (existing.docs[0] as any).id
    console.log(`!!  Media already exists (id=${mediaId}) — reusing`)
  } else {
    console.log(`==> Uploading ${SOURCE_REL}`)
    const fileBuffer = fs.readFileSync(sourceAbs)
    const stat = fs.statSync(sourceAbs)
    const created = await payload.create({
      collection: 'media',
      data: { alt: ALT },
      file: {
        data: fileBuffer,
        mimetype: 'image/png',
        name: path.basename(sourceAbs),
        size: stat.size,
      },
    })
    mediaId = (created as any).id
    console.log(`OK  Uploaded as Media id=${mediaId}`)
  }

  for (const locale of ['uk', 'en'] as const) {
    console.log(`==> Updating site-settings (locale=${locale}) heroPortrait=${mediaId}`)
    const updated = await payload.updateGlobal({
      slug: 'site-settings',
      data: { heroPortrait: mediaId } as any,
      locale,
    })
    const bound = (updated as any)?.heroPortrait
    if (!bound) throw new Error(`heroPortrait not present on response for locale ${locale}`)
    console.log(`OK  ${locale} → heroPortrait bound`)
  }

  if (cleanup) {
    console.log('==> Cleanup source file')
    fs.unlinkSync(sourceAbs)
    console.log(`OK  Removed ${SOURCE_REL}`)
  }

  console.log('\nDone. Start dev server (`npm run dev` or `npx next dev`) and open http://localhost:3000/uk to verify.')
  process.exit(0)
}

main().catch((err) => {
  console.error('FAILED:', err)
  process.exit(1)
})
