'use client'

import React, { useEffect, useRef, useState } from 'react'

interface SectionFadeProps {
  children: React.ReactNode
}

export default function SectionFade({ children }: SectionFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hydrated, setHydrated] = useState(false)
  const [visible, setVisible] = useState(false)

  // On hydration, check if below fold — only animate those
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const isBelowFold = rect.top > window.innerHeight * 0.9

    if (!isBelowFold) {
      // Already in or near viewport — show immediately, no animation
      setVisible(true)
      setHydrated(true)
      return
    }

    // Below fold — enable animation
    setHydrated(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Before hydration: render fully visible (SSR-safe)
  // After hydration: apply animation classes only for below-fold elements
  const className = !hydrated
    ? '' // SSR: no animation classes, fully visible
    : `section-fade${visible ? ' section-visible' : ''}`

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
