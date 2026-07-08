import { getPayloadClient } from './payload-client'

export type NewsImage = { url: string; alt: string }

export type NewsListItem = {
  id: string
  slug: string
  title: string
  tag: string
  excerpt: string
  date: string
  images: NewsImage[]
}

export type NewsFullItem = NewsListItem & {
  content: unknown
}

// Витягуємо всі зображення новини (головне + галерея) у плаский масив.
function collectImages(doc: any): NewsImage[] {
  return [
    doc?.featuredImage,
    ...(Array.isArray(doc?.gallery) ? doc.gallery.map((g: any) => g?.image) : []),
  ]
    .filter((img: any) => img?.url)
    .map((img: any) => ({ url: img.url as string, alt: (img.alt || doc?.title || '') as string }))
}

function toListItem(doc: any): NewsListItem {
  return {
    id: String(doc?.id ?? ''),
    // slug має бути завжди (генерується хуком), але про всяк випадок падаємо на id.
    slug: doc?.slug ? String(doc.slug) : String(doc?.id ?? ''),
    title: doc?.title || '',
    tag: doc?.tag || 'event',
    excerpt: doc?.excerpt || '',
    date: doc?.publishDate || '',
    images: collectImages(doc),
  }
}

/** Усі опубліковані новини (для сторінки «Усі новини»). */
export async function getAllNews(locale: string): Promise<NewsListItem[]> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'news',
      locale: locale as any,
      where: { status: { equals: 'published' } },
      sort: '-publishDate',
      limit: 100,
    })
    return (res.docs || []).map(toListItem)
  } catch (error) {
    console.error('Error fetching news list:', error)
    return []
  }
}

/** Одна опублікована новина за slug (або за id як запасний варіант). */
export async function getNewsBySlug(locale: string, slug: string): Promise<NewsFullItem | null> {
  try {
    const payload = await getPayloadClient()
    // За замовчуванням шукаємо за slug. Якщо slug виглядає як числовий id
    // (стара новина без slug) — додаємо пошук за id, щоб посилання не ламалися.
    const orClauses: any[] = [{ slug: { equals: slug } }]
    if (/^\d+$/.test(slug)) orClauses.push({ id: { equals: slug } })
    const res = await payload.find({
      collection: 'news',
      locale: locale as any,
      where: {
        status: { equals: 'published' },
        or: orClauses,
      },
      limit: 1,
    })
    const doc = res.docs?.[0]
    if (!doc) return null
    return { ...toListItem(doc), content: (doc as any).content }
  } catch (error) {
    console.error('Error fetching news item:', error)
    return null
  }
}
