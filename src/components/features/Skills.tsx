'use client'
import { useState } from 'react'
import { Code2, Layers, Wrench, ArrowUpRight, BookOpen, Award, Sparkles } from 'lucide-react'
import { projects } from '@/data/projects'
import { useTranslations } from 'next-intl'

interface Skill {
    name: string
    level: 'Expert' | 'Advanced' | 'Intermediate' | 'Basic'
    descriptionKey: string
    relatedProjects?: string[]
    icon?: string
}

interface SkillCategory {
    title: string
    titleKey: string
    icon: React.ReactNode
    skills: Skill[]
}

export default function Skills() {
    const [activeSkill, setActiveSkill] = useState<string | null>(null)
    const t = useTranslations('Skills')

    // スキルに関連するプロジェクトを取得するヘルパー関数
    const getRelatedProjects = (skillName: string) => {
        return projects.filter(p => p.technologies.some(t => t.includes(skillName) || skillName.includes(t)))
    }

    const skillCategories: SkillCategory[] = [
        {
            title: "Languages",
            titleKey: "categories.Languages",
            icon: <Code2 className="w-6 h-6" />,
            skills: [
                { name: "TypeScript", level: "Advanced", descriptionKey: "items.TypeScript" },
                { name: "JavaScript (ES6+)", level: "Advanced", descriptionKey: "items.JavaScript" },
                { name: "Python", level: "Advanced", descriptionKey: "items.Python" },
                { name: "Java", level: "Intermediate", descriptionKey: "items.Java" },
                { name: "Rust", level: "Basic", descriptionKey: "items.Rust" }
            ]
        },
        {
            title: "Frontend",
            titleKey: "categories.Frontend",
            icon: <Layers className="w-6 h-6" />,
            skills: [
                { name: "React", level: "Advanced", descriptionKey: "items.React" },
                { name: "Next.js", level: "Advanced", descriptionKey: "items.Nextjs" },
                { name: "Tailwind CSS", level: "Advanced", descriptionKey: "items.TailwindCSS" },
                { name: "Three.js / R3F", level: "Basic", descriptionKey: "items.Threejs" }
            ]
        },
        {
            title: "Backend & Tools",
            titleKey: "categories.BackendTools",
            icon: <Wrench className="w-6 h-6" />,
            skills: [
                { name: "Node.js", level: "Intermediate", descriptionKey: "items.Nodejs" },
                { name: "FastAPI", level: "Intermediate", descriptionKey: "items.FastAPI" },
                { name: "Git / GitHub", level: "Advanced", descriptionKey: "items.GitGitHub" },
                { name: "Docker", level: "Intermediate", descriptionKey: "items.Docker" },
                { name: "Firebase", level: "Intermediate", descriptionKey: "items.Firebase" }
            ]
        }
    ]

    const learningNow = [
        {
            name: "AI Agents",
            descriptionKey: "learning.AIAgents",
            icon: <Sparkles className="w-5 h-5 text-yellow-500" />
        },
        {
            name: "Rust for Web",
            descriptionKey: "learning.RustWeb",
            icon: <Code2 className="w-5 h-5 text-orange-500" />
        },
        {
            name: "System Design",
            descriptionKey: "learning.SystemDesign",
            icon: <Layers className="w-5 h-5 text-blue-500" />
        }
    ]

    return (
        <section id="skills" className="container-custom py-32 md:py-40">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-24 md:mb-32 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{t('title')}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Skills Categories */}
                <div className="grid lg:grid-cols-3 gap-12 mb-32">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="flex flex-col gap-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-border">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    {category.icon}
                                </div>
                                <h3 className="text-2xl font-bold">{t(category.titleKey)}</h3>
                            </div>
                            
                            <div className="space-y-4">
                                {category.skills.map((skill) => (
                                    <div 
                                        key={skill.name}
                                        className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer"
                                        onMouseEnter={() => setActiveSkill(skill.name)}
                                        onMouseLeave={() => setActiveSkill(null)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{skill.name}</h4>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                skill.level === 'Expert' ? 'bg-purple-500/10 text-purple-500' :
                                                skill.level === 'Advanced' ? 'bg-blue-500/10 text-blue-500' :
                                                skill.level === 'Intermediate' ? 'bg-green-500/10 text-green-500' :
                                                'bg-gray-500/10 text-gray-500'
                                            }`}>
                                                {skill.level}
                                            </span>
                                        </div>
                                        
                                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                            {t(skill.descriptionKey)}
                                        </p>

                                        {/* Related Projects Indicator */}
                                        {getRelatedProjects(skill.name).length > 0 && (
                                            <div className="flex items-center gap-2 text-xs text-primary/80 font-medium pt-2 border-t border-border/50">
                                                <Award size={14} />
                                                <span>{t('relatedProjects', {count: getRelatedProjects(skill.name).length})}</span>
                                            </div>
                                        )}

                                        {/* Hover Popup for Related Projects (Desktop only) */}
                                        <div className={`absolute z-20 left-0 bottom-full mb-2 w-full bg-popover text-popover-foreground p-4 rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none md:pointer-events-auto ${getRelatedProjects(skill.name).length === 0 ? 'hidden' : ''}`}>
                                            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Related Projects</h5>
                                            <ul className="space-y-2">
                                                {getRelatedProjects(skill.name).map(project => (
                                                    <li key={project.title} className="flex items-center gap-2 text-sm font-medium">
                                                        <ArrowUpRight size={14} className="text-primary" />
                                                        {project.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Learning Now Section */}
                <div className="bg-secondary/20 border border-border rounded-3xl p-10 md:p-16">
                    <div className="flex flex-col md:flex-row items-start gap-10">
                        <div className="md:w-1/3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <BookOpen size={16} />
                                <span>{t('currentFocus')}</span>
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{t('learningNowTitle')}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('learningNowDescription')}
                            </p>
                        </div>

                        <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
                            {learningNow.map((item) => (
                                <div key={item.name} className="bg-background p-6 rounded-xl border border-border hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-secondary rounded-lg">
                                            {item.icon}
                                        </div>
                                        <h4 className="font-bold">{item.name}</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {t(item.descriptionKey)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}