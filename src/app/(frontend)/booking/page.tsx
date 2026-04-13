'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const consultationTypes = [
  { value: 'psychological', label: 'Психологічна' },
  { value: 'legal', label: 'Юридична' },
  { value: 'rehabilitation', label: 'Реабілітаційна' },
  { value: 'employment', label: 'Працевлаштування' },
  { value: 'social', label: 'Соціальна' },
  { value: 'other', label: 'Інша' },
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const selectTime = (time: string) => {
    setFormData(prev => ({ ...prev, time }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed')

      // Fire CRM webhook
      fetch('/api/crm-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'consultation', ...formData }),
      }).catch(() => {})

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // Calculate min date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <>
      <Header />

      <section className="booking-hero">
        <div className="container">
          <h1>Онлайн-запис на консультацію</h1>
          <p>Оберіть зручний час та тип консультації. Наші спеціалісти готові допомогти вам.</p>
        </div>
      </section>

      <section className="booking-form-section">
        <div className="container">
          <div className="booking-form-card">
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--c-navy)', marginBottom: '12px' }}>
                  Запис підтверджено!
                </h2>
                <p style={{ color: 'var(--c-text-muted)', fontSize: '16px', lineHeight: '1.7', maxWidth: '400px', margin: '0 auto 24px' }}>
                  Ми надіслали підтвердження на вашу email-адресу. Наш спеціаліст зв&apos;яжеться з вами для уточнення деталей.
                </p>
                <a href="/" className="btn-primary" style={{ display: 'inline-flex' }}>На головну</a>
              </div>
            ) : (
              <>
                <div className="booking-steps">
                  <div className={`booking-step${step >= 1 ? ' active' : ''}`} onClick={() => setStep(1)}>
                    <div className="booking-step-number">1</div>
                    <h4>Тип та час</h4>
                  </div>
                  <div className={`booking-step${step >= 2 ? ' active' : ''}`} onClick={() => step >= 2 && setStep(2)}>
                    <div className="booking-step-number">2</div>
                    <h4>Ваші дані</h4>
                  </div>
                  <div className={`booking-step${step >= 3 ? ' active' : ''}`}>
                    <div className="booking-step-number">3</div>
                    <h4>Підтвердження</h4>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div>
                      <h2>Оберіть тип консультації</h2>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label htmlFor="type">Тип консультації *</label>
                          <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '15px',
                              padding: '14px 18px',
                              border: '1px solid var(--c-border)',
                              borderRadius: '10px',
                              background: 'var(--c-white)',
                              color: 'var(--c-text)',
                              outline: 'none',
                              width: '100%',
                            }}
                          >
                            <option value="">Оберіть тип...</option>
                            {consultationTypes.map(t => (
                              <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="date">Дата *</label>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={minDate}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Час *</label>
                          <div className="time-slots">
                            {timeSlots.map(time => (
                              <button
                                key={time}
                                type="button"
                                className={`time-slot${formData.time === time ? ' selected' : ''}`}
                                onClick={() => selectTime(time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{ marginTop: '32px', textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => {
                            if (formData.type && formData.date && formData.time) setStep(2)
                          }}
                          disabled={!formData.type || !formData.date || !formData.time}
                        >
                          Далі →
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2>Ваші контактні дані</h2>
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="name">Ім&apos;я *</label>
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ваше ім'я" required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Телефон *</label>
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+38 (0XX) XXX-XX-XX" required />
                        </div>
                        <div className="form-group full-width">
                          <label htmlFor="email">Email *</label>
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required />
                        </div>
                        <div className="form-group full-width">
                          <label htmlFor="message">Додатковий коментар</label>
                          <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Опишіть ваше питання..." />
                        </div>
                      </div>

                      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
                        <button type="button" className="btn-outline" onClick={() => setStep(1)}>← Назад</button>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => {
                            if (formData.name && formData.phone && formData.email) setStep(3)
                          }}
                          disabled={!formData.name || !formData.phone || !formData.email}
                        >
                          Далі →
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h2>Підтвердження запису</h2>
                      <div style={{ background: 'var(--c-cream)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <div style={{ fontSize: '13px', color: 'var(--c-text-light)', marginBottom: '4px' }}>Тип консультації</div>
                            <div style={{ fontWeight: 600, color: 'var(--c-navy)' }}>
                              {consultationTypes.find(t => t.value === formData.type)?.label}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', color: 'var(--c-text-light)', marginBottom: '4px' }}>Дата та час</div>
                            <div style={{ fontWeight: 600, color: 'var(--c-navy)' }}>
                              {formData.date} о {formData.time}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', color: 'var(--c-text-light)', marginBottom: '4px' }}>Ім&apos;я</div>
                            <div style={{ fontWeight: 600, color: 'var(--c-navy)' }}>{formData.name}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', color: 'var(--c-text-light)', marginBottom: '4px' }}>Телефон</div>
                            <div style={{ fontWeight: 600, color: 'var(--c-navy)' }}>{formData.phone}</div>
                          </div>
                          <div style={{ gridColumn: 'span 2' }}>
                            <div style={{ fontSize: '13px', color: 'var(--c-text-light)', marginBottom: '4px' }}>Email</div>
                            <div style={{ fontWeight: 600, color: 'var(--c-navy)' }}>{formData.email}</div>
                          </div>
                          {formData.message && (
                            <div style={{ gridColumn: 'span 2' }}>
                              <div style={{ fontSize: '13px', color: 'var(--c-text-light)', marginBottom: '4px' }}>Коментар</div>
                              <div style={{ color: 'var(--c-text-muted)' }}>{formData.message}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {status === 'error' && (
                        <div className="form-message error">
                          Виникла помилка. Спробуйте ще раз або зателефонуйте нам.
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="button" className="btn-outline" onClick={() => setStep(2)}>← Назад</button>
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={status === 'sending'}
                        >
                          {status === 'sending' ? 'Надсилаємо...' : 'Підтвердити запис'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
