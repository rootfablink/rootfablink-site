# Rootfablink Gap Audit

## Current strengths

- Monorepo foundation exists.
- Next.js web app, NestJS-ready API shell, Prisma schema, auth permission contracts, and i18n boundaries are in place.
- English and Turkish public content now use separate editorial dictionaries.
- Public pages exist for buyers, suppliers, logistics, trust, RFQ, and pricing.
- Mobile layout has responsive header, hero, dashboard navigation, auth forms, and public page grids.

## High-priority gaps

1. Real authentication
   - Password hashing
   - JWT access tokens
   - Refresh token rotation
   - Email verification
   - Protected routes

2. Company onboarding
   - Buyer company creation
   - Supplier company creation
   - Logistics provider profile creation
   - Validation and persistence

3. Product catalog management
   - Product CRUD
   - Category tree
   - Image/document upload
   - Product approval status

4. RFQ workflow
   - Buyer RFQ form
   - Supplier matching rules
   - Quotation submission
   - Quote comparison

5. Trust and verification
   - Verification document upload
   - Admin review queue
   - Trust score calculation
   - Audit logs for moderation

6. Search
   - PostgreSQL search first
   - Later OpenSearch index boundary
   - Filters for category, country, MOQ, verification, and certification

7. Internationalization
   - English and Turkish are active.
   - Arabic, Chinese, Russian, German, French, and Spanish should not be auto-translated.
   - Each market needs native editorial copy before routes go live.

8. Deployment readiness
   - Initialize Git repository
   - Push to GitHub
   - Configure Vercel project
   - Add environment variable documentation
   - Add CI workflow
