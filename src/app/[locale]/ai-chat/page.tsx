import { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import GenieGPT from '@/components/features/Haru-AI'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AIChat' });
    return {
        title: `AI Chat - ${locale === 'ja' ? '藤本悠杜' : 'Haruto Fujimoto'}`,
        description: t('description'),
    };
}

export default function AIChatPage() {
    return (
        <div className="min-h-screen text-foreground transition-colors duration-500">
            <Navigation />
            <main className="container-custom py-20">
                <GenieGPT />
            </main>
        </div>
    )
}