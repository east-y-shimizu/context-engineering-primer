# カスタムエージェントの使い方

## 概要

これは**GitHub Copilot専用**の機能です。

`.github/agents/`ディレクトリにMarkdownファイルを配置すると、特定の役割に特化したAIエージェントを定義できます。

- **目的**: 役割・口調・出力形式を固定化
- **特徴**:
  - ファイル（`.agent.md`）で役割を永続的に定義
  - チームで共有・バージョン管理できる
  - 毎回同じ振る舞いを期待できる

## 呼び出し方法

### GitHub Copilot CLI（インタラクティブセッション内）
CLIでインタラクティブセッションを開始後、`/agent <エージェント名>` スラッシュコマンドを使用

```bash
copilot
# インタラクティブセッション内で
/agent translator
```

### GitHub.com
Copilot coding agentの会話中にエージェントを選択

### コマンドライン引数
```bash
copilot --agent=translator --prompt "コメントを翻訳して"
```

## ファイル配置

以下のいずれかに配置:

```
# リポジトリ単位
.github/agents/
├── docs-writer.agent.md
├── test-engineer.agent.md
└── security-reviewer.agent.md

# 組織単位
{org}/.github/agents/
または
{org}/.github-private/agents/
```

## ファイル形式

`.agent.md`拡張子を使用し、YAML frontmatterで設定を記述します。

詳細は [example.agent.md](../.github/agents/example.agent.md) を参照してください。

## 使用例

実際の使用例:
- [translator.agent.md](../.github/agents/translator.agent.md) - コードコメント・ドキュメント翻訳
- [kansai-teacher.agent.md](../.github/agents/kansai-teacher.agent.md) - 関西弁で教える初心者向け解説
- [web-researcher.agent.md](../.github/agents/web-researcher.agent.md) - Web検索を活用した調査

## ベストプラクティス

- 具体的な役割やペルソナを定義
- 実行可能なコマンドを早い段階のセクションに記載
- 明確な境界線と責任範囲を設定
- 良い出力例を提供

## 他のAIアシスタントでの類似機能

### Claude Code
- **実行時サブエージェント**: Taskツールで呼び出す
- **違い**: 呼び出し時にプロンプトを渡す（都度指示）
- **代替案**: `.github/prompts/*.prompt.md`に役割テンプレートを保存し、呼び出し時に参照

### 共通点
- どちらも「特定の役割を持たせる」という目的は同じ
- 実装方法が異なる（ファイル固定 vs 都度指示）

## 参考リソース

- [Custom agents for GitHub Copilot](https://github.blog/changelog/2025-10-28-custom-agents-for-github-copilot/)
- [Creating custom agents - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [Using GitHub Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [GitHub Copilot CLI: Use custom agents](https://github.blog/changelog/2025-10-28-github-copilot-cli-use-custom-agents-and-delegate-to-copilot-coding-agent/)
