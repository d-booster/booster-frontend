# booster-web-client

## Getting Started

### セットアップ

`node v20.0.0` が必要です。ローカルにインストールしてください

```bash
$ node -v
v20.0.0
```

nodebrewを利用している場合はこちら
https://qiita.com/chihiro/items/13652c461519f8922f56

必要なパッケージをインストール

```bash
$ npm i
```

git hooks

```bash
npx simple-git-hooks
```

上記コマンドにより .git/hooks/pre-commit の内容が更新されます。 なので初回のみ対応が必要です。
これにより commit 前に `npm run pre-commit` を実行してくれるようになります。

### コマンド

```bash
# 起動
npm run dev
# コード整形
npm run format
# タイプチェック
npm run typecheck
# lint
npm run lint:eslint:fix
```

## 方針

WIP
