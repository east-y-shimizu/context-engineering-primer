# プロンプトファイルの使い方

## 概要

繰り返し利用するプロンプトや処理手順などをスラッシュコマンドで呼び出せるようにしましょう。

再利用可能なタスクテンプレートを`.github/prompts/`に配置すると、Copilot Chatからスラッシュコマンドでアクセスできるようになります。チーム共通のコードレビュー基準やテスト生成ルールなどを標準化できます。

## ファイル配置

```
.github/prompts/
├── code-review.prompt.md
├── test-generator.prompt.md
└── refactor.prompt.md
```

## ファイル形式

YAML frontmatterで設定を記述し、その後にプロンプト本文を書きます。

```markdown
---
name: "プロンプト名"
description: "このプロンプトの説明"
---

プロンプトの内容をここに記述します。
具体的な指示や要件を箇条書きで書くと効果的です。
```

## 使用例

実際のプロンプトファイルは`.github/prompts/`内のファイルを参照してください。

よくある使用例:
- `code-review.prompt.md` - コード品質レビュー
- `test-generator.prompt.md` - ユニットテスト生成
- `refactor.prompt.md` - コードリファクタリング
- `hello.prompt.md` - シンプルな動作確認用

## 使い方

1. `.github/prompts/`にプロンプトファイルを作成
2. Copilot Chatでスラッシュコマンドとして呼び出し
3. 対象コードを選択してプロンプトを実行

## ベストプラクティス

- プロンプト名は短く明確に
- 箇条書きで構造化（長文は避ける）
- 具体的な要件を明示
- チーム共通のタスクをテンプレート化

## 参考リソース

- [Use prompt files in VS Code](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [GitHub Copilot公式ドキュメント](https://docs.github.com/en/copilot/concepts/prompt-engineering)
- [Awesome GitHub Copilot](https://github.com/github/awesome-copilot)
