# Vercel Security Settings

## Project Settings

- Framework Preset: Next.js.
- Install Command: `npm install`.
- Build Command: `npm run build`.
- Output Directory: default.
- Root Directory: default if this repository is imported directly.

## Environment Variables

Add production, preview, and development variables separately. Do not reuse production secrets for preview unless operationally required.

Minimum variables:

```env
NEXT_PUBLIC_APP_URL=https://rootfablink.com
NEXT_PUBLIC_SITE_URL=https://rootfablink.com
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://rootfablink.com
JWT_SECRET=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
ENCRYPTION_KEY=
REDIS_URL=
CORS_ALLOWED_ORIGINS=https://rootfablink.com,https://www.rootfablink.com
WEB_ORIGIN=https://rootfablink.com
UPLOAD_PROVIDER=
STORAGE_BUCKET=
STORAGE_REGION=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
EMAIL_SERVER=
EMAIL_FROM=
```

## Domains

- Add `rootfablink.com`.
- Add `www.rootfablink.com`.
- Verify HTTPS is active before switching Cloudflare SSL mode to Full.

## Preview Deployments

- Use Vercel Deployment Protection for private previews.
- Use separate preview database and preview secrets.
- Do not expose production document storage credentials to preview deployments.

## Serverless/API Security

- Do not enable debug stack traces in production.
- Do not log secrets, full tokens, private document contents, or payment data.
- Keep CORS origin-specific.
- Add Redis-backed rate limiting before exposing auth and workflow APIs.
