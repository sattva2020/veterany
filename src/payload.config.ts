import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
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
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./database.db',
    },
  }),
  sharp,
})
