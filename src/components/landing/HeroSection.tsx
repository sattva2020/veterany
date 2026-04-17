'use client'

import React, { useState } from 'react'
import { ChevronRightIcon, PhoneIcon } from '@/components/icons'

export interface HeroStory {
  chapter: string
  title1: string
  title2: string
  body: string
  photo?: string | null
  name: string
  meta: string
}

interface HeroProps {
  locale?: string
  dict?: Record<string, string>
  stories?: HeroStory[]
}

const defaultStoriesByLocale: Record<string, HeroStory[]> = {
  uk: [
    {
      chapter: 'Історія 01 · Олексій',
      title1: 'Три роки тому він',
      title2: 'не міг спати ночами.',
      body: 'ьогодні Олексій керує невеликою кавʼярнею в Ірпені, виховує доньку та раз на місяць приходить підтримати інших — тих, хто тільки починає свою дорогу назад. Ми не кажемо, що було легко. Ми кажемо, що поруч був хтось, хто знав шлях.',
      name: 'Олексій Я.',
      meta: '47 ОМБр · Повернувся 2024 · Ірпінь',
      photo: null,
    },
    {
      chapter: 'Історія 02 · Марія',
      title1: 'Вона мовчала пів року —',
      title2: 'тепер веде групу підтримки.',
      body: 'аріїн чоловік повернувся з фронту, але дім ще довго лишався чужим. Разом із психологами «Дороги» вона навчилась слухати — і говорити. Сьогодні Марія координує зустрічі дружин ветеранів у Києві.',
      name: 'Марія К.',
      meta: 'Дружина ветерана · Волонтерка',
      photo: null,
    },
    {
      chapter: 'Історія 03 · Богдан',
      title1: 'Пів року він не міг',
      title2: 'зрушити документи.',
      body: 'огдан намагався сам — без успіху. Юрист «Дороги» за два тижні оформив усе. «Просто сів поруч і сказав: підпишемо це разом», — згадує він. Сьогодні Богдан допомагає іншим із тим самим шляхом.',
      name: 'Богдан С.',
      meta: '93 ОМБр · Холодний Яр',
      photo: null,
    },
    {
      chapter: 'Історія 04 · Віталій',
      title1: 'Вони не обіцяли,',
      title2: 'що стане легко.',
      body: 'они сказали — буде зрозуміло, що робити далі. І це вперше за довгий час дало Віталію опору. Сьогодні він працює інструктором і допомагає молодшим побратимам знаходити свій шлях після повернення.',
      name: 'Віталій П.',
      meta: '79 ОДШБр · Повернувся 2023',
      photo: null,
    },
  ],
  en: [
    {
      chapter: 'Story 01 · Oleksii',
      title1: 'Three years ago he',
      title2: "couldn't sleep at night.",
      body: "oday Oleksii runs a small café in Irpin, raises his daughter, and once a month comes back to support others — those just starting their road home. We don't say it was easy. We say someone who knew the way was right beside him.",
      name: 'Oleksii Ya.',
      meta: '47th Brigade · Returned 2024 · Irpin',
      photo: null,
    },
    {
      chapter: 'Story 02 · Mariia',
      title1: 'She was silent for half a year —',
      title2: 'now she leads a support group.',
      body: "ariia's husband came back from the front, but home stayed unfamiliar for a long time. Together with the therapists of \"Road\", she learned to listen — and to speak. Today Mariia coordinates meetings of veterans' wives in Kyiv.",
      name: 'Mariia K.',
      meta: "Veteran's wife · Volunteer",
      photo: null,
    },
    {
      chapter: 'Story 03 · Bohdan',
      title1: 'For half a year he could not',
      title2: 'move his paperwork forward.',
      body: 'ohdan tried on his own — without success. The lawyer of "Road" sorted everything in two weeks. "He just sat next to me and said: we will sign this together," he recalls. Today Bohdan helps others on the same path.',
      name: 'Bohdan S.',
      meta: '93rd Brigade · Kholodnyi Yar',
      photo: null,
    },
    {
      chapter: 'Story 04 · Vitalii',
      title1: "They didn't promise",
      title2: 'it would get easy.',
      body: "hey said — you'll know what to do next. For the first time in a long while, that gave Vitalii ground to stand on. Today he works as an instructor and helps younger comrades find their way after returning.",
      name: 'Vitalii P.',
      meta: '79th Air Assault · Returned 2023',
      photo: null,
    },
  ],
}

export default function HeroSection({ locale = 'uk', dict, stories }: HeroProps) {
  const d = dict || {
    badge: 'Громадська організація · Київ',
    ctaPrimary: 'Потребую допомоги',
    ctaSecondary: 'Читати історію цілком',
    storyOf: 'Історія',
  }
  const list = (stories && stories.length > 0) ? stories : (defaultStoriesByLocale[locale] || defaultStoriesByLocale.uk)
  const [idx, setIdx] = useState(0)
  const cur = list[idx]
  const total = list.length
  const firstChar = (cur.body || '').charAt(0)
  const rest = (cur.body || '').slice(1)

  return (
    <section className="hero-c-wrap" id="hero">
      <div className="hero-c">
        <div className="container">
          <div className="hero-c-grid">
            <div className="hero-c-left">
              <div className="hero-c-badge">{d.badge || (locale === 'en' ? 'NGO · Kyiv' : 'Громадська організація · Київ')}</div>
              <div className="chapter">{cur.chapter}</div>
              <h1 className="hero-c-title">
                {cur.title1}
                <span className="highlight">{cur.title2}</span>
              </h1>
              <p className="hero-c-body">
                <span className="drop">{firstChar}</span>
                {rest}
              </p>
              <div className="hero-c-actions">
                <button className="rd-btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('open-help-modal'))}>
                  <PhoneIcon size={16} />
                  {d.ctaPrimary || (locale === 'en' ? 'I Need Help' : 'Потребую допомоги')}
                </button>
                <a href="#testimonials" className="rd-btn-ghost">
                  {d.ctaSecondary || (locale === 'en' ? 'Read the full story' : 'Читати історію цілком')}
                  <ChevronRightIcon size={14} />
                </a>
              </div>
              <div className="hero-c-stories-dots">
                <span>{d.storyOf || (locale === 'en' ? 'Story' : 'Історія')}</span>
                <div className="hero-c-dots" role="tablist" aria-label={locale === 'en' ? 'Stories' : 'Історії'}>
                  {list.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`hero-c-dot ${i === idx ? 'active' : ''}`}
                      aria-label={`${i + 1} / ${total}`}
                      aria-selected={i === idx}
                      role="tab"
                      onClick={() => setIdx(i)}
                    />
                  ))}
                </div>
                <span>{String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="hero-c-right">
              <div className="hero-c-frame-accent-2" />
              <div className="hero-c-photo">
                {cur.photo ? (
                  <img src={cur.photo} alt={cur.name} />
                ) : null}
                <div className="hero-c-caption">
                  <div className="name">{cur.name}</div>
                  <div className="meta">{cur.meta}</div>
                </div>
              </div>
              <div className="hero-c-frame-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
