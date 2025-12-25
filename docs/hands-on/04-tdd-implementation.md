# TDD実装ガイド

## TDD（Test-Driven Development）とは

テスト駆動開発（TDD）は、以下のサイクルを繰り返す開発手法です：

```
Red → Green → Refactor → Red → Green → Refactor → ...
```

### Red-Green-Refactorサイクル

1. **Red（失敗するテストを書く）**
   - まず、期待する動作を表すテストを書く
   - このテストは実装がないため、失敗する（赤）

2. **Green（テストを通す最小限の実装）**
   - テストが通る最小限のコードを書く
   - 品質やきれいさは後回し、まずは動かす（緑）

3. **Refactor（リファクタリング）**
   - テストが通った状態で、コードを改善する
   - テストがあるので、安心してリファクタリングできる

### TDDの利点

- **仕様の明確化**: テストが仕様書の役割を果たす
- **設計の改善**: テストしやすい設計になる
- **リファクタリングの安全性**: テストがあるので、安心してコード変更できる
- **バグの早期発見**: 実装中に問題を見つけられる
- **ドキュメント**: テストが使い方の例になる

詳細は [tdd-skill](../../.github/skills/tdd-skill/SKILL.md) を参照してください。

## 本演習でのTDD実践

バーコード読み取りアプリの各Issueで、TDDサイクルを実践します。

### テスト環境セットアップ

Issue #1（プロジェクトセットアップ）で、以下をセットアップします：

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**vite.config.ts の設定**:
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

**src/test/setup.ts の作成**:
```typescript
import '@testing-library/jest-dom';
```

## Issue #2: OpenBD API連携のTDD

### Step 1: Red（失敗するテストを書く）

**src/services/openbd.test.ts を作成**:
```typescript
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { fetchBookInfo } from './openbd';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchBookInfo', () => {
  it('ISBNから書籍情報を取得できる', async () => {
    // MSWでAPIレスポンスをモック
    server.use(
      http.get('https://api.openbd.jp/v1/get', () => {
        return HttpResponse.json([
          {
            summary: {
              isbn: '9784798168654',
              title: 'リーダブルコード',
              author: 'Dustin Boswell, Trevor Foucher',
              publisher: 'オライリージャパン',
              pubdate: '20120623',
              cover: 'https://example.com/cover.jpg',
            },
          },
        ]);
      })
    );

    const bookInfo = await fetchBookInfo('9784798168654');

    expect(bookInfo).toEqual({
      isbn: '9784798168654',
      title: 'リーダブルコード',
      author: 'Dustin Boswell, Trevor Foucher',
      publisher: 'オライリージャパン',
      publishDate: '2012-06-23',
      coverUrl: 'https://example.com/cover.jpg',
    });
  });
});
```

**テスト実行**:
```bash
npm run test
```

**結果**: ❌ FAIL（`fetchBookInfo` が存在しないため）

### Step 2: Green（テストを通す最小限の実装）

**src/types/book.ts を作成**:
```typescript
export interface BookInfo {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  coverUrl?: string;
}
```

**src/services/openbd.ts を作成**:
```typescript
import type { BookInfo } from '../types/book';

const OPENBD_API_URL = 'https://api.openbd.jp/v1/get';

export async function fetchBookInfo(isbn: string): Promise<BookInfo | null> {
  const response = await fetch(`${OPENBD_API_URL}?isbn=${isbn}`);
  const data = await response.json();
  const bookData = data[0];

  if (!bookData || !bookData.summary) {
    return null;
  }

  const { summary } = bookData;

  return {
    isbn: summary.isbn || isbn,
    title: summary.title || 'タイトル不明',
    author: summary.author || '著者不明',
    publisher: summary.publisher || '出版社不明',
    publishDate: formatDate(summary.pubdate),
    coverUrl: summary.cover,
  };
}

function formatDate(date: string): string {
  if (!date || date.length !== 8) return '不明';
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
}
```

**テスト実行**:
```bash
npm run test
```

**結果**: ✅ PASS

### Step 3: Refactor（リファクタリング）

テストが通ったので、コードを改善します。

**src/services/openbd.ts をリファクタリング**:
```typescript
import type { BookInfo } from '../types/book';

const OPENBD_API_URL = 'https://api.openbd.jp/v1/get';

export async function fetchBookInfo(isbn: string): Promise<BookInfo | null> {
  try {
    const response = await fetch(`${OPENBD_API_URL}?isbn=${isbn}`);

    if (!response.ok) {
      throw new Error('Failed to fetch book information');
    }

    const data = await response.json();
    const bookData = data[0];

    if (!bookData) {
      return null;
    }

    return parseBookData(bookData, isbn);
  } catch (error) {
    console.error('Error fetching book info:', error);
    return null;
  }
}

function parseBookData(bookData: any, isbn: string): BookInfo {
  const summary = bookData.summary || {};

  return {
    isbn: summary.isbn || isbn,
    title: summary.title || 'タイトル不明',
    author: summary.author || '著者不明',
    publisher: summary.publisher || '出版社不明',
    publishDate: formatDate(summary.pubdate),
    coverUrl: summary.cover,
  };
}

function formatDate(date: string | undefined): string {
  if (!date || date.length !== 8) return '不明';
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
}
```

**テスト実行**:
```bash
npm run test
```

**結果**: ✅ PASS（リファクタリング後もテストが通る）

### Step 4: 追加テストケース（Red → Green → Refactor）

**異常系テストを追加**:
```typescript
it('存在しないISBNの場合はnullを返す', async () => {
  server.use(
    http.get('https://api.openbd.jp/v1/get', () => {
      return HttpResponse.json([null]);
    })
  );

  const bookInfo = await fetchBookInfo('0000000000000');
  expect(bookInfo).toBeNull();
});

it('ネットワークエラー時はnullを返す', async () => {
  server.use(
    http.get('https://api.openbd.jp/v1/get', () => {
      return HttpResponse.error();
    })
  );

  const bookInfo = await fetchBookInfo('9784798168654');
  expect(bookInfo).toBeNull();
});
```

**テスト実行** → **実装修正** → **テスト実行** のサイクルを繰り返します。

## Issue #3: BarcodeScannerのTDD

### Step 1: Red（失敗するテストを書く）

**src/components/BarcodeScanner.test.tsx を作成**:
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BarcodeScanner } from './BarcodeScanner';

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
    const input = screen.getByLabelText('画像を選択') as HTMLInputElement;

    await userEvent.upload(input, file);

    const preview = screen.getByAltText('Selected barcode');
    expect(preview).toBeInTheDocument();
  });

  it('バーコード検出時にonDetectedが呼ばれる', async () => {
    const onDetected = vi.fn();
    render(<BarcodeScanner onDetected={onDetected} />);

    // Quagga2のモックは別途設定が必要
  });
});
```

**テスト実行**: ❌ FAIL（`BarcodeScanner` コンポーネントが存在しないため）

### Step 2: Green（テストを通す最小限の実装）

**src/components/BarcodeScanner.tsx を作成**:
```typescript
import { useState } from 'react';

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
}

export function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="barcode-scanner">
      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="image-upload"
          aria-label="画像を選択"
          style={{ display: 'none' }}
        />
        <label htmlFor="image-upload" className="upload-button">
          画像を選択
        </label>
      </div>

      {selectedImage && (
        <div className="preview">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected barcode"
          />
        </div>
      )}
    </div>
  );
}
```

**テスト実行**: ✅ PASS（基本的なUIテストが通る）

### Step 3: Quagga2統合（Red → Green → Refactor）

バーコード読み取り機能を追加します。Quagga2のテストは難しいため、実装を先に行い、手動テストで確認します。

**Quagga2モックの作成**（高度なテスト）:
```typescript
// src/test/mocks/quagga.ts
export const mockQuagga = {
  decodeSingle: vi.fn((config, callback) => {
    // モックの振る舞いを定義
    callback({
      codeResult: {
        code: '9784798168654',
      },
    });
  }),
  stop: vi.fn(),
};

vi.mock('@ericblade/quagga2', () => ({
  default: mockQuagga,
}));
```

## Issue #4: BookDisplayのTDD

### Step 1: Red（失敗するテストを書く）

**src/components/BookDisplay.test.tsx を作成**:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookDisplay } from './BookDisplay';
import type { BookInfo } from '../types/book';

describe('BookDisplay', () => {
  it('ローディング中は「読み込み中...」と表示される', () => {
    render(<BookDisplay book={null} isLoading={true} />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('書籍情報がnullの場合は何も表示しない', () => {
    const { container } = render(<BookDisplay book={null} isLoading={false} />);
    expect(container.firstChild).toBeNull();
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

  it('表紙画像がある場合は表示する', () => {
    const book: BookInfo = {
      isbn: '9784798168654',
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      publisher: 'オライリージャパン',
      publishDate: '2012-06-23',
      coverUrl: 'https://example.com/cover.jpg',
    };

    render(<BookDisplay book={book} isLoading={false} />);

    const img = screen.getByAltText('リーダブルコード');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });
});
```

**テスト実行**: ❌ FAIL

### Step 2: Green（テストを通す最小限の実装）

**src/components/BookDisplay.tsx を作成**:
```typescript
import type { BookInfo } from '../types/book';

interface BookDisplayProps {
  book: BookInfo | null;
  isLoading: boolean;
}

export function BookDisplay({ book, isLoading }: BookDisplayProps) {
  if (isLoading) {
    return <div className="book-display loading">読み込み中...</div>;
  }

  if (!book) {
    return null;
  }

  return (
    <div className="book-display">
      <h2>書籍情報</h2>
      {book.coverUrl && (
        <div className="book-cover">
          <img src={book.coverUrl} alt={book.title} />
        </div>
      )}
      <div className="book-details">
        <div className="book-field">
          <label>ISBN:</label>
          <span>{book.isbn}</span>
        </div>
        <div className="book-field">
          <label>タイトル:</label>
          <span>{book.title}</span>
        </div>
        <div className="book-field">
          <label>著者:</label>
          <span>{book.author}</span>
        </div>
        <div className="book-field">
          <label>出版社:</label>
          <span>{book.publisher}</span>
        </div>
        <div className="book-field">
          <label>発行日:</label>
          <span>{book.publishDate}</span>
        </div>
      </div>
    </div>
  );
}
```

**テスト実行**: ✅ PASS

## Issue #5: メインアプリ統合のTDD

### 統合テスト

**src/App.test.tsx を作成**:
```typescript
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import App from './App';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('初期状態でタイトルが表示される', () => {
    render(<App />);
    expect(screen.getByText('📚 バーコード読み取り書籍検索')).toBeInTheDocument();
  });

  it('バーコード検出から書籍情報表示までの統合フロー', async () => {
    server.use(
      http.get('https://api.openbd.jp/v1/get', () => {
        return HttpResponse.json([
          {
            summary: {
              isbn: '9784798168654',
              title: 'リーダブルコード',
              author: 'Dustin Boswell',
              publisher: 'オライリージャパン',
              pubdate: '20120623',
            },
          },
        ]);
      })
    );

    render(<App />);

    // バーコード検出をシミュレート（Quagga2のモックが必要）
    // ...

    // 書籍情報が表示されるまで待つ
    await waitFor(() => {
      expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
    });
  });
});
```

## TDDのベストプラクティス

### 1. テストは小さく、焦点を絞る

**Good**:
```typescript
it('ISBNから書籍情報を取得できる', async () => {
  const bookInfo = await fetchBookInfo('9784798168654');
  expect(bookInfo).toEqual({ ... });
});

it('存在しないISBNの場合はnullを返す', async () => {
  const bookInfo = await fetchBookInfo('0000000000000');
  expect(bookInfo).toBeNull();
});
```

**Bad**:
```typescript
it('fetchBookInfoが正しく動作する', async () => {
  // 正常系と異常系を1つのテストに詰め込む
});
```

### 2. テストは独立している

各テストは他のテストに依存せず、単独で実行できること。

### 3. テストは読みやすい

テストコードは、そのコンポーネントの「使い方の例」になります。

### 4. AAA（Arrange-Act-Assert）パターン

```typescript
it('書籍情報を表示する', () => {
  // Arrange: テストの準備
  const book: BookInfo = { ... };

  // Act: 実行
  render(<BookDisplay book={book} isLoading={false} />);

  // Assert: 検証
  expect(screen.getByText('リーダブルコード')).toBeInTheDocument();
});
```

### 5. KISS原則（Keep It Simple, Stupid）

テストも実装も、シンプルに保つことが重要です。

詳細は [tdd-skill](../../.github/skills/tdd-skill/SKILL.md) を参照してください。

## テストカバレッジ

### カバレッジ確認

```bash
npm run test:cov
```

**目標カバレッジ**:
- Line Coverage: 80%以上
- Branch Coverage: 80%以上
- Function Coverage: 80%以上

## まとめ

TDDの本質は以下の3つです：

1. **Red**: 失敗するテストを書く（仕様の明確化）
2. **Green**: テストを通す最小限の実装（動作の確認）
3. **Refactor**: コードを改善する（品質の向上）

このサイクルを繰り返すことで、品質が高く、変更に強いコードが生まれます。

## 参考リソース

- [tdd-skill](../../.github/skills/tdd-skill/SKILL.md) - TDD開発の詳細ガイド
- [Vitest公式ドキュメント](https://vitest.dev/)
- [Testing Library公式ドキュメント](https://testing-library.com/)
- [MSW公式ドキュメント](https://mswjs.io/)

## 次のステップ

TDD実装を理解したら、[リファクタリングガイド](./05-refactoring.md)に進んで、コード改善の手法を学びましょう。
