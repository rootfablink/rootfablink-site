# RootFabLink Platform Framework

RootFabLink is a production frontend foundation for a global B2B manufacturing, sourcing, logistics, customs and trade services marketplace. Alibaba is used only as a functional benchmark; RootFabLink keeps its own brand, product language, UI structure and Türkiye-to-global positioning.

## Current Frontend Modules

- Locale-aware marketplace routes for `/tr`, `/en` and other supported locales.
- Marketplace header with category, verified manufacturer, order protection, buyer center, supplier center, preferences, sign-in and search/lens surfaces.
- Auth login and registration flows with email/password demo behavior. Google OAuth is not shown because backend OAuth is not connected.
- Account type registration cards for buyer, supplier, logistics provider and customs broker.
- i-WALL public supplier profile plus product and pattern draft pages.
- Marketplace placeholders for products, manufacturers, RFQ, trade protection, messages, account, supplier and admin workspaces.

## Future Backend Modules

- Auth service with email/password, OAuth providers, refresh tokens, MFA and RBAC.
- User, company, supplier, buyer, logistics and customs broker services.
- Product catalog, RFQ, quote, messaging, document, verification, ads and analytics services.
- Trade protection workflow service prepared for future escrow/payment partners.
- Admin moderation, audit logging and verification review queues.

## Database Tables

Recommended backend tables include users, sessions, companies, buyer_profiles, supplier_profiles, logistics_profiles, customs_broker_profiles, products, product_images, categories, rfqs, quotes, conversations, messages, documents, verification_requests, ad_campaigns, analytics_events, orders, sample_requests and audit_logs.

## API Endpoints

Initial API groups should include `/auth`, `/accounts`, `/suppliers`, `/buyers`, `/products`, `/categories`, `/rfqs`, `/quotes`, `/messages`, `/documents`, `/verification`, `/logistics`, `/customs`, `/ads`, `/analytics` and `/admin`.

## Auth Requirements

- Never persist raw passwords in localStorage or logs.
- Use secure password hashing on the backend.
- Use RBAC for buyer, supplier, logistics, customs broker and admin roles.
- Add CSRF protection, rate limits, session rotation and audit logs.

## Payment And Trade Protection

RootFabLink should use careful wording until payment infrastructure is implemented: prepared for, designed for, verification-ready and future workflow. Future integrations may include Stripe, Wise, Payoneer, SWIFT, bank transfer and escrow partners.

## Logistics And Verification Workflow

Logistics workflows should support freight quote requests, route coverage, Incoterms, shipment documents and lead management. Verification workflows should support company registration, tax certificate, factory photos, product catalogs, ISO/CE certificates, test reports, inspection reports, export documents and brand authorization.

## AI And Rootfablink Lens Roadmap

Rootfablink Lens should remain a clearly labeled visual search placeholder until backend AI services are connected. Future features may include image upload, similar product discovery, supplier matching, category estimation and attribute extraction.

## Admin And Security Roadmap

Admin should include user management, supplier verification review, product moderation, category management, RFQ moderation, dispute workflow preparation, document review, sponsored placement management, platform analytics and security/audit logs.
