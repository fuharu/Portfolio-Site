'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Hero() {
    const t = useTranslations('Hero');
    const containerRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subTitleRef = useRef<HTMLParagraphElement>(null)
    const labelRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        // Initial Animation
        tl.fromTo(labelRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        )
            .fromTo(titleRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 },
                "-=0.8"
            )
            .fromTo(subTitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            )
            .fromTo(ctaRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.6"
            )

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500"
        >
            {/* Abstract Background Elements for 'Gallery' feel - Reduced opacity for 3D visibility */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-t from-gray-200 to-transparent dark:from-gray-900 blur-3xl" />
            </div>

            <div className="container-custom relative z-10 max-w-5xl mx-auto px-6 md:px-12">
                <div className="flex flex-col items-start justify-center min-h-[60vh]">

                    {/* Label */}
                    <div ref={labelRef} className="mb-8 pl-1">
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground border-l-2 border-primary pl-3">
                            {t('label')}
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground mb-8 leading-[0.9]">
                        Haruto <br />
                        <span className="text-muted-foreground">Fujimoto</span>
                    </h1>

                    {/* Description */}
                    <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <p ref={subTitleRef} className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-light whitespace-pre-line">
                            {t('subtitle')}
                        </p>

                        {/* CTA */}
                        <div ref={ctaRef} className="flex gap-6">
                            <Link
                                href="/projects"
                                className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-full overflow-hidden transition-all hover:scale-105"
                            >
                                <span className="relative z-10">{t('viewProjects')}</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-foreground border border-border rounded-full hover:bg-accent transition-all hover:scale-105"
                            >
                                {t('contact')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decoration Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-border/50" />
            <div className="absolute top-0 right-0 w-px h-full bg-border/50 hidden md:block" />
        </section>
    )
}