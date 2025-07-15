import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EmotionWise - 감정 분석 및 관리 웹 서비스",
  description: "당신의 감정을 이해하고, 건강하게 관리하는 AI 기반 감정 코칭 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="stars stars-animation"></div>
        <img src="/moon.png" alt="Moon" className="fixed bottom-[-500px] right-[-500px] w-[1000px] h-[1000px] opacity-50 z-[-1] pointer-events-none" />
        <Navigation />
        <main className="fade-in relative z-10">{children}</main>
      </body>
    </html>
  );
}
