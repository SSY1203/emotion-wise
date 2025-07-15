"use client";

import { AdviceRecommendations } from "@/components/advice-recommendations";
import { AnalysisResult } from "@/components/analysis-result";
import { EmotionHistoryCard } from "@/components/emotion-history-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmotionAnalysis, EmotionRecord } from "@/types/emotion";
import { ArrowLeft, BookmarkPlus, Brain, RefreshCw, Share } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recordId = searchParams.get("id");

  const [emotionRecord, setEmotionRecord] = useState<
    (EmotionRecord & { id: string }) | null
  >(null);
  const [analysis, setAnalysis] = useState<EmotionAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!recordId) {
      router.push("/dashboard");
      return;
    }

    // 로컬 스토리지에서 감정 기록 찾기
    const loadEmotionRecord = () => {
      try {
        const storedRecords = JSON.parse(
          localStorage.getItem("emotionRecords") || "[]"
        );
        const record = storedRecords.find((r: EmotionRecord & { id: string }) => r.id === recordId);

        if (!record) {
          router.push("/dashboard");
          return;
        }

        setEmotionRecord(record);

        // 기존 분석 결과가 있는지 확인
        const storedAnalyses = JSON.parse(
          localStorage.getItem("emotionAnalyses") || "[]"
        );
        const existingAnalysis = storedAnalyses.find(
          (a: EmotionAnalysis) => a.emotion_record_id === recordId
        );

        if (existingAnalysis) {
          setAnalysis(existingAnalysis);
        } else {
          // 새로운 분석 생성
          generateAnalysis(record);
        }
      } catch (error) {
        console.error("Error loading emotion record:", error);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadEmotionRecord();
  }, [recordId, router]);

  const generateAnalysis = async (record: EmotionRecord & { id: string }) => {
    setAnalyzing(true);

    try {
      // 실제 AI 분석 API 호출
      const response = await fetch("/api/analyze-emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emotionRecord: record,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "AI 분석 요청이 실패했습니다");
      }

      const data = await response.json();
      const newAnalysis = data.analysis;
      setAnalysis(newAnalysis);

      // 로컬 스토리지에 분석 결과 저장
      const storedAnalyses = JSON.parse(
        localStorage.getItem("emotionAnalyses") || "[]"
      );

      // 기존 분석이 있다면 제거하고 새로운 분석 추가
      const filteredAnalyses = storedAnalyses.filter(
        (a: EmotionAnalysis) => a.emotion_record_id !== record.id
      );
      filteredAnalyses.push(newAnalysis);
      localStorage.setItem("emotionAnalyses", JSON.stringify(filteredAnalyses));
    } catch (error) {
      console.error("Error generating analysis:", error);
      alert(
        `분석 생성 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRegenerate = () => {
    if (!emotionRecord) return;

    setAnalysis(null);
    generateAnalysis(emotionRecord);
  };

  const handleSaveBookmark = () => {
    if (!analysis) return;

    // TODO: 북마크 저장 기능 구현
    alert("분석 결과가 북마크에 저장되었습니다!");
  };

  const handleShare = () => {
    if (!analysis) return;

    // TODO: 공유 기능 구현
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 클립보드에 복사되었습니다!");
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Brain className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-muted-foreground">감정 기록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!emotionRecord) {
    return (
      <div className="container mx-auto py-8">
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">
              감정 기록을 찾을 수 없습니다
            </h3>
            <p className="text-muted-foreground mb-6">
              요청하신 감정 기록이 존재하지 않거나 삭제되었습니다.
            </p>
            <Button onClick={() => router.push("/dashboard")}>
              대시보드로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">AI 분석 결과</h1>
            <p className="text-muted-foreground">
              감정 상태를 분석하고 맞춤형 조언을 제공합니다
            </p>
          </div>
        </div>

        {analysis && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveBookmark}>
              <BookmarkPlus className="h-4 w-4 mr-2" />
              저장
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              공유
            </Button>
            <Button variant="outline" onClick={handleRegenerate}>
              <RefreshCw className="h-4 w-4 mr-2" />
              재분석
            </Button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 왼쪽: 원본 감정 기록 */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold mb-4">원본 감정 기록</h2>
            <EmotionHistoryCard record={emotionRecord} />
          </div>
        </div>

        {/* 오른쪽: 분석 결과 */}
        <div className="lg:col-span-2 space-y-8">
          {analyzing && (
            <Card>
              <CardContent className="text-center py-12">
                <Brain className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">
                  AI가 분석하는 중...
                </h3>
                <p className="text-muted-foreground mb-4">
                  감정 상태와 상황을 종합적으로 분석하고 있습니다.
                </p>
                <div className="w-full bg-muted rounded-full h-2 max-w-xs mx-auto">
                  <div
                    className="bg-primary h-2 rounded-full animate-pulse"
                    style={{ width: "60%" }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {analysis && !analyzing && (
            <>
              <AnalysisResult analysis={analysis} />
              <AdviceRecommendations
                recommendations={analysis.advice_recommendations}
                onAdviceComplete={(adviceId) => {
                  console.log("Advice completed:", adviceId);
                  // TODO: 조언 완료 상태 저장
                }}
              />
            </>
          )}

          {!analysis && !analyzing && (
            <Card>
              <CardContent className="text-center py-12">
                <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  분석 결과를 생성하지 못했습니다
                </h3>
                <p className="text-muted-foreground mb-6">
                  다시 시도하거나 감정 기록을 새로 작성해보세요.
                </p>
                <Button onClick={handleRegenerate}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  다시 분석하기
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
