import React from 'react'
import Link from 'next/link'
import { FacebookIcon, InstagramIcon, YouTubeIcon, TelegramIcon } from '@/components/icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <div className="logo-icon">В</div>
              <div className="logo-text">
                Ветеран
                <span>Дорога до нового життя</span>
              </div>
            </Link>
            <p>Комплексна підтримка ветеранів та їхніх родин на шляху до повноцінного мирного життя.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FacebookIcon size={16} /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon size={16} /></a>
              <a href="#" aria-label="YouTube"><YouTubeIcon size={16} /></a>
              <a href="#" aria-label="Telegram"><TelegramIcon size={16} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Меню</h4>
            <ul>
              <li><a href="/#about">Про нас</a></li>
              <li><a href="/#activities">Напрями</a></li>
              <li><a href="/#news">Новини</a></li>
              <li><a href="/#partners">Партнери</a></li>
              <li><a href="/#join">Долучитися</a></li>
              <li><a href="/#contacts">Контакти</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Напрями</h4>
            <ul>
              <li><a href="/#activities">Психологічна підтримка</a></li>
              <li><a href="/#activities">Реабілітація</a></li>
              <li><a href="/#activities">Юридична допомога</a></li>
              <li><a href="/#activities">Працевлаштування</a></li>
              <li><a href="/#activities">Доступне житло</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Контакти</h4>
            <ul>
              <li><a href="tel:+380441234567">+38 (044) 123-45-67</a></li>
              <li><a href="mailto:info@veteran-road.org.ua">info@veteran-road.org.ua</a></li>
              <li><a href="/#contacts">м. Київ, вул. Хрещатик, 1</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 ГО «Ветеран. Дорога до нового життя». Усі права захищено.</p>
          <div>
            <Link href="/privacy" style={{ marginRight: '24px' }}>Політика конфіденційності</Link>
            <a href="#">Реквізити</a>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: '16px', marginTop: '-8px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.5px' }}>
            Розроблено{' '}
            <a href="https://griban.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }}>
              griban.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
