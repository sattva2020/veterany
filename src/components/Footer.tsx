import React from 'react'
import Link from 'next/link'
import { FacebookIcon, InstagramIcon, YouTubeIcon, TelegramIcon, TikTokIcon, ViberIcon, WhatsAppIcon } from '@/components/icons'

export interface SocialLink {
  platform: string
  url: string
}

export interface FooterContacts {
  phones?: { number?: string; label?: string }[]
  email?: string
  address?: string
}

export interface FooterRequisites {
  legalName?: string
  edrpou?: string
}

interface FooterProps {
  locale?: string
  dict?: Record<string, string>
  socials?: SocialLink[]
  contacts?: FooterContacts
  requisites?: FooterRequisites
}

const socialIcons: Record<string, React.FC<{ size?: number }>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  telegram: TelegramIcon,
  tiktok: TikTokIcon,
  viber: ViberIcon,
  whatsapp: WhatsAppIcon,
}

export default function Footer({ locale = 'uk', dict, socials, contacts, requisites }: FooterProps) {
  const d = dict || {
    description: 'Комплексна підтримка ветеранів та їхніх родин на шляху до повноцінного мирного життя.',
    quickLinks: 'Меню', contactInfo: 'Контакти',
    copyright: '© 2024 ГО «Ветеран. Дорога до нового життя». Всі права захищені.',
    privacy: 'Політика конфіденційності',
  }

  const isUk = locale === 'uk'

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href={`/${locale}`} className="logo">
              <div className="logo-icon">{isUk ? 'В' : 'V'}</div>
              <div className="logo-text">
                {isUk ? 'Ветеран' : 'Veteran'}
                <span>{isUk ? 'Дорога до нового життя' : 'Road to a New Life'}</span>
              </div>
            </Link>
            <p>{d.description}</p>
            {/* Соцмережі — лише реальні посилання з SiteSettings (вкладка «Соцмережі»). */}
            {socials && socials.length > 0 && (
              <div className="footer-social">
                {socials.map((s, i) => {
                  const Icon = socialIcons[s.platform]
                  if (!Icon || !s.url) return null
                  return (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <div className="footer-col">
            <h4>{d.quickLinks}</h4>
            <ul>
              <li><a href={`/${locale}#about`}>{isUk ? 'Про нас' : 'About'}</a></li>
              <li><a href={`/${locale}#activities`}>{isUk ? 'Напрями' : 'Programs'}</a></li>
              <li><a href={`/${locale}#news`}>{isUk ? 'Новини' : 'News'}</a></li>
              <li><a href={`/${locale}#partners`}>{isUk ? 'Партнери' : 'Partners'}</a></li>
              <li><a href={`/${locale}#join`}>{isUk ? 'Долучитися' : 'Get Involved'}</a></li>
              <li><a href={`/${locale}#contacts`}>{isUk ? 'Контакти' : 'Contact'}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{isUk ? 'Напрями' : 'Programs'}</h4>
            <ul>
              <li><a href={`/${locale}#activities`}>{isUk ? 'Психологічна підтримка' : 'Psychological Support'}</a></li>
              <li><a href={`/${locale}#activities`}>{isUk ? 'Реабілітація' : 'Rehabilitation'}</a></li>
              <li><a href={`/${locale}#activities`}>{isUk ? 'Юридична допомога' : 'Legal Aid'}</a></li>
              <li><a href={`/${locale}#activities`}>{isUk ? 'Працевлаштування' : 'Employment'}</a></li>
              <li><a href={`/${locale}#activities`}>{isUk ? 'Доступне житло' : 'Housing'}</a></li>
            </ul>
          </div>

          {/* Контакти — лише реальні дані з SiteSettings; порожні поля не показуються. */}
          {(contacts?.phones?.length || contacts?.email || contacts?.address) ? (
            <div className="footer-col">
              <h4>{d.contactInfo}</h4>
              <ul>
                {(contacts?.phones || []).map((p, i) =>
                  p.number ? (
                    <li key={i}>
                      <a href={`tel:${p.number.replace(/[^+\d]/g, '')}`}>{p.number}</a>
                    </li>
                  ) : null,
                )}
                {contacts?.email && (
                  <li><a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
                )}
                {contacts?.address && (
                  <li><a href={`/${locale}#contacts`}>{contacts.address.split('\n')[0]}</a></li>
                )}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="footer-bottom">
          <p>{d.copyright}</p>
          <div>
            <Link href="/privacy" style={{ marginRight: '24px' }}>{d.privacy}</Link>
          </div>
        </div>

        {/* Реквізити організації (вимога ТЗ: реквізити в підвалі) — з вкладки SiteSettings «Реквізити». */}
        {(requisites?.legalName || requisites?.edrpou) && (
          <div style={{ textAlign: 'center', paddingBottom: '8px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3px' }}>
              {requisites?.legalName}
              {requisites?.legalName && requisites?.edrpou ? ' · ' : ''}
              {requisites?.edrpou ? `${isUk ? 'Код ЄДРПОУ' : 'EDRPOU'}: ${requisites.edrpou}` : ''}
            </p>
          </div>
        )}

        <div style={{ textAlign: 'center', paddingBottom: '16px', marginTop: '-8px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.5px' }}>
            {isUk ? 'Розроблено' : 'Developed by'}{' '}
            <a href="https://griban.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }}>
              griban.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
