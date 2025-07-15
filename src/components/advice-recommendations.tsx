"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AdviceCategory,
  AdviceRecommendation,
  adviceTypeLabels,
} from "@/types/emotion";
import {
  Activity,
  Brain,
  CheckCircle,
  Clock,
  HeadphonesIcon,
  Heart,
  Lightbulb,
  Play,
  Shield,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface AdviceRecommendationsProps {
  recommendations: AdviceRecommendation[];
  onAdviceComplete?: (adviceId: string) => void;
}

export function AdviceRecommendations({
  recommendations,
  onAdviceComplete,
}: AdviceRecommendationsProps) {
  const [completedAdvices, setCompletedAdvices] = useState<Set<string>>(
    new Set()
  );
  const [activeAdvice, setActiveAdvice] = useState<string | null>(null);

  const handleAdviceComplete = (adviceId: string) => {
    setCompletedAdvices((prev) => new Set([...prev, adviceId]));
    onAdviceComplete?.(adviceId);
  };

  const handleAdviceStart = (adviceId: string) => {
    setActiveAdvice(activeAdvice === adviceId ? null : adviceId);
  };

  const getAdviceIcon = (type: string) => {
    const iconMap: Record<string, React.ElementType> = {
      immediate_action: Zap,
      breathing_exercise: Wind,
      mindfulness: Brain,
      physical_activity: Activity,
      cognitive_reframe: Lightbulb,
      social_connection: Users,
      self_care: Heart,
      professional_help: HeadphonesIcon,
    };
    return iconMap[type] || Lightbulb;
  };

  const getPriorityColor = (priority: string) => {
    const colorMap = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };
    return colorMap[priority as keyof typeof colorMap] || colorMap.medium;
  };

  const groupedRecommendations = recommendations.reduce((acc, rec) => {
    if (!acc[rec.category]) {
      acc[rec.category] = [];
    }
    acc[rec.category].push(rec);
    return acc;
  }, {} as Record<AdviceCategory, AdviceRecommendation[]>);

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Lightbulb className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">조언을 생성하는 중...</h3>
          <p className="text-muted-foreground">
            AI가 당신의 감정에 맞는 맞춤형 조언을 준비하고 있습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          맞춤형 조언
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="immediate" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="immediate">즉시 적용</TabsTrigger>
            <TabsTrigger value="daily">일상 관리</TabsTrigger>
            <TabsTrigger value="long_term">장기 전략</TabsTrigger>
          </TabsList>

          {Object.entries(groupedRecommendations).map(([category, advices]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {advices.length > 0 ? (
                <div className="space-y-4">
                  {advices.map((advice) => {
                    const Icon = getAdviceIcon(advice.type);
                    const isCompleted = completedAdvices.has(advice.id);
                    const isActive = activeAdvice === advice.id;

                    return (
                      <Card
                        key={advice.id}
                        className={`transition-all ${
                          isCompleted
                            ? "bg-green-50 border-green-200"
                            : isActive
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <Icon className="h-5 w-5 text-primary mt-1" />
                              <div className="space-y-1">
                                <h4 className="font-semibold text-lg">
                                  {advice.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {advice.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline">
                                    {adviceTypeLabels[advice.type]}
                                  </Badge>
                                  <Badge
                                    className={getPriorityColor(
                                      advice.priority
                                    )}
                                    variant="outline"
                                  >
                                    {advice.priority === "high"
                                      ? "높음"
                                      : advice.priority === "medium"
                                      ? "보통"
                                      : "낮음"}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {advice.estimated_time}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!isCompleted && (
                                <Button
                                  variant={isActive ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleAdviceStart(advice.id)}
                                >
                                  <Play className="h-4 w-4 mr-1" />
                                  {isActive ? "진행 중" : "시작"}
                                </Button>
                              )}
                              {isCompleted && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  완료
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>

                        {isActive && !isCompleted && (
                          <CardContent className="pt-0">
                            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                              <h5 className="font-medium text-sm mb-3">
                                단계별 가이드:
                              </h5>
                              <div className="space-y-2">
                                {advice.steps.map((step, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <Badge
                                      variant="outline"
                                      className="min-w-[24px] h-6 text-xs"
                                    >
                                      {index + 1}
                                    </Badge>
                                    <p className="text-sm">{step}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-end pt-3 border-t">
                                <Button
                                  onClick={() =>
                                    handleAdviceComplete(advice.id)
                                  }
                                  size="sm"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  완료 표시
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    이 카테고리에 해당하는 조언이 없습니다.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* 진행 상황 */}
        {recommendations.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>완료 진행률</span>
              <span>
                {completedAdvices.size} / {recommendations.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${
                    (completedAdvices.size / recommendations.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
