# 🧠 EmotionWise - 개발 초기화 가이드

> AI 대화가 끊어져도 프로젝트 문맥을 이어갈 수 있도록 현재 상태를 정리한 문서입니다.

## 📋 프로젝트 개요

**EmotionWise**는 사용자의 감정을 이해하고 건강하게 관리하는 AI 기반 감정 코칭 플랫폼입니다.

### 핵심 기능
- 🎪 **감정 상황 입력**: 시간, 장소, 동반자, 상황 유형 체계적 기록
- 🤖 **AI 감정 분석**: 실시간 감정 분석 및 원인 파악
- 💡 **맞춤형 조언**: 즉시 실행/일상 관리/장기 전략별 개인화된 조언
- 📊 **감정 히스토리**: 일/주/월별 감정 변화 시각화 및 패턴 분석

## 🏗 현재 구현 상태 (완료)

### ✅ **1단계: 기본 인프라 구축**
- Next.js 14 + TypeScript + Tailwind CSS 설정
- Radix UI 기반 컴포넌트 시스템 구축
- 감정 분석 서비스용 디자인 시스템 (보라색 계열)
- 반응형 디자인 및 다크모드 지원

### ✅ **2단계: 핵심 UI 페이지**
- **홈페이지**: 히어로 섹션, 기능 소개, 혜택 설명
- **감정 기록 페이지**: 완전한 감정 입력 워크플로우
- **대시보드**: 통계, 감정 분포 차트, 히스토리 관리
- **네비게이션**: 전역 메뉴 및 라우팅

### ✅ **3단계: AI 분석 시스템**
- **분석 결과 페이지**: 완전한 AI 분석 결과 표시
- **맞춤형 조언 시스템**: 8가지 조언 유형 × 3가지 카테고리
- **사용자 플로우**: 감정 기록 → 자동 분석 → 조언 실행
- **실제 AI 분석**: OpenAI GPT-4 API 연동으로 실시간 감정 분석

### ✅ **4단계: 실제 AI 백엔드 구축 (NEW!)**
- **OpenAI GPT-4 API 연동**: 실제 AI 감정 분석 엔진
- **전문 프롬프트 엔지니어링**: 한국 문화 맞춤형 분석 및 조언
- **API 엔드포인트**: `/api/analyze-emotion` REST API
- **에러 처리**: 폴백 시스템 및 안정성 보장

## 📁 프로젝트 구조

```
emotion-wise/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx         # 루트 레이아웃 (네비게이션 포함)
│   │   ├── page.tsx           # 홈페이지
│   │   ├── emotions/          # 감정 기록 페이지
│   │   ├── dashboard/         # 대시보드 페이지
│   │   ├── analysis/          # AI 분석 결과 페이지
│   │   ├── api/               # API 라우트 (NEW!)
│   │   │   └── analyze-emotion/ # 감정 분석 API 엔드포인트
│   │   └── globals.css        # 전역 스타일 + CSS 변수
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # 재사용 UI 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   └── tabs.tsx
│   │   ├── navigation.tsx         # 전역 네비게이션
│   │   ├── emotion-selector.tsx   # 감정 선택 컴포넌트
│   │   ├── emotion-history-card.tsx # 감정 기록 카드
│   │   ├── analysis-result.tsx    # AI 분석 결과 표시
│   │   └── advice-recommendations.tsx # 맞춤형 조언 시스템
│   ├── types/
│   │   └── emotion.ts         # 모든 타입 정의
│   ├── lib/
│   │   ├── utils.ts          # 공통 유틸리티 (cn 함수)
│   │   ├── openai-client.ts  # OpenAI API 클라이언트 (NEW!)
│   │   ├── emotion-analysis.ts # 실제 AI 감정 분석 엔진 (NEW!)
│   │   └── mock-analysis.ts  # AI 분석 목 데이터 생성 (레거시)
│   └── hooks/                # 커스텀 훅 (미래 사용)
├── .env.local               # 환경변수 (OpenAI API 키) (NEW!)
├── package.json              # 종속성 및 스크립트
├── tailwind.config.ts        # Tailwind 설정 + 디자인 토큰
├── tsconfig.json            # TypeScript 설정
├── next.config.ts           # Next.js 설정
└── emotion_analyzer_readme.md # 원본 기획서
```

## 🔧 핵심 기술 스택

### Frontend
- **Next.js 15.3.5** (App Router)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** + **PostCSS**
- **Radix UI** (접근성 컴포넌트)
- **Lucide React** (아이콘)
- **class-variance-authority** + **clsx** + **tailwind-merge**

### AI & Backend (NEW!)
- **OpenAI GPT-4o** (실제 AI 감정 분석)
- **OpenAI SDK** (API 클라이언트)
- **Next.js API Routes** (백엔드 API)

### 데이터 저장 (현재)
- **localStorage** (임시 데이터 저장)
- 감정 기록: `emotionRecords`
- 분석 결과: `emotionAnalyses`

### 미래 예정 스택
- **Supabase** (BaaS - 데이터베이스, 인증, Edge Functions)
- **Vercel** (배포)

## 💾 데이터 구조

### 감정 기록 (EmotionRecord)
```typescript
{
  id: string
  situation: {
    datetime: string
    location: string
    people: string[]
    situation_type: string
  }
  conversation_content: string
  emotions: Array<{
    type: EmotionType // 8가지 기본 감정
    intensity: number // 1-10
  }>
  created_at: string
}
```

### 분석 결과 (EmotionAnalysis)
```typescript
{
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
```

### 조언 추천 (AdviceRecommendation)
```typescript
{
  id: string
  type: AdviceType // 8가지: 호흡법, 마음챙김, 신체활동 등
  title: string
  description: string
  steps: string[]
  priority: 'high' | 'medium' | 'low'
  estimated_time: string
  category: 'immediate' | 'daily' | 'long_term'
}
```

## 🚀 실행 방법

### 환경 설정 (중요!)
1. `.env.local` 파일에 OpenAI API 키 설정:
```bash
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 개발 서버 시작
```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

### 빌드 및 배포
```bash
npm run build
npm run start
```

### 코드 품질 검사
```bash
npm run lint
npm run type-check  # TypeScript 타입 검사
```

## 🎯 사용자 플로우

### 1. 감정 기록 워크플로우
1. `/emotions` 페이지에서 상황 정보 입력
2. 대화 내용 또는 상황 설명 작성
3. 8가지 기본 감정 중 선택 + 강도 조절
4. "AI 분석 요청" 버튼 클릭
5. 자동으로 `/analysis?id={recordId}` 페이지로 이동

### 2. AI 분석 워크플로우 (실제 AI 연동!)
1. OpenAI GPT-4 API로 실시간 감정 분석
2. 한국 문화 맞춤형 분석 및 조언 생성
3. 주요 감정, 신뢰도, 유발 요인 표시
4. 3가지 카테고리별 맞춤형 조언 제공
5. 단계별 실행 가이드 및 진행률 추적

### 3. 대시보드 워크플로우
1. `/dashboard`에서 통계 및 히스토리 확인
2. 각 기록에서 "AI 분석" 버튼으로 재분석 가능
3. 감정 분포 차트로 패턴 시각화

## 🔄 다음 개발 단계 옵션

### A. Supabase 백엔드 연동
- PostgreSQL 데이터베이스 스키마 구축
- Row Level Security (RLS) 설정
- 사용자 인증 시스템 구현
- Edge Functions로 AI 분석 API 구현

### ~~B. 실제 AI 분석 구현~~ ✅ **완료!**
- ✅ OpenAI GPT-4 API 연동
- ✅ 프롬프트 엔지니어링
- ✅ 감정 분석 정확도 향상
- ✅ 맞춤형 조언 품질 개선

### C. UI/UX 개선
- 차트 라이브러리 추가 (Chart.js/Recharts)
- 마이크로 애니메이션 (Framer Motion)
- PWA 기능 (오프라인 지원)
- 접근성 개선

### D. 고급 기능 추가
- 음성 입력 지원
- 감정 패턴 예측
- 감정 일기 내보내기
- 감정 코칭 리포트

## 🐛 알려진 이슈 및 TODO

### 현재 제한사항
- ✅ UI 구현 완료
- ✅ 실제 AI 분석 구현 완료 (OpenAI GPT-4)
- ⚠️ 데이터가 localStorage에만 저장됨 (새로고침 시 유지)
- ⚠️ 사용자 인증 시스템 없음
- ⚠️ 실시간 동기화 없음

### 개선 필요 사항
- [ ] 분석 결과 북마크/공유 기능 실제 구현
- [ ] 조언 완료 상태 영구 저장
- [ ] 감정 기록 수정/편집 기능
- [ ] 감정 패턴 고급 분석
- [ ] 모바일 최적화 개선

## 📝 컨벤션 및 가이드라인

### 코딩 스타일
- **컴포넌트**: PascalCase (예: `EmotionSelector`)
- **파일명**: kebab-case (예: `emotion-selector.tsx`)
- **함수명**: camelCase (예: `handleEmotionChange`)
- **상수**: UPPER_SNAKE_CASE (예: `EMOTION_LABELS`)

### 컴포넌트 구조
```typescript
"use client" // 클라이언트 컴포넌트인 경우

import statements...

interface ComponentProps {
  // props 타입 정의
}

export function ComponentName({ props }: ComponentProps) {
  // 상태 및 로직
  
  return (
    // JSX
  )
}
```

### 상태 관리
- **로컬 상태**: `useState` 사용
- **폼 상태**: `useState` + 제어 컴포넌트
- **전역 상태**: 필요시 Zustand 도입 예정

## 🔍 디버깅 정보

### 개발자 도구에서 확인 가능한 데이터
```javascript
// 감정 기록 확인
JSON.parse(localStorage.getItem('emotionRecords'))

// 분석 결과 확인  
JSON.parse(localStorage.getItem('emotionAnalyses'))

// 데이터 초기화
localStorage.clear()
```

### 주요 컴포넌트 props 구조
- `EmotionSelector`: `selectedEmotions`, `onEmotionChange`
- `AnalysisResult`: `analysis`
- `AdviceRecommendations`: `recommendations`, `onAdviceComplete`
- `EmotionHistoryCard`: `record`, `onDelete`

---

**이 문서는 EmotionWise 프로젝트의 현재 상태를 완전히 파악할 수 있도록 작성되었습니다. AI 대화가 끊어져도 이 문서를 참조하여 즉시 개발을 이어갈 수 있습니다.**