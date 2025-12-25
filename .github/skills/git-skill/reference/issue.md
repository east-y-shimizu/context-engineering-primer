# Issue作成

GitHubでIssueを作成する手順です。

## 前提条件

- GitHub CLI (`gh`) がインストールされていること
- リポジトリにアクセス権があること

## 基本的な流れ

1. Issue内容の整理（`docs/ISSUES.md`から読み取る、または手動で整理）
2. Issueの作成
3. Issueの詳細設定（ラベル、担当者など）
4. （オプション）Issue番号を`docs/ISSUES.md`に紐づけ

## 手順

### 1. Issue内容を整理

#### パターンA: `docs/ISSUES.md`から読み取る（推奨）

[issue-breakdown-skill](../../issue-breakdown-skill/SKILL.md)を使って作成した`docs/ISSUES.md`がある場合:

1. `docs/ISSUES.md`を読む
2. 各Issueの情報を抽出:
   - タイトル
   - 目的
   - 実装内容
   - DoD（完了条件）
   - ブランチ名
   - 依存関係
   - ラベル

3. Issue文書の番号とGitHub Issue番号を紐づけるため、作成後に`docs/ISSUES.md`を更新

#### パターンB: 手動で整理

以下の情報を明確にします：

- **タイトル** - 何の問題・要望か（50文字以内）
- **説明** - 詳細な内容
- **再現手順** - バグの場合
- **期待する動作** - バグや機能要望の場合
- **環境情報** - バグの場合（OS、ブラウザ、バージョンなど）

### 2. GitHub CLIでIssueを作成

**対話的に作成:**
```bash
gh issue create
```

**タイトルと本文を指定して作成:**
```bash
gh issue create --title "タイトル" --body "本文"
```

**Webブラウザで作成:**
```bash
gh issue create --web
```

**テンプレートを使用:**
```bash
gh issue create --template bug_report.md
```

### 3. Issueの詳細設定

**ラベルを指定:**
```bash
gh issue create --label enhancement
```

**担当者を指定:**
```bash
gh issue create --assignee username
```

**マイルストーンを指定:**
```bash
gh issue create --milestone v1.0
```

**プロジェクトに追加:**
```bash
gh issue create --project "Project Name"
```

### 4. `docs/ISSUES.md`にGitHub Issue番号を紐づけ（推奨）

`docs/ISSUES.md`からIssueを作成した場合、GitHub Issue番号を文書に記録します。

#### 手順

1. Issueを作成したら、GitHub Issue番号を取得
   ```bash
   # 最新のIssue番号を確認
   gh issue list --limit 1
   ```

2. `docs/ISSUES.md`の対応するIssueセクションにGitHub Issue番号を追記

   **更新前:**
   ```markdown
   ## Issue #1: プロジェクトセットアップ

   **タイトル**: `feat: プロジェクトセットアップ`
   ```

   **更新後:**
   ```markdown
   ## Issue #1: プロジェクトセットアップ（GitHub: #42）

   **タイトル**: `feat: プロジェクトセットアップ`
   **GitHub Issue**: #42
   ```

3. これにより、Issue文書とGitHub Issueの対応関係が明確になります

#### 複数のIssueを一括作成する場合

```bash
# 例: docs/ISSUES.mdから3つのIssueを作成
# Issue #1を作成
gh issue create --title "feat: プロジェクトセットアップ" --body "..." --label "enhancement"
# → GitHub Issue #42 が作成される

# Issue #2を作成
gh issue create --title "feat: 型定義とAPI連携" --body "..." --label "enhancement"
# → GitHub Issue #43 が作成される

# Issue #3を作成
gh issue create --title "feat: コアコンポーネント実装" --body "..." --label "enhancement"
# → GitHub Issue #44 が作成される

# docs/ISSUES.md を更新して対応関係を記録
```

## Issueテンプレートの活用

リポジトリに`.github/ISSUE_TEMPLATE/`がある場合、テンプレートを選択できます。

### バグ報告テンプレート例

```markdown
---
name: Bug Report
about: バグを報告する
title: ''
labels: fix
assignees: ''
---

## 概要
<!-- バグの概要を簡潔に説明 -->

## 再現手順
1.
2.
3.

## 期待する動作
<!-- 本来どうあるべきか -->

## 実際の動作
<!-- 現在どうなっているか -->

## 環境
- OS:
- ブラウザ:
- バージョン:

## スクリーンショット
<!-- あれば添付 -->
```

### 機能要望テンプレート例

```markdown
---
name: Feature Request
about: 新機能を提案する
title: ''
labels: feat
assignees: ''
---

## 概要
<!-- 提案する機能の概要 -->

## 背景・理由
<!-- なぜこの機能が必要か -->

## 提案する解決策
<!-- どのように実装するか -->

## 代替案
<!-- 他に考えられる方法 -->

## 追加コンテキスト
<!-- その他の情報 -->
```

### Task Issueテンプレート例

```markdown
---
name: Task
about: 開発タスクや改善タスク
title: ''
labels: task
assignees: ''
---

## 概要
<!-- タスクの概要 -->

## 背景
<!-- なぜこのタスクが必要か -->

## 実装内容
<!-- 何を実装するか -->
-
-

## 完了条件・受け入れ基準（DoD）
<!-- このタスクが完了したと判断する基準 -->
- [ ]
- [ ]

## 参考資料
<!-- 関連するドキュメントやリンク -->
```

## Issueの管理

### Issue一覧を表示

```bash
gh issue list
```

**フィルタリング:**
```bash
# 自分が担当のIssueのみ
gh issue list --assignee @me

# 特定のラベルで絞り込み
gh issue list --label fix

# オープンなIssueのみ
gh issue list --state open
```

### Issue詳細を表示

```bash
gh issue view 123
```

### Issueをブラウザで開く

```bash
gh issue view 123 --web
```

### Issueのステータスを確認

```bash
gh issue status
```

## Issueへのコメント

```bash
gh issue comment 123 --body "コメント内容"
```

## Issueの更新

### ラベルを追加

```bash
gh issue edit 123 --add-label "docs"
```

### 担当者を追加

```bash
gh issue edit 123 --add-assignee username
```

### マイルストーンを設定

```bash
gh issue edit 123 --milestone v1.0
```

## Issueのクローズ

```bash
gh issue close 123
```

**理由を添えてクローズ:**
```bash
gh issue close 123 --comment "修正が完了しました"
```

## Issueの再オープン

```bash
gh issue reopen 123
```

## Issueのベストプラクティス

### 明確なタイトル

- 具体的で検索しやすいタイトル
- 内容が一目でわかるタイトルを付ける

**良い例:**
- `ログインボタンが反応しない`
- `ダークモード機能を追加したい`

**悪い例:**
- `エラー` - 何のエラーか不明
- `新機能` - どんな機能か不明

### 詳細な説明

- 再現手順を具体的に記載
- スクリーンショットを活用
- エラーメッセージをコードブロックで記載

### 適切なラベル付け

Conventional Commits形式のラベルを使用:
- タイプ: `feat`, `fix`, `docs`, `refactor`など
- 作業項目: `task`

### Task IssueのDoD

Task Issueを作成する場合は、必ず「完了条件・受け入れ基準（DoD）」を明記してください。
これにより、PRレビュー時に何を確認すべきかが明確になります。

### 重複チェック

- 既存のIssueを検索して重複を避ける
- 重複の場合は既存のIssueにコメント

## Issue番号の活用

### コミットメッセージでIssueを参照

```bash
git commit -m "ログイン機能を修正 (#123)"
```

### PRでIssueを自動クローズ

PR本文に以下のキーワードを含める:
```markdown
Closes #123
Fixes #456
Resolves #789
```

マージ時にIssueが自動的にクローズされます。

## トラブルシューティング

### Issueが作成できない

**エラー: GitHub CLIが認証されていない**

```bash
gh auth login
```

### テンプレートが表示されない

`.github/ISSUE_TEMPLATE/`ディレクトリとファイルを確認:

```bash
ls -la .github/ISSUE_TEMPLATE/
```

### Issueにラベルが付けられない

リポジトリの権限を確認してください。ラベルの追加には書き込み権限が必要です。
