import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Brain,
  CheckCircle,
  Heart,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            EmotionWise
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            당신의 감정을 이해하고, 건강하게 관리하는 AI 기반 감정 코칭 플랫폼
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/emotions">
              <Button size="lg" className="w-full sm:w-auto">
                <Heart className="mr-2 h-5 w-5" />
                감정 기록하기
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <BarChart3 className="mr-2 h-5 w-5" />
                대시보드 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>감정 상황 입력</CardTitle>
                <CardDescription>
                  시간, 장소, 상황을 체계적으로 기록하고 감정 상태를 측정합니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI 감정 분석</CardTitle>
                <CardDescription>
                  3초 이내 실시간 분석으로 감정 원인을 파악하고 개인화된
                  인사이트를 제공합니다.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>감정 히스토리</CardTitle>
                <CardDescription>
                  일/주/월별 감정 변화를 시각화하고 패턴을 분석하여 개선 효과를
                  추적합니다.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            왜 EmotionWise인가요?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">과학적 접근</h3>
                    <p className="text-muted-foreground">
                      AI와 심리학 이론을 결합한 체계적인 감정 분석
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">맞춤형 솔루션</h3>
                    <p className="text-muted-foreground">
                      개인의 감정 패턴을 학습하여 최적화된 조언 제공
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">지속적인 관리</h3>
                    <p className="text-muted-foreground">
                      단순한 기록이 아닌 실질적인 감정 관리 도구
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">지금 시작해보세요</h3>
              <p className="text-muted-foreground mb-6">
                복잡한 감정을 명확히 파악하고, AI가 제안하는 맞춤형 관리
                방법으로 더 건강한 감정 생활을 시작하세요.
              </p>
              <Link href="/emotions">
                <Button>무료로 시작하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
