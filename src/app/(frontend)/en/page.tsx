'use client'

import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function EnglishPage() {
  return (
    <>
      <Header />
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--c-navy)',
        textAlign: 'center',
        padding: '120px 24px 80px',
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(200,16,46,0.15)',
            border: '1px solid rgba(200,16,46,0.3)',
            padding: '8px 20px',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: 'var(--c-gold-light)',
            marginBottom: '32px',
          }}>
            Non-Governmental Organization
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            color: 'var(--c-white)',
            lineHeight: 1.1,
            marginBottom: '8px',
          }}>
            Veteran.<br />
            <em style={{ color: 'var(--c-gold)' }}>Road to a New Life</em>
          </h1>

          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            color: 'var(--c-gold)',
            letterSpacing: '1px',
            marginBottom: '24px',
          }}>
            Support. Recovery. New Opportunities.
          </p>

          <p style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.8,
            maxWidth: '600px',
            margin: '0 auto 40px',
          }}>
            We help veterans and their families rebuild a fulfilling life through comprehensive
            support — from psychological assistance to employment programs.
            Our organization provides 7 key areas of support for over 500 veterans.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
              background: 'var(--c-red)',
              color: 'var(--c-white)',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
            }}>
              🇺🇦 Українська версія
            </Link>
            <a href="/#contacts" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 500,
            }}>
              Contact Us
            </a>
          </div>

          <div style={{
            marginTop: '80px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            maxWidth: '600px',
            margin: '80px auto 0',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 700, color: 'var(--c-red)' }}>500+</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Veterans helped</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 700, color: 'var(--c-red)' }}>7</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Support areas</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 700, color: 'var(--c-red)' }}>50+</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Partners & volunteers</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
