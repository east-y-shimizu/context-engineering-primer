# リファレンス - [スキル名]

このドキュメントは、スキルの詳細なAPIリファレンスと技術仕様を提供します。

## 目次

- [API リファレンス](#api-リファレンス)
- [設定オプション](#設定オプション)
- [データ構造](#データ構造)
- [エラーコード](#エラーコード)

---

## API リファレンス

### 関数・メソッド一覧

#### `functionName(param1, param2)`

**説明**: 関数の詳細な説明

**パラメータ**:
- `param1` (型): パラメータの説明
  - デフォルト値: `default`
  - 必須: はい/いいえ
- `param2` (型): パラメータの説明
  - デフォルト値: `default`
  - 必須: はい/いいえ

**戻り値**:
- 型: `ReturnType`
- 説明: 戻り値の説明

**例**:
```python
result = functionName("value1", "value2")
print(result)  # 期待される出力
```

**エラー**:
- `ErrorType1`: エラーが発生する条件
- `ErrorType2`: エラーが発生する条件

**関連**:
- [relatedFunction()](#relatedfunction)

---

#### `anotherFunction(options)`

**説明**: 別の関数の詳細な説明

**パラメータ**:
- `options` (Object): オプションオブジェクト
  - `option1` (string): オプションの説明
  - `option2` (boolean): オプションの説明
  - `option3` (number): オプションの説明

**戻り値**:
- 型: `Promise<Result>`
- 説明: 非同期処理の結果

**例**:
```javascript
const result = await anotherFunction({
  option1: 'value',
  option2: true,
  option3: 42
});
```

---

## 設定オプション

### グローバル設定

```json
{
  "globalOption1": "value",
  "globalOption2": 123,
  "globalOption3": {
    "nestedOption": true
  }
}
```

#### `globalOption1`
- **型**: String
- **デフォルト**: `"default"`
- **説明**: この設定が何をするのか

#### `globalOption2`
- **型**: Number
- **デフォルト**: `0`
- **説明**: この設定が何をするのか
- **範囲**: 0-1000

#### `globalOption3.nestedOption`
- **型**: Boolean
- **デフォルト**: `false`
- **説明**: この設定が何をするのか

---

## データ構造

### 型定義

#### `DataType1`

```typescript
interface DataType1 {
  id: string;
  name: string;
  value: number;
  optional?: boolean;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
  };
}
```

**フィールド**:
- `id`: ユニークな識別子
- `name`: 表示名
- `value`: 数値データ
- `optional`: オプショナルなフラグ
- `metadata`: メタデータオブジェクト
  - `createdAt`: 作成日時
  - `updatedAt`: 更新日時

**例**:
```json
{
  "id": "abc123",
  "name": "Example",
  "value": 42,
  "optional": true,
  "metadata": {
    "createdAt": "2025-12-25T00:00:00Z",
    "updatedAt": "2025-12-25T12:00:00Z"
  }
}
```

---

#### `DataType2`

```typescript
type DataType2 = {
  type: 'typeA' | 'typeB' | 'typeC';
  data: any;
  status: 'pending' | 'success' | 'error';
};
```

**フィールド**:
- `type`: データの種類（typeA, typeB, typeCのいずれか）
- `data`: データペイロード
- `status`: 処理ステータス

---

## エラーコード

### エラー一覧

| コード | 名前 | 説明 | 解決方法 |
|--------|------|------|----------|
| `E001` | INVALID_INPUT | 入力パラメータが無効 | パラメータの形式を確認してください |
| `E002` | NOT_FOUND | リソースが見つからない | リソースIDを確認してください |
| `E003` | PERMISSION_DENIED | 権限がない | アクセス権限を確認してください |
| `E004` | RATE_LIMIT_EXCEEDED | レート制限超過 | しばらく待ってから再試行してください |
| `E005` | INTERNAL_ERROR | 内部エラー | システム管理者に連絡してください |

### エラーレスポンス形式

```json
{
  "error": {
    "code": "E001",
    "message": "Invalid input parameter: 'name' is required",
    "details": {
      "field": "name",
      "reason": "required"
    }
  }
}
```

---

## コマンドラインインターフェース

### コマンド一覧

#### `command init`

**説明**: 初期化処理を実行

**使用方法**:
```bash
command init [options]
```

**オプション**:
- `--config <path>`: 設定ファイルのパス
- `--force`: 強制的に初期化
- `--verbose`: 詳細ログを出力

**例**:
```bash
command init --config ./config.json --verbose
```

---

#### `command process`

**説明**: データ処理を実行

**使用方法**:
```bash
command process <input> [output] [options]
```

**引数**:
- `<input>`: 入力ファイルのパス（必須）
- `[output]`: 出力ファイルのパス（オプション）

**オプション**:
- `--format <type>`: 出力形式（json, csv, xml）
- `--filter <expression>`: フィルター条件

**例**:
```bash
command process input.json output.json --format json --filter "status=active"
```

---

## 環境変数

| 変数名 | デフォルト値 | 説明 |
|--------|-------------|------|
| `SKILL_API_KEY` | なし | API認証キー |
| `SKILL_ENDPOINT` | `https://api.example.com` | APIエンドポイント |
| `SKILL_TIMEOUT` | `30000` | タイムアウト時間（ミリ秒） |
| `SKILL_LOG_LEVEL` | `info` | ログレベル（debug, info, warn, error） |

---

## パフォーマンス特性

### 計算量

- 時間計算量: O(n log n)
- 空間計算量: O(n)

### ベンチマーク

| データサイズ | 処理時間 | メモリ使用量 |
|-------------|---------|-------------|
| 1,000件 | 10ms | 1MB |
| 10,000件 | 120ms | 10MB |
| 100,000件 | 1.5s | 100MB |

---

## バージョン互換性

| バージョン | 互換性 | 注意事項 |
|-----------|--------|----------|
| 1.x | ✓ | 完全互換 |
| 2.x | ✓ | 非推奨APIあり |
| 3.x | ✗ | 破壊的変更あり |

---

## 関連資料

- [メイン SKILL.md](./SKILL.md)
- [外部APIドキュメント](https://example.com/api)
- [GitHub リポジトリ](https://github.com/example/repo)

---

**最終更新**: 2025-12-25
