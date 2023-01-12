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