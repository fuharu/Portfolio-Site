'use client'
import { Code2, Layers, Wrench } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SkillsSummary() {
    const t = useTranslations('SkillsSummary');
    
    const skills = [
        {
            icon: <Code2 size={24} />,
            category: "Languages",
            items: ["TypeScript", "JavaScript", "Python", "Java", "Rust"]
        },
        {
            icon: <Layers size={24} />,
            category: "Frameworks",
            items: ["React", "Next.js", "Tailwind CSS", "FastAPI"]
        },
        {
            icon: <Wrench size={24} />,
            category: "Tools",
            items: ["Git / GitHub", "Docker", "AWS", "Figma"]
        }
    ]

    return (
        <section className="py-32">
            <div className="container-custom max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-muted-foreground">
                        {t('description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {skills.map((skill) => (
                        <div key={skill.category} className="bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                                {skill.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item) => (
                                    <span key={item} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}