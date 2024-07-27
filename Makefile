
.PHONY: setup-local
setup-local: ## ローカル環境用のセットアップを行う
	@if [ ! -e .env.local ]; then \
  		cp .env.template .env.local; \
	fi
	brew install supabase/tap/supabase

run-supabase: ## supabase 起動
	supabase start

run-dev: ## npm run dev
	npm run dev

.PHONY: run
run: setup-local run-supabase migrate run-dev ## ローカルでアプリケーションを起動する

.PHONY: check
check: # formatとlintを実行
	npm run check

.PHONY: migrate
migrate:
	npm run migrate:dev

.PHONY: help
help: ## 実行できるコマンドを一覧表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
