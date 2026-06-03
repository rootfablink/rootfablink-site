import type { Locale } from "@rootfablink/i18n";

export type MarketplaceCopy = typeof marketplaceCopy.en;

export const marketplaceCopy = {
  en: {
    header: {
      categories: "All Categories",
      verified: "Verified Manufacturers",
      protection: "Order Protection",
      buyerCenter: "Buyer Center",
      supplierCenter: "Supplier Center",
      products: "Products",
      manufacturers: "Manufacturers",
      rfq: "RFQ",
      search: "Search products, factories or RFQs",
      lens: "RootFabLink Lens",
      delivery: "Deliver to",
      deliveryCountry: "Türkiye",
      languageCurrency: "Language / Currency",
      basket: "Inquiry basket",
      signIn: "Sign in",
      createAccount: "Create account",
      supplierOnboarding: "Become a supplier",
      startTrading: "Start trading"
    },
    categories: {
      title: "Industrial categories",
      subtitle: "Explore RootFabLink sectors for global manufacturing, sourcing and trade services.",
      viewAll: "View all categories",
      featuredSupplier: "Featured supplier foundation",
      featuredText: "Verified factory profiles, product catalogs and RFQ response flows are prepared for onboarding.",
      groups: [
        ["Apparel and Textile", ["Clothing", "Workwear", "Shoes", "Bags", "Home textile"]],
        ["Electronics and Electrical", ["Consumer electronics", "Mobile accessories", "Smart devices", "Electrical equipment", "Cables and components"]],
        ["Machinery and Industrial", ["Industrial machinery", "CNC and manufacturing equipment", "Packaging machines", "Construction machinery", "Agricultural machinery"]],
        ["Home and Furniture", ["Furniture", "Kitchen products", "Bathroom products", "Decoration", "Lighting"]],
        ["Beauty and Personal Care", ["Beauty tools", "Personal care devices", "Cosmetics packaging", "Salon equipment"]],
        ["Packaging and Printing", ["Boxes", "Bags", "Labels", "Bottles", "Printing services"]],
        ["Automotive and Spare Parts", ["Car accessories", "Motorcycle parts", "Truck parts", "Tires", "Tools"]],
        ["Construction and Building Materials", ["Hardware", "Doors and windows", "Solar products", "Pipes and fittings", "Insulation materials"]],
        ["Agriculture and Food", ["Agricultural products", "Food processing", "Greenhouse systems", "Animal farming equipment"]],
        ["Logistics and Trade Services", ["Sea freight", "Air freight", "Land freight", "Customs brokers", "Inspection services"]]
      ] as Array<[string, string[]]>
    },
    verifiedMenu: {
      title: "Access verified factories and manufacturers",
      text: "RootFabLink is built for document-reviewed suppliers, production capacity profiles and a coming verification program.",
      items: [
        "Verified factories",
        "Document reviewed suppliers",
        "Production capacity profiles",
        "Factory audit ready companies",
        "Export experienced suppliers",
        "Premium manufacturers",
        "Türkiye based manufacturers",
        "Global manufacturers"
      ],
      stats: ["Verified supplier program", "Product sectors", "Trade service partners"],
      explore: "Explore verified suppliers",
      become: "Become verified"
    },
    protectionMenu: {
      title: "Trade Protection",
      text: "Designed for future trade assurance workflows without claiming live payment processing.",
      items: [
        "Secure transaction workflow preparation",
        "Milestone payment preparation",
        "Supplier verification",
        "Shipment documentation",
        "Dispute workflow preparation",
        "Refund policy framework preparation",
        "Logistics support",
        "Customs documentation support"
      ],
      cta: "Explore protection workflow"
    },
    signIn: {
      welcome: "Welcome to RootFabLink",
      signIn: "Sign in",
      create: "Create account",
      social: "Social sign-in placeholders",
      items: [
        "My RootFabLink Account",
        "My Orders",
        "My Messages",
        "My RFQs",
        "My Favorites",
        "Account Information",
        "Supplier Center",
        "Membership Program",
        "Help Center"
      ]
    },
    selectors: {
      language: "Language",
      currency: "Currency",
      country: "Country / Region",
      postal: "Postal code optional",
      save: "Save",
      cancel: "Cancel",
      shippingNote: "Shipping options and trade workflows may vary by destination.",
      languages: ["English", "Türkçe", "العربية", "中文", "Русский", "Deutsch", "Français", "Español"],
      currencies: ["USD", "EUR", "TRY", "GBP", "CNY", "AED", "SAR"],
      countries: ["Türkiye", "United States", "Germany", "United Kingdom", "China", "Iraq", "Syria", "UAE", "Saudi Arabia", "France", "Spain"]
    },
    quick: {
      messages: "Messages",
      lens: "RootFabLink Lens",
      rfq: "RFQ",
      help: "Help Center",
      top: "Back to top"
    },
    lens: {
      title: "RootFabLink Lens",
      text: "Upload a product image to search similar products and suppliers. Visual search infrastructure will be connected in a future AI module.",
      upload: "Upload product image",
      close: "Close"
    },
    rfqModal: {
      title: "Quick RFQ",
      product: "Product name",
      quantity: "Quantity",
      destination: "Destination country",
      message: "Message",
      attachment: "Attachment placeholder",
      submit: "Submit disabled",
      note: "RFQ system foundation is prepared. Backend workflow will be connected in the next phase.",
      close: "Close"
    },
    home: {
      heroEyebrow: "Free to join, free to list, commission and promotion based marketplace model.",
      heroTitle: "Global B2B marketplace for manufacturers, buyers and trade services",
      heroText:
        "Search products, compare manufacturers, send RFQs, prepare protected trade workflows and connect with logistics partners through one RootFabLink marketplace foundation.",
      welcome: "Welcome to RootFabLink",
      recommended: "Recommended categories",
      mostSearched: "Most searched products",
      verifiedDiscovery: "Verified factory discovery",
      tradeProtection: "Trade protection foundation",
      businessRecommendations: "Business recommendations",
      supplierGrowth: "Supplier growth model",
      rfqCallout: "Post one RFQ and prepare responses from relevant suppliers.",
      searchTabs: ["Products", "Manufacturers", "RFQ"],
      discoveryCards: ["Smart factory search", "Most preferred manufacturers", "Direct factory samples", "Türkiye export suppliers"],
      protectionCards: ["Secure workflow", "Refund policy preparation", "Logistics services", "After sales protection preparation"],
      businessCards: ["RFQ marketplace", "Sponsored products", "Verified supplier program", "Logistics quote request"],
      growth: [
        ["Free registration", "Create supplier access and company profile without upfront fees."],
        ["Free product listing", "Publish basic product listings and receive buyer demand."],
        ["Sponsored visibility", "Promote products, suppliers and RFQ opportunities when ready to scale."],
        ["Commission model", "Marketplace revenue is designed around transactions, protection services and lead value."]
      ]
    },
    productCard: {
      moq: "MOQ",
      verified: "Verified",
      inquiry: "Inquiry",
      sponsored: "Sponsored"
    },
    supplierCard: {
      verified: "Verification-ready",
      response: "Response",
      markets: "Markets",
      contact: "Contact supplier",
      profile: "View profile"
    },
    buyerCenter: ["How sourcing works", "RFQ marketplace", "Supplier comparison", "Order protection", "Logistics support", "Help center", "Report a problem"],
    supplierCenter: ["Become a supplier", "List products for free", "Verified supplier program", "Sponsored visibility", "RFQ opportunities", "Supplier help center"],
    routes: {
      categories: ["Categories", "Explore industrial categories, subcategories and supplier discovery paths prepared for the RootFabLink marketplace."],
      "verified-manufacturers": ["Verified Manufacturers", "Discover verification-ready factory and supplier profile flows built for global sourcing confidence."],
      "trade-protection": ["Trade Protection", "Review secure transaction, documentation and future trade assurance workflow foundations."],
      "buyer-center": ["Buyer Center", "Access buyer tools for sourcing, RFQs, supplier comparison, protection and logistics support."],
      "supplier-center": ["Supplier Center", "Start supplier onboarding, list products for free and prepare sponsored growth visibility."],
      messages: ["Messages", "Messaging foundations are prepared for buyer-supplier conversations in the next platform phase."],
      "help-center": ["Help Center", "Find support foundations for sourcing, supplier onboarding, RFQs and trust workflows."],
      account: ["Account", "RootFabLink account workspace placeholders are prepared for secure authentication and role-based access."],
      "supplier/onboarding": ["Supplier Onboarding", "Create a supplier profile, list products for free and prepare verification documents."],
      products: ["Products", "Product discovery placeholders are prepared for search, categories and sponsored visibility."],
      manufacturers: ["Manufacturers", "Manufacturer discovery placeholders are prepared for factory profiles and verified supplier programs."]
    }
  },
  tr: {
    header: {
      categories: "Tüm kategoriler",
      verified: "Onaylanmış üreticiler",
      protection: "Sipariş koruması",
      buyerCenter: "Alıcı merkezi",
      supplierCenter: "Tedarikçi merkezi",
      products: "Ürünler",
      manufacturers: "Üreticiler",
      rfq: "RFQ",
      search: "Ürün, fabrika veya teklif talebi ara",
      lens: "RootFabLink Lens",
      delivery: "Teslimat adresi",
      deliveryCountry: "Türkiye",
      languageCurrency: "Dil ve para birimi",
      basket: "Talep sepeti",
      signIn: "Giriş yap",
      createAccount: "Hesap oluştur",
      supplierOnboarding: "Tedarikçi ol",
      startTrading: "Ticarete başla"
    },
    categories: {
      title: "Endüstriyel kategoriler",
      subtitle: "Global üretim, tedarik ve ticaret hizmetleri için RootFabLink sektörlerini keşfedin.",
      viewAll: "Tüm kategorileri görüntüle",
      featuredSupplier: "Öne çıkan tedarikçi altyapısı",
      featuredText: "Doğrulamaya hazır fabrika profilleri, ürün katalogları ve RFQ yanıt akışları onboarding için hazırlanır.",
      groups: [
        ["Giyim ve Tekstil", ["Giyim", "İş kıyafeti", "Ayakkabı", "Çanta", "Ev tekstili"]],
        ["Elektronik ve Elektrik", ["Tüketici elektroniği", "Mobil aksesuar", "Akıllı cihazlar", "Elektrik ekipmanları", "Kablo ve bileşenler"]],
        ["Makine ve Endüstri", ["Endüstriyel makineler", "CNC ve üretim ekipmanları", "Paketleme makineleri", "İş makineleri", "Tarım makineleri"]],
        ["Ev ve Mobilya", ["Mobilya", "Mutfak ürünleri", "Banyo ürünleri", "Dekorasyon", "Aydınlatma"]],
        ["Güzellik ve Kişisel Bakım", ["Güzellik araçları", "Kişisel bakım cihazları", "Kozmetik ambalaj", "Salon ekipmanları"]],
        ["Ambalaj ve Baskı", ["Kutular", "Poşetler", "Etiketler", "Şişeler", "Baskı hizmetleri"]],
        ["Otomotiv ve Yedek Parça", ["Araç aksesuarları", "Motosiklet parçaları", "Kamyon parçaları", "Lastikler", "El aletleri"]],
        ["İnşaat ve Yapı Malzemeleri", ["Hırdavat", "Kapı ve pencere", "Güneş ürünleri", "Boru ve bağlantı", "Yalıtım malzemeleri"]],
        ["Tarım ve Gıda", ["Tarım ürünleri", "Gıda işleme", "Sera sistemleri", "Hayvancılık ekipmanları"]],
        ["Lojistik ve Ticaret Hizmetleri", ["Deniz yolu", "Hava yolu", "Kara yolu", "Gümrük müşavirleri", "Denetim hizmetleri"]]
      ] as Array<[string, string[]]>
    },
    verifiedMenu: {
      title: "Onaylanmış fabrika ve üreticilere erişin",
      text: "RootFabLink; belge incelemesine, üretim kapasitesi profillerine ve gelecek doğrulama programına hazır şekilde tasarlanır.",
      items: ["Doğrulanmış fabrikalar", "Belge incelemesi", "Üretim kapasitesi", "Fabrika denetimine hazır şirketler", "İhracat deneyimi", "Premium üreticiler", "Türkiye merkezli üreticiler", "Global üreticiler"],
      stats: ["Doğrulanmış tedarikçi programı", "Ürün sektörleri", "Ticaret hizmet ortakları"],
      explore: "Onaylanmış tedarikçileri keşfet",
      become: "Doğrulama başvurusu yap"
    },
    protectionMenu: {
      title: "Ticaret güvence sistemi",
      text: "Canlı ödeme altyapısı iddiası olmadan, gelecekteki ticaret güvence iş akışları için tasarlanır.",
      items: ["Güvenli işlem altyapısı", "Aşamalı ödeme hazırlığı", "Tedarikçi doğrulama", "Sevkiyat belgeleri", "Uyuşmazlık yönetimi hazırlığı", "İade politikası çerçevesi", "Lojistik desteği", "Gümrük belge desteği"],
      cta: "Koruma akışını incele"
    },
    signIn: {
      welcome: "RootFabLink'e hoş geldiniz",
      signIn: "Giriş yap",
      create: "Hesap oluştur",
      social: "Sosyal giriş yer tutucuları",
      items: ["RootFabLink Hesabım", "Siparişlerim", "Mesajlarım", "Teklif Taleplerim", "Favorilerim", "Hesap Bilgilerim", "Tedarikçi Merkezi", "Üyelik Programı", "Yardım Merkezi"]
    },
    selectors: {
      language: "Dil",
      currency: "Para birimi",
      country: "Ülke / Bölge",
      postal: "Posta kodu isteğe bağlı",
      save: "Kaydet",
      cancel: "İptal",
      shippingNote: "Kargo seçenekleri ve ticaret süreçleri teslimat ülkesine göre değişebilir.",
      languages: ["English", "Türkçe", "العربية", "中文", "Русский", "Deutsch", "Français", "Español"],
      currencies: ["USD", "EUR", "TRY", "GBP", "CNY", "AED", "SAR"],
      countries: ["Türkiye", "United States", "Germany", "United Kingdom", "China", "Iraq", "Syria", "UAE", "Saudi Arabia", "France", "Spain"]
    },
    quick: {
      messages: "Mesajlarım",
      lens: "RootFabLink Lens",
      rfq: "RFQ",
      help: "Yardım Merkezi",
      top: "En üste çık"
    },
    lens: {
      title: "RootFabLink Lens",
      text: "Benzer ürünleri ve tedarikçileri bulmak için ürün görseli yükleyin. Görsel arama altyapısı ilerleyen AI modülünde bağlanacaktır.",
      upload: "Ürün görseli yükle",
      close: "Kapat"
    },
    rfqModal: {
      title: "Hızlı RFQ",
      product: "Ürün adı",
      quantity: "Miktar",
      destination: "Teslimat ülkesi",
      message: "Mesaj",
      attachment: "Dosya ekleme yer tutucusu",
      submit: "Gönderim devre dışı",
      note: "Teklif talebi altyapısı hazırlandı. Backend iş akışı sonraki aşamada bağlanacaktır.",
      close: "Kapat"
    },
    home: {
      heroEyebrow: "Katılım ücretsiz, ürün listeleme ücretsiz, gelir modeli işlem komisyonu ve sponsorlu görünürlük üzerine kuruludur.",
      heroTitle: "Üreticiler, alıcılar ve ticaret hizmetleri için küresel B2B pazaryeri",
      heroText:
        "Ürün arayın, üreticileri karşılaştırın, RFQ gönderin, güvenli ticaret iş akışlarına hazırlanın ve lojistik ortaklarına tek RootFabLink pazaryeri temelinden ulaşın.",
      welcome: "RootFabLink'e hoş geldiniz",
      recommended: "Önerilen kategoriler",
      mostSearched: "En çok aranan ürünler",
      verifiedDiscovery: "Doğrulanmış fabrika keşfi",
      tradeProtection: "Ticaret güvence temeli",
      businessRecommendations: "İş önerileri",
      supplierGrowth: "Tedarikçi büyüme modeli",
      rfqCallout: "Tek bir RFQ yayınlayın ve ilgili tedarikçilerden yanıt almaya hazırlanın.",
      searchTabs: ["Ürünler", "Üreticiler", "RFQ"],
      discoveryCards: ["Akıllı fabrika arama", "En çok tercih edilen üreticiler", "Doğrudan fabrika numuneleri", "Türkiye ihracat tedarikçileri"],
      protectionCards: ["Güvenli iş akışı", "İade politikası hazırlığı", "Lojistik hizmetleri", "Satış sonrası koruma hazırlığı"],
      businessCards: ["RFQ pazaryeri", "Sponsorlu ürünler", "Doğrulanmış tedarikçi programı", "Lojistik teklif talebi"],
      growth: [
        ["Ücretsiz kayıt", "Ön ücret olmadan tedarikçi erişimi ve şirket profili oluşturun."],
        ["Ücretsiz ürün listeleme", "Temel ürün listeleri yayınlayın ve alıcı talepleri alın."],
        ["Sponsorlu görünürlük", "Büyümeye hazır olduğunuzda ürün, tedarikçi ve RFQ fırsatlarını öne çıkarın."],
        ["Komisyon modeli", "Pazaryeri geliri işlem, koruma servisi ve lead değeri etrafında tasarlanır."]
      ]
    },
    productCard: {
      moq: "MOQ",
      verified: "Doğrulanmış",
      inquiry: "Talep gönder",
      sponsored: "Sponsorlu"
    },
    supplierCard: {
      verified: "Doğrulamaya hazır",
      response: "Yanıt",
      markets: "Pazarlar",
      contact: "Tedarikçiyle iletişime geç",
      profile: "Profili görüntüle"
    },
    buyerCenter: ["Tedarik süreci nasıl işler?", "Teklif talebi pazarı", "Tedarikçi karşılaştırma", "Sipariş koruması", "Lojistik desteği", "Yardım merkezi", "Sorun bildir"],
    supplierCenter: ["Tedarikçi ol", "Ürünleri ücretsiz listele", "Doğrulanmış tedarikçi programı", "Sponsorlu görünürlük", "RFQ fırsatları", "Tedarikçi yardım merkezi"],
    routes: {
      categories: ["Kategoriler", "RootFabLink pazaryeri için endüstriyel kategori, alt kategori ve tedarikçi keşif yollarını inceleyin."],
      "verified-manufacturers": ["Onaylanmış Üreticiler", "Global tedarik güveni için hazırlanmış doğrulamaya hazır fabrika ve tedarikçi profil akışlarını keşfedin."],
      "trade-protection": ["Ticaret Güvence Sistemi", "Güvenli işlem, belge ve gelecekteki ticaret güvence iş akışı temellerini inceleyin."],
      "buyer-center": ["Alıcı Merkezi", "Tedarik, RFQ, tedarikçi karşılaştırma, koruma ve lojistik destek araçlarına erişin."],
      "supplier-center": ["Tedarikçi Merkezi", "Tedarikçi onboarding başlatın, ürünleri ücretsiz listeleyin ve sponsorlu büyüme görünürlüğüne hazırlanın."],
      messages: ["Mesajlar", "Mesajlaşma temeli, sonraki platform aşamasında alıcı-tedarikçi görüşmeleri için hazırlanır."],
      "help-center": ["Yardım Merkezi", "Tedarik, tedarikçi onboarding, RFQ ve güven akışları için destek temellerini bulun."],
      account: ["Hesap", "RootFabLink hesap çalışma alanı, güvenli kimlik doğrulama ve rol bazlı erişim için hazırlanır."],
      "supplier/onboarding": ["Tedarikçi Onboarding", "Tedarikçi profili oluşturun, ürünleri ücretsiz listeleyin ve doğrulama belgelerine hazırlanın."],
      products: ["Ürünler", "Ürün keşfi; arama, kategoriler ve sponsorlu görünürlük için hazırlanır."],
      manufacturers: ["Üreticiler", "Üretici keşfi; fabrika profilleri ve doğrulanmış tedarikçi programları için hazırlanır."]
    }
  }
} satisfies Record<"en" | "tr", Record<string, unknown>>;

export function getMarketplaceCopy(locale: Locale): MarketplaceCopy {
  return locale === "tr" ? marketplaceCopy.tr : marketplaceCopy.en;
}

export const marketplaceProducts = [
  { title: "Electric scooter", price: "$120 - $480", moq: "50 pieces", country: "Türkiye", verified: true, sponsored: true },
  { title: "Mobile phones", price: "$38 - $210", moq: "20 pieces", country: "China", verified: true },
  { title: "Industrial machinery", price: "$4,800 - $28,000", moq: "1 set", country: "Germany", verified: true },
  { title: "Packaging boxes", price: "$0.08 - $0.42", moq: "1,000 pieces", country: "Türkiye", verified: false, sponsored: true },
  { title: "Solar panels", price: "$42 - $96", moq: "100 pieces", country: "UAE", verified: true },
  { title: "Workwear", price: "$6 - $19", moq: "200 pieces", country: "Türkiye", verified: true },
  { title: "Furniture", price: "$35 - $340", moq: "10 pieces", country: "Poland", verified: false },
  { title: "Beauty tools", price: "$2 - $18", moq: "300 pieces", country: "France", verified: true }
];

export const marketplaceSuppliers = [
  { company: "Anatolia Precision Manufacturing", country: "Türkiye", category: "Machinery", response: "92%", markets: "EU, MENA" },
  { company: "Global Pack Systems", country: "Germany", category: "Packaging", response: "88%", markets: "EU, UK" },
  { company: "Marmara Textile Works", country: "Türkiye", category: "Workwear", response: "95%", markets: "US, EU" }
];
