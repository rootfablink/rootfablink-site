# Cloudflare Security Configuration

## DNS for Vercel

Start with DNS-only records during Vercel validation.

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

After Vercel confirms SSL and domains are stable, Cloudflare proxy can be evaluated. Keep compatibility with Vercel domain verification in mind.

## SSL/TLS

- SSL mode: Full after Vercel SSL is active.
- Always Use HTTPS: On.
- Automatic HTTPS Rewrites: On.
- Minimum TLS version: TLS 1.2 or higher.

## WAF

- Enable Cloudflare Managed Rules.
- Enable OWASP Core Ruleset where available.
- Monitor false positives before blocking business-critical international traffic.

## Recommended Rules

### Admin

- Path: `/admin`, `/en/admin`, `/tr/admin`
- Action: Managed Challenge or Cloudflare Access for internal staff.
- Future: IP allowlist for internal admin networks if operationally possible.

### Authentication

- Paths:
  - `/api/auth/login`
  - `/api/auth/register`
  - `/api/auth/forgot-password`
- Action: challenge suspicious traffic, rate limit repeated attempts.

### Uploads

- Paths:
  - `/api/uploads`
  - `/api/verification/documents`
- Action: rate limit, inspect, and challenge suspicious clients.

### Business Workflows

- Paths:
  - `/api/rfq`
  - `/api/messages`
  - `/api/quotations`
- Action: rate limit abuse while allowing legitimate buyer/supplier usage.

## Bot Protection

- Enable Bot Fight Mode or Bot Management depending on plan.
- Challenge suspicious login/admin traffic.
- Do not block verified search engine crawlers.

## Cache

- Do not cache authenticated APIs.
- Do not cache private document URLs.
- Cache public static assets only.
