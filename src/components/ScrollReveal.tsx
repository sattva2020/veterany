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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already in viewport, reveal immediately
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay ? ` reveal-delay-${delay}` : ''

  return (
    <div ref={ref} className={`reveal${delayClass}${visible ? ' visible' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}
