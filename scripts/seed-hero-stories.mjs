// Seed 4 Hero stories (text only, photo left empty for the user to upload via /admin).
// Uses prod REST API directly via fetch — no Payload boot, no SQLite locking.
// Run: SEED_PROD_URL=https://example.com SEED_EMAIL=admin@example.com SEED_PASSWORD=*** node scripts/seed-hero-stories.mjs

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

async function main() {
  console.log('==> login')
  const loginRes = await fetch(`${PROD}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!loginRes.ok) throw new Error(`login ${loginRes.status}: ${await loginRes.text()}`)
  const { token } = await loginRes.json()
  console.log('OK token len=', token.length)

  console.log('==> updating site-settings.heroStories (locale=uk)')
  const patchRes = await fetch(`${PROD}/api/globals/site-settings?locale=uk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ heroStories: stories }),
  })
  const patchBody = await patchRes.text()
  if (!patchRes.ok) throw new Error(`PATCH ${patchRes.status}: ${patchBody.slice(0, 500)}`)
  console.log('OK patched')

  console.log('==> verify')
  const verifyRes = await fetch(`${PROD}/api/globals/site-settings?locale=uk&depth=0`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const v = await verifyRes.json()
  console.log('heroStories count:', (v.heroStories || []).length)
  ;(v.heroStories || []).forEach((s, i) => {
    console.log(`  [${i + 1}] ${s.name} — ${s.chapter} (photo=${s.photo || '(none)'})`)
  })
  console.log('\nDone. Open /admin → Site Settings → Hero → upload Portrait for each story.')
}

main().catch((e) => {
  console.error('FAILED:', e)
  process.exit(1)
})
