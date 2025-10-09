import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        message: 'API is working!',
        timestamp: new Date().toISOString()
    })
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        return NextResponse.json({
            message: 'POST request received',
            data: body,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        return NextResponse.json({
            error: 'Invalid JSON',
            timestamp: new Date().toISOString()
        }, { status: 400 })
    }
}
