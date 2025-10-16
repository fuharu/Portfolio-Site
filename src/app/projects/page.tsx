import { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Projects from '@/components/features/Projects'

export const metadata: Metadata = {
    title: 'Projects - 藤本悠杜',
    description: '藤本悠杜の開発プロジェクト一覧。個人開発からハッカソン、大学講義でのチーム開発まで、様々なプロジェクトを紹介します。',
    keywords: ['プロジェクト', '開発実績', 'ハッカソン', '個人開発', 'チーム開発', 'AI', 'Webアプリ'],
}

export default function ProjectsPage() {
    return (
        <div>
            <Navigation />
            <Projects />
        </div>
    )
}
