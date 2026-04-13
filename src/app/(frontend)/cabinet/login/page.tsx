'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function CabinetLoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'register') {
        const res = await fetch('/api/veteran-profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.errors?.[0]?.message || 'Помилка реєстрації')
        }
      }

      const res = await fetch('/api/veteran-profiles/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Невірний email або пароль')
      }

      window.location.href = '/cabinet'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="logo">
          <div className="logo-icon">В</div>
          <div className="logo-text">
            Ветеран
            <span>Дорога до нового життя</span>
          </div>
        </Link>

        <h1>{mode === 'login' ? 'Вхід' : 'Реєстрація'}</h1>
        <p className="subtitle">
          {mode === 'login'
            ? 'Увійдіть до особистого кабінету'
            : 'Створіть акаунт для доступу до кабінету'}
        </p>

        {error && <div className="form-message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="name">Ім&apos;я *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше повне ім'я"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Мінімум 6 символів"
                minLength={6}
                required
              />
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? 'Зачекайте...' : mode === 'login' ? 'Увійти' : 'Зареєструватися'}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--c-text-muted)' }}>
          {mode === 'login' ? (
            <>
              Немає акаунту?{' '}
              <button
                onClick={() => { setMode('register'); setError('') }}
                style={{ background: 'none', border: 'none', color: 'var(--c-red)', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}
              >
                Зареєструватися
              </button>
            </>
          ) : (
            <>
              Вже маєте акаунт?{' '}
              <button
                onClick={() => { setMode('login'); setError('') }}
                style={{ background: 'none', border: 'none', color: 'var(--c-red)', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}
              >
                Увійти
              </button>
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--c-text-light)' }}>← Повернутися на головну</Link>
        </div>
      </div>
    </div>
  )
}
