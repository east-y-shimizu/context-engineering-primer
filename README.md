# コンテキストエンジニアリング入門

このリポジトリは、GitHub Copilot のコンテキストエンジニアリングを学ぶためのサンプルプロジェクトです。

## 概要

コンテキストエンジニアリングとは、AI アシスタント（GitHub Copilot など）に適切なコンテキスト（文脈情報）を提供することで、より精度の高いコード補完や提案を得るための技術です。

このリポジトリでは、GitHub Copilot の以下の機能について、実用的なサンプルとドキュメントを提供しています。

## 学習内容

### 1. コンテキストファイル
- `.github/copilot-instruction.md` - リポジトリ全体に適用される指示
- `.github/instructions/` - パス単位で適用される指示

### 2. スラッシュコマンド（プロンプトファイル）
- `.github/prompts/` - 再利用可能なプロンプトをスラッシュコマンドで呼び出し
- 繰り返し利用する処理を効率化

### 3. カスタムエージェント
- `.github/agents/` - 固定化された役割・ペルソナを持つエージェント
- `/agent` コマンドで明示的に呼び出し
- GitHub Copilot CLI、github.com で利用可能

### 4. エージェントスキル
- `.github/skills/` - 特定タスクの実行手順を定義
- プロンプトに関連すると自動的にロード
- GitHub Copilot と Claude Code の両方で利用可能な標準化された仕組み

## ディレクトリ構成

```
.github/
├── agents/    # カスタムエージェント
├── prompts/   # プロンプトファイル
└── skills/    # エージェントスキル

docs/          # ドキュメント
```

## 使い方

1. このリポジトリをクローン
2. GitHub Copilot または Claude Code を有効化
3. ドキュメントとサンプルファイルを参照しながら、各機能を実践

## ハンズオン演習

実践的な開発ワークフローを学ぶハンズオン演習を用意しています：

- [バーコード読み取りアプリ開発ハンズオン](docs/hands-on/README.md)
  - 要件定義からIssue分解、TDD実装、リファクタリング、PR作成までの一連のフローを実践
  - エージェントスキル（issue-breakdown-skill、git-skill、tdd-skill、refactor-skill）を活用
  - Git/GitHub運用、TDD、リファクタリングのベストプラクティスを学習

## スキル

このリポジトリには、開発に役立つエージェントスキルが用意されています：

- [issue-breakdown-skill](.github/skills/issue-breakdown-skill/SKILL.md) - 要件をIssueに分解
- [git-skill](.github/skills/git-skill/SKILL.md) - Git/GitHub運用（コミット、PR、Issue、ラベル）
- [tdd-skill](.github/skills/tdd-skill/SKILL.md) - TDD開発（Red-Green-Refactor、KISS原則）
- [refactor-skill](.github/skills/refactor-skill/SKILL.md) - リファクタリング（SOLID、DRY、YAGNI、Tidy First）

## ドキュメント

- [知識ベース](docs/knowledge/) - コンテキストエンジニアリングの基礎知識

