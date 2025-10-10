import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import About from '@/components/About'

export const metadata: Metadata = {
    title: 'About - 藤本悠杜',
    description: '茨城大学工学部情報工学科に在籍する藤本悠杜の詳細な経歴、スキル、将来のビジョンについて紹介します。',
    keywords: ['藤本悠杜', 'About', '経歴', 'スキル', '将来のビジョン', 'ポートフォリオ'],
}

export default function AboutPage() {
    return (
        <div>
            <Navigation />
            <About />
        </div>
    )
}
