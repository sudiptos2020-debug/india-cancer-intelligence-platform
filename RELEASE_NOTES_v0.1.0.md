# India Cancer Intelligence Platform Engineering API — Release v0.1.0

Release v0.1.0
Date: 2026-08-02

Summary
- MVP release for India Cancer Intelligence Platform Engineering API
- Core features:
  - FastAPI async API, SQLAlchemy async repositories, Alembic migrations
  - Endpoints: health, incidence, mortality, trends, survival, screening, access, hotspots, dashboard
  - Seed data and sample deployment with Docker Compose
  - Auto-generated OpenAPI (openapi/openapi.json and openapi/openapi.yaml)

Notes
- No authentication/RBAC included in this milestone. Next milestone will implement enterprise security.
- See DEPLOYMENT_CHECKLIST.md and DOCKER_DEPLOY.md for deployment instructions.
