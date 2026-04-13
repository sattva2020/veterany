import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { ArrowRightIcon } from '@/components/icons'

export default function PartnersSection() {
  return (
    <section className="section partners" id="partners">
      <div className="container">
        <ScrollReveal>
          <div className="section-label" style={{ justifyContent: 'center' }}>Наші партнери</div>
          <div className="section-title">Разом ми сильніші</div>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Ми вдячні організаціям та компаніям, що підтримують нашу місію та допомагають ветеранам.
          </p>
        </ScrollReveal>

        {/* CTA Banner */}
        <ScrollReveal>
          <div className="partners-cta">
            <p>Ми щиро дякуємо усім за вагомий внесок<br />у підтримку ветеранів з перших днів</p>
            <a href="#contacts" className="btn-primary" style={{ flexShrink: 0 }}>
              Стати партнером
              <ArrowRightIcon size={16} />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="partners-logos">
            <div className="partner-logo">Партнер 1</div>
            <div className="partner-logo">Партнер 2</div>
            <div className="partner-logo">Партнер 3</div>
            <div className="partner-logo">Партнер 4</div>
            <div className="partner-logo">Партнер 5</div>
            <div className="partner-logo">Партнер 6</div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
