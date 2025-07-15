export interface EmotionRecord {
  id?: string
  situation: SituationInfo
  conversation_content: string
  emotions: EmotionState[]
  created_at?: string
}

export interface SituationInfo {
  datetime: string
  location: string
  people: string[]
  situation_type: string
}

export interface EmotionState {
  type: EmotionType
  intensity: number // 1-10
}

export type EmotionType = 
  | 'joy'       // 기쁨
  | 'sadness'   // 슬픔
  | 'anger'     // 분노
  | 'fear'      // 두려움
  | 'surprise'  // 놀람
  | 'disgust'   // 혐오
  | 'trust'     // 신뢰
  | 'anticipation' // 기대

export const emotionLabels: Record<EmotionType, string> = {
  joy: '기쁨',
  sadness: '슬픔',
  anger: '분노',
  fear: '두려움',
  surprise: '놀람',
  disgust: '혐오',
  trust: '신뢰',
  anticipation: '기대'
}

export const emotionColors: Record<EmotionType, string> = {
  joy: '#FFD700',
  sadness: '#4169E1',
  anger: '#DC143C',
  fear: '#9932CC',
  surprise: '#FF6347',
  disgust: '#32CD32',
  trust: '#00CED1',
  anticipation: '#FF8C00'
}

export const situationTypes = [
  '업무',
  '가족',
  '친구',
  '연인',
  '학업',
  '건강',
  '취미',
  '기타'
] as const

export interface EmotionAnalysis {
  id: string
  emotion_record_id: string
  primary_emotion: EmotionType
  triggers: string[]
  confidence_score: number // 0-1
  advice_recommendations: AdviceRecommendation[]
  analysis_metadata: {
    processing_time: number
    model_version: string
    analysis_date: string
  }
  created_at: string
}

export interface AdviceRecommendation {
  id: string
  type: AdviceType
  title: string
  description: string
  steps: string[]
  priority: 'high' | 'medium' | 'low'
  estimated_time: string
  category: AdviceCategory
}

export type AdviceType = 
  | 'immediate_action'    // 즉시 실행
  | 'breathing_exercise'  // 호흡법
  | 'mindfulness'        // 마음챙김
  | 'physical_activity'  // 신체 활동
  | 'cognitive_reframe'  // 인지 재구성
  | 'social_connection'  // 사회적 연결
  | 'self_care'         // 자기돌봄
  | 'professional_help' // 전문가 도움

export type AdviceCategory = 
  | 'immediate'  // 즉시 적용
  | 'daily'      // 일상 관리
  | 'long_term'  // 장기 전략

export const adviceTypeLabels: Record<AdviceType, string> = {
  immediate_action: '즉시 실행',
  breathing_exercise: '호흡법',
  mindfulness: '마음챙김',
  physical_activity: '신체 활동',
  cognitive_reframe: '생각 바꾸기',
  social_connection: '사회적 연결',
  self_care: '자기돌봄',
  professional_help: '전문가 상담'
}

export const adviceCategoryLabels: Record<AdviceCategory, string> = {
  immediate: '즉시 적용',
  daily: '일상 관리',
  long_term: '장기 전략'
}