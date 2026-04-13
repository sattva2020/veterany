'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import HelpModal from '@/components/HelpModal'

interface HeaderProps {
  isLanding?: boolean
  cabinetLink?: string
}

export default function Header({ isLanding = false, cabinetLink }: HeaderProps) {
  const [scrolled, setScrolled] = useState(!isLanding)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    if (!isLanding) return
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLanding])

  // Listen for global open-help-modal event (from Hero CTA)
  useEffect(() => {
    const handler = () => setHelpOpen(true)
    window.addEventListener('open-help-modal', handler)
    return () => window.removeEventListener('open-help-modal', handler)
  }, [])

  const prefix = isLanding ? '' : '/'

  const navLinks = [
    { href: `${prefix}#about`, label: 'Про нас' },
    { href: `${prefix}#activities`, label: 'Напрями' },
    { href: `${prefix}#news`, label: 'Новини' },
    { href: `${prefix}#partners`, label: 'Партнери' },
    { href: `${prefix}#join`, label: 'Долучитися' },
    { href: `${prefix}#contacts`, label: 'Контакти' },
  ]

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
    document.body.style.overflow = !mobileOpen ? 'hidden' : ''
  }

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <Link href="/" className="logo">
            <div className="logo-icon">В</div>
            <div className="logo-text">
              Ветеран
              <span>Дорога до нового життя</span>
            </div>
          </Link>

          <nav className="nav-desktop">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            {cabinetLink && (
              <Link href={cabinetLink} style={{ color: 'var(--c-gold)' }}>Кабінет</Link>
            )}
            <button className="btn-header" onClick={() => setHelpOpen(true)}>
              Потребую допомоги
            </button>
          </nav>

          <div className={`hamburger${mobileOpen ? ' active' : ''}`} onClick={toggleMobile}>
            <span /><span /><span />
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div
        className={`nav-overlay${mobileOpen ? ' visible' : ''}`}
        style={{ display: mobileOpen ? 'block' : 'none' }}
        onClick={closeMobile}
      />
      <nav className={`nav-mobile${mobileOpen ? ' open' : ''}`} style={{ display: 'block' }}>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={closeMobile}>{link.label}</a>
        ))}
        {cabinetLink && (
          <Link href={cabinetLink} onClick={closeMobile} style={{ color: 'var(--c-gold)' }}>Кабінет</Link>
        )}
        <div style={{ marginTop: '32px' }}>
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { closeMobile(); setHelpOpen(true) }}
          >
            Потребую допомоги
          </button>
        </div>
      </nav>

      {/* Help popup */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  )
}
