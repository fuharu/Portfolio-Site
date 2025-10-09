'use client'
import { useScroll } from '@/hooks/useScroll'

export default function Projects() {
    const { scrollY } = useScroll()

    const projects = [
        {
            title: "私に投資して！",
            description: "個人開発で作成した投資関連のWebアプリケーション。ReactとTypeScriptを使用し、ユーザーインターフェースの改善に重点を置いて開発しました。",
            technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
            github: "https://github.com/yourusername/invest-in-me",
            demo: "https://invest-in-me-demo.vercel.app",
            image: "💼",
            category: "個人開発"
        },
        {
            title: "ポートフォリオサイト",
            description: "Next.jsとTailwind CSSを使用して作成したモダンなポートフォリオサイト。スクロール連動アニメーションとレスポンシブデザインを実装。",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
            github: "https://github.com/yourusername/portfolio",
            demo: "https://yourname-portfolio.vercel.app",
            image: "🎨",
            category: "個人開発"
        },
        {
            title: "ハッカソンプロジェクト",
            description: "チーム開発で参加したハッカソンで作成したプロダクト。フロントエンド開発を担当し、ユーザビリティの向上に貢献しました。",
            technologies: ["React", "Python", "Django", "PostgreSQL"],
            github: "https://github.com/yourusername/hackathon-project",
            demo: "https://hackathon-demo.vercel.app",
            image: "🚀",
            category: "チーム開発"
        }
    ]

    const experienceItems = [
        {
            title: "個人開発経験",
            description: "複数の個人プロジェクトを通じて、要件定義からデプロイまでの一連の開発フローを経験。ユーザー視点での設計を重視。",
            icon: "💡"
        },
        {
            title: "チーム開発経験",
            description: "ハッカソンやインターンでのチーム開発を通じて、Git を使った協働開発やコードレビューの重要性を学びました。",
            icon: "👥"
        },
        {
            title: "技術学習",
            description: "新しい技術への好奇心を大切にし、実践的なプロジェクトを通じて継続的にスキルアップを図っています。",
            icon: "📚"
        }
    ]

    return (
        <section id="projects" className="py-20 relative overflow-hidden">
            {/* 図形レイヤー */}
            <div className="absolute inset-0 z-5">
                {/* 大きな六角形 */}
                <svg
                    className="absolute top-20 left-1/4 w-36 h-36 text-purple-400/20 transition-transform duration-100"
                    style={{
                        transform: `translate(${scrollY * 0.06}px, ${-scrollY * 0.04}px) rotate(${-scrollY * 0.02}deg)`
                    }}
                >
                    <polygon
                        points="72,18 126,54 126,108 72,144 18,108 18,54"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>

                {/* 菱形 */}
                <svg
                    className="absolute bottom-20 right-1/4 w-24 h-24 text-cyan-400/25 transition-transform duration-100"
                    style={{
                        transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.06}px) rotate(${scrollY * 0.03}deg)`
                    }}
                >
                    <polygon
                        points="48,12 84,48 48,84 12,48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>

                {/* 小さな五角形 */}
                <svg
                    className="absolute top-1/3 right-16 w-20 h-20 text-blue-400/30 transition-transform duration-100"
                    style={{
                        transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) rotate(${-scrollY * 0.04}deg)`
                    }}
                >
                    <polygon
                        points="40,8 64,28 56,56 24,56 16,28"
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
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projects</h2>
                        <p className="text-xl text-gray-300">プロジェクト紹介</p>
                    </div>

                    {/* プロジェクト一覧 */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {projects.map((project, index) => (
                            <div
                                key={project.title}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                            >
                                {/* プロジェクト画像とカテゴリ */}
                                <div className="text-center mb-4">
                                    <div className="text-4xl mb-2">{project.image}</div>
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-400/10 rounded-full">
                                        {project.category}
                                    </span>
                                </div>

                                {/* プロジェクトタイトル */}
                                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>

                                {/* プロジェクト説明 */}
                                <p className="text-gray-200 mb-4 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                {/* 使用技術 */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-300 mb-2">使用技術</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs bg-white/10 text-white rounded-md border border-white/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* リンクボタン */}
                                <div className="flex gap-2">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-white bg-blue-600/50 hover:bg-blue-600/70 rounded-lg transition-all duration-300"
                                    >
                                        GitHub
                                    </a>
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-blue-400 border border-blue-400/50 hover:bg-blue-400/10 rounded-lg transition-all duration-300"
                                    >
                                        Demo
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 開発経験セクション */}
                    <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                        <h3 className="text-2xl font-semibold text-white mb-6 text-center">開発経験</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {experienceItems.map((item, index) => (
                                <div key={item.title} className="text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                                    <p className="text-gray-200 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <p className="text-gray-300 mb-4">プロジェクトについて詳しく知りたい方は、お気軽にお問い合わせください。</p>
                        <a
                            href="#contact"
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                        >
                            お問い合わせ
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
