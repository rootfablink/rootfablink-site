export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MODERATOR"
  | "SUPPORT_AGENT"
  | "VERIFICATION_AGENT"
  | "BUYER"
  | "SUPPLIER"
  | "LOGISTICS_PROVIDER"
  | "CUSTOMS_BROKER"
  | "SERVICE_PROVIDER"
  | "COMPANY_MEMBER";

export type VerificationStatus =
  | "UNVERIFIED"
  | "PENDING_REVIEW"
  | "PARTIALLY_VERIFIED"
  | "VERIFIED_SUPPLIER"
  | "VERIFIED_FACTORY"
  | "PREMIUM_VERIFIED"
  | "REJECTED"
  | "SUSPENDED";

export type ProductStatus = "DRAFT" | "PENDING_REVIEW" | "ACTIVE" | "REJECTED" | "ARCHIVED";

export type RfqStatus = "DRAFT" | "OPEN" | "MATCHING" | "QUOTING" | "CLOSED" | "EXPIRED" | "REMOVED";

export interface CompanySummary {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string;
  companyType: string;
  verificationStatus: VerificationStatus;
  trustScore: number;
}

export interface ProductSummary {
  id: string;
  companyId: string;
  title: string;
  slug: string;
  categoryId: string;
  moq: number;
  currency: string;
  priceMin?: number;
  priceMax?: number;
  status: ProductStatus;
}
