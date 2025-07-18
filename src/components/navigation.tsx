"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, BarChart3, Heart, Home, List, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '감정 기록', href: '/emotions', icon: Heart },
  { name: '기록 목록', href: '/history', icon: List },
  { name: '대시보드', href: '/dashboard', icon: BarChart3 },
  { name: '대화하기', href: '/chat', icon: MessageSquare },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EmotionWise <Badge variant="outline" className="text-primary-foreground/70 border-primary-foreground/50">Beta</Badge></span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}