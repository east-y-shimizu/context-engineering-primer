#!/usr/bin/env node

/**
 * Helper Script Template
 *
 * このファイルは、Agent Skillで使用するヘルパースクリプトのテンプレートです。
 * 必要に応じてカスタマイズして使用してください。
 */

// 必要なモジュールをインポート
const fs = require('fs');
const path = require('path');

/**
 * メイン処理
 */
async function main() {
  try {
    // コマンドライン引数を取得
    const args = process.argv.slice(2);

    if (args.length === 0) {
      showHelp();
      process.exit(0);
    }

    const command = args[0];

    switch (command) {
      case 'process':
        await processCommand(args.slice(1));
        break;
      case 'validate':
        await validateCommand(args.slice(1));
        break;
      case 'help':
        showHelp();
        break;
      default:
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

/**
 * データ処理コマンド
 * @param {string[]} args - コマンドライン引数
 */
async function processCommand(args) {
  if (args.length < 1) {
    console.error('Error: Input file is required');
    console.log('Usage: node helper.js process <input-file> [output-file]');
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || 'output.json';

  console.log(`Processing: ${inputFile}`);

  // ファイルの存在確認
  if (!fs.existsSync(inputFile)) {
    throw new Error(`File not found: ${inputFile}`);
  }

  // ファイルを読み込む
  const data = await readFile(inputFile);

  // データを処理
  const result = processData(data);

  // 結果を書き込む
  await writeFile(outputFile, result);

  console.log(`Output saved to: ${outputFile}`);
}

/**
 * データ検証コマンド
 * @param {string[]} args - コマンドライン引数
 */
async function validateCommand(args) {
  if (args.length < 1) {
    console.error('Error: Input file is required');
    console.log('Usage: node helper.js validate <input-file>');
    process.exit(1);
  }

  const inputFile = args[0];
  console.log(`Validating: ${inputFile}`);

  const data = await readFile(inputFile);
  const errors = validateData(data);

  if (errors.length === 0) {
    console.log('✓ Validation passed');
  } else {
    console.log('✗ Validation failed:');
    errors.forEach(error => console.log(`  - ${error}`));
    process.exit(1);
  }
}

/**
 * ファイルを読み込む
 * @param {string} filePath - ファイルパス
 * @returns {Promise<any>} - 読み込んだデータ
 */
async function readFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).toLowerCase();

  switch (ext) {
    case '.json':
      return JSON.parse(content);
    case '.txt':
      return content;
    default:
      return content;
  }
}

/**
 * ファイルに書き込む
 * @param {string} filePath - ファイルパス
 * @param {any} data - 書き込むデータ
 */
async function writeFile(filePath, data) {
  const ext = path.extname(filePath).toLowerCase();
  let content;

  switch (ext) {
    case '.json':
      content = JSON.stringify(data, null, 2);
      break;
    default:
      content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * データを処理する（カスタマイズポイント）
 * @param {any} data - 入力データ
 * @returns {any} - 処理結果
 */
function processData(data) {
  // ここにデータ処理のロジックを実装
  // 例: データの変換、フィルタリング、集計など

  if (typeof data === 'object' && !Array.isArray(data)) {
    // オブジェクトの場合
    return {
      ...data,
      processed: true,
      processedAt: new Date().toISOString()
    };
  } else if (Array.isArray(data)) {
    // 配列の場合
    return data.map(item => ({
      ...item,
      processed: true
    }));
  } else {
    // その他の場合
    return {
      original: data,
      processed: true,
      processedAt: new Date().toISOString()
    };
  }
}

/**
 * データを検証する（カスタマイズポイント）
 * @param {any} data - 検証するデータ
 * @returns {string[]} - エラーメッセージの配列
 */
function validateData(data) {
  const errors = [];

  // ここに検証ロジックを実装
  // 例: 必須フィールドのチェック、型チェック、値の範囲チェックなど

  if (!data) {
    errors.push('Data is empty or null');
    return errors;
  }

  if (typeof data === 'object' && !Array.isArray(data)) {
    // オブジェクトの検証例
    if (!data.id) {
      errors.push('Missing required field: id');
    }
    if (!data.name) {
      errors.push('Missing required field: name');
    }
  } else if (Array.isArray(data)) {
    // 配列の検証例
    if (data.length === 0) {
      errors.push('Array is empty');
    }
    data.forEach((item, index) => {
      if (!item.id) {
        errors.push(`Item at index ${index} is missing required field: id`);
      }
    });
  }

  return errors;
}

/**
 * ヘルプメッセージを表示
 */
function showHelp() {
  console.log(`
Usage: node helper.js <command> [options]

Commands:
  process <input-file> [output-file]  Process the input file and save to output
  validate <input-file>               Validate the input file
  help                                Show this help message

Examples:
  node helper.js process data.json output.json
  node helper.js validate data.json
  node helper.js help

Options:
  input-file   : Path to the input file
  output-file  : Path to the output file (optional, default: output.json)
  `);
}

// ユーティリティ関数

/**
 * 配列をチャンクに分割
 * @param {Array} array - 分割する配列
 * @param {number} size - チャンクサイズ
 * @returns {Array} - チャンクの配列
 */
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * オブジェクトから指定したキーのみを抽出
 * @param {Object} obj - 元のオブジェクト
 * @param {string[]} keys - 抽出するキーの配列
 * @returns {Object} - 抽出したオブジェクト
 */
function pick(obj, keys) {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

/**
 * オブジェクトから指定したキーを除外
 * @param {Object} obj - 元のオブジェクト
 * @param {string[]} keys - 除外するキーの配列
 * @returns {Object} - 除外後のオブジェクト
 */
function omit(obj, keys) {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * ディープクローン
 * @param {any} obj - クローンするオブジェクト
 * @returns {any} - クローンされたオブジェクト
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// モジュールとしてエクスポート（他のスクリプトから使用可能）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    processData,
    validateData,
    chunkArray,
    pick,
    omit,
    deepClone
  };
}

// スクリプトとして実行された場合
if (require.main === module) {
  main();
}
