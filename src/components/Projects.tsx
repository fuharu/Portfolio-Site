'use client'
import { useScroll } from '@/hooks/useScroll'

export default function Projects() {
    const { scrollY } = useScroll()

    const projects = [
        {
            title: "ポートフォリオサイト（当サイト）",
            description: "私自身のスキル、経歴、制作物を紹介するために作成したWebサイトです。「成長と繋がり」をコンセプトにした背景デザインと、Difyで構築したRAGチャットボットをAPI経由で組み込み、訪問者が私について対話形式で知ることができるインタラクティブな体験を実現しました。",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Dify API"],
            github: "https://github.com/fuharu/Portfolio-Site",
            demo: "#home",
            image: "🎨",
            category: "個人開発",
            highlights: ["RAGチャットボット", "モダンなデザイン", "アニメーション実装"]
        },
        {
            title: "私に投資して！",
            description: "投資関連のWebアプリケーションを個人開発で作成しました。ユーザーが投資に関する情報を効率的に管理・分析できるツールです。ユーザーインターフェースの使いやすさを重視し、直感的な操作ができるようデザインしました。",
            technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
            github: "https://github.com/fuharu/invest-in-me",
            demo: "#",
            image: "💼",
            category: "個人開発",
            highlights: ["レスポンシブデザイン", "型安全性", "ユーザビリティ重視"]
        },
        {
            title: "Mail de Calen",
            description: "GmailとGoogleカレンダーを連携したAI搭載のスケジュール管理アプリです。Gemini AIがメール内容を解析して予定やタスクを自動抽出し、効率的なスケジュール管理を実現します。バックエンドAPI設計・実装、AI解析機能、Firebase連携をメイン担当しました。",
            technologies: ["FastAPI", "Python", "Gemini API", "Next.js", "TypeScript", "Firebase"],
            github: "https://github.com/fuharu/Mail-de-Calen",
            demo: "#",
            image: "📅",
            category: "チーム開発（ハッカソン）",
            highlights: ["AI解析機能", "リアルタイム処理", "セキュリティ実装"]
        },
        {
            title: "なぞみ - 匿名日記マッチングサービス",
            description: "完全匿名で日記を投稿し、AI（自然言語処理）が抽出した共感ワードをもとに、似た感情や経験を持つユーザー同士をマッチングするメンタルケアアプリです。自然言語処理エンジン、マッチングアルゴリズム、リアルタイムチャット機能、セキュリティ・暗号化機能を担当しました。",
            technologies: ["FastAPI", "Python", "spaCy", "React", "TypeScript", "Supabase", "WebSocket"],
            github: "https://github.com/sho-nagisa/nazomi",
            demo: "#",
            image: "💝",
            category: "チーム開発（ハッカソン）",
            highlights: ["自然言語処理", "暗号化機能", "リアルタイムチャット"]
        },
        {
            title: "誠に遅れました",
            description: "遅刻時の連絡文をAIで自動生成するWebアプリケーションです。パラメータ選択式UIで相手、原因、到着時間を選択し、Google Gemini APIを使って自然な日本語の遅刻連絡文を生成します。AI混雑時は504通りのプリコンパイル済みテンプレートを使用するフォールバック機能付きです。",
            technologies: ["Django", "FastAPI", "Gemini API", "Vanilla JS", "CSS3", "Supabase"],
            github: "https://github.com/1f10240115/excuse",
            demo: "#",
            image: "⏰",
            category: "チーム開発（ハッカソン）",
            highlights: ["AI生成システム", "フォールバック機能", "受賞：努力賞"]
        },
        {
            title: "スタンプラリー地図アプリ",
            description: "地域の観光地を巡ってスタンプを集めるWebアプリケーションです。Google MapsとAI画像生成技術を組み合わせた、観光促進・運動促進アプリです。フルスタック開発、AI画像生成システム設計、データベース設計、位置情報処理を担当しました。",
            technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Stable Diffusion XL", "Google Maps API"],
            github: "https://github.com/fuharu/stamp-rally",
            demo: "#",
            image: "🗺️",
            category: "チーム開発（大学講義）",
            highlights: ["AI画像生成", "位置情報処理", "ハイブリッドDB構成"]
        }
    ]

    const experienceItems = [
        {
            title: "個人開発経験",
            description: "ポートフォリオサイトや投資アプリなど、個人プロジェクトを通じて要件定義からデプロイまでの一連の開発フローを経験。ユーザー視点での設計を重視し、モダンな技術スタックを活用。",
            icon: "💡"
        },
        {
            title: "ハッカソン参加",
            description: "技育CAMPハッカソンに複数回参加し、限られた時間内でのプロダクト開発を経験。AI技術とWeb開発を組み合わせたプロジェクトで努力賞を受賞。",
            icon: "🏆"
        },
        {
            title: "チーム開発",
            description: "大学講義でのチーム開発やハッカソンを通じて、Git を使った協働開発、API設計、データベース設計などの実践的なスキルを習得。",
            icon: "👥"
        },
        {
            title: "AI技術活用",
            description: "Gemini API、spaCy、Stable Diffusion XLなど、様々なAI技術を実践的に活用。プロンプトエンジニアリングや自然言語処理の経験を積む。",
            icon: "🤖"
        },
        {
            title: "フルスタック開発",
            description: "React、Next.js、FastAPI、Djangoなど、フロントエンドからバックエンドまで幅広い技術を習得。データベース設計とAPI連携の実装経験も豊富。",
            icon: "⚡"
        },
        {
            title: "継続的学習",
            description: "新しい技術への好奇心を大切にし、実践的なプロジェクトを通じて継続的にスキルアップを図っています。特にAI技術とWeb技術の融合に注力。",
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

                                {/* ハイライトポイント */}
                                {project.highlights && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-300 mb-2">主な特徴</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {project.highlights.map((highlight) => (
                                                <span
                                                    key={highlight}
                                                    className="px-2 py-1 text-xs bg-purple-600/20 text-purple-300 rounded-md border border-purple-400/30"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

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
                                    {project.demo !== "#" && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center px-3 py-2 text-sm font-medium text-blue-400 border border-blue-400/50 hover:bg-blue-400/10 rounded-lg transition-all duration-300"
                                        >
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 開発経験セクション */}
                    <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                        <h3 className="text-2xl font-semibold text-white mb-6 text-center">開発経験</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <p className="text-gray-300 mb-4">
                            これらのプロジェクトについて詳しく知りたい方や、共同開発の機会をお探しの方は、お気軽にお問い合わせください。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                            >
                                お問い合わせ
                            </a>
                            <a
                                href="/ai-chat"
                                className="inline-block border border-blue-400 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-400/10 transition-all duration-300 hover:scale-105"
                            >
                                AI Chat で質問
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
