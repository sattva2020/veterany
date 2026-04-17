'use client'

import React, { useEffect, useRef, useState } from 'react'
import { makeWaveform } from '@/lib/waveform'

export interface Testimonial {
  name: string
  role: string
  date: string
  quote: string
  photo?: string | null
  hasAudio: boolean
  duration?: string | null
}

interface Props {
  locale?: string
  dict?: Record<string, string>
  cmsData?: Testimonial[]
}

const defaultByLocale: Record<string, Testimonial[]> = {
  uk: [
    { name: 'Олексій Я.', role: '47 ОМБр', date: 'Листопад 2024', hasAudio: true, duration: '2:14',
      quote: 'Я прийшов сюди, бо перестав впізнавати себе. Через півроку я знову сміюся з донькою за вечерею. Це не чудо — це робота. Просто я був не один.' },
    { name: 'Марія К.', role: 'Дружина ветерана', date: 'Січень 2025', hasAudio: true, duration: '1:48',
      quote: 'Ми всі поверталися разом — я, діти, він. Тут нам показали, як говорити одне з одним знову. Без психологів вдома було б складніше.' },
    { name: 'Богдан С.', role: '93 ОМБр · Холодний Яр', date: 'Березень 2025', hasAudio: false,
      quote: 'Юрист «Дороги» за два тижні оформив усе, що я пів року не міг зрушити. Просто сів поруч і сказав: підпишемо це разом.' },
    { name: 'Катерина М.', role: 'Мама ветерана', date: 'Грудень 2024', hasAudio: true, duration: '3:02',
      quote: 'Коли син повернувся, я мовчала — боялася зачепити. Тут мене навчили, що бути поруч — це не завжди говорити. Інколи це просто бути.' },
    { name: 'Віталій П.', role: '79 ОДШБр · Повернувся 2023', date: 'Жовтень 2024', hasAudio: true, duration: '2:36',
      quote: 'Вони не обіцяли, що стане легко. Вони сказали — буде зрозуміло, що робити далі. І це вперше за довгий час дало мені опору.' },
  ],
  en: [
    { name: 'Oleksii Ya.', role: '47th Brigade', date: 'November 2024', hasAudio: true, duration: '2:14',
      quote: "I came here because I had stopped recognizing myself. Six months later, I'm laughing with my daughter over dinner again. It's not a miracle — it's work. I just wasn't alone." },
    { name: 'Mariia K.', role: "Veteran's wife", date: 'January 2025', hasAudio: true, duration: '1:48',
      quote: 'We all came back together — me, the kids, him. They showed us how to talk to each other again. It would have been much harder without the therapists.' },
    { name: 'Bohdan S.', role: '93rd Brigade · Kholodnyi Yar', date: 'March 2025', hasAudio: false,
      quote: 'In two weeks, their lawyer sorted out what I had struggled with for half a year. He just sat next to me and said: we will sign this together.' },
    { name: 'Kateryna M.', role: "Veteran's mother", date: 'December 2024', hasAudio: true, duration: '3:02',
      quote: "When my son came back, I stayed silent — afraid to touch anything. Here they taught me that being there isn't always about talking. Sometimes it's just being." },
    { name: 'Vitalii P.', role: '79th Air Assault · Returned 2023', date: 'October 2024', hasAudio: true, duration: '2:36',
      quote: "They didn't promise it would get easy. They said — you'll know what to do next. For the first time in a long time, that gave me ground to stand on." },
  ],
}

function parseDuration(d?: string | null): number {
  if (!d) return 0
  const [mm, ss] = d.split(':').map(Number)
  return (mm || 0) * 60 + (ss || 0)
}

export default function TestimonialsSection({ locale = 'uk', dict, cmsData }: Props) {
  const data = (cmsData && cmsData.length > 0) ? cmsData : (defaultByLocale[locale] || defaultByLocale.uk)
  const d = dict || {
    label: locale === 'en' ? 'Community voices' : 'Голоси спільноти',
    title: locale === 'en' ? 'What those who walked the road say' : 'Що кажуть ті, хто пройшов дорогу',
    subtitle: locale === 'en'
      ? 'Real stories, real names, real voices. Hear those who were where you are now.'
      : 'Реальні історії, реальні імена, реальні голоси. Послухайте тих, хто був на вашому місці.',
    counter: locale === 'en' ? 'Veteran stories' : 'Історії ветеранів',
    story: locale === 'en' ? 'Story' : 'Історія',
    recorded: locale === 'en' ? 'Recorded' : 'Записано',
    noAudio: locale === 'en' ? '— text testimonial —' : '— текстовий відгук —',
  }

  const [current, setCurrent] = useState(0)
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)
  const [playedPct, setPlayedPct] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const total = data.length
  const cur = data[current]

  const stopPlayback = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    setPlayingIdx(null)
    setPlayedPct(0)
    setElapsed(0)
  }

  const goTo = (i: number) => {
    const next = ((i % total) + total) % total
    setCurrent(next)
    stopPlayback()
  }

  useEffect(() => {
    const thumbs = thumbsRef.current
    if (!thumbs) return
    const active = thumbs.querySelector<HTMLElement>('.test-thumb.active')
    if (active) {
      const offset = active.offsetLeft - thumbs.offsetWidth / 2 + active.offsetWidth / 2
      thumbs.scrollTo({ left: offset, behavior: 'smooth' })
    }
  }, [current])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const inView = r.top < window.innerHeight && r.bottom > 0
      if (!inView) return
      if (e.key === 'ArrowLeft') goTo(current - 1)
      if (e.key === 'ArrowRight') goTo(current + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, total])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const togglePlay = (i: number) => {
    const slide = data[i]
    if (!slide.hasAudio || !slide.duration) return
    if (playingIdx === i) { stopPlayback(); return }
    stopPlayback()
    setPlayingIdx(i)
    const totalSec = parseDuration(slide.duration)
    let cur = 0
    timerRef.current = setInterval(() => {
      cur += 0.1
      if (cur >= totalSec) { stopPlayback(); return }
      setElapsed(cur)
      setPlayedPct((cur / totalSec) * 100)
    }, 100)
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${String(s).padStart(2, '0')}`
  }

  return (
    <section className="rd-sec -dark test-sec" id="testimonials" ref={sectionRef as any}>
      <div className="container">
        <div className="test-head">
          <div className="rd-sec-head">
            <div className="rd-eyebrow">{d.label}</div>
            <h2 className="rd-sec-title">{d.title}</h2>
            <p className="rd-sec-lead">{d.subtitle}</p>
          </div>
          <div className="test-meta">
            <div className="test-counter">
              <span>{String(current + 1).padStart(2, '0')}</span>
              <em>/</em>
              {String(total).padStart(2, '0')}
            </div>
            <div>{d.counter}</div>
          </div>
        </div>

        <div className="test-viewport">
          <div className="test-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {data.map((t, i) => (
              <div key={i} className="test-slide">
                <div className="test-photo">
                  {t.photo ? <img src={t.photo} alt={t.name} /> : null}
                  <div className="photo-badge">{d.story} {String(i + 1).padStart(2, '0')}</div>
                </div>
                <div className="test-content">
                  <div className="test-quote-mark">«</div>
                  <div className="test-quote">{t.quote}</div>
                  <div className="test-cite">
                    <div>
                      <div className="test-cite-name">{t.name}</div>
                      <div className="test-cite-meta">{t.role}</div>
                    </div>
                    <div className="test-cite-divider" />
                    <div className="test-cite-date">
                      <strong>{t.date}</strong>
                      {d.recorded}
                    </div>
                  </div>
                  {t.hasAudio && t.duration ? (
                    <div className="test-audio">
                      <button
                        type="button"
                        className={`test-audio-btn ${playingIdx === i ? 'playing' : ''}`}
                        onClick={(e) => { e.stopPropagation(); togglePlay(i) }}
                        aria-label={playingIdx === i ? 'Pause' : 'Play'}
                      >
                        {playingIdx === i ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                      <div className="test-audio-wave">
                        <div dangerouslySetInnerHTML={{ __html: makeWaveform(60, i + 7) }} />
                        <div
                          className="played"
                          style={{
                            ['--played' as any]: playingIdx === i ? `${playedPct}%` : '0%',
                            width: playingIdx === i ? `${playedPct}%` : '0%',
                          }}
                          dangerouslySetInnerHTML={{ __html: makeWaveform(60, i + 7) }}
                        />
                      </div>
                      <div className="test-audio-time">
                        {playingIdx === i ? formatTime(elapsed) : '0:00'} / {t.duration}
                      </div>
                    </div>
                  ) : (
                    <div className="test-no-audio">{d.noAudio}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="test-controls">
          <div className="test-thumbs" ref={thumbsRef}>
            {data.map((t, i) => (
              <button
                key={i}
                type="button"
                className={`test-thumb ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
              >
                <div className="test-thumb-img">
                  {t.photo ? <img src={t.photo} alt={t.name} /> : null}
                </div>
                <div className="test-thumb-text">
                  <div className="test-thumb-name">{t.name}</div>
                  <div className="test-thumb-role">{t.role}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="test-arrows">
            <button
              type="button"
              className="test-arrow"
              onClick={() => goTo(current - 1)}
              aria-label={locale === 'en' ? 'Previous' : 'Попередня'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              className="test-arrow"
              onClick={() => goTo(current + 1)}
              aria-label={locale === 'en' ? 'Next' : 'Наступна'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
