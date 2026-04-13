'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CalendarIcon, UserIcon, FileTextIcon, SettingsIcon, LogOutIcon, HomeIcon } from '@/components/icons'

export default function CabinetPage() {
  const [user, setUser] = useState<any>(null)
  const [consultations, setConsultations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/veteran-profiles/me', { credentials: 'include' })
      if (!res.ok) {
        window.location.href = '/cabinet/login'
        return
      }
      const data = await res.json()
      setUser(data.user)
      loadConsultations()
    } catch {
      window.location.href = '/cabinet/login'
    }
  }

  const loadConsultations = async () => {
    try {
      const res = await fetch('/api/consultations?limit=5&sort=-createdAt', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setConsultations(data.docs || [])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/veteran-profiles/logout', { method: 'POST', credentials: 'include' })
    window.location.href = '/'
  }

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
          <p style={{ color: 'var(--c-text-muted)' }}>Завантаження...</p>
        </div>
        <Footer />
      </>
    )
  }

  const statusLabels: Record<string, string> = {
    pending: 'Очікує',
    confirmed: 'Підтверджено',
    cancelled: 'Скасовано',
    completed: 'Завершено',
  }

  const statusColors: Record<string, string> = {
    pending: 'var(--c-gold)',
    confirmed: '#22c55e',
    cancelled: 'var(--c-red)',
    completed: 'var(--c-blue)',
  }

  return (
    <>
      <Header cabinetLink="/cabinet" />

      <div className="container">
        <div className="cabinet-layout">
          <aside className="cabinet-sidebar">
            <div className="cabinet-sidebar-user">
              <div className="cabinet-sidebar-avatar">👤</div>
              <h3>{user?.name || 'Ветеран'}</h3>
              <p>{user?.email}</p>
            </div>
            <nav className="cabinet-nav">
              <Link href="/cabinet" className="active">
                <HomeIcon size={18} /> Головна
              </Link>
              <Link href="/cabinet/profile">
                <UserIcon size={18} /> Мій профіль
              </Link>
              <Link href="/cabinet/consultations">
                <CalendarIcon size={18} /> Мої консультації
              </Link>
              <Link href="/booking">
                <FileTextIcon size={18} /> Записатись
              </Link>
              <button onClick={handleLogout} style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--c-text-muted)', cursor: 'pointer', width: '100%', transition: 'all 0.3s ease' }}>
                <LogOutIcon size={18} /> Вийти
              </button>
            </nav>
          </aside>

          <main className="cabinet-content">
            <h1>Особистий кабінет</h1>
            <p className="subtitle">Вітаємо, {user?.name || 'ветеране'}! Тут ви можете керувати своїми записами та профілем.</p>

            <div className="cabinet-stats">
              <div className="cabinet-stat-card">
                <h4>Консультацій</h4>
                <div className="value">{consultations.length}</div>
              </div>
              <div className="cabinet-stat-card">
                <h4>Очікують</h4>
                <div className="value">{consultations.filter(c => c.status === 'pending').length}</div>
              </div>
              <div className="cabinet-stat-card">
                <h4>Завершено</h4>
                <div className="value">{consultations.filter(c => c.status === 'completed').length}</div>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--c-navy)', marginBottom: '20px' }}>
              Останні записи
            </h2>

            {consultations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'var(--c-cream)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--c-text-muted)', marginBottom: '16px' }}>У вас поки немає записів на консультацію.</p>
                <Link href="/booking" className="btn-primary" style={{ display: 'inline-flex' }}>Записатись на консультацію</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {consultations.map((c: any) => (
                  <div key={c.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    background: 'var(--c-cream)',
                    borderRadius: '12px',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--c-navy)', marginBottom: '4px' }}>{c.type}</div>
                      <div style={{ fontSize: '13px', color: 'var(--c-text-muted)' }}>{c.date} о {c.time}</div>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: `${statusColors[c.status]}15`,
                      color: statusColors[c.status],
                    }}>
                      {statusLabels[c.status] || c.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '24px' }}>
              <Link href="/booking" className="btn-primary" style={{ display: 'inline-flex' }}>
                <CalendarIcon size={18} /> Нова консультація
              </Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  )
}
