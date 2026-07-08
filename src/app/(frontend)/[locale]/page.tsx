import React from 'react'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { getLandingData } from '@/lib/landing-data'
import { lexicalToParagraphs } from '@/lib/richtext'
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
    slug: n.slug || (n.id != null ? String(n.id) : null),
    excerpt: n.excerpt || '',
    date: n.publishDate || '',
    images: [
      n.featuredImage,
      ...(Array.isArray(n.gallery) ? n.gallery.map((item: any) => item?.image) : []),
    ]
      .filter((image: any) => image?.url)
      .map((image: any) => ({
        url: image.url,
        alt: image.alt || n.title || '',
      })),
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

  const heroStoryPhotos = [
    settings?.heroStory1Photo?.url || null,
    settings?.heroStory2Photo?.url || null,
    settings?.heroStory3Photo?.url || null,
    settings?.heroStory4Photo?.url || null,
  ]

  const cmsHeroStories = (settings?.heroStories || []).map((s: any, i: number) => ({
    chapter: s.chapter || '',
    title1: s.title1 || '',
    title2: s.title2 || '',
    body: s.body || '',
    name: s.name || '',
    meta: s.meta || '',
    photo: heroStoryPhotos[i] || s.photo?.url || null,
  }))

  const cmsHeroPortrait = settings?.heroPortrait?.url || null

  const cmsStats = settings?.stats?.map((s: any) => ({
    number: s.number || '0',
    label: s.label || '',
  })) || []

  // Текст «Про нас» з CMS (richText → абзаци). Якщо порожньо — секція бере дефолт зі словника.
  const cmsAboutParagraphs = lexicalToParagraphs(settings?.aboutText)
  const cmsAboutImage = settings?.aboutImage?.url || null

  // Словники секцій із підстановкою значень із адмінки (CMS перекриває статичний словник).
  // Так правки менеджера в SiteSettings одразу застосовуються на сайті.
  const heroDict = {
    ...dict.hero,
    ...(settings?.ctaButtonText ? { ctaPrimary: settings.ctaButtonText } : {}),
  }
  const aboutDict = {
    ...dict.about,
    ...(settings?.aboutSectionLabel ? { label: settings.aboutSectionLabel } : {}),
    ...(settings?.aboutSectionTitle ? { title: settings.aboutSectionTitle } : {}),
  }
  const activitiesDict = {
    ...dict.activities,
    ...(settings?.activitiesSectionLabel ? { label: settings.activitiesSectionLabel } : {}),
    ...(settings?.activitiesSectionTitle ? { title: settings.activitiesSectionTitle } : {}),
    ...(settings?.activitiesSectionDesc ? { description: settings.activitiesSectionDesc } : {}),
  }
  const howWeWorkDict = {
    ...(dict.howWeWork as any),
    ...(settings?.howWeWorkTitle ? { title: settings.howWeWorkTitle } : {}),
    ...(settings?.howWeWorkSubtitle ? { description: settings.howWeWorkSubtitle } : {}),
  }
  const newsDict = {
    ...dict.news,
    ...(settings?.newsSectionLabel ? { label: settings.newsSectionLabel } : {}),
    ...(settings?.newsSectionTitle ? { title: settings.newsSectionTitle } : {}),
  }
  const testimonialsDict = {
    ...(dict.testimonials as any),
    ...(settings?.testimonialsTitle ? { title: settings.testimonialsTitle } : {}),
  }
  const partnersDict = {
    ...dict.partners,
    ...(settings?.partnersSectionLabel ? { label: settings.partnersSectionLabel } : {}),
    ...(settings?.partnersSectionTitle ? { title: settings.partnersSectionTitle } : {}),
    ...(settings?.partnersSectionDesc ? { description: settings.partnersSectionDesc } : {}),
  }
  const joinDict = {
    ...dict.join,
    ...(settings?.joinSectionLabel ? { label: settings.joinSectionLabel } : {}),
    ...(settings?.joinSectionTitle ? { title: settings.joinSectionTitle } : {}),
    ...(settings?.joinSectionDesc ? { description: settings.joinSectionDesc } : {}),
  }
  const contactsDict = {
    ...dict.contacts,
    ...(settings?.contactsSectionLabel ? { label: settings.contactsSectionLabel } : {}),
    ...(settings?.contactsSectionTitle ? { title: settings.contactsSectionTitle } : {}),
  }

  return (
    <>
      <Header isLanding cabinetLink="/cabinet" locale={locale} dict={dict.header} helpPhone={settings?.phones?.[0]?.number || ''} />
      <HeroSection locale={locale} dict={heroDict} stories={cmsHeroStories} defaultPhoto={cmsHeroPortrait} />
      <SectionFade>
        <AboutSection locale={locale} dict={aboutDict} cmsStats={cmsStats} cmsParagraphs={cmsAboutParagraphs} cmsImage={cmsAboutImage} />
      </SectionFade>
      <SectionFade>
        <ActivitiesSection locale={locale} dict={activitiesDict} cmsData={cmsActivities} />
      </SectionFade>
      <SectionFade>
        <HowWeWorkSection locale={locale} dict={howWeWorkDict as any} cmsSteps={cmsSteps} />
      </SectionFade>
      <SectionFade>
        <NewsSection locale={locale} dict={newsDict} cmsData={cmsNews} />
      </SectionFade>
      <SectionFade>
        <TestimonialsSection locale={locale} dict={testimonialsDict as any} cmsData={cmsTestimonials} />
      </SectionFade>
      <SectionFade>
        <PartnersSection locale={locale} dict={partnersDict} cmsData={cmsPartners} />
      </SectionFade>
      <SectionFade>
        <JoinSection locale={locale} dict={joinDict} cmsData={cmsJoinOptions} />
      </SectionFade>
      <SectionFade>
        <ContactsSection locale={locale} dict={contactsDict} cmsContacts={{
          address: settings?.address || '',
          phones: settings?.phones || [],
          email: settings?.email || '',
          workingHours: settings?.workingHours || '',
          googleMapsEmbed: settings?.googleMapsEmbed || '',
        }} />
      </SectionFade>
      <Footer
        locale={locale}
        dict={dict.footer}
        socials={(settings?.socialLinks || []).map((s: any) => ({ platform: s.platform || '', url: s.url || '' }))}
        contacts={{
          phones: settings?.phones || [],
          email: settings?.email || '',
          address: settings?.address || '',
        }}
        requisites={{
          legalName: settings?.legalName || '',
          edrpou: settings?.edrpou || '',
        }}
      />
      <ChatWidget locale={locale} dict={dict.chat} phone={settings?.phones?.[0]?.number || ''} />
    </>
  )
}
