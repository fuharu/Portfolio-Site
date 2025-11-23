import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AIChatProvider } from "@/contexts/AIChatContext";
import AIChat from "@/components/features/AIChat";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import PageTransition from "@/components/layout/PageTransition";
import Scene3D from "@/components/features/Scene3D";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "藤本悠杜 - Portfolio",
  description: "茨城大学工学部情報工学科の藤本悠杜（ふじもと はると）のポートフォリオサイト。AIとWeb技術を融合したフルスタック開発者として、ユーザー中心のプロダクト開発に取り組んでいます。",
  keywords: ["藤本悠杜", "ふじもと はると", "Haruto Fujimoto", "ポートフォリオ", "フルスタック開発者", "AI", "Web技術", "React", "Next.js", "Python"],
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AIChatProvider>
              <Scene3D />
              <div className="relative z-10">
                <PageTransition>
                  {children}
                </PageTransition>
              </div>
              <AIChat />
            </AIChatProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}