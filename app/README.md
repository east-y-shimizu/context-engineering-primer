# バーコード読み取り書籍検索アプリ

書籍のバーコード画像からISBNを読み取り、OpenBD APIを使用して書籍情報を表示するウェブアプリケーション。

## 技術スタック

- **React**: 19.x - UIライブラリ
- **TypeScript**: 5.x - 型安全な開発  
- **Vite**: 7.x - 高速なビルドツール
- **@ericblade/quagga2**: バーコード読み取りライブラリ
- **OpenBD API**: 日本の書籍情報API

## セットアップ手順

### 前提条件

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# 依存パッケージのインストール
npm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:5173/` を開いてアプリケーションにアクセスできます。

### ビルド

```bash
# プロダクションビルド
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

### プレビュー

```bash
# ビルド後のプレビュー
npm run preview
```

## プロジェクト構造

```
app/
├── src/
│   ├── components/       # Reactコンポーネント
│   │   ├── BarcodeScanner.tsx   # バーコード読み取りコンポーネント
│   │   └── BookDisplay.tsx      # 書籍情報表示コンポーネント
│   ├── services/         # API連携などのサービス層
│   │   └── openbd.ts            # OpenBD API連携
│   ├── types/            # TypeScript型定義
│   │   └── book.ts              # 書籍関連の型定義
│   ├── App.tsx           # メインアプリケーション
│   ├── App.css           # アプリケーションスタイル
│   └── main.tsx          # エントリーポイント
├── package.json          # 依存パッケージ管理
├── vite.config.ts        # Vite設定
├── tsconfig.json         # TypeScript設定
└── index.html            # HTMLエントリーポイント
```

## 主な機能

### FR-01: 画像アップロード機能
- ファイル選択ボタンでバーコード画像をアップロード
- 画像プレビュー表示

### FR-02: バーコード読み取り機能
- ISBN-13（EAN-13）形式のバーコードを自動検出
- 読み取り中の処理状態表示

### FR-03: 書籍情報取得機能
- OpenBD APIからISBNをもとに書籍情報を取得
- API呼び出し中のローディング表示

### FR-04: 書籍情報表示機能
- ISBN、タイトル、著者、出版社、発行日、表紙画像を表示

## 開発ガイドライン

### コーディング規約

- Conventional Commits形式でコミットメッセージを記述
- TypeScriptの型安全性を維持
- コンポーネントは単一責任の原則に従う

### ブランチ戦略

- `main`: プロダクション環境
- `feat/*`: 新機能開発
- `fix/*`: バグ修正
- `style/*`: スタイリング

### Issue管理

詳細は `docs/hands-on/ISSUES.md` を参照してください。

## API

### OpenBD API

**エンドポイント**: `https://api.openbd.jp/v1/get?isbn={ISBN}`

- 無料で利用可能
- APIキー不要
- 日本の書籍情報に特化

## ライセンス

このプロジェクトはハンズオン演習用です。
