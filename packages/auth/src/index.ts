import type { UserRole } from "@rootfablink/types";

export type Permission =
  | "manage_users"
  | "manage_companies"
  | "verify_suppliers"
  | "approve_products"
  | "manage_products"
  | "manage_categories"
  | "view_admin_dashboard"
  | "manage_rfqs"
  | "respond_to_rfqs"
  | "create_products"
  | "manage_messages"
  | "edit_company_profile"
  | "send_messages"
  | "upload_documents"
  | "view_private_documents"
  | "manage_billing"
  | "manage_support"
  | "manage_support_tickets"
  | "manage_security_settings";

const rolePermissions: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    "manage_users",
    "manage_companies",
    "verify_suppliers",
    "approve_products",
    "manage_products",
    "manage_categories",
    "view_admin_dashboard",
    "manage_rfqs",
    "respond_to_rfqs",
    "create_products",
    "manage_messages",
    "edit_company_profile",
    "send_messages",
    "upload_documents",
    "view_private_documents",
    "manage_billing",
    "manage_support",
    "manage_support_tickets",
    "manage_security_settings"
  ],
  ADMIN: ["manage_users", "manage_companies", "view_admin_dashboard", "manage_rfqs", "manage_support", "manage_support_tickets"],
  MODERATOR: ["approve_products", "manage_products", "manage_categories", "manage_rfqs"],
  SUPPORT_AGENT: ["manage_support", "manage_support_tickets", "manage_messages", "send_messages"],
  VERIFICATION_AGENT: ["verify_suppliers", "upload_documents", "view_private_documents"],
  BUYER: ["manage_rfqs", "send_messages", "upload_documents"],
  SUPPLIER: ["respond_to_rfqs", "create_products", "manage_products", "edit_company_profile", "send_messages", "upload_documents"],
  LOGISTICS_PROVIDER: ["respond_to_rfqs", "edit_company_profile", "send_messages", "upload_documents"],
  CUSTOMS_BROKER: ["respond_to_rfqs", "edit_company_profile", "send_messages", "upload_documents"],
  SERVICE_PROVIDER: ["respond_to_rfqs", "edit_company_profile", "send_messages"],
  COMPANY_MEMBER: ["edit_company_profile", "send_messages"]
};

export function hasPermission(role: UserRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function requirePermission(role: UserRole, permission: Permission) {
  if (!hasPermission(role, permission)) {
    throw new Error("FORBIDDEN");
  }
}

export function getPermissionsForRole(role: UserRole) {
  return [...rolePermissions[role]];
}
