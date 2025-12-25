# サンプルIssue: プロジェクトセットアップ

このファイルは、Issue #1「プロジェクトセットアップ」のサンプルです。

実際のGitHub Issueでは、以下のように記載します。

---

## タイトル

```
feat: プロジェクトセットアップ
```

## ラベル

- `enhancement` (featタイプ)
- `good first issue` (初心者向け)

## 本文

### 目的

開発環境とプロジェクト基盤の構築

### 実装内容

- Vite + React + TypeScript プロジェクト作成
- 必要な依存パッケージのインストール
  - `@ericblade/quagga2` - バーコード読み取りライブラリ
  - `vitest` - テストフレームワーク
  - `@testing-library/react` - Reactコンポーネントテスト
  - `@testing-library/jest-dom` - テスト用マッチャー
  - `@testing-library/user-event` - ユーザーイベントシミュレート
  - `jsdom` - DOM環境シミュレート
  - `msw` - API モック
- ディレクトリ構成の作成
  ```
  src/
  ├── components/
  ├── services/
  ├── types/
  ├── hooks/
  ├── test/
  ├── App.tsx
  ├── App.css
  └── main.tsx
  ```
- README.md の作成

### DoD（完了条件）

- [ ] `npm run dev` で開発サーバーが起動する (http://localhost:5173)
- [ ] `npm run test` でテストが実行できる
- [ ] `npm run build` でビルドが成功する
- [ ] ディレクトリ構成が要件定義通りに作成されている
- [ ] README.md にプロジェクト概要と起動方法が記載されている
- [ ] Vitestの設定ファイル (`vite.config.ts`) が作成されている
- [ ] テスト用セットアップファイル (`src/test/setup.ts`) が作成されている
- [ ] TypeScriptの型チェックが通る (`npm run type-check`)

### 実装のヒント

#### 1. プロジェクト作成

```bash
# Viteプロジェクトを作成
npm create vite@latest app -- --template react-ts

cd app
npm install
```

#### 2. 依存パッケージのインストール

```bash
# バーコード読み取りライブラリ
npm install @ericblade/quagga2

# テスト関連
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# API モック
npm install -D msw
```

#### 3. Vite設定

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

#### 4. テストセットアップ

**src/test/setup.ts**:
```typescript
import '@testing-library/jest-dom';
```

#### 5. package.json にスクリプト追加

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:cov": "vitest --coverage",
    "type-check": "tsc --noEmit"
  }
}
```

#### 6. ディレクトリ作成

```bash
mkdir -p src/components
mkdir -p src/services
mkdir -p src/types
mkdir -p src/hooks
mkdir -p src/test
```

#### 7. README.md 作成

プロジェクトの概要、技術スタック、起動方法を記載します。

### 参考

- [要件定義](../01-requirements.md)
- [Issue分解ガイド](../02-issue-breakdown.md)
- [Vite公式ドキュメント](https://vitejs.dev/)
- [Vitest公式ドキュメント](https://vitest.dev/)

---

## Issueテンプレート（コピー用）

以下をGitHubのIssue作成画面にコピーして使用してください：

```markdown
### 目的
開発環境とプロジェクト基盤の構築

### 実装内容
- Vite + React + TypeScript プロジェクト作成
- 必要な依存パッケージのインストール
  - `@ericblade/quagga2`
  - `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`
  - `msw`
- ディレクトリ構成の作成
- README.md の作成

### DoD（完了条件）
- [ ] `npm run dev` で開発サーバーが起動する
- [ ] `npm run test` でテストが実行できる
- [ ] `npm run build` でビルドが成功する
- [ ] ディレクトリ構成が要件定義通りに作成されている
- [ ] README.md にプロジェクト概要と起動方法が記載されている
- [ ] Vitestの設定ファイルが作成されている
- [ ] テスト用セットアップファイルが作成されている
- [ ] TypeScriptの型チェックが通る

### 参考
- [要件定義](../docs/hands-on/01-requirements.md)
```

## 作業の進め方

### 1. Issueを確認

GitHub上でこのIssueを確認し、内容を理解します。

### 2. ブランチを作成

```bash
git checkout main
git pull origin main
git checkout -b feat/setup-project
```

### 3. 実装

上記の「実装のヒント」を参考に、プロジェクトをセットアップします。

### 4. DoD確認

全てのDoDがチェックできることを確認します。

### 5. コミット

```bash
git add .
git commit -m "feat: Vite + React + TypeScript プロジェクトをセットアップ"
```

### 6. プッシュ

```bash
git push -u origin feat/setup-project
```

### 7. PR作成

```bash
gh pr create
```

PRテンプレートを使って、変更内容とDoDの確認を記載します。

詳細は [PR作成サンプル](./pr-sample.md) を参照してください。
