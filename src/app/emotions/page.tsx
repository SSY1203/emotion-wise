"use client";

import { EmotionSelector } from "@/components/emotion-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  EmotionRecord,
  EmotionState,
  SituationInfo,
  situationTypes,
} from "@/types/emotion";
import { Brain, Clock, MapPin, MessageSquare, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmotionsPage() {
  const router = useRouter();
  const [situation, setSituation] = useState<SituationInfo>({
    datetime: new Date().toISOString().slice(0, 16),
    location: "",
    people: [],
    situation_type: "",
  });

  const [conversationContent, setConversationContent] = useState("");
  const [emotions, setEmotions] = useState<EmotionState[]>([]);
  const [peopleInput, setPeopleInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePeopleAdd = () => {
    if (peopleInput.trim() && !situation.people.includes(peopleInput.trim())) {
      setSituation((prev) => ({
        ...prev,
        people: [...prev.people, peopleInput.trim()],
      }));
      setPeopleInput("");
    }
  };

  const handlePeopleRemove = (person: string) => {
    setSituation((prev) => ({
      ...prev,
      people: prev.people.filter((p) => p !== person),
    }));
  };

  const handleSubmit = async () => {
    if (
      !situation.location ||
      !situation.situation_type ||
      emotions.length === 0 ||
      !conversationContent
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    const emotionRecord: EmotionRecord = {
      situation,
      conversation_content: conversationContent,
      emotions,
      created_at: new Date().toISOString(),
    };

    try {
      // TODO: API 호출로 데이터 저장
      console.log("Emotion Record:", emotionRecord);

      // 임시: 로컬 스토리지에 저장
      const recordId = Date.now().toString();
      const recordWithId = { ...emotionRecord, id: recordId };

      const existingRecords = JSON.parse(
        localStorage.getItem("emotionRecords") || "[]"
      );
      existingRecords.push(recordWithId);
      localStorage.setItem("emotionRecords", JSON.stringify(existingRecords));

      // 분석 페이지로 리다이렉트
      router.push(`/analysis?id=${recordId}`);
    } catch (error) {
      console.error("Error saving emotion record:", error);
      alert("기록 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">감정 기록하기</h1>
        <p className="text-muted-foreground">
          현재 상황과 감정을 자세히 기록해주세요. AI가 분석하여 맞춤형 조언을
          제공합니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* 상황 정보 입력 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📍 상황 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="datetime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  날짜 및 시간
                </Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={situation.datetime}
                  onChange={(e) =>
                    setSituation((prev) => ({
                      ...prev,
                      datetime: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  장소 *
                </Label>
                <Input
                  id="location"
                  placeholder="예: 회사, 집, 카페 등"
                  value={situation.location}
                  onChange={(e) =>
                    setSituation((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                함께 있던 사람들
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="사람 이름을 입력하고 추가 버튼을 클릭하세요"
                  value={peopleInput}
                  onChange={(e) => setPeopleInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handlePeopleAdd()}
                />
                <Button type="button" onClick={handlePeopleAdd}>
                  추가
                </Button>
              </div>
              {situation.people.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {situation.people.map((person, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                    >
                      {person}
                      <button
                        onClick={() => handlePeopleRemove(person)}
                        className=""
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">상황 유형 *</Label>
              <Select
                value={situation.situation_type}
                onValueChange={(value) =>
                  setSituation((prev) => ({ ...prev, situation_type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="상황 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent className="bg-black/75">
                  {situationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 대화 내용 입력 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              대화 내용 또는 상황 설명 *
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="어떤 일이 있었는지, 어떤 대화를 나눴는지 자세히 적어주세요. 감정을 느끼게 된 구체적인 상황을 설명해주시면 더 정확한 분석이 가능합니다."
              value={conversationContent}
              onChange={(e) => setConversationContent(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="text-xs text-muted-foreground mt-2">
              {conversationContent.length} / 1000자
            </div>
          </CardContent>
        </Card>

        {/* 감정 선택 */}
        <EmotionSelector
          selectedEmotions={emotions}
          onEmotionChange={setEmotions}
        />

        {/* 제출 버튼 */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="ghost"
            onClick={() => {
              setSituation({
                datetime: new Date().toISOString().slice(0, 16),
                location: "",
                people: [],
                situation_type: "",
              });
              setConversationContent("");
              setEmotions([]);
            }}
          >
            초기화
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !situation.location ||
              !situation.situation_type ||
              emotions.length === 0 ||
              !conversationContent
            }
            className="min-w-[120px] border border-primary-foreground"
          >
            {isSubmitting ? (
              "저장 중..."
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                AI 분석 요청
              </>
            )}
          </Button>
        </div>

        {/* 도움말 */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">💡 더 정확한 분석을 위한 팁</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 구체적인 상황과 대화 내용을 상세히 기록해주세요</li>
              <li>• 여러 감정이 복합적으로 느껴진다면 모두 선택해주세요</li>
              <li>
                • 감정의 강도를 정확히 표현해주시면 더 맞춤화된 조언을 받을 수
                있습니다
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
