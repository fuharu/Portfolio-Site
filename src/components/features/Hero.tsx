'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Hero() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const [underlineWidth, setUnderlineWidth] = useState(100)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(-1)  // 0 → -1 に変更
    const deleteIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const textVariations = useCallback(() => [
        "フルスタック開発",
        "チーム開発",
        "ユーザー体験",
        "問題解決",
        "新しい技術",
        "プロダクト開発"
    ], [])

    //タイピングアニメーション
    useEffect(() => {
        const texts = textVariations()
        const currentText = texts[currentTextIndex]
        let index = 0

        setDisplayedText("")
        setUnderlineWidth(0) // 下線を0からスタート
        setIsDeleting(false) // 新しいタイピング開始時は削除状態を解除
        setDeleteIndex(-1) // deleteIndexもリセット

        const typeInterval = setInterval(() => {
            if (index < currentText.length) {
                setDisplayedText(currentText.slice(0, index + 1))
                // タイピング中も下線の幅を更新
                setUnderlineWidth(((index + 1) / currentText.length) * 100)
                index++
            } else {
                clearInterval(typeInterval)
                // 最後の文字が表示された瞬間に削除開始（待機なし）
                setTimeout(() => {
                    setIsDeleting(true)
                }, 0)
            }
        }, 100)  // 150ms → 100ms（速く）
        return () => clearInterval(typeInterval)
    }, [currentTextIndex, textVariations])

    //削除アニメーション（下線→文字の順）
    useEffect(() => {
        if (isDeleting) {
            const texts = textVariations()
            const currentText = texts[currentTextIndex]
            const textDeleteSpeed = 100  // 文字削除速度（150ms → 100ms）
            const underlineDeleteSpeed = 200  // 下線削除速度（少し遅く）

            // ステップ1: 下線を一定速度で削除（CSSのtransitionを利用）
            setUnderlineWidth(0)  // CSSのtransitionで滑らかに0%へ

            // 下線削除の時間（currentText.length * 200ms）の直後に文字削除開始
            const underlineDuration = currentText.length * underlineDeleteSpeed
            const textDeleteTimer = setTimeout(() => {
                let charIndex = currentText.length

                deleteIntervalRef.current = setInterval(() => {
                    charIndex--
                    if (charIndex >= 0) {
                        setDisplayedText(currentText.slice(0, charIndex))
                        setDeleteIndex(charIndex)
                    }

                    if (charIndex <= 0) {
                        if (deleteIntervalRef.current) {
                            clearInterval(deleteIntervalRef.current)
                        }
                        setDeleteIndex(0)
                    }
                }, textDeleteSpeed) // 文字削除速度（100ms）
            }, underlineDuration) // 下線削除完了の瞬間

            return () => {
                clearTimeout(textDeleteTimer)
                if (deleteIntervalRef.current) {
                    clearInterval(deleteIntervalRef.current)
                }
            }
        }
    }, [isDeleting, currentTextIndex, textVariations])

    //削除完了後の処理
    useEffect(() => {
        if (deleteIndex === 0 && isDeleting) {
            if (deleteIntervalRef.current) {
                clearInterval(deleteIntervalRef.current)
                deleteIntervalRef.current = null
            }
            // 文字削除完了後、少し待ってから次のテキストへ
            setTimeout(() => {
                const texts = textVariations()
                setIsDeleting(false)
                // setIsDeleting(false)の後に状態が更新されるまで少し待つ
                setTimeout(() => {
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length)
                }, 50)
            }, 500)
        }
    }, [deleteIndex, isDeleting, textVariations])

    //カーソルの点滅
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 500)

        return () => clearInterval(cursorInterval)
    }, [])



    return (
        <section id="home" className="min-h-screen flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* メインタイトル */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        藤本 悠杜
                        <span className="text-blue-600 block mt-2">
                            <span className="relative inline-block leading-tight">
                                {displayedText}
                                <span
                                    className={`inline-block w-1 bg-blue-600 ml-1 transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
                                    style={{ height: '1em' }}
                                >
                                </span>
                                <span className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all"
                                    style={{
                                        width: `${underlineWidth}%`,
                                        transitionDuration: isDeleting
                                            ? `${displayedText.length * 200}ms`  // 文字数 × 200ms（遅く）
                                            : '100ms'  // タイピング中は100ms（速く）
                                    }}>
                                </span>
                            </span>
                            が好きなエンジニア
                        </span>
                    </h1>

                    {/* サブタイトル */}
                    <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                        チーム開発を通じて、ユーザー視点を重視したプロダクト開発を学んでいます。
                        大学生活で培った技術力を、ビジネス価値の創造に活かしたいです。
                    </p>

                    {/* CTAボタン */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/projects"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            プロジェクトを見る
                        </a>
                        <a
                            href="/contact"
                            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            お問い合わせ
                        </a>
                    </div>
                    {/* 追加要素 */}
                    <div className="mt-12 text-sm text-white">
                        <p>茨城大学工学部情報工学科 3年生</p>
                    </div>
                </div>
            </div>
        </section>
    )
}