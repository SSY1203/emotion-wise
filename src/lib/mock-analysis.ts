import { EmotionAnalysis, AdviceRecommendation, EmotionType } from "@/types/emotion"

export function generateMockAnalysis(emotionRecordId: string, primaryEmotion: EmotionType): EmotionAnalysis {
  const mockRecommendations = generateMockAdvice(primaryEmotion)
  
  return {
    id: `analysis_${Date.now()}`,
    emotion_record_id: emotionRecordId,
    primary_emotion: primaryEmotion,
    triggers: generateTriggers(primaryEmotion),
    confidence_score: 0.85 + Math.random() * 0.15, // 0.85-1.0
    advice_recommendations: mockRecommendations,
    analysis_metadata: {
      processing_time: Math.floor(Math.random() * 2000) + 1000, // 1-3초
      model_version: "EmotionAI-v2.1",
      analysis_date: new Date().toISOString()
    },
    created_at: new Date().toISOString()
  }
}

function generateTriggers(emotion: EmotionType): string[] {
  const triggerMap: Record<EmotionType, string[]> = {
    joy: [
      "목표 달성에 대한 성취감",
      "긍정적인 대인관계 경험",
      "예상보다 좋은 결과"
    ],
    sadness: [
      "기대했던 결과와의 차이",
      "중요한 관계에서의 실망",
      "과거 경험의 회상"
    ],
    anger: [
      "불공정한 대우를 받았다는 느낌",
      "의사소통의 어려움",
      "예상과 다른 상대방의 반응"
    ],
    fear: [
      "불확실한 미래에 대한 걱정",
      "중요한 결정을 내려야 하는 압박",
      "과거 비슷한 경험에서의 부정적 기억"
    ],
    surprise: [
      "예상치 못한 상황의 발생",
      "새로운 정보의 획득",
      "계획과 다른 전개"
    ],
    disgust: [
      "가치관과 맞지 않는 상황",
      "부당하다고 느끼는 처우",
      "기대와 현실의 괴리"
    ],
    trust: [
      "상대방의 진실된 모습 발견",
      "약속이 지켜지는 경험",
      "서로에 대한 이해 증진"
    ],
    anticipation: [
      "긍정적인 변화에 대한 기대",
      "새로운 기회의 발견",
      "목표에 대한 명확한 비전"
    ]
  }

  const triggers = triggerMap[emotion] || ["명확한 트리거를 찾지 못했습니다"]
  return triggers.slice(0, Math.floor(Math.random() * 2) + 1) // 1-2개 선택
}

function generateMockAdvice(emotion: EmotionType): AdviceRecommendation[] {
  const adviceMap: Record<EmotionType, AdviceRecommendation[]> = {
    joy: [
      {
        id: "joy_immediate_1",
        type: "immediate_action",
        title: "긍정 에너지 확산하기",
        description: "현재의 기쁨을 다른 사람들과 나누어 더 큰 만족감을 얻으세요.",
        steps: [
          "가까운 사람에게 좋은 소식을 공유하기",
          "감사의 마음을 표현하기",
          "이 순간을 기록으로 남기기"
        ],
        priority: "high",
        estimated_time: "5-10분",
        category: "immediate"
      },
      {
        id: "joy_daily_1",
        type: "mindfulness",
        title: "감사 일기 작성",
        description: "매일 감사한 일들을 기록하여 긍정적인 마음가짐을 유지하세요.",
        steps: [
          "하루 중 감사했던 3가지 적기",
          "왜 그것이 의미 있었는지 생각해보기",
          "내일의 기대사항 한 가지 적기"
        ],
        priority: "medium",
        estimated_time: "10-15분",
        category: "daily"
      }
    ],
    sadness: [
      {
        id: "sadness_immediate_1",
        type: "self_care",
        title: "감정 수용하기",
        description: "슬픔을 억누르지 말고 자연스럽게 받아들이는 시간을 가지세요.",
        steps: [
          "조용한 공간에서 감정을 느껴보기",
          "울고 싶다면 충분히 울기",
          "따뜻한 차나 음료 마시기",
          "좋아하는 음악 듣기"
        ],
        priority: "high",
        estimated_time: "20-30분",
        category: "immediate"
      },
      {
        id: "sadness_daily_1",
        type: "social_connection",
        title: "지지 네트워크 활용",
        description: "신뢰할 수 있는 사람과 대화하여 감정을 나누어보세요.",
        steps: [
          "믿을 수 있는 친구나 가족에게 연락하기",
          "현재 감정을 솔직하게 표현하기",
          "조언보다는 경청을 요청하기"
        ],
        priority: "high",
        estimated_time: "30-60분",
        category: "daily"
      }
    ],
    anger: [
      {
        id: "anger_immediate_1",
        type: "breathing_exercise",
        title: "분노 조절 호흡법",
        description: "깊은 호흡을 통해 즉시 분노의 강도를 낮춰보세요.",
        steps: [
          "4초간 코로 천천히 숨 들이마시기",
          "4초간 숨 참기",
          "6초간 입으로 천천히 숨 내쉬기",
          "이 과정을 5-10회 반복하기"
        ],
        priority: "high",
        estimated_time: "5-10분",
        category: "immediate"
      },
      {
        id: "anger_daily_1",
        type: "physical_activity",
        title: "에너지 전환 운동",
        description: "분노의 에너지를 건설적인 신체 활동으로 전환하세요.",
        steps: [
          "빠른 걸음으로 10-15분 산책하기",
          "계단 오르내리기",
          "간단한 스트레칭이나 요가",
          "운동 후 느낌 변화 관찰하기"
        ],
        priority: "medium",
        estimated_time: "15-30분",
        category: "daily"
      }
    ],
    fear: [
      {
        id: "fear_immediate_1",
        type: "mindfulness",
        title: "현재 순간 집중하기",
        description: "불안한 미래 생각에서 벗어나 현재에 집중해보세요.",
        steps: [
          "주변의 5가지 보이는 것 관찰하기",
          "4가지 들리는 소리 인식하기",
          "3가지 만질 수 있는 것 느끼기",
          "심호흡하며 현재 순간에 머물기"
        ],
        priority: "high",
        estimated_time: "10-15분",
        category: "immediate"
      },
      {
        id: "fear_long_1",
        type: "cognitive_reframe",
        title: "걱정 일기 작성",
        description: "걱정거리를 구체적으로 분석하고 대응 방안을 세워보세요.",
        steps: [
          "걱정되는 상황을 구체적으로 적기",
          "실제 일어날 확률 객관적으로 평가하기",
          "최악의 경우와 최선의 경우 시나리오 작성",
          "각 상황별 대응 방안 계획하기"
        ],
        priority: "medium",
        estimated_time: "20-30분",
        category: "long_term"
      }
    ],
    surprise: [
      {
        id: "surprise_immediate_1",
        type: "mindfulness",
        title: "상황 수용하기",
        description: "예상치 못한 상황을 받아들이고 적응하는 시간을 가지세요.",
        steps: [
          "몇 번의 깊은 호흡으로 마음 안정시키기",
          "상황을 있는 그대로 받아들이기",
          "새로운 기회가 될 수 있는지 생각해보기"
        ],
        priority: "medium",
        estimated_time: "10-15분",
        category: "immediate"
      }
    ],
    disgust: [
      {
        id: "disgust_immediate_1",
        type: "cognitive_reframe",
        title: "상황 재평가하기",
        description: "불쾌한 상황을 다른 관점에서 바라보는 시간을 가지세요.",
        steps: [
          "상황에서 배울 수 있는 점 찾기",
          "내 가치관을 더 명확히 하는 기회로 활용",
          "건설적인 변화 방안 생각해보기"
        ],
        priority: "medium",
        estimated_time: "15-20분",
        category: "immediate"
      }
    ],
    trust: [
      {
        id: "trust_immediate_1",
        type: "social_connection",
        title: "관계 강화하기",
        description: "신뢰 감정을 바탕으로 더 깊은 관계를 만들어보세요.",
        steps: [
          "상대방에게 감사의 마음 표현하기",
          "더 깊은 대화 나누기",
          "함께할 수 있는 활동 계획하기"
        ],
        priority: "high",
        estimated_time: "30분-1시간",
        category: "immediate"
      }
    ],
    anticipation: [
      {
        id: "anticipation_immediate_1",
        type: "immediate_action",
        title: "목표 구체화하기",
        description: "기대감을 구체적인 행동 계획으로 전환해보세요.",
        steps: [
          "기대하는 것을 명확히 정의하기",
          "달성을 위한 단계별 계획 세우기",
          "첫 번째 실행 단계 시작하기"
        ],
        priority: "high",
        estimated_time: "20-30분",
        category: "immediate"
      }
    ]
  }

  return adviceMap[emotion] || []
}