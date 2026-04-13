import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Особистий кабінет',
}

export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
