#!/usr/bin/env bash
set -Eeuo pipefail

# Validation & release helper for India Cancer Intelligence Platform v0.1.0
# NOTE: This script is intended to be run locally from the repository root.
# It attempts to start Docker Compose, run migrations, seed the DB, run tests,
# verify endpoints and produce OpenAPI artifacts. It will not push or create PRs.

BASE_URL=${BASE_URL:-http://localhost:8000}

echo "1/7 - Starting Docker Compose (if docker-compose.yml present)"
if [ -f docker-compose.yml ]; then
  docker compose up --build -d
else
  echo "docker-compose.yml not found; ensure DB + API are running before continuing."
fi

# wait for API health
echo "2/7 - Waiting for API health endpoint: ${BASE_URL}/api/v1/health"
for i in {1..60}; do
  if curl -sSf --max-time 5 "${BASE_URL}/api/v1/health" >/dev/null 2>&1; then
    echo "API is healthy"
    break
  fi
  sleep 2
  if [ "$i" -eq 60 ]; then
    echo "Timed out waiting for API health" >&2
    exit 1
  fi
done

# Run migrations (try inside container if available)
echo "3/7 - Running Alembic migrations"
API_CONT=$(docker ps --format '{{.Names}}' | grep -E 'api|icip|icip-api' | head -n1 || true)
if [ -n "$API_CONT" ]; then
  echo "Running migrations inside container $API_CONT"
  docker exec -it "$API_CONT" bash -lc "if command -v poetry >/dev/null 2>&1; then poetry run alembic upgrade head; elif command -v alembic >/dev/null 2>&1; then alembic upgrade head; else echo 'alembic not found in container'; exit 1; fi"
else
  if command -v poetry >/dev/null 2>&1; then
    poetry run alembic upgrade head
  elif command -v alembic >/dev/null 2>&1; then
    alembic upgrade head
  else
    echo "Alembic not available. Run migrations manually." >&2
  fi
fi

# Seed DB
echo "4/7 - Seeding the database"
if [ -n "$API_CONT" ]; then
  docker exec -it "$API_CONT" bash -lc "if command -v poetry >/dev/null 2>&1; then poetry run python -m seeds.seed_db; else python -m seeds.seed_db; fi"
else
  if command -v poetry >/dev/null 2>&1; then
    poetry run python -m seeds.seed_db
  elif command -v python3 >/dev/null 2>&1; then
    python3 -m seeds.seed_db
  else
    echo "Python not available to run seed script." >&2
  fi
fi

# Run tests
echo "5/7 - Running pytest"
if [ -n "$API_CONT" ]; then
  docker exec -it "$API_CONT" bash -lc "if command -v poetry >/dev/null 2>&1; then poetry run pytest -q; elif command -v pytest >/dev/null 2>&1; then pytest -q; else echo 'pytest not found in container'; fi"
else
  if command -v poetry >/dev/null 2>&1; then
    poetry run pytest -q
  elif command -v pytest >/dev/null 2>&1; then
    pytest -q
  else
    echo "pytest not found locally; skip tests or install pytest." >&2
  fi
fi

# Verify endpoints
echo "6/7 - Verifying endpoints"
ENDPOINTS=("/api/v1/health" "/api/v1/incidence" "/api/v1/mortality" "/api/v1/trends" "/api/v1/survival" "/api/v1/screening" "/api/v1/access" "/api/v1/hotspots" "/api/v1/dashboard" "/docs" "/openapi.json")
FAIL=0
for ep in "${ENDPOINTS[@]}"; do
  url="${BASE_URL}${ep}"
  echo -n "Checking $url ... "
  if curl -sSf --max-time 10 "$url" >/dev/null 2>&1; then
    echo "OK"
  else
    echo "FAIL"
    FAIL=1
  fi
done
if [ $FAIL -ne 0 ]; then
  echo "One or more endpoints failed verification" >&2
  exit 1
fi

# Save openapi.json
echo "7/7 - Fetching OpenAPI JSON"
mkdir -p openapi
curl -sS "${BASE_URL}/openapi.json" -o openapi/openapi.json || echo "Failed to fetch openapi.json"


echo "Validation complete. If all steps passed, the MVP is ready for release v0.1.0."
