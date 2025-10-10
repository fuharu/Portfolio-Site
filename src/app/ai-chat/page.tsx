import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import AIChat from '@/components/AIChat'

export const metadata: Metadata = {
    title: 'AI Chat - 藤本悠杜',
    description: 'AIチャットボットで藤本悠杜について質問できます。経歴、スキル、プロジェクトなど、何でもお気軽に質問してください。',
    keywords: ['AI Chat', 'チャットボット', '質問', '藤本悠杜', 'AI', 'RAG'],
}

export default function AIChatPage() {
    return (
        <div>
            <Navigation />
            <div className="min-h-screen pt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Chat</h1>
                        <p className="text-xl text-gray-300">藤本悠杜について何でも質問してください</p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <AIChat />
                    </div>
                </div>
            </div>
        </div>
    )
}
