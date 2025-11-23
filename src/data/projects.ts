export interface Project {
    id: string
    title: string
    technologies: string[]
    github: string
    demo: string
    category: string
    year: string
    featured?: boolean
    image?: string
}

export const projects: Project[] = [
    {
        id: "PortfolioSite",
        title: "Portfolio Site",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Dify API", "GSAP"],
        github: "https://github.com/fuharu/Portfolio-Site",
        demo: "/",
        category: "Personal",
        year: "2025",
        featured: true
    },
    {
        id: "InvestInMe",
        title: "Invest In Me",
        technologies: ["React", "TypeScript", "Node.js", "Recharts"],
        github: "https://github.com/fuharu/invest-in-me",
        demo: "#",
        category: "Personal",
        year: "2025",
        featured: true
    },
    {
        id: "MailDeCalen",
        title: "Mail de Calen",
        technologies: ["FastAPI", "Python", "Gemini API", "Next.js", "Firebase"],
        github: "https://github.com/fuharu/Mail-de-Calen",
        demo: "#",
        category: "Hackathon",
        year: "2025",
        featured: true
    },
    {
        id: "Nazomi",
        title: "Nazomi",
        technologies: ["FastAPI", "Python", "spaCy", "React", "Supabase"],
        github: "https://github.com/sho-nagisa/nazomi",
        demo: "#",
        category: "Hackathon",
        year: "2025",
        featured: false
    },
    {
        id: "StampRallyMap",
        title: "Stamp Rally Map",
        technologies: ["React", "Node.js", "PostgreSQL", "Google Maps API"],
        github: "https://github.com/fuharu/stamp-rally",
        demo: "#",
        category: "University",
        year: "2025",
        featured: false
    }
]