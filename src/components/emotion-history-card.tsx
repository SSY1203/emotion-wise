"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmotionRecord, emotionLabels, emotionColors } from "@/types/emotion"
import { Calendar, MapPin, Users, MessageSquare, Trash2, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

interface EmotionHistoryCardProps {
  record: EmotionRecord & { id: string }
  onDelete?: (id: string) => void
}

export function EmotionHistoryCard({ record, onDelete }: EmotionHistoryCardProps) {
  const router = useRouter()
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEmotionEmoji = (emotion: string): string => {
    const emojiMap: Record<string, string> = {
      joy: '😊',
      sadness: '😢',
      anger: '😠',
      fear: '😨',
      surprise: '😲',
      disgust: '🤢',
      trust: '🤗',
      anticipation: '🤩'
    }
    return emojiMap[emotion] || '🤔'
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {formatDate(record.created_at || '')}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {record.situation.location}
              </span>
              <span className="bg-secondary px-2 py-1 rounded-md text-xs">
                {record.situation.situation_type}
              </span>
            </div>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(record.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 감정 상태 */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            💭 감정 상태
          </h4>
          <div className="flex flex-wrap gap-2">
            {record.emotions.map((emotion, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-full border text-sm"
                style={{
                  backgroundColor: `${emotionColors[emotion.type]}15`,
                  borderColor: `${emotionColors[emotion.type]}50`,
                }}
              >
                <span>{getEmotionEmoji(emotion.type)}</span>
                <span>{emotionLabels[emotion.type]}</span>
                <span className="text-xs bg-white/50 px-1 rounded">
                  {emotion.intensity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 함께 있던 사람들 */}
        {record.situation.people.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              함께 있던 사람들
            </h4>
            <div className="flex flex-wrap gap-1">
              {record.situation.people.map((person, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                >
                  {person}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 상황 설명 */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            상황 설명
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {record.conversation_content}
          </p>
        </div>

        {/* 감정 강도 평균 */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              <span>평균 감정 강도: </span>
              <span className="font-medium">
                {(record.emotions.reduce((sum, e) => sum + e.intensity, 0) / record.emotions.length).toFixed(1)} / 10
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/analysis?id=${record.id}`)}
              className="text-xs"
            >
              <Brain className="h-3 w-3 mr-1" />
              AI 분석
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}