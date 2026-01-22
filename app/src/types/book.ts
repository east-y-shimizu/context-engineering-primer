/**
 * YYYYMMDD形式の日付文字列を表すブランド型
 * 
 * @example "20240101" // 2024年1月1日
 * @see isValidYYYYMMDDFormat - 実行時バリデーション関数
 * @see createYYYYMMDDString - 型ガード付きファクトリ関数
 */
export type YYYYMMDDString = string & { readonly __brand: 'YYYYMMDDString' };

/**
 * YYYYMMDD形式の文字列かどうかを検証する
 * 
 * @param value - 検証する文字列
 * @returns YYYYMMDD形式として有効な場合true
 * 
 * @example
 * isValidYYYYMMDDFormat('20240101') // true
 * isValidYYYYMMDDFormat('2024-01-01') // false
 * isValidYYYYMMDDFormat('20240132') // false (存在しない日付)
 */
export function isValidYYYYMMDDFormat(value: string): boolean {
  // YYYYMMDD形式の正規表現（8桁の数字）
  if (!/^\d{8}$/.test(value)) {
    return false;
  }

  // 日付として有効かチェック
  const year = parseInt(value.substring(0, 4), 10);
  const month = parseInt(value.substring(4, 6), 10);
  const day = parseInt(value.substring(6, 8), 10);

  // 月と日の範囲チェック
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  // Dateオブジェクトで実際の日付として有効かチェック
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * YYYYMMDD形式の文字列からブランド型を作成する
 * 
 * @param value - YYYYMMDD形式の文字列
 * @returns 検証済みのYYYYMMDDString型、または無効な場合null
 * 
 * @example
 * const pubdate = createYYYYMMDDString('20240101');
 * if (pubdate) {
 *   // pubdateはYYYYMMDDString型として扱える
 * }
 */
export function createYYYYMMDDString(value: string): YYYYMMDDString | null {
  return isValidYYYYMMDDFormat(value) ? (value as YYYYMMDDString) : null;
}

/**
 * 書籍情報の型定義
 */
export interface BookInfo {
  /** ISBN-13 */
  isbn: string;
  /** 書籍タイトル */
  title: string;
  /** 著者名 */
  author: string;
  /** 出版社名 */
  publisher: string;
  /** 
   * 発行日（YYYYMMDD形式）
   * 
   * OpenBD APIから取得される日付文字列。
   * 実行時バリデーションには isValidYYYYMMDDFormat() を使用し、
   * ブランド型の作成には createYYYYMMDDString() を使用すること。
   */
  pubdate: YYYYMMDDString;
  /** 表紙画像URL（オプション） */
  cover?: string;
}

/**
 * OpenBD APIのレスポンス型
 * 
 * @see https://openbd.jp/
 * 
 * @remarks
 * pubdateフィールドは生のstring型です。BookInfo型に変換する際は、
 * createYYYYMMDDString()を使用してバリデーション済みの
 * YYYYMMDDString型に変換してください。
 */
export interface OpenBDResponse {
  /** 書籍情報の要約 */
  summary?: {
    isbn: string;
    title: string;
    author?: string;
    publisher?: string;
    /** 
     * 発行日（YYYYMMDD形式の文字列、未検証）
     * 
     * BookInfo型に変換する際は createYYYYMMDDString() で検証すること
     */
    pubdate?: string;
    cover?: string;
  };
  /** ONIX形式の詳細情報 */
  onix?: {
    CollateralDetail?: {
      TextContent?: Array<{
        Text?: string;
        TextType?: string;
      }>;
      SupportingResource?: Array<{
        ResourceContentType?: string;
        ContentAudience?: string;
        ResourceMode?: string;
        ResourceVersion?: Array<{
          ResourceLink?: string;
        }>;
      }>;
    };
    DescriptiveDetail?: {
      TitleDetail?: {
        TitleElement?: {
          TitleText?: {
            content?: string;
          };
        };
      };
      Contributor?: Array<{
        PersonName?: {
          content?: string;
        };
        ContributorRole?: Array<string>;
      }>;
    };
  };
}

/**
 * バーコード読み取り結果の型
 */
export interface BarcodeResult {
  /** 読み取られたコード値 */
  codeResult: {
    /** コードの値（ISBN） */
    code: string;
    /** バーコードのフォーマット（例: "ean_13"） */
    format: string;
  };
  /** 検出された位置情報 */
  line?: {
    x: number;
    y: number;
  }[];
  /** 検出信頼度（0-1） */
  confidence?: number;
}
