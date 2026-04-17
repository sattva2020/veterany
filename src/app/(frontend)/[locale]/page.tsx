import React from 'react'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
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

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <Header isLanding cabinetLink={`/${locale}/cabinet`} locale={locale} dict={dict.header} />
      <HeroSection locale={locale} dict={dict.hero} />
      <SectionFade>
        <AboutSection locale={locale} dict={dict.about} />
      </SectionFade>
      <SectionFade>
        <ActivitiesSection locale={locale} dict={dict.activities} />
      </SectionFade>
      <SectionFade>
        <HowWeWorkSection locale={locale} dict={dict.howWeWork} />
      </SectionFade>
      <SectionFade>
        <NewsSection locale={locale} dict={dict.news} />
      </SectionFade>
      <SectionFade>
        <TestimonialsSection locale={locale} dict={dict.testimonials} />
      </SectionFade>
      <SectionFade>
        <PartnersSection locale={locale} dict={dict.partners} />
      </SectionFade>
      <SectionFade>
        <JoinSection locale={locale} dict={dict.join} />
      </SectionFade>
      <SectionFade>
        <ContactsSection locale={locale} dict={dict.contacts} />
      </SectionFade>
      <Footer locale={locale} dict={dict.footer} />
      <ChatWidget locale={locale} dict={dict.chat} />
    </>
  )
}
