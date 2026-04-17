'use client'

import React, { useState, useEffect, useRef } from 'react'
import { PhoneIcon, ChevronRightIcon, FacebookIcon, InstagramIcon, YouTubeIcon, TelegramIcon, TikTokIcon, ViberIcon } from '@/components/icons'

interface HeroProgress {
  current: number
  goal: number
  labelDone: string
  labelGoal: string
}

interface HeroProps {
  locale?: string
  dict?: Record<string, string>
  progress?: HeroProgress
}

export default function HeroSection({ locale = 'uk', dict, progress }: HeroProps) {
  const d = dict || {
    badge: 'Громадська організація', title1: 'Ветеран.', title2: 'Дорога до нового життя',
    subtitle: 'Підтримка. Відновлення. Нові можливості.',
    description: 'Ми допомагаємо ветеранам та їхнім родинам відновити повноцінне життя через комплексну підтримку — від психологічної допомоги до працевлаштування.',
    ctaPrimary: 'Потребую допомоги', ctaSecondary: 'Напрями діяльності',
    progressHelped: 'Допомогли ветеранам:', progressGoal: 'Мета:', scrollDown: 'Далі',
  }
  const [isMobile, setIsMobile] = useState(false)
  const bgRef = useRef<HTMLDivElement>(null)
  const decoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > window.innerHeight) return // no work past hero

      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`
      }
      if (decoRef.current) {
        decoRef.current.style.transform = `rotate(45deg) translateY(${scrollY * -0.15}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const socialLinks = (size: number) => (
    <>
      <a href="#" aria-label="Facebook"><FacebookIcon size={size} /></a>
      <a href="#" aria-label="Instagram"><InstagramIcon size={size} /></a>
      <a href="#" aria-label="YouTube"><YouTubeIcon size={size} /></a>
      <a href="#" aria-label="TikTok"><TikTokIcon size={size} /></a>
      <a href="#" aria-label="Telegram"><TelegramIcon size={size} /></a>
      <a href="#" aria-label="Viber"><ViberIcon size={size} /></a>
    </>
  )

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-pattern" />
      <div className="hero-deco" ref={decoRef} />
      <div className="hero-glow" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">{d.badge}</div>
          <h1>{d.title1}<br /><em>{d.title2}</em></h1>
          <p className="hero-subtitle">{d.subtitle}</p>
          <p className="hero-desc">{d.description}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('open-help-modal'))}>
              <PhoneIcon size={18} />
              {d.ctaPrimary}
            </button>
            <a href="#activities" className="btn-secondary">
              <ChevronRightIcon size={16} />
              {d.ctaSecondary}
            </a>
          </div>

          {/* Progress bar — savethelimb style */}
          {(() => {
            const cur = progress?.current || 500
            const goal = progress?.goal || 1000
            const pct = Math.min((cur / goal) * 100, 100)
            const lDone = progress?.labelDone || d.progressHelped || 'Допомогли ветеранам'
            const lGoal = progress?.labelGoal || d.progressGoal || 'Мета'
            return (
              <div className="hero-progress">
                <div className="hero-progress-title">{lDone.replace(':', '')}</div>
                <div className="hero-progress-bar">
                  <div className="hero-progress-fill" style={{ width: `${pct}%` }} />
                  <div className="hero-progress-dot" style={{ left: `${pct}%` }} />
                </div>
                <div className="hero-progress-label">
                  <span>{lDone}: <strong>{cur.toLocaleString(locale === 'uk' ? 'uk-UA' : 'en-US')}</strong></span>
                  <span>{lGoal}: <strong>{goal.toLocaleString(locale === 'uk' ? 'uk-UA' : 'en-US')}</strong></span>
                </div>
              </div>
            )
          })()}

          {isMobile && (
            <div className="hero-social" style={{ display: 'flex', position: 'static', transform: 'none', flexDirection: 'row', marginTop: '40px' }}>
              {socialLinks(18)}
            </div>
          )}
        </div>
      </div>

      {!isMobile && (
        <div className="hero-social">
          {socialLinks(16)}
        </div>
      )}

      <div className="scroll-indicator">
        <span>{d.scrollDown}</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
