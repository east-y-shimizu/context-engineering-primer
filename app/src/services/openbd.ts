import type { BookInfo } from '../types/book';

/**
 * ISBNが有効な形式（13桁の数字）かどうかを検証する
 * @param isbn - 検証するISBN文字列
 * @returns 有効な場合true、無効な場合false
 */
function isValidISBN(isbn: string): boolean {
  return isbn.length === 13 && /^\d+$/.test(isbn);
}

/**
 * OpenBD APIからISBNをもとに書籍情報を取得する
 * 
 * @param isbn - ISBN-13（ハイフンなし13桁の数字）
 * @returns 書籍情報、または見つからない場合はnull
 */
export async function fetchBookInfo(isbn: string): Promise<BookInfo | null> {
  if (!isValidISBN(isbn)) {
    return null;
  }
  
  try {
    const response = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`);
    const data = await response.json();
  
    const bookData = data[0]?.summary;
    if (!bookData) {
      return null;
    }

    return {
      isbn: bookData.isbn,
      title: bookData.title,
      author: bookData.author,
      publisher: bookData.publisher,
      pubdate: bookData.pubdate,
      cover: bookData.cover,
    };
  } catch (error) {
    return null;
  }
}

