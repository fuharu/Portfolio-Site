'use client'
import { useState, useEffect } from 'react'
// import Link from 'next/link' // Use Link from navigation for auto locale prefix
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter, Link } from '@/navigation'

export default function Navigation() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const t = useTranslations('Navigation')
    const pathname = usePathname()
    const router = useRouter()
    const currentLocale = useLocale()

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const switchLocale = (newLocale: string) => {
        // With next-intl router, we just push the pathname with the new locale
        router.replace(pathname, {locale: newLocale})
    }

    return (
        <header className="fixed top-0 w-full z-50 glass-nav border-b border-border/50">
            <div className="container-custom flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight z-50 group">
                    <span className="text-foreground group-hover:text-primary transition-colors">Fujimoto</span>
                    <span className="text-muted-foreground">.dev</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{t('home')}</Link>
                    <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{t('about')}</Link>
                    <Link href="/skills" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{t('skills')}</Link>
                    <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{t('projects')}</Link>
                    <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{t('contact')}</Link>
                    
                    <div className="w-px h-4 bg-border mx-2"></div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => switchLocale('ja')}
                            className={`text-xs font-bold px-2 py-1 rounded transition-colors hover:bg-primary/5 ${currentLocale === 'ja' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            JP
                        </button>
                        <span className="text-muted-foreground/30">/</span>
                        <button
                            onClick={() => switchLocale('en')}
                            className={`text-xs font-bold px-2 py-1 rounded transition-colors hover:bg-primary/5 ${currentLocale === 'en' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            EN
                        </button>
                    </div>

                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <div className="flex items-center gap-2 mr-2">
                         <button
                            onClick={() => switchLocale('ja')}
                            className={`text-xs font-bold px-2 py-1 rounded transition-colors ${currentLocale === 'ja' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            JP
                        </button>
                        <span className="text-muted-foreground/30">/</span>
                        <button
                            onClick={() => switchLocale('en')}
                            className={`text-xs font-bold px-2 py-1 rounded transition-colors ${currentLocale === 'en' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            EN
                        </button>
                    </div>
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                    <button 
                        onClick={toggleMenu}
                        className="p-2 text-foreground z-50"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`fixed inset-0 bg-background/95 backdrop-blur-md z-40 transition-all duration-300 md:hidden flex items-center justify-center ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <nav className="flex flex-col items-center gap-8 text-lg">
                    <Link href="/" onClick={toggleMenu} className="font-medium text-foreground hover:text-primary">{t('home')}</Link>
                    <Link href="/about" onClick={toggleMenu} className="font-medium text-foreground hover:text-primary">{t('about')}</Link>
                    <Link href="/skills" onClick={toggleMenu} className="font-medium text-foreground hover:text-primary">{t('skills')}</Link>
                    <Link href="/projects" onClick={toggleMenu} className="font-medium text-foreground hover:text-primary">{t('projects')}</Link>
                    <Link href="/contact" onClick={toggleMenu} className="font-medium text-foreground hover:text-primary">{t('contact')}</Link>
                </nav>
            </div>
        </header>
    )
}