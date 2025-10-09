import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { message, conversation_id } = await request.json()

        if (!message) {
            return NextResponse.json(
                { error: 'メッセージが提供されていません' },
                { status: 400 }
            )
        }

        // Dify APIの設定
        const DIFY_API_URL = process.env.DIFY_API_URL || 'https://api.dify.ai/v1/chat-messages'
        const DIFY_API_KEY = process.env.DIFY_API_KEY

        if (!DIFY_API_KEY) {
            console.error('DIFY_API_KEYが設定されていません')
            return NextResponse.json(
                { error: 'API設定エラー' },
                { status: 500 }
            )
        }

        // Dify APIにリクエストを送信
        const response = await fetch(DIFY_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: {},
                query: message,
                response_mode: 'blocking',
                conversation_id: conversation_id,
                user: 'portfolio-visitor'
            })
        })

        if (!response.ok) {
            console.error('Dify API error:', response.status, response.statusText)
            return NextResponse.json(
                { error: 'AIサービスが利用できません' },
                { status: 500 }
            )
        }

        const data = await response.json()

        return NextResponse.json({
            answer: data.answer,
            conversation_id: data.conversation_id,
            message_id: data.message_id
        })

    } catch (error) {
        console.error('チャットAPIエラー:', error)
        return NextResponse.json(
            { error: 'サーバーエラーが発生しました' },
            { status: 500 }
        )
    }
}
