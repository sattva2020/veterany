import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const testimonials = [
  {
    text: 'Після повернення з фронту я не знав, куди звернутися. Організація «Ветеран» стала для мене опорою — психолог допоміг впоратися з тривогою, а юрист розібрався з документами на пільги. Дякую за все, що ви робите.',
    name: 'Олексій К.',
    role: 'Учасник бойових дій',
    initials: 'ОК',
  },
  {
    text: 'Моєму чоловіку допомогли з реабілітацією після поранення. Спеціалісти організації супроводжували нас на кожному етапі. Окремо вдячна за групи підтримки для родин — це дуже потрібно.',
    name: 'Марія Т.',
    role: 'Дружина ветерана',
    initials: 'МТ',
  },
  {
    text: 'Завдяки програмі перекваліфікації я опанував нову IT-професію і знайшов роботу за два місяці. Це повністю змінило моє життя після демобілізації. Рекомендую всім ветеранам.',
    name: 'Сергій П.',
    role: 'Ветеран, IT-спеціаліст',
    initials: 'СП',
  },
  {
    text: 'Як волонтер організації, я бачу реальний вплив щодня. Кожна історія успіху наших підопічних надихає продовжувати. Команда «Ветеран» — це професіонали, яким довіряєш.',
    name: 'Ірина В.',
    role: 'Волонтерка',
    initials: 'ІВ',
  },
]

export default function TestimonialsSection({ locale = 'uk', dict }: { locale?: string; dict?: Record<string, string> }) {
  const d = dict || { label: 'Відгуки', title: 'Що кажуть наші підопічні', subtitle: 'Реальні історії людей, яким ми допомогли на шляху до нового життя.' }
  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <ScrollReveal>
            <div className="section-label">{d.label}</div>
            <div className="section-title">{d.title}</div>
            <p className="section-desc">{d.subtitle}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div className="testimonial-author-info">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
