# Rootfablink Initial Architecture

## Existing project inspection

The workspace initially contained only `rootfablink.com.tr .pdf` and no Git repository or application source code. The first implementation therefore creates a clean monorepo foundation rather than modifying an existing app.

## Recommended architecture

Rootfablink should evolve as a TypeScript monorepo with clearly separated applications and shared packages:

- `apps/web`: Next.js public site, auth entry points, buyer/supplier dashboards, and future admin UI.
- `apps/api`: NestJS backend API with modular bounded contexts.
- `packages/database`: Prisma schema and database client boundary.
- `packages/auth`: role and permission contracts used by both API and UI.
- `packages/types`: shared platform domain types.
- `packages/i18n`: supported locale and text-direction configuration.
- `packages/ui`: future shared design system components.

## Backend module roadmap

The API should be expanded by bounded context:

- Auth and sessions
- Users and companies
- Factory profiles
- Products and categories
- RFQs and quotations
- Messaging
- Verification documents
- Logistics and customs
- Billing and subscriptions
- Admin, support, audit, and fraud signals

## Security baseline

- Backend permission checks are mandatory for every protected action.
- Private verification documents must use protected storage and signed access.
- Admin actions should create audit log records.
- Rate limiting, refresh-token rotation, MFA preparation, and secure upload validation should be implemented before production launch.
