# エージェントスキル テンプレート

このディレクトリには、エージェントスキルを作成するためのテンプレートが含まれています。

GitHub Copilot と Claude Code の両方で利用できる標準的なスキル形式です。

## 📁 ファイル構成

```
.github/skills/example/
├── SKILL.md          # メインのスキル定義ファイル（必須）
├── reference.md      # 詳細なAPIリファレンス（オプション）
├── README.md         # このファイル - 使い方の説明
├── LICENSE           # MITライセンス
└── scripts/
    └── helper.js     # ヘルパースクリプトのサンプル（オプション）
```

## 🚀 使い方

### 1. テンプレートをコピー

新しいスキルを作成する際は、このディレクトリ全体をコピーして新しい名前を付けます。

```bash
# 新しいスキルを作成
cp -r .github/skills/example .github/skills/your-new-skill
```

### 2. SKILL.mdを編集

`SKILL.md`ファイルを開き、以下の項目を編集します。

#### 必須項目

1. **name**: スキルの一意な名前
   - 小文字、数字、ハイフンのみ使用可能
   - 最大64文字
   - 例: `code-reviewer`, `pdf-processor`, `data-analyzer`

2. **description**: スキルの説明（最重要！）
   - 最大1024文字
   - **何をするのか**を明確に記述
   - **いつ使うのか**を具体的に記述
   - AIアシスタントがこの説明を元にスキルを自動検出します

#### オプション項目

3. **allowed-tools**: 使用可能なツールを制限する場合（Claude Code専用）
   - 例: `Read, Grep, Glob` （読み取り専用）
   - 例: `Read, Write, Edit` （ファイル操作）
   - 省略した場合は全てのツールが使用可能
   - GitHub Copilotでは無視されます

### 3. 内容を記述

SKILL.mdの本文（Markdownセクション）を編集して、以下を含めます。

- **使用方法**: ステップバイステップの手順
- **例**: 具体的な使用例
- **ベストプラクティス**: 推奨される使い方
- **トラブルシューティング**: よくある問題と解決方法
- **必要な環境**: 依存関係や前提条件

### 4. reference.mdを編集（オプション）

詳細なAPIリファレンスや技術仕様が必要な場合は、`reference.md`を編集します。

- 関数/メソッドのAPI仕様
- データ構造の定義
- エラーコード一覧
- 設定オプションの詳細

### 5. 不要なファイルを削除

このREADME.mdは削除するか、スキル固有の説明に書き換えます。

```bash
# このファイルを削除する場合
rm .github/skills/your-new-skill/README.md

# または、スキル固有のREADMEに書き換える
```

## 💡 スキル作成のベストプラクティス

### 1. descriptionの書き方

**良い例**:
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

**悪い例**:
```yaml
description: Helps with documents  # 曖昧すぎる
```

### 2. 明確なキーワードを含める

ユーザーが言及しそうなキーワードをdescriptionに含めてください。

- 曖昧: 「ドキュメント処理」
- 明確: 「PDF、Excel、Word、CSVファイルの処理」

### 3. スキルの粒度

- **適切**: 「Git コミットメッセージ生成」「PDF テキスト抽出」
- **広すぎる**: 「ドキュメント処理」「データツール」
- **狭すぎる**: 「PDFの1ページ目を読む」

### 4. ツール制限の使い分け（Claude Code専用）

| ユースケース | allowed-tools 設定例 |
|-------------|---------------------|
| コードレビュー（読み取りのみ） | `Read, Grep, Glob` |
| ファイル修正 | `Read, Write, Edit` |
| Web調査 | `WebSearch, WebFetch, Read` |
| 制限なし | 設定を省略 |

注: GitHub Copilotではこの設定は無視されます。

## 📝 記述例

### 最小限のスキル例

```yaml
---
name: simple-skill
description: 簡単な処理を行います。ユーザーが「簡単」と言ったときに使用します。
---

# Simple Skill

## 使用方法

1. ステップ1
2. ステップ2
3. 完了
```

### 完全なスキル例

完全な例については、以下のスキルを参照してください。

- `.github/skills/joke/` - ジョークスキルの実例
- `.github/skills/example/SKILL.md` - このテンプレート自体

## 🧪 テスト方法

### 1. スキルの存在確認

```bash
# スキルディレクトリの確認
ls -la .github/skills/your-new-skill/

# SKILL.mdの内容確認
cat .github/skills/your-new-skill/SKILL.md
```

### 2. AIアシスタントでテスト

スキルのdescriptionに含まれるキーワードを使って質問します。

```
# descriptionに「PDF」を含む場合
「PDFファイルからテキストを抽出したい」

# AIが自動的にスキルを使用すれば成功！
```

- **Claude Code**: セッション中に自動検出
- **GitHub Copilot**: VS Code、CLI、github.comで自動検出

### 3. デバッグ

スキルが起動しない場合：

1. **YAML構文を確認**
   ```bash
   head -n 10 .github/skills/your-new-skill/SKILL.md
   ```
   - 1行目に `---` があるか
   - frontmatter が `---` で終わっているか

2. **descriptionを見直す**
   - 具体的なキーワードを含んでいるか
   - 「いつ使うのか」が明確か

3. **デバッグモードで実行**（Claude Codeの場合）
   ```bash
   claude --debug
   ```

## 📚 参考資料

- [GitHub Copilot Agent Skills](https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/)
- [About Agent Skills - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [公開スキル集](https://github.com/anthropics/skills) - 両方のAIで利用可能

## 🔄 バージョン管理

スキルをGitで管理する場合：

```bash
# スキルの追加
git add .github/skills/your-new-skill/
git commit -m "Add new skill: your-new-skill"

# チームと共有
git push
```

チームメンバーは`git pull`するだけで新しいスキルが利用可能になります。

## 📋 チェックリスト

新しいスキルを作成する際のチェックリスト：

- [ ] テンプレートをコピーした
- [ ] `name`を適切な名前に変更した
- [ ] `description`に何をするか・いつ使うかを記述した
- [ ] ユーザーが言及しそうなキーワードを含めた
- [ ] 使用方法を明確に記述した
- [ ] 具体的な例を追加した
- [ ] 必要に応じて`allowed-tools`を設定した
- [ ] テストして動作を確認した
- [ ] Gitにコミットした（チーム共有の場合）

---

**ハッピースキル作成！** 🎉
