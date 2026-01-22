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
  /** 発行日（YYYYMMDD形式） */
  pubdate: string;
  /** 表紙画像URL（オプション） */
  cover?: string;
}

/**
 * OpenBD APIのレスポンス型
 * 
 * @see https://openbd.jp/
 */
export interface OpenBDResponse {
  /** 書籍情報の要約 */
  summary?: {
    isbn: string;
    title: string;
    author?: string;
    publisher?: string;
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
  /**
   * 検出信頼度（0-1）
   *
   * 値は 0 以上 1 以下の範囲となることを前提としたスコアです。
   * この型定義では範囲制約を表現していないため、値の検証は
   * バーコード読み取り処理など別の層で行ってください。
   */
  confidence?: number;
}
