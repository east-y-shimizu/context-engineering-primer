# GitHub運用ガイド

## このガイドの目的

実際の開発現場で使われるGit/GitHub運用のベストプラクティスを実践します。

本演習では、以下のワークフローを体験します：

1. **Issue登録** - 作業内容を明確にする
2. **ブランチ作成** - 作業を分離する
3. **実装とコミット** - Conventional Commits形式で記録
4. **プッシュ** - リモートリポジトリに反映
5. **PR作成** - レビュー依頼とマージ準備
6. **マージ** - mainブランチへの統合

## 前提知識

より詳細なGit/GitHub運用については、[git-skill](../../.github/skills/git-skill/SKILL.md)を参照してください。

## Conventional Commits形式

このプロジェクトでは、Conventional Commits形式を採用しています。

### コミットメッセージの形式

```
<type>: <subject>

[optional body]

[optional footer]
```

### 主なタイプ

| タイプ | 説明 | 例 |
|--------|------|-----|
| `feat` | 新機能追加 | `feat: バーコードスキャナーコンポーネントを実装` |
| `fix` | バグ修正 | `fix: バーコード検出エラーハンドリングを修正` |
| `docs` | ドキュメント更新 | `docs: README に起動手順を追加` |
| `style` | コードスタイル変更（動作に影響なし） | `style: レスポンシブデザインを実装` |
| `refactor` | リファクタリング | `refactor: fetchBookInfo を async/await に変更` |
| `test` | テスト追加・修正 | `test: BarcodeScanner のテストを追加` |
| `chore` | ビルドプロセス等の変更 | `chore: Vite設定を更新` |
| `perf` | パフォーマンス改善 | `perf: 画像圧縮処理を最適化` |

詳細は [git-skill/reference/commit.md](../../.github/skills/git-skill/reference/commit.md) を参照してください。

## ブランチ戦略

### ブランチ命名規則

```
<type>/<issue-description>
```

**例**:
- `feat/setup-project` - Issue #1: プロジェクトセットアップ
- `feat/openbd-api` - Issue #2: OpenBD API連携
- `feat/barcode-scanner` - Issue #3: バーコードスキャナー
- `style/ui-design` - Issue #6: スタイリング
- `fix/error-handling` - Issue #7: エラーハンドリング

### ブランチの作成

```bash
# mainブランチから最新を取得
git checkout main
git pull origin main

# 新しいブランチを作成
git checkout -b feat/setup-project
```

詳細は [git-skill/reference/branch.md](../../.github/skills/git-skill/reference/branch.md) を参照してください。

## GitHub Issue登録

### Issue作成手順

#### 1. GitHubリポジトリのIssuesタブを開く

ブラウザでリポジトリページにアクセスし、「Issues」タブをクリックします。

#### 2. 「New issue」ボタンをクリック

#### 3. Issueテンプレートを選択（または空白から作成）

本プロジェクトでは `.github/ISSUE_TEMPLATE/` にテンプレートが用意されています：
- `feature_request.md` - 新機能（featタイプ）
- `bug_report.md` - バグ修正（fixタイプ）
- `task.md` - タスク

#### 4. Issueの内容を記入

**タイトル例**:
```
feat: プロジェクトセットアップ
```

**本文例**:
```markdown
## 目的
開発環境とプロジェクト基盤の構築

## 実装内容
- Vite + React + TypeScript プロジェクト作成
- 必要な依存パッケージのインストール
  - `@ericblade/quagga2`
  - `vitest`
  - `@testing-library/react`
- ディレクトリ構成の作成
- README.md の作成

## DoD（完了条件）
- [ ] `npm run dev` で開発サーバーが起動する
- [ ] `npm run test` でテストが実行できる
- [ ] `npm run build` でビルドが成功する
- [ ] ディレクトリ構成が要件定義通りに作成されている
- [ ] README.md にプロジェクト概要と起動方法が記載されている

## 参考
- [要件定義](./docs/hands-on/01-requirements.md)
```

#### 5. ラベルを付与

Conventional Commitsタイプに対応するラベル：
- `enhancement` - feat（新機能）
- `bug` - fix（バグ修正）
- `documentation` - docs（ドキュメント）
- `test` - test（テスト）

その他の有用なラベル：
- `good first issue` - 初心者向け
- `help wanted` - ヘルプ募集
- `priority: high` - 優先度高

#### 6. Assignees、Projects、Milestoneを設定（任意）

- **Assignees**: 担当者を設定
- **Projects**: プロジェクトボードに追加
- **Milestone**: マイルストーンに紐付け

#### 7. 「Submit new issue」で作成

詳細は [git-skill/reference/issue.md](../../.github/skills/git-skill/reference/issue.md) を参照してください。

## コミット作成

### コミット前の確認

```bash
# 変更ファイルを確認
git status

# 変更内容を確認
git diff
```

### ステージングとコミット

```bash
# 変更をステージング
git add src/App.tsx
git add src/components/BarcodeScanner.tsx

# または全ての変更をステージング
git add .

# コミット
git commit -m "feat: バーコードスキャナーコンポーネントを実装"
```

### コミットメッセージの例

**Good**:
```
feat: OpenBD API連携サービスを実装

- BookInfo型とOpenBDBook型を定義
- fetchBookInfo関数を実装
- MSWでAPIモックを作成しテスト追加
```

**Bad**:
```
update files
```

詳細は [git-skill/reference/commit.md](../../.github/skills/git-skill/reference/commit.md) を参照してください。

## プッシュ

### リモートブランチへプッシュ

```bash
# 初回プッシュ（リモートブランチ作成）
git push -u origin feat/setup-project

# 2回目以降
git push
```

詳細は [git-skill/reference/push.md](../../.github/skills/git-skill/reference/push.md) を参照してください。

## プルリクエスト（PR）作成

### PR作成手順

#### 方法1: GitHub CLI（推奨）

```bash
# インタラクティブにPR作成
gh pr create

# タイトルと本文を指定
gh pr create --title "feat: プロジェクトセットアップ" --body "Issue #1 の実装"

# PRテンプレートを使用（自動適用）
gh pr create
```

#### 方法2: GitHub Web UI

1. GitHubリポジトリページで「Pull requests」タブを開く
2. 「New pull request」をクリック
3. base: `main` ← compare: `feat/setup-project` を選択
4. 「Create pull request」をクリック
5. タイトルと本文を記入
6. 「Create pull request」で作成

### PRテンプレートの活用

本プロジェクトには `.github/pull_request_template.md` が用意されています。

**PRテンプレート例**:
```markdown
## 関連Issue
Closes #1

## 変更内容
- Vite + React + TypeScript プロジェクトをセットアップ
- 必要な依存パッケージをインストール
- ディレクトリ構成を作成
- README.md を作成

## DoD確認
- [x] `npm run dev` で開発サーバーが起動する
- [x] `npm run test` でテストが実行できる
- [x] `npm run build` でビルドが成功する
- [x] ディレクトリ構成が要件定義通りに作成されている
- [x] README.md にプロジェクト概要と起動方法が記載されている

## テスト結果
```bash
$ npm run test
✓ src/App.test.tsx (1)
```

## スクリーンショット
（必要に応じて）

## レビューポイント
- ディレクトリ構成が要件通りか
- 必要なパッケージがインストールされているか
```

詳細は [git-skill/reference/pr.md](../../.github/skills/git-skill/reference/pr.md) を参照してください。

## マージとクリーンアップ

### PRマージ後の作業

```bash
# mainブランチに戻る
git checkout main

# 最新を取得
git pull origin main

# 作業ブランチを削除（ローカル）
git branch -d feat/setup-project

# 作業ブランチを削除（リモート）
git push origin --delete feat/setup-project
```

### 次のIssueへ

```bash
# 次のブランチを作成
git checkout -b feat/openbd-api
```

## ワークフロー全体像

```
┌─────────────────────────────────────────────────────────┐
│ 1. GitHub Issue登録                                      │
│    - タイトル: feat: プロジェクトセットアップ              │
│    - ラベル: enhancement                                 │
│    - DoD記載                                             │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 2. ブランチ作成                                           │
│    git checkout -b feat/setup-project                   │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 3. TDD実装                                                │
│    - Red: テストを書く                                    │
│    - Green: 実装                                          │
│    - Refactor: リファクタリング                           │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 4. コミット                                               │
│    git commit -m "feat: プロジェクトセットアップ"          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 5. プッシュ                                               │
│    git push -u origin feat/setup-project                │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 6. PR作成                                                 │
│    gh pr create                                         │
│    - PRテンプレート使用                                   │
│    - DoD確認                                             │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 7. レビュー・マージ                                        │
│    - コードレビュー                                       │
│    - CI/CD実行                                           │
│    - マージ                                              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 8. クリーンアップ・次のIssueへ                             │
│    git checkout main                                    │
│    git pull origin main                                 │
│    git checkout -b feat/openbd-api                      │
└─────────────────────────────────────────────────────────┘
```

## ラベル管理

### 推奨ラベル一覧

| ラベル | 色 | 説明 | Conventional Commits |
|--------|-----|------|----------------------|
| `enhancement` | 緑 | 新機能 | `feat` |
| `bug` | 赤 | バグ修正 | `fix` |
| `documentation` | 青 | ドキュメント | `docs` |
| `test` | 黄 | テスト | `test` |
| `refactor` | オレンジ | リファクタリング | `refactor` |
| `style` | 紫 | スタイル変更 | `style` |
| `chore` | グレー | 雑務 | `chore` |
| `good first issue` | 緑 | 初心者向け | - |
| `help wanted` | 青 | ヘルプ募集 | - |
| `priority: high` | 赤 | 優先度高 | - |
| `priority: medium` | オレンジ | 優先度中 | - |
| `priority: low` | 黄 | 優先度低 | - |

詳細は [git-skill/reference/label.md](../../.github/skills/git-skill/reference/label.md) を参照してください。

## チェックリスト

### Issue登録時
- [ ] タイトルがConventional Commits形式
- [ ] DoD（完了条件）が明確に記載されている
- [ ] 適切なラベルが付与されている
- [ ] 実装内容が具体的に記載されている

### ブランチ作成時
- [ ] ブランチ名がConventional Commits形式
- [ ] mainブランチから分岐している
- [ ] 最新のmainブランチを取得済み

### コミット時
- [ ] コミットメッセージがConventional Commits形式
- [ ] 変更内容が適切にまとまっている
- [ ] テストが通っている
- [ ] 型エラーがない

### PR作成時
- [ ] タイトルがConventional Commits形式
- [ ] 関連Issueが記載されている（`Closes #1`）
- [ ] DoDが全てチェックされている
- [ ] テスト結果が記載されている
- [ ] 必要に応じてスクリーンショットがある

## 参考リソース

- [git-skill](../../.github/skills/git-skill/SKILL.md) - Git/GitHub運用の詳細ガイド
- [Conventional Commits](https://www.conventionalcommits.org/) - 公式仕様
- [GitHub Docs](https://docs.github.com/) - GitHub公式ドキュメント

## 次のステップ

GitHub運用方法を理解したら、[TDD実装ガイド](./04-tdd-implementation.md)に進んで、実際の開発ワークフローを学びましょう。
