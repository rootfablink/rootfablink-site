# Environment Variables

Use placeholders only in source control. Real values must be stored in Vercel, GitHub Secrets, or the relevant managed provider.

## Public Variables

These can be exposed to the browser:

```env
NEXT_PUBLIC_APP_URL=https://rootfablink.com
NEXT_PUBLIC_SITE_URL=https://rootfablink.com
```

## Server-Only Variables

Never expose these through `NEXT_PUBLIC_`:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
JWT_SECRET=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
ENCRYPTION_KEY=
REDIS_URL=
WEB_ORIGIN=
CORS_ALLOWED_ORIGINS=
UPLOAD_PROVIDER=
STORAGE_BUCKET=
STORAGE_REGION=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
EMAIL_SERVER=
EMAIL_FROM=
```

## Rotation Procedure

1. Generate a new secret value.
2. Add the new value in Vercel for the target environment.
3. Redeploy.
4. Invalidate old sessions or tokens if the secret affects auth.
5. Remove the old value.
6. Record the rotation in the security log.

## Rules

- Do not commit `.env`, `.env.local`, or `.env.*.local`.
- Do not print secrets in CI logs.
- Do not use production secrets in preview unless explicitly approved.
- Rotate secrets after suspected compromise.
- Use least-privilege credentials for storage, database, email, and future AI/payment providers.
