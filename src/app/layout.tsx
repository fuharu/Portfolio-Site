import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "藤本悠杜 - ポートフォリオサイト",
  description: "茨城大学工学部情報工学科の藤本悠杜のポートフォリオサイト。AIとWeb技術を融合したフルスタック開発者として、ユーザー中心のプロダクト開発に取り組んでいます。",
  keywords: ["藤本悠杜", "ポートフォリオ", "フルスタック開発者", "AI", "Web技術", "React", "Next.js", "Python"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
