# Deployment Checklist — v0.1.0

Pre-deployment
- Ensure secrets stored in a secure vault (DB credentials, OpenAI keys, JWT keys)
- Prepare production Postgres 17 with PostGIS
- Prepare Redis 7 for caching and rate-limiting
- Configure environment variables and secrets in CI/CD

Deployment
- Build container image and push to registry
- Run database migrations: alembic upgrade head
- Seed initial data: python -m seeds.seed_db
- Start services (recommended in k8s or docker compose prod)

Post-deployment
- Run smoke tests against /api/v1/health and core endpoints
- Enable monitoring and alerting (Prometheus/Grafana)
- Rotate secrets and ensure RBAC is enforced (next milestone)
