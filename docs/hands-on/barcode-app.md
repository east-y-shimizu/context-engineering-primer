# バーコード読み取りアプリ開発ハンズオン

## 概要

このハンズオンでは、書籍のバーコード画像から ISBN を読み取り、OpenBD API を使って書籍情報を表示するウェブアプリケーションを開発します。

実践的な Git/GitHub 運用と TDD（テスト駆動開発）のワークフローを学ぶことを目的としています。

## 学習目標

本ハンズオンを通じて、以下のスキルを習得します：

1. **要件定義からIssue分解** - 要件を実装可能な単位に分解する
2. **GitHub運用** - Issue作成、ブランチ戦略、PR作成の実践
3. **TDD開発** - Red-Green-Refactorサイクルの実践
4. **リファクタリング** - Tidy Firstアプローチによるコード改善
5. **Conventional Commits** - 統一されたコミットメッセージ形式の活用

## 完成イメージ

### 機能
- 📸 バーコード画像のアップロード
- 🔍 ISBNバーコードの自動読み取り
- 📚 OpenBD APIから書籍情報を取得
- 📖 書籍情報の表示（タイトル、著者、出版社、発行日、表紙画像）
- ⚠️  エラーハンドリング
- 📱 レスポンシブ対応

### 技術スタック

- **フロントエンド**: React + TypeScript
- **ビルドツール**: Vite
- **バーコード読み取り**: @ericblade/quagga2
- **書籍情報API**: OpenBD（日本の書籍情報、無料・APIキー不要）
- **テスト**: Vitest + Testing Library
- **バージョン管理**: Git + GitHub

## 演習の流れ

このハンズオンは、実際の開発ワークフローに沿って進めます：

### 1. 要件定義
[📄 要件定義ドキュメント](./01-requirements.md)

アプリの機能要件・非機能要件・UI要件を確認します。

### 2. Issue分解
[📋 Issue分解ガイド](./02-issue-breakdown.md)

要件を実装可能な単位（Issue）に分解します。
推奨されるIssue構成：
1. プロジェクトセットアップ
2. 型定義とAPI連携実装
3. バーコードスキャナーコンポーネント実装
4. 書籍情報表示コンポーネント実装
5. メインアプリ統合
6. スタイリング
7. エラーハンドリング改善

### 3. GitHub Issue登録
[🔧 GitHub運用ガイド](./03-github-workflow.md)

各Issueを GitHubに登録し、適切なラベルを付与します。
- Conventional Commits形式のラベル活用
- DoD（完了条件）の明記
- Issueテンプレートの活用

### 4. ブランチ作成
担当するIssueのブランチを作成します：

```bash
git checkout -b feat/setup-project  # Issue #1の例
```

ブランチ命名規則については [GitHub運用ガイド](./03-github-workflow.md) を参照してください。

### 5. TDD実装
[🧪 TDD実装ガイド](./04-tdd-implementation.md)

Red-Green-Refactorサイクルで実装します：
1. **Red**: 失敗するテストを書く
2. **Green**: テストが通る最小限の実装
3. **Refactor**: コードを改善

### 6. リファクタリング
[♻️ リファクタリングガイド](./05-refactoring.md)

Tidy Firstアプローチでリファクタリングします：
- 構造の変更（動作を変えない）
- 動作の変更（新機能追加）

### 7. PR作成
実装が完了したらPRを作成します：

```bash
git add .
git commit -m "feat: プロジェクトセットアップ"
git push -u origin feat/setup-project
gh pr create
```

PRテンプレートを使って、変更内容とDoDの確認を記載します。

### 8. 次のIssueへ
PRがマージされたら、次のIssueに取り組みます。

## サンプル

実際のIssueとPRのサンプルを用意しています：

- [📝 Issue #1サンプル](./samples/issue-sample.md) - プロジェクトセットアップ
- [🔀 PR #1サンプル](./samples/pr-sample.md) - PRの書き方

## 参考リソース

このリポジトリには、開発に役立つスキルが用意されています：

- [Git/GitHub運用スキル](../../.github/skills/git-skill/) - コミット、プッシュ、PR、Issue、ラベル管理
- [TDD開発スキル](../../.github/skills/tdd-skill/) - Red-Green-Refactorサイクル、KISS原則
- [リファクタリングスキル](../../.github/skills/refactor-skill/) - SOLID原則、DRY、YAGNI、Tidy First

## 始め方

1. このリポジトリをクローン
2. [要件定義](./01-requirements.md)を読む
3. [Issue分解ガイド](./02-issue-breakdown.md)に従ってIssueを作成
4. Issue #1から開始

それでは、実践的な開発ワークフローを体験しましょう！
