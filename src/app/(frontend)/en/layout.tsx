import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veteran — Road to a New Life',
  description: 'NGO "Veteran. Road to a New Life" — comprehensive support for veterans and their families',
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
