up:
	docker compose rm -f 2>/dev/null; docker compose up -d --remove-orphans

down:
	docker compose down

logs:
	docker compose logs -f
