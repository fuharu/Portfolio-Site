'use client'

import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/features/Hero'
import FeaturedWorks from '@/components/features/FeaturedWorks'
import AboutSummary from '@/components/features/AboutSummary'
import SkillsSummary from '@/components/features/SkillsSummary'
import ContactCTA from '@/components/features/ContactCTA'

export default function Home() {
    return (
        <div className="min-h-screen text-foreground transition-colors duration-500">
            <Navigation />
            <main>
                <Hero />
                <FeaturedWorks />
                <AboutSummary />
                <SkillsSummary />
                <ContactCTA />
            </main>
        </div>
    )
}