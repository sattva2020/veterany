import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import SectionFade from '@/components/SectionFade'
import HeroSection from '@/components/landing/HeroSection'
import AboutSection from '@/components/landing/AboutSection'
import ActivitiesSection from '@/components/landing/ActivitiesSection'
import NewsSection from '@/components/landing/NewsSection'
import PartnersSection from '@/components/landing/PartnersSection'
import JoinSection from '@/components/landing/JoinSection'
import ContactsSection from '@/components/landing/ContactsSection'

export default function HomePage() {
  return (
    <>
      <Header isLanding cabinetLink="/cabinet" />
      <HeroSection />
      <SectionFade>
        <AboutSection />
      </SectionFade>
      <SectionFade>
        <ActivitiesSection />
      </SectionFade>
      <SectionFade>
        <NewsSection />
      </SectionFade>
      <SectionFade>
        <PartnersSection />
      </SectionFade>
      <SectionFade>
        <JoinSection />
      </SectionFade>
      <SectionFade>
        <ContactsSection />
      </SectionFade>
      <Footer />
      <ChatWidget />
    </>
  )
}
