.PHONY: build

build: clean
	@echo "Building..."
	npm run build

start:
	@echo "Starting..."
	npm run start

start-prod: clean build
	@echo "Starting production server"
	npm run server-prod

clean:
	@echo "Cleaning..."
	rm -rf build

start-proxy: clean build
	@echo "Starting reverse proxy..."
	caddy run --config local-caddyfile --adapter caddyfile

start-services:
	@echo "Starting services..."
	docker compose up --detach

stop-services:
	@echo "Stopping services..."
	docker compose down

format-images: ## Format images
	@echo "formatting images in /src/img/ folder"
	./scripts/compress-convert-images.sh