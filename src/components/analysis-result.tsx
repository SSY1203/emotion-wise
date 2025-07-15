"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmotionAnalysis, emotionLabels, emotionColors } from "@/types/emotion"
import { Brain, Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface AnalysisResultProps {
  analysis: EmotionAnalysis
}

export function AnalysisResult({ analysis }: AnalysisResultProps) {
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

  const getConfidenceLevel = (score: number) => {
    if (score >= 0.8) return { label: '매우 높음', color: 'bg-green-500' }
    if (score >= 0.6) return { label: '높음', color: 'bg-blue-500' }
    if (score >= 0.4) return { label: '보통', color: 'bg-yellow-500' }
    return { label: '낮음', color: 'bg-red-500' }
  }

  const confidence = getConfidenceLevel(analysis.confidence_score)

  return (
    <div className="space-y-6">
      {/* 분석 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI 분석 결과
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 주요 감정 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">주요 감정</h4>
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2"
                style={{
                  backgroundColor: `${emotionColors[analysis.primary_emotion]}20`,
                  borderColor: `${emotionColors[analysis.primary_emotion]}50`
                }}
              >
                <span className="text-2xl">{getEmotionEmoji(analysis.primary_emotion)}</span>
                <span className="font-semibold text-lg">
                  {emotionLabels[analysis.primary_emotion]}
                </span>
              </div>
            </div>
          </div>

          {/* 분석 신뢰도 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">분석 신뢰도</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${confidence.color}`}
                  style={{ width: `${analysis.confidence_score * 100}%` }}
                />
              </div>
              <Badge variant="secondary">
                {confidence.label} ({Math.round(analysis.confidence_score * 100)}%)
              </Badge>
            </div>
          </div>

          {/* 분석 메타데이터 */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t text-xs text-muted-foreground">
            <div>
              <span className="font-medium">처리 시간:</span> {analysis.analysis_metadata.processing_time}ms
            </div>
            <div>
              <span className="font-medium">모델 버전:</span> {analysis.analysis_metadata.model_version}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 감정 유발 요인 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            감정 유발 요인
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analysis.triggers.length > 0 ? (
            <div className="space-y-3">
              {analysis.triggers.map((trigger, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm">{trigger}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">명확한 유발 요인을 찾지 못했습니다.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 분석 인사이트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            AI 인사이트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    현재 감정 상태 해석
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {getEmotionInsight(analysis.primary_emotion, analysis.confidence_score)}
                  </p>
                </div>
              </div>
            </div>

            {analysis.triggers.length > 0 && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                      패턴 분석
                    </h4>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      주요 유발 요인들을 통해 볼 때, 이런 상황에서 비슷한 감정이 반복될 가능성이 있습니다. 
                      아래 맞춤형 조언을 통해 효과적으로 관리해보세요.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getEmotionInsight(emotion: string, confidence: number): string {
  const insights: Record<string, string> = {
    joy: `기쁨 감정이 강하게 나타나고 있습니다. 이 긍정적인 에너지를 유지하고 다른 영역으로 확장시켜보세요.`,
    sadness: `슬픔이 주된 감정으로 분석되었습니다. 이 감정을 억누르지 말고 충분히 느끼되, 건전한 방법으로 표현해보세요.`,
    anger: `분노 감정이 감지되었습니다. 이 에너지를 건설적인 방향으로 전환하는 것이 중요합니다.`,
    fear: `두려움이나 불안이 주요 감정으로 나타났습니다. 이 감정의 근본 원인을 파악하고 단계적으로 대처해보세요.`,
    surprise: `놀람이나 예상치 못한 상황에 대한 반응이 나타났습니다. 새로운 경험을 긍정적으로 받아들여보세요.`,
    disgust: `혐오나 거부감이 강하게 나타났습니다. 이 감정의 원인을 명확히 파악하고 경계를 설정해보세요.`,
    trust: `신뢰와 애정의 감정이 나타났습니다. 이런 긍정적인 관계를 더욱 발전시켜보세요.`,
    anticipation: `기대감과 열정이 느껴집니다. 이 에너지를 목표 달성을 위해 활용해보세요.`
  }

  const baseInsight = insights[emotion] || '현재 감정 상태를 분석하고 있습니다.'
  
  if (confidence >= 0.8) {
    return `${baseInsight} 분석 신뢰도가 매우 높아 정확한 감정 파악이 가능합니다.`
  } else if (confidence >= 0.6) {
    return `${baseInsight} 분석 결과가 신뢰할 만한 수준입니다.`
  } else {
    return `${baseInsight} 다만 복합적인 감정 상태일 수 있으니 추가적인 관찰이 필요합니다.`
  }
}