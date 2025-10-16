'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/features/Hero'
import AIChat from '@/components/features/AIChat'
import RippleEffect from '@/components/features/RippleEffect'
import TheDiveLoader from '@/components/features/TheDiveLoader'

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [showDebugButton, setShowDebugButton] = useState(false)
    const contentRef = useState<HTMLDivElement | null>(null)[0]

    // 初回アクセス時のみローディングを表示
    useEffect(() => {
        const hasVisited = sessionStorage.getItem('hasVisitedHome')

        if (!hasVisited) {
            // 初回アクセス
            setIsLoading(true)
            sessionStorage.setItem('hasVisitedHome', 'true')
        } else {
            // 2回目以降は即座にコンテンツを表示
            setShowContent(true)
            setShowDebugButton(true)
        }
    }, [])

    // ローディング完了時の処理（波紋エフェクト付き）
    const handleLoadingComplete = () => {
        setIsLoading(false)

        // 波紋でコンテンツを表示
        const content = document.getElementById('main-content')
        if (content) {
            // 初期状態：中心から見えない状態
            content.style.clipPath = 'circle(0% at 50% 50%)'
            content.style.opacity = '1'

            // 少し遅延してから波紋で広がる
            setTimeout(() => {
                setShowContent(true)

                // CSSトランジションで波紋を広げる
                content.style.transition = 'clip-path 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                content.style.clipPath = 'circle(150% at 50% 50%)'

                // トランジション完了後にclipPathを削除
                setTimeout(() => {
                    content.style.clipPath = 'none'
                    setShowDebugButton(true)
                }, 1500)
            }, 200)
        }
    }

    // デバッグ用：ローディングを再起動
    const handleRestartLoading = () => {
        setShowContent(false)
        setShowDebugButton(false)
        const content = document.getElementById('main-content')
        if (content) {
            content.style.transition = 'none'
            content.style.clipPath = 'none'
            content.style.opacity = '0'
        }
        setTimeout(() => {
            setIsLoading(true)
        }, 100)
    }

    return (
        <>
            {/* ローディングアニメーション */}
            {isLoading && <TheDiveLoader onComplete={handleLoadingComplete} />}

            {/* メインコンテンツ */}
            <div
                id="main-content"
                className={showContent ? 'opacity-100' : 'opacity-0'}
            >
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
                            <Hero />
                            <AIChat />

                            {/* デバッグ用ボタン */}
                            {showDebugButton && (
                                <button
                                    onClick={handleRestartLoading}
                                    className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                                    title="ローディングアニメーションを再生"
                                >
                                    <svg
                                        className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium">The Dive</span>
                                </button>
                            )}
                        </div>

                    </div>
                </RippleEffect>
            </div>
        </>
    )
}
