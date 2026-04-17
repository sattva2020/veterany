'use client'

import React, { useState } from 'react'
import { ChevronRightIcon } from '@/components/icons'

export interface TimelineStep {
  n: string
  eyebrow: string
  title: string
  short: string
  long: string
  tags: string[]
  meta: string
}

interface Props {
  locale?: string
  dict?: Record<string, string>
  cmsSteps?: TimelineStep[]
}

const defaultStepsByLocale: Record<string, TimelineStep[]> = {
  uk: [
    { n: '01', eyebrow: 'Перший крок', title: 'Звернення',
      short: 'Зателефонуйте, напишіть або приходьте особисто.',
      long: 'Телефоном, у формі на сайті, або через будь-якого знайомого. Ми передзвонюємо протягом 24 годин. Конфіденційно, безоплатно, без осуду — жодна заявка не залишається без відповіді.',
      tags: ['24/7 гаряча лінія', 'Конфіденційно', 'Безоплатно'], meta: '24 години' },
    { n: '02', eyebrow: 'Перше знайомство', title: 'Консультація',
      short: 'Слухаємо, розуміємо, визначаємо пріоритети.',
      long: 'Персональна зустріч із координатором (офлайн у Києві чи онлайн). Разом визначаємо, що потрібно зараз — психологічна, юридична, медична чи соціальна підтримка. Без анкет. Без бланків.',
      tags: ['Офлайн або онлайн', 'Без анкет', 'Зі шанобою'], meta: '60–90 хв' },
    { n: '03', eyebrow: 'Дорога для вас', title: 'План допомоги',
      short: 'Складаємо індивідуальний маршрут із конкретними кроками.',
      long: 'Команда спеціалістів (психолог, юрист, соцпрацівник, ментор) формує ваш персональний план. Прозорі етапи, зрозумілі терміни, відповідальні за кожен крок. Ви знаєте, що буде далі.',
      tags: ['Персональний маршрут', 'Прозорі терміни', 'Один координатор'], meta: '3–7 днів' },
    { n: '04', eyebrow: 'Ми поруч', title: 'Супровід',
      short: 'Супроводжуємо до результату — скільки потрібно.',
      long: 'Не покидаємо після першої зустрічі. Супровід триває стільки, скільки треба вам: від кількох тижнів до років. Щомісячні зустрічі, можливість повернутися в будь-який момент, спільнота тих, хто пройшов цю дорогу.',
      tags: ['Довгостроково', 'Спільнота', 'Без «виписки»'], meta: 'Безстроково' },
  ],
  en: [
    { n: '01', eyebrow: 'First step', title: 'Reach out',
      short: 'Call, write, or visit us in person.',
      long: 'By phone, form on the site, or through a friend. We call back within 24 hours. Confidential, free, no judgment — every request gets an answer.',
      tags: ['24/7 hotline', 'Confidential', 'Free of charge'], meta: '24 hours' },
    { n: '02', eyebrow: 'First meeting', title: 'Consultation',
      short: 'We listen, understand, and find your priorities.',
      long: 'Personal meeting with a coordinator (in-person in Kyiv or online). Together we identify what you need now — psychological, legal, medical, or social support. No forms. No bureaucracy.',
      tags: ['Online or in-person', 'No forms', 'With respect'], meta: '60–90 min' },
    { n: '03', eyebrow: 'Your road', title: 'Support plan',
      short: 'A personal roadmap with concrete steps.',
      long: 'A team of specialists (psychologist, lawyer, social worker, mentor) builds your personalized plan. Clear stages, understandable deadlines, a person responsible for every step.',
      tags: ['Personal roadmap', 'Clear deadlines', 'One coordinator'], meta: '3–7 days' },
    { n: '04', eyebrow: 'We stay', title: 'Ongoing support',
      short: 'We walk with you for as long as it takes.',
      long: "We don't leave after the first meeting. Support lasts as long as you need — from weeks to years. Monthly check-ins, the option to return anytime, and a community of those who walked the road.",
      tags: ['Long-term', 'Community', 'No "discharge"'], meta: 'Open-ended' },
  ],
}

export default function HowWeWorkSection({ locale = 'uk', dict, cmsSteps }: Props) {
  const steps = (cmsSteps && cmsSteps.length > 0) ? cmsSteps : (defaultStepsByLocale[locale] || defaultStepsByLocale.uk)
  const d = dict || {
    label: locale === 'en' ? 'The road with us' : 'Дорога разом із нами',
    title: locale === 'en' ? 'Comprehensive support — a four-step journey' : 'Комплексна підтримка — шлях із чотирьох кроків',
    description: locale === 'en'
      ? 'From the first call to returning to a peaceful rhythm of life — we are nearby at every stage. No paperwork, no bureaucracy, no judgment.'
      : 'Від першого дзвінка до повернення до мирного ритму життя — ми поруч на кожному етапі. Без паперової тяганини, без бюрократії, без оцінок.',
    cta: locale === 'en' ? 'Start this step' : 'Почати крок',
  }

  const [active, setActive] = useState(0)
  const progress = ((active + 0.5) / steps.length) * 100
  const cur = steps[active]

  return (
    <section className="rd-sec timeline-sec" id="how-we-work">
      <div className="container">
        <div className="rd-sec-head center">
          <div className="rd-eyebrow">{d.label}</div>
          <h2 className="rd-sec-title">{d.title}</h2>
          <p className="rd-sec-lead">{d.description}</p>
        </div>

        <div
          className="timeline-track"
          style={{ ['--progress' as any]: `${progress}%` }}
        >
          <div className="timeline-steps">
            {steps.map((s, i) => (
              <button
                key={i}
                type="button"
                className={`tl-step ${i === active ? 'active' : ''} ${i < active ? 'done' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <div className="tl-num">
                  <div className="tl-num-ring" />
                  <div className="tl-num-inner">{s.n}</div>
                </div>
                <div className="tl-eyebrow">{s.eyebrow}</div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <div className="tl-meta">{s.meta}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="tl-detail" role="region" aria-live="polite">
          <div className="tl-detail-num">{cur.n}</div>
          <div>
            <h4>{cur.title}</h4>
            <p>{cur.long}</p>
            <ul className="tl-detail-tags">
              {cur.tags.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <a
            className="tl-cta"
            href="#contacts"
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-help-modal')) }}
          >
            {d.cta}
            <ChevronRightIcon size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
