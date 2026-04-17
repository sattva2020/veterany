import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { ChevronRightIcon } from '@/components/icons'

const defaultNews = [
  { id: 1, date: '12 Квітня 2026', tag: 'Подія', title: 'Відкриття нового центру підтримки ветеранів у Києві', description: 'Новий простір для консультацій та зустрічей ветеранської спільноти.' },
  { id: 2, date: '5 Квітня 2026', tag: 'Програма', title: 'Запуск програми «Нова професія»', description: 'Безкоштовне навчання digital-професіям для ветеранів.' },
  { id: 3, date: '28 Березня 2026', tag: 'Партнерство', title: 'Меморандум з міжнародними організаціями', description: 'Нові партнерства для розширення можливостей реабілітації.' },
]

export default function NewsSection({ locale = 'uk', dict, cmsData }: { locale?: string; dict?: Record<string, string>; cmsData?: Array<{ title: string; tag: string; excerpt: string; date: string; image?: string | null }> }) {
  const news = (cmsData && cmsData.length > 0)
    ? cmsData.map((n, i) => ({ id: i + 1, date: n.date ? new Date(n.date).toLocaleDateString(locale === 'uk' ? 'uk-UA' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '', tag: n.tag, title: n.title, description: n.excerpt }))
    : defaultNews
  const d = dict || { label: 'Останні новини', title: 'Що відбувається', viewAll: 'Усі новини', readMore: 'Читати далі' }
  return (
    <section className="section news" id="news">
      <div className="container">
        <div className="news-header">
          <ScrollReveal>
            <div>
              <div className="section-label">{d.label}</div>
              <div className="section-title">{d.title}</div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <button className="btn-outline">
              {d.viewAll}
              <ChevronRightIcon size={14} />
            </button>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="news-grid">
            {news.map((item) => (
              <div key={item.id} className="news-card">
                <div className="news-thumb">
                  <div className="news-date-badge">{item.date}</div>
                </div>
                <div className="news-body">
                  <span className="news-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
