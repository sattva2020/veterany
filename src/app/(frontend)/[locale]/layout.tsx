import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, locales } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import Analytics from '@/components/Analytics'
import JsonLd from '@/components/JsonLd'
import '@/styles/globals.css'
import '@/styles/redesign.css'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://veteran-road.org.ua'

  return {
    title: {
      default: dict.meta.title,
      template: `%s | ${locale === 'uk' ? 'Ветеран' : 'Veteran'}`,
    },
    description: dict.meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'uk': `${baseUrl}/uk`,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
      alternateLocale: locale === 'uk' ? 'en_US' : 'uk_UA',
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <JsonLd locale={locale} />
        <Analytics />
      </body>
    </html>
  )
}
