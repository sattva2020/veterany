'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HomeIcon, UserIcon, CalendarIcon, FileTextIcon, LogOutIcon } from '@/components/icons'

export default function CabinetProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', status: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/veteran-profiles/me', { credentials: 'include' })
      .then(res => {
        if (!res.ok) { window.location.href = '/cabinet/login'; return null }
        return res.json()
      })
      .then(data => {
        if (data?.user) {
          setUser(data.user)
          setFormData({
            name: data.user.name || '',
            phone: data.user.phone || '',
            status: data.user.status || '',
            notes: data.user.notes || '',
          })
        }
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch(`/api/veteran-profiles/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
      if (res.ok) setMessage('Профіль оновлено!')
      else throw new Error()
    } catch {
      setMessage('Помилка збереження')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/veteran-profiles/logout', { method: 'POST', credentials: 'include' })
    window.location.href = '/'
  }

  if (!user) return null

  return (
    <>
      <Header cabinetLink="/cabinet" />
      <div className="container">
        <div className="cabinet-layout">
          <aside className="cabinet-sidebar">
            <div className="cabinet-sidebar-user">
              <div className="cabinet-sidebar-avatar">👤</div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <nav className="cabinet-nav">
              <Link href="/cabinet"><HomeIcon size={18} /> Головна</Link>
              <Link href="/cabinet/profile" className="active"><UserIcon size={18} /> Мій профіль</Link>
              <Link href="/cabinet/consultations"><CalendarIcon size={18} /> Мої консультації</Link>
              <Link href="/booking"><FileTextIcon size={18} /> Записатись</Link>
              <button onClick={handleLogout} style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--c-text-muted)', cursor: 'pointer', width: '100%' }}>
                <LogOutIcon size={18} /> Вийти
              </button>
            </nav>
          </aside>

          <main className="cabinet-content">
            <h1>Мій профіль</h1>
            <p className="subtitle">Оновіть ваші персональні дані</p>

            {message && (
              <div className={`form-message ${message.includes('Помилка') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Повне ім&apos;я *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+38 (0XX) XXX-XX-XX" />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Статус</label>
                  <select id="status" name="status" value={formData.status} onChange={handleChange} style={{ fontFamily: 'var(--font-body)', fontSize: '15px', padding: '14px 18px', border: '1px solid var(--c-border)', borderRadius: '10px', background: 'var(--c-white)', color: 'var(--c-text)', outline: 'none' }}>
                    <option value="">Не вказано</option>
                    <option value="combat">Учасник бойових дій</option>
                    <option value="service">Ветеран служби</option>
                    <option value="family">Родина ветерана</option>
                    <option value="other">Інше</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user.email} disabled style={{ opacity: 0.6 }} />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="notes">Додаткова інформація</label>
                  <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Будь-яка додаткова інформація..." />
                </div>
              </div>
              <div style={{ marginTop: '24px' }}>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Збереження...' : 'Зберегти зміни'}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
