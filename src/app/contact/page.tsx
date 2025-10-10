import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
    title: 'Contact - 藤本悠杜',
    description: '藤本悠杜へのお問い合わせページ。仕事のご相談、技術的な質問、共同開発の機会など、お気軽にご連絡ください。',
    keywords: ['お問い合わせ', 'Contact', '連絡先', '仕事の相談', '共同開発', '技術相談'],
}

export default function ContactPage() {
    return (
        <div>
            <Navigation />
            <Contact />
        </div>
    )
}
