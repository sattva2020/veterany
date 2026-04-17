import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const defaultActivities = [
  { number: '01', icon: '🧠', title: 'Психологічна підтримка', description: 'Індивідуальні та групові сесії з кваліфікованими психологами.', featured: true },
  { number: '02', icon: '💪', title: 'Реабілітація', description: 'Фізична реабілітація, протезування, відновлювальна терапія.' },
  { number: '03', icon: '⚖️', title: 'Юридична допомога', description: 'Безкоштовні юридичні консультації щодо пільг та соціального захисту.' },
  { number: '04', icon: '💼', title: 'Працевлаштування', description: 'Допомога з резюме, підготовка до співбесід, база вакансій.' },
  { number: '05', icon: '🏠', title: 'Доступне житло', description: 'Консультації з житлових програм та допомога в оформленні.' },
  { number: '06', icon: '👨‍👩‍👧‍👦', title: 'Робота з родинами', description: 'Підтримка для сімей ветеранів: консультації та групи підтримки.' },
  { number: '07', icon: '📚', title: 'Навчання та розвиток', description: 'Освітні програми, тренінги та майстер-класи.' },
]

interface ActivitiesProps {
  locale?: string
  dict?: Record<string, string>
  cmsData?: Array<{ number: string; icon: string; title: string; description: string; featured?: boolean }>
}

export default function ActivitiesSection({ locale = 'uk', dict, cmsData }: ActivitiesProps) {
  const activities = (cmsData && cmsData.length > 0) ? cmsData : defaultActivities
  const d = dict || {
    label: 'Напрями діяльності', title: 'Комплексна підтримка на кожному етапі',
    description: 'Сім ключових напрямів, які охоплюють усі потреби ветеранів — від першого звернення до повної інтеграції в мирне життя.',
  }
  return (
    <section className="section activities" id="activities">
      <div className="container">
        <div className="activities-header">
          <ScrollReveal>
            <div className="section-label">{d.label}</div>
            <div className="section-title">{d.title}</div>
            <p className="section-desc">{d.description}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="activities-grid">
            {activities.map((activity) => (
              <div key={activity.number} className={`activity-card${activity.featured ? ' featured' : ''}`}>
                {activity.featured ? (
                  <>
                    <div>
                      <div className="card-number">{activity.number}</div>
                      <div className="activity-icon">{activity.icon}</div>
                      <h3>{activity.title}</h3>
                      <p>{activity.description}</p>
                    </div>
                    <div className="featured-image">Фото сесії</div>
                  </>
                ) : (
                  <>
                    <div className="card-number">{activity.number}</div>
                    <div className="activity-icon">{activity.icon}</div>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
