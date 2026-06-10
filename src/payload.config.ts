import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { uk } from '@payloadcms/translations/languages/uk'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Activities } from './collections/Activities'
import { News } from './collections/News'
import { Partners } from './collections/Partners'
import { JoinOptions } from './collections/JoinOptions'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { VeteranProfiles } from './collections/VeteranProfiles'
import { Consultations } from './collections/Consultations'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Fail-fast: у production секрет і строка підключення мають приходити з env.
// Дефолти залишено лише для локальної розробки.
const payloadSecret = process.env.PAYLOAD_SECRET
const databaseUri = process.env.DATABASE_URI

if (process.env.NODE_ENV === 'production') {
  if (!payloadSecret) {
    console.error('[FIX] PAYLOAD_SECRET is not set — refusing to start in production')
    throw new Error('PAYLOAD_SECRET environment variable is required in production')
  }
  if (!databaseUri) {
    console.error('[FIX] DATABASE_URI is not set — refusing to start in production')
    throw new Error('DATABASE_URI environment variable is required in production')
  }
}

export default buildConfig({
  localization: {
    locales: [
      { label: { uk: 'Українська', en: 'Ukrainian' }, code: 'uk' },
      { label: { uk: 'Англійська', en: 'English' }, code: 'en' },
    ],
    defaultLocale: 'uk',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { uk },
    fallbackLanguage: 'uk',
  },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Ветеран',
      description: 'Адмін-панель ГО «Ветеран. Дорога до нового життя»',
    },
    dateFormat: 'dd.MM.yyyy',
  },
  collections: [
    Users,
    Media,
    Activities,
    News,
    Partners,
    JoinOptions,
    ContactSubmissions,
    VeteranProfiles,
    Consultations,
  ],
  globals: [
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: payloadSecret || 'dev-only-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri || 'postgres://postgres:postgres@localhost:5432/postgres',
    },
  }),
  sharp,
})
