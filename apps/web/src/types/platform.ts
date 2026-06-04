export type AccountType = "buyer" | "supplier" | "logistics" | "customs" | "admin";

export type User = {
  id: string;
  email: string;
  accountType: AccountType;
  createdAt: string;
  status: "draft" | "active" | "suspended";
};

export type BuyerProfile = {
  id: string;
  userId: string;
  companyName: string;
  country: string;
  sourcingCategories: string[];
};

export type SupplierProfile = {
  id: string;
  userId: string;
  brandName: string;
  legalCompanyName: string;
  country: string;
  businessType: string;
  mainCategory: string;
  verificationStatus: "draft" | "submitted" | "under_review" | "approved" | "rejected";
};

export type LogisticsProfile = {
  id: string;
  userId: string;
  companyName: string;
  serviceModes: Array<"sea" | "air" | "land" | "warehouse" | "fulfillment">;
  routeCoverage: string[];
};

export type CustomsBrokerProfile = {
  id: string;
  userId: string;
  companyName: string;
  countries: string[];
  services: string[];
};

export type Category = {
  id: string;
  name: string;
  parentId?: string;
  complianceNote?: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  supplierId: string;
  title: string;
  categoryId: string;
  priceRange?: string;
  moq?: string;
  leadTime?: string;
  images: ProductImage[];
  status: "draft" | "under_review" | "published";
};

export type RFQ = {
  id: string;
  buyerId: string;
  productName: string;
  category: string;
  quantity: string;
  destinationCountry: string;
  status: "draft" | "published" | "closed";
};

export type Quote = {
  id: string;
  rfqId: string;
  supplierId: string;
  amount?: string;
  message: string;
  status: "draft" | "sent";
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
  attachmentIds?: string[];
};

export type Document = {
  id: string;
  ownerId: string;
  type:
    | "company_registration"
    | "tax_certificate"
    | "factory_photo"
    | "product_catalog"
    | "iso_certificate"
    | "ce_certificate"
    | "test_report"
    | "inspection_report"
    | "export_document"
    | "brand_authorization";
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected" | "expired";
};

export type VerificationRequest = {
  id: string;
  supplierId: string;
  documentIds: string[];
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected";
};

export type AdCampaign = {
  id: string;
  supplierId: string;
  type: "sponsored_product" | "featured_supplier" | "category_sponsorship" | "rfq_priority" | "search_boost" | "regional_visibility";
  status: "draft" | "planned" | "active" | "paused";
};

export type AnalyticsMetric = {
  id: string;
  ownerId: string;
  metric: string;
  value: number;
  period: string;
};

export type CountryLocalization = {
  country: string;
  language: string;
  currency: string;
  locale: string;
  direction?: "ltr" | "rtl";
};

export type TradeProtectionWorkflow = {
  id: string;
  transactionId?: string;
  status: "prepared" | "milestone_planned" | "inspection_planned" | "dispute_ready";
  futureProvider?: "stripe" | "wise" | "payoneer" | "swift" | "bank_transfer" | "escrow_partner";
};
