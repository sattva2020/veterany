import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Онлайн-запис на консультацію',
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
