// Seed section-heading fields (SiteSettings → tab «Заголовки секцій») with the
// current dictionary texts (uk + en), so the admin sees the live values pre-filled
// instead of empty fields. Safe to re-run: it overwrites only these fields.
// Uses the prod REST API directly via fetch — no Payload boot.
//
// Run (PowerShell, so Cyrillic stays UTF-8):
//   $env:SEED_PROD_URL="https://veteransroad2newlife.org"
//   $env:SEED_EMAIL="admin@example.com"
//   $env:SEED_PASSWORD="***"
//   node scripts/seed-section-headings.mjs

const PROD = process.env.SEED_PROD_URL
const EMAIL = process.env.SEED_EMAIL
const PASSWORD = process.env.SEED_PASSWORD

if (!PROD || !EMAIL || !PASSWORD) {
  console.error('[FIX] Missing env: SEED_PROD_URL, SEED_EMAIL and SEED_PASSWORD are required. Credentials are never stored in the repo.')
  process.exit(1)
}

// Значення взяті 1:1 зі статичних словників src/dictionaries/uk.json та en.json.
const byLocale = {
  uk: {
    aboutSectionLabel: 'Про організацію',
    aboutSectionTitle: 'Ми поруч, коли це найбільш потрібно',
    activitiesSectionLabel: 'Напрями діяльності',
    activitiesSectionTitle: 'Комплексна підтримка на кожному етапі',
    activitiesSectionDesc: 'Сім ключових напрямів, які охоплюють усі потреби ветеранів — від першого звернення до повної інтеграції в мирне життя.',
    newsSectionLabel: 'Останні новини',
    newsSectionTitle: 'Що відбувається',
    partnersSectionLabel: 'Партнери',
    partnersSectionTitle: 'Разом ми сильніші',
    partnersSectionDesc: 'Ми вдячні кожному, хто долучається до підтримки ветеранів та їхніх родин.',
    joinSectionLabel: 'Долучитися',
    joinSectionTitle: 'Станьте частиною змін',
    joinSectionDesc: 'Кожен може допомогти. Оберіть зручний для вас спосіб підтримки — разом ми зможемо більше.',
    contactsSectionLabel: 'Контакти',
    contactsSectionTitle: "Зв'яжіться з нами",
  },
  en: {
    aboutSectionLabel: 'About Us',
    aboutSectionTitle: "We're here when it matters most",
    activitiesSectionLabel: 'Our Programs',
    activitiesSectionTitle: 'Comprehensive support at every stage',
    activitiesSectionDesc: 'Seven key programs covering all veteran needs — from first contact to full integration into civilian life.',
    newsSectionLabel: 'Latest News',
    newsSectionTitle: "What's Happening",
    partnersSectionLabel: 'Partners',
    partnersSectionTitle: 'Together we are stronger',
    partnersSectionDesc: 'We are grateful to everyone who joins in supporting veterans and their families.',
    joinSectionLabel: 'Get Involved',
    joinSectionTitle: 'Be Part of the Change',
    joinSectionDesc: 'Everyone can help. Choose a way to support that suits you — together we can do more.',
    contactsSectionLabel: 'Contact',
    contactsSectionTitle: 'Get in Touch',
  },
}

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

  for (const locale of ['uk', 'en']) {
    console.log(`==> updating site-settings section headings (locale=${locale})`)
    const patchRes = await fetch(`${PROD}/api/globals/site-settings?locale=${locale}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(byLocale[locale]),
    })
    const patchBody = await patchRes.text()
    if (!patchRes.ok) throw new Error(`POST ${locale} ${patchRes.status}: ${patchBody.slice(0, 500)}`)
    console.log(`OK patched (${locale})`)
  }

  console.log('==> verify (uk)')
  const verifyRes = await fetch(`${PROD}/api/globals/site-settings?locale=uk&depth=0`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const v = await verifyRes.json()
  for (const key of Object.keys(byLocale.uk)) {
    console.log(`  ${key}: ${v[key] || '(empty)'}`)
  }
  console.log('\nDone. Open /admin → Site Settings → Заголовки секцій to review/edit.')
}

main().catch((e) => {
  console.error('FAILED:', e)
  process.exit(1)
})
