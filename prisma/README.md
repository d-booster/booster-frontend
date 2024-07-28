
## prismaを編集したい人向けドキュメント

### 新しくテーブルを作成したりカラムを追加する場合
**フロー**

1. prisma/shema.prisma ファイルを編集してスキーマを設定する
2. `dotenv -e .env.local -- npx prisma db push` で、マイグレーションファイルを生成せず同期し動作確認する
3. `make generate` で型やコードを生成する
4. `make migrate` でマイグレーションを実行する
**説明**

開発中の試行錯誤は `db push` で DB への反映と Prisma Client の更新を行い（内部的に generate が実行されるので実際に実行するコマンドは prisma db push だけでOK）、いい感じになったら `migrate dev` でマイグレーションファイルを生成するというワークフローです。


### コマンド
```zsh
make generate       # スキーマファイルから型やコードを生成します
npx prisma format    # schema.prismaをいい感じにフォーマットしてくれます
dotenv -e .env.local -- npx prisma db push #DB への反映と Prisma Client の更新を行います 
```

### Prisma チュートリアル
https://zenn.dev/thirosue/books/49a4ee418743ed/viewer/57d161
