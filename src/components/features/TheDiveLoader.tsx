'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface TheDiveLoaderProps {
    onComplete: () => void
}

export default function TheDiveLoader({ onComplete }: TheDiveLoaderProps) {
    const [depth, setDepth] = useState(0)
    const [loadingText, setLoadingText] = useState('潜降準備中...')
    const containerRef = useRef<HTMLDivElement>(null)
    const depthMeterRef = useRef<HTMLDivElement>(null)
    const depthTextRef = useRef<HTMLDivElement>(null)
    const bubblesRef = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<HTMLDivElement>(null)
    const jellyfishContainerRef = useRef<HTMLDivElement>(null)
    const giantCreatureRef = useRef<HTMLDivElement>(null)
    const dropletRef = useRef<HTMLDivElement>(null)
    const rippleRef = useRef<HTMLDivElement>(null)
    const causticRef = useRef<HTMLDivElement>(null)
    const revealRippleRef = useRef<HTMLDivElement>(null)
    const particleContainerRef = useRef<HTMLDivElement>(null)
    const splashRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const timeline = gsap.timeline({
            onComplete: () => {
                // アニメーション完了後に少し待ってから親に通知
                setTimeout(onComplete, 500)
            }
        })

        // Part 1: 潜降開始（0% ~ 20%）
        timeline
            // 水面の揺らぎエフェクト
            .to(causticRef.current, {
                opacity: 0.4,
                duration: 1,
                ease: 'power2.inOut'
            })
            // 背景色を明るい水色から深い青紫に変化
            .to(container, {
                background: 'linear-gradient(180deg, #87CEEB 0%, #4682B4 100%)',
                duration: 1.5,
                ease: 'power2.in'
            }, '<')
            // ローディングテキスト更新
            .call(() => setLoadingText('潜降開始...'), undefined, '<')
            // 深度メーターのアニメーション
            .to(depthMeterRef.current, {
                scaleX: 0.2,
                duration: 2,
                ease: 'power2.inOut'
            }, '<')
            // 深度カウントアップ（0 → 20）
            .to({}, {
                duration: 2,
                onUpdate: function () {
                    const progress = this.progress()
                    setDepth(Math.floor(progress * 20))
                }
            }, '<')
            // 泡とパーティクルを生成
            .call(() => {
                createBubbles(15)
                createParticles(30)
            }, undefined, '<')

            // Part 2: 深海への旅（20% ~ 99%）
            .call(() => setLoadingText('深海へ...'), undefined)
            .to(container, {
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)',
                duration: 3,
                ease: 'power1.inOut'
            })
            // 水面揺らぎをフェードアウト
            .to(causticRef.current, {
                opacity: 0,
                duration: 2
            }, '<')
            // 深度メーターの進行
            .to(depthMeterRef.current, {
                scaleX: 0.99,
                duration: 5,
                ease: 'power1.inOut'
            }, '<')
            // 深度カウントアップ（20 → 99）
            .to({}, {
                duration: 5,
                onUpdate: function () {
                    const progress = this.progress()
                    const currentDepth = Math.floor(20 + progress * 79)
                    setDepth(currentDepth)

                    // 深度に応じてテキスト更新
                    if (currentDepth === 50) {
                        setLoadingText('中層域通過中...')
                    } else if (currentDepth === 80) {
                        setLoadingText('深層域へ...')
                    }
                }
            }, '<')
            // より多くの泡とパーティクルを生成
            .call(() => {
                createBubbles(25)
                createParticles(50)
            }, undefined, '<')
            // クラゲを出現させる（改善版）
            .call(() => createEnhancedJellyfish(), undefined, '<+1')
            .call(() => createEnhancedJellyfish(), undefined, '<+1.8')
            .call(() => createEnhancedJellyfish(), undefined, '<+2.5')
            .call(() => createEnhancedJellyfish(), undefined, '<+3.2')
            // 巨大生物の影（70%付近）
            .call(() => createGiantCreature(), undefined, '<+2.5')

            // Part 3: 着底と表示（100%）
            .call(() => setLoadingText('着底...'), undefined)
            // 深度メーターを完全に
            .to(depthMeterRef.current, {
                scaleX: 1,
                duration: 0.5,
                ease: 'power2.inOut'
            })
            // 最終的に100%へ
            .to({}, {
                duration: 0.5,
                onUpdate: function () {
                    setDepth(100)
                }
            }, '<')
            // 【改善1】一瞬の静寂と輝き
            .to(depthTextRef.current, {
                scale: 1.1,
                filter: 'brightness(1.5)',
                duration: 0.2
            })
            .to(depthTextRef.current, {
                scale: 1,
                filter: 'brightness(1)',
                duration: 0.2
            })
            // 【改善1】「100%」が粒子に分解される
            .call(() => {
                const depthElement = depthTextRef.current?.querySelector('.text-7xl')
                if (depthElement && particleContainerRef.current) {
                    const rect = depthElement.getBoundingClientRect()
                    const centerX = rect.left + rect.width / 2
                    const centerY = rect.top + rect.height / 2

                    // 50個の光の粒子を生成
                    for (let i = 0; i < 50; i++) {
                        const particle = document.createElement('div')
                        particle.className = 'number-particle'

                        const size = 2 + Math.random() * 4
                        const angle = (Math.PI * 2 * i) / 50 + Math.random() * 0.5
                        const distance = 30 + Math.random() * 80

                        particle.style.cssText = `
                            position: fixed;
                            width: ${size}px;
                            height: ${size}px;
                            background: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(100, 200, 255, 0.8));
                            border-radius: 50%;
                            left: ${centerX}px;
                            top: ${centerY}px;
                            box-shadow: 0 0 ${size * 3}px rgba(255, 255, 255, 0.8);
                            pointer-events: none;
                            z-index: 100;
                        `

                        particleContainerRef.current.appendChild(particle)

                        // アニメーション：爆発して中心に収束
                        const tl = gsap.timeline()
                        tl.to(particle, {
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        })
                            .to(particle, {
                                x: window.innerWidth / 2 - centerX,
                                y: window.innerHeight / 2 - centerY,
                                opacity: 0.8,
                                duration: 0.5,
                                ease: 'power2.inOut'
                            })
                            .to(particle, {
                                opacity: 0,
                                duration: 0.1,
                                onComplete: () => particle.remove()
                            })
                    }
                }
            })
            // メーター全体を光の点に収束
            .to([depthTextRef.current, depthMeterRef.current], {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in'
            }, '<')
            // 【改善1】粒子がしずくに変形（0.6秒待機後）
            .call(() => {
                if (dropletRef.current) {
                    dropletRef.current.style.display = 'block'

                    // 【改善1】粒子の収束から滑らかにしずく形成
                    const tl = gsap.timeline()
                    tl.fromTo(dropletRef.current,
                        {
                            scale: 0.3,
                            filter: 'brightness(3) blur(15px)',
                            opacity: 0.6
                        },
                        {
                            scale: 1.2,
                            filter: 'brightness(2) blur(2px)',
                            opacity: 1,
                            duration: 0.4,
                            ease: 'power2.out'
                        }
                    )
                        // しずくの形が整う
                        .to(dropletRef.current, {
                            scale: 1,
                            filter: 'brightness(1.8) blur(0px)',
                            duration: 0.2,
                            ease: 'power1.out'
                        })
                        // 【改善2】一瞬の静止（重力を感じさせる）
                        .to({}, { duration: 0.1 })
                        // 【改善2】重力で落下開始（ティアドロップ形に変形）
                        .to(dropletRef.current, {
                            y: 160,
                            scaleY: 1.3,  // 縦に伸びる
                            scaleX: 0.9,  // 横に縮む
                            duration: 0.45,
                            ease: 'power2.in'  // だんだん速くなる
                        })
                        // 【改善3】着水の瞬間：潰れる
                        .to(dropletRef.current, {
                            scaleY: 0.4,
                            scaleX: 1.6,
                            duration: 0.08,
                            ease: 'power1.out'
                        })
                        // 【改善3】反発して少し戻る
                        .to(dropletRef.current, {
                            scaleY: 0.8,
                            scaleX: 1.1,
                            y: 155,
                            duration: 0.06,
                            ease: 'power1.inOut'
                        })
                        // 水しぶきとして四散
                        .to(dropletRef.current, {
                            scale: 0,
                            opacity: 0,
                            filter: 'brightness(3) blur(25px)',
                            duration: 0.25,
                            ease: 'power2.out'
                        })
                }
            }, undefined, '<+0.9')
            // 【改善3】着水の瞬間：水しぶき（スプラッシュ）
            .call(() => {
                if (splashRef.current && particleContainerRef.current) {
                    // 中心から放射状に水しぶきの粒子を飛ばす
                    for (let i = 0; i < 12; i++) {
                        const splash = document.createElement('div')
                        splash.className = 'water-splash'

                        const size = 3 + Math.random() * 5
                        const angle = (Math.PI * 2 * i) / 12
                        const distance = 40 + Math.random() * 60
                        const upwardForce = -30 - Math.random() * 40 // 上向きの力

                        splash.style.cssText = `
                            position: fixed;
                            width: ${size}px;
                            height: ${size * 1.5}px;
                            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(150, 220, 255, 0.6));
                            border-radius: 50% 50% 50% 0;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%) rotate(${angle * 180 / Math.PI}deg);
                            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.6);
                            pointer-events: none;
                            z-index: 100;
                        `

                        particleContainerRef.current.appendChild(splash)

                        // 飛び散るアニメーション
                        gsap.timeline()
                            .to(splash, {
                                x: Math.cos(angle) * distance,
                                y: Math.sin(angle) * distance + upwardForce,
                                opacity: 0,
                                rotation: angle * 180 / Math.PI + Math.random() * 180,
                                duration: 0.5,
                                ease: 'power2.out',
                                onComplete: () => splash.remove()
                            })
                    }
                }
            }, undefined, '<+1.55')
            // 【改善3】着水の衝撃波（強化版フラッシュ）
            .call(() => {
                if (revealRippleRef.current) {
                    revealRippleRef.current.style.display = 'block'
                    // より強烈な光のフラッシュ
                    gsap.fromTo(revealRippleRef.current,
                        {
                            scale: 0,
                            opacity: 1,
                            filter: 'brightness(3) blur(5px)'
                        },
                        {
                            scale: 0.8,
                            opacity: 0,
                            filter: 'brightness(1) blur(30px)',
                            duration: 0.5,
                            ease: 'power3.out'
                        }
                    )
                }
            }, undefined, '<')
            // 着水点から波紋が広がり、画面を表示（劇的演出）
            .call(() => {
                // ホームページを波紋で表示
                if (container) {
                    // 複数の波紋エフェクト
                    for (let i = 0; i < 5; i++) {
                        const ripple = rippleRef.current?.cloneNode(true) as HTMLElement
                        if (ripple && rippleRef.current?.parentNode) {
                            rippleRef.current.parentNode.appendChild(ripple)
                            gsap.fromTo(ripple,
                                {
                                    scale: 0,
                                    opacity: 0.6 - i * 0.1,
                                    borderWidth: '3px'
                                },
                                {
                                    scale: 60 + i * 15,
                                    opacity: 0,
                                    borderWidth: '1px',
                                    duration: 1.8 + i * 0.2,
                                    ease: 'power2.out',
                                    delay: i * 0.08,
                                    onComplete: () => ripple.remove()
                                }
                            )
                        }
                    }
                }
            }, undefined, '<+0.1')
            // コンテナを波紋のクリップパスで消す（円形に広がって表示）
            .to(container, {
                opacity: 0,
                duration: 1.2,
                ease: 'power2.inOut'
            }, '<+0.3')

        // 泡を生成する関数（改善版：下から上へ昇る）
        function createBubbles(count: number) {
            const bubblesContainer = bubblesRef.current
            if (!bubblesContainer) return

            for (let i = 0; i < count; i++) {
                const bubble = document.createElement('div')
                bubble.className = 'dive-bubble'

                // ランダムな位置とサイズ（パララックス効果用に深度も設定）
                const size = 4 + Math.random() * 18
                const depth = Math.random() // 0-1: 0が手前、1が奥
                const startX = Math.random() * 100
                const endX = startX + (Math.random() - 0.5) * 40 // より大きな横移動
                const startY = window.innerHeight + 50

                bubble.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle at 30% 30%, 
                        rgba(255, 255, 255, ${0.7 - depth * 0.3}), 
                        rgba(255, 255, 255, ${0.2 - depth * 0.1}));
                    border-radius: 50%;
                    top: ${startY}px;
                    left: ${startX}%;
                    opacity: ${0.5 + (1 - depth) * 0.3};
                    filter: blur(${depth * 1.5}px);
                `

                bubblesContainer.appendChild(bubble)

                // パララックス効果：奥の泡はゆっくり、手前の泡は速く
                const duration = 4 + depth * 5 + Math.random() * 3
                const distance = -window.innerHeight - 150

                // GSAPでアニメーション（下から上へ、揺らぎながら）
                const tl = gsap.timeline({
                    onComplete: () => bubble.remove()
                })

                tl.to(bubble, {
                    y: distance,
                    x: `${endX - startX}%`,
                    opacity: 0,
                    duration: duration,
                    ease: 'none'
                })
                    // 横揺れアニメーション（サインカーブ）
                    .to(bubble, {
                        x: `+=${(Math.random() - 0.5) * 30}`,
                        duration: 2 + Math.random() * 2,
                        repeat: Math.ceil(duration / 3),
                        yoyo: true,
                        ease: 'sine.inOut'
                    }, 0)
                    // サイズの微変化（呼吸するように）
                    .to(bubble, {
                        scale: 1 + Math.random() * 0.3,
                        duration: 1.5 + Math.random(),
                        repeat: Math.ceil(duration / 2),
                        yoyo: true,
                        ease: 'sine.inOut'
                    }, 0)
            }
        }

        // クラゲを生成する関数
        function createJellyfish() {
            const container = jellyfishContainerRef.current
            if (!container) return

            const jellyfish = document.createElement('div')
            jellyfish.className = 'jellyfish'

            const size = 40 + Math.random() * 60
            const startX = Math.random() > 0.5 ? -100 : window.innerWidth + 100
            const endX = Math.random() > 0.5 ? window.innerWidth + 100 : -100
            const y = 20 + Math.random() * 60

            jellyfish.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${startX}px;
        top: ${y}%;
        opacity: 0;
      `

            jellyfish.innerHTML = `
        <div class="jellyfish-body">
          <div class="jellyfish-glow"></div>
        </div>
        <div class="jellyfish-tentacles"></div>
      `

            container.appendChild(jellyfish)

            // アニメーション
            const tl = gsap.timeline({
                onComplete: () => jellyfish.remove()
            })

            tl.to(jellyfish, {
                x: endX - startX,
                y: '+=50',
                opacity: 0.6,
                duration: 8,
                ease: 'none'
            })
                .to(jellyfish, {
                    y: '+=30',
                    duration: 2,
                    repeat: 3,
                    yoyo: true,
                    ease: 'sine.inOut'
                }, 0)
        }

        // パーティクルを生成する関数（改善版）
        function createParticles(count: number) {
            const particlesContainer = particlesRef.current
            if (!particlesContainer) return

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div')
                particle.className = 'dive-particle'

                const size = 1 + Math.random() * 3
                const startX = Math.random() * 100
                const startY = Math.random() * 100
                const drift = (Math.random() - 0.5) * 50

                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, ${0.3 + Math.random() * 0.5});
                    border-radius: 50%;
                    left: ${startX}%;
                    top: ${startY}%;
                    box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.5);
                `

                particlesContainer.appendChild(particle)

                // ゆらゆらと漂うアニメーション
                gsap.to(particle, {
                    x: drift,
                    y: drift * 0.5,
                    opacity: 0,
                    duration: 4 + Math.random() * 3,
                    ease: 'sine.inOut',
                    onComplete: () => particle.remove()
                })
            }
        }

        // 強化版クラゲを生成する関数
        function createEnhancedJellyfish() {
            const container = jellyfishContainerRef.current
            if (!container) return

            const jellyfish = document.createElement('div')
            jellyfish.className = 'jellyfish-enhanced'

            const size = 50 + Math.random() * 80
            const startX = Math.random() > 0.5 ? -150 : window.innerWidth + 150
            const endX = Math.random() > 0.5 ? window.innerWidth + 150 : -150
            const y = 10 + Math.random() * 70

            jellyfish.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size * 1.2}px;
                left: ${startX}px;
                top: ${y}%;
                opacity: 0;
                filter: drop-shadow(0 0 ${size / 2}px rgba(100, 200, 255, 0.6));
            `

            // 改善されたクラゲのHTML構造
            jellyfish.innerHTML = `
                <div class="jellyfish-enhanced-body">
                    <div class="jellyfish-enhanced-glow"></div>
                    <div class="jellyfish-enhanced-ring"></div>
                </div>
                <div class="jellyfish-enhanced-tentacles">
                    ${Array(5).fill(0).map((_, i) => `
                        <div class="jellyfish-tentacle" style="left: ${20 + i * 15}%; animation-delay: ${i * 0.1}s;"></div>
                    `).join('')}
                </div>
            `

            container.appendChild(jellyfish)

            // 複雑なアニメーション
            const tl = gsap.timeline({
                onComplete: () => jellyfish.remove()
            })

            tl.to(jellyfish, {
                x: endX - startX,
                y: '+=80',
                opacity: 0.7,
                duration: 10 + Math.random() * 4,
                ease: 'none'
            })
                .to(jellyfish, {
                    y: '+=40',
                    duration: 2.5,
                    repeat: 3,
                    yoyo: true,
                    ease: 'sine.inOut'
                }, 0)
                // 発光効果の脈動
                .to(jellyfish.querySelector('.jellyfish-enhanced-glow'), {
                    opacity: 1,
                    scale: 1.2,
                    duration: 1.5,
                    repeat: 6,
                    yoyo: true,
                    ease: 'sine.inOut'
                }, 0)
        }

        // 巨大生物の影を生成する関数
        function createGiantCreature() {
            const creature = giantCreatureRef.current
            if (!creature) return

            creature.style.display = 'block'

            gsap.fromTo(creature,
                {
                    x: -500,
                    opacity: 0
                },
                {
                    x: window.innerWidth + 500,
                    opacity: 0.3,
                    duration: 6,
                    ease: 'none',
                    onComplete: () => {
                        creature.style.display = 'none'
                    }
                }
            )
        }

        return () => {
            timeline.kill()
        }
    }, [onComplete])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #E0F7FF 0%, #87CEEB 100%)',
                clipPath: 'circle(100% at 50% 50%)'
            }}
        >
            {/* 太陽光の効果 */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

            {/* 水面の揺らぎエフェクト（コースティクス） */}
            <div
                ref={causticRef}
                className="absolute inset-0 pointer-events-none opacity-0"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                        radial-gradient(ellipse at 60% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
                    `,
                    animation: 'caustic-shimmer 8s ease-in-out infinite'
                }}
            />

            {/* 泡コンテナ */}
            <div ref={bubblesRef} className="absolute inset-0 pointer-events-none" />

            {/* パーティクルコンテナ */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

            {/* クラゲコンテナ */}
            <div ref={jellyfishContainerRef} className="absolute inset-0 pointer-events-none" />

            {/* 巨大生物の影 */}
            <div
                ref={giantCreatureRef}
                className="absolute top-1/4 pointer-events-none hidden"
                style={{
                    width: '300px',
                    height: '150px',
                    filter: 'blur(20px)'
                }}
            >
                <svg viewBox="0 0 300 150" className="w-full h-full opacity-20">
                    {/* クジラのような形 */}
                    <ellipse cx="150" cy="75" rx="140" ry="60" fill="currentColor" className="text-black" />
                    <path d="M 10 75 Q 5 65, 0 75 Q 5 85, 10 75" fill="currentColor" className="text-black" />
                </svg>
            </div>

            {/* 改善された深度表示 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div ref={depthTextRef} className="text-center">
                    {/* ローディングテキスト */}
                    <div className="text-white/60 text-sm mb-6 tracking-widest uppercase">{loadingText}</div>

                    {/* 深度メーター */}
                    <div className="mb-4">
                        <div className="text-white/80 text-base mb-3 font-light tracking-wide">DEPTH</div>
                        <div className="relative w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto mb-2">
                            <div
                                ref={depthMeterRef}
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full origin-left"
                                style={{
                                    width: '100%',
                                    transform: 'scaleX(0)',
                                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                                }}
                            />
                        </div>
                    </div>

                    {/* 深度数値 */}
                    <div className="text-white text-7xl font-bold tracking-tight" style={{
                        textShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(100, 200, 255, 0.3)'
                    }}>
                        {depth}<span className="text-4xl text-white/60 ml-2">m</span>
                    </div>
                </div>
            </div>

            {/* 改善されたしずく */}
            <div
                ref={dropletRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden"
                style={{
                    width: '24px',
                    height: '24px',
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(150, 220, 255, 0.7))',
                    borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(-45deg)',
                    boxShadow: '0 0 20px rgba(100, 200, 255, 0.8), inset -2px -2px 4px rgba(255, 255, 255, 0.5)'
                }}
            />

            {/* 波紋 */}
            <div
                ref={rippleRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255, 255, 255, 0.6)',
                    borderRadius: '50%',
                    opacity: 0,
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)'
                }}
            />

            {/* 着水時の衝撃波（フラッシュ） */}
            <div
                ref={revealRippleRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden"
                style={{
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(100, 200, 255, 0.5) 30%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: 0,
                    filter: 'blur(10px)',
                    boxShadow: '0 0 80px rgba(255, 255, 255, 0.8), 0 0 120px rgba(100, 200, 255, 0.6)'
                }}
            />

            {/* 粒子分解・水しぶき用コンテナ */}
            <div
                ref={particleContainerRef}
                className="fixed inset-0 pointer-events-none"
                style={{ zIndex: 100 }}
            />

            {/* スプラッシュエフェクト用（予約） */}
            <div
                ref={splashRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden"
            />
        </div>
    )
}

