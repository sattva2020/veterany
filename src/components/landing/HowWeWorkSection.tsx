import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const defaultSteps = [
  { number: 1, title: 'Звернення', description: 'Зателефонуйте, напишіть або заповніть форму на сайті.' },
  { number: 2, title: 'Консультація', description: 'Наш спеціаліст визначить ваші потреби.' },
  { number: 3, title: 'План допомоги', description: 'Складаємо індивідуальний план підтримки.' },
  { number: 4, title: 'Супровід', description: 'Комплексний супровід на кожному етапі.' },
]

export default function HowWeWorkSection({ locale = 'uk', dict, cmsSteps }: { locale?: string; dict?: Record<string, string>; cmsSteps?: Array<{ number: number; title: string; description: string }> }) {
  const steps = (cmsSteps && cmsSteps.length > 0) ? cmsSteps : defaultSteps
  const d = dict || { label: 'Як ми працюємо', title: 'Схема роботи', description: 'Від першого звернення до результату — простий та зрозумілий процес отримання допомоги.' }
  return (
    <section className="section how-we-work" id="how-we-work">
      <div className="container">
        <div className="how-we-work-header">
          <ScrollReveal>
            <div className="section-label">{d.label}</div>
            <div className="section-title">{d.title}</div>
            <p className="section-desc">{d.description}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
