'use client'

import React, { useEffect, useRef, useState } from 'react'

interface SectionFadeProps {
  children: React.ReactNode
}

export default function SectionFade({ children }: SectionFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If element is already in viewport on mount, show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 100) {
      setVisible(true)
      return
    }

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

  return (
    <div ref={ref} className={`section-fade${visible ? ' section-visible' : ''}`}>
      {children}
    </div>
  )
}
