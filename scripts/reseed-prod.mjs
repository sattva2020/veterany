// One-shot re-seed of production after the SQLite -> Postgres migration.
// Creates first user, uploads two hero photos, binds them to SiteSettings,
// and writes the 4 hero stories (text only).
//
// Run: SEED_PROD_URL=https://example.com SEED_EMAIL=admin@example.com SEED_PASSWORD=*** node scripts/reseed-prod.mjs
import fs from 'node:fs'
import path from 'node:path'

const PROD = process.env.SEED_PROD_URL
const EMAIL = process.env.SEED_EMAIL
const PASSWORD = process.env.SEED_PASSWORD

if (!PROD || !EMAIL || !PASSWORD) {
  console.error('[FIX] Missing env: SEED_PROD_URL, SEED_EMAIL and SEED_PASSWORD are required. Credentials are never stored in the repo.')
  process.exit(1)
}

const stories = [
  {
    chapter: 'Історія 01 · Олексій',
    title1: 'Три роки тому він',
    title2: 'не міг спати ночами.',
    body: "Сьогодні Олексій керує невеликою кав'ярнею в Ірпені, виховує доньку та раз на місяць приходить підтримати інших — тих, хто тільки починає свою дорогу назад. Ми не кажемо, що було легко. Ми кажемо, що поруч був хтось, хто знав шлях.",
    name: 'Олексій Я.',
    meta: '47 ОМБр · Повернувся 2024 · Ірпінь',
  },
  {
    chapter: 'Історія 02 · Марія',
    title1: 'Вона мовчала пів року —',
    title2: 'тепер веде групу підтримки.',
    body: 'Маріїн чоловік повернувся з фронту, але дім ще довго лишався чужим. Разом із психологами «Дороги» вона навчилась слухати — і говорити. Сьогодні Марія координує зустрічі дружин ветеранів у Києві.',
    name: 'Марія К.',
    meta: 'Дружина ветерана · Волонтерка',
  },
  {
    chapter: 'Історія 03 · Богдан',
    title1: 'Пів року він не міг',
    title2: 'зрушити документи.',
    body: 'Богдан намагався сам — без успіху. Юрист «Дороги» за два тижні оформив усе. «Просто сів поруч і сказав: підпишемо це разом», — згадує він. Сьогодні Богдан допомагає іншим із тим самим шляхом.',
    name: 'Богдан С.',
    meta: '93 ОМБр · Холодний Яр',
  },
  {
    chapter: 'Історія 04 · Віталій',
    title1: 'Вони не обіцяли,',
    title2: 'що стане легко.',
    body: 'Вони сказали — буде зрозуміло, що робити далі. І це вперше за довгий час дало Віталію опору. Сьогодні він працює інструктором і допомагає молодшим побратимам знаходити свій шлях після повернення.',
    name: 'Віталій П.',
    meta: '79 ОДШБр · Повернувся 2023',
  },
]

async function findOrUpload(token, filePath, alt) {
  // idempotency: re-use Media doc with same alt
  const search = await fetch(`${PROD}/api/media?where[alt][equals]=${encodeURIComponent(alt)}&limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  })
  if (search.ok) {
    const data = await search.json()
    if ((data.docs || []).length > 0) return data.docs[0]
  }

  const ext = path.extname(filePath).toLowerCase()
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'application/octet-stream'
  const buf = fs.readFileSync(filePath)
  const blob = new Blob([buf], { type: mime })
  const fd = new FormData()
  fd.append('_payload', JSON.stringify({ alt }))
  fd.append('file', blob, path.basename(filePath))
  const r = await fetch(`${PROD}/api/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: fd,
  })
  if (!r.ok) throw new Error(`upload ${path.basename(filePath)}: ${r.status} ${await r.text()}`)
  return (await r.json()).doc
}

async function main() {
  console.log('==> create first admin')
  const reg = await fetch(`${PROD}/api/users/first-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD, name: 'Ruslan', role: 'admin' }),
  })
  if (!reg.ok) {
    // Maybe user already exists
    console.log('  first-register failed, trying login:', reg.status)
  } else {
    console.log('  OK created')
  }

  const loginRes = await fetch(`${PROD}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!loginRes.ok) throw new Error(`login: ${loginRes.status} ${await loginRes.text()}`)
  const { token } = await loginRes.json()
  console.log('  token len=', token.length)

  console.log('==> ensure hero-1 media (Олексій / default portrait)')
  const m1 = await findOrUpload(token, 'public/media/hero-1.webp', 'Портрет ветерана. Дорога до нового життя')
  console.log('  Media id=', m1.id, 'filename=', m1.filename)

  console.log('==> ensure hero-2 media (Богдан)')
  const m2 = await findOrUpload(token, 'public/media/hero-2.png', 'Портрет Богдана С.')
  console.log('  Media id=', m2.id, 'filename=', m2.filename)

  console.log('==> patch SiteSettings (heroPortrait + per-story photos + 4 stories)')
  const patchBody = {
    heroPortrait: m1.id,
    heroStory1Photo: m1.id,
    heroStory3Photo: m2.id,
    heroStories: stories,
  }
  const r = await fetch(`${PROD}/api/globals/site-settings?locale=uk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(patchBody),
  })
  if (!r.ok) throw new Error(`PATCH globals: ${r.status} ${await r.text()}`)
  console.log('  OK')

  console.log('==> verify')
  const v = await (await fetch(`${PROD}/api/globals/site-settings?locale=uk&depth=1`, {
    headers: { Authorization: `JWT ${token}` },
  })).json()
  console.log('  heroPortrait:', v.heroPortrait?.filename)
  console.log('  heroStory1Photo:', v.heroStory1Photo?.filename || '(none)')
  console.log('  heroStory2Photo:', v.heroStory2Photo?.filename || '(none)')
  console.log('  heroStory3Photo:', v.heroStory3Photo?.filename || '(none)')
  console.log('  heroStory4Photo:', v.heroStory4Photo?.filename || '(none)')
  console.log('  heroStories:', (v.heroStories || []).map((s) => s.name).join(', '))

  console.log('\nDone.')
}

main().catch((e) => {
  console.error('FAILED:', e.message)
  process.exit(1)
})
