# Incident Response

## 1. Detect

Identify the alert source: Cloudflare, Vercel, GitHub, database provider, logs, user report, or internal review.

## 2. Preserve Logs

Preserve relevant logs before redeploying or deleting affected resources:

- Vercel deployment logs
- API logs
- Cloudflare firewall events
- Database audit logs
- Admin action logs
- Authentication events

## 3. Contain

- Disable affected accounts.
- Revoke affected sessions and tokens.
- Disable compromised API keys.
- Temporarily challenge or block abusive traffic in Cloudflare.
- Disable affected upload or admin functionality if required.

## 4. Rotate Secrets

Rotate affected credentials:

- Database URL/password
- JWT/Auth secrets
- Storage keys
- Email credentials
- Payment webhook secrets
- Future AI provider keys

## 5. Investigate

- Identify exploited route, user, token, or dependency.
- Review audit logs.
- Review file/document access logs.
- Determine whether private trade documents or messages were exposed.

## 6. Patch

- Fix the vulnerability.
- Add a regression test.
- Review related code paths for similar flaws.
- Redeploy from a clean commit.

## 7. Notify

Notify affected users or companies if legally required or contractually appropriate. Do not disclose unnecessary sensitive details.

## 8. Document

Record:

- Timeline
- Root cause
- Affected systems
- Data exposure assessment
- Fixes shipped
- Prevention controls added

## 9. Prevent

- Add Cloudflare rule updates.
- Add rate limits.
- Add validation or authorization tests.
- Update security docs.
- Add monitoring or alerting for recurrence.
