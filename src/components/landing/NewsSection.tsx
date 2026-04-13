import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { ArrowRightIcon } from '@/components/icons'

const news = [
  {
    id: 1,
    date: '12 Квітня 2026',
    tag: 'Подія',
    title: 'Відкриття нового центру підтримки ветеранів у Києві',
    description: 'Новий центр надаватиме комплексну допомогу ветеранам та їхнім родинам, включаючи психологічну підтримку, юридичні консультації та програми реабілітації.',
  },
  {
    id: 2,
    date: '5 Квітня 2026',
    tag: 'Програма',
    title: 'Запуск програми «Нова професія» для ветеранів',
    description: 'Програма перекваліфікації допоможе ветеранам опанувати нові спеціальності у сфері IT, підприємництва та сервісних послуг.',
  },
  {
    id: 3,
    date: '28 Березня 2026',
    tag: 'Партнерство',
    title: 'Підписання меморандуму з міжнародними організаціями',
    description: 'Меморандум про співпрацю відкриває нові можливості для залучення міжнародної експертизи та фінансування програм підтримки.',
  },
]

export default function NewsSection() {
  return (
    <section className="section news" id="news">
      <div className="container">
        <ScrollReveal>
          <div className="section-label">Новини</div>
          <div className="section-title">Останні новини<br />та події</div>
        </ScrollReveal>

        <div className="news-grid">
          {news.map((item, index) => (
            <ScrollReveal key={item.id} delay={index + 1}>
              <div className="news-card">
                <div className="news-thumbnail">
                  <div className="news-thumbnail-placeholder">Фото</div>
                  <div className="news-date-badge">{item.date}</div>
                </div>
                <div className="news-body">
                  <div className="news-tag">{item.tag}</div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-desc">{item.description}</p>
                  <a href="#" className="news-link">
                    Читати далі
                    <ArrowRightIcon size={14} />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="#" className="btn-secondary">
              Усі новини
              <ArrowRightIcon size={16} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
