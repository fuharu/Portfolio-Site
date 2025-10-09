'use client'  // クライアントサイドコンポーネントとして動作させる

import { useState, useEffect } from 'react'

export default function Navigation() {
    // ここに状態管理とロジックを書く
    //モバイルメニューの開閉状態を管理
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    //スクロール検知用の状態
    const [isScrolled, setIsScrolled] = useState(false)

    //ナビゲーション項目の配列
    const navItems = [
        { name: 'ホーム', href: '#home' },
        { name: 'AI Chat', href: '#ai-chat' },
        { name: 'About', href: '#about' },
        { name: 'スキル', href: '#skills' },
        { name: 'プロジェクト', href: '#projects' },
        { name: 'お問い合わせ', href: '#contact' },
    ]

    //スクロール検知の詳細
    useEffect(() => {
        const handleScroll = () => {
            //スクロール位置が50px以上の場合、背景を変更
            setIsScrolled(window.scrollY > 50)
        }

        //スクロールイベントリスナーを追加
        window.addEventListener('scroll', handleScroll)

        //クリーンアップ（コンポーネントが「アンマウント」された時に実行）
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])//空の依存配列で、コンポーネントがマウントされた時にのみ実行
    return (
        // ここにJSXを書く
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? 'bg-blue-900/80 backdrop-blur-md shadow-lg' //スクロール時
            : 'bg-transparent' //トップ時
            }`} >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* ロゴ */}
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                            Portfolio
                        </a>
                    </div>
                    {/* デスクトップナビゲーション項目 */}
                    <div className="hidden sm:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-900/30 relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                    {/* モバイルメニューボタン */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400 transition-colors duration-300"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                        {/* モバイルメニュー */}
                        <div className={`md:hidden transition-all duration-300 ${isMenuOpen
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0 overflow-hidden'
                            }`} >
                            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-900/95 backdrop-blur-md shadow-lg rounded-lg mt-2">
                                {navItems.map((item, index) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-white hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-blue-800/30"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}