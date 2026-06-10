'use client'

import React, { useState, useEffect } from 'react'
import { CloseIcon, PhoneIcon, SendIcon } from '@/components/icons'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
  /** Реальний номер із SiteSettings; без нього блок телефону не показується. */
  phone?: string
}

export default function HelpModal({ isOpen, onClose, phone }: HelpModalProps) {
  const telHref = phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : null
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: 'urgent@veteran-road.org.ua',
          subject: 'Терміновий запит допомоги',
        }),
      })
      if (!res.ok) throw new Error('Failed')

      fetch('/api/crm-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'urgent-help', ...formData }),
      }).catch(() => {})

      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const resetAndClose = () => {
    setFormState('idle')
    setFormData({ name: '', phone: '', message: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="help-modal-overlay" onClick={resetAndClose}>
      <div className="help-modal" onClick={e => e.stopPropagation()}>

        {/* Header accent */}
        <div className="help-modal-accent" />

        <button className="help-modal-close" onClick={resetAndClose} aria-label="Закрити">
          <CloseIcon size={20} />
        </button>

        {formState === 'success' ? (
          <div className="help-modal-success">
            <div className="help-modal-success-icon">✅</div>
            <h3>Дякуємо за звернення!</h3>
            <p>Наш спеціаліст зв&apos;яжеться з вами найближчим часом.{telHref ? ' Якщо питання термінове — телефонуйте:' : ''}</p>
            {telHref && (
              <a href={telHref} className="help-modal-phone">
                <PhoneIcon size={18} />
                {phone}
              </a>
            )}
            <button className="btn-outline" onClick={resetAndClose} style={{ marginTop: '16px' }}>
              Закрити
            </button>
          </div>
        ) : (
          <>
            <div className="help-modal-header">
              <div className="help-modal-icon">
                <PhoneIcon size={24} />
              </div>
              <h3>Потребую допомоги</h3>
              <p>Залиште свої контакти — ми зателефонуємо вам якнайшвидше</p>
            </div>

            <form onSubmit={handleSubmit} className="help-modal-form">
              <div className="form-group">
                <label htmlFor="help-name">Ім&apos;я *</label>
                <input
                  type="text"
                  id="help-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше ім'я"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="help-phone">Телефон *</label>
                <input
                  type="tel"
                  id="help-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+38 (0XX) XXX-XX-XX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="help-message">Опишіть ситуацію</label>
                <textarea
                  id="help-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Коротко опишіть, яка допомога вам потрібна..."
                  rows={3}
                />
              </div>

              {formState === 'error' && (
                <div className="form-message error">
                  Помилка. Спробуйте ще раз або зателефонуйте нам.
                </div>
              )}

              <button type="submit" className="btn-primary" disabled={formState === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
                <SendIcon size={16} />
                {formState === 'sending' ? 'Надсилаємо...' : 'Надіслати запит'}
              </button>
            </form>

            {telHref && (
              <div className="help-modal-footer">
                <p>Або зателефонуйте прямо зараз:</p>
                <a href={telHref} className="help-modal-phone">
                  <PhoneIcon size={16} />
                  {phone}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
