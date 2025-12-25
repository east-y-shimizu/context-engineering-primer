# プルリクエスト（PR）作成

プルリクエストを作成する手順です。

## 前提条件

- GitHub CLI (`gh`) がインストールされていること
- 変更がコミット・プッシュされていること
- 作業ブランチが作成されていること

## 基本的な流れ

1. 変更内容の確認
2. PRの作成
3. PRの詳細設定（レビュアー、ラベルなど）

## 手順

### 1. 変更内容を確認

**現在のブランチを確認:**
```bash
git branch
```

**ベースブランチとの差分を確認:**
```bash
git diff main...HEAD
```

**コミット履歴を確認:**
```bash
git log main..HEAD
```

### 2. GitHub CLIでPRを作成

**対話的に作成:**
```bash
gh pr create
```

**タイトルと本文を指定して作成:**
```bash
gh pr create --title "タイトル" --body "本文"
```

**ベースブランチを指定:**
```bash
gh pr create --base main --head feat/add-new-feature
```

**Webブラウザで作成:**
```bash
gh pr create --web
```

### 3. PRの詳細設定

**レビュアーを指定:**
```bash
gh pr create --reviewer username1,username2
```

**ラベルを指定:**
```bash
gh pr create --label feat
```

**マイルストーンを指定:**
```bash
gh pr create --milestone v1.0
```

## PRテンプレートの活用

リポジトリに`.github/pull_request_template.md`がある場合、自動的に本文に挿入されます。

### テンプレート例

```markdown
## 概要
<!-- 変更内容を簡潔に説明 -->

## 変更内容
<!-- 主な変更点をリスト化 -->
-
-

## 関連Issue
<!-- 関連するIssue番号を記載 -->
Closes #

## 完了条件・受け入れ基準（DoD）の確認
<!-- Task Issueの場合、すべてのDoDを満たしていることを確認 -->
- [ ] Issue #xxx のすべてのDoDを満たしている

## チェックリスト
- [ ] ビルドが成功する
- [ ] テストが通る
- [ ] リントエラーがない
- [ ] ドキュメントを更新した（必要に応じて）
```

## PRの本文に含めるべき情報

### 必須項目

1. **概要** - 何を変更したか
2. **変更理由** - なぜこの変更が必要か
3. **関連Issue** - `Closes #123`のように記載（自動クローズ）

### 推奨項目

4. **変更内容** - 主な変更点をリスト化
5. **テスト方法** - レビュアーが確認する方法
6. **スクリーンショット** - UIの変更がある場合
7. **パフォーマンス影響** - 大きな変更の場合

## PRの管理

### PR一覧を表示

```bash
gh pr list
```

### PR詳細を表示

```bash
gh pr view 123
```

### PRをブラウザで開く

```bash
gh pr view --web
```

### PRのステータスを確認

```bash
gh pr status
```

## レビューへの対応

### コメントに返信

```bash
gh pr comment 123 --body "コメント内容"
```

### 修正後に追加コミットをプッシュ

```bash
git add .
git commit -m "レビューフィードバックに対応"
git push
```

PRは自動的に更新されます。

### レビュー承認後のマージ

```bash
gh pr merge 123
```

**マージ方法を指定:**
```bash
# マージコミットを作成
gh pr merge 123 --merge

# スカッシュマージ
gh pr merge 123 --squash

# リベースマージ
gh pr merge 123 --rebase
```

## ブランチ命名規則

PRを作成する前に、ブランチ名がConventional Commits形式に準拠していることを確認してください。

詳細は[ブランチ操作](branch.md)を参照してください。

### 基本形式

```
<type>/<description>
```

例: `feat/add-csv-import`, `fix/modal-close-bug`, `docs/update-readme`

## PRのベストプラクティス

### 小さく保つ

- 1つのPRで1つの機能・修正
- 大きな変更は複数のPRに分割
- レビューしやすいサイズ（変更行数500行以内を目安）

### 明確なタイトル

- 何を変更したか一目でわかるように
- 簡潔で具体的なタイトルを付ける
- 例: `ログイン時のエラーを修正`、`CSVインポート機能を追加`

### 適切なラベル付け

Conventional Commits形式のラベルを使用:
- 新機能 → `feat`
- バグ修正 → `fix`
- リファクタリング → `refactor`
- Task Issue関連 → `task` + 該当するタイプ

### 詳細な説明

- 変更の背景と理由を記載
- レビュアーが理解しやすいように
- Task IssueのPRの場合、DoDをすべて満たしていることを確認

### PR作成前の確認

- [ ] ビルドが成功すること
- [ ] テストがすべて通ること
- [ ] リントエラーがないこと
- [ ] 関連IssueのDoDを満たしていること（Task Issueの場合）

### CI/CDの確認

- すべてのチェックが通ってからレビュー依頼
- テストが失敗している場合は修正してから

## トラブルシューティング

### PRが作成できない

**エラー: GitHub CLIが認証されていない**

```bash
gh auth login
```

### コンフリクトが発生した

```bash
# ベースブランチの最新を取得
git checkout main
git pull

# 作業ブランチに戻ってリベース
git checkout feat/add-new-feature
git rebase main

# コンフリクトを解決
# ...

# リベースを続行
git rebase --continue

# 強制プッシュ（--force-with-leaseを推奨）
git push --force-with-lease
```

### PRを下書きにする

```bash
gh pr create --draft
```

**下書きを公開:**
```bash
gh pr ready 123
```
