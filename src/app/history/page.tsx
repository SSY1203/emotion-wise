"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmotionHistoryCard } from "@/components/emotion-history-card"
import { EmotionRecord } from "@/types/emotion"
import { Brain, Plus, List } from "lucide-react"

export default function HistoryPage() {
  const router = useRouter()
  const [emotionRecords, setEmotionRecords] = useState<(EmotionRecord & { id: string })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEmotionRecords = () => {
      try {
        const storedRecords = JSON.parse(localStorage.getItem('emotionRecords') || '[]')
        storedRecords.sort((a: EmotionRecord & { id: string }, b: EmotionRecord & { id: string }) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
        setEmotionRecords(storedRecords)
      } catch (error) {
        console.error('Error loading emotion records:', error)
        setEmotionRecords([])
      } finally {
        setLoading(false)
      }
    }

    loadEmotionRecords()
  }, [])

  const handleDeleteRecord = (id: string) => {
    if (confirm('이 감정 기록을 삭제하시겠습니까?')) {
      const updatedRecords = emotionRecords.filter(record => record.id !== id)
      setEmotionRecords(updatedRecords)
      localStorage.setItem('emotionRecords', JSON.stringify(updatedRecords))
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Brain className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-muted-foreground">기록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold">감정 기록 목록</h1>
            <p className="text-muted-foreground">
              과거에 기록했던 모든 감정들을 확인하고 다시 분석해 보세요.
            </p>
        </div>
        <Button onClick={() => router.push('/emotions')}>
            <Plus className="h-4 w-4 mr-2" />
            새 기록 추가
        </Button>
      </div>

      {emotionRecords.length > 0 ? (
        <div className="space-y-4">
          {emotionRecords.map((record) => (
            <EmotionHistoryCard
              key={record.id}
              record={record}
              onDelete={handleDeleteRecord}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <List className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">감정 기록이 없습니다</h3>
            <p className="text-muted-foreground mb-6">
              새로운 감정을 기록하여 목록을 채워보세요.
            </p>
            <Button onClick={() => router.push('/emotions')}>
              <Plus className="h-4 w-4 mr-2" />
              감정 기록하기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
