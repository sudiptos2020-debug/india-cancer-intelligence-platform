# Docker Deployment Instructions

Local (Docker Compose)
1. Build and start:
   docker compose up --build -d
2. Migrate:
   docker compose exec api bash -lc "poetry run alembic upgrade head"  # or run locally
3. Seed:
   docker compose exec api bash -lc "poetry run python -m seeds.seed_db"

Production (recommendations)
- Use multi-stage optimized Dockerfile for production
- Use a container registry (GHCR, ECR, GCR)
- Deploy with orchestrator (Kubernetes) and set resource limits
- Use managed Postgres (or self-hosted with backups), enable PostGIS
- Store secrets in Vault/KMS
- Use readiness/liveness probes and rolling updates
