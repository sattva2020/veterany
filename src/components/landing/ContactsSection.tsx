'use client'

import React, { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { SendIcon } from '@/components/icons'

export default function ContactsSection({ locale = 'uk', dict }: { locale?: string; dict?: Record<string, string> }) {
  const d = dict || {
    label: 'Контакти', title: "Зв'яжіться з нами",
    addressLabel: 'Адреса', phoneLabel: 'Телефон', emailLabel: 'Email', hoursLabel: 'Графік роботи',
    formName: "Ім'я", formEmail: 'Email', formPhone: 'Телефон', formMessage: 'Повідомлення',
    formSubmit: 'Надіслати повідомлення', formSuccess: 'Дякуємо! Ваше повідомлення надіслано.',
    formError: 'Помилка. Спробуйте ще раз.',
  }
  const isUk = locale === 'uk'
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
                  <p>{isUk ? 'м. Київ, вул. Хрещатик, 1' : 'Kyiv, Khreshchatyk St., 1'}<br />{isUk ? 'Офіс 301' : 'Office 301'}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div className="contact-item-text">
                  <h4>{d.phoneLabel}</h4>
                  <a href="tel:+380441234567">+38 (044) 123-45-67</a><br />
                  <a href="tel:+380501234567">+38 (050) 123-45-67</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div className="contact-item-text">
                  <h4>{d.emailLabel}</h4>
                  <a href="mailto:info@veteran-road.org.ua">info@veteran-road.org.ua</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">🕐</div>
                <div className="contact-item-text">
                  <h4>{d.hoursLabel}</h4>
                  <p>{isUk ? 'Пн — Пт: 9:00 — 18:00' : 'Mon — Fri: 9:00 — 18:00'}<br />{isUk ? 'Сб: 10:00 — 14:00' : 'Sat: 10:00 — 14:00'}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="contact-map">
              {isUk ? 'Google Maps — Карта розташування офісу' : 'Google Maps — Office Location'}
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
