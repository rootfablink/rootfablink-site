import { ArrowRight, BarChart3, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";

export type PlatformModuleKey =
  | "product-detail"
  | "manufacturer-detail"
  | "rfq-new"
  | "customs"
  | "account-profile"
  | "account-messages"
  | "account-favorites"
  | "account-rfqs"
  | "account-orders"
  | "account-documents"
  | "supplier-dashboard"
  | "supplier-company"
  | "supplier-products"
  | "supplier-product-new"
  | "supplier-factory"
  | "supplier-verification"
  | "supplier-rfqs"
  | "supplier-messages"
  | "supplier-analytics"
  | "supplier-ads"
  | "supplier-documents"
  | "admin-users"
  | "admin-suppliers"
  | "admin-verification"
  | "admin-products"
  | "admin-rfqs"
  | "admin-ads"
  | "admin-security";

type ModuleCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  secondary: string;
  items: string[];
};

const en: Record<PlatformModuleKey, ModuleCopy> = {
  "product-detail": moduleCopy("Product discovery", "Product detail workspace", "A product detail foundation for price ranges, MOQ, supplier trust status, RFQ actions and future trade protection workflows.", "Request quote", "Browse products", ["Product image gallery placeholder", "Supplier trust and verification-ready badge", "MOQ, lead time and packaging summary", "Contact supplier and RFQ actions"]),
  "manufacturer-detail": moduleCopy("Manufacturer discovery", "Manufacturer showroom workspace", "A manufacturer profile foundation for company capability, export markets, certificates, product catalog and buyer contact flows.", "Contact supplier", "View manufacturers", ["Company overview", "Factory and capability profile", "Document-reviewed status placeholder", "Product catalog preview"]),
  "rfq-new": moduleCopy("RFQ network", "Create a sourcing request", "A buyer RFQ draft flow for product requirements, destination, quantity, certification needs and supplier response preparation.", "Save RFQ draft", "RFQ center", ["Product name and category", "Quantity, unit and destination", "Certification and attachment placeholders", "Supplier response workflow preparation"]),
  customs: moduleCopy("Customs and compliance", "Customs broker and compliance services", "A Global B2B Platform foundation for import/export documentation, HS code consulting, compliance support and paid lead workflows.", "Request customs support", "Explore logistics", ["Import customs support", "Export customs support", "HS code consulting", "Document preparation workflow"]),
  "account-profile": moduleCopy("Account center", "Profile management", "A buyer or supplier account workspace for identity, company, contact and role-based access preparation.", "Edit profile", "Account home", ["Contact details", "Company ownership", "Role and permissions concept", "Backend auth integration notes"]),
  "account-messages": moduleCopy("Messaging", "Messages and negotiation", "A conversation workspace for buyer-supplier messages, RFQ-linked discussion, attachments and future translation support.", "Open messages", "Account home", ["Conversation list", "Profile header", "Message composer placeholder", "RFQ-linked quote card"]),
  "account-favorites": moduleCopy("Buyer workspace", "Favorite suppliers and products", "A saved discovery workspace for products, manufacturers and future comparison lists.", "Browse products", "Buyer center", ["Saved products", "Saved suppliers", "Comparison placeholder", "Search alert preparation"]),
  "account-rfqs": moduleCopy("Buyer RFQs", "RFQ management center", "A buyer-side RFQ center for drafts, published requests, supplier responses and quote comparison preparation.", "Create RFQ", "Buyer center", ["Draft RFQs", "Published RFQs", "Quote comparison placeholder", "Response status"]),
  "account-orders": moduleCopy("Orders and samples", "Order and sample request center", "A future order workspace for sample requests, transaction preparation, shipment documents and trade protection states.", "Request sample", "Trade protection", ["Sample request drafts", "Order preparation", "Shipment document workflow", "Future escrow status"]),
  "account-documents": moduleCopy("Documents", "Document center", "A document workspace for company registration, certificates, catalogs, inspection reports and export documents.", "Upload document", "Verification", ["Company registration", "Tax certificate", "Product catalog", "Inspection report"]),
  "supplier-dashboard": moduleCopy("Supplier dashboard", "Supplier operating dashboard", "A supplier workspace for profile completion, products, RFQs, messages, verification, analytics and sponsored visibility.", "Complete profile", "Add product", ["Profile completion", "RFQs received", "Messages", "Verification status"]),
  "supplier-company": moduleCopy("Supplier profile", "Company profile management", "A company profile editor foundation for legal identity, brand information, export markets, capabilities and storefront copy.", "Save company draft", "Supplier dashboard", ["Legal company data", "Brand profile", "Export markets", "Capabilities"]),
  "supplier-products": moduleCopy("Product catalog", "Supplier product catalog", "A supplier catalog workspace for product drafts, moderation status, images, technical sheets and pricing ranges.", "Add product", "Supplier dashboard", ["Product drafts", "Catalog moderation", "Image placeholders", "Technical sheet placeholders"]),
  "supplier-product-new": moduleCopy("Product catalog", "Add a product", "A product upload foundation for title, code, material, MOQ, lead time, packaging, images and technical sheets.", "Save product draft", "Product catalog", ["Product title and code", "Material and dimensions", "MOQ and lead time", "Image and technical sheet placeholders"]),
  "supplier-factory": moduleCopy("Factory profile", "Factory and capability profile", "A supplier factory workspace for capacity, production lines, equipment, certifications and audit-ready documentation.", "Save factory draft", "Verification", ["Production capacity", "Equipment", "Factory photos", "Audit-ready status"]),
  "supplier-verification": moduleCopy("Verification", "Verification application", "A verification-ready workflow for company documents, certificates, product proof and admin review queues.", "Submit for review", "Documents", ["Company documents", "Certificates", "Factory evidence", "Admin review status"]),
  "supplier-rfqs": moduleCopy("RFQ response", "Supplier RFQ center", "A supplier-side RFQ workspace for matching opportunities, quote drafts and buyer response preparation.", "Quote now", "Supplier dashboard", ["Available RFQs", "Quote draft", "Buyer requirements", "Response tracking"]),
  "supplier-messages": moduleCopy("Messaging", "Supplier messages", "A supplier conversation workspace for buyer messages, attachments, quote cards and future translation support.", "Open inbox", "Supplier dashboard", ["Buyer conversations", "RFQ-linked messages", "Attachments", "Audit-ready records"]),
  "supplier-analytics": moduleCopy("Analytics", "Supplier analytics center", "A placeholder analytics workspace for product views, inquiries, RFQ conversion, country traffic and sponsored performance.", "View reports", "Supplier dashboard", ["Product views", "Inquiry count", "RFQ conversion", "Country traffic"]),
  "supplier-ads": moduleCopy("Sponsored visibility", "Supplier ads and growth", "A future paid growth module for sponsored products, featured suppliers, category sponsorship and RFQ priority visibility.", "Plan campaign", "Analytics", ["Sponsored products", "Featured supplier ranking", "Search boost", "RFQ priority visibility"]),
  "supplier-documents": moduleCopy("Documents", "Supplier document center", "A document management workspace for catalogs, certificates, registration documents, inspection reports and export files.", "Upload document", "Verification", ["Catalogs", "ISO and CE certificates", "Inspection reports", "Export documents"]),
  "admin-users": moduleCopy("Admin", "User management", "An admin placeholder for user records, account types, role-based access and moderation history.", "Review users", "Admin home", ["User list", "Account type", "RBAC concept", "Audit trail"]),
  "admin-suppliers": moduleCopy("Admin", "Supplier review center", "An admin placeholder for supplier profiles, onboarding states, verification readiness and moderation notes.", "Review suppliers", "Verification queue", ["Supplier profiles", "Onboarding state", "Trust status", "Review notes"]),
  "admin-verification": moduleCopy("Admin", "Verification review queue", "An admin placeholder for submitted documents, company verification, product proof and review outcomes.", "Open queue", "Security logs", ["Document review", "Company verification", "Factory evidence", "Status history"]),
  "admin-products": moduleCopy("Admin", "Product moderation", "An admin placeholder for product listing review, category assignment, compliance warnings and publication status.", "Moderate products", "Admin home", ["Product queue", "Category management", "Compliance flag", "Publication status"]),
  "admin-rfqs": moduleCopy("Admin", "RFQ moderation", "An admin placeholder for RFQ quality review, restricted category gating, buyer intent and supplier matching controls.", "Review RFQs", "Admin home", ["RFQ queue", "Buyer intent", "Category safety", "Matching controls"]),
  "admin-ads": moduleCopy("Admin", "Sponsored placement management", "An admin placeholder for campaign review, sponsored visibility states, reporting and future billing integration.", "Review campaigns", "Admin home", ["Campaign list", "Placement status", "Budget placeholder", "Performance report"]),
  "admin-security": moduleCopy("Admin", "Security and audit logs", "An admin placeholder for security events, moderation actions, role changes and audit-log preparation.", "View audit logs", "Admin home", ["Security events", "Role changes", "Moderation actions", "Audit log concept"])
};

const tr: Record<PlatformModuleKey, ModuleCopy> = {
  "product-detail": moduleCopy("Ürün keşfi", "Ürün detay çalışma alanı", "Fiyat aralığı, MOQ, üretici güven durumu, RFQ aksiyonları ve gelecekteki ticaret güvence akışları için ürün detay temeli.", "Teklif talep et", "Ürünleri incele", ["Ürün görsel galerisi taslağı", "Üretici güven ve doğrulamaya hazır rozeti", "MOQ, teslim süresi ve ambalaj özeti", "Üreticiyle iletişim ve RFQ aksiyonları"]),
  "manufacturer-detail": moduleCopy("Üretici keşfi", "Üretici showroom çalışma alanı", "Şirket kabiliyeti, ihracat pazarları, belgeler, ürün kataloğu ve alıcı iletişim akışları için üretici profili temeli.", "Üreticiyle iletişim kur", "Üreticileri incele", ["Şirket özeti", "Fabrika ve kabiliyet profili", "Belge incelemeye hazır durum", "Ürün kataloğu önizlemesi"]),
  "rfq-new": moduleCopy("RFQ pazarı", "Teklif talebi oluştur", "Ürün ihtiyacı, varış ülkesi, miktar, sertifika ihtiyacı ve üretici yanıt hazırlığı için alıcı RFQ taslak akışı.", "RFQ taslağını kaydet", "RFQ merkezi", ["Ürün adı ve kategori", "Miktar, birim ve varış ülkesi", "Sertifika ve ek dosya alanları", "Üretici yanıt akışı hazırlığı"]),
  customs: moduleCopy("Gümrük ve uyum", "Gümrük müşaviri ve uyum hizmetleri", "İthalat/ihracat evrakı, GTİP danışmanlığı, uyum desteği ve lead akışları için küresel B2B platform temeli.", "Gümrük desteği talep et", "Lojistiği incele", ["İthalat gümrük desteği", "İhracat gümrük desteği", "GTİP danışmanlığı", "Evrak hazırlama akışı"]),
  "account-profile": moduleCopy("Hesap merkezi", "Profil yönetimi", "Kimlik, şirket, iletişim ve rol bazlı erişim hazırlığı için alıcı veya üretici hesap çalışma alanı.", "Profili düzenle", "Hesap ana sayfası", ["İletişim bilgileri", "Şirket sahipliği", "Rol ve yetki konsepti", "Backend auth entegrasyon notları"]),
  "account-messages": moduleCopy("Mesajlaşma", "Mesajlar ve müzakere", "Alıcı-üretici mesajları, RFQ bağlantılı görüşme, ek dosyalar ve gelecekteki çeviri desteği için konuşma çalışma alanı.", "Mesajları aç", "Hesap ana sayfası", ["Konuşma listesi", "Profil başlığı", "Mesaj yazma alanı", "RFQ bağlantılı teklif kartı"]),
  "account-favorites": moduleCopy("Alıcı çalışma alanı", "Favori üreticiler ve ürünler", "Ürünler, üreticiler ve gelecekteki karşılaştırma listeleri için kayıtlı keşif çalışma alanı.", "Ürünleri incele", "Alıcı merkezi", ["Kayıtlı ürünler", "Kayıtlı üreticiler", "Karşılaştırma taslağı", "Arama uyarısı hazırlığı"]),
  "account-rfqs": moduleCopy("Alıcı RFQ'ları", "RFQ yönetim merkezi", "Taslaklar, yayınlanan talepler, üretici yanıtları ve teklif karşılaştırma hazırlığı için alıcı RFQ merkezi.", "RFQ oluştur", "Alıcı merkezi", ["Taslak RFQ'lar", "Yayınlanan RFQ'lar", "Teklif karşılaştırma taslağı", "Yanıt durumu"]),
  "account-orders": moduleCopy("Siparişler ve numuneler", "Sipariş ve numune talep merkezi", "Numune talepleri, işlem hazırlığı, sevkiyat belgeleri ve ticaret güvence durumları için gelecek sipariş çalışma alanı.", "Numune talep et", "Ticaret güvencesi", ["Numune talebi taslakları", "Sipariş hazırlığı", "Sevkiyat belge akışı", "Gelecek emanet ödeme durumu"]),
  "account-documents": moduleCopy("Belgeler", "Belge merkezi", "Şirket kaydı, sertifikalar, kataloglar, denetim raporları ve ihracat belgeleri için belge çalışma alanı.", "Belge yükle", "Doğrulama", ["Şirket kaydı", "Vergi belgesi", "Ürün kataloğu", "Denetim raporu"]),
  "supplier-dashboard": moduleCopy("Üretici paneli", "Üretici operasyon paneli", "Profil tamamlanma, ürünler, RFQ'lar, mesajlar, doğrulama, analitik ve sponsorlu görünürlük için üretici çalışma alanı.", "Profili tamamla", "Ürün ekle", ["Profil tamamlanma", "Alınan RFQ'lar", "Mesajlar", "Doğrulama durumu"]),
  "supplier-company": moduleCopy("Üretici profili", "Şirket profili yönetimi", "Yasal kimlik, marka bilgisi, ihracat pazarları, kabiliyetler ve showroom metni için şirket profili editör temeli.", "Şirket taslağını kaydet", "Üretici paneli", ["Yasal şirket verisi", "Marka profili", "İhracat pazarları", "Kabiliyetler"]),
  "supplier-products": moduleCopy("Ürün kataloğu", "Üretici ürün kataloğu", "Ürün taslakları, moderasyon durumu, görseller, teknik föyler ve fiyat aralıkları için üretici katalog çalışma alanı.", "Ürün ekle", "Üretici paneli", ["Ürün taslakları", "Katalog moderasyonu", "Görsel alanları", "Teknik föy alanları"]),
  "supplier-product-new": moduleCopy("Ürün kataloğu", "Ürün ekle", "Başlık, kod, malzeme, MOQ, teslim süresi, ambalaj, görseller ve teknik föyler için ürün yükleme temeli.", "Ürün taslağını kaydet", "Ürün kataloğu", ["Ürün başlığı ve kodu", "Malzeme ve ölçüler", "MOQ ve teslim süresi", "Görsel ve teknik föy alanları"]),
  "supplier-factory": moduleCopy("Fabrika profili", "Fabrika ve kabiliyet profili", "Kapasite, üretim hatları, ekipman, sertifikalar ve denetime hazır belgeler için üretici fabrika çalışma alanı.", "Fabrika taslağını kaydet", "Doğrulama", ["Üretim kapasitesi", "Ekipman", "Fabrika fotoğrafları", "Denetime hazır durum"]),
  "supplier-verification": moduleCopy("Doğrulama", "Doğrulama başvurusu", "Şirket belgeleri, sertifikalar, ürün kanıtları ve admin inceleme kuyrukları için doğrulamaya hazır akış.", "İncelemeye gönder", "Belgeler", ["Şirket belgeleri", "Sertifikalar", "Fabrika kanıtları", "Admin inceleme durumu"]),
  "supplier-rfqs": moduleCopy("RFQ yanıtı", "Üretici RFQ merkezi", "Eşleşen fırsatlar, teklif taslakları ve alıcı yanıt hazırlığı için üretici RFQ çalışma alanı.", "Teklif ver", "Üretici paneli", ["Uygun RFQ'lar", "Teklif taslağı", "Alıcı gereksinimleri", "Yanıt takibi"]),
  "supplier-messages": moduleCopy("Mesajlaşma", "Üretici mesajları", "Alıcı mesajları, ek dosyalar, teklif kartları ve gelecekteki çeviri desteği için üretici konuşma alanı.", "Gelen kutusunu aç", "Üretici paneli", ["Alıcı konuşmaları", "RFQ bağlantılı mesajlar", "Ek dosyalar", "Denetime hazır kayıtlar"]),
  "supplier-analytics": moduleCopy("Analitik", "Üretici analitik merkezi", "Ürün görüntülemeleri, talep sayısı, RFQ dönüşümü, ülke trafiği ve sponsorlu performans için analitik çalışma alanı.", "Raporları görüntüle", "Üretici paneli", ["Ürün görüntülemeleri", "Talep sayısı", "RFQ dönüşümü", "Ülke trafiği"]),
  "supplier-ads": moduleCopy("Sponsorlu görünürlük", "Üretici reklam ve büyüme", "Sponsorlu ürünler, öne çıkan üreticiler, kategori sponsorluğu ve RFQ öncelikli görünürlük için gelecek ücretli büyüme modülü.", "Kampanya planla", "Analitik", ["Sponsorlu ürünler", "Öne çıkan üretici sıralaması", "Arama artışı", "RFQ öncelikli görünürlük"]),
  "supplier-documents": moduleCopy("Belgeler", "Üretici belge merkezi", "Kataloglar, sertifikalar, şirket kayıt belgeleri, denetim raporları ve ihracat dosyaları için belge yönetim çalışma alanı.", "Belge yükle", "Doğrulama", ["Kataloglar", "ISO ve CE sertifikaları", "Denetim raporları", "İhracat belgeleri"]),
  "admin-users": moduleCopy("Admin", "Kullanıcı yönetimi", "Kullanıcı kayıtları, hesap türleri, rol bazlı erişim ve moderasyon geçmişi için admin taslağı.", "Kullanıcıları incele", "Admin ana sayfası", ["Kullanıcı listesi", "Hesap türü", "RBAC konsepti", "Denetim izi"]),
  "admin-suppliers": moduleCopy("Admin", "Üretici inceleme merkezi", "Üretici profilleri, onboarding durumları, doğrulama hazırlığı ve moderasyon notları için admin taslağı.", "Üreticileri incele", "Doğrulama kuyruğu", ["Üretici profilleri", "Onboarding durumu", "Güven durumu", "İnceleme notları"]),
  "admin-verification": moduleCopy("Admin", "Doğrulama inceleme kuyruğu", "Gönderilen belgeler, şirket doğrulama, ürün kanıtı ve inceleme sonuçları için admin taslağı.", "Kuyruğu aç", "Güvenlik kayıtları", ["Belge inceleme", "Şirket doğrulama", "Fabrika kanıtları", "Durum geçmişi"]),
  "admin-products": moduleCopy("Admin", "Ürün moderasyonu", "Ürün listeleme inceleme, kategori atama, uyum uyarıları ve yayın durumu için admin taslağı.", "Ürünleri yönet", "Admin ana sayfası", ["Ürün kuyruğu", "Kategori yönetimi", "Uyum işareti", "Yayın durumu"]),
  "admin-rfqs": moduleCopy("Admin", "RFQ moderasyonu", "RFQ kalite inceleme, kısıtlı kategori kontrolü, alıcı niyeti ve üretici eşleşme kontrolleri için admin taslağı.", "RFQ'ları incele", "Admin ana sayfası", ["RFQ kuyruğu", "Alıcı niyeti", "Kategori güvenliği", "Eşleşme kontrolleri"]),
  "admin-ads": moduleCopy("Admin", "Sponsorlu yerleşim yönetimi", "Kampanya inceleme, sponsorlu görünürlük durumları, raporlama ve gelecek faturalama entegrasyonu için admin taslağı.", "Kampanyaları incele", "Admin ana sayfası", ["Kampanya listesi", "Yerleşim durumu", "Bütçe alanı", "Performans raporu"]),
  "admin-security": moduleCopy("Admin", "Güvenlik ve denetim kayıtları", "Güvenlik olayları, moderasyon aksiyonları, rol değişiklikleri ve audit-log hazırlığı için admin taslağı.", "Denetim kayıtlarını aç", "Admin ana sayfası", ["Güvenlik olayları", "Rol değişiklikleri", "Moderasyon aksiyonları", "Denetim kaydı konsepti"])
};

function moduleCopy(eyebrow: string, title: string, intro: string, primary: string, secondary: string, items: string[]): ModuleCopy {
  return { eyebrow, title, intro, primary, secondary, items };
}

export function PlatformFrameworkPage({ locale, moduleKey }: { locale: Locale; moduleKey: PlatformModuleKey }) {
  const copy = (locale === "tr" ? tr : en)[moduleKey] ?? en[moduleKey];
  const icons: LucideIcon[] = [CheckCircle2, FileText, ShieldCheck, BarChart3];

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main>
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff,#fff7ed)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">{copy.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-ink sm:text-5xl">{copy.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-steel sm:text-lg">{copy.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={`/${locale}/auth/register`}>
                {copy.primary}
                <ArrowRight className="ml-2" size={17} />
              </Button>
              <Button href={`/${locale}`} variant="secondary">{copy.secondary}</Button>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {copy.items.map((item, index) => {
                const Icon = icons[index % icons.length] ?? CheckCircle2;
                return (
                  <article key={item} className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                    <Icon size={20} className="text-copper" />
                    <h2 className="mt-4 text-base font-bold text-ink">{item}</h2>
                    <p className="mt-2 text-sm leading-6 text-steel">
                      {locale === "tr" ? "Bu modül backend bağlanana kadar güvenli taslak ve hazırlık yapısı olarak çalışır." : "This module remains a safe draft and preparation layer until backend services are connected."}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
