# API Conventions

## Patterns

- `GET /api/companies`
- `GET /api/companies/:id`
- `POST /api/companies`
- `PATCH /api/companies/:id`
- `GET /api/products`
- `POST /api/products`
- `GET /api/rfqs`
- `POST /api/rfqs`
- `POST /api/quotations`
- `GET /api/admin/users`
- `PATCH /api/admin/companies/:id/verify`

## Rules

- Validate request bodies with schemas before service execution.
- Enforce permissions on the server.
- Use cursor or page pagination for list endpoints.
- Return structured errors with stable codes.
- Log admin and sensitive actions to `AuditLog`.
