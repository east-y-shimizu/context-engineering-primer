---
name: git-skill
description: Conventional Commits形式に準拠したGit/GitHub運用（コミット、プッシュ、PR、Issue、ラベル管理）を支援するスキル
---

# Git/GitHub運用スキル

このスキルは、Conventional Commits形式に準拠した日常的なGit/GitHub操作を支援します。

## このスキルができること

- **コミット・プッシュ** - 変更のコミットとリモートへのプッシュ
- **PR作成** - プルリクエストの作成（ブランチ命名規則、ラベル付け、DoDの確認）
- **Issue作成** - Issueの作成（適切なラベル付け、Task IssueのDoD設定）
- **ラベル管理** - Conventional Commits形式のラベルの作成、更新、削除、一覧表示

## 詳細手順

各操作の詳細は以下のリファレンスを参照してください：

- [ブランチ操作](reference/branch.md) - ブランチの作成、切り替え、削除、命名規則
- [コミット](reference/commit.md) - 変更のコミット方法
- [プッシュ](reference/push.md) - リモートへのプッシュ方法
- [PR作成](reference/pr.md) - プルリクエストの作成方法
- [Issue作成](reference/issue.md) - Issueの作成方法
- [ラベル管理](reference/label.md) - ラベルの管理方法

## 使用方法

このスキルを呼び出すには、以下のように指示してください：

```
git-skillを使用してコミットとプッシュを行ってください
```

```
git-skillを使用してPRを作成してください
```

```
git-skillを使用してラベルを確認してください
```

## 必要なツール

- Git
- GitHub CLI (`gh`) - PR、Issue、ラベル操作に推奨
