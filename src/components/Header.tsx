'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import HelpModal from '@/components/HelpModal'

interface HeaderDict {
  about: string
  activities: string
  news: string
  partners: string
  join: string
  contacts: string
  cabinet: string
  cta: string
  langSwitch: string
}

interface HeaderProps {
  isLanding?: boolean
  cabinetLink?: string
  locale?: string
  dict?: HeaderDict
}

export default function Header({ isLanding = false, cabinetLink, locale = 'uk', dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(!isLanding)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  const d = dict || {
    about: 'Про нас', activities: 'Напрями', news: 'Новини',
    partners: 'Партнери', join: 'Долучитися', contacts: 'Контакти',
    cabinet: 'Кабінет', cta: 'Потребую допомоги', langSwitch: 'EN',
  }

  useEffect(() => {
    if (!isLanding) return
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLanding])

  useEffect(() => {
    const handler = () => setHelpOpen(true)
    window.addEventListener('open-help-modal', handler)
    return () => window.removeEventListener('open-help-modal', handler)
  }, [])

  const prefix = isLanding ? '' : `/${locale}`
  const altLocale = locale === 'uk' ? 'en' : 'uk'

  const navLinks = [
    { href: `${prefix}#about`, label: d.about },
    { href: `${prefix}#activities`, label: d.activities },
    { href: `${prefix}#news`, label: d.news },
    { href: `${prefix}#partners`, label: d.partners },
    { href: `${prefix}#join`, label: d.join },
    { href: `${prefix}#contacts`, label: d.contacts },
  ]

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
    document.body.style.overflow = !mobileOpen ? 'hidden' : ''
  }

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  const handleLangSwitch = () => {
    document.cookie = `NEXT_LOCALE=${altLocale};path=/;max-age=31536000`
  }

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <Link href={`/${locale}`} className="logo">
            <div className="logo-icon">{locale === 'uk' ? 'В' : 'V'}</div>
            <div className="logo-text">
              {locale === 'uk' ? 'Ветеран' : 'Veteran'}
              <span>{locale === 'uk' ? 'Дорога до нового життя' : 'Road to a New Life'}</span>
            </div>
          </Link>

          <nav className="nav-desktop">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            {cabinetLink && (
              <Link href={cabinetLink} style={{ color: 'var(--c-gold)' }}>{d.cabinet}</Link>
            )}
            <Link href={`/${altLocale}`} className="lang-switch" onClick={handleLangSwitch}>
              {d.langSwitch}
            </Link>
            <button className="btn-header" onClick={() => setHelpOpen(true)}>
              {d.cta}
            </button>
          </nav>

          <div className={`hamburger${mobileOpen ? ' active' : ''}`} onClick={toggleMobile}>
            <span /><span /><span />
          </div>
        </div>
      </header>

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
          <Link href={cabinetLink} onClick={closeMobile} style={{ color: 'var(--c-gold)' }}>{d.cabinet}</Link>
        )}
        <Link href={`/${altLocale}`} onClick={() => { closeMobile(); handleLangSwitch() }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="lang-switch" style={{ position: 'static', padding: '4px 10px', fontSize: '12px' }}>{d.langSwitch}</span>
          {locale === 'uk' ? 'English version' : 'Українська версія'}
        </Link>
        <div style={{ marginTop: '32px' }}>
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { closeMobile(); setHelpOpen(true) }}
          >
            {d.cta}
          </button>
        </div>
      </nav>

      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  )
}
