import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://veteran-road.org.ua'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['uk', 'en']
  const routes = ['', '/privacy', '/booking']

  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.7,
        alternates: {
          languages: {
            uk: `${baseUrl}/uk${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      })
    }
  }

  return entries
}
