# API Usage Guide (v0.1.0)

Base URL: http://<host>:8000

Swagger UI: /docs
OpenAPI JSON: /openapi.json

Endpoints (examples)

Health
GET /api/v1/health
Response: {"status":"ok"}

Incidence
GET /api/v1/incidence?state=Karnataka&cancer_site=breast&year=2019

Mortality
GET /api/v1/mortality?state=Karnataka&year=2019

Trends
GET /api/v1/trends?metric=incidence&limit=100

Survival
GET /api/v1/survival

Screening
GET /api/v1/screening?state=Karnataka&page=1&page_size=20

Access
GET /api/v1/access?state=Delhi

Hotspots
GET /api/v1/hotspots?limit=10

Dashboard
GET /api/v1/dashboard?state=Karnataka

Notes
- Responses are JSON and conform to the Pydantic response models used by the app (viewable in Swagger).
- No authentication is enabled in this release.
