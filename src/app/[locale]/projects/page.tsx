import { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Projects from '@/components/features/Projects'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Projects' });
    return {
        title: `Projects - ${locale === 'ja' ? '藤本悠杜' : 'Haruto Fujimoto'}`,
        description: t('subtitle'),
    };
}

export default function ProjectsPage() {
    return (
        <div className="min-h-screen text-foreground transition-colors duration-500">
            <Navigation />
            <main className="pt-24 pb-20">
                <Projects />
            </main>
        </div>
    )
}