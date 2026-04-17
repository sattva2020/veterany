import React from 'react'
import Link from 'next/link'
import { FacebookIcon, InstagramIcon, YouTubeIcon, TelegramIcon } from '@/components/icons'

interface FooterProps {
  locale?: string
  dict?: Record<string, string>
}

export default function Footer({ locale = 'uk', dict }: FooterProps) {
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
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FacebookIcon size={16} /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon size={16} /></a>
              <a href="#" aria-label="YouTube"><YouTubeIcon size={16} /></a>
              <a href="#" aria-label="Telegram"><TelegramIcon size={16} /></a>
            </div>
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

          <div className="footer-col">
            <h4>{d.contactInfo}</h4>
            <ul>
              <li><a href="tel:+380441234567">+38 (044) 123-45-67</a></li>
              <li><a href="mailto:info@veteran-road.org.ua">info@veteran-road.org.ua</a></li>
              <li><a href={`/${locale}#contacts`}>{isUk ? 'м. Київ, вул. Хрещатик, 1' : 'Kyiv, Khreshchatyk St., 1'}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{d.copyright}</p>
          <div>
            <Link href={`/${locale}/privacy`} style={{ marginRight: '24px' }}>{d.privacy}</Link>
          </div>
        </div>

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
