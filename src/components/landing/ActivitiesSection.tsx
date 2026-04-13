import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const activities = [
  {
    number: '01',
    icon: '🧠',
    title: 'Психологічна підтримка',
    description: 'Індивідуальні та групові сесії з кваліфікованими психологами. Робота з ПТСР, адаптацією до мирного життя, відновлення емоційного здоров\'я. Конфіденційно та безоплатно.',
    featured: true,
  },
  {
    number: '02',
    icon: '💪',
    title: 'Реабілітація',
    description: 'Фізична реабілітація, протезування, відновлювальна терапія. Співпрацюємо з провідними медичними закладами для найкращих результатів.',
  },
  {
    number: '03',
    icon: '⚖️',
    title: 'Юридична допомога',
    description: 'Безкоштовні юридичні консультації щодо пільг, статусу учасника бойових дій, земельних питань, соціального захисту та інших правових питань.',
  },
  {
    number: '04',
    icon: '💼',
    title: 'Працевлаштування',
    description: 'Допомога з написанням резюме, підготовка до співбесід, база вакансій від партнерів-роботодавців. Перекваліфікація та курси нових професій.',
  },
  {
    number: '05',
    icon: '🏠',
    title: 'Доступне житло',
    description: 'Консультації з житлових програм, допомога в оформленні документів на отримання житла, співпраця з державними та приватними ініціативами.',
  },
  {
    number: '06',
    icon: '👨‍👩‍👧‍👦',
    title: 'Робота з родинами',
    description: 'Підтримка для сімей ветеранів: сімейні консультації, групи підтримки, допомога дітям. Адаптація всієї родини до нових реалій.',
  },
  {
    number: '07',
    icon: '📚',
    title: 'Навчання та розвиток',
    description: 'Освітні програми, тренінги, майстер-класи. Нові навички для нового етапу життя — від IT-курсів до підприємництва.',
  },
]

export default function ActivitiesSection() {
  return (
    <section className="section activities" id="activities">
      <div className="container">
        <div className="activities-header">
          <ScrollReveal>
            <div className="section-label">Напрями діяльності</div>
            <div className="section-title">Комплексна підтримка<br />на кожному етапі</div>
            <p className="section-desc">Сім ключових напрямів, які охоплюють усі потреби ветеранів — від першого звернення до повної інтеграції в мирне життя.</p>
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
