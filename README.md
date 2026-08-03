# India Cancer Intelligence Platform (ICIP)

API-first engineering architecture for cancer intelligence in India,
built on FastAPI + async SQLAlchemy + PostgreSQL.

## Live Demo
- Swagger UI: [add your Railway URL here]/docs
- OpenAPI schema: [add your Railway URL here]/openapi.json

## Tech Stack
- FastAPI (async, OpenAPI 3.1-first)
- SQLAlchemy (async) + PostgreSQL
- Alembic migrations
- Docker

## Local Setup
1. Clone the repo
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL`
3. `docker compose up --build`
4. Visit `http://localhost:8000/docs`

## Running Migrations