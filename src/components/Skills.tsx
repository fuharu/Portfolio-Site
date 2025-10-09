'use client'
import { useScroll } from '@/hooks/useScroll'

export default function Skills() {
    const { scrollY } = useScroll()

    const skillCategories = [
        {
            title: "言語",
            icon: "</>",
            skills: [
                { name: "JavaScript", icon: "JS", color: "text-yellow-400" },
                { name: "TypeScript", icon: "TS", color: "text-blue-400" },
                { name: "Python", icon: "Py", color: "text-green-400" },
                { name: "Java", icon: "Ja", color: "text-orange-400" },
                { name: "C++", icon: "C++", color: "text-blue-300" }
            ]
        },
        {
            title: "フレームワーク・ライブラリ",
            icon: "⚛️",
            skills: [
                { name: "React", icon: "R", color: "text-cyan-400" },
                { name: "Next.js", icon: "N", color: "text-gray-300" },
                { name: "Node.js", icon: "N", color: "text-green-300" },
                { name: "Express", icon: "E", color: "text-gray-400" },
                { name: "Django", icon: "D", color: "text-green-500" }
            ]
        },
        {
            title: "ツール・その他",
            icon: "🛠️",
            skills: [
                { name: "Git", icon: "G", color: "text-red-400" },
                { name: "Docker", icon: "D", color: "text-blue-500" },
                { name: "AWS", icon: "A", color: "text-orange-500" },
                { name: "Figma", icon: "F", color: "text-purple-400" },
                { name: "PostgreSQL", icon: "P", color: "text-blue-600" }
            ]
        }
    ]

    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            {/* 図形レイヤー */}
            <div className="absolute inset-0 z-5">
                {/* 大きな六角形 */}
                <svg
                    className="absolute top-10 right-10 w-40 h-40 text-blue-500/20 transition-transform duration-100"
                    style={{
                        transform: `translate(${-scrollY * 0.05}px, ${scrollY * 0.08}px) rotate(${scrollY * 0.01}deg)`
                    }}
                >
                    <polygon
                        points="80,20 140,60 140,120 80,160 20,120 20,60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>

                {/* 小さな八角形 */}
                <svg
                    className="absolute bottom-32 left-16 w-20 h-20 text-purple-400/25 transition-transform duration-100"
                    style={{
                        transform: `translate(${scrollY * 0.12}px, ${-scrollY * 0.06}px) rotate(${-scrollY * 0.04}deg)`
                    }}
                >
                    <polygon
                        points="40,5 70,5 90,25 90,55 70,75 40,75 20,55 20,25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>

                {/* 三角形 */}
                <svg
                    className="absolute top-1/2 left-8 w-16 h-16 text-cyan-400/20 transition-transform duration-100"
                    style={{
                        transform: `translate(${scrollY * 0.08}px, ${scrollY * 0.1}px) rotate(${scrollY * 0.03}deg)`
                    }}
                >
                    <polygon
                        points="32,8 56,48 8,48"
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
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Skills</h2>
                        <p className="text-xl text-gray-300">技術スキル</p>
                    </div>

                    {/* スキルカテゴリ */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {skillCategories.map((category, categoryIndex) => (
                            <div
                                key={category.title}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                            >
                                {/* カテゴリヘッダー */}
                                <div className="text-center mb-6">
                                    <div className="text-3xl mb-2">{category.icon}</div>
                                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                                </div>

                                {/* スキルリスト */}
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div
                                            key={skill.name}
                                            className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                                        >
                                            {/* スキルアイコン */}
                                            <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold ${skill.color}`}>
                                                {skill.icon}
                                            </div>

                                            {/* スキル名 */}
                                            <span className="text-white font-medium">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 追加情報 */}
                    <div className="mt-12 text-center">
                        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/20 max-w-2xl mx-auto">
                            <h4 className="text-lg font-semibold text-white mb-3">学習への取り組み</h4>
                            <p className="text-gray-200">
                                新しい技術への好奇心を大切にし、実践的なプロジェクトを通じて継続的にスキルアップを図っています。
                                チーム開発での経験も活かし、コードの品質とユーザビリティを重視した開発を心がけています。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
