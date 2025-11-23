'use client'
import { Link } from '@/navigation'
import Image from 'next/image'
import { Heart, Globe, Award, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function About() {
    const t = useTranslations('About')

    const timeline = [
        {
            year: t('timeline.t1.year'),
            title: t('timeline.t1.title'),
            description: t('timeline.t1.description')
        },
        {
            year: t('timeline.t2.year'),
            title: t('timeline.t2.title'),
            description: t('timeline.t2.description')
        },
        {
            year: t('timeline.t3.year'),
            title: t('timeline.t3.title'),
            description: t('timeline.t3.description')
        },
        {
            year: t('timeline.t4.year'),
            title: t('timeline.t4.title'),
            description: t('timeline.t4.description')
        },
        {
            year: t('timeline.t5.year'),
            title: t('timeline.t5.title'),
            description: t('timeline.t5.description')
        }
    ]

    const values = [
        {
            icon: <Heart className="w-6 h-6" />,
            title: t('values.v1.title'),
            subtitle: t('values.v1.subtitle'),
            description: t('values.v1.description')
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: t('values.v2.title'),
            subtitle: t('values.v2.subtitle'),
            description: t('values.v2.description')
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: t('values.v3.title'),
            subtitle: t('values.v3.subtitle'),
            description: t('values.v3.description')
        }
    ]

    return (
        <section id="about" className="container-custom py-32 md:py-40">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="mb-24 md:mb-32 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{t('title')}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start mb-40">
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="relative w-64 h-64 mb-8 group">
                            <div className="absolute inset-0 rounded-2xl bg-primary/10 transform rotate-6 transition-transform group-hover:rotate-12" />
                            <div className="absolute inset-0 rounded-2xl bg-secondary transform -rotate-6 transition-transform group-hover:-rotate-12" />
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                                <Image 
                                    src="/images/syoumeipng.png" 
                                    alt="Haruto Fujimoto" 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-105 object-[center_top]"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-2/3 pt-4">
                        <h3 className="text-3xl md:text-4xl font-bold mb-3">{t('name')}</h3>
                        <span className="text-xl text-primary font-medium mb-8 block">{t('role')}</span>
                        
                        <div className="space-y-6 text-muted-foreground leading-loose text-lg whitespace-pre-line">
                            {t('profile')}
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-40">
                    <h3 className="text-2xl md:text-3xl font-bold mb-16 text-center">{t('valuesTitle')}</h3>
                    <div className="grid md:grid-cols-3 gap-10">
                        {values.map((value, index) => (
                            <div key={index} className="bg-card border border-border p-10 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-2 duration-300 group flex flex-col h-full">
                                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-6 block">{value.subtitle}</span>
                                <p className="text-muted-foreground leading-relaxed flex-grow">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="mb-40">
                    <h3 className="text-2xl md:text-3xl font-bold mb-16 text-center">{t('journeyTitle')}</h3>
                    <div className="relative border-l-2 border-border ml-4 md:ml-1/2 md:-translate-x-[1px] space-y-16">
                        {timeline.map((item, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Timeline Dot */}
                                <div className="absolute top-0 left-[-9px] md:left-1/2 md:-translate-x-[9px] w-[18px] h-[18px] rounded-full border-4 border-background bg-primary z-10 transition-transform hover:scale-125" />
                                
                                {/* Date (Mobile: next to content, Desktop: opposite side) */}
                                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'} ml-8 md:ml-0 pt-1`}>
                                    <span className="text-lg font-bold text-primary tracking-wider">{item.year}</span>
                                </div>
                                
                                {/* Content */}
                                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'} ml-8 md:ml-0 bg-card/50 p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-colors`}>
                                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-16 bg-secondary/20 rounded-[2rem] border border-border/50 backdrop-blur-sm">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">{t('ctaTitle')}</h3>
                    <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                        {t('ctaDescription')}
                    </p>
                    <Link 
                        href="/contact" 
                        className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg"
                    >
                        {t('ctaButton')} <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}