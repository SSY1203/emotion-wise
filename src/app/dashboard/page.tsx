"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmotionHistoryCard } from "@/components/emotion-history-card"
import { EmotionRecord, emotionLabels, emotionColors } from "@/types/emotion"
import { BarChart3, TrendingUp, Calendar, Brain, Plus, Filter } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [emotionRecords, setEmotionRecords] = useState<(EmotionRecord & { id: string })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 로컬 스토리지에서 감정 기록 불러오기
    const loadEmotionRecords = () => {
      try {
        const storedRecords = JSON.parse(localStorage.getItem('emotionRecords') || '[]')
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

  // 통계 계산
  const totalRecords = emotionRecords.length
  const recentRecords = emotionRecords.slice(0, 7) // 최근 7개
  
  const emotionStats = emotionRecords.reduce((acc, record) => {
    record.emotions.forEach(emotion => {
      if (!acc[emotion.type]) {
        acc[emotion.type] = { count: 0, totalIntensity: 0 }
      }
      acc[emotion.type].count++
      acc[emotion.type].totalIntensity += emotion.intensity
    })
    return acc
  }, {} as Record<string, { count: number; totalIntensity: number }>)

  const mostFrequentEmotion = Object.entries(emotionStats)
    .sort(([,a], [,b]) => b.count - a.count)[0]

  const averageIntensity = Object.values(emotionStats)
    .reduce((sum, stat) => sum + stat.totalIntensity, 0) / 
    Object.values(emotionStats).reduce((sum, stat) => sum + stat.count, 0) || 0

  const situationStats = emotionRecords.reduce((acc, record) => {
    acc[record.situation.situation_type] = (acc[record.situation.situation_type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Brain className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-muted-foreground">데이터를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (totalRecords === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">대시보드</h1>
        <Card className="text-center py-12">
          <CardContent>
            <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">아직 감정 기록이 없습니다</h3>
            <p className="text-muted-foreground mb-6">
              첫 번째 감정을 기록하고 AI 분석을 받아보세요!
            </p>
            <Button onClick={() => router.push('/emotions')}>
              <Plus className="h-4 w-4 mr-2" />
              감정 기록하기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">대시보드</h1>
        <p className="text-muted-foreground">
          감정 패턴을 분석하고 개인적인 인사이트를 확인하세요.
        </p>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 기록 수</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground">
              누적 감정 기록
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">가장 빈번한 감정</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mostFrequentEmotion ? emotionLabels[mostFrequentEmotion[0] as keyof typeof emotionLabels] : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              {mostFrequentEmotion ? `${mostFrequentEmotion[1].count}회 기록` : '데이터 없음'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 감정 강도</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageIntensity.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              10점 만점 기준
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">주요 상황</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.entries(situationStats).sort(([,a], [,b]) => b - a)[0]?.[0] || '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              가장 많이 기록된 상황
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 감정 분포 차트 (간단한 바 차트) */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>감정 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(emotionStats)
              .sort(([,a], [,b]) => b.count - a.count)
              .slice(0, 6)
              .map(([emotion, stat]) => {
                const percentage = (stat.count / totalRecords) * 100
                const avgIntensity = stat.totalIntensity / stat.count
                
                return (
                  <div key={emotion} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">
                        {emotionLabels[emotion as keyof typeof emotionLabels]}
                      </span>
                      <span className="text-muted-foreground">
                        {stat.count}회 (평균 강도: {avgIntensity.toFixed(1)})
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: emotionColors[emotion as keyof typeof emotionColors]
                        }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>

      {/* 최근 감정 기록 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>최근 감정 기록</CardTitle>
          <Button variant="outline" onClick={() => window.location.href = '/emotions'}>
            <Plus className="h-4 w-4 mr-2" />
            새 기록 추가
          </Button>
        </CardHeader>
        <CardContent>
          {recentRecords.length > 0 ? (
            <div className="grid gap-4">
              {recentRecords.map((record) => (
                <EmotionHistoryCard
                  key={record.id}
                  record={record}
                  onDelete={handleDeleteRecord}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <p>감정 기록이 없습니다.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}