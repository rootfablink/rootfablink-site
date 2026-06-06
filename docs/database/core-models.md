# Database Foundation

The Prisma schema in `packages/database/prisma/schema.prisma` defines the first core Rootfablink entities:

- User
- Company
- FactoryProfile
- Product
- Category
- RFQ
- Quotation
- Conversation
- Message
- VerificationDocument
- LogisticsProvider
- FreightQuoteRequest
- SupportTicket
- AuditLog
- SubscriptionPlan
- CompanySubscription

PostgreSQL is the primary database. Search can start with PostgreSQL indexes and later move product, supplier, RFQ, and logistics provider discovery into OpenSearch.
