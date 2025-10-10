'use client'
import { useState, useEffect } from 'react'
import { useScroll } from '@/hooks/useScroll'

export default function About() {
    const { scrollY } = useScroll()

    return (
        <section id="about" className="py-20 relative overflow-hidden">
            {/* 図形レイヤー */}
            <div className="absolute inset-0 z-5">
                {/* ここに図形を配置 */}
                {/* 六角形1 */}
                <svg
                    className="absolute top-20 left-10 w-32 h-32 text-blue-400/30 transition-transform duration-100"
                    style={{
                        transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) rotate(${scrollY * 0.02}deg)`
                    }}
                >
                    <polygon
                        points="64,16 112,48 112,96 64,128 16,96 16,48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>
                {/* 八角形 */}
                <svg
                    className="absolute top-40 right-20 w-24 h-24 text-purple-400/40 transition-transform duration-100"
                    style={{
                        transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.12}px) rotate(${-scrollY * 0.03}deg)`
                    }}
                >
                    <polygon
                        points="48,8 88,8 112,32 112,72 88,88 48,88 24,72 24,32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>
                {/* 小さな六角形 */}
                <svg
                    className="absolute bottom-20 left-1/4 w-16 h-16 text-cyan-400/25 transition-transform duration-100"
                    style={{
                        transform: `translate(${scrollY * 0.15}px, ${-scrollY * 0.08}px) rotate(${scrollY * 0.05}deg)`
                    }}
                >
                    <polygon
                        points="32,8 56,24 56,48 32,64 8,48 8,24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>
            </div>
            {/*コンテンツエリア*/}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
                        <p className="text-xl text-gray-300">私について</p>
                    </div>
                    <div className="grid grid-cols-1 gap-12 items-center">
                        {/*アイコンとスキル*/}
                        <div className="text-center">
                            {/*プロフィールアイコン*/}
                            <div className="text-center mb-12">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-white text-3xl font-bold">藤</span>
                                </div>
                                <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
                                    茨城大学工学部情報工学科に在籍する藤本悠杜です。新しい技術、特にAIやWeb技術に強い関心を持ち、ユーザーにとって価値のあるプロダクトを開発することに情熱を注いでいます。
                                </p>
                            </div>
                        </div>
                        {/* 3つのカード */}
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {/* カード1: プログラミングへの情熱 */}
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <h3 className="text-xl font-semibold text-white mb-4">プログラミングへの情熱</h3>
                                <p className="text-gray-200">
                                    好奇心旺盛で、一度興味を持つと深く探求するタイプです。新しい技術、特にAIとWeb技術の融合に強い関心を持ち、ユーザーにとって価値のあるプロダクトを開発することに情熱を注いでいます。チームでは、積極的に意見交換を行い、より良いプロダクトを目指すことを大切にしています。
                                </p>
                            </div>

                            {/* カード2: 強みとなる経験 */}
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <h3 className="text-xl font-semibold text-white mb-4">強みとなる経験</h3>
                                <p className="text-gray-200 mb-3">
                                    <strong>個人開発:</strong> 「私に投資して！」やポートフォリオサイトなど、要件定義からデプロイまでの一連の開発フローを経験
                                </p>
                                <p className="text-gray-200">
                                    <strong>チーム開発:</strong> 技育CAMPハッカソンで努力賞を2回受賞。AI解析機能や自然言語処理システムの設計・実装を担当し、チーム開発での役割分担とコミュニケーションの重要性を学びました
                                </p>
                            </div>

                            {/* カード3: 将来のビジョン */}
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <h3 className="text-xl font-semibold text-white mb-4">将来のビジョン</h3>
                                <p className="text-gray-200">
                                    技術力と創造性を活かして、人々の生活を豊かにするサービス開発に貢献したいと考えています。特にAIとWeb技術の融合によるフルスタック開発者として、ユーザー中心のプロダクト開発を目指します。将来的には、チーム内での技術リードやメンターとして、後輩エンジニアの育成にも取り組みたいです。
                                </p>
                            </div>
                        </div>
                        {/* 趣味・人柄 */}
                        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-xl mb-12 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-3">私について</h3>
                            <p className="text-gray-200">
                                大学ではトランポリン部に所属し、チームワークと継続的な努力の重要性を学んでいます。興味のある分野はWebフロントエンド、AI、UI/UXデザイン、フルスタック開発で、オンライン学習や技術書籍を通じて常に新しい技術を習得しています。オープンソース活動や勉強会参加を通じて、技術コミュニティでの情報交換と知識共有も積極的に行っています。
                            </p>
                        </div>
                        <div>
                            {/* CTA */}
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    お気軽にご連絡ください
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <a
                                        href="mailto:haruto7fujimoto@gmail.com"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                                    >
                                        Email
                                    </a>
                                    <a
                                        href="/contact"
                                        className="border border-blue-400 text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-400/10 transition-all"
                                    >
                                        お問い合わせフォーム
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
