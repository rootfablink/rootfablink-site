import type { Locale } from "@rootfablink/i18n";

export type MobileMarketplaceCopy = typeof mobileMarketplaceCopy.en;

export const mobileMarketplaceCopy = {
  en: {
    tabs: ["AI Mode", "Products", "Manufacturers", "Worldwide"],
    searchPlaceholder: "Search products, factories or RFQs",
    searchExamples: ["women clothing", "electric scooter", "wall panels"],
    voiceSearch: "Voice search placeholder",
    lens: "ROOTFABLINK LENS",
    shortcuts: ["Source by category", "RFQ request", "Verified suppliers", "Most preferred", "Fast customization", "Sample center"],
    worldwideTitle: "Your global supplier guide from 190+ regions",
    sections: {
      featured: "Featured Opportunities",
      recommended: "Recommended for your business",
      recent: "Recently viewed and related suppliers",
      samples: "Get samples",
      manufacturers: "Most preferred manufacturers",
      categories: "All Categories",
      supplierMatch: "Factory matches for recent interest",
      aiTitle: "AI sourcing assistant",
      aiText: "Describe what you want to source. Rootfablink will prepare supplier, RFQ and logistics suggestions in future AI modules.",
      aiPlaceholder: "Example: I need 500 decorative wall panels for hotel project",
      aiButton: "Prepare sourcing plan"
    },
    categoryTabs: ["All Categories", "Home Appliances", "Home & Garden", "Industrial Machinery", "Apparel", "Electronics", "Building Materials"],
    productBadges: ["Lower price", "Fast delivery", "Trending", "Sponsored"],
    bottomNav: ["Home", "Categories", "Messages", "Inquiry Basket", "Account"],
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
      stats: ["Favorites", "History", "Coupons", "AI Mode"],
      orders: ["Unpaid", "Processing", "Shipped", "Refunds", "Reviews"],
      payment: ["Coupons & credit", "Invoices & receipts", "Cards & accounts", "Wire transfer"],
      features: ["Addresses", "Tax information", "Inquiries", "Subscription", "RFQs"]
    }
  },
  tr: {
    tabs: ["AI Modu", "Ürünler", "Üreticiler", "Dünya çapında"],
    searchPlaceholder: "Ürün, fabrika veya RFQ ara",
    searchExamples: ["kadın giyim", "erkek kol saati", "duvar paneli"],
    voiceSearch: "Sesli arama yer tutucusu",
    lens: "ROOTFABLINK LENS",
    shortcuts: ["Kategoriye göre tedarik", "Fiyat Teklifi Talebi (RFQ)", "Doğrulanmış tedarikçiler", "En çok tercih edilenler", "Hızlı özelleştirme", "Numune merkezi"],
    worldwideTitle: "190+ bölgeden küresel tedarikçi rehberiniz",
    sections: {
      featured: "Öne Çıkan Fırsatlar",
      recommended: "İşletmeniz için öneriler",
      recent: "Son görüntülenenlere göre fabrika eşleşmeleri",
      samples: "Numune alın",
      manufacturers: "En çok tercih edilen üreticiler",
      categories: "Tüm Kategoriler",
      supplierMatch: "Son ilgi alanlarına göre fabrika eşleşmeleri",
      aiTitle: "AI tedarik asistanı",
      aiText: "Tedarik etmek istediğiniz ürünü anlatın. Rootfablink ilerleyen AI modüllerinde tedarikçi, RFQ ve lojistik önerileri hazırlayacaktır.",
      aiPlaceholder: "Örnek: Otel projesi için 500 adet dekoratif duvar paneli arıyorum",
      aiButton: "Tedarik planı hazırla"
    },
    categoryTabs: ["Tüm Kategoriler", "Ev Aletleri", "Ev & Bahçe", "Endüstriyel Makineler", "Giyim", "Elektronik", "Yapı Malzemeleri"],
    productBadges: ["Daha düşük fiyat", "Hızlı teslimat", "Trend", "Sponsorlu"],
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
      stats: ["Favoriler", "Geçmişim", "Kuponlar", "AI Modu"],
      orders: ["Ödenmemiş", "İşleniyor", "Kargolandı", "Para iadeleri", "Değerlendirme"],
      payment: ["Kuponlar ve kredi", "Faturalar ve makbuzlar", "Kartlar ve hesaplar", "Havale"],
      features: ["Adreslerim", "Vergi bilgileri", "Sorgular", "Abonelik", "Fiyat Teklifi Taleplerim"]
    }
  }
};

export function getMobileMarketplaceCopy(locale: Locale): MobileMarketplaceCopy {
  return locale === "tr" ? mobileMarketplaceCopy.tr : mobileMarketplaceCopy.en;
}

export const mobileProducts = [
  { title: "i-WALL Marble Look Wall Panel", price: "$8.40", badgeIndex: 3, supplier: "i-WALL", country: "Türkiye" },
  { title: "Electric scooter export batch", price: "$118", badgeIndex: 2, supplier: "Verified Mobility Co.", country: "China" },
  { title: "Industrial packaging boxes", price: "$0.09", badgeIndex: 0, supplier: "Global Pack Systems", country: "Germany" },
  { title: "Workwear private label set", price: "$7.90", badgeIndex: 1, supplier: "Marmara Textile Works", country: "Türkiye" },
  { title: "i-WALL Wood Texture Panel", price: "$9.20", badgeIndex: 3, supplier: "i-WALL", country: "Türkiye" },
  { title: "Solar panel container order", price: "$44", badgeIndex: 2, supplier: "Gulf Energy Supply", country: "UAE" }
];

export const mobileSuppliers = [
  { name: "i-WALL Surface Systems", category: "Building materials", country: "Türkiye", cta: "/suppliers/i-wall" },
  { name: "Anatolia Precision Manufacturing", category: "Machinery", country: "Türkiye", cta: "/manufacturers" },
  { name: "Global Pack Systems", category: "Packaging", country: "Germany", cta: "/manufacturers" },
  { name: "Marmara Textile Works", category: "Workwear", country: "Türkiye", cta: "/manufacturers" }
];

export const countrySourcingCards = [
  { flag: "🇹🇷", title: "Türkiye manufacturing hub", volume: "42K searches" },
  { flag: "🇨🇳", title: "China industrial supply", volume: "118K searches" },
  { flag: "🇮🇳", title: "India textile and materials", volume: "36K searches" },
  { flag: "🇩🇪", title: "Germany machinery suppliers", volume: "28K searches" },
  { flag: "🇦🇪", title: "UAE trade gateway", volume: "18K searches" },
  { flag: "🇸🇦", title: "Saudi construction market", volume: "21K searches" },
  { flag: "🇻🇳", title: "Vietnam competitive production", volume: "25K searches" }
];

export const mobileCategorySidebar = [
  "Sizin için",
  "Öne Çıkan",
  "İndirimli ürünler",
  "Giyim & Aksesuar",
  "Kişisel Elektronik Cihazlar",
  "Ev & Bahçe",
  "Spor & Eğlence",
  "Ebeveyn & Çocuk & Oyuncaklar",
  "Spor Giyim & Açık Hava Kıyafetleri",
  "Kozmetik",
  "Takı & Gözlük & Saat",
  "Ayakkabı & Çanta",
  "Yapı Malzemeleri",
  "Endüstriyel Makineler"
];

export const mobileCategoryRecommendations = [
  "Men shoes",
  "5G smartphones",
  "Electric scooters",
  "Mobile phones",
  "Laptops",
  "Cars",
  "Hoodies",
  "Drones",
  "Evening dress",
  "Women sets",
  "Scooter",
  "Perfume bottle",
  "Wall panels",
  "Solar panels",
  "Packaging boxes"
];

export const mobileMessages = [
  { sender: "i-WALL Support", subject: "Sample wall panel request", unread: 3 },
  { sender: "Türkiye Logistics Partner", subject: "Delivery options for wall panels", unread: 1 },
  { sender: "Global Buyer Desk", subject: "RFQ response preparation", unread: 0 },
  { sender: "Verification Team", subject: "Supplier document preview", unread: 2 },
  { sender: "RFQ Assistant", subject: "Suggested suppliers for your request", unread: 0 }
];

