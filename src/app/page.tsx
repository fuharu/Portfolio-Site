import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

export const metadata: Metadata = {
  title: '藤本悠杜 - ポートフォリオサイト',
  description: '茨城大学工学部情報工学科の藤本悠杜のポートフォリオサイト。AIとWeb技術を融合したフルスタック開発者として、ユーザー中心のプロダクト開発に取り組んでいます。',
  keywords: ['藤本悠杜', 'ポートフォリオ', 'フルスタック開発者', 'AI', 'Web技術', 'React', 'Next.js', 'Python'],
}

export default function Home() {
  return (
    <div>
      <Navigation />
      <Hero />
    </div>
  );
}
