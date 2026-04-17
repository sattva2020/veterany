import React from 'react'

interface JsonLdProps {
  locale: string
}

export default function JsonLd({ locale }: JsonLdProps) {
  const isUk = locale === 'uk'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://veteran-road.org.ua'

  const organizationSchema = {
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
    address: {
      '@type': 'PostalAddress',
      streetAddress: isUk ? 'вул. Хрещатик, 1' : 'Khreshchatyk St., 1',
      addressLocality: isUk ? 'Київ' : 'Kyiv',
      addressCountry: 'UA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380441234567',
      contactType: isUk ? 'Гаряча лінія' : 'Hotline',
      availableLanguage: ['Ukrainian', 'English'],
    },
    sameAs: [],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isUk ? 'Ветеран — Дорога до нового життя' : 'Veteran — Road to a New Life',
    url: baseUrl,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/${locale}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
