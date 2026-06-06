# Rootfablink Security Overview

## Current Stack

- Web: Next.js App Router with TypeScript and Tailwind CSS.
- API: NestJS-ready service shell with a health endpoint.
- Data model: Prisma PostgreSQL schema.
- Shared packages: auth/RBAC contracts, domain types, and security helper contracts.
- Deployment target: GitHub, Vercel, and Cloudflare.

## Implemented Controls

- Production security headers in the Next.js configuration.
- Balanced CSP for the current first-party web app.
- Admin and dashboard middleware guard contract based on secure session cookie presence.
- RBAC permission map and permission helpers.
- CORS configured from explicit allowed origins for the API shell.
- Input validation schemas for auth, company profile, RFQ, quotation, messaging, pagination, and search.
- Upload allowlist and size-limit constants for public images and private documents.
- Rate-limit rule definitions for auth, RFQ, messaging, uploads, search, and admin routes.
- Safe error response and secret redaction helpers.
- Environment variable placeholders only; no real secrets are committed.

## Current Security Strengths

- Strong TypeScript settings and strict mode.
- Prisma schema avoids raw SQL by default.
- Password hashes are represented in the data model; plaintext password storage is not modeled.
- AuditLog model already exists for sensitive action tracking.
- VerificationDocument model separates company documents from public product data.
- `.env` files are ignored by Git.
- Build, lint, and typecheck pass.

## Current Weaknesses

- Real authentication is not implemented yet.
- Middleware cannot verify signed sessions until the auth system issues signed httpOnly cookies.
- API currently exposes only health; protected business APIs still need backend auth and authorization checks.
- Rate-limit rules are defined, but Redis-backed enforcement is not wired because no API routes exist yet.
- File upload validation is prepared, but no upload endpoint/storage integration exists yet.
- Admin MFA, admin IP controls, and document access logging are future implementation items.

## Critical Risks

- Do not expose admin or dashboard pages in production without real session issuance.
- Do not implement upload endpoints without private storage, file validation, and audit logging.
- Do not use wildcard CORS for authenticated APIs.
- Do not store JWTs or sensitive refresh tokens in localStorage.
- Do not serve verification documents from a public directory.

## High Priority Next Work

1. Implement real authentication with password hashing, email verification, and httpOnly secure cookies.
2. Replace middleware cookie presence checks with signed-session verification.
3. Add backend guards for every protected API route.
4. Add Redis-backed rate limiting for auth, search, RFQ, messaging, upload, and admin routes.
5. Add private document storage with signed URL access and audit logs.
6. Add admin MFA preparation and admin audit workflow.

## Medium Priority Next Work

- Add CSRF protection when cookie-based auth is active.
- Add structured server-side logging.
- Add security tests for protected routes, invalid input, and headers.
- Add Dependabot and GitHub Actions CI.
- Add privacy, terms, cookie, and data deletion/export pages.

## Enterprise Recommendations

- Use OWASP ASVS as the acceptance baseline for auth, access control, file handling, logging, and API security.
- Keep Cloudflare WAF enabled and tune route-specific rules for auth, admin, uploads, RFQs, and messages.
- Use Vercel Preview protection for private/staging previews.
- Use a managed Postgres provider with SSL, backups, least-privilege DB users, and secret rotation.
- Treat future AI and payment features as separate security scopes.
