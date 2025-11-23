'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageSquare, Send, X, RefreshCw, User, Bot, GripHorizontal } from 'lucide-react'
import { useAIChat } from '@/contexts/AIChatContext'

interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
}

export default function AIChat() {
    const { isOpen, viewMode, toggleChat, closeChat } = useAIChat()
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: 'こんにちは！藤本悠杜（ふじもと はると）について、経歴やスキル、プロジェクトなど、何でも聞いてください。',
            role: 'assistant',
            timestamp: new Date()
        }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // ポップアップのサイズ状態
    const [popupSize, setPopupSize] = useState({ width: 384, height: 500 }) // w-96 = 384px
    const isResizingRef = useRef(false)
    const lastMousePosRef = useRef({ x: 0, y: 0 })
    const startSizeRef = useRef({ width: 0, height: 0 })

    // メッセージが追加されたときに自動スクロール
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // チャットが開いたときにフォーカス
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 300)
        }
    }, [isOpen])

    // リサイズ処理
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizingRef.current) return

            const deltaX = lastMousePosRef.current.x - e.clientX
            const deltaY = lastMousePosRef.current.y - e.clientY

            setPopupSize({
                width: Math.max(300, Math.min(800, startSizeRef.current.width + deltaX)),
                height: Math.max(400, Math.min(800, startSizeRef.current.height + deltaY))
            })
        }

        const handleMouseUp = () => {
            isResizingRef.current = false
            document.body.style.cursor = 'default'
            document.body.style.userSelect = 'auto'
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault()
        isResizingRef.current = true
        lastMousePosRef.current = { x: e.clientX, y: e.clientY }
        startSizeRef.current = { width: popupSize.width, height: popupSize.height }
        document.body.style.cursor = 'nwse-resize'
        document.body.style.userSelect = 'none'
    }

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
            const baseUrl = window.location.origin
            const apiUrl = `${baseUrl}/api/chat`

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversation_id: null
                }),
                signal: AbortSignal.timeout(30000)
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || `HTTP ${response.status}`)
            }

            const data = await response.json()

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.answer || '申し訳ございません。回答を生成できませんでした。',
                role: 'assistant',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('チャットエラー:', error)
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                content: '申し訳ございません。エラーが発生しました。しばらくしてから再度お試しください。',
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

    const clearChat = () => {
        setMessages([
            {
                id: '1',
                content: 'こんにちは！藤本悠杜（ふじもと はると）について、経歴やスキル、プロジェクトなど、何でも聞いてください。',
                role: 'assistant',
                timestamp: new Date()
            }
        ])
    }

    const suggestedQuestions = [
        "経歴について教えて",
        "どのようなスキルを持っていますか？",
        "制作したプロジェクトは？",
    ]

    return (
        <>
            {/* フローティングボタン (ドロワーモードで開いているときは非表示) */}
            {!(isOpen && viewMode === 'drawer') && (
                <button
                    onClick={() => toggleChat('popup')}
                    className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${isOpen && viewMode === 'popup' ? 'rotate-90' : ''}`}
                    aria-label="AIチャットを開く"
                >
                    {isOpen && viewMode === 'popup' ? <X size={24} /> : <MessageSquare size={24} />}
                </button>
            )}

            {/* ドロワーモード時のオーバーレイ */}
            {isOpen && viewMode === 'drawer' && (
                <div
                    className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={closeChat}
                />
            )}

            {/* チャットコンテナ */}
            <div 
                className={`fixed z-40 bg-card border border-border shadow-2xl flex flex-col transition-all duration-300 ease-out origin-bottom-right ${
                    viewMode === 'drawer'
                        ? `top-0 right-0 h-full w-[400px] max-w-full border-l ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
                        : `bottom-24 right-6 rounded-2xl ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`
                }`}
                style={viewMode === 'popup' ? { 
                    width: popupSize.width, 
                    height: popupSize.height,
                    transitionProperty: isResizingRef.current ? 'none' : 'all' // リサイズ中はトランジションを無効化
                } : {}}
            >
                {/* リサイズハンドル (Popupモードのみ) */}
                {viewMode === 'popup' && (
                    <div 
                        className="absolute top-0 left-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize flex items-center justify-center z-50 opacity-0 hover:opacity-100 transition-opacity group"
                        onMouseDown={handleResizeStart}
                    >
                        <div className="w-4 h-4 bg-primary rounded-full shadow-md border-2 border-background" />
                    </div>
                )}

                {/* ヘッダー */}
                <div 
                    className={`bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0 ${viewMode === 'popup' ? 'rounded-t-2xl cursor-move' : ''} select-none`}
                    // 将来的にドラッグ移動も実装できるように cursor-move を付与しておく（今回はリサイズのみ）
                >
                    <div className="flex items-center space-x-3">
                        {/* リサイズヒントアイコン（左上） */}
                        {viewMode === 'popup' && (
                            <div 
                                className="absolute top-2 left-2 text-primary-foreground/20 hover:text-primary-foreground/50 cursor-nwse-resize transition-colors"
                                onMouseDown={handleResizeStart}
                                title="ドラッグしてリサイズ"
                            >
                                <GripHorizontal size={16} className="rotate-45" />
                            </div>
                        )}

                        <div className={`p-2 bg-primary-foreground/10 rounded-full ${viewMode === 'popup' ? 'ml-4' : ''}`}>
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm tracking-wide">AI Assistant</h3>
                            <p className="text-[10px] opacity-80 uppercase tracking-wider">Powered by Dify</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={clearChat}
                            className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                            title="会話をリセット"
                        >
                            <RefreshCw size={16} />
                        </button>
                        {viewMode === 'drawer' && (
                            <button
                                onClick={closeChat}
                                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                                title="閉じる"
                            >
                                <X size={24} />
                            </button>
                        )}
                    </div>
                </div>

                {/* メッセージエリア */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/30">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div
                                    className={`p-3 rounded-2xl text-sm leading-relaxed ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-br-none'
                                        : 'bg-card border border-border text-card-foreground rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-end gap-2">
                                <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-card border border-border p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* 提案された質問 */}
                {messages.length === 1 && (
                    <div className="px-4 pb-4 bg-muted/30">
                        <p className="text-xs text-muted-foreground mb-2 px-1 font-medium">おすすめの質問</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestedQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => setInputMessage(question)}
                                    className="text-xs bg-card hover:bg-accent text-card-foreground border border-border px-3 py-1.5 rounded-full transition-colors shadow-sm"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 入力エリア */}
                <div className={`p-4 bg-card border-t border-border shrink-0 ${viewMode === 'popup' ? 'rounded-b-2xl' : ''}`}>
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="メッセージを入力..."
                            className="flex-1 px-4 py-2.5 bg-muted/50 border-transparent focus:bg-card focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl text-sm transition-all outline-none placeholder:text-muted-foreground"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputMessage.trim() || isLoading}
                            className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}