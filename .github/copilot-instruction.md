# Copilot Instructions

## プロジェクト概要

このリポジトリは、AIエージェント（GitHub Copilot、Claude Code等）のコンテキストエンジニアリングを学ぶための教育プロジェクトです。

**主な目的**:
- エージェントスキルを活用した開発ワークフローの実践
- Git/GitHub運用のベストプラクティス習得
- TDD（テスト駆動開発）の体験
- リファクタリング手法の学習

## ハンズオン演習

バーコード読み取りアプリ開発ハンズオンを提供しています。

**技術スタック**:
- React + TypeScript + Vite
- @ericblade/quagga2（バーコード読み取り）
- OpenBD API（日本の書籍情報）
- Vitest + Testing Library（テスト）

**演習の流れ**:
1. 要件定義を読む
2. 要件をIssueに分解
3. GitHub Issueを登録
4. 各Issueを実装
5. リファクタリング
6. PR作成
7. 次のIssueへ

## エージェントスキル

このプロジェクトには以下のスキルが用意されています：

### 1. issue-breakdown-skill
- **目的**: 要件定義を実装可能な単位（Issue）に分解
- **出力**: `docs/ISSUES.md`
- **使い方**: プロンプトに「issue-breakdown-skillを使って...」と記載

### 2. git-skill
- **目的**: Git/GitHub運用（コミット、PR、Issue、ラベル）
- **Conventional Commits形式**: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `chore:`
- **使い方**: プロンプトに「git-skillを使って...」と記載

### 3. tdd-skill
- **目的**: TDD開発（Red-Green-Refactor）
- **サイクル**: Red（失敗するテスト） → Green（最小実装） → Refactor（改善）
- **KISS原則**: シンプルに保つ
- **使い方**: プロンプトに「tdd-skillを使って...」と記載

### 4. refactor-skill
- **目的**: リファクタリング（Tidy First）
- **原則**: SOLID、DRY、YAGNI
- **アプローチ**: 構造変更と動作変更を分離してコミット
- **使い方**: プロンプトに「refactor-skillを使って...」と記載

## コーディングガイドライン

### 言語
- コードコメント: 日本語
- 変数名・関数名: 英語（camelCase）
- 型名・クラス名: 英語（PascalCase）

### 命名規則
- 変数・関数: `camelCase`（例: `fetchBookInfo`, `isLoading`）
- 型・インターフェース: `PascalCase`（例: `BookInfo`, `OpenBDBook`）
- 定数: `UPPER_SNAKE_CASE`（例: `OPENBD_API_URL`）
- コンポーネント: `PascalCase`（例: `BarcodeScanner`, `BookDisplay`）

### コードスタイル
- インデント: 2スペース
- 文字列: シングルクォート（'）
- セミコロン: 必須
- 行末カンマ: 推奨

### TypeScript
- 型推論を活用（明示的な型定義は必要最小限）
- `any`の使用は避ける
- `interface`を優先（`type`はユニオン型など必要な場合のみ）

## プロジェクト構造

```
context-engineering-primer/
├── .github/
│   ├── agents/              # カスタムエージェント
│   ├── prompts/             # プロンプトファイル
│   ├── skills/              # エージェントスキル
│   │   ├── issue-breakdown-skill/
│   │   ├── git-skill/
│   │   ├── tdd-skill/
│   │   └── refactor-skill/
│   └── copilot-instruction.md
├── app/                     # ハンズオン演習の実装先
│   └── .gitkeep
├── docs/
│   ├── hands-on/            # ハンズオン演習ドキュメント
│   │   ├── README.md        # 手順書
│   │   └── REQUIREMENTS.md  # 要件定義
│   └── knowledge/           # 知識ベース
└── README.md
```

### ハンズオン演習サポート
- ユーザーが`docs/hands-on/README.md`の手順に従っている場合、Step番号を確認して適切なスキルを使用
- 要件定義は`docs/hands-on/REQUIREMENTS.md`を参照
- Issue分解結果は`docs/hands-on/ISSUES.md`に出力
- 実装は`app/`ディレクトリ内に作成
