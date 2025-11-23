'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type ChatMode = 'popup' | 'drawer'

interface AIChatContextType {
    isOpen: boolean
    viewMode: ChatMode
    toggleChat: (mode?: ChatMode) => void
    openChat: (mode?: ChatMode) => void
    closeChat: () => void
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined)

export function AIChatProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [viewMode, setViewMode] = useState<ChatMode>('popup')

    const toggleChat = (mode?: ChatMode) => {
        if (mode && mode !== viewMode) {
            setViewMode(mode)
            setIsOpen(true)
        } else {
            setIsOpen(prev => !prev)
        }
    }

    const openChat = (mode: ChatMode = 'popup') => {
        setViewMode(mode)
        setIsOpen(true)
    }

    const closeChat = () => setIsOpen(false)

    return (
        <AIChatContext.Provider value={{ isOpen, viewMode, toggleChat, openChat, closeChat }}>
            {children}
        </AIChatContext.Provider>
    )
}

export function useAIChat() {
    const context = useContext(AIChatContext)
    if (context === undefined) {
        throw new Error('useAIChat must be used within an AIChatProvider')
    }
    return context
}