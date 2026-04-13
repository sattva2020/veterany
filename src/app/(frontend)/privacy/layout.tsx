import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Політика конфіденційності',
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
