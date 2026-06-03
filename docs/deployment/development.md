# Development Deployment

## Local services

Use Docker Compose for PostgreSQL and Redis during development:

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

## App commands

```bash
npm install
npm run dev
npm run build
```

## Environment

Copy `.env.example` to `.env.local` for local web configuration and `.env` for API/database processes as needed.
