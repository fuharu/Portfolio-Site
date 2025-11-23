import { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import About from '@/components/features/About'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    return {
        title: `About - ${t('name')}`,
        description: t('profile'),
    };
}

export default function AboutPage() {
    return (
        <div className="min-h-screen text-foreground transition-colors duration-500">
            <Navigation />
            <main className="pt-24 pb-20">
                <About />
            </main>
        </div>
    )
}