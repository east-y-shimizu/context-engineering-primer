# リファクタリングガイド

## リファクタリングとは

リファクタリングは、**外部から見た動作を変えずに、コードの内部構造を改善する**ことです。

### リファクタリングの目的

- **可読性の向上**: コードが読みやすくなる
- **保守性の向上**: 変更が容易になる
- **バグの予防**: 複雑さを減らし、バグを減らす
- **設計の改善**: よりよい設計に近づける

### リファクタリングの前提条件

リファクタリングを安全に行うには、**テストが必要**です。

テストがあれば：
- リファクタリング後も動作が保証される
- 安心してコード変更できる
- 問題があればすぐに検知できる

詳細は [refactor-skill](../../.github/skills/refactor-skill/SKILL.md) を参照してください。

## Tidy First アプローチ

Tidy First（ケント・ベック著）は、リファクタリングの効果的なアプローチを提案しています。

### 基本原則: 構造変更と動作変更を分離

```
構造の変更（リファクタリング）→ コミット → 動作の変更（機能追加）→ コミット
```

このアプローチにより：
- レビューが容易になる
- 問題の切り分けが簡単になる
- コミット履歴が理解しやすくなる

### コミット分離戦略

#### パターン1: リファクタリング → 機能追加

```bash
# 1. リファクタリング（動作を変えない）
git commit -m "refactor: fetchBookInfo を async/await に変更"

# 2. 機能追加（動作を変える）
git commit -m "feat: タイムアウト処理を追加"
```

#### パターン2: 準備 → 実装

```bash
# 1. 準備（インターフェース追加）
git commit -m "refactor: BookInfo に description フィールドを追加"

# 2. 実装（機能追加）
git commit -m "feat: 書籍の説明文を表示"
```

## 本演習でのリファクタリング実践

### Issue #2: OpenBD API連携のリファクタリング

#### Before（Green段階の実装）

```typescript
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
```

#### Refactor Step 1: エラーハンドリングの追加

```typescript
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
```

**コミット**:
```bash
git commit -m "refactor: fetchBookInfo にエラーハンドリングを追加"
```

#### Refactor Step 2: パース処理の分離

```typescript
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
```

**コミット**:
```bash
git commit -m "refactor: パース処理を parseBookData 関数に分離"
```

#### Refactor Step 3: 型定義の追加

```typescript
// src/types/book.ts
export interface OpenBDBook {
  onix?: {
    DescriptiveDetail?: {
      TitleDetail?: {
        TitleElement?: Array<{
          TitleText?: { content: string };
        }>;
      };
      Contributor?: Array<{
        PersonName?: { content: string };
      }>;
    };
  };
  summary?: {
    isbn?: string;
    title?: string;
    author?: string;
    publisher?: string;
    pubdate?: string;
    cover?: string;
  };
}
```

```typescript
// src/services/openbd.ts
import type { OpenBDBook, BookInfo } from '../types/book';

function parseBookData(bookData: OpenBDBook, isbn: string): BookInfo {
  const summary = bookData.summary || {};
  const onix = bookData.onix;

  // summaryが優先、なければonixから取得
  const title =
    summary.title ||
    onix?.DescriptiveDetail?.TitleDetail?.TitleElement?.[0]?.TitleText?.content ||
    'タイトル不明';

  const author =
    summary.author ||
    onix?.DescriptiveDetail?.Contributor?.[0]?.PersonName?.content ||
    '著者不明';

  return {
    isbn: summary.isbn || isbn,
    title,
    author,
    publisher: summary.publisher || '出版社不明',
    publishDate: formatDate(summary.pubdate),
    coverUrl: summary.cover,
  };
}
```

**コミット**:
```bash
git commit -m "refactor: OpenBDBook 型を定義し、onix データにも対応"
```

### Issue #3: BarcodeScannerのリファクタリング

#### Before

```typescript
export function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const imageUrl = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        Quagga.decodeSingle(
          {
            src: imageUrl,
            numOfWorkers: 0,
            locate: true,
            inputStream: { size: 800 },
            decoder: {
              readers: ['ean_reader', 'ean_8_reader', /* ... */],
            },
          },
          (result) => {
            URL.revokeObjectURL(imageUrl);

            if (result && result.codeResult) {
              onDetected(result.codeResult.code);
              resolve();
            } else {
              setError('バーコードを検出できませんでした');
              reject(new Error('No barcode detected'));
            }
          }
        );
      });
    } catch (err) {
      console.error('Error processing image:', err);
      if (!error) {
        setError('画像の処理中にエラーが発生しました');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // ...
}
```

#### Refactor Step 1: Quagga設定を定数化

```typescript
const QUAGGA_CONFIG = {
  numOfWorkers: 0,
  locate: true,
  inputStream: { size: 800 },
  decoder: {
    readers: [
      'ean_reader',
      'ean_8_reader',
      'code_128_reader',
      'code_39_reader',
      'upc_reader',
      'upc_e_reader',
    ],
  },
};
```

**コミット**:
```bash
git commit -m "refactor: Quagga設定を定数化"
```

#### Refactor Step 2: バーコード読み取り処理を関数化

```typescript
async function decodeBarcode(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    Quagga.decodeSingle(
      {
        src: imageUrl,
        ...QUAGGA_CONFIG,
      },
      (result) => {
        if (result && result.codeResult) {
          resolve(result.codeResult.code);
        } else {
          reject(new Error('No barcode detected'));
        }
      }
    );
  });
}
```

**コミット**:
```bash
git commit -m "refactor: バーコード読み取り処理を decodeBarcode 関数に分離"
```

#### Refactor Step 3: processImage を簡潔化

```typescript
const processImage = async (file: File) => {
  setIsProcessing(true);
  setError(null);

  const imageUrl = URL.createObjectURL(file);

  try {
    const code = await decodeBarcode(imageUrl);
    onDetected(code);
  } catch (err) {
    console.error('Error processing image:', err);
    setError('バーコードを検出できませんでした');
  } finally {
    URL.revokeObjectURL(imageUrl);
    setIsProcessing(false);
  }
};
```

**コミット**:
```bash
git commit -m "refactor: processImage を簡潔化"
```

### Issue #5: メインアプリのリファクタリング

#### Before

```typescript
function App() {
  const [book, setBook] = useState<BookInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBarcodeDetected = async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const bookInfo = await fetchBookInfo(code);
      if (bookInfo) {
        setBook(bookInfo);
      } else {
        setError('書籍情報が見つかりませんでした');
      }
    } catch (err) {
      setError('書籍情報の取得に失敗しました');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ...
}
```

#### Refactor: カスタムフックに分離

```typescript
// src/hooks/useBookSearch.ts
export function useBookSearch() {
  const [book, setBook] = useState<BookInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBook = async (isbn: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const bookInfo = await fetchBookInfo(isbn);
      if (bookInfo) {
        setBook(bookInfo);
      } else {
        setError('書籍情報が見つかりませんでした');
      }
    } catch (err) {
      setError('書籍情報の取得に失敗しました');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { book, isLoading, error, searchBook };
}
```

```typescript
// src/App.tsx
function App() {
  const { book, isLoading, error, searchBook } = useBookSearch();

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 バーコード読み取り書籍検索</h1>
        <p>本のバーコード画像をアップロードして情報を表示</p>
      </header>

      <main className="app-main">
        <BarcodeScanner onDetected={searchBook} />
        {error && <div className="error-message">{error}</div>}
        <BookDisplay book={book} isLoading={isLoading} />
      </main>

      <footer className="app-footer">
        <p>Powered by OpenBD API</p>
      </footer>
    </div>
  );
}
```

**コミット**:
```bash
git commit -m "refactor: 書籍検索ロジックを useBookSearch フックに分離"
```

## リファクタリングカタログ

### 1. 関数の抽出（Extract Function）

**Before**:
```typescript
function processData() {
  // データ検証
  if (!data || data.length === 0) {
    throw new Error('Invalid data');
  }

  // データ変換
  const transformed = data.map(item => ({
    id: item.id,
    name: item.name.toUpperCase(),
  }));

  return transformed;
}
```

**After**:
```typescript
function validateData(data: any[]) {
  if (!data || data.length === 0) {
    throw new Error('Invalid data');
  }
}

function transformData(data: any[]) {
  return data.map(item => ({
    id: item.id,
    name: item.name.toUpperCase(),
  }));
}

function processData(data: any[]) {
  validateData(data);
  return transformData(data);
}
```

### 2. 変数の抽出（Extract Variable）

**Before**:
```typescript
if (book.publishDate.slice(0, 4) >= '2020' && book.publishDate.slice(0, 4) <= '2023') {
  // ...
}
```

**After**:
```typescript
const publishYear = book.publishDate.slice(0, 4);
const isRecentBook = publishYear >= '2020' && publishYear <= '2023';

if (isRecentBook) {
  // ...
}
```

### 3. マジックナンバーの定数化

**Before**:
```typescript
const config = {
  inputStream: { size: 800 },
  timeout: 5000,
};
```

**After**:
```typescript
const IMAGE_SIZE = 800;
const TIMEOUT_MS = 5000;

const config = {
  inputStream: { size: IMAGE_SIZE },
  timeout: TIMEOUT_MS,
};
```

### 4. 条件式の簡素化

**Before**:
```typescript
if (book !== null && book !== undefined) {
  // ...
}
```

**After**:
```typescript
if (book) {
  // ...
}
```

### 5. Early Return

**Before**:
```typescript
function getTitle(book: BookInfo | null) {
  if (book) {
    if (book.title) {
      return book.title;
    } else {
      return 'タイトル不明';
    }
  } else {
    return 'タイトル不明';
  }
}
```

**After**:
```typescript
function getTitle(book: BookInfo | null) {
  if (!book) return 'タイトル不明';
  if (!book.title) return 'タイトル不明';
  return book.title;
}

// さらに簡潔に
function getTitle(book: BookInfo | null) {
  return book?.title || 'タイトル不明';
}
```

## リファクタリングのタイミング

### 1. Boy Scout Rule（ボーイスカウトルール）

> 来た時よりも美しく

コードを触る時は、少しだけでも改善して去る。

### 2. Rule of Three（3回ルール）

同じようなコードが3回出てきたら、共通化を検討する。

**1回目**: そのまま書く
**2回目**: 気にしつつ、そのまま書く
**3回目**: リファクタリング（共通化）

### 3. 理解できないコードに出会った時

理解しにくいコードは、リファクタリングのチャンス。

### 4. 機能追加の前

新しい機能を追加する前に、コードを整理する。

## リファクタリング時の注意点

### 1. テストを書く（または確認する）

リファクタリングの前提条件は**テストがあること**です。

### 2. 小さく進める

一度に大きな変更をせず、小さなステップで進める。

### 3. 動作を変えない

リファクタリングは**動作を変えない**ことが重要です。

### 4. コミットを分ける

リファクタリングと機能追加は別のコミットにする。

## SOLID原則

リファクタリングの指針として、SOLID原則があります。

### S: Single Responsibility Principle（単一責任の原則）

クラスや関数は、1つの責任だけを持つべき。

**Before**:
```typescript
function fetchAndDisplayBook(isbn: string) {
  // API取得
  const book = await fetchBookInfo(isbn);
  // 表示
  document.getElementById('book-title').innerText = book.title;
}
```

**After**:
```typescript
async function fetchBook(isbn: string) {
  return await fetchBookInfo(isbn);
}

function displayBook(book: BookInfo) {
  document.getElementById('book-title').innerText = book.title;
}
```

### O: Open/Closed Principle（開放/閉鎖の原則）

拡張に対して開いており、修正に対して閉じている。

### L: Liskov Substitution Principle（リスコフの置換原則）

派生クラスは、基底クラスと置き換え可能であるべき。

### I: Interface Segregation Principle（インターフェース分離の原則）

クライアントは、使わないメソッドへの依存を強制されるべきではない。

### D: Dependency Inversion Principle（依存性逆転の原則）

上位モジュールは下位モジュールに依存すべきではない。

詳細は [refactor-skill](../../.github/skills/refactor-skill/SKILL.md) を参照してください。

## その他の原則

### DRY（Don't Repeat Yourself）

同じコードを繰り返さない。

### YAGNI（You Aren't Gonna Need It）

今必要ない機能は実装しない。

### KISS（Keep It Simple, Stupid）

シンプルに保つ。

詳細は [tdd-skill](../../.github/skills/tdd-skill/SKILL.md) を参照してください。

## リファクタリングチェックリスト

### 実施前
- [ ] テストが書かれている（または書く）
- [ ] テストが全て通る
- [ ] リファクタリングの目的が明確

### 実施中
- [ ] 小さなステップで進める
- [ ] 各ステップでテストを実行
- [ ] 動作を変えない

### 実施後
- [ ] テストが全て通る
- [ ] コードが読みやすくなった
- [ ] 適切にコミットした

## まとめ

リファクタリングの本質：

1. **動作を変えずに、構造を改善する**
2. **テストがあれば、安全にリファクタリングできる**
3. **Tidy First: 構造変更と動作変更を分離する**
4. **小さく進める、頻繁にコミットする**

リファクタリングは、コードを健全に保つための重要なプラクティスです。

## 参考リソース

- [refactor-skill](../../.github/skills/refactor-skill/SKILL.md) - リファクタリングの詳細ガイド
- [tdd-skill](../../.github/skills/tdd-skill/SKILL.md) - KISS原則
- [Refactoring Guru](https://refactoring.guru/) - リファクタリングカタログ
- [Tidy First?](https://www.oreilly.com/library/view/tidy-first/9781098151232/) - ケント・ベック著

## 次のステップ

リファクタリング手法を理解したら、実際のIssue実装で実践していきましょう。サンプルIssueとPRの例を確認して、ワークフローを体験してください。
