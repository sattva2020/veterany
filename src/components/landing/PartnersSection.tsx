import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'

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

        <ScrollReveal delay={1}>
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
