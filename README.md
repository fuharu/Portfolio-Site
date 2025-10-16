# 藤本悠杜 - ポートフォリオサイト

Next.js 15 + TypeScript + Tailwind CSSで構築された、モダンなポートフォリオサイトです。

## 🚀 特徴

- ✨ **美しいUI/UX**: 泡アニメーションと波紋エフェクトによる没入感のある体験
- 🤖 **AIチャットボット**: Dify RAG + Gemini 2.5 Flashで構築されたインタラクティブなAI
- 📱 **レスポンシブデザイン**: モバイルからデスクトップまで最適化
- ⚡ **高速**: Next.js 15の最新機能とパフォーマンス最適化

## 📁 ディレクトリ構成

```
my-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # Aboutページ
│   │   ├── ai-chat/            # AI Chatページ
│   │   ├── api/                # APIルート
│   │   │   └── chat/           # チャットAPI
│   │   ├── contact/            # Contactページ
│   │   ├── projects/           # Projectsページ
│   │   ├── skills/             # Skillsページ
│   │   ├── globals.css         # グローバルスタイル
│   │   ├── layout.tsx          # ルートレイアウト
│   │   └── page.tsx            # ホームページ
│   ├── components/             # Reactコンポーネント
│   │   ├── layout/             # レイアウトコンポーネント
│   │   │   └── Navigation.tsx
│   │   └── features/           # 機能別コンポーネント
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Skills.tsx
│   │       ├── Projects.tsx
│   │       ├── Contact.tsx
│   │       ├── AIChat.tsx
│   │       ├── GenieGPT.tsx
│   │       └── RippleEffect.tsx
│   ├── data/                   # データファイル
│   │   ├── education.md
│   │   ├── experience.md
│   │   ├── goals.md
│   │   ├── profile.md
│   │   ├── projects.md
│   │   └── skills.md
│   ├── hooks/                  # カスタムフック
│   │   ├── useScroll.ts
│   │   └── useSmoothScroll.ts
│   └── styles/                 # スタイルファイル
│       ├── animations.css      # 泡アニメーション
│       └── ripple.css          # 波紋アニメーション
├── public/                     # 静的ファイル
├── .env.local                  # 環境変数（ローカル）
├── .env.example                # 環境変数サンプル
└── package.json
```

## 🛠️ セットアップ

### 1. リポジトリのクローン

```bash
git clone <your-repo-url>
cd my-portfolio
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example`をコピーして`.env.local`を作成し、必要な値を設定してください。

```bash
cp .env.example .env.local
```

**必要な環境変数:**
- `NEXT_PUBLIC_DIFY_API_KEY`: Dify APIキー
- `NEXT_PUBLIC_DIFY_API_URL`: Dify APIのURL

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 🎨 主な機能

### 泡アニメーション
水中の泡をイメージした、リアルで美しい背景アニメーション。個々の泡が独立して上昇し、自然な動きを再現しています。

### 波紋エフェクト
クリック時に広がる波紋アニメーション。本物の水面のように、中心が濃く外側に向かって減衰します。複数の波紋が重なり合うことで、より豊かな表現を実現。

### AIチャットボット
Dify RAGとGemini 2.5 Flashを活用した、インタラクティブなAIチャットボット。経歴、スキル、プロジェクトについて質問できます。

## 📝 スクリプト

```bash
npm run dev          # 開発サーバーを起動
npm run build        # プロダクションビルド
npm run start        # プロダクションサーバーを起動
npm run lint         # ESLintでコードチェック
```

## 🔧 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Dify RAG + Gemini 2.5 Flash
- **Deployment**: Vercel

## 📚 詳細情報

Next.jsについて詳しく学ぶには、以下のリソースを参照してください：

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js)

## 🚀 デプロイ

このプロジェクトは[Vercel Platform](https://vercel.com)へのデプロイに最適化されています。

詳細は[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)を参照してください。

## 📄 ライセンス

MIT License

## 👤 作者

藤本悠杜 (Yuto Fujimoto)
- 茨城大学工学部情報工学科 3年生
