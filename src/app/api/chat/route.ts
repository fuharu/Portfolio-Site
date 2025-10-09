import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        console.log('チャットAPIが呼び出されました')

        const { message, conversation_id } = await request.json()
        console.log('受信したメッセージ:', message)

        if (!message) {
            console.error('メッセージが提供されていません')
            return NextResponse.json(
                { error: 'メッセージが提供されていません' },
                { status: 400 }
            )
        }

        // Dify APIの設定
        const DIFY_API_URL = process.env.DIFY_API_URL || 'https://api.dify.ai/v1/chat-messages'
        const DIFY_API_KEY = process.env.DIFY_API_KEY

        console.log('DIFY_API_URL:', DIFY_API_URL)
        console.log('DIFY_API_KEY exists:', !!DIFY_API_KEY)
        console.log('DIFY_API_KEY (first 10 chars):', DIFY_API_KEY ? DIFY_API_KEY.substring(0, 10) + '...' : 'undefined')

        if (!DIFY_API_KEY) {
            console.error('DIFY_API_KEYが設定されていません')
            return NextResponse.json(
                { error: 'API設定エラー: APIキーが設定されていません' },
                { status: 500 }
            )
        }

        const requestBody = {
            inputs: {},
            query: message,
            response_mode: 'blocking',
            conversation_id: conversation_id || null,
            user: 'portfolio-visitor'
        }

        console.log('Dify APIに送信するリクエスト:', JSON.stringify(requestBody, null, 2))

        // Dify APIにリクエストを送信
        const response = await fetch(DIFY_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })

        console.log('Dify API レスポンス status:', response.status)
        console.log('Dify API レスポンス headers:', Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Dify API error:', response.status, response.statusText, errorText)
            return NextResponse.json(
                { error: `AIサービスが利用できません: ${response.status} ${response.statusText}` },
                { status: 500 }
            )
        }

        const data = await response.json()
        console.log('Dify API レスポンス data:', data)

        return NextResponse.json({
            answer: data.answer || data.data?.answer || '申し訳ございません。回答を生成できませんでした。',
            conversation_id: data.conversation_id || data.data?.conversation_id,
            message_id: data.message_id || data.data?.message_id
        })

    } catch (error) {
        console.error('チャットAPIエラー:', error)
        return NextResponse.json(
            { error: `サーバーエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}
