'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function Hero() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const [underlineWidth, setUnderlineWidth] = useState(100)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(0)
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
        setIsDeleting(false)
        const typeInterval = setInterval(() => {
            if (index < currentText.length) {
                setDisplayedText(currentText.slice(0, index + 1))
                index++
            } else {
                clearInterval(typeInterval)
                setUnderlineWidth(100)
                setTimeout(() => {
                    setIsDeleting(true)
                }, 1500) //1.5秒後に削除開始
            }
        }, 150)
        return () => clearInterval(typeInterval)
    }, [currentTextIndex, textVariations])

    //削除アニメーション
    useEffect(() => {
        if (isDeleting) {
            const texts = textVariations()
            const currentText = texts[currentTextIndex]
            setDeleteIndex(currentText.length)
            deleteIntervalRef.current = setInterval(() => {
                setDeleteIndex(prev => {
                    if (prev > 0) {
                        setDisplayedText(currentText.slice(0, prev))
                        setUnderlineWidth(prev / currentText.length * 100)
                        return prev - 1
                    } else {
                        return 0
                    }
                })
            }, 150)
            return () => {
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
            setIsDeleting(false)
            const texts = textVariations()
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
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
                            <span className="relative inline-block">
                                {displayedText}
                                <span className={`inline-block w-0.5 h-8 bg-blue-600 ml-1 transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"
                                    }`}>
                                </span>
                                <span className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300"
                                    style={{ width: `${underlineWidth}%` }}>
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