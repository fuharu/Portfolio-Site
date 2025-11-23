'use client'
import { useState, useEffect, useRef } from 'react'
import { Github, ExternalLink, X, ArrowRight as ArrowRightIcon, Layers, Lightbulb, CheckCircle2 } from 'lucide-react'
import { gsap } from 'gsap'
import { projects, Project } from '@/data/projects'
import { useTranslations } from 'next-intl'

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [activeTab, setActiveTab] = useState<'overview' | 'process'>('overview')
    const modalRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const t = useTranslations('Projects')
    const tData = useTranslations('ProjectsData')

    const openModal = (project: Project) => {
        setSelectedProject(project)
        setActiveTab('overview') // Reset tab on open
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
        <section id="projects" className="container-custom py-32 md:py-40">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-24 md:mb-32 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{t('title')}</h2>
                    <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Projects List */}
                <div className="space-y-32">
                    {projects.map((project) => (
                        <div 
                            key={project.title} 
                            className="group relative grid md:grid-cols-12 gap-8 md:gap-16 items-start cursor-pointer"
                            onClick={() => openModal(project)}
                        >
                            {/* Year & Category (Side info) */}
                            <div className="md:col-span-2 md:text-right pt-2">
                                <span className="block text-xl font-bold text-foreground mb-2">{project.year}</span>
                                <span className="block text-xs text-primary uppercase tracking-widest font-medium">{project.category}</span>
                            </div>

                            {/* Main Content */}
                            <div className="md:col-span-10 border-t border-border pt-8 group-hover:border-primary/50 transition-colors duration-300">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6">
                                    <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    
                                    <div className="hidden md:flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={(e) => e.stopPropagation()}>
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <Github size={18} />
                                        </a>
                                        {project.demo !== "#" && (
                                            <a 
                                                href={project.demo} 
                                                target={project.demo.startsWith('#') || project.demo.startsWith('/') ? "_self" : "_blank"}
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl">
                                    {tData(`${project.id}.description`)}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span 
                                            key={tech}
                                            className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="mt-8 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
                                    {t('viewDetails')} <ArrowRightIcon size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* GitHub Link */}
                <div className="mt-40 text-center">
                    <a 
                        href="https://github.com/fuharu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1 text-lg group"
                    >
                        <span>{t('viewGitHub')}</span>
                        <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                    <div 
                        ref={overlayRef}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    <div 
                        ref={modalRef}
                        className="relative w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-border bg-card z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider px-2 py-1 bg-primary/10 rounded-md">{selectedProject.category}</span>
                                    <span className="text-sm text-muted-foreground">{selectedProject.year}</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{selectedProject.title}</h3>
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
                                {t('modal.overview')}
                            </button>
                            <button
                                onClick={() => setActiveTab('process')}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'process' 
                                        ? 'border-primary text-primary' 
                                        : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {t('modal.behindTheScenes')}
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="overflow-y-auto p-6 sm:p-10 bg-background/50">
                            {activeTab === 'overview' ? (
                                <div className="space-y-10 animate-in fade-in duration-300">
                                    <div>
                                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <Layers size={20} className="text-primary" />
                                            {t('modal.summary')}
                                        </h4>
                                        <p className="text-muted-foreground leading-loose">
                                            {tData(`${selectedProject.id}.fullDescription`)}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <CheckCircle2 size={20} className="text-primary" />
                                            {t('modal.keyFeatures')}
                                        </h4>
                                        <ul className="grid sm:grid-cols-2 gap-4">
                                            {['f1', 'f2', 'f3', 'f4'].map((key, idx) => {
                                                try {
                                                    const feature = tData(`${selectedProject.id}.keyFeatures.${key}`);
                                                    // next-intl might return the key if translation is missing, check usually needed or just map existing keys from data
                                                    // Since I structured keys as f1, f2..., I can try to fetch them.
                                                    // Better approach: get the object and iterate keys?
                                                    // tData.raw(`${selectedProject.id}.keyFeatures`) returns object if I configured it?
                                                    // For now, I hardcoded f1-f3/f4 in json.
                                                    if (feature.includes(`${selectedProject.id}.keyFeatures`)) return null; // rudimentary check if missing
                                                    return (
                                                        <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm bg-card p-3 rounded-lg border border-border">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                            <span className="leading-relaxed">{feature}</span>
                                                        </li>
                                                    )
                                                } catch { return null }
                                            })}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <Lightbulb size={20} className="text-primary" />
                                            {t('modal.techStack')}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map((tech) => (
                                                <span 
                                                    key={tech}
                                                    className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg border border-border"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-10 animate-in fade-in duration-300">
                                    <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
                                        <h4 className="text-lg font-bold mb-3 text-red-500">{t('modal.challenge')}</h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tData(`${selectedProject.id}.process.challenge`)}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl">
                                        <h4 className="text-lg font-bold mb-3 text-blue-500">{t('modal.solution')}</h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tData(`${selectedProject.id}.process.solution`)}
                                        </p>
                                    </div>

                                    <div className="bg-green-500/5 border border-green-500/20 p-6 rounded-2xl">
                                        <h4 className="text-lg font-bold mb-3 text-green-500">{t('modal.outcome')}</h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tData(`${selectedProject.id}.process.outcome`)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-border bg-muted/30 flex gap-4 shrink-0">
                            <a 
                                href={selectedProject.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-card border border-border rounded-xl font-bold hover:bg-accent transition-colors text-foreground shadow-sm"
                            >
                                <Github size={20} />
                                <span>{t('modal.viewSource')}</span>
                            </a>
                            {selectedProject.demo !== "#" && (
                                <a 
                                    href={selectedProject.demo} 
                                    target={selectedProject.demo.startsWith('#') || selectedProject.demo.startsWith('/') ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-sm hover:shadow-md hover:shadow-primary/20"
                                >
                                    <ExternalLink size={20} />
                                    <span>{t('modal.liveDemo')}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}