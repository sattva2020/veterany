import React from 'react'
import type { Metadata } from 'next'
import Analytics from '@/components/Analytics'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Ветеран — Дорога до нового життя',
    template: '%s | Ветеран',
  },
  description: 'ГО «Ветеран. Дорога до нового життя» — комплексна підтримка ветеранів та їхніх родин',
  openGraph: {
    title: 'Ветеран — Дорога до нового життя',
    description: 'Комплексна підтримка ветеранів та їхніх родин — від психологічної допомоги до працевлаштування',
    locale: 'uk_UA',
    type: 'website',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
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
        <Analytics />
      </body>
    </html>
  )
}
