import { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import GenieGPT from '@/components/features/Haru-AI'
import RippleEffect from '@/components/features/RippleEffect'

export const metadata: Metadata = {
    title: 'AI Chat - 藤本悠杜',
    description: 'AIチャットボットで藤本悠杜について質問できます。経歴、スキル、プロジェクトなど、何でもお気軽に質問してください。',
    keywords: ['AI Chat', 'チャットボット', '質問', '藤本悠杜', 'AI', 'RAG'],
}

export default function AIChatPage() {
    return (
        <RippleEffect>
            {/* 親要素に relative を設定 */}
            <div className="relative min-h-screen">

                {/* 1. 背景グラデーション (z-index: 0) */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)',
                        backgroundAttachment: 'fixed'
                    }}
                ></div>

                {/* 2. 泡アニメーション (z-index: 10) */}
                <div className="bubbles absolute inset-0 z-10">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                </div>

                {/* 3. メインコンテンツ (z-index: 20) */}
                <div className="relative z-20">
                    <Navigation />
                    <GenieGPT />
                </div>

            </div>
        </RippleEffect>
    )
}
