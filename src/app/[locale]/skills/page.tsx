import { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Skills from '@/components/features/Skills'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Skills' });
    return {
        title: `Skills - ${locale === 'ja' ? '藤本悠杜' : 'Haruto Fujimoto'}`,
        description: t('subtitle'),
    };
}

export default function SkillsPage() {
    return (
        <div className="min-h-screen text-foreground transition-colors duration-500">
            <Navigation />
            <main className="pt-24 pb-20">
                <Skills />
            </main>
        </div>
    )
}