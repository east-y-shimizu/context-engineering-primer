# Issue一覧

プロジェクト: バーコード読み取り書籍検索アプリ
作成日: 2026-01-15

## Issue #1: プロジェクトセットアップ

**タイトル**: `feat: プロジェクトセットアップ`

**GitHub Issue**: #1

**目的**: React + TypeScript + Vite環境を構築し、必要な依存パッケージをインストールする

**実装内容**:
- Viteでプロジェクトを作成
- package.jsonに以下の依存関係を追加：
  - `@ericblade/quagga2`: バーコード読み取りライブラリ
  - 型定義ファイル
- ディレクトリ構造を構築：
  - `src/components/`
  - `src/services/`
  - `src/types/`
- vite.config.tsの基本設定
- README.mdにセットアップ手順を記載

**DoD（完了条件）**:
- [ ] `npm install`が成功する
- [ ] `npm run dev`でViteが起動する
- [ ] TypeScriptの型エラーがない
- [ ] 必要なディレクトリが全て作成されている
- [ ] README.mdにセットアップ手順が記載されている

**ブランチ名**: `feat/project-setup`

**依存**: なし

**ラベル**: `enhancement`, `priority: high`, `setup`

---

## Issue #2: 型定義を実装

**タイトル**: `feat: 型定義を実装`

**GitHub Issue**: #2

**目的**: 書籍情報やAPIレスポンスの型を定義し、型安全性を確保する

**実装内容**:
- `src/types/book.ts`を作成
- 以下の型を定義：
  - `BookInfo`: 書籍情報の型
    - isbn: string
    - title: string
    - author: string
    - publisher: string
    - pubdate: string
    - cover?: string
  - `OpenBDResponse`: OpenBD APIのレスポンス型
  - `BarcodeResult`: バーコード読み取り結果の型

**DoD（完了条件）**:
- [ ] src/types/book.tsが作成されている
- [ ] 必要な型がすべて定義されている
- [ ] TypeScriptの型エラーがない
- [ ] 各型にJSDocコメントが付与されている
- [ ] オプショナルプロパティが適切に設定されている

**ブランチ名**: `feat/type-definitions`

**依存**: Issue #1（プロジェクトセットアップ）が完了している必要がある

**ラベル**: `enhancement`, `priority: high`, `typescript`

---

## Issue #3: OpenBD API連携サービスを実装

**タイトル**: `feat: OpenBD API連携サービスを実装`

**GitHub Issue**: #3

**目的**: OpenBD APIとの通信を行い、ISBNから書籍情報を取得する機能を実装する

**実装内容**:
- `src/services/openbd.ts`を作成
- 以下の関数を実装：
  - `fetchBookInfo(isbn: string): Promise<BookInfo | null>`
    - OpenBD APIにリクエストを送信
    - レスポンスをパース
    - エラーハンドリング（API通信エラー、書籍情報なし）
- ユニットテストを作成（可能であれば）

**DoD（完了条件）**:
- [ ] src/services/openbd.tsが作成されている
- [ ] fetchBookInfo関数が実装されている
- [ ] 正常系の動作が確認できている
- [ ] エラー時に適切にnullまたはエラーを返す
- [ ] TypeScriptの型エラーがない
- [ ] JSDocコメントが付与されている

**ブランチ名**: `feat/openbd-api-service`

**依存**: Issue #2（型定義）が完了している必要がある

**ラベル**: `enhancement`, `priority: high`, `api`

---

## Issue #4: BarcodeScanner コンポーネントを実装

**タイトル**: `feat: BarcodeScanner コンポーネントを実装`

**GitHub Issue**: #4

**目的**: 画像アップロードとバーコード読み取り機能を提供するコンポーネントを実装する

**実装内容**:
- `src/components/BarcodeScanner.tsx`を作成
- 以下の機能を実装：
  - ファイル選択ボタン
  - 画像プレビュー表示
  - @ericblade/quagga2を使用したバーコード読み取り
  - 読み取り結果をonScanコールバックで親コンポーネントに通知
  - 処理中のローディング表示
  - エラーメッセージ表示（バーコード検出失敗時）
- Props型を定義：
  - `onScan: (isbn: string) => void`

**DoD（完了条件）**:
- [ ] BarcodeScanner.tsxが作成されている
- [ ] ファイル選択機能が動作する
- [ ] 画像プレビューが表示される
- [ ] ISBNバーコードが正しく読み取れる
- [ ] 読み取り結果がonScanコールバックで渡される
- [ ] ローディング状態が表示される
- [ ] エラーメッセージが適切に表示される
- [ ] TypeScriptの型エラーがない

**ブランチ名**: `feat/barcode-scanner-component`

**依存**: Issue #1（プロジェクトセットアップ）が完了している必要がある

**ラベル**: `enhancement`, `priority: high`, `component`

---

## Issue #5: BookDisplay コンポーネントを実装

**タイトル**: `feat: BookDisplay コンポーネントを実装`

**GitHub Issue**: #5

**目的**: 書籍情報を読みやすく表示するコンポーネントを実装する

**実装内容**:
- `src/components/BookDisplay.tsx`を作成
- 以下の機能を実装：
  - 書籍情報の表示（ISBN、タイトル、著者、出版社、発行日、表紙画像）
  - 情報が取得できない項目は「不明」と表示
  - 表紙画像が利用可能な場合は表示
  - データが存在しない場合の非表示対応
- Props型を定義：
  - `bookInfo: BookInfo | null`

**DoD（完了条件）**:
- [ ] BookDisplay.tsxが作成されている
- [ ] 書籍情報が正しく表示される
- [ ] 表紙画像が表示される（利用可能な場合）
- [ ] 情報がない項目は「不明」と表示される
- [ ] bookInfoがnullの場合は何も表示しない
- [ ] TypeScriptの型エラーがない
- [ ] UIが読みやすい

**ブランチ名**: `feat/book-display-component`

**依存**: Issue #2（型定義）が完了している必要がある

**ラベル**: `enhancement`, `priority: high`, `component`

---

## Issue #6: App コンポーネントで統合

**タイトル**: `feat: App コンポーネントで統合`

**GitHub Issue**: #6

**目的**: 各コンポーネントとサービスを統合し、アプリケーション全体の動作を実現する

**実装内容**:
- `src/App.tsx`を実装
- 状態管理：
  - `bookInfo: BookInfo | null` - 書籍情報
  - `loading: boolean` - API呼び出し中の状態
  - `error: string | null` - エラーメッセージ
- 処理フロー：
  1. BarcodeScannerからISBNを受け取る
  2. OpenBD APIを呼び出す
  3. 書籍情報をBookDisplayに渡す
  4. エラーハンドリング
- UIレイアウト：
  - ヘッダー
  - BarcodeScannerコンポーネント
  - ローディング表示
  - エラーメッセージ表示
  - BookDisplayコンポーネント
  - フッター

**DoD（完了条件）**:
- [ ] App.tsxが実装されている
- [ ] バーコード読み取りから書籍情報表示まで動作する
- [ ] ローディング状態が適切に表示される
- [ ] エラーメッセージが適切に表示される
- [ ] 基本的なレイアウトが整っている
- [ ] TypeScriptの型エラーがない
- [ ] コンソールエラーがない

**ブランチ名**: `feat/app-integration`

**依存**: 
- Issue #3（OpenBD API連携サービス）が完了している必要がある
- Issue #4（BarcodeScannerコンポーネント）が完了している必要がある
- Issue #5（BookDisplayコンポーネント）が完了している必要がある

**ラベル**: `enhancement`, `priority: high`, `integration`

---

## Issue #7: UIデザインとレスポンシブ対応を実装

**タイトル**: `style: UIデザインとレスポンシブ対応を実装`

**GitHub Issue**: #7

**目的**: UI要件に基づいたデザインを適用し、レスポンシブ対応を実装する

**実装内容**:
- `src/App.css`を実装
- ヘッダーのスタイリング：
  - タイトル（📚 バーコード読み取り書籍検索）
  - サブタイトル
- アップロードエリアのスタイリング：
  - ボタンスタイル（緑色 #4CAF50、ホバー効果）
  - 画像プレビュー（最大幅100%、最大高さ300px、角丸、シャドウ）
- 書籍情報表示エリアのスタイリング：
  - 背景色、パディング、角丸
  - ラベルと値のスタイル
- エラーメッセージのスタイリング：
  - 背景色（#ffebee）、文字色（#f44336）
- フッターのスタイリング：
  - グレー、小さめフォント
- レスポンシブ対応：
  - 画面幅600px以下でのレイアウト調整
  - タッチ操作に適したサイズ

**DoD（完了条件）**:
- [ ] App.cssが実装されている
- [ ] UI要件に記載されたデザインが適用されている
- [ ] 画面幅600px以下でレイアウトが崩れない
- [ ] タッチ操作に対応している
- [ ] フォントサイズが読みやすい
- [ ] デスクトップとモバイルで動作確認済み

**ブランチ名**: `style/ui-design-responsive`

**依存**: Issue #6（App統合）が完了している必要がある

**ラベル**: `style`, `priority: medium`, `design`

---

## Issue #8: エラーハンドリングとパフォーマンス改善

**タイトル**: `feat: エラーハンドリングとパフォーマンス改善`

**GitHub Issue**: #8

**目的**: 非機能要件に基づいてエラーハンドリングとパフォーマンスを改善する

**実装内容**:
- エラーハンドリング強化：
  - バーコード検出失敗時の詳細なエラーメッセージ
  - API通信エラー時のリトライロジック（オプション）
  - 書籍情報が見つからない場合の適切なメッセージ
  - エラー表示の視覚的な強調
- パフォーマンス改善：
  - 画像読み取り処理の最適化
  - ローディングインジケーターの適切な表示
  - タイムアウト設定（バーコード読み取り: 5秒、API呼び出し: 3秒）
- ユーザビリティ向上：
  - 成功時のフィードバック
  - 連続スキャン対応

**DoD（完了条件）**:
- [ ] エラーメッセージが詳細でわかりやすい
- [ ] エラーメッセージが視覚的に目立つ
- [ ] 画像読み取りが5秒以内に完了する（または失敗する）
- [ ] API呼び出しが3秒以内に完了する（または失敗する）
- [ ] ローディング中はインジケーターが表示される
- [ ] ユーザー体験がスムーズである
- [ ] TypeScriptの型エラーがない

**ブランチ名**: `feat/error-handling-performance`

**依存**: Issue #7（UIデザイン）が完了している必要がある

**ラベル**: `enhancement`, `priority: medium`, `error-handling`, `performance`

---

## 依存関係図

```
Issue #1: プロジェクトセットアップ
    ↓
    ├──→ Issue #2: 型定義 ──→ Issue #3: OpenBD API連携
    │                    └──→ Issue #5: BookDisplay
    └──→ Issue #4: BarcodeScanner
              ↓
              └───→ Issue #6: App統合 ←─ (Issue #3, #4, #5)
                       ↓
                    Issue #7: UIデザイン
                       ↓
                    Issue #8: エラーハンドリング・パフォーマンス
```

## 並行作業可能なIssue

- Issue #2（型定義）とIssue #4（BarcodeScanner）は並行して作業可能
- Issue #3（OpenBD API）とIssue #4（BarcodeScanner）は並行して作業可能
- Issue #3（OpenBD API）とIssue #5（BookDisplay）は並行して作業可能（Issue #2完了後）

## 推奨実装順序

1. **Phase 1: セットアップ**（1日）
   - Issue #1: プロジェクトセットアップ

2. **Phase 2: 基盤実装**（2-3日）
   - Issue #2: 型定義
   - Issue #4: BarcodeScannerコンポーネント（並行可）
   - Issue #3: OpenBD API連携サービス
   - Issue #5: BookDisplayコンポーネント

3. **Phase 3: 統合**（1-2日）
   - Issue #6: App統合

4. **Phase 4: 品質向上**（1-2日）
   - Issue #7: UIデザイン
   - Issue #8: エラーハンドリング・パフォーマンス

**総見積もり**: 5-8日

## ラベル一覧

- `enhancement`: 新機能
- `style`: スタイリング
- `priority: high`: 高優先度
- `priority: medium`: 中優先度
- `setup`: プロジェクトセットアップ
- `typescript`: TypeScript関連
- `api`: API連携
- `component`: コンポーネント実装
- `integration`: 統合
- `design`: デザイン
- `error-handling`: エラーハンドリング
- `performance`: パフォーマンス

## 次のステップ

1. このIssue一覧をレビューする
2. GitHub Issueとして登録する（`gh` CLIまたは手動）
3. 適切なラベルとマイルストーンを設定する
4. Issue #1から実装を開始する
