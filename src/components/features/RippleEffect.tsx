'use client'

import { useEffect, useRef } from 'react'

interface RippleEffectProps {
    children: React.ReactNode
}

export default function RippleEffect({ children }: RippleEffectProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement

            // クリック可能な要素を除外
            const clickableElements = [
                'button',
                'a',
                'input',
                'select',
                'textarea',
                '[role="button"]',
                '[onclick]',
                '.cursor-pointer',
                '.clickable'
            ]

            const isClickable = clickableElements.some(selector => {
                if (selector.startsWith('[') && selector.endsWith(']')) {
                    return target.matches(selector)
                }
                return target.tagName.toLowerCase() === selector || target.closest(selector)
            })

            // ナビゲーションやボタンなどのクリック可能要素の場合は波紋を出さない
            if (isClickable) return

            // 親要素がクリック可能な場合も除外
            const clickableParent = target.closest('button, a, [role="button"], [onclick], .cursor-pointer, .clickable')
            if (clickableParent) return

            const rect = container.getBoundingClientRect()

            // 複数の波紋を生成（微妙に異なるサイズと位置）
            const ripples = [
                {
                    className: 'ripple ripple-main',
                    size: 40 + Math.random() * 20, // 40-60px
                    offsetX: (Math.random() - 0.5) * 15, // ±7.5px
                    offsetY: (Math.random() - 0.5) * 15, // ±7.5px
                    delay: 0
                },
                {
                    className: 'ripple ripple-secondary',
                    size: 50 + Math.random() * 25, // 50-75px
                    offsetX: (Math.random() - 0.5) * 20, // ±10px
                    offsetY: (Math.random() - 0.5) * 20, // ±10px
                    delay: 50 + Math.random() * 100 // 50-150ms
                },
                {
                    className: 'ripple ripple-tertiary',
                    size: 30 + Math.random() * 15, // 30-45px
                    offsetX: (Math.random() - 0.5) * 18, // ±9px
                    offsetY: (Math.random() - 0.5) * 18, // ±9px
                    delay: 100 + Math.random() * 150 // 100-250ms
                }
            ]

            ripples.forEach((rippleConfig, index) => {
                setTimeout(() => {
                    const x = event.clientX - rect.left - rippleConfig.size / 2 + rippleConfig.offsetX
                    const y = event.clientY - rect.top - rippleConfig.size / 2 + rippleConfig.offsetY

                    const ripple = document.createElement('span')
                    ripple.className = rippleConfig.className
                    ripple.style.width = `${rippleConfig.size}px`
                    ripple.style.height = `${rippleConfig.size}px`
                    ripple.style.left = `${x}px`
                    ripple.style.top = `${y}px`

                    container.appendChild(ripple)

                    // アニメーション完了後に要素を削除
                    const animationDuration = index === 0 ? 800 : index === 1 ? 1000 : 1200
                    setTimeout(() => {
                        if (ripple.parentNode) {
                            ripple.parentNode.removeChild(ripple)
                        }
                    }, animationDuration)
                }, rippleConfig.delay)
            })
        }

        container.addEventListener('click', handleClick)

        return () => {
            container.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div ref={containerRef} className="ripple-container">
            {children}
        </div>
    )
}
