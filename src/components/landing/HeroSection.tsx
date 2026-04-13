'use client'

import React, { useState, useEffect, useRef } from 'react'
import { PhoneIcon, ChevronRightIcon, FacebookIcon, InstagramIcon, YouTubeIcon, TelegramIcon, TikTokIcon, ViberIcon } from '@/components/icons'

export default function HeroSection() {
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
          <div className="hero-badge">Громадська організація</div>
          <h1>Ветеран.<br /><em>Дорога до нового життя</em></h1>
          <p className="hero-subtitle">Підтримка. Відновлення. Нові можливості.</p>
          <p className="hero-desc">
            Ми допомагаємо ветеранам та їхнім родинам відновити повноцінне життя через
            комплексну підтримку — від психологічної допомоги до працевлаштування.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('open-help-modal'))}>
              <PhoneIcon size={18} />
              Потребую допомоги
            </button>
            <a href="#activities" className="btn-secondary">
              <ChevronRightIcon size={16} />
              Напрями діяльності
            </a>
          </div>

          {/* Progress bar */}
          <div className="hero-progress">
            <div className="hero-progress-label">
              <span>Допомогли ветеранам: <strong>500+</strong></span>
              <span>Мета: <strong>1 000</strong></span>
            </div>
            <div className="hero-progress-bar">
              <div className="hero-progress-fill" style={{ width: '50%' }} />
            </div>
          </div>

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
        <span>Далі</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
