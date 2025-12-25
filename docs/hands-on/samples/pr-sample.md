# サンプルPR: プロジェクトセットアップ

このファイルは、PR #1「プロジェクトセットアップ」のサンプルです。

実際のGitHub Pull Requestでは、以下のように記載します。

---

## タイトル

```
feat: Vite + React + TypeScript プロジェクトをセットアップ
```

## 本文

### 関連Issue

Closes #1

### 変更内容

このPRは、バーコード読み取りアプリの開発環境とプロジェクト基盤を構築します。

#### 実装内容

- **プロジェクト作成**: Vite + React + TypeScript
- **依存パッケージのインストール**:
  - `@ericblade/quagga2` - バーコード読み取りライブラリ
  - `vitest`, `@testing-library/react` 等 - テスト関連
  - `msw` - API モック
- **ディレクトリ構成の作成**:
  ```
  src/
  ├── components/      # 共通コンポーネント
  ├── services/        # API連携サービス
  ├── types/           # TypeScript型定義
  ├── hooks/           # カスタムフック
  ├── test/            # テストユーティリティ
  ├── App.tsx          # メインアプリ
  ├── App.css          # スタイル
  └── main.tsx         # エントリーポイント
  ```
- **Vitest設定**: `vite.config.ts` にテスト設定を追加
- **テストセットアップ**: `src/test/setup.ts` を作成
- **README.md**: プロジェクト概要と起動方法を記載

#### 技術スタック

- **React**: 18.3.1
- **TypeScript**: 5.6.2
- **Vite**: 6.0.5
- **Vitest**: 3.0.0
- **@ericblade/quagga2**: 1.8.4

### DoD確認

- [x] `npm run dev` で開発サーバーが起動する (http://localhost:5173)
- [x] `npm run test` でテストが実行できる
- [x] `npm run build` でビルドが成功する
- [x] ディレクトリ構成が要件定義通りに作成されている
- [x] README.md にプロジェクト概要と起動方法が記載されている
- [x] Vitestの設定ファイル (`vite.config.ts`) が作成されている
- [x] テスト用セットアップファイル (`src/test/setup.ts`) が作成されている
- [x] TypeScriptの型チェックが通る (`npm run type-check`)

### テスト結果

```bash
$ npm run test

 ✓ src/App.test.tsx (1)
   ✓ App
     ✓ renders without crashing

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  14:32:15
   Duration  892ms
```

```bash
$ npm run build

vite v6.0.5 building for production...
✓ 42 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-CZJg8xQs.css    1.42 kB │ gzip:  0.73 kB
dist/assets/index-DiwrgTda.js   143.42 kB │ gzip: 46.11 kB
✓ built in 1.23s
```

```bash
$ npm run type-check

✨  Done in 2.34s.
```

### スクリーンショット

#### 開発サーバー起動

```
  VITE v6.0.5  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 初期画面

初期状態のViteテンプレートが表示されます。

### ファイル構成

```
app/
├── public/
├── src/
│   ├── assets/
│   ├── components/         # 新規作成
│   ├── services/           # 新規作成
│   ├── types/              # 新規作成
│   ├── hooks/              # 新規作成
│   ├── test/               # 新規作成
│   │   └── setup.ts        # 新規作成
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md               # 新規作成
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts          # 更新（test設定追加）
```

### レビューポイント

以下の点を重点的にレビューしてください：

1. **ディレクトリ構成**: 要件定義通りに作成されているか
2. **依存パッケージ**: 必要なパッケージがインストールされているか
3. **Vitest設定**: テストが正しく実行できるか
4. **TypeScript設定**: 型チェックが通るか
5. **README**: 起動方法が明確に記載されているか

### 補足

- このPRでは、プロジェクトの基盤を構築しました
- 次のPRで、型定義とOpenBD API連携を実装します（Issue #2）
- コンポーネントの実装は Issue #3, #4 で行います

### 参考

- [Issue #1](https://github.com/username/repo/issues/1)
- [要件定義](../docs/hands-on/01-requirements.md)
- [Vite公式ドキュメント](https://vitejs.dev/)

---

## PRテンプレート（コピー用）

以下をGitHubのPR作成画面にコピーして使用してください：

```markdown
### 関連Issue
Closes #1

### 変更内容
バーコード読み取りアプリの開発環境とプロジェクト基盤を構築します。

- Vite + React + TypeScript プロジェクト作成
- 依存パッケージのインストール（@ericblade/quagga2, vitest等）
- ディレクトリ構成の作成
- Vitest設定
- README.md 作成

### DoD確認
- [x] `npm run dev` で開発サーバーが起動する
- [x] `npm run test` でテストが実行できる
- [x] `npm run build` でビルドが成功する
- [x] ディレクトリ構成が要件定義通りに作成されている
- [x] README.md にプロジェクト概要と起動方法が記載されている
- [x] Vitestの設定ファイルが作成されている
- [x] テスト用セットアップファイルが作成されている
- [x] TypeScriptの型チェックが通る

### テスト結果
```bash
$ npm run test
 ✓ src/App.test.tsx (1)
 Test Files  1 passed (1)
```

### レビューポイント
1. ディレクトリ構成が要件定義通りか
2. 必要なパッケージがインストールされているか
3. テストが正しく実行できるか
```

## PR作成の流れ

### 1. ブランチをプッシュ

```bash
git push -u origin feat/setup-project
```

### 2. PR作成

#### GitHub CLIを使う場合（推奨）

```bash
gh pr create
```

対話的に以下を入力：
- タイトル: `feat: Vite + React + TypeScript プロジェクトをセットアップ`
- 本文: 上記のテンプレートを貼り付け

#### GitHub Web UIを使う場合

1. GitHubリポジトリページで「Pull requests」タブを開く
2. 「New pull request」をクリック
3. base: `main` ← compare: `feat/setup-project` を選択
4. 「Create pull request」をクリック
5. タイトルと本文を記入（上記のテンプレート使用）
6. 「Create pull request」で作成

### 3. レビュー待ち

CIが実行され、レビュワーがコードをレビューします。

### 4. レビューフィードバックへの対応

レビューコメントがあれば、修正してプッシュします：

```bash
# 修正
git add .
git commit -m "fix: レビューフィードバックを反映"
git push
```

### 5. マージ

レビューが承認されたら、PRをマージします。

### 6. クリーンアップ

```bash
# mainブランチに戻る
git checkout main

# 最新を取得
git pull origin main

# 作業ブランチを削除
git branch -d feat/setup-project
```

## PR作成時のベストプラクティス

### 1. タイトルはConventional Commits形式

```
feat: 新機能の説明
fix: バグ修正の説明
refactor: リファクタリングの説明
```

### 2. 関連Issueを必ず記載

```markdown
Closes #1
```

これにより、PRがマージされるとIssueが自動的にクローズされます。

### 3. DoDを全てチェック

Issue作成時に定義したDoDが全て完了していることを確認します。

### 4. テスト結果を記載

テストが通っていることを証明します。

### 5. レビューポイントを明示

レビュワーが注目すべき点を記載します。

### 6. スクリーンショットを添付（UI変更の場合）

視覚的な変更がある場合は、スクリーンショットを添付します。

## PR作成後の流れ

```
PR作成
  ↓
CI実行（テスト、ビルド、型チェック）
  ↓
レビュー依頼
  ↓
レビュワーがコードレビュー
  ↓
フィードバック対応（必要に応じて）
  ↓
承認
  ↓
マージ
  ↓
Issueクローズ
  ↓
次のIssueへ
```

## 参考リソース

- [GitHub運用ガイド](../03-github-workflow.md)
- [git-skill/reference/pr.md](../../../.github/skills/git-skill/reference/pr.md)
- [GitHub Docs - About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
