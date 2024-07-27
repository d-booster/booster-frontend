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

### コマンド

```bash
# 起動
npm run dev
# formatとlintを実行
npm run check
# タイプチェック
npm run typecheck
```

## 方針

## ブランチ運用

今は、mainからブランチを切りmainにマージする運用で進めます。
ブランチ名は以下のルールに従ってください。
| ブランチ名 | 説明 |
| ------------------ | -------------------- |
| `main` | 本番環境のブランチ |
| `feature/#xx-hoge` | 機能開発用のブランチ |
| `fix/#xx-hoge` | バグ修正用のブランチ |
| `hotfix/#xx-hoge` | 緊急修正用のブランチ |

### UI

NextUI, TailwindCSS がインストールされています。

基本的に、NextUI ライブラリを利用してUIを作成します。利用できるコンポーネントやテーマは以下のリンクからたどってください。
https://nextui.org/docs/components/button

NextUIで表現できない場合は、TailwindCSS を利用してください。
