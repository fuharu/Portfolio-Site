'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function AboutSummary() {
    const t = useTranslations('AboutSummary');

    return (
        <section className="py-20 border-y border-border/50 bg-secondary/5">
            <div className="container-custom max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="relative w-48 h-48 shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-background border-2 border-background flex items-center justify-center overflow-hidden">
                            <span className="text-6xl font-bold text-primary/80">F</span>
                            {/* 写真があればここに <img src="..." /> */}
                        </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6 whitespace-pre-line">
                            {t('description')}
                        </p>
                        <Link 
                            href="/about" 
                            className="inline-flex items-center gap-2 font-medium text-primary hover:underline underline-offset-4 group"
                        >
                            {t('readMore')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}