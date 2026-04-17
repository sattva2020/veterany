import { getPayloadClient } from './payload-client'

export async function getLandingData(locale: string) {
  try {
    const payload = await getPayloadClient()
    const [settings, activities, news, partners, joinOptions] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', locale: locale as any }).catch(() => null),
      payload.find({
        collection: 'activities',
        locale: locale as any,
        where: { isActive: { equals: true } },
        sort: 'order',
        limit: 20,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'news',
        locale: locale as any,
        where: { status: { equals: 'published' } },
        sort: '-publishDate',
        limit: 3,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'partners',
        locale: locale as any,
        where: { isActive: { equals: true } },
        sort: 'order',
        limit: 30,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'join-options',
        locale: locale as any,
        where: { isActive: { equals: true } },
        sort: 'order',
        limit: 10,
      }).catch(() => ({ docs: [] })),
    ])

    return {
      settings,
      activities: activities.docs || [],
      news: news.docs || [],
      partners: partners.docs || [],
      joinOptions: joinOptions.docs || [],
    }
  } catch (error) {
    console.error('Error fetching landing data:', error)
    return {
      settings: null,
      activities: [],
      news: [],
      partners: [],
      joinOptions: [],
    }
  }
}
