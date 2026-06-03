# ROOTFABLINK

ROOTFABLINK is a global B2B manufacturing, sourcing, logistics, and trade platform foundation.

## Current foundation

- Monorepo with `apps/web`, `apps/api`, and shared `packages/*`.
- Next.js public web app with locale-aware routes.
- Enterprise homepage, auth screens, dashboard shell, and admin shell.
- Shared TypeScript domain contracts.
- Prisma PostgreSQL schema covering users, companies, factories, products, RFQs, quotations, messaging, verification, logistics, subscriptions, support, and audit logs.
- Architecture and first-version product documentation.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
npm run typecheck
```

## Production deployment

### Package manager

This project uses npm. The lock file is `package-lock.json`.

### Local verification

Run these commands before publishing:

```bash
npm install
npm run lint
npm run build
```

### Vercel settings

Use these settings when importing the GitHub repository into Vercel:

- Framework Preset: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave default for Next.js
- Root Directory: default when this repository root is imported directly; use `rootfablink-site` only if this project is inside a parent repository folder with that name.

Required environment variables should be copied from `.env.example` and filled in Vercel Project Settings.

### Cloudflare DNS

Add these DNS records for Vercel:

```text
Type: A
Name: @
Value: 76.76.21.21
Proxy status: DNS only initially

Type: CNAME
Name: www
Value: cname.vercel-dns.com
Proxy status: DNS only initially
```

After Vercel confirms the domains and SSL is active, set Cloudflare SSL mode to `Full`.

## Structure

```text
apps/web        Next.js customer-facing app and dashboard shell
apps/api        NestJS-ready backend service foundation
packages/ui     Shared UI primitives
packages/types  Shared business/domain types
packages/auth   Role and permission contracts
packages/i18n   Locale configuration
packages/database Prisma schema and database client boundary
docs            Architecture, product, API, database, and deployment notes
infra           Docker and NGINX preparation
```
