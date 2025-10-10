'use client'
import { useState } from 'react'
import { useScroll } from '@/hooks/useScroll'

export default function Contact() {
    const { scrollY } = useScroll()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // 実際の送信処理は後で実装
            await new Promise(resolve => setTimeout(resolve, 1000))
            setSubmitStatus('success')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactMethods = [
        {
            title: "Email",
            description: "お気軽にご連絡ください",
            contact: "haruto7fujimoto@gmail.com",
            icon: "📧",
            href: "mailto:haruto7fujimoto@gmail.com"
        },
        {
            title: "GitHub",
            description: "コードやプロジェクトをチェック",
            contact: "github.com/fuharu",
            icon: "💻",
            href: "https://github.com/fuharu"
        }
    ]

    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* 図形レイヤー */}
            <div className="absolute inset-0 z-5">
                {/* 大きな円 */}
                <svg
                    className="absolute top-16 right-16 w-32 h-32 text-blue-400/20 transition-transform duration-100"
                    style={{
                        transform: `translate(${-scrollY * 0.04}px, ${scrollY * 0.06}px) rotate(${scrollY * 0.02}deg)`
                    }}
                >
                    <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>

                {/* 六角形 */}
                <svg
                    className="absolute bottom-16 left-16 w-28 h-28 text-purple-400/25 transition-transform duration-100"
                    style={{
                        transform: `translate(${scrollY * 0.08}px, ${-scrollY * 0.05}px) rotate(${-scrollY * 0.03}deg)`
                    }}
                >
                    <polygon
                        points="56,14 98,42 98,84 56,112 14,84 14,42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>

                {/* 星形 */}
                <svg
                    className="absolute top-1/2 left-1/4 w-20 h-20 text-cyan-400/30 transition-transform duration-100"
                    style={{
                        transform: `translate(${scrollY * 0.06}px, ${scrollY * 0.08}px) rotate(${scrollY * 0.04}deg)`
                    }}
                >
                    <polygon
                        points="40,8 44,32 68,32 48,48 52,72 40,56 28,72 32,48 12,32 36,32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>
            </div>

            {/* コンテンツエリア */}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* ヘッダー */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact</h2>
                        <p className="text-xl text-gray-300">お問い合わせ</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* お問い合わせフォーム */}
                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                            <h3 className="text-2xl font-semibold text-white mb-6">お気軽にお問い合わせください</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* お名前 */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                        お名前 *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="山田太郎"
                                    />
                                </div>

                                {/* メールアドレス */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        メールアドレス *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="example@email.com"
                                    />
                                </div>

                                {/* 件名 */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                                        件名 *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="お問い合わせの件名"
                                    />
                                </div>

                                {/* メッセージ */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                                        メッセージ *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="お問い合わせ内容をご記入ください"
                                    />
                                </div>

                                {/* 送信ボタン */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                                >
                                    {isSubmitting ? '送信中...' : '送信する'}
                                </button>

                                {/* 送信ステータス */}
                                {submitStatus === 'success' && (
                                    <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                                        <p className="text-green-400 text-center">お問い合わせありがとうございます。返信いたします。</p>
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                                        <p className="text-red-400 text-center">送信に失敗しました。再度お試しください。</p>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* 連絡先情報 */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-6">その他の連絡先</h3>
                                <div className="space-y-4">
                                    {contactMethods.map((method) => (
                                        <a
                                            key={method.title}
                                            href={method.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="text-2xl">{method.icon}</div>
                                                <div>
                                                    <h4 className="text-lg font-semibold text-white">{method.title}</h4>
                                                    <p className="text-gray-300 text-sm">{method.description}</p>
                                                    <p className="text-blue-400 text-sm">{method.contact}</p>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* 追加情報 */}
                            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                <h4 className="text-lg font-semibold text-white mb-3">お問い合わせについて</h4>
                                <p className="text-gray-200 text-sm leading-relaxed">
                                    仕事のご相談、技術的な質問、または単純に話をしたい方まで、
                                    どんな内容でもお気軽にお問い合わせください。
                                    通常1-2営業日以内に返信いたします。
                                </p>
                            </div>

                            {/* 現在の状況 */}
                            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-6 rounded-xl border border-blue-400/20">
                                <h4 className="text-lg font-semibold text-white mb-3">現在の状況</h4>
                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-200">
                                        <span className="text-blue-400">📚</span> 茨城大学工学部情報工学科 3年生
                                    </p>
                                    <p className="text-gray-200">
                                        <span className="text-green-400">💼</span> インターンシップ募集中
                                    </p>
                                    <p className="text-gray-200">
                                        <span className="text-purple-400">🚀</span> 新規プロジェクト募集中
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* フッター */}
                    <div className="text-center mt-16 pt-8 border-t border-white/20">
                        <p className="text-gray-400 text-sm">
                            © 2024 藤本悠杜. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
