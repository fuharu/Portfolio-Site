'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Trash2, Share2, Download, Info, MessageSquare, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
    const t = useTranslations('AIChat')

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
                throw new Error(`HTTP ${response.status}`)
            }

            const data = await response.json()

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.answer || t('errorAnswer'),
                role: 'assistant',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('チャットエラー:', error)
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                content: t('error'),
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
        t('suggested.q1'),
        t('suggested.q2'),
        t('suggested.q3'),
        t('suggested.q4')
    ]

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col pt-4">
            {/* Header Panel */}
            <div className="bg-card border-b border-border p-6 rounded-t-xl shadow-sm mb-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md">
                            <span className="font-bold text-lg">AI</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground tracking-tight">{t('title')}</h1>
                            <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors" title="Download">
                            <Download size={20} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors" title="Share">
                            <Share2 size={20} />
                        </button>
                        <button
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                            title="Clear History"
                            onClick={() => setMessages([])}
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
                {/* Left Panel - Info */}
                <div className="w-full lg:w-1/3 bg-card border border-border rounded-xl p-8 flex flex-col justify-center shadow-sm">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight whitespace-pre-line">
                            {t('fullStackDeveloper')}
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                            {t('intro')}
                        </p>

                        <div className="bg-accent/50 border border-accent rounded-lg p-4 flex items-start space-x-3">
                            <Info size={20} className="text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">
                                {t('description')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Chat Interface */}
                <div className="w-full lg:w-2/3 bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm relative overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-20">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col justify-center">
                                    <div className="mb-6">
                                        <MessageSquare size={48} className="text-muted-foreground/20 mb-4" />
                                        <h3 className="text-2xl font-bold text-foreground mb-2">
                                            {t('welcomeTitle')}
                                        </h3>
                                        <p className="text-muted-foreground">{t('welcomeSubtitle')}</p>
                                    </div>
                                    <div className="grid gap-3">
                                        {suggestedQuestions.map((question, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setInputMessage(question)}
                                                className="w-full text-left p-4 bg-muted/30 hover:bg-accent border border-transparent hover:border-border rounded-xl transition-all group flex items-center justify-between"
                                            >
                                                <span className="text-foreground font-medium">{question}</span>
                                                <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] p-4 rounded-2xl ${message.role === 'user'
                                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                                    : 'bg-muted text-foreground rounded-bl-none'
                                                    }`}
                                            >
                                                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                                <p className={`text-[10px] mt-2 text-right opacity-70`}>
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
                                            <div className="bg-muted text-foreground p-4 rounded-2xl rounded-bl-none">
                                                <div className="flex space-x-1.5">
                                                    <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-50"></div>
                                                    <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Input Area - Fixed at bottom within the card for desktop, sticky for mobile */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card via-card to-transparent pt-10">
                        <div className="relative flex items-center shadow-lg rounded-xl bg-background border border-input focus-within:ring-2 focus-within:ring-ring/20 transition-all">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={t('inputPlaceholder')}
                                className="flex-1 bg-transparent px-5 py-4 outline-none text-foreground placeholder:text-muted-foreground"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="p-3 mr-2 text-primary-foreground bg-primary rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}