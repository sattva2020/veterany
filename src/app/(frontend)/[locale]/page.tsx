import React from 'react'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { getLandingData } from '@/lib/landing-data'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import SectionFade from '@/components/SectionFade'
import HeroSection from '@/components/landing/HeroSection'
import AboutSection from '@/components/landing/AboutSection'
import ActivitiesSection from '@/components/landing/ActivitiesSection'
import HowWeWorkSection from '@/components/landing/HowWeWorkSection'
import NewsSection from '@/components/landing/NewsSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import PartnersSection from '@/components/landing/PartnersSection'
import JoinSection from '@/components/landing/JoinSection'
import ContactsSection from '@/components/landing/ContactsSection'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const [dict, data] = await Promise.all([
    getDictionary(locale as Locale),
    getLandingData(locale),
  ])

  // Serialize CMS data for client components (use any to avoid stale type issues)
  const settings = data.settings as any
  const cmsActivities = data.activities.map((a: any) => ({
    number: String(a.order || 0).padStart(2, '0'),
    icon: a.icon || '📋',
    title: a.title || '',
    description: a.shortDescription || '',
    featured: a.isFeatured || false,
  }))

  const cmsNews = data.news.map((n: any) => ({
    title: n.title || '',
    tag: n.tag || 'event',
    excerpt: n.excerpt || '',
    date: n.publishDate || '',
    image: n.featuredImage?.url || null,
  }))

  const cmsPartners = data.partners.map((p: any) => ({
    name: p.name || '',
    logo: p.logo?.url || null,
    type: p.type || '',
    website: p.website || '',
  }))

  const cmsJoinOptions = data.joinOptions.map((j: any) => ({
    icon: j.icon || '🤝',
    title: j.title || '',
    description: j.description || '',
  }))

  const cmsSteps = settings?.steps?.map((s: any, i: number) => ({
    n: String(i + 1).padStart(2, '0'),
    eyebrow: s.eyebrow || '',
    title: s.title || '',
    short: s.short || s.description || '',
    long: s.long || s.description || '',
    tags: Array.isArray(s.tags) ? s.tags.map((t: any) => t.label || '').filter(Boolean) : [],
    meta: s.meta || '',
  })) || []

  const cmsTestimonials = settings?.testimonials?.map((t: any) => ({
    name: t.name || '',
    role: t.role || '',
    date: t.date || '',
    quote: t.quote || t.text || '',
    photo: t.photo?.url || null,
    hasAudio: Boolean(t.hasAudio),
    duration: t.audioDuration || null,
  })) || []

  const cmsHeroStories = (settings?.heroStories || []).map((s: any) => ({
    chapter: s.chapter || '',
    title1: s.title1 || '',
    title2: s.title2 || '',
    body: s.body || '',
    name: s.name || '',
    meta: s.meta || '',
    photo: s.photo?.url || null,
  }))

  const cmsHeroPortrait = settings?.heroPortrait?.url || null

  const cmsStats = settings?.stats?.map((s: any) => ({
    number: s.number || '0',
    label: s.label || '',
  })) || []

  return (
    <>
      <Header isLanding cabinetLink={`/${locale}/cabinet`} locale={locale} dict={dict.header} />
      <HeroSection locale={locale} dict={dict.hero} stories={cmsHeroStories} defaultPhoto={cmsHeroPortrait} />
      <SectionFade>
        <AboutSection locale={locale} dict={dict.about} cmsStats={cmsStats} />
      </SectionFade>
      <SectionFade>
        <ActivitiesSection locale={locale} dict={dict.activities} cmsData={cmsActivities} />
      </SectionFade>
      <SectionFade>
        <HowWeWorkSection locale={locale} dict={dict.howWeWork as any} cmsSteps={cmsSteps} />
      </SectionFade>
      <SectionFade>
        <NewsSection locale={locale} dict={dict.news} cmsData={cmsNews} />
      </SectionFade>
      <SectionFade>
        <TestimonialsSection locale={locale} dict={dict.testimonials as any} cmsData={cmsTestimonials} />
      </SectionFade>
      <SectionFade>
        <PartnersSection locale={locale} dict={dict.partners} cmsData={cmsPartners} />
      </SectionFade>
      <SectionFade>
        <JoinSection locale={locale} dict={dict.join} cmsData={cmsJoinOptions} />
      </SectionFade>
      <SectionFade>
        <ContactsSection locale={locale} dict={dict.contacts} cmsContacts={{
          address: settings?.address || '',
          phones: settings?.phones || [],
          email: settings?.email || '',
          workingHours: settings?.workingHours || '',
          googleMapsEmbed: settings?.googleMapsEmbed || '',
        }} />
      </SectionFade>
      <Footer locale={locale} dict={dict.footer} />
      <ChatWidget locale={locale} dict={dict.chat} />
    </>
  )
}
