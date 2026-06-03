import { z } from "zod";

export const emailSchema = z.string().trim().email().max(254).transform((email) => email.toLowerCase());

export const passwordSchema = z
  .string()
  .min(12)
  .max(128)
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number")
  .regex(/[^A-Za-z0-9]/, "Password must include a symbol");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128)
}).strict();

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().trim().min(2).max(120),
  accountType: z.enum(["BUYER", "SUPPLIER", "LOGISTICS_PROVIDER", "CUSTOMS_BROKER"])
}).strict();

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20)
}).strict();

export const searchQuerySchema = z.object({
  q: z.string().trim().min(1).max(120),
  category: z.string().trim().max(80).optional(),
  country: z.string().trim().max(80).optional()
}).merge(paginationSchema).strict();

export const companyProfileSchema = z.object({
  name: z.string().trim().min(2).max(160),
  country: z.string().trim().min(2).max(80),
  city: z.string().trim().min(1).max(80),
  website: z.string().trim().url().max(240).optional(),
  description: z.string().trim().max(2_000).optional()
}).strict();

export const messageSchema = z.object({
  conversationId: z.string().cuid(),
  body: z.string().trim().min(1).max(5_000)
}).strict();

export const rfqSchema = z.object({
  title: z.string().trim().min(4).max(180),
  description: z.string().trim().min(20).max(5_000),
  categoryId: z.string().cuid(),
  quantity: z.coerce.number().int().positive().max(1_000_000_000),
  destinationCountry: z.string().trim().min(2).max(80),
  deliveryTerms: z.string().trim().max(80).optional()
}).strict();

export const quotationSchema = z.object({
  rfqId: z.string().cuid(),
  price: z.coerce.number().positive().max(1_000_000_000).optional(),
  currency: z.string().trim().length(3).default("USD"),
  moq: z.coerce.number().int().positive().max(1_000_000_000).optional(),
  leadTime: z.string().trim().max(120).optional(),
  message: z.string().trim().max(4_000).optional()
}).strict();

export const allowedUploadExtensions = {
  publicImage: ["jpg", "jpeg", "png", "webp"],
  privateDocument: ["pdf", "jpg", "jpeg", "png", "webp"]
} as const;

export const uploadLimits = {
  publicImageBytes: 5 * 1024 * 1024,
  privateDocumentBytes: 15 * 1024 * 1024
} as const;

export function isAllowedUpload(filename: string, category: keyof typeof allowedUploadExtensions) {
  const extension = filename.split(".").pop()?.toLowerCase();

  if (!extension || filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
    return false;
  }

  return (allowedUploadExtensions[category] as readonly string[]).includes(extension);
}

export type RateLimitRule = {
  limit: number;
  windowMs: number;
};

export const rateLimitRules = {
  login: { limit: 5, windowMs: 15 * 60 * 1000 },
  register: { limit: 5, windowMs: 60 * 60 * 1000 },
  passwordReset: { limit: 3, windowMs: 60 * 60 * 1000 },
  message: { limit: 60, windowMs: 60 * 1000 },
  rfq: { limit: 20, windowMs: 60 * 60 * 1000 },
  upload: { limit: 30, windowMs: 60 * 60 * 1000 },
  search: { limit: 120, windowMs: 60 * 1000 },
  admin: { limit: 30, windowMs: 60 * 1000 }
} satisfies Record<string, RateLimitRule>;

export type AuditEvent = {
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
};

export function redactSecuritySensitiveValue(value: string) {
  if (value.length <= 8) {
    return "[REDACTED]";
  }

  return `${value.slice(0, 4)}...[REDACTED]...${value.slice(-4)}`;
}

export function safeErrorResponse(code: string, message = "We could not process this request.") {
  return {
    error: {
      code,
      message
    }
  };
}
