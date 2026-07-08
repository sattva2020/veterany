import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { getLandingData } from '@/lib/landing-data'
import { getAllNews } from '@/lib/news-data'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ChevronRightIcon } from '@/components/icons'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)
  return { title: `${(dict.news as any).pageTitle} — ${(dict.meta as any)?.siteName || 'Ветеран'}` }
}

export default async function NewsListPage({ params }: Props) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const [dict, data, news] = await Promise.all([
    getDictionary(locale as Locale),
    getLandingData(locale),
    getAllNews(locale),
  ])
  const settings = data.settings as any
  const d = dict.news as any
  const tags = (d.tags || {}) as Record<string, string>

  const formatDate = (value: string) =>
    value
      ? new Date(value).toLocaleDateString(locale === 'uk' ? 'uk-UA' : 'en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : ''

  return (
    <>
      <Header isLanding cabinetLink="/cabinet" locale={locale} dict={dict.header} helpPhone={settings?.phones?.[0]?.number || ''} />
      <main className="news-page">
        <div className="container">
          <div className="news-page-head">
            <div className="section-label">{d.pageLabel}</div>
            <h1 className="section-title">{d.pageTitle}</h1>
          </div>

          {news.length === 0 ? (
            <p className="news-empty">{d.empty}</p>
          ) : (
            <div className="news-list-grid">
              {news.map((item) => (
                <Link key={item.id} href={`/${locale}/news/${item.slug}`} className="news-card">
                  <div className={`news-thumb${item.images[0] ? ' news-thumb--has-image' : ''}`}>
                    {item.images[0] ? (
                      <img className="news-thumb-backdrop" src={item.images[0].url} alt="" aria-hidden="true" loading="lazy" />
                    ) : null}
                    {item.images[0] ? (
                      <img className="news-image" src={item.images[0].url} alt={item.images[0].alt || item.title} loading="lazy" />
                    ) : null}
                    {item.date ? <div className="news-date-badge">{formatDate(item.date)}</div> : null}
                    {item.images.length > 1 ? <div className="news-gallery-badge">+{item.images.length - 1}</div> : null}
                  </div>
                  <div className="news-body">
                    <span className="news-tag">{tags[item.tag] || item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <span className="news-readmore">
                      {d.readMore}
                      <ChevronRightIcon size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
