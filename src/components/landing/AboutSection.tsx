import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function AboutSection() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <ScrollReveal>
          <div className="section-label">Про організацію</div>
          <div className="section-title">Ми поруч, коли це<br />найбільш потрібно</div>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal delay={1}>
            <div style={{ position: 'relative' }}>
              <div className="about-image">
                <div className="about-image-placeholder">Фото команди</div>
              </div>
              <div style={{ position: 'absolute', bottom: '-12px', right: '-12px', width: '55%', height: '55%', border: '2px solid var(--c-gold)', borderRadius: '16px' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="about-text">
              <p>ГО «Ветеран. Дорога до нового життя» — це громадська організація, що створена для комплексної підтримки ветеранів та їхніх родин у процесі повернення до мирного життя.</p>
              <p>Наша місія — забезпечити кожному ветерану доступ до якісної психологічної, юридичної, медичної та соціальної допомоги. Ми віримо, що повернення — це не кінець служби, а початок нового шляху.</p>
              <p>Працюємо щоденно, щоб жоден захисник не залишився наодинці зі своїми труднощами.</p>

              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">
                    <AnimatedCounter end={500} suffix="+" duration={2200} />
                  </div>
                  <div className="stat-label">Ветеранів отримали допомогу</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <AnimatedCounter end={7} duration={1500} />
                  </div>
                  <div className="stat-label">Напрямів підтримки</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <AnimatedCounter end={50} suffix="+" duration={1800} />
                  </div>
                  <div className="stat-label">Партнерів та волонтерів</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
