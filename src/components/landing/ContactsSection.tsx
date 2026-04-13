'use client'

import React, { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { SendIcon } from '@/components/icons'

export default function ContactsSection() {
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
          <div className="section-label">Контакти</div>
          <div className="section-title">Зв&apos;яжіться з нами</div>
          <p className="section-desc">Маєте питання або потребуєте допомоги? Ми на зв&apos;язку та готові допомогти.</p>
        </ScrollReveal>

        <div className="contacts-grid">
          <ScrollReveal delay={1}>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <h4>Адреса</h4>
                  <p>м. Київ, вул. Хрещатик, 1<br />Офіс 301</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div className="contact-item-text">
                  <h4>Телефон</h4>
                  <a href="tel:+380441234567">+38 (044) 123-45-67</a><br />
                  <a href="tel:+380501234567">+38 (050) 123-45-67</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div className="contact-item-text">
                  <h4>Email</h4>
                  <a href="mailto:info@veteran-road.org.ua">info@veteran-road.org.ua</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">🕐</div>
                <div className="contact-item-text">
                  <h4>Графік роботи</h4>
                  <p>Пн — Пт: 9:00 — 18:00<br />Сб: 10:00 — 14:00</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="contact-map">
              Google Maps — Карта розташування офісу
            </div>
          </ScrollReveal>
        </div>

        {/* Contact Form */}
        <ScrollReveal>
          <div className="contact-form">
            <h3>Форма зворотного зв&apos;язку</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="cf-name">Ім&apos;я *</label>
                  <input
                    type="text"
                    id="cf-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше ім'я"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-phone">Телефон</label>
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
                  <label htmlFor="cf-email">Email *</label>
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
                  <label htmlFor="cf-subject">Тема</label>
                  <input
                    type="text"
                    id="cf-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Тема звернення"
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="cf-message">Повідомлення *</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Опишіть ваше питання або запит..."
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={formState === 'sending'}>
                  {formState === 'sending' ? 'Надсилання...' : 'Надіслати повідомлення'}
                  <SendIcon size={16} />
                </button>
                <span className="form-note">Ми відповімо протягом 24 годин</span>
              </div>
              {formState === 'success' && (
                <div className="form-message success" style={{ marginTop: '16px' }}>
                  Дякуємо! Ваше повідомлення надіслано. Ми зв&apos;яжемося з вами найближчим часом.
                </div>
              )}
              {formState === 'error' && (
                <div className="form-message error" style={{ marginTop: '16px' }}>
                  Виникла помилка. Будь ласка, спробуйте ще раз або зателефонуйте нам.
                </div>
              )}
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
