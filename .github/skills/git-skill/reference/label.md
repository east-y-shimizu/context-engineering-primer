# ラベル管理

GitHubのラベルを管理する手順です。

## 前提条件

- GitHub CLI (`gh`) がインストールされていること
- リポジトリへの書き込み権限があること

## 基本的な流れ

1. 既存ラベルの確認
2. ラベルの作成・更新・削除
3. ラベルの使用

## 手順

### 1. 既存ラベルを確認

**ラベル一覧を表示:**
```bash
gh label list
```

**詳細表示（色コード含む）:**
```bash
gh label list --limit 100
```

### 2. ラベルの作成

**基本的な作成:**
```bash
gh label create "ラベル名"
```

**説明と色を指定:**
```bash
gh label create "bug" --description "バグ報告" --color "d73a4a"
```

**対話的に作成:**
```bash
gh label create
```

### 3. ラベルの詳細を確認

```bash
gh label view "ラベル名"
```

### 4. ラベルの更新

**名前を変更:**
```bash
gh label edit "古い名前" --name "新しい名前"
```

**説明を更新:**
```bash
gh label edit "bug" --description "バグ・不具合の報告"
```

**色を更新:**
```bash
gh label edit "bug" --color "ff0000"
```

### 5. ラベルの削除

```bash
gh label delete "ラベル名"
```

**確認なしで削除:**
```bash
gh label delete "ラベル名" --yes
```

## Conventional Commits形式のラベル

このリポジトリでは、Conventional Commits形式に準拠したラベルを使用します。

### 変更の種類（Type）

| ラベル名 | 色コード | 説明 | 使用例 |
|---------|---------|------|--------|
| feat | 0e8a16 | 新機能 | 新しいAPIエンドポイント、新しいUIコンポーネント |
| fix | d73a4a | バグ修正 | クラッシュの修正、誤った動作の是正 |
| docs | 0075ca | ドキュメントのみの変更 | READMEの更新、コメントの追加 |
| style | c5def5 | コードの動作に影響しない変更 | フォーマット、空白、セミコロン |
| refactor | a2eeef | リファクタリング | 関数の分割、変数名の改善 |
| perf | fbca04 | パフォーマンス改善 | アルゴリズムの最適化、キャッシュの導入 |
| test | 0e8a16 | テストの追加・修正 | ユニットテストの追加、E2Eテストの改善 |
| build | d876e3 | ビルドシステムや外部依存関係の変更 | package.jsonの更新、webpack設定の変更 |
| ci | 1d76db | CI/CD設定やスクリプトの変更 | GitHub Actionsの追加・修正 |
| chore | ffffff | その他の変更 | .gitignoreの更新、設定ファイルの微調整 |
| revert | ffffff | 以前のコミットの取り消し | 問題のあるマージのrevert |

### 作業項目（Task）

| ラベル名 | 色コード | 説明 |
|---------|---------|------|
| task | 1d76db | 開発タスクや改善タスク |

**Task Issueでの使用:**
- Task IssueのPRでは、`task`ラベルと実際の変更内容に応じたラベルを併用
- 例: `task` + `feat`、`task` + `fix`、`task` + `refactor`

## ラベルの一括作成

Conventional Commits形式のラベルを一括作成するスクリプト例です。

### スクリプト例

```bash
#!/bin/bash

# 変更の種類（Type）
gh label create "feat" --description "新機能" --color "0e8a16"
gh label create "fix" --description "バグ修正" --color "d73a4a"
gh label create "docs" --description "ドキュメントのみの変更" --color "0075ca"
gh label create "style" --description "コードの動作に影響しない変更" --color "c5def5"
gh label create "refactor" --description "リファクタリング" --color "a2eeef"
gh label create "perf" --description "パフォーマンス改善" --color "fbca04"
gh label create "test" --description "テストの追加・修正" --color "0e8a16"
gh label create "build" --description "ビルドシステムや外部依存関係の変更" --color "d876e3"
gh label create "ci" --description "CI/CD設定やスクリプトの変更" --color "1d76db"
gh label create "chore" --description "その他の変更" --color "ffffff"
gh label create "revert" --description "以前のコミットの取り消し" --color "ffffff"

# 作業項目（Task）
gh label create "task" --description "開発タスクや改善タスク" --color "1d76db"
```

実行:
```bash
chmod +x create-labels.sh
./create-labels.sh
```

## IssueやPRへのラベル付与

### Issueにラベルを追加

```bash
gh issue edit 123 --add-label "fix"
```

### Issueからラベルを削除

```bash
gh issue edit 123 --remove-label "fix"
```

### PRにラベルを追加

```bash
gh pr edit 456 --add-label "feat"
```

## ラベルの使用パターン

### Issueでの使用

- バグ報告 → `fix`
- 機能要望 → `feat`
- ドキュメント改善 → `docs`
- Task Issue → `task`

### Pull Requestでの使用

- 新機能の実装 → `feat`
- バグ修正 → `fix`
- リファクタリング → `refactor`

### 複数ラベルの併用

1つのIssue/PRに複数のラベルを付けることで、より詳細な分類が可能です。

**推奨される併用パターン:**

1. **Task Issue関連のPR**
   - `task` + `feat` - Task Issueで新機能を実装
   - `task` + `fix` - Task Issueでバグ修正
   - `task` + `refactor` - Task Issueでリファクタリング

2. **複数の変更を含むPR**
   - `feat` + `docs` - 新機能の実装とドキュメントの追加
   - `fix` + `test` - バグ修正とテストの追加
   - `refactor` + `perf` - リファクタリングとパフォーマンス改善

**注意:** 基本的には1つのPRで1つの目的を達成することを推奨します。複数のラベルが必要な場合は、PRを分割できないか検討してください。

### ラベルによる絞り込み

**特定のラベルでIssueを検索:**
```bash
gh issue list --label "fix"
```

**複数ラベルでAND検索:**
```bash
gh issue list --label "task,feat"
```

## ラベルのベストプラクティス

### 1. Conventional Commitsに準拠

- ラベル名はConventional Commits形式を使用
- `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`, `task`を主要カテゴリとして使用

### 2. 重複ラベルの統合

古いラベルは統合してください:
- `documentation` → `docs`
- `bug` → `fix`
- `enhancement` → `feat`

### 3. 一貫性を保つ

- **ラベル名** - 英語（短いキーワード）で統一
- **説明** - プロジェクトの主要言語（英語/日本語）で統一
- **色コード** - Conventional Commits形式に準拠した色を使用

### 4. 早めに付与する

Issue や PR を作成したら、すぐに適切なラベルを付与しましょう。

### 5. Task IssueのDoDを確認

Task IssueのPRを作成する場合は、Issueの完了条件・受け入れ基準（DoD）をすべて満たしていることを確認してください。

## トラブルシューティング

### ラベルが削除できない

**原因:** 使用中のラベルを削除しようとしている

**確認方法:**
```bash
gh issue list --label "削除したいラベル名"
gh pr list --label "削除したいラベル名"
```

使用中の場合は、先にIssue/PRから削除してください。

### ラベルの色コードがわからない

**参考:**
- GitHub公式のデフォルト色を参照
- カラーピッカーツールを使用（例: https://htmlcolorcodes.com/）
- 16進数カラーコード（例: `#d73a4a`の`#`なし → `d73a4a`）

### ラベルが重複している

**確認:**
```bash
gh label list | grep "ラベル名"
```

大文字小文字やスペースの違いに注意してください。

## 高度な使い方

### ラベルのエクスポート

```bash
gh label list --json name,description,color > labels.json
```

### 他のリポジトリにラベルをインポート

1. エクスポートしたJSONファイルを編集
2. スクリプトで一括作成

```bash
# JSONから読み込んで作成するスクリプト例
jq -r '.[] | "gh label create \"\(.name)\" --description \"\(.description)\" --color \"\(.color)\""' labels.json | bash
```
