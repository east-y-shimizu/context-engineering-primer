# エージェントスキルの使い方

## 概要

エージェントスキルは、指示、スクリプト、リソースを含むフォルダで、AIアシスタントがプロンプトに関連すると判断したときに自動的に読み込まれます。

- **目的**: 特定のタスクを反復可能な方法で実行する手順をAIに教える
- **特徴**:
  - プロンプトに関連するときに自動的にロード
  - スキルディレクトリ内のリソース（スクリプト、設定ファイルなど）を含められる
  - リポジトリパターンやワークフローを学習させられる

## 標準化された仕組み

エージェントスキルは複数のAIアシスタントで利用できる標準化された仕組みです。

### GitHub Copilot
- 2025年12月18日に正式サポート発表
- VS Code（Insiders版、安定版は2025年1月予定）
- Copilot coding agent
- GitHub Copilot CLI

### Claude Code
- `.github/skills/` を自動的に認識
- `.claude/skills/` も利用可能（Claude専用）

## ファイル配置

```
.github/skills/
├── webapp-testing/
│   ├── SKILL.md
│   └── test-config.json
└── deployment/
    ├── SKILL.md
    └── deploy.sh
```

各スキルは `.github/skills/` ディレクトリ内にサブディレクトリを作成し、その中に `SKILL.md` ファイルを配置します。

## ファイル形式

`SKILL.md` ファイルはYAML frontmatterを持つMarkdownファイルです。

詳細は [.github/skills/example/SKILL.md](../.github/skills/example/SKILL.md) を参照してください。

### 実用例

- [joke/SKILL.md](../.github/skills/joke/SKILL.md) - プログラミングジョークを提供するスキル

## スキルの共有

`.github/skills/` ディレクトリに配置されたスキルは、GitHub Copilot と Claude Code の両方で自動的に認識されます。一度作成すれば、複数のAIアシスタントで再利用できます。

## カスタムエージェントとの違い

| 機能 | カスタムエージェント | エージェントスキル |
|------|---------------------|-------------------|
| 配置場所 | `.github/agents/` | `.github/skills/` |
| 呼び出し方法 | 明示的（`/agent` コマンド） | 自動的（関連性に基づく） |
| 用途 | 固定化された役割・ペルソナ | 特定タスクの実行手順 |
| リソース | Markdownファイルのみ | スクリプトや設定ファイルを含められる |

## 利用可能なスキル集

公開されているスキルを利用できます:
- [anthropics/skills](https://github.com/anthropics/skills) - 標準的なスキル集（GitHub Copilot、Claude Code両方で利用可能）
- [github/awesome-copilot](https://github.com/github/awesome-copilot) - コミュニティ作成のスキル

## 参考リソース

- [GitHub Copilot now supports Agent Skills](https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/)
- [About Agent Skills - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Use Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Teaching AI Your Repository Patterns](https://medium.com/ai-in-quality-assurance/github-copilot-agent-skills-teaching-ai-your-repository-patterns-01168b6d7a25)
