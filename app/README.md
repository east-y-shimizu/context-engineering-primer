# バーコード読み取り書籍検索アプリ

書籍のバーコード画像から ISBN を読み取り、OpenBD API を使って書籍情報を表示するウェブアプリケーションです。

## 演習課題について

このアプリケーションは、実践的な Git/GitHub 運用と TDD 開発のワークフローを学ぶためのハンズオン演習の題材です。

**ハンズオン演習はこちら**: [バーコード読み取りアプリ開発ハンズオン](../docs/hands-on/barcode-app.md)

## 学習内容

このハンズオンでは、以下のワークフローを実践します：

1. **要件定義** - アプリケーションの仕様を理解する
2. **Issue分解** - 要件を実装可能な単位に分解する
3. **GitHub Issue登録** - 作業内容を明確にする
4. **ブランチ作成** - 作業を分離する
5. **TDD実装** - Red-Green-Refactorサイクルで実装
6. **リファクタリング** - コードを改善する
7. **PR作成** - レビュー依頼とマージ準備
8. **次のIssueへ** - 次の作業に進む

## 完成イメージ

### 機能
- 📸 バーコード画像のアップロード
- 🔍 ISBNバーコードの自動読み取り
- 📚 OpenBD APIから書籍情報を取得
- 📖 書籍情報の表示（タイトル、著者、出版社、発行日、表紙画像）
- ⚠️  エラーハンドリング
- 📱 レスポンシブ対応

### 技術スタック

- **React**: 18.x
- **TypeScript**: 5.x
- **Vite**: 最新版
- **@ericblade/quagga2**: バーコード読み取りライブラリ
- **OpenBD API**: 日本の書籍情報API（無料・APIキー不要）
- **Vitest**: テストフレームワーク
- **Testing Library**: Reactコンポーネントテスト

## 始め方

### 前提条件

- Node.js 20.x 以上
- npm 10.x 以上

### セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:5173 を開くと、アプリケーションが表示されます。

### その他のコマンド

```bash
# ビルド
npm run build

# プレビュー
npm run preview

# テスト実行
npm run test

# テスト（カバレッジ付き）
npm run test:cov

# 型チェック
npm run type-check
```

## ハンズオン演習の進め方

1. [要件定義](../docs/hands-on/01-requirements.md)を読む
2. [Issue分解ガイド](../docs/hands-on/02-issue-breakdown.md)に従ってIssueを作成
3. Issue #1から順番に実装していく

詳しくは [バーコード読み取りアプリ開発ハンズオン](../docs/hands-on/barcode-app.md) を参照してください。

## 参考リソース

このリポジトリには、開発に役立つスキルが用意されています：

- [Git/GitHub運用スキル](../.github/skills/git-skill/) - コミット、プッシュ、PR、Issue、ラベル管理
- [TDD開発スキル](../.github/skills/tdd-skill/) - Red-Green-Refactorサイクル、KISS原則
- [リファクタリングスキル](../.github/skills/refactor-skill/) - SOLID原則、DRY、YAGNI、Tidy First

## ライセンス

MIT
