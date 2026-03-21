.PHONY: up down logs dev dev-down dev-logs build test test-coverage lint e2e e2e-ui dead-code

# Production
up:
	docker compose rm -f 2>/dev/null; docker compose up -d --remove-orphans

down:
	docker compose down

logs:
	docker compose logs -f

build:
	docker compose build

# Dev
dev:
	docker compose -f docker-compose.dev.yml rm -f 2>/dev/null; docker compose -f docker-compose.dev.yml up -d --remove-orphans

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

# Frontend (local)
test:
	cd frontend && npm test

test-coverage:
	cd frontend && npm run test:coverage

lint:
	cd frontend && npm run lint

e2e:
	cd frontend && npm run test:e2e

e2e-ui:
	cd frontend && npm run test:e2e:ui

dead-code:
	cd frontend && npm run dead-code
