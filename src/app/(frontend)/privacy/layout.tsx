import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/redesign.css'

export const metadata: Metadata = {
  title: 'Політика конфіденційності',
}

// Розділ нелокалізований (лише українська), живе поза [locale],
// тому html/body рендеримо тут (кореневий layout — прохідний).
export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
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
      <body>{children}</body>
    </html>
  )
}
