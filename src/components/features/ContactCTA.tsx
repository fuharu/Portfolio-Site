import {useTranslations} from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ContactCTA() {
    const t = useTranslations('ContactCTA');

    return (
        <section className="py-32 bg-primary/90 backdrop-blur-sm text-primary-foreground relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>

            <div className="container-custom max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('title')}</h2>
                <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    {t('description')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        href="/contact" 
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background text-foreground rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                    >
                        {t('contactMe')}
                    </Link>
                    <a 
                        href="https://github.com/fuharu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-full font-bold text-lg hover:bg-primary-foreground/20 transition-colors"
                    >
                        {t('visitGitHub')} <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    )
}