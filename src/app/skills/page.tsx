import { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Skills from '@/components/features/Skills'

export const metadata: Metadata = {
    title: 'Skills - 藤本悠杜',
    description: '藤本悠杜の技術スキル一覧。TypeScript、Python、Next.js、React、AI技術など、幅広い技術スタックを紹介します。',
    keywords: ['スキル', '技術', 'TypeScript', 'Python', 'Next.js', 'React', 'AI', 'フルスタック'],
}

export default function SkillsPage() {
    return (
        <div>
            <Navigation />
            <Skills />
        </div>
    )
}
