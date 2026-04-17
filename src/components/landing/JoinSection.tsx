import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { ArrowRightIcon } from '@/components/icons'

const defaultJoinCards = [
  { icon: '🤝', title: 'Волонтерство', description: 'Долучайтеся до нашої команди волонтерів.' },
  { icon: '🏢', title: 'Партнерство', description: 'Станьте нашим партнером для масштабування допомоги.' },
  { icon: '💡', title: 'Для бізнесу', description: 'Корпоративна соціальна відповідальність через реальну допомогу.' },
  { icon: '⭐', title: 'Членство в ГО', description: 'Станьте членом організації та впливайте на розвиток спільноти.' },
]

export default function JoinSection({ locale = 'uk', dict, cmsData }: { locale?: string; dict?: Record<string, string>; cmsData?: Array<{ icon: string; title: string; description: string }> }) {
  const joinCards = (cmsData && cmsData.length > 0) ? cmsData : defaultJoinCards
  const d = dict || { label: 'Долучитися', title: 'Станьте частиною змін', description: 'Кожен може допомогти. Оберіть зручний для вас спосіб підтримки — разом ми зможемо більше.', cta: 'Приєднатися' }
  return (
    <section className="section join" id="join">
      <div className="container">
        <div className="join-header">
          <ScrollReveal>
            <div className="section-label">{d.label}</div>
            <div className="section-title">{d.title}</div>
            <p className="section-desc">{d.description}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="join-grid">
            {joinCards.map((card) => (
              <div key={card.title} className="join-card">
                <div className="join-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="join-cta">
          <ScrollReveal>
            <a href="#contacts" className="btn-gold">
              {d.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
