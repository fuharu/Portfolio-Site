'use client'
import { useState, useRef, useEffect } from 'react'
import { Github, ExternalLink, X, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { projects, Project } from '@/data/projects'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Layers, CheckCircle2, Lightbulb } from 'lucide-react' 

export default function FeaturedWorks() {
    const t = useTranslations('FeaturedWorks');
    const tData = useTranslations('ProjectsData');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [activeTab, setActiveTab] = useState<'overview' | 'process'>('overview')
    const modalRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const tProjects = useTranslations('Projects'); 
    
    const featuredProjects = projects.filter(p => p.featured).slice(0, 3)

    const openModal = (project: Project) => {
        setSelectedProject(project)
        setActiveTab('overview')
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        if (modalRef.current && overlayRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setSelectedProject(null)
                    document.body.style.overflow = ''
                }
            })
            tl.to(modalRef.current, { opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in" })
              .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "<")
        } else {
            setSelectedProject(null)
            document.body.style.overflow = ''
        }
    }

    useEffect(() => {
        if (selectedProject && modalRef.current && overlayRef.current) {
            const tl = gsap.timeline()
            tl.fromTo(overlayRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
            )
            .fromTo(modalRef.current, 
                { opacity: 0, scale: 0.95, y: 20 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }, 
                "-=0.2"
            )
        }
    }, [selectedProject])

    return (
        <section className="py-32 bg-background/50 backdrop-blur-sm">
            <div className="container-custom max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-muted-foreground">
                        {t('description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <div 
                            key={project.title}
                            className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                            onClick={() => openModal(project)}
                        >
                            {/* Placeholder Image Area */}
                            <div className="h-48 w-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                                <span className="text-4xl font-bold text-muted-foreground/20 group-hover:scale-110 transition-transform duration-500">
                                    {project.title.charAt(0)}
                                </span>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="text-xs font-medium text-primary mb-1 block">{project.category}</span>
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                                    {tData(`${project.id}.description`)}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span key={tech} className="px-2 py-1 text-[10px] bg-secondary text-secondary-foreground rounded-md border border-border">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="px-2 py-1 text-[10px] text-muted-foreground">+{project.technologies.length - 3}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                                    <div 
                                        className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                        onClick={(e) => { e.stopPropagation(); window.open(project.github, '_blank'); }}
                                    >
                                        <Github size={18} />
                                    </div>
                                    {project.demo !== "#" && (
                                        <div 
                                            className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                            onClick={(e) => { e.stopPropagation(); window.open(project.demo, '_blank'); }}
                                        >
                                            <ExternalLink size={18} />
                                        </div>
                                    )}
                                    <span className="ml-auto text-xs font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        {t('details')} <ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link 
                        href="/projects" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors font-medium"
                    >
                        {t('viewAll')} <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Modal logic omitted for brevity as it doesn't need bg change */}
            {selectedProject && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                    {/* ... modal content ... */}
                    <div 
                        ref={overlayRef}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    <div 
                        ref={modalRef}
                        className="relative w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                         {/* Modal Header */}
                         <div className="flex items-center justify-between p-6 border-b border-border bg-card z-10">
                            <div>
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">{selectedProject.category} / {selectedProject.year}</span>
                                <h3 className="text-2xl font-bold text-foreground">{selectedProject.title}</h3>
                            </div>
                            <button 
                                onClick={closeModal}
                                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-border bg-muted/20 px-6 sm:px-8">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'overview' 
                                        ? 'border-primary text-primary' 
                                        : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {tProjects('modal.overview')}
                            </button>
                            <button
                                onClick={() => setActiveTab('process')}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'process' 
                                        ? 'border-primary text-primary' 
                                        : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {tProjects('modal.behindTheScenes')}
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="overflow-y-auto p-6 sm:p-8">
                            {activeTab === 'overview' ? (
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                                            <Layers size={18} className="text-primary" />
                                            {tProjects('modal.summary')}
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tData(`${selectedProject.id}.fullDescription`)}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                                            <CheckCircle2 size={18} className="text-primary" />
                                            {tProjects('modal.keyFeatures')}
                                        </h4>
                                        <ul className="grid sm:grid-cols-2 gap-3">
                                            {['f1', 'f2', 'f3', 'f4'].map((key, idx) => {
                                                try {
                                                    const feature = tData(`${selectedProject.id}.keyFeatures.${key}`);
                                                    if (feature.includes(`${selectedProject.id}.keyFeatures`)) return null;
                                                    return (
                                                        <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                                                            <span className="text-primary mt-1">•</span>
                                                            {feature}
                                                        </li>
                                                    )
                                                } catch { return null }
                                            })}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                                            <Lightbulb size={18} className="text-primary" />
                                            {tProjects('modal.techStack')}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map((tech) => (
                                                <span 
                                                    key={tech}
                                                    className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md border border-border"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl">
                                        <h4 className="text-lg font-bold mb-3 text-red-500">{tProjects('modal.challenge')}</h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tData(`${selectedProject.id}.process.challenge`)}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-xl">
                                        <h4 className="text-lg font-bold mb-3 text-blue-500">{tProjects('modal.solution')}</h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tData(`${selectedProject.id}.process.solution`)}
                                        </p>
                                    </div>

                                    <div className="bg-green-500/5 border border-green-500/20 p-6 rounded-xl">
                                        <h4 className="text-lg font-bold mb-3 text-green-500">{tProjects('modal.outcome')}</h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tData(`${selectedProject.id}.process.outcome`)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-border bg-muted/30 flex gap-4">
                            <a 
                                href={selectedProject.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl font-medium hover:bg-accent transition-colors text-foreground shadow-sm"
                            >
                                <Github size={20} />
                                <span>{tProjects('modal.viewSource')}</span>
                            </a>
                            {selectedProject.demo !== "#" && (
                                <a 
                                    href={selectedProject.demo} 
                                    target={selectedProject.demo.startsWith('#') || selectedProject.demo.startsWith('/') ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all shadow-sm"
                                >
                                    <ExternalLink size={20} />
                                    <span>{tProjects('modal.liveDemo')}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}