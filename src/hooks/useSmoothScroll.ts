import { useCallback } from 'react'

export function useSmoothScroll() {
    const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()

        const targetId = href.replace('#', '')
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80 // ナビゲーションバーの高さを考慮
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        }
    }, [])

    return { handleSmoothScroll }
}
