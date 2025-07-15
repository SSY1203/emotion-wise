import { NextRequest, NextResponse } from 'next/server'
import { analyzeEmotion } from '@/lib/emotion-analysis'
import { EmotionRecord } from '@/types/emotion'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const emotionRecord: EmotionRecord = body.emotionRecord

    if (!emotionRecord) {
      return NextResponse.json(
        { error: 'emotionRecord is required' },
        { status: 400 }
      )
    }

    // 필수 필드 검증
    if (!emotionRecord.conversation_content || !emotionRecord.emotions || emotionRecord.emotions.length === 0) {
      return NextResponse.json(
        { error: 'conversation_content and emotions are required' },
        { status: 400 }
      )
    }

    // AI 감정 분석 실행
    const analysis = await analyzeEmotion(emotionRecord)

    return NextResponse.json({
      success: true,
      analysis
    })

  } catch (error) {
    console.error('Emotion analysis API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Emotion Analysis API is running',
    endpoints: {
      POST: '/api/analyze-emotion - Analyze emotion record'
    }
  })
}