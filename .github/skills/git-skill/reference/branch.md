# ブランチ操作

Gitのブランチ操作とConventional Commits形式に準拠したブランチ命名規則について説明します。

## ブランチ命名規則（重要）

### 基本形式

```
<type>/<description>
```

- **`<type>`**: Conventional Commits形式のタイプ
- **`<description>`**: 簡潔な説明（ハイフン区切り、小文字推奨）

### 使用可能なタイプ

- `feat` - 新機能
- `fix` - バグ修正
- `docs` - ドキュメントのみの変更
- `style` - コードの動作に影響しない変更
- `refactor` - リファクタリング
- `perf` - パフォーマンス改善
- `test` - テストの追加・修正
- `build` - ビルドシステムや外部依存関係の変更
- `ci` - CI/CD設定やスクリプトの変更
- `chore` - その他の変更
- `revert` - 以前のコミットの取り消し

### 命名例

**基本的な形式:**
```bash
feat/add-csv-import          # CSVインポート機能の追加
fix/modal-close-bug          # モーダルクローズのバグ修正
docs/update-readme           # READMEの更新
refactor/extract-utils       # ユーティリティ関数の抽出
test/add-component-tests     # コンポーネントテストの追加
```

**Issue番号を含める場合:**
```bash
feat/123-add-csv-import      # Issue #123に関連する機能追加
fix/456-modal-close-bug      # Issue #456に関連するバグ修正
```

### 命名規則のチェックポイント

1. **タイプの一貫性** - ラベルと同じタイプを使用する
2. **説明の明確性** - ブランチの目的が一目で分かる説明を付ける
3. **命名の簡潔性** - 長すぎる説明は避け、必要最小限の情報を含める
4. **大文字小文字** - 小文字とハイフンを使用（例: `add-csv-import`、`update-readme`）

### ベストプラクティス

- **1つのブランチで1つの目的** - 1つのブランチで複数の種類の変更を行わない
- **Issue番号の活用** - 関連するIssueがある場合は、Issue番号を含めることで追跡しやすくなる
- **マージ後の削除** - マージが完了したブランチは削除する

## ブランチ操作

### 1. ブランチの作成

**新しいブランチを作成して切り替え:**
```bash
git checkout -b <type>/<description>
```

**例:**
```bash
git checkout -b feat/add-dark-mode
```

**Git 2.23以降（推奨）:**
```bash
git switch -c <type>/<description>
```

**例:**
```bash
git switch -c feat/add-dark-mode
```

### 2. ブランチの切り替え

**既存のブランチに切り替え:**
```bash
git checkout <branch-name>
```

**Git 2.23以降（推奨）:**
```bash
git switch <branch-name>
```

**例:**
```bash
git switch main
git switch feat/add-dark-mode
```

### 3. ブランチ一覧の表示

**ローカルブランチ一覧:**
```bash
git branch
```

**リモートブランチを含む一覧:**
```bash
git branch -a
```

**リモートブランチのみ:**
```bash
git branch -r
```

**詳細情報付き:**
```bash
git branch -v
```

### 4. ブランチの削除

**ローカルブランチの削除:**
```bash
git branch -d <branch-name>
```

**強制削除（マージされていなくても削除）:**
```bash
git branch -D <branch-name>
```

**リモートブランチの削除:**
```bash
git push origin --delete <branch-name>
```

**例:**
```bash
# マージ済みのブランチを削除
git branch -d feat/add-dark-mode

# リモートブランチも削除
git push origin --delete feat/add-dark-mode
```

### 5. ブランチ名の変更

**現在のブランチ名を変更:**
```bash
git branch -m <new-branch-name>
```

**別のブランチ名を変更:**
```bash
git branch -m <old-branch-name> <new-branch-name>
```

**例:**
```bash
# 現在のブランチ名を変更
git branch -m feat/add-csv-import

# 別のブランチ名を変更
git branch -m old-name feat/new-feature
```

## ブランチ戦略

### GitHub Flow（推奨）

シンプルで理解しやすいブランチ戦略です。

1. **mainブランチ** - 常にデプロイ可能な状態
2. **フィーチャーブランチ** - `<type>/<description>`形式で作成
3. **プルリクエスト** - レビューとテスト
4. **マージ** - mainブランチにマージ
5. **デプロイ** - mainブランチから自動デプロイ

**ワークフロー:**
```bash
# 1. mainブランチから最新を取得
git checkout main
git pull

# 2. フィーチャーブランチを作成
git switch -c feat/add-new-feature

# 3. 開発・コミット
git add .
git commit -m "新機能を追加"

# 4. リモートにプッシュ
git push -u origin feat/add-new-feature

# 5. PRを作成（gh CLI使用）
gh pr create

# 6. レビュー・マージ後、ブランチを削除
git switch main
git pull
git branch -d feat/add-new-feature
```

### Git Flow

複雑なリリース管理が必要な場合に使用します。

**主要ブランチ:**
- `main` - 本番環境
- `develop` - 開発環境

**サポートブランチ:**
- `feat/*` - 機能開発
- `fix/*` - バグ修正
- `release/*` - リリース準備
- `hotfix/*` - 緊急修正

## よく使うパターン

### パターン1: 機能開発

```bash
# mainから最新を取得
git checkout main
git pull

# フィーチャーブランチを作成
git switch -c feat/add-user-auth

# 開発・テスト・コミット
# ...

# プッシュしてPR作成
git push -u origin feat/add-user-auth
gh pr create
```

### パターン2: バグ修正

```bash
# mainから最新を取得
git checkout main
git pull

# バグ修正ブランチを作成
git switch -c fix/login-error

# 修正・テスト・コミット
# ...

# プッシュしてPR作成
git push -u origin fix/login-error
gh pr create
```

### パターン3: ドキュメント更新

```bash
# mainから最新を取得
git checkout main
git pull

# ドキュメント更新ブランチを作成
git switch -c docs/update-api-guide

# 更新・コミット
# ...

# プッシュしてPR作成
git push -u origin docs/update-api-guide
gh pr create
```

## トラブルシューティング

### ブランチが作成できない

**エラー: 同じ名前のブランチが既に存在**

```bash
# 既存ブランチを確認
git branch -a

# 別の名前を使用するか、既存ブランチを削除
git branch -d <existing-branch>
```

### ブランチの切り替えができない

**原因: 未コミットの変更がある**

```bash
# 変更を確認
git status

# オプション1: 変更をコミット
git add .
git commit -m "作業中の変更"

# オプション2: 変更を一時退避
git stash
git switch <branch-name>
git stash pop
```

### リモートブランチが表示されない

```bash
# リモート情報を更新
git fetch origin

# ブランチ一覧を確認
git branch -a
```

### ブランチが削除できない

**エラー: マージされていないブランチ**

```bash
# 強制削除（注意: 変更が失われます）
git branch -D <branch-name>

# マージしてから削除
git checkout main
git merge <branch-name>
git branch -d <branch-name>
```

## 参考コマンド

### ブランチの比較

```bash
# ブランチ間の差分を確認
git diff main..feat/add-new-feature

# コミット履歴の違いを確認
git log main..feat/add-new-feature
```

### マージ済みブランチの確認

```bash
# mainにマージ済みのブランチ一覧
git branch --merged main

# マージされていないブランチ一覧
git branch --no-merged main
```

### 古いブランチの整理

```bash
# マージ済みのローカルブランチを一括削除
git branch --merged main | grep -v "main" | xargs git branch -d
```
