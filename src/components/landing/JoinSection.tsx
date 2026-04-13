import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { ArrowRightIcon } from '@/components/icons'

const joinCards = [
  {
    icon: '🤝',
    title: 'Волонтерство',
    description: 'Долучайтеся до нашої команди волонтерів. Ваш час та досвід — безцінні для тих, хто потребує підтримки.',
  },
  {
    icon: '🏢',
    title: 'Партнерство',
    description: 'Станьте нашим партнером — разом ми можемо масштабувати допомогу та охопити більше ветеранів.',
  },
  {
    icon: '💡',
    title: 'Для бізнесу',
    description: 'Корпоративна соціальна відповідальність через реальну допомогу. Працевлаштування ветеранів, спонсорство програм.',
  },
  {
    icon: '⭐',
    title: 'Членство в ГО',
    description: 'Станьте членом громадської організації «Ветеран. Дорога до нового життя» та впливайте на розвиток спільноти.',
  },
]

export default function JoinSection() {
  return (
    <section className="section join" id="join">
      <div className="container">
        <div className="join-header">
          <ScrollReveal>
            <div className="section-label">Долучитися</div>
            <div className="section-title">Станьте частиною змін</div>
            <p className="section-desc">Кожен може допомогти. Оберіть зручний для вас спосіб підтримки — разом ми зможемо більше.</p>
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
              Приєднатися
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
