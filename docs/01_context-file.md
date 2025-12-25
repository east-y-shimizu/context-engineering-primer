# コンテキストファイルによるCopilot制御

GitHub Copilotに適切なコンテキストを提供することで、より精度の高いコード補完や提案を得ることができます。

## 1. `.github/copilot-instruction.md` - リポジトリ全体の指示

### 概要
リポジトリのルートに配置し、**プロジェクト全体**に適用されるカスタム指示を定義します。

### 特徴
- すべてのチャット質問に自動的に追加される
- Markdown形式で自然言語で記述
- 最大2ページまで
- バージョン管理対象（Gitで管理）

### 推奨される5つのセクション（2025年ベストプラクティス）

1. **プロジェクト概要** - アプリケーションの目的と概要
2. **技術スタック** - 使用している言語、フレームワーク、ツール
3. **コーディングガイドライン** - 命名規則、インデント、コーディング規約
4. **プロジェクト構造** - ディレクトリ構成
5. **既存ツールとリソース** - 利用可能なツールやテストフレームワーク

テンプレートは`.github/copilot-instruction.md`を参照してください。

## 2. `.github/instructions/` - ファイル・パス単位の指示

### 概要
`.github/instructions`フォルダ内に複数の`.instructions.md`ファイルを作成し、**特定のファイルやディレクトリ**に対してのみ適用される指示を定義します。

### 特徴
- YAML frontmatterで設定を記述
- パスやファイルタイプごとに異なる指示を適用可能
- きめ細かな制御が可能

### YAML frontmatterのプロパティ

#### `applyTo` - パススコープ指定
特定のパスやディレクトリに指示を適用します。

```yaml
---
applyTo: "app/models/**/*.rb"
---
```

#### `excludeAgent` - エージェント別制御（2025年11月新機能）
どのCopilotエージェントに適用するかを制御します。

- `excludeAgent: "code-review"` - コードレビューから除外
- `excludeAgent: "coding-agent"` - コーディングエージェントから除外

### 使用例

テンプレートは`.github/instructions/example.instructions.md`を参照してください。

実際の使用例:
- `models.instructions.md` - データモデル用（`applyTo: "src/models/**/*.ts"`）
- `tests.instructions.md` - テストファイル用（`applyTo: "**/*.test.ts"`）
- `react-components.instructions.md` - Reactコンポーネント用（`applyTo: "src/components/**/*.tsx"`）

## 3. ファイル配置の違い

| ファイル | 適用範囲 | 用途 |
|---------|---------|------|
| `.github/copilot-instruction.md` | リポジトリ全体 | プロジェクト共通のルールや技術スタック |
| `.github/instructions/*.instructions.md` | 特定のファイル・パス | ファイルタイプ別の細かい指示 |

## 4. ベストプラクティス

### DO（推奨）
- 簡潔で明確な指示を書く
- プロジェクトの進化に合わせて更新する
- チーム全体で共有し、バージョン管理する
- ファイルタイプごとに異なる規約がある場合は`.instructions.md`を使う

### DON'T（非推奨）
- 長すぎる指示を書く（2ページ以内）
- 完璧を目指して何も書かない
- 全体に適用すべきルールを個別ファイルに分散させる

## 5. 参考リソース

- [GitHub Copilot公式ドキュメント](https://docs.github.com/copilot)
- [カスタム指示の追加方法](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [VS Codeでのカスタム指示](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [5 tips for writing better custom instructions](https://github.blog/ai-and-ml/github-copilot/5-tips-for-writing-better-custom-instructions-for-copilot/)
- [Awesome GitHub Copilot](https://github.com/github/awesome-copilot)
