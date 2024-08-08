# booster-web-client

## Getting Started

### セットアップ
**node**

`node v20.0.0` が必要です。ローカルにインストールしてください

```bash
$ node -v
v20.0.0
```

nodebrewを利用している場合はこちら
https://qiita.com/chihiro/items/13652c461519f8922f56

**Docker**

supabaseをローカルで起動するためにDockerが必要です。Dockerがインストールされていない場合はインストールしてください。
https://docs.docker.com/desktop/install/mac-install/

**必要なパッケージをインストール**

```bash
$ npm i
```

### 環境変数
初回の`make run` 実行後にターミナルに表示される supabaseの `anon key` (表示されない場合、`supabase status` を実行) を、`.env.local` ファイルの`NEXT_PUBLIC_SUPABASE_ANON_KEY`に設定してください。
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=<ここに設定する>
```

### コマンド

```bash
# 起動
make run
# formatとlintを実行
make check
# タイプチェック
npm run typecheck
```

## 方針

### ブランチ運用

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

### DB
Supabase を採用しています。
`make run` 起動後に http://127.0.0.1:54323 にアクセスすることでダッシュボードを利用できます。

DBの定義やマイグレーション操作を行う場合、下記の記事を参考にしてください。
https://ritaiz.com/articles/how-to-use-supabase-cli

