# Issue分解ガイド

## Issue分解の目的

要件定義を実装可能な単位（Issue）に分解することで、以下のメリットが得られます：

- **進捗の可視化**: 各Issueの完了状況で全体の進捗を把握できる
- **レビューの効率化**: 小さな単位でのコードレビューが可能
- **並行作業**: 複数の開発者が異なるIssueを同時に進められる
- **リスク管理**: 問題が発生した場合の影響範囲を限定できる
- **TDD実践**: 各Issueでテスト駆動開発のサイクルを回せる

## Issue分解の基本原則

### 1. 独立性（Independence）
各Issueはできるだけ独立して実装・テスト・デプロイできる単位にします。

### 2. 適切なサイズ（Right Size）
- 大きすぎる → レビューが困難、リスクが高い
- 小さすぎる → オーバーヘッドが大きい、全体像が見えにくい
- **目安**: 1-3日で完了できる規模（初級者向けは1日以内推奨）

### 3. 価値の提供（Value）
各Issueは完了時に何らかの価値（動作する機能、テストの追加など）を提供します。

### 4. テスタビリティ（Testability）
各Issueの完了条件（DoD）が明確にテスト可能であること。

## 推奨されるIssue構成

バーコード読み取りアプリを以下の7つのIssueに分解することを推奨します：

### Issue #1: プロジェクトセットアップ

**目的**: 開発環境とプロジェクト基盤の構築

**実装内容**:
- Vite + React + TypeScript プロジェクト作成
- 必要な依存パッケージのインストール
  - `@ericblade/quagga2` - バーコード読み取り
  - `vitest` - テストフレームワーク
  - `@testing-library/react` - Reactコンポーネントテスト
  - `@testing-library/jest-dom` - テスト用マッチャー
- ディレクトリ構成の作成
- README.md の作成

**DoD（完了条件）**:
- [ ] `npm run dev` で開発サーバーが起動する
- [ ] `npm run test` でテストが実行できる
- [ ] `npm run build` でビルドが成功する
- [ ] ディレクトリ構成が要件定義通りに作成されている
- [ ] README.md にプロジェクト概要と起動方法が記載されている

**ブランチ名**: `feat/setup-project`

**コミット例**: `feat: Vite + React + TypeScript プロジェクトをセットアップ`

---

### Issue #2: 型定義とAPI連携実装

**目的**: OpenBD API連携の基盤を構築

**実装内容**:
- `src/types/book.ts` - 型定義
  - `OpenBDBook` - OpenBD APIレスポンス型
  - `BookInfo` - アプリ内で使用する書籍情報型
- `src/services/openbd.ts` - API連携サービス
  - `fetchBookInfo(isbn: string)` 関数の実装
- OpenBD APIのレスポンスパース処理

**DoD（完了条件）**:
- [ ] `fetchBookInfo()` のユニットテストが書かれている
- [ ] テストが全て通る（MSWでモック）
- [ ] 正常系：書籍情報が取得できる
- [ ] 異常系：ISBNが見つからない場合に `null` を返す
- [ ] エラー系：ネットワークエラー時に適切にエラーハンドリング
- [ ] TypeScriptの型エラーがない

**ブランチ名**: `feat/openbd-api`

**コミット例**:
```
feat: OpenBD API連携サービスを実装

- BookInfo型とOpenBDBook型を定義
- fetchBookInfo関数を実装
- MSWでAPIモックを作成しテスト追加
```

**テスト例**:
```typescript
describe('fetchBookInfo', () => {
  it('ISBNから書籍情報を取得できる', async () => {
    const bookInfo = await fetchBookInfo('9784798168654');
    expect(bookInfo).toEqual({
      isbn: '9784798168654',
      title: 'リーダブルコード',
      author: 'Dustin Boswell, Trevor Foucher',
      publisher: 'オライリージャパン',
      publishDate: '2012-06-23',
      coverUrl: expect.any(String),
    });
  });

  it('存在しないISBNの場合はnullを返す', async () => {
    const bookInfo = await fetchBookInfo('0000000000000');
    expect(bookInfo).toBeNull();
  });
});
```

---

### Issue #3: バーコードスキャナーコンポーネント実装

**目的**: 画像アップロードとバーコード読み取り機能の実装

**実装内容**:
- `src/components/BarcodeScanner.tsx`
  - ファイルアップロード機能
  - 画像プレビュー表示
  - Quagga2によるバーコード読み取り
  - 読み取り結果のコールバック (`onDetected` prop)
  - エラーハンドリング

**DoD（完了条件）**:
- [ ] コンポーネントのテストが書かれている
- [ ] ファイル選択時に画像がプレビュー表示される
- [ ] バーコード読み取り中は「処理中...」と表示される
- [ ] バーコード検出成功時に `onDetected` コールバックが呼ばれる
- [ ] バーコード検出失敗時にエラーメッセージが表示される
- [ ] TypeScriptの型エラーがない
- [ ] テストが全て通る

**ブランチ名**: `feat/barcode-scanner`

**コミット例**:
```
feat: バーコードスキャナーコンポーネントを実装

- ファイルアップロード機能
- Quagga2によるバーコード読み取り
- 画像プレビュー表示
- エラーハンドリング
```

**テスト例**:
```typescript
describe('BarcodeScanner', () => {
  it('ファイル選択ボタンが表示される', () => {
    const onDetected = vi.fn();
    render(<BarcodeScanner onDetected={onDetected} />);
    expect(screen.getByText('画像を選択')).toBeInTheDocument();
  });

  it('画像選択時にプレビューが表示される', async () => {
    const onDetected = vi.fn();
    render(<BarcodeScanner onDetected={onDetected} />);

    const file = new File(['dummy'], 'barcode.png', { type: 'image/png' });
    const input = screen.getByLabelText('画像を選択');

    await userEvent.upload(input, file);

    const preview = screen.getByAltText('Selected barcode');
    expect(preview).toBeInTheDocument();
  });
});
```

---

### Issue #4: 書籍情報表示コンポーネント実装

**目的**: 取得した書籍情報を表示するUIの実装

**実装内容**:
- `src/components/BookDisplay.tsx`
  - 書籍情報の表示（ISBN、タイトル、著者、出版社、発行日）
  - 表紙画像の表示
  - ローディング状態の表示
  - データが無い場合の表示

**DoD（完了条件）**:
- [ ] コンポーネントのテストが書かれている
- [ ] 書籍情報が正しく表示される
- [ ] ローディング中は「読み込み中...」と表示される
- [ ] 書籍情報が `null` の場合は何も表示しない
- [ ] 表紙画像がある場合のみ表示される
- [ ] TypeScriptの型エラーがない
- [ ] テストが全て通る

**ブランチ名**: `feat/book-display`

**コミット例**:
```
feat: 書籍情報表示コンポーネントを実装

- 書籍情報（ISBN、タイトル、著者等）の表示
- 表紙画像の表示
- ローディング状態の表示
```

**テスト例**:
```typescript
describe('BookDisplay', () => {
  it('ローディング中は「読み込み中...」と表示される', () => {
    render(<BookDisplay book={null} isLoading={true} />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('書籍情報を表示する', () => {
    const book: BookInfo = {
      isbn: '9784798168654',
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      publisher: 'オライリージャパン',
      publishDate: '2012-06-23',
    };

    render(<BookDisplay book={book} isLoading={false} />);

    expect(screen.getByText('9784798168654')).toBeInTheDocument();
    expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
    expect(screen.getByText('Dustin Boswell')).toBeInTheDocument();
  });
});
```

---

### Issue #5: メインアプリ統合

**目的**: 各コンポーネントを統合してアプリ全体を動作させる

**実装内容**:
- `src/App.tsx`
  - 状態管理（書籍情報、ローディング、エラー）
  - バーコード検出時の処理フロー
  - BarcodeScanner と BookDisplay の統合
- ヘッダー、フッターの追加

**DoD（完了条件）**:
- [ ] 統合テストが書かれている
- [ ] 画像アップロード → バーコード読み取り → 書籍情報表示の一連の流れが動作する
- [ ] エラー時にエラーメッセージが表示される
- [ ] TypeScriptの型エラーがない
- [ ] テストが全て通る
- [ ] `npm run dev` で動作確認できる

**ブランチ名**: `feat/main-app`

**コミット例**:
```
feat: メインアプリケーションを統合

- BarcodeScanner と BookDisplay を統合
- 状態管理を実装
- バーコード検出から書籍情報表示までの処理フロー
- ヘッダーとフッターを追加
```

**テスト例**:
```typescript
describe('App', () => {
  it('バーコード検出から書籍情報表示までの統合フロー', async () => {
    render(<App />);

    // バーコード検出をシミュレート
    const scanner = screen.getByTestId('barcode-scanner');
    fireEvent.barcodeDetected(scanner, '9784798168654');

    // ローディング表示を確認
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();

    // 書籍情報が表示されるまで待つ
    await waitFor(() => {
      expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
    });
  });
});
```

---

### Issue #6: スタイリング

**目的**: UIデザインの実装とレスポンシブ対応

**実装内容**:
- `src/App.css` の作成
- 各コンポーネントのスタイル実装
- レスポンシブデザイン（モバイル対応）
- カラースキームの適用

**DoD（完了条件）**:
- [ ] デスクトップ表示が要件定義のワイヤーフレーム通りである
- [ ] モバイル表示（600px以下）でレイアウトが崩れない
- [ ] ボタンのホバー効果が実装されている
- [ ] 表紙画像が最大サイズ制限されている
- [ ] エラーメッセージが視覚的に目立つ
- [ ] フォントサイズが読みやすい

**ブランチ名**: `style/ui-design`

**コミット例**:
```
style: UIデザインとレスポンシブ対応を実装

- ヘッダー、フッター、ボタンのスタイリング
- 書籍情報表示エリアのデザイン
- モバイル対応（600px以下）
- カラースキームの適用
```

**参考**: UIコンポーネントの詳細は [要件定義](./01-requirements.md) を参照してください。

---

### Issue #7: エラーハンドリング改善

**目的**: ユーザー体験の向上とエラーケースへの対応

**実装内容**:
- バーコード読み取り失敗時の詳細エラーメッセージ
- OpenBD API通信エラー時のリトライ機能
- タイムアウト処理
- エラー状態のクリア機能

**DoD（完了条件）**:
- [ ] バーコード検出失敗時に適切なメッセージが表示される
- [ ] ネットワークエラー時に適切なメッセージが表示される
- [ ] 書籍情報が見つからない場合に適切なメッセージが表示される
- [ ] エラーメッセージが視覚的に目立つ
- [ ] エラーテストが書かれている
- [ ] テストが全て通る

**ブランチ名**: `fix/error-handling`

**コミット例**:
```
fix: エラーハンドリングを改善

- バーコード検出失敗時のエラーメッセージ改善
- API通信エラー時のユーザーフィードバック
- タイムアウト処理の追加
```

**テスト例**:
```typescript
describe('Error Handling', () => {
  it('バーコード検出失敗時にエラーメッセージを表示', async () => {
    render(<App />);

    // バーコードが検出できない画像をアップロード
    const file = new File(['invalid'], 'no-barcode.png', { type: 'image/png' });
    const input = screen.getByLabelText('画像を選択');
    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText('バーコードを検出できませんでした')).toBeInTheDocument();
    });
  });
});
```

---

## Issue作成時のチェックリスト

各Issueを作成する際は、以下を確認してください：

- [ ] タイトルがConventional Commits形式（`feat:`, `fix:`, `style:` など）
- [ ] 説明に実装内容が明記されている
- [ ] DoD（完了条件）が具体的で測定可能
- [ ] 適切なラベルが付与されている（`enhancement`, `documentation` など）
- [ ] 優先度が設定されている
- [ ] 依存関係がある場合は明記されている

## Issue間の依存関係

```
Issue #1: プロジェクトセットアップ
    ↓
Issue #2: 型定義とAPI連携  ← Issue #3: バーコードスキャナー
    ↓                              ↓
    └─────────→ Issue #5: メインアプリ統合 ←┘
                    ↓
            Issue #6: スタイリング
                    ↓
            Issue #7: エラーハンドリング
```

**並行作業可能**: Issue #2 と Issue #3、Issue #4 は独立しているため、並行して作業できます。

## Conventional Commits形式のラベル活用

各Issueには適切なConventional Commitsタイプに対応するラベルを付与します：

- `feat` - 新機能追加（Issue #1, #2, #3, #4, #5）
- `style` - スタイリング（Issue #6）
- `fix` - バグ修正・改善（Issue #7）
- `test` - テスト追加・修正
- `docs` - ドキュメント更新
- `refactor` - リファクタリング

詳細は [GitHub運用ガイド](./03-github-workflow.md) を参照してください。

## 次のステップ

Issue分解が完了したら、[GitHub運用ガイド](./03-github-workflow.md)に進んで、実際にGitHubにIssueを登録しましょう。
