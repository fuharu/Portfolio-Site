'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
}

export default function GenieGPT() {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // メッセージが追加されたときに自動スクロール
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            role: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage('')
        setIsLoading(true)

        try {
            console.log('API呼び出し開始:', userMessage.content)

            // フルURLを使用してAPIを呼び出し
            const baseUrl = window.location.origin
            const apiUrl = `${baseUrl}/api/chat`

            console.log('API URL:', apiUrl)

            // Dify APIの呼び出し
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversation_id: null // 新規会話
                }),
                // タイムアウトを設定
                signal: AbortSignal.timeout(30000) // 30秒でタイムアウト
            })

            console.log('API レスポンス status:', response.status)

            if (!response.ok) {
                let errorData
                try {
                    errorData = await response.json()
                } catch {
                    errorData = { error: `HTTP ${response.status}: ${response.statusText}` }
                }
                console.error('API呼び出しエラー:', errorData)
                throw new Error(errorData.error || `API呼び出しに失敗しました: ${response.status}`)
            }

            const data = await response.json()
            console.log('API レスポンス data:', data)

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.answer || '申し訳ございません。回答を生成できませんでした。',
                role: 'assistant',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('チャットエラー:', error)

            let errorMessage = '申し訳ございません。エラーが発生しました。'

            if (error instanceof Error) {
                if (error.name === 'TimeoutError') {
                    errorMessage = 'タイムアウトしました。しばらくしてから再度お試しください。'
                } else if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'サーバーに接続できません。開発サーバーが起動しているか確認してください。'
                } else {
                    errorMessage = `エラー: ${error.message}`
                }
            }

            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                content: errorMessage,
                role: 'assistant',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMsg])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const suggestedQuestions = [
        "このウェブサイトがどのように作られたか気になりますか?",
        "私のプロフィールやキャリアに興味がありますか?",
        "私とつながりたいですか?",
        "次に何をすればいいか迷っていますか?"
    ]

    return (
        <div className="min-h-screen text-white pt-16">
            {/* ヘッダー */}
            <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">H</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Haru-AI</h1>
                            <p className="text-sm text-gray-400">Dify RAG & Gemini 2.5 flashで構築されたAIチャットボット</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-white transition-colors" title="ダウンロード/エクスポート">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors" title="共有リンクの作成">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                        </button>
                        <button
                            className="text-gray-400 hover:text-white transition-colors"
                            title="会話履歴の削除"
                            onClick={() => setMessages([])}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex">
                {/* 左パネル */}
                <div className="w-1/2 bg-black/10 backdrop-blur-sm p-8 flex flex-col justify-center">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-4xl font-bold mb-4">
                            フルスタックウェブ開発
                            <br />
                            が好きなウェブエンジニア
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            こんにちは。私は藤本悠杜です。フルスタックウェブエンジニアとして、最近TypeScriptベースのフルスタック開発、AWS、AIベースのウェブサービスアーキテクチャの設計と開発を学んでいます。
                        </p>
                        <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 flex items-start space-x-3">
                            <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-white text-sm">
                                Haru-AIにメッセージを送ると、本サイトの利用規約に同意したものとみなされます
                            </p>
                        </div>
                    </div>
                </div>

                {/* 右パネル */}
                <div className="w-1/2 bg-black/10 backdrop-blur-sm border-l border-white/10 p-8 flex flex-col">
                    <div className="max-w-md mx-auto w-full flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Haru-AIに自由に質問してください。
                        </h3>
                        <p className="text-gray-400 mb-8">何を知りたいですか?</p>

                        {messages.length === 0 ? (
                            <>
                                <div className="text-sm text-gray-400 mb-4 font-medium">提案質問</div>
                                <div className="space-y-4 flex-1">
                                    {suggestedQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInputMessage(question)}
                                            className="w-full text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-between group backdrop-blur-sm"
                                        >
                                            <span className="text-white">{question}</span>
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-sm text-gray-400 mb-4 font-medium">チャット履歴</div>
                                <div className="flex-1 flex flex-col justify-end">
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white/10 text-white backdrop-blur-sm'
                                                        }`}
                                                >
                                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                                                        }`}>
                                                        {message.timestamp.toLocaleTimeString('ja-JP', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-white/10 text-white p-3 rounded-lg backdrop-blur-sm">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* 入力バー */}
            <div className="fixed bottom-0 right-0 w-1/2 bg-black/20 backdrop-blur-md border-t border-white/10 p-4">
                <div className="max-w-md mx-auto flex items-center space-x-4">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="ここにメッセージを入力してください"
                        className="flex-1 bg-white/10 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
