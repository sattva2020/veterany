import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ветеран — Дорога до нового життя',
  description: 'ГО «Ветеран. Дорога до нового життя» — комплексна підтримка ветеранів та їхніх родин',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}
