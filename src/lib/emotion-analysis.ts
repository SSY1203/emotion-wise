import { openai, OPENAI_CONFIG } from "./openai-client";
import {
  EmotionRecord,
  EmotionAnalysis,
  EmotionType,
  AdviceRecommendation,
} from "@/types/emotion";

const EMOTION_ANALYSIS_PROMPT = `
당신은 전문적인 감정 분석 AI입니다. 사용자의 감정 기록을 분석하여 정확한 감정 분석과 맞춤형 조언을 제공해주세요.

분석할 감정 기록:
- 상황: {situation}
- 대화/상황 내용: {content}
- 사용자가 선택한 감정: {emotions}

다음 JSON 형식으로 응답해주세요:

{
  "primary_emotion": "joy|sadness|anger|fear|surprise|disgust|trust|anticipation 중 하나",
  "confidence_score": 0.0-1.0 사이의 신뢰도,
  "triggers": ["주요 감정 유발 요인들의 배열"],
  "analysis_summary": "간단한 분석 요약 (2-3문장)",
  "advice_recommendations": [
    {
      "type": "breathing_exercise|mindfulness|physical_activity|social_connection|cognitive_reframe|self_care|immediate_action|time_management",
      "title": "조언 제목",
      "description": "조언 설명",
      "steps": ["구체적인 실행 단계들"],
      "priority": "high|medium|low",
      "estimated_time": "예상 소요 시간",
      "category": "immediate|daily|long_term"
    }
  ]
}

중요한 지침:
1. primary_emotion은 반드시 8가지 기본 감정 중 하나여야 합니다
2. triggers는 구체적이고 실질적인 감정 유발 요인이어야 합니다
3. advice_recommendations는 최소 2개, 최대 4개까지 제공하세요
4. 각 조언은 실제로 실행 가능한 구체적인 단계를 포함해야 합니다
5. immediate(즉시), daily(일상), long_term(장기) 카테고리를 골고루 포함하세요
6. 한국 문화와 정서에 맞는 조언을 제공하세요
`;

export async function analyzeEmotion(
  emotionRecord: EmotionRecord
): Promise<EmotionAnalysis> {
  try {
    const situationText = `
시간: ${emotionRecord.situation.datetime}
장소: ${emotionRecord.situation.location}
동반자: ${emotionRecord.situation.people.join(", ")}
상황 유형: ${emotionRecord.situation.situation_type}
    `.trim();

    const emotionsText = emotionRecord.emotions
      .map((e) => `${e.type}: ${e.intensity}/10`)
      .join(", ");

    const prompt = EMOTION_ANALYSIS_PROMPT.replace("{situation}", situationText)
      .replace("{content}", emotionRecord.conversation_content)
      .replace("{emotions}", emotionsText);

    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        {
          role: "system",
          content:
            "당신은 전문적인 감정 분석 및 심리 상담 AI입니다. 정확하고 도움이 되는 분석과 조언을 제공하세요.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: OPENAI_CONFIG.temperature,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("OpenAI API returned empty response");
    }

    const analysisData = JSON.parse(content);

    // 응답 데이터 검증
    if (!isValidEmotionType(analysisData.primary_emotion)) {
      throw new Error(`Invalid emotion type: ${analysisData.primary_emotion}`);
    }

    // EmotionAnalysis 객체 생성
    const analysis: EmotionAnalysis = {
      id: `analysis_${Date.now()}`,
      emotion_record_id: emotionRecord.id!,
      primary_emotion: analysisData.primary_emotion as EmotionType,
      triggers: analysisData.triggers || [],
      confidence_score: Math.min(
        Math.max(analysisData.confidence_score || 0.5, 0),
        1
      ),
      advice_recommendations: (analysisData.advice_recommendations || []).map(
        (rec: AdviceRecommendation, index: number) =>
          ({
            id: `advice_${Date.now()}_${index}`,
            type: rec.type || "mindfulness",
            title: rec.title || "기본 조언",
            description: rec.description || "",
            steps: rec.steps || [],
            priority: rec.priority || "medium",
            estimated_time: rec.estimated_time || "10-15분",
            category: rec.category || "immediate",
          } as AdviceRecommendation)
      ),
      analysis_metadata: {
        processing_time: response.usage?.total_tokens || 0,
        model_version: OPENAI_CONFIG.model,
        analysis_date: new Date().toISOString(),
      },
      created_at: new Date().toISOString(),
    };

    return analysis;
  } catch (error) {
    console.error("Emotion analysis failed:", error);

    // 에러 발생 시 기본 분석 결과 반환
    return createFallbackAnalysis(emotionRecord);
  }
}

function isValidEmotionType(emotion: string): emotion is EmotionType {
  const validEmotions: EmotionType[] = [
    "joy",
    "sadness",
    "anger",
    "fear",
    "surprise",
    "disgust",
    "trust",
    "anticipation",
  ];
  return validEmotions.includes(emotion as EmotionType);
}

function createFallbackAnalysis(emotionRecord: EmotionRecord): EmotionAnalysis {
  // 사용자가 선택한 감정 중 가장 강도가 높은 것을 주요 감정으로 설정
  const primaryEmotion = emotionRecord.emotions.reduce((prev, current) =>
    prev.intensity > current.intensity ? prev : current
  ).type;

  return {
    id: `analysis_${Date.now()}`,
    emotion_record_id: emotionRecord.id!,
    primary_emotion: primaryEmotion,
    triggers: ["감정 분석 중 오류가 발생했습니다"],
    confidence_score: 0.5,
    advice_recommendations: [
      {
        id: `fallback_advice_${Date.now()}`,
        type: "mindfulness",
        title: "마음챙김 호흡",
        description: "깊은 호흡을 통해 현재 순간에 집중해보세요.",
        steps: [
          "편안한 자세로 앉기",
          "4초간 천천히 숨 들이마시기",
          "4초간 숨 멈추기",
          "6초간 천천히 숨 내쉬기",
          "이 과정을 5-10회 반복하기",
        ],
        priority: "high",
        estimated_time: "5-10분",
        category: "immediate",
      },
    ],
    analysis_metadata: {
      processing_time: 0,
      model_version: "fallback",
      analysis_date: new Date().toISOString(),
    },
    created_at: new Date().toISOString(),
  };
}
