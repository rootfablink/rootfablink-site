import type { Locale } from "@rootfablink/i18n";

export type MobileMarketplaceCopy = typeof mobileMarketplaceCopy.en;

export const mobileMarketplaceCopy = {
  en: {
    tabs: ["Manufacturers", "Products", "Customs", "Logistics"],
    searchPlaceholder: "Search products, factories or RFQs",
    searchExamples: ["wall panels", "PS wall panel", "building materials"],
    voiceSearch: "Voice search",
    lens: "Rootfablink LENS",
    shortcuts: ["Source by category", "RFQ request", "Verified suppliers", "Most preferred", "Fast customization", "Sample center", "Contact"],
    worldwideTitle: "Your global supplier guide from 190+ regions",
    sections: {
      featured: "Featured Opportunities",
      recommended: "Recommended for your business",
      recent: "Recently viewed and related suppliers",
      samples: "Get samples",
      manufacturers: "Most preferred manufacturers",
      categories: "All Categories",
      supplierMatch: "Factory matches for recent interest",
      aiTitle: "Sourcing assistant",
      aiText: "Describe what you want to source. Rootfablink will prepare supplier, RFQ and logistics suggestions in future modules.",
      aiPlaceholder: "Example: I need 500 decorative wall panels for a hotel project",
      aiButton: "Prepare sourcing plan"
    },
    categoryTabs: ["All Categories", "Wall Panels", "Building Materials", "Interior Decoration", "PS Wall Panel", "Solar Panels", "Packaging"],
    productBadges: ["Request quote", "RFQ ready", "Trending", "Sponsored"],
    bottomNav: ["Home", "Categories", "Messages", "Quote Cart", "Account"],
    pages: {
      categories: "Categories",
      messages: "Messages",
      basket: "Inquiry Basket",
      account: "Account",
      signInRequired: "Sign in required to sync real messages. Demo message center is shown for preview.",
      emptyBasket: "Your inquiry basket is empty",
      sourceByCategory: "Source by category",
      tradeProtection: "Rootfablink trade protection",
      accountPreview: "Demo account preview",
      signInCta: "Sign in"
    },
    account: {
      stats: ["Favorites", "History", "RFQs", "Inquiries"],
      orders: ["Unpaid", "Processing", "Shipped", "Refunds", "Reviews"],
      payment: ["Coupons & credit", "Invoices & receipts", "Cards & accounts", "Wire transfer"],
      features: ["Addresses", "Tax information", "Inquiries", "Subscription", "RFQs"]
    }
  },
  tr: {
    tabs: ["Üreticiler", "Ürünler", "Gümrük", "Lojistik"],
    searchPlaceholder: "Ürün, fabrika veya RFQ ara",
    searchExamples: ["polimer lambiri", "duvar paneli", "yapı malzemeleri"],
    voiceSearch: "Sesli arama",
    lens: "Rootfablink LENS",
    shortcuts: ["Kategoriye göre tedarik", "Fiyat Teklifi Talebi (RFQ)", "Doğrulanmış üreticiler", "En çok tercih edilenler", "Hızlı özelleştirme", "Numune merkezi", "İletişim"],
    worldwideTitle: "190+ bölgeden küresel üretici rehberiniz",
    sections: {
      featured: "Öne Çıkan Fırsatlar",
      recommended: "İşletmeniz için öneriler",
      recent: "Son görüntülenenlere göre fabrika eşleşmeleri",
      samples: "Numune alın",
      manufacturers: "En çok tercih edilen üreticiler",
      categories: "Tüm Kategoriler",
      supplierMatch: "Son ilgi alanlarına göre fabrika eşleşmeleri",
      aiTitle: "Tedarik asistanı",
      aiText: "Tedarik etmek istediğiniz ürünü anlatın. Rootfablink ilerleyen modüllerde üretici, RFQ ve lojistik önerileri hazırlayacaktır.",
      aiPlaceholder: "Örnek: Otel projesi için 500 adet dekoratif duvar paneli arıyorum",
      aiButton: "Tedarik planı hazırla"
    },
    categoryTabs: ["Tüm Kategoriler", "Duvar Panelleri", "Yapı Malzemeleri", "İç Dekorasyon", "Polimer Lambiri", "Güneş Panelleri", "Ambalaj"],
    productBadges: ["Teklif al", "RFQ hazır", "Trend", "Sponsorlu"],
    bottomNav: ["Anasayfa", "Kategoriler", "Mesajlarım", "Teklif Sepeti", "Hesabım"],
    pages: {
      categories: "Kategoriler",
      messages: "Mesajlarım",
      basket: "Teklif Sepeti",
      account: "Hesabım",
      signInRequired: "Gerçek mesajları senkronize etmek için giriş gerekir. Önizleme için demo mesaj merkezi gösteriliyor.",
      emptyBasket: "Sepetiniz boş",
      sourceByCategory: "Kategoriye göre tedarik edin",
      tradeProtection: "Rootfablink ticaret koruması",
      accountPreview: "Demo hesap önizlemesi",
      signInCta: "Giriş yap"
    },
    account: {
      stats: ["Favoriler", "Geçmişim", "RFQ", "Sorgular"],
      orders: ["Ödenmemiş", "İşleniyor", "Kargolandı", "Para iadeleri", "Değerlendirme"],
      payment: ["Kuponlar ve kredi", "Faturalar ve makbuzlar", "Kartlar ve hesaplar", "Havale"],
      features: ["Adreslerim", "Vergi bilgileri", "Sorgular", "Abonelik", "Fiyat Teklifi Taleplerim"]
    }
  }
};

export function getMobileMarketplaceCopy(locale: Locale): MobileMarketplaceCopy {
  return locale === "tr" ? mobileMarketplaceCopy.tr : mobileMarketplaceCopy.en;
}

const iWallHomepageModels = [1, 5, 9, 15, 19, 21, 27];

export const mobileSeedProducts = iWallHomepageModels.map((model, index) => {
  const modelLabel = String(model).padStart(2, "0");
  const sku = `iw-ps-${String(model).padStart(3, "0")}`;

  return {
    title: `i-WALL PS Wall Panel Model ${modelLabel}`,
    titleTr: `i-WALL Polimer Lambiri Model ${modelLabel}`,
    price: "Request quote",
    priceTr: "Teklif al",
    badgeIndex: index === 0 ? 3 : index % 3,
    supplier: "i-WALL",
    country: "Türkiye",
    category: "Building Materials",
    categoryTr: "Yapı Malzemeleri",
    image: `/brands/i-wall/no${model}.jpeg`,
    slug: sku,
    source: "i-wall-local-assets",
    verified: false
  };
});

export const mobileProducts = mobileSeedProducts;

export const mobileSuppliers = [
  { name: "i-WALL Surface Systems", category: "Building Materials", categoryTr: "Yapı malzemeleri", country: "Türkiye", cta: "/suppliers/i-wall", logo: "/brands/i-wall/logo.png" },
  { name: "Anatolia Precision Manufacturing", category: "Machinery", categoryTr: "Makine", country: "Türkiye", cta: "/manufacturers" },
  { name: "Global Pack Systems", category: "Packaging", categoryTr: "Ambalaj", country: "Germany", cta: "/manufacturers" },
  { name: "Marmara Textile Works", category: "Workwear", categoryTr: "İş kıyafeti", country: "Türkiye", cta: "/manufacturers" }
];

export const countrySourcingCards = [
  { flag: "TR", title: "Türkiye manufacturing hub", volume: "42K searches" },
  { flag: "CN", title: "China industrial supply", volume: "118K searches" },
  { flag: "IN", title: "India textile and materials", volume: "36K searches" },
  { flag: "DE", title: "Germany machinery suppliers", volume: "28K searches" },
  { flag: "AE", title: "UAE trade gateway", volume: "18K searches" },
  { flag: "SA", title: "Saudi construction market", volume: "21K searches" },
  { flag: "VN", title: "Vietnam competitive production", volume: "25K searches" }
];

export const mobileMessages = [
  { sender: "i-WALL Support", senderTr: "i-WALL Destek", subject: "Sample wall panel request", subjectTr: "Numune duvar paneli talebi", unread: 3 },
  { sender: "Türkiye Logistics Partner", senderTr: "Türkiye Lojistik Partneri", subject: "Delivery options for wall panels", subjectTr: "Duvar panelleri için teslimat seçenekleri", unread: 1 },
  { sender: "Global Buyer Desk", senderTr: "Küresel Alıcı Masası", subject: "RFQ response preparation", subjectTr: "RFQ yanıt hazırlığı", unread: 0 },
  { sender: "Verification Team", senderTr: "Doğrulama Ekibi", subject: "Supplier document preview", subjectTr: "Üretici belge önizlemesi", unread: 2 },
  { sender: "RFQ Assistant", senderTr: "RFQ Asistanı", subject: "Suggested suppliers for your request", subjectTr: "Talebiniz için önerilen üreticiler", unread: 0 }
];
