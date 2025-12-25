# バーコード読み取りアプリ開発ハンズオン

書籍のバーコード画像から ISBN を読み取り、OpenBD API を使って書籍情報を表示するウェブアプリケーションを開発します。

実践的な Git/GitHub 運用と TDD（テスト駆動開発）のワークフローを体験しながら学習します。

## 完成イメージ

### 機能
- 📸 バーコード画像のアップロード
- 🔍 ISBNバーコードの自動読み取り
- 📚 OpenBD APIから書籍情報を取得
- 📖 書籍情報の表示（タイトル、著者、出版社、発行日、表紙画像）

### 技術スタック
- React + TypeScript + Vite
- @ericblade/quagga2（バーコード読み取り）
- OpenBD API（日本の書籍情報、無料・APIキー不要）
- Vitest + Testing Library（テスト）

---

## Step 1: 要件定義を読む

### やること
- [ ] 要件定義を読んで理解する

### 手順

[要件定義](./01-requirements.md)を開いて、以下を確認してください：

**確認項目**:
- [ ] 機能要件（FR-01〜FR-04）を読んだ
- [ ] 非機能要件（NFR-01〜NFR-03）を読んだ
- [ ] UI要件（ワイヤーフレーム）を確認した
- [ ] 技術要件を確認した
- [ ] ディレクトリ構成を確認した

---

## Step 2: Issue分解する

### やること
- [ ] issue-breakdown-skillを使って要件をIssueに分解する
- [ ] 分解結果を`docs/hands-on/ISSUES.md`に出力する

### 手順

エージェントに以下のように依頼してください：

```
スキルを使って、要件定義文書を
Issueに分解してください。結果をdocs/hands-on/ISSUES.mdに出力してください。
```

**スキルが自動的に**:
1. 要件定義を読む
2. フロントエンド新機能パターンで分解
3. 各IssueのDoD（完了条件）を定義
4. 依存関係を整理
5. `docs/hands-on/ISSUES.md`に出力

**確認項目**:
- [ ] `docs/hands-on/ISSUES.md`が作成された
- [ ] 各IssueにDoDが定義されている
- [ ] Issueタイトルが`feat:`などのConventional Commits形式
- [ ] 依存関係が整理されている

---

## Step 3: GitHub Issueを登録する

### やること
- [ ] git-skillを使ってGitHub Issueを登録する
- [ ] GitHub Issue番号を`docs/hands-on/ISSUES.md`に紐づける

### 手順

エージェントに以下のように依頼してください：

```
スキルを使って、docs/hands-on/ISSUES.mdのIssueをGitHubに登録してください。
登録後、GitHub Issue番号をdocs/hands-on/ISSUES.mdに紐づけてください。
```

**スキルが自動的に**:
1. `docs/hands-on/ISSUES.md`を読む
2. 各Issueを`gh issue create`で登録
3. 適切なラベルを付与
4. 作成されたGitHub Issue番号を`docs/hands-on/ISSUES.md`に記録

**または手動で登録**:
```bash
# Issue #1の例
gh issue create \
  --title "feat: プロジェクトセットアップ" \
  --body "..." \
  --label "enhancement"
# → GitHub Issue #42 が作成される

# docs/hands-on/ISSUES.md を更新
# Issue #1のセクションに「**GitHub Issue**: #42」を追記
```

**確認項目**:
- [ ] GitHubにIssueが登録された
- [ ] 各Issueにラベルが付与されている
- [ ] DoDが本文に記載されている
- [ ] `docs/hands-on/ISSUES.md`にGitHub Issue番号が記録されている

---

## Step 4: Issue #1を実装する（プロジェクトセットアップ）

### やること
- [ ] ブランチを作成する
- [ ] TDD実装する
- [ ] PRを作成する

### 手順

#### 4-1. ブランチを作成

エージェントに以下のように依頼してください：

```
スキルを使って、Issue #1のブランチを作成してください。
```

**スキルが自動的に**:
```bash
git checkout main
git pull origin main
git checkout -b feat/setup-project
```

#### 4-2. TDD実装

エージェントに以下のように依頼してください：

```
スキルを使って、Issue #1を実装してください。
```

**スキルが自動的に**:
1. **Red**: 失敗するテストを書く
2. **Green**: テストが通る最小限の実装
3. **Refactor**: コードを改善

**実装内容**（Issue #1の例）:
- Vite + React + TypeScript プロジェクト作成
- 必要な依存パッケージのインストール
- ディレクトリ構成の作成
- README.md の作成

**確認項目**:
- [ ] `npm run dev` で開発サーバーが起動する
- [ ] `npm run test` でテストが実行できる
- [ ] `npm run build` でビルドが成功する

#### 4-3. コミット

エージェントに以下のように依頼してください：

```
スキルを使って、変更をコミットしてください。
```

**スキルが自動的に**:
```bash
git add .
git commit -m "feat: Vite + React + TypeScript プロジェクトをセットアップ"
```

#### 4-4. プッシュとPR作成

エージェントに以下のように依頼してください：

```
git-skillを使って、プッシュしてPRを作成してください。
```

**スキルが自動的に**:
```bash
git push -u origin feat/setup-project
gh pr create --title "feat: プロジェクトセットアップ" --body "..."
```

**確認項目**:
- [ ] PRが作成された
- [ ] PR本文にDoDが記載されている
- [ ] CIが実行されている

---

## Step 5: リファクタリング（必要に応じて）

### やること
- [ ] refactor-skillを使ってコードを改善する

### 手順

コードを改善したい場合、エージェントに以下のように依頼してください：

```
スキルを使って、最近更新されたコードをリファクタリングしてください。
```

**スキルが自動的に**:
1. Tidy Firstアプローチで構造変更と動作変更を分離
2. 構造変更をコミット
3. 動作変更をコミット

---

## Step 6: PR マージ後、次のIssueへ

### やること
- [ ] PRがマージされたらブランチを削除
- [ ] 次のIssue（#2）を開始

### 手順

エージェントに以下のように依頼してください：

```
スキルを使って、PRマージ後のクリーンアップをして、Issue #2のブランチを作成してください。
```

**スキルが自動的に**:
```bash
git checkout main
git pull origin main
git branch -d feat/setup-project
git checkout -b feat/openbd-api
```

---

## Step 7: Issue #2〜#7を繰り返す

Issue #2以降も同じワークフローを繰り返します：

1. **ブランチ作成** - git-skill
2. **TDD実装** - tdd-skill
3. **リファクタリング**（必要に応じて） - refactor-skill
4. **コミット** - git-skill
5. **PR作成** - git-skill
6. **次のIssueへ** - git-skill

### Issue一覧

- **Issue #1**: プロジェクトセットアップ ✅
- **Issue #2**: 型定義とAPI連携実装
- **Issue #3**: バーコードスキャナーコンポーネント実装
- **Issue #4**: 書籍情報表示コンポーネント実装
- **Issue #5**: メインアプリ統合
- **Issue #6**: スタイリング
- **Issue #7**: エラーハンドリング改善

---

## 完成！

全てのIssueが完了したら、バーコード読み取りアプリの完成です。

### 動作確認

```bash
cd app
npm run dev
```

ブラウザで http://localhost:5173 を開いて、以下を試してください：

1. バーコード画像をアップロード
2. ISBNが自動読み取りされる
3. 書籍情報が表示される

---

## 学んだこと

このハンズオンを通じて、以下を実践しました：

- ✅ **Issue分解** - issue-breakdown-skill
- ✅ **Git/GitHub運用** - git-skill（ブランチ、コミット、PR）
- ✅ **TDD開発** - tdd-skill（Red-Green-Refactor）
- ✅ **リファクタリング** - refactor-skill（Tidy First）
- ✅ **Conventional Commits** - 統一されたコミットメッセージ

## 参考リソース

- [issue-breakdown-skill](../../.github/skills/issue-breakdown-skill/SKILL.md)
- [git-skill](../../.github/skills/git-skill/SKILL.md)
- [tdd-skill](../../.github/skills/tdd-skill/SKILL.md)
- [refactor-skill](../../.github/skills/refactor-skill/SKILL.md)

## トラブルシューティング

### スキルが見つからない

スキルは`.github/skills/`ディレクトリに配置されています。エージェントがスキルを認識しない場合は、プロンプトに明示的にスキル名を含めてください。

### テストが失敗する

tdd-skillのRed-Green-Refactorサイクルに従って、1つずつテストを追加・修正してください。

### PRが作成できない

GitHub CLIが必要です：
```bash
brew install gh
gh auth login
```
