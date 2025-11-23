import { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Contact from '@/components/features/Contact'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Contact' });
    return {
        title: `Contact - ${locale === 'ja' ? '藤本悠杜' : 'Haruto Fujimoto'}`,
        description: t('subtitle'),
    };
}

export default function ContactPage() {
    return (
        <div className="min-h-screen text-foreground transition-colors duration-500">
            <Navigation />
            <main className="pt-24 pb-20">
                <Contact />
            </main>
        </div>
    )
}