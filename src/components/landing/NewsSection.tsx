import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { ChevronRightIcon } from '@/components/icons'

const news = [
  {
    id: 1,
    date: '12 Квітня 2026',
    tag: 'Подія',
    title: 'Відкриття нового центру підтримки ветеранів у Києві',
    description: 'Новий простір для консультацій, навчання та зустрічей ветеранської спільноти розпочав роботу на лівому березі.',
  },
  {
    id: 2,
    date: '5 Квітня 2026',
    tag: 'Програма',
    title: 'Запуск програми «Нова професія» для ветеранів',
    description: 'Спільно з IT-компаніями розпочинаємо безкоштовне навчання digital-професіям для учасників бойових дій.',
  },
  {
    id: 3,
    date: '28 Березня 2026',
    tag: 'Партнерство',
    title: 'Підписання меморандуму з міжнародними організаціями',
    description: 'Нові партнерства розширюють можливості реабілітації та підтримки ветеранів на міжнародному рівні.',
  },
]

export default function NewsSection() {
  return (
    <section className="section news" id="news">
      <div className="container">
        <div className="news-header">
          <ScrollReveal>
            <div>
              <div className="section-label">Останні новини</div>
              <div className="section-title">Що відбувається</div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <button className="btn-outline">
              Усі новини
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
