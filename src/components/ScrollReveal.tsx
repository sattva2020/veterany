'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  style?: React.CSSProperties
}

export default function ScrollReveal({ children, className = '', delay, style }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hydrated, setHydrated] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const isBelowFold = rect.top > window.innerHeight * 0.9

    if (!isBelowFold) {
      setVisible(true)
      setHydrated(true)
      return
    }

    setHydrated(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay ? ` reveal-delay-${delay}` : ''

  // SSR: no animation classes. After hydration: animate below-fold elements
  const revealClass = !hydrated
    ? className
    : `reveal${delayClass}${visible ? ' visible' : ''} ${className}`

  return (
    <div ref={ref} className={revealClass} style={style}>
      {children}
    </div>
  )
}
