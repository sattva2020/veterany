import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'

interface AboutProps {
  locale?: string
  dict?: Record<string, string>
  cmsStats?: Array<{ number: string; label: string }>
  cmsParagraphs?: string[]
  cmsImage?: string | null
}

export default function AboutSection({ locale = 'uk', dict, cmsStats, cmsParagraphs, cmsImage }: AboutProps) {
  const d = dict || {
    label: 'Про організацію', title: 'Ми поруч, коли це найбільш потрібно',
    text1: 'ГО «Ветеран. Дорога до нового життя» — це громадська організація, що створена для комплексної підтримки ветеранів та їхніх родин у процесі повернення до мирного життя.',
    text2: 'Наша місія — забезпечити кожному ветерану доступ до якісної психологічної, юридичної, медичної та соціальної допомоги. Ми віримо, що повернення — це не кінець служби, а початок нового шляху.',
    text3: 'Працюємо щоденно, щоб жоден захисник не залишився наодинці зі своїми труднощами.',
    photoAlt: 'Фото команди',
  }
  return (
    <section className="section about" id="about">
      <div className="container">
        <ScrollReveal>
          <div className="section-label">{d.label}</div>
          <div className="section-title">{d.title}</div>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal delay={1}>
            <div style={{ position: 'relative' }}>
              <div className="about-image">
                {cmsImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cmsImage} alt={d.photoAlt} style={{ width: '100%', height: 'auto', display: 'block' }} />
                ) : (
                  <div className="about-image-placeholder">{d.photoAlt}</div>
                )}
              </div>
              <div style={{ position: 'absolute', bottom: '-12px', right: '-12px', width: '55%', height: '55%', border: '2px solid var(--c-gold)', borderRadius: '16px' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="about-text">
              {cmsParagraphs && cmsParagraphs.length > 0
                ? cmsParagraphs.map((p, i) => <p key={i}>{p}</p>)
                : (
                  <>
                    <p>{d.text1}</p>
                    <p>{d.text2}</p>
                    <p>{d.text3}</p>
                  </>
                )}

              <div className="about-stats">
                {(cmsStats && cmsStats.length > 0 ? cmsStats : [
                  { number: '500+', label: 'Ветеранів отримали допомогу' },
                  { number: '50+', label: 'Партнерів та волонтерів' },
                  { number: '3', label: 'Роки активної діяльності' },
                  { number: '12+', label: 'Напрямів підтримки' },
                  { number: '100+', label: 'Проведених заходів' },
                  { number: '24/7', label: 'Лінія підтримки' },
                ]).map((stat, i) => (
                  <div key={i} className="stat-item stat-card">
                    <div className={`stat-number${stat.number === '24/7' ? ' stat-number-gold' : ''}`}>
                      {stat.number}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
