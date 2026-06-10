import React from 'react'
import { getPayloadClient } from '@/lib/payload-client'

interface JsonLdProps {
  locale: string
}

// JSON-LD вставляється в <script>: екрануємо "<", щоб значення з CMS
// (потенційно з "</script>") не могли розірвати тег (XSS-захист).
const serializeJsonLd = (schema: Record<string, unknown>) =>
  JSON.stringify(schema).replace(/</g, '\\u003c')

// Серверний компонент: контактні дані та соцмережі беруться з SiteSettings,
// щоб у розмітці schema.org не було вигаданих телефонів/адрес.
// SearchAction прибрано — пошуку на сайті немає.
export default async function JsonLd({ locale }: JsonLdProps) {
  const isUk = locale === 'uk'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://veteran-road.org.ua'

  let settings: Record<string, unknown> | null = null
  try {
    const payload = await getPayloadClient()
    settings = (await payload.findGlobal({ slug: 'site-settings', locale: locale as 'uk' | 'en' })) as unknown as Record<string, unknown>
  } catch (error) {
    console.error('[FIX] JsonLd: failed to load site settings, emitting schema without contacts', error)
  }

  const phones = (settings?.phones as Array<{ number?: string }> | undefined) || []
  const phone = phones[0]?.number || null
  const email = (settings?.email as string | undefined) || null
  const address = (settings?.address as string | undefined) || null
  const socialLinks = ((settings?.socialLinks as Array<{ url?: string }> | undefined) || [])
    .map((s) => s.url)
    .filter(Boolean)

  const organizationSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: isUk ? 'ГО «Ветеран. Дорога до нового життя»' : 'NGO "Veteran. Road to a New Life"',
    alternateName: isUk ? 'Veteran. Road to a New Life' : 'Ветеран. Дорога до нового життя',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: isUk
      ? 'Комплексна підтримка ветеранів та їхніх родин — від психологічної допомоги до працевлаштування'
      : 'Comprehensive support for veterans and their families — from psychological assistance to employment programs',
    foundingDate: '2021',
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    knowsLanguage: ['uk', 'en'],
  }

  if (address) {
    organizationSchema.address = {
      '@type': 'PostalAddress',
      streetAddress: address.split('\n')[0],
      addressLocality: isUk ? 'Київ' : 'Kyiv',
      addressCountry: 'UA',
    }
  }

  if (phone || email) {
    organizationSchema.contactPoint = {
      '@type': 'ContactPoint',
      ...(phone ? { telephone: phone } : {}),
      ...(email ? { email } : {}),
      contactType: isUk ? 'Гаряча лінія' : 'Hotline',
      availableLanguage: ['Ukrainian', 'English'],
    }
  }

  if (socialLinks.length > 0) {
    organizationSchema.sameAs = socialLinks
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isUk ? 'Ветеран — Дорога до нового життя' : 'Veteran — Road to a New Life',
    url: baseUrl,
    inLanguage: locale,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />
    </>
  )
}
