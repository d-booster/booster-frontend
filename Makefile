
.PHONY: setup-local
setup-local: ## ローカル環境用のセットアップを行う
	@if [ ! -e .env.local ]; then \
  		cp .env.template .env.local; \
	fi
	@if ! brew list supabase >/dev/null 2>&1; then \
  		brew install supabase/tap/supabase; \
	fi
	@if ! command -v dotenv >/dev/null 2>&1; then \
  		npm install -g dotenv-cli; \
	fi
	@$(MAKE) generate

run-supabase: ## supabase 起動
	supabase start

run-dev: ## npm run dev
	npm run dev

.PHONY: run
run: setup-local run-supabase migrate-dev-local run-dev ## ローカルでアプリケーションを起動する

.PHONY: check
check: ## formatとlintを実行
	npm run check
	npx prisma format

.PHONY: migrate
migrate: ## prismaで マイグレーションファイルを作成する
	@read -p "migration 名を入力: " name; \
	npx dotenv -e .env.local -- npx prisma migrate dev --name $$name

migrate-dev-local:
	npx dotenv -e .env.local -- npx prisma migrate dev

.PHONY: generate
generate: ## コードの自動生成
	npx prisma generate

.PHONY: help
help: ## 実行できるコマンドを一覧表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
