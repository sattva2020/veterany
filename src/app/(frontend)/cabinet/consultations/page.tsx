'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HomeIcon, UserIcon, CalendarIcon, FileTextIcon, LogOutIcon } from '@/components/icons'

export default function CabinetConsultationsPage() {
  const [user, setUser] = useState<any>(null)
  const [consultations, setConsultations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/veteran-profiles/me', { credentials: 'include' })
      .then(res => {
        if (!res.ok) { window.location.href = '/cabinet/login'; return null }
        return res.json()
      })
      .then(data => {
        if (data?.user) {
          setUser(data.user)
          return fetch('/api/consultations?sort=-createdAt', { credentials: 'include' })
        }
      })
      .then(res => res?.json())
      .then(data => {
        if (data?.docs) setConsultations(data.docs)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/veteran-profiles/logout', { method: 'POST', credentials: 'include' })
    window.location.href = '/'
  }

  const statusLabels: Record<string, string> = { pending: 'Очікує', confirmed: 'Підтверджено', cancelled: 'Скасовано', completed: 'Завершено' }
  const statusColors: Record<string, string> = { pending: 'var(--c-gold)', confirmed: '#22c55e', cancelled: 'var(--c-red)', completed: 'var(--c-blue)' }
  const typeLabels: Record<string, string> = { psychological: 'Психологічна', legal: 'Юридична', rehabilitation: 'Реабілітаційна', employment: 'Працевлаштування', social: 'Соціальна', other: 'Інша' }

  if (loading) return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <p style={{ color: 'var(--c-text-muted)' }}>Завантаження...</p>
      </div>
      <Footer />
    </>
  )

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
              <Link href="/cabinet"><HomeIcon size={18} /> Головна</Link>
              <Link href="/cabinet/profile"><UserIcon size={18} /> Мій профіль</Link>
              <Link href="/cabinet/consultations" className="active"><CalendarIcon size={18} /> Мої консультації</Link>
              <Link href="/booking"><FileTextIcon size={18} /> Записатись</Link>
              <button onClick={handleLogout} style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: 'var(--c-text-muted)', cursor: 'pointer', width: '100%' }}>
                <LogOutIcon size={18} /> Вийти
              </button>
            </nav>
          </aside>

          <main className="cabinet-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
              <div>
                <h1>Мої консультації</h1>
                <p className="subtitle" style={{ marginBottom: 0 }}>Історія ваших записів</p>
              </div>
              <Link href="/booking" className="btn-primary" style={{ display: 'inline-flex' }}>
                <CalendarIcon size={18} /> Новий запис
              </Link>
            </div>

            {consultations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 40px', background: 'var(--c-cream)', borderRadius: '12px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                <p style={{ color: 'var(--c-text-muted)', marginBottom: '16px' }}>У вас поки немає записів на консультацію.</p>
                <Link href="/booking" className="btn-primary" style={{ display: 'inline-flex' }}>Записатись</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {consultations.map((c: any) => (
                  <div key={c.id} style={{
                    padding: '20px 24px',
                    background: 'var(--c-cream)',
                    borderRadius: '12px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr auto',
                    gap: '16px',
                    alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--c-navy)', marginBottom: '4px', fontSize: '16px' }}>
                        {typeLabels[c.type] || c.type}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--c-text-muted)' }}>
                        {c.date} о {c.time}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--c-text-muted)' }}>
                      {c.message ? c.message.substring(0, 60) + (c.message.length > 60 ? '...' : '') : '—'}
                    </div>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: `${statusColors[c.status]}15`,
                      color: statusColors[c.status],
                      whiteSpace: 'nowrap',
                    }}>
                      {statusLabels[c.status] || c.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
