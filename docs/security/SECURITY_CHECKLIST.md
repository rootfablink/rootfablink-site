# ROOTFABLINK Security Checklist

## Browser and Frontend

- [x] Content Security Policy configured.
- [x] Clickjacking protection configured.
- [x] MIME sniffing disabled.
- [x] Referrer policy configured.
- [x] Permissions policy configured.
- [x] No `dangerouslySetInnerHTML` found in current source.
- [ ] Re-test CSP after adding analytics, CDN storage, or third-party widgets.

## Authentication

- [ ] Implement bcrypt or argon2 password hashing.
- [ ] Normalize emails before account lookup.
- [ ] Add email verification.
- [ ] Add secure login error responses.
- [ ] Add brute-force protection and rate limiting.
- [ ] Use httpOnly, Secure, SameSite cookies.
- [ ] Add refresh token rotation if JWT refresh tokens are used.
- [ ] Add admin MFA preparation.

## Authorization

- [x] RBAC permission map exists.
- [x] Admin/dashboard middleware guard contract added.
- [ ] Backend authorization guards for protected APIs.
- [ ] Ownership checks for company, product, RFQ, quotation, message, and document access.
- [ ] Audit logs for admin and sensitive company actions.

## API Security

- [x] CORS now uses explicit allowed origins.
- [ ] Method validation for each API route.
- [ ] Zod validation at backend boundary.
- [ ] Consistent safe error responses.
- [ ] Rate limiting enforcement.
- [ ] CSRF protection for cookie-based state-changing requests.

## File Uploads

- [x] Allowed extension lists documented in code.
- [x] Size limits documented in code.
- [ ] MIME sniffing implementation.
- [ ] Private object storage.
- [ ] Signed URL access.
- [ ] Virus scanning preparation.
- [ ] Document view/download audit logs.

## Database

- [x] Prisma schema uses PostgreSQL and modeled relations.
- [x] AuditLog model exists.
- [ ] Add indexes for frequent protected lookups when queries are implemented.
- [ ] Add application-level ownership constraints.
- [ ] Add encrypted storage for sensitive secrets if stored.

## GitHub

- [x] `.gitignore` excludes `.env`, `.env.local`, `.vercel`, `.next`, logs, and build outputs.
- [ ] Enable GitHub secret scanning.
- [ ] Enable Dependabot.
- [ ] Add branch protection.
- [ ] Require PR review for production branch.
- [ ] Add CI for lint, typecheck, and build.

## Vercel

- [x] Build succeeds locally.
- [x] Production security headers are configured.
- [ ] Add environment variables in Vercel.
- [ ] Verify production domain and SSL.
- [ ] Consider Vercel Deployment Protection for previews.

## Cloudflare

- [ ] Add Vercel DNS records.
- [ ] Set SSL mode to Full after Vercel SSL is active.
- [ ] Enable managed WAF rules.
- [ ] Enable OWASP Core Ruleset where available.
- [ ] Add admin/login/upload rate-limit and challenge rules.
