import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://veteran-road.org.ua'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['uk', 'en']

  const entries: MetadataRoute.Sitemap = []

  // Головна — локалізована (/uk, /en) з hreflang-альтернативами.
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          uk: `${baseUrl}/uk`,
          en: `${baseUrl}/en`,
        },
      },
    })
  }

  // /privacy і /booking — нелокалізовані розділи поза [locale], без префікса локалі.
  for (const route of ['/privacy', '/booking']) {
    entries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
