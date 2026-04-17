import React from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import { ArrowRightIcon } from '@/components/icons'

const defaultPartners = [
  { name: 'Bosch', logo: '/media/partners/bosch.webp' },
  { name: 'Acumen International', logo: '/media/partners/acumen-international.webp' },
  { name: 'Укрсиббанк', logo: '/media/partners/ukrsibbank.webp' },
  { name: 'ABInBev Efes', logo: '/media/partners/abinbev-efes.webp' },
  { name: 'Work.ua', logo: '/media/partners/work-ua.webp' },
  { name: 'Accemedin', logo: '/media/partners/accemedin.webp' },
  { name: 'Dragomed', logo: '/media/partners/dragomed.webp' },
  { name: 'Arterium', logo: '/media/partners/arterium.webp' },
  { name: 'Omnifarma', logo: '/media/partners/omnifarma.webp' },
  { name: 'Лекхім', logo: '/media/partners/lekhim.webp' },
  { name: 'БіоМедІнвест', logo: '/media/partners/biomedinvest.webp' },
  { name: 'Україно! Я за тебе!', logo: '/media/partners/ukraino-ya-za-tebe.webp' },
  { name: 'Стрийська Єпархія УГКЦ', logo: '/media/partners/stryyska-eparkhia.webp' },
]

export default function PartnersSection({ locale = 'uk', dict, cmsData }: { locale?: string; dict?: Record<string, string>; cmsData?: Array<{ name: string; logo: string | null; type: string; website: string }> }) {
  const partners = (cmsData && cmsData.length > 0)
    ? cmsData.map(p => ({ name: p.name, logo: p.logo || '/media/partners/placeholder.webp' }))
    : defaultPartners
  const d = dict || { label: 'Партнери', title: 'Разом ми сильніші', description: 'Ми вдячні організаціям та компаніям, що підтримують нашу місію та допомагають ветеранам.', cta: 'Стати партнером', ctaText: 'Ми щиро дякуємо усім за вагомий внесок у підтримку ветеранів з перших днів' }
  return (
    <section className="section partners" id="partners">
      <div className="container">
        <ScrollReveal>
          <div className="section-label" style={{ justifyContent: 'center' }}>{d.label}</div>
          <div className="section-title">{d.title}</div>
          <p className="section-desc" style={{ margin: '0 auto' }}>{d.description}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="partners-cta">
            <p>{d.ctaText}</p>
            <a href="#contacts" className="btn-primary" style={{ flexShrink: 0 }}>
              {d.cta}
              <ArrowRightIcon size={16} />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="partners-logos">
            {partners.map((partner) => (
              <div key={partner.name} className="partner-logo">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={60}
                  style={{ objectFit: 'contain', maxHeight: '50px', width: 'auto' }}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
