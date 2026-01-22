import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchBookInfo } from './openbd';

describe('fetchBookInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('有効なISBNで書籍情報を取得できる（summary）', async () => {
    // Given: 有効なISBNとモックされたAPIレスポンス
    const isbn = '9784167158057';
    const mockResponse = [
      {
        summary: {
          isbn: '9784167158057',
          title: 'ノルウェイの森',
          author: '村上春樹',
          publisher: '講談社',
          pubdate: '20120915',
          cover: 'https://example.com/cover.jpg',
        },
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: 正しい書籍情報が返される
    expect(result).toEqual({
      isbn: '9784167158057',
      title: 'ノルウェイの森',
      author: '村上春樹',
      publisher: '講談社',
      pubdate: '20120915',
      cover: 'https://example.com/cover.jpg',
    });
    expect(fetch).toHaveBeenCalledWith('https://api.openbd.jp/v1/get?isbn=9784167158057');
  });

  it('書籍が見つからない場合はnullを返す', async () => {
    // Given: 存在しないISBNとAPIレスポンス（null）
    const isbn = '9999999999999';
    const mockResponse = [null];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: nullが返される
    expect(result).toBeNull();
    expect(fetch).toHaveBeenCalledWith('https://api.openbd.jp/v1/get?isbn=9999999999999');
  });

  it('無効なISBN（12桁）の場合はnullを返す', async () => {
    // Given: 12桁のISBN
    const isbn = '978416715805';

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: nullが返され、fetchは呼ばれない
    expect(result).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('無効なISBN（14桁）の場合はnullを返す', async () => {
    // Given: 14桁のISBN
    const isbn = '97841671580571';

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: nullが返され、fetchは呼ばれない
    expect(result).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('無効なISBN（文字を含む）の場合はnullを返す', async () => {
    // Given: 文字を含むISBN
    const isbn = '978416715805X';

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: nullが返され、fetchは呼ばれない
    expect(result).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('空文字列の場合はnullを返す', async () => {
    // Given: 空文字列
    const isbn = '';

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: nullが返され、fetchは呼ばれない
    expect(result).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('APIネットワークエラーの場合はnullを返す', async () => {
    // Given: ネットワークエラーが発生する状況
    const isbn = '9784167158057';
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: nullが返される
    expect(result).toBeNull();
  });

  it('空配列レスポンスの場合はnullを返す', async () => {
    // Given: 空配列のAPIレスポンス
    const isbn = '9784167158057';
    const mockResponse: never[] = [];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: nullが返される
    expect(result).toBeNull();
  });

  it('summaryがなくonixのみの場合はnullを返す', async () => {
    // Given: onixデータのみのAPIレスポンス
    const isbn = '9784167158057';
    const mockResponse = [
      {
        onix: {
          ProductIdentifier: {
            ProductIDType: '15',
            IDValue: '9784167158057',
          },
        },
        // summaryフィールドは存在しない
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    // When: fetchBookInfoを呼び出す
    const result = await fetchBookInfo(isbn);

    // Then: nullが返される（現在はsummaryのみサポート）
    expect(result).toBeNull();
  });
});
