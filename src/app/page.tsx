"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Home() {
  const [showBetaPopup, setShowBetaPopup] = useState(false);

  useEffect(() => {
    const lastClosed = localStorage.getItem("betaPopupClosed");
    const today = new Date().toDateString();

    if (lastClosed !== today) {
      setShowBetaPopup(true);
    }
  }, []);

  const handleCloseBetaPopup = (dontShowToday: boolean) => {
    if (dontShowToday) {
      localStorage.setItem("betaPopupClosed", new Date().toDateString());
    }
    setShowBetaPopup(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            EmotionWise{" "}
            <Badge
              variant="outline"
              className="text-primary-foreground/70 border-primary-foreground/50"
            >
              Beta
            </Badge>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            당신의 감정을 이해하고, 건강하게 관리하는 AI 기반 감정 코칭 플랫폼
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/emotions">
              <Button
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-primary/50"
              >
                <Heart className="mr-2 h-5 w-5" />
                감정 기록하기
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <MessageSquare className="mr-2 h-5 w-5" />
                심리 상담 시작하기
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
              <Link href="/chat">
                <Button>시작하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Notice Popup */}
      <Dialog open={showBetaPopup} onOpenChange={setShowBetaPopup}>
        <DialogContent className="p-0 overflow-hidden rounded-lg shadow-xl max-w-md">
          <div className="bg-gradient-to-r from-primary to-purple-600 p-6 text-white flex flex-col items-center justify-center text-center rounded-t-lg">
            <MessageSquare className="h-12 w-12 mb-3" />
            <DialogTitle className="text-2xl font-bold">
              EmotionWise 서비스 안내
            </DialogTitle>
          </div>
          <div className="p-6 bg-white text-center">
            <DialogDescription className="text-sm text-gray-700 mb-4 leading-relaxed">
              현재 EmotionWise는 베타 버전으로, 공식 배포 시 일부 기능이
              제한되거나 변경될 수 있습니다. 최고의 경험을 제공하기 위해
              지속적으로 개선하고 있습니다.
            </DialogDescription>
            <DialogDescription className="text-sm text-gray-700 leading-relaxed">
              베타 버전에서 감정 기록은 현재 사용하시는 컴퓨터에만 저장되며,
              심리 상담 채팅은 페이지를 벗어나면 기록이 남지 않습니다. 이 점
              유의하시어 서비스를 이용해주시기 바랍니다.
            </DialogDescription>
          </div>
          <DialogFooter className="p-4 bg-gray-100 flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              variant="secondary"
              onClick={() => handleCloseBetaPopup(true)}
              className="w-full sm:w-auto text-gray-800"
            >
              오늘 하루 그만 보기
            </Button>
            <Button
              onClick={() => handleCloseBetaPopup(false)}
              className="w-full sm:w-auto text-gray-800"
            >
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
