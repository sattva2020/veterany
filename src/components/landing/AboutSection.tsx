import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'

interface AboutProps {
  locale?: string
  dict?: Record<string, string>
}

export default function AboutSection({ locale = 'uk', dict }: AboutProps) {
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
                <div className="about-image-placeholder">{d.photoAlt}</div>
              </div>
              <div style={{ position: 'absolute', bottom: '-12px', right: '-12px', width: '55%', height: '55%', border: '2px solid var(--c-gold)', borderRadius: '16px' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="about-text">
              <p>{d.text1}</p>
              <p>{d.text2}</p>
              <p>{d.text3}</p>

              <div className="about-stats">
                <div className="stat-item stat-card">
                  <div className="stat-number">
                    <AnimatedCounter end={500} suffix="+" duration={2200} />
                  </div>
                  <div className="stat-label">Ветеранів отримали допомогу</div>
                </div>
                <div className="stat-item stat-card">
                  <div className="stat-number">
                    <AnimatedCounter end={50} suffix="+" duration={1800} />
                  </div>
                  <div className="stat-label">Партнерів та волонтерів</div>
                </div>
                <div className="stat-item stat-card">
                  <div className="stat-number">
                    <AnimatedCounter end={3} duration={1200} />
                  </div>
                  <div className="stat-label">Роки активної діяльності</div>
                </div>
                <div className="stat-item stat-card">
                  <div className="stat-number">
                    <AnimatedCounter end={12} suffix="+" duration={1500} />
                  </div>
                  <div className="stat-label">Напрямів підтримки</div>
                </div>
                <div className="stat-item stat-card">
                  <div className="stat-number">
                    <AnimatedCounter end={100} suffix="+" duration={1800} />
                  </div>
                  <div className="stat-label">Проведених заходів</div>
                </div>
                <div className="stat-item stat-card">
                  <div className="stat-number stat-number-gold">24/7</div>
                  <div className="stat-label">Лінія підтримки</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
