'use client'
import { useState } from 'react'
import { Mail, Github, HelpCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Contact() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null)
    const t = useTranslations('Contact')

    const faqs = [
        {
            question: t('faqs.q1'),
            answer: t('faqs.a1')
        },
        {
            question: t('faqs.q2'),
            answer: t('faqs.a2')
        },
        {
            question: t('faqs.q3'),
            answer: t('faqs.a3')
        }
    ]

    return (
        <section id="contact" className="container-custom py-32 md:py-40">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="mb-24 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{t('title')}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Contact Cards & FAQ */}
                    <div className="space-y-12">
                        {/* Contact Cards */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <a
                                href="mailto:haruto7fujimoto@gmail.com"
                                className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all group text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Mail size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Email</h3>
                                <p className="text-sm text-muted-foreground break-all">haruto7fujimoto@gmail.com</p>
                            </a>

                            <a
                                href="https://github.com/fuharu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all group text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Github size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">GitHub</h3>
                                <p className="text-sm text-muted-foreground">@fuharu</p>
                            </a>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-secondary/20 rounded-3xl p-8 border border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <HelpCircle className="text-primary" />
                                <h3 className="text-xl font-bold">{t('faqTitle')}</h3>
                            </div>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-background rounded-xl border border-border overflow-hidden">
                                        <button
                                            onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                            className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transition-colors"
                                        >
                                            {faq.question}
                                            <span className={`text-primary transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        </button>
                                        <div 
                                            className={`px-4 text-sm text-muted-foreground transition-all duration-300 ease-in-out overflow-hidden ${
                                                activeFaq === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            {faq.answer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Google Form */}
                    <div className="bg-card border border-border rounded-3xl p-1 shadow-sm h-full min-h-[600px]">
                        <div className="w-full h-full bg-background rounded-[20px] overflow-hidden relative">
                            <iframe 
                                src="https://docs.google.com/forms/d/e/1FAIpQLSdtzk7yjpg2YyHWAq2fs5rsN0imb0Fvvu6Flsr1jnsL8CcHUQ/viewform?embedded=true" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }}
                                className="relative z-10 bg-background"
                                title="Contact Form"
                            >
                                読み込んでいます…
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}