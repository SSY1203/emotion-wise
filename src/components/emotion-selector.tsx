"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmotionType, EmotionState, emotionLabels, emotionColors } from "@/types/emotion"

interface EmotionSelectorProps {
  selectedEmotions: EmotionState[]
  onEmotionChange: (emotions: EmotionState[]) => void
}

export function EmotionSelector({ selectedEmotions, onEmotionChange }: EmotionSelectorProps) {
  const [activeEmotion, setActiveEmotion] = useState<EmotionType | null>(null)

  const handleEmotionSelect = (emotion: EmotionType) => {
    setActiveEmotion(emotion)
    
    // 이미 선택된 감정인지 확인
    const existingIndex = selectedEmotions.findIndex(e => e.type === emotion)
    
    if (existingIndex === -1) {
      // 새로운 감정 추가
      onEmotionChange([...selectedEmotions, { type: emotion, intensity: 5 }])
    }
  }

  const handleIntensityChange = (emotion: EmotionType, intensity: number) => {
    const updatedEmotions = selectedEmotions.map(e => 
      e.type === emotion ? { ...e, intensity } : e
    )
    onEmotionChange(updatedEmotions)
  }

  const handleEmotionRemove = (emotion: EmotionType) => {
    const filteredEmotions = selectedEmotions.filter(e => e.type !== emotion)
    onEmotionChange(filteredEmotions)
    setActiveEmotion(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💭 감정 상태 선택
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 감정 선택 그리드 */}
        <div className="grid grid-cols-4 gap-3">
          {(Object.keys(emotionLabels) as EmotionType[]).map((emotion) => {
            const isSelected = selectedEmotions.some(e => e.type === emotion)
            const selectedEmotion = selectedEmotions.find(e => e.type === emotion)
            
            return (
              <button
                key={emotion}
                onClick={() => handleEmotionSelect(emotion)}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  isSelected 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
                style={{
                  backgroundColor: isSelected 
                    ? `${emotionColors[emotion]}20` 
                    : undefined
                }}
              >
                <div className="text-2xl mb-2">{getEmotionEmoji(emotion)}</div>
                <div className="text-sm font-medium">{emotionLabels[emotion]}</div>
                {selectedEmotion && (
                  <div className="text-xs text-muted-foreground mt-1">
                    강도: {selectedEmotion.intensity}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* 선택된 감정들의 강도 조절 */}
        {selectedEmotions.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm">감정 강도 조절</h4>
            {selectedEmotions.map((emotionState) => (
              <div key={emotionState.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {getEmotionEmoji(emotionState.type)} {emotionLabels[emotionState.type]}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEmotionRemove(emotionState.type)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    ✕
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">약함</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={emotionState.intensity}
                    onChange={(e) => handleIntensityChange(
                      emotionState.type, 
                      parseInt(e.target.value)
                    )}
                    className="flex-1"
                    style={{
                      accentColor: emotionColors[emotionState.type]
                    }}
                  />
                  <span className="text-xs text-muted-foreground">강함</span>
                  <span className="text-sm font-bold min-w-[2rem] text-center">
                    {emotionState.intensity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedEmotions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-2">🤔</div>
            <p className="text-sm">현재 느끼고 있는 감정을 선택해주세요</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function getEmotionEmoji(emotion: EmotionType): string {
  const emojiMap: Record<EmotionType, string> = {
    joy: '😊',
    sadness: '😢',
    anger: '😠',
    fear: '😨',
    surprise: '😲',
    disgust: '🤢',
    trust: '🤗',
    anticipation: '🤩'
  }
  return emojiMap[emotion]
}