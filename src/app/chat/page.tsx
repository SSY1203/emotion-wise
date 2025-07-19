"use client";

import { Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md text-center p-8 bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardContent className="space-y-4">
          <Brain className="h-24 w-24 text-primary mx-auto animate-pulse" />
          <h1 className="text-3xl font-bold text-primary">심리 상담 (AI 챗봇)</h1>
          <p className="text-muted-foreground text-lg">
            현재 개발 중인 기능입니다. 곧 찾아뵙겠습니다!
          </p>
          <p className="text-sm text-muted-foreground">
            더 나은 서비스를 위해 최선을 다하고 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
