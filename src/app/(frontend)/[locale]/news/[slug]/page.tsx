import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { getLandingData } from '@/lib/landing-data'
import { getNewsBySlug } from '@/lib/news-data'
import { lexicalToBlocks, lexicalToPlainText } from '@/lib/richtext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ChevronRightIcon } from '@/components/icons'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  const item = await getNewsBySlug(locale, slug)
  if (!item) return {}
  return {
    title: item.title,
    description: item.excerpt || lexicalToPlainText(item.content).slice(0, 160),
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) notFound()

  const [dict, data, item] = await Promise.all([
    getDictionary(locale as Locale),
    getLandingData(locale),
    getNewsBySlug(locale, slug),
  ])
  if (!item) notFound()

  const settings = data.settings as any
  const d = dict.news as any
  const tags = (d.tags || {}) as Record<string, string>
  const blocks = lexicalToBlocks(item.content)

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString(locale === 'uk' ? 'uk-UA' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <>
      <Header isLanding cabinetLink="/cabinet" locale={locale} dict={dict.header} helpPhone={settings?.phones?.[0]?.number || ''} />
      <main className="news-article">
        <div className="container container--narrow">
          <Link href={`/${locale}/news`} className="news-back">
            <span aria-hidden="true">←</span> {d.backToNews}
          </Link>

          <div className="news-article-meta">
            <span className="news-tag">{tags[item.tag] || item.tag}</span>
            {formattedDate ? <span className="news-article-date">{formattedDate}</span> : null}
          </div>
          <h1 className="news-article-title">{item.title}</h1>
          {item.excerpt ? <p className="news-article-lead">{item.excerpt}</p> : null}

          {item.images[0] ? (
            <figure className="news-article-hero">
              <img src={item.images[0].url} alt={item.images[0].alt || item.title} />
            </figure>
          ) : null}

          <div className="news-article-content">
            {blocks.map((block, i) => {
              if (block.kind === 'heading') {
                return block.level === 2 ? <h2 key={i}>{block.text}</h2> : <h3 key={i}>{block.text}</h3>
              }
              if (block.kind === 'quote') {
                return <blockquote key={i}>{block.text}</blockquote>
              }
              if (block.kind === 'list') {
                return block.ordered ? (
                  <ol key={i}>{block.items.map((it, j) => <li key={j}>{it}</li>)}</ol>
                ) : (
                  <ul key={i}>{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                )
              }
              return <p key={i}>{block.text}</p>
            })}
          </div>

          {item.images.length > 1 ? (
            <div className="news-article-gallery">
              {item.images.slice(1).map((img, i) => (
                <figure key={i}>
                  <img src={img.url} alt={img.alt || item.title} loading="lazy" />
                </figure>
              ))}
            </div>
          ) : null}

          <div className="news-article-foot">
            <Link href={`/${locale}/news`} className="btn-outline">
              {d.backToNews}
              <ChevronRightIcon size={14} />
            </Link>
          </div>
        </div>
      </main>
      <Footer
        locale={locale}
        dict={dict.footer}
        socials={(settings?.socialLinks || []).map((s: any) => ({ platform: s.platform || '', url: s.url || '' }))}
        contacts={{ phones: settings?.phones || [], email: settings?.email || '', address: settings?.address || '' }}
        requisites={{ legalName: settings?.legalName || '', edrpou: settings?.edrpou || '' }}
      />
    </>
  )
}
