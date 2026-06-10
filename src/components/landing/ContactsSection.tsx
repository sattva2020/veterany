'use client'

import React, { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { SendIcon } from '@/components/icons'

/**
 * Accepts any Google Maps input from user:
 * - Full <iframe> tag → extracts src URL
 * - Short link (maps.app.goo.gl/..., goo.gl/maps/...) → converts to embed
 * - Regular Google Maps URL (google.com/maps/place/...) → converts to embed
 * - Already embed URL (google.com/maps/embed?pb=...) → returns as-is
 */
function parseMapUrl(input: string): string {
  const trimmed = input.trim()

  // 1. Extract src from <iframe> tag
  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i)
  if (srcMatch) return srcMatch[1]

  // 2. Already an embed URL
  if (trimmed.includes('/maps/embed')) return trimmed

  // 3. Regular Google Maps URL or short link → wrap in embed
  if (trimmed.includes('google.com/maps') || trimmed.includes('maps.app.goo.gl') || trimmed.includes('goo.gl/maps')) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed`
  }

  // 4. Just an address or unknown → treat as search query
  return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed`
}

interface CmsContacts {
  address?: string
  phones?: Array<{ number: string; label?: string }>
  email?: string
  workingHours?: string
  googleMapsEmbed?: string
}

export default function ContactsSection({ locale = 'uk', dict, cmsContacts }: { locale?: string; dict?: Record<string, string>; cmsContacts?: CmsContacts }) {
  const d = dict || {
    label: 'Контакти', title: "Зв'яжіться з нами",
    addressLabel: 'Адреса', phoneLabel: 'Телефон', emailLabel: 'Email', hoursLabel: 'Графік роботи',
    formName: "Ім'я", formEmail: 'Email', formPhone: 'Телефон', formMessage: 'Повідомлення',
    formSubmit: 'Надіслати повідомлення', formSuccess: 'Дякуємо! Ваше повідомлення надіслано.',
    formError: 'Помилка. Спробуйте ще раз.',
  }
  const isUk = locale === 'uk'
  const c = cmsContacts || {}
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed')

      fetch('/api/crm-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'contact', ...formData }),
      }).catch(() => {})

      setFormState('success')
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="section contacts" id="contacts">
      <div className="container">
        <ScrollReveal>
          <div className="section-label">{d.label}</div>
          <div className="section-title">{d.title}</div>
          <p className="section-desc">
            {isUk
              ? "Маєте питання або потребуєте допомоги? Ми на зв'язку та готові допомогти."
              : 'Have questions or need help? We are in touch and ready to assist.'}
          </p>
        </ScrollReveal>

        <div className="contacts-grid">
          <ScrollReveal delay={1}>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <h4>{d.addressLabel}</h4>
                  <p>{(c.address || (isUk ? 'м. Київ, вул. Хрещатик, 1\nОфіс 301' : 'Kyiv, Khreshchatyk St., 1\nOffice 301')).split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
                </div>
              </div>

              {/* Телефони — лише реальні зі SiteSettings; вигаданих fallback-номерів немає. */}
              {(c.phones && c.phones.length > 0) && (
                <div className="contact-item">
                  <div className="contact-item-icon">📞</div>
                  <div className="contact-item-text">
                    <h4>{d.phoneLabel}</h4>
                    {c.phones.map((phone, i) => (
                      <span key={i}><a href={`tel:${phone.number.replace(/[\s()-]/g, '')}`}>{phone.number}</a><br /></span>
                    ))}
                  </div>
                </div>
              )}

              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div className="contact-item-text">
                  <h4>{d.emailLabel}</h4>
                  <a href={`mailto:${c.email || 'info@veteran-road.org.ua'}`}>{c.email || 'info@veteran-road.org.ua'}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">🕐</div>
                <div className="contact-item-text">
                  <h4>{d.hoursLabel}</h4>
                  <p>{(c.workingHours || (isUk ? 'Пн — Пт: 9:00 — 18:00\nСб: 10:00 — 14:00' : 'Mon — Fri: 9:00 — 18:00\nSat: 10:00 — 14:00')).split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="contact-map">
              {c.googleMapsEmbed ? (
                <iframe
                  src={parseMapUrl(c.googleMapsEmbed)}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={isUk ? 'Карта розташування офісу' : 'Office Location Map'}
                />
              ) : (
                <span>{isUk ? 'Google Maps — Карта розташування офісу' : 'Google Maps — Office Location'}</span>
              )}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="contact-form">
            <h3>{isUk ? 'Форма зворотного зв\'язку' : 'Contact Form'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="cf-name">{d.formName} *</label>
                  <input
                    type="text"
                    id="cf-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={isUk ? "Ваше ім'я" : 'Your name'}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-phone">{d.formPhone}</label>
                  <input
                    type="tel"
                    id="cf-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+38 (0XX) XXX-XX-XX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-email">{d.formEmail} *</label>
                  <input
                    type="email"
                    id="cf-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-subject">{isUk ? 'Тема' : 'Subject'}</label>
                  <input
                    type="text"
                    id="cf-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={isUk ? 'Тема звернення' : 'Subject of your inquiry'}
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="cf-message">{d.formMessage} *</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={isUk ? 'Опишіть ваше питання або запит...' : 'Describe your question or request...'}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={formState === 'sending'}>
                  {formState === 'sending'
                    ? (isUk ? 'Надсилання...' : 'Sending...')
                    : d.formSubmit}
                  <SendIcon size={16} />
                </button>
                <span className="form-note">
                  {isUk ? 'Ми відповімо протягом 24 годин' : 'We will respond within 24 hours'}
                </span>
              </div>
              {formState === 'success' && (
                <div className="form-message success" style={{ marginTop: '16px' }}>
                  {d.formSuccess}
                </div>
              )}
              {formState === 'error' && (
                <div className="form-message error" style={{ marginTop: '16px' }}>
                  {d.formError}
                </div>
              )}
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
