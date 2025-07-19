import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Script from "next/script";

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
  description:
    "당신의 감정을 이해하고, 건강하게 관리하는 AI 기반 감정 코칭 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PM69JFQB');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="stars stars-animation"></div>
        <Image
          width={1000}
          height={1000}
          src="/moon.png"
          alt="Moon"
          className="fixed bottom-[-500px] right-[-500px] w-[1000px] h-[1000px] opacity-50 z-[-1] pointer-events-none"
        />
        <Navigation />
        <main className="fade-in relative z-10 flex-grow">{children}</main>
        <Footer />
        <Script id="google-tag-manager-noscript" strategy="afterInteractive">
          {`
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PM69JFQB"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          `}
        </Script>
      </body>
    </html>
  );
}
