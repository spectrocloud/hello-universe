
build: 
	@echo "Building..."
	npm run build

start:
	@echo "Starting..."
	npm run start

start-prod: clean
	@echo "Starting production server"
	npm run start-prod

clean:
	@echo "Cleaning..."
	rm -rf build

start-proxy: clean build
	@echo "Starting reverse proxy..."
	caddy run --config local-caddyfile --adapter caddyfile