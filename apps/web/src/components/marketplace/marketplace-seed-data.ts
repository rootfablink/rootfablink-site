export type MarketplaceSeedListing = {
  id: string;
  slug: string;
  title: string;
  titleTr: string;
  category: string;
  categoryTr: string;
  subcategory: string;
  subcategoryTr: string;
  country: string;
  countryTr: string;
  supplierName: string;
  supplierType: string;
  supplierTypeTr: string;
  priceRange: string;
  moq: string;
  unit: string;
  leadTime: string;
  shortDescription: string;
  shortDescriptionTr: string;
  mainImage: string;
  galleryImages: string[];
  imageAlt: string;
  imageSearchIntent: string;
  visualCategory: string;
  specifications: Record<string, string>;
  specificationsTr: Record<string, string>;
  productSpecifications: Record<string, string>;
  capabilities: string[];
  capabilitiesTr: string[];
  tags: string[];
  tradeTerms: string[];
  source: "marketplace_seed_data";
  visible: true;
  verified: false;
  rating: null;
  reviewCount: 0;
  review_count: 0;
  sponsored?: boolean;
  visualMatchScore: number;
};

type ProductTemplate = {
  title: string;
  subcategory: string;
  priceRange: string;
  moq: string;
  unit: string;
  leadTime: string;
  specs: Record<string, string>;
  tags: string[];
};

type CategoryTemplate = {
  category: string;
  country: string;
  supplierType: string;
  imageQuery: string;
  descriptionFocus: string;
  products: ProductTemplate[];
};

const tradeTerms = ["EXW", "FOB", "CIF"];
const capabilities = ["OEM ready", "ODM ready", "Customization available", "RFQ available"];
const supplierNames = [
  "Rootfablink Marketplace Supplier",
  "Manufacturer-ready profile",
  "Trade workflow ready supplier",
  "Export-ready catalog profile"
];

const categoryTranslations: Record<string, string> = {
  "Construction and Building Materials": "Yapı ve İnşaat Malzemeleri",
  "Decorative Wall Panels": "Dekoratif Duvar Panelleri",
  "Solar and Energy": "Solar ve Enerji",
  "Machinery and Industrial": "Makine ve Endüstri",
  "Industrial Equipment": "Endüstriyel Ekipman",
  "Electronics and Electrical": "Elektronik ve Elektrik",
  "Packaging and Printing": "Ambalaj ve Baskı",
  "Textile and Fabrics": "Tekstil ve Kumaş",
  "Apparel and Workwear": "Hazır Giyim ve İş Kıyafetleri",
  "Home and Furniture": "Ev ve Mobilya",
  "Kitchen and Household Products": "Mutfak ve Ev Ürünleri",
  "Automotive and Spare Parts": "Otomotiv ve Yedek Parça",
  "Agriculture and Greenhouse": "Tarım ve Sera",
  "Food Processing": "Gıda İşleme",
  "Beauty and Personal Care": "Güzellik ve Kişisel Bakım",
  "Medical and Health Equipment": "Medikal ve Sağlık Ekipmanları",
  "Office and Commercial Equipment": "Ofis ve Ticari Ekipman",
  "Hotel and Restaurant Supplies": "Otel ve Restoran Ürünleri",
  "Cleaning and Hygiene Products": "Temizlik ve Hijyen Ürünleri",
  "Baby and Children Products": "Bebek ve Çocuk Ürünleri",
  "Pet Products": "Evcil Hayvan Ürünleri",
  "Sports and Outdoor": "Spor ve Outdoor",
  "Hardware and Tools": "Hırdavat ve El Aletleri",
  "Security and Safety Equipment": "Güvenlik ve İş Güvenliği Ekipmanları",
  Lighting: "Aydınlatma",
  "HVAC and Ventilation": "HVAC ve Havalandırma",
  "Water Treatment": "Su Arıtma",
  "Plastic and Rubber Products": "Plastik ve Kauçuk Ürünleri",
  "Metal Products": "Metal Ürünleri",
  "Glass and Ceramic Products": "Cam ve Seramik Ürünleri",
  "Paper Products": "Kağıt Ürünleri",
  "Gifts and Promotional Products": "Hediye ve Promosyon Ürünleri",
  "Logistics Services": "Lojistik Hizmetleri",
  "Customs and Trade Services": "Gümrük ve Ticaret Hizmetleri"
};

const subcategoryTranslations: Record<string, string> = {
  "Wall Panels": "Duvar Panelleri",
  Insulation: "Yalıtım",
  "Solar Panels": "Solar Paneller",
  Inverters: "İnverterler",
  "Battery Storage": "Batarya Depolama",
  "Sea Freight": "Deniz Yolu Taşımacılığı",
  "Air Freight": "Hava Yolu Taşımacılığı",
  "Road Freight": "Kara Yolu Taşımacılığı",
  Customs: "Gümrük",
  Boxes: "Kutular",
  Labels: "Etiketler",
  "Office Furniture": "Ofis Mobilyaları",
  Workwear: "İş Kıyafetleri"
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function visualCategoryFor(title: string, category: string) {
  const text = `${title} ${category}`.toLowerCase();
  if (text.includes("wall panel") || text.includes("facade") || text.includes("ceiling")) return "wall_panel";
  if (text.includes("solar panel") || text.includes("pv ")) return "solar_panel";
  if (text.includes("inverter")) return "inverter";
  if (text.includes("battery") || text.includes("storage")) return "battery";
  if (text.includes("cnc")) return "cnc_machine";
  if (text.includes("laser")) return "laser_machine";
  if (text.includes("machine") || text.includes("line") || text.includes("conveyor") || text.includes("press")) return "industrial_machine";
  if (text.includes("box") || text.includes("carton") || text.includes("packaging")) return "packaging_box";
  if (text.includes("bottle") || text.includes("jar")) return "cosmetic_packaging";
  if (text.includes("fabric") || text.includes("textile")) return "textile_roll";
  if (text.includes("uniform") || text.includes("hoodie") || text.includes("shirt") || text.includes("vest") || text.includes("jacket")) return "workwear";
  if (text.includes("brake")) return "brake_disc";
  if (text.includes("headlight") || text.includes("light")) return "led_lighting";
  if (text.includes("greenhouse")) return "greenhouse";
  if (text.includes("irrigation") || text.includes("drip")) return "irrigation_system";
  if (text.includes("sea freight") || text.includes("container")) return "container_ship";
  if (text.includes("road freight") || text.includes("truck")) return "freight_truck";
  if (text.includes("customs") || text.includes("compliance") || text.includes("hs code") || text.includes("document")) return "customs_documents";
  if (text.includes("medical") || text.includes("hospital") || text.includes("patient")) return "medical_device";
  if (text.includes("chair")) return "office_chair";
  if (text.includes("hvac") || text.includes("ventilation") || text.includes("fan") || text.includes("duct")) return "hvac_unit";
  if (text.includes("water") || text.includes("filter") || text.includes("osmosis")) return "water_filter";
  if (text.includes("fastener") || text.includes("screw") || text.includes("metal")) return "metal_fasteners";
  if (text.includes("ceramic") || text.includes("glass") || text.includes("porcelain")) return "ceramic_tableware";
  if (text.includes("furniture") || text.includes("table") || text.includes("sofa") || text.includes("desk")) return "furniture";
  if (text.includes("camera") || text.includes("tablet") || text.includes("charger") || text.includes("earbuds")) return "electronics";
  return "catalog_product";
}

function productSvg(visualCategory: string, title: string, variant: number) {
  const accent = variant === 0 ? "#f97316" : variant === 1 ? "#0f766e" : "#2563eb";
  const label = title.replace(/&/g, "and").slice(0, 34);
  const base = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#f8fafc"/><rect x="70" y="70" width="1060" height="760" rx="34" fill="#fff" stroke="#e5e7eb" stroke-width="3"/><text x="90" y="790" fill="#111827" font-family="Arial" font-size="38" font-weight="700">${label}</text>`;
  const end = `<circle cx="1070" cy="130" r="28" fill="${accent}"/><text x="90" y="840" fill="#64748b" font-family="Arial" font-size="24">B2B catalog visual</text></svg>`;
  const shapes: Record<string, string> = {
    wall_panel: `<rect x="180" y="150" width="840" height="470" rx="18" fill="#fdf2e9" stroke="${accent}" stroke-width="8"/><path d="M210 220 C360 130 470 320 620 210 S880 230 990 160" fill="none" stroke="#a8a29e" stroke-width="18"/><path d="M210 360 C420 240 520 500 760 340 S910 390 990 310" fill="none" stroke="#d6d3d1" stroke-width="22"/><g stroke="#fff" stroke-width="5">${[0, 1, 2, 3].map((i) => `<line x1="${180 + i * 210}" y1="150" x2="${180 + i * 210}" y2="620"/>`).join("")}</g>`,
    solar_panel: `<g transform="translate(220 150) skewX(-12)"><rect width="760" height="430" rx="18" fill="#0f2f5f" stroke="${accent}" stroke-width="8"/><g stroke="#93c5fd" stroke-width="5">${Array.from({ length: 6 }, (_, i) => `<line x1="${(i + 1) * 110}" y1="0" x2="${(i + 1) * 110}" y2="430"/>`).join("")}${Array.from({ length: 4 }, (_, i) => `<line x1="0" y1="${(i + 1) * 86}" x2="760" y2="${(i + 1) * 86}"/>`).join("")}</g></g>`,
    industrial_machine: `<rect x="210" y="280" width="720" height="260" rx="20" fill="#334155"/><rect x="270" y="205" width="250" height="120" rx="14" fill="#64748b"/><rect x="590" y="205" width="260" height="120" rx="14" fill="#475569"/><circle cx="330" cy="575" r="48" fill="${accent}"/><circle cx="800" cy="575" r="48" fill="${accent}"/><rect x="420" y="335" width="300" height="90" fill="#e2e8f0"/>`,
    cnc_machine: `<rect x="180" y="260" width="820" height="300" rx="18" fill="#1f2937"/><rect x="250" y="320" width="520" height="150" fill="#dbeafe"/><rect x="790" y="300" width="130" height="190" fill="${accent}"/><path d="M300 235 H750 V520" fill="none" stroke="#94a3b8" stroke-width="24"/>`,
    laser_machine: `<rect x="200" y="260" width="780" height="300" rx="18" fill="#111827"/><rect x="260" y="310" width="420" height="150" fill="#dbeafe"/><path d="M760 260 L900 560" stroke="${accent}" stroke-width="16"/><circle cx="825" cy="410" r="50" fill="#fee2e2"/>`,
    packaging_box: `<path d="M330 280 L540 190 L760 280 L540 380 Z" fill="#f6c177"/><path d="M330 280 V560 L540 680 V380 Z" fill="#d99a45"/><path d="M760 280 V560 L540 680 V380 Z" fill="#b7792d"/><path d="M540 190 V380" stroke="#fff" stroke-width="8"/>`,
    cosmetic_packaging: `<rect x="350" y="220" width="150" height="360" rx="30" fill="#fde68a" stroke="${accent}" stroke-width="8"/><rect x="690" y="180" width="170" height="420" rx="40" fill="#fce7f3" stroke="#db2777" stroke-width="8"/><rect x="380" y="170" width="90" height="70" rx="16" fill="#94a3b8"/><rect x="725" y="125" width="100" height="80" rx="16" fill="#94a3b8"/>`,
    textile_roll: `<circle cx="370" cy="430" r="150" fill="#f97316"/><circle cx="370" cy="430" r="72" fill="#fff7ed"/><rect x="370" y="280" width="520" height="300" rx="35" fill="#fed7aa"/><path d="M460 360 H860 M460 430 H860 M460 500 H860" stroke="#fb923c" stroke-width="16"/>`,
    workwear: `<path d="M420 190 L570 250 L720 190 L820 360 L730 410 V650 H410 V410 L320 360 Z" fill="#fb923c" stroke="#111827" stroke-width="8"/><path d="M570 250 V640 M420 420 H730" stroke="#fff" stroke-width="10"/>`,
    brake_disc: `<circle cx="600" cy="420" r="230" fill="#cbd5e1" stroke="#475569" stroke-width="18"/><circle cx="600" cy="420" r="82" fill="#f8fafc" stroke="#64748b" stroke-width="16"/><g fill="${accent}">${[0, 60, 120, 180, 240, 300].map((r) => `<circle cx="${600 + Math.cos((r * Math.PI) / 180) * 150}" cy="${420 + Math.sin((r * Math.PI) / 180) * 150}" r="22"/>`).join("")}</g>`,
    led_lighting: `<rect x="300" y="280" width="600" height="230" rx="30" fill="#fef3c7" stroke="${accent}" stroke-width="14"/><path d="M360 350 H840 M360 430 H840" stroke="#fde68a" stroke-width="32"/><path d="M420 510 L340 650 M780 510 L860 650" stroke="#475569" stroke-width="20"/>`,
    greenhouse: `<path d="M220 560 C320 250 880 250 980 560 Z" fill="#dcfce7" stroke="#16a34a" stroke-width="12"/><path d="M300 560 V380 M460 560 V300 M620 560 V285 M780 560 V330" stroke="#86efac" stroke-width="10"/><rect x="210" y="560" width="790" height="70" fill="#15803d"/>`,
    irrigation_system: `<path d="M180 520 H1020" stroke="#0f766e" stroke-width="30"/><path d="M300 520 C300 420 390 420 390 520 M520 520 C520 420 610 420 610 520 M740 520 C740 420 830 420 830 520" fill="none" stroke="#38bdf8" stroke-width="18"/><circle cx="220" cy="520" r="44" fill="${accent}"/>`,
    container_ship: `<rect x="250" y="470" width="700" height="90" fill="#1d4ed8"/><path d="M190 560 H1010 L910 640 H300 Z" fill="#0f172a"/><g>${[0, 1, 2, 3, 4].map((i) => `<rect x="${300 + i * 105}" y="360" width="90" height="100" fill="${i % 2 ? "#f97316" : "#22c55e"}"/>`).join("")}</g>`,
    freight_truck: `<rect x="220" y="360" width="520" height="180" rx="14" fill="#f97316"/><rect x="740" y="410" width="190" height="130" rx="12" fill="#334155"/><circle cx="340" cy="575" r="55" fill="#111827"/><circle cx="805" cy="575" r="55" fill="#111827"/><rect x="780" y="430" width="90" height="55" fill="#dbeafe"/>`,
    customs_documents: `<rect x="360" y="170" width="360" height="520" rx="20" fill="#fff" stroke="#94a3b8" stroke-width="10"/><path d="M420 270 H660 M420 340 H660 M420 410 H600" stroke="#64748b" stroke-width="18"/><circle cx="690" cy="570" r="90" fill="#fee2e2" stroke="${accent}" stroke-width="12"/><text x="635" y="585" fill="${accent}" font-family="Arial" font-size="34" font-weight="700">RFQ</text>`,
    medical_device: `<rect x="330" y="210" width="520" height="360" rx="28" fill="#e0f2fe" stroke="#0284c7" stroke-width="12"/><path d="M400 420 H500 L540 340 L600 500 L650 420 H780" fill="none" stroke="${accent}" stroke-width="18"/><rect x="520" y="570" width="150" height="90" fill="#64748b"/>`,
    office_chair: `<rect x="470" y="200" width="260" height="270" rx="45" fill="#334155"/><rect x="430" y="450" width="340" height="95" rx="36" fill="#475569"/><path d="M600 545 V660 M500 690 H700 M520 660 L440 725 M680 660 L760 725" stroke="${accent}" stroke-width="22"/>`,
    hvac_unit: `<rect x="300" y="250" width="600" height="330" rx="22" fill="#e2e8f0" stroke="#64748b" stroke-width="10"/><circle cx="480" cy="415" r="95" fill="#fff" stroke="${accent}" stroke-width="14"/><circle cx="720" cy="415" r="95" fill="#fff" stroke="${accent}" stroke-width="14"/><path d="M420 415 H540 M480 355 V475 M660 415 H780 M720 355 V475" stroke="#94a3b8" stroke-width="12"/>`,
    water_filter: `<rect x="360" y="180" width="160" height="460" rx="50" fill="#dbeafe" stroke="#0284c7" stroke-width="12"/><rect x="650" y="180" width="160" height="460" rx="50" fill="#e0f2fe" stroke="#0284c7" stroke-width="12"/><path d="M520 300 H650 M520 520 H650" stroke="${accent}" stroke-width="18"/>`,
    metal_fasteners: `<g fill="#94a3b8" stroke="#334155" stroke-width="8">${[0, 1, 2, 3, 4].map((i) => `<rect x="${300 + i * 115}" y="${280 + (i % 2) * 90}" width="70" height="260" rx="20"/>`).join("")}</g><path d="M250 630 H930" stroke="${accent}" stroke-width="18"/>`,
    ceramic_tableware: `<ellipse cx="600" cy="510" rx="300" ry="95" fill="#e0f2fe" stroke="#0284c7" stroke-width="10"/><ellipse cx="600" cy="500" rx="190" ry="50" fill="#fff"/><rect x="490" y="250" width="220" height="220" rx="28" fill="#f8fafc" stroke="${accent}" stroke-width="10"/>`,
    furniture: `<rect x="300" y="360" width="600" height="150" rx="28" fill="#92400e"/><rect x="360" y="510" width="55" height="160" fill="#78350f"/><rect x="785" y="510" width="55" height="160" fill="#78350f"/><rect x="370" y="240" width="460" height="120" rx="30" fill="#fed7aa"/>`,
    electronics: `<rect x="410" y="190" width="380" height="500" rx="36" fill="#111827"/><rect x="450" y="250" width="300" height="360" rx="12" fill="#dbeafe"/><circle cx="600" cy="650" r="24" fill="${accent}"/>`,
    catalog_product: `<rect x="330" y="230" width="540" height="360" rx="40" fill="#e2e8f0" stroke="${accent}" stroke-width="12"/><path d="M410 340 H790 M410 430 H790 M410 520 H680" stroke="#94a3b8" stroke-width="22"/>`
  };
  return `data:image/svg+xml;utf8,${encodeURIComponent(base + (shapes[visualCategory] ?? shapes.catalog_product) + end)}`;
}

function imageUrl(query: string, categoryIndex: number, productIndex: number, imageIndex: number) {
  const visualCategory = visualCategoryFor(query, query);
  return productSvg(visualCategory, query, imageIndex);
}

function makeListing(category: CategoryTemplate, categoryIndex: number, product: ProductTemplate, productIndex: number): MarketplaceSeedListing {
  const id = `seed-${slugify(category.category)}-${String(productIndex + 1).padStart(3, "0")}`;
  const slug = slugify(product.title);
  const visualCategory = visualCategoryFor(product.title, category.category);
  const galleryImages = [0, 1, 2].map((imageIndex) => productSvg(visualCategory, product.title, imageIndex));
  const specifications = {
    ...product.specs,
    usage: product.specs.usage ?? category.descriptionFocus,
    customization: product.specs.customization ?? "Available on RFQ"
  };
  const categoryTr = categoryTranslations[category.category] ?? category.category;
  const subcategoryTr = subcategoryTranslations[product.subcategory] ?? product.subcategory;
  const supplierTypeTr = "Tedarikçi profili";
  const shortDescription = `${product.title} prepared for B2B sourcing, RFQ comparison and ${category.descriptionFocus.toLowerCase()}.`;

  return {
    id,
    slug,
    title: product.title,
    titleTr: product.title,
    category: category.category,
    categoryTr,
    subcategory: product.subcategory,
    subcategoryTr,
    country: category.country,
    countryTr: category.country === "Türkiye" ? "Türkiye" : category.country,
    supplierName: supplierNames[(categoryIndex + productIndex) % supplierNames.length] ?? "Rootfablink Marketplace Supplier",
    supplierType: category.supplierType,
    supplierTypeTr,
    priceRange: product.priceRange,
    moq: product.moq,
    unit: product.unit,
    leadTime: product.leadTime,
    shortDescription,
    shortDescriptionTr: `${product.title}, B2B tedarik, RFQ karşılaştırması ve ${categoryTr.toLowerCase()} alımları için hazırlanmış profesyonel ürün listelemesidir.`,
    mainImage: galleryImages[0] ?? imageUrl(category.imageQuery, categoryIndex, productIndex, 0),
    galleryImages,
    imageAlt: `${product.title} product visual for ${product.subcategory}`,
    imageSearchIntent: `${product.title} ${product.subcategory} B2B product catalog visual`,
    visualCategory,
    specifications,
    specificationsTr: Object.fromEntries(Object.entries(specifications).map(([key, value]) => [key, value])),
    productSpecifications: specifications,
    capabilities,
    capabilitiesTr: ["OEM hazır", "ODM hazır", "Özelleştirme uygun", "RFQ uygun"],
    tags: product.tags,
    tradeTerms,
    source: "marketplace_seed_data",
    visible: true,
    verified: false,
    rating: null,
    reviewCount: 0,
    review_count: 0,
    sponsored: productIndex === 0 || productIndex === 5,
    visualMatchScore: 10
  };
}

const categoryTemplates: CategoryTemplate[] = [
  {
    category: "Apparel and Textile",
    country: "Türkiye",
    supplierType: "Manufacturer-ready apparel profile",
    imageQuery: "textile,fabric,apparel",
    descriptionFocus: "private label apparel and textile purchasing",
    products: [
      { title: "Premium Cotton T-Shirt", subcategory: "T-Shirts", priceRange: "$2.80-5.90 / piece", moq: "500 pieces", unit: "piece", leadTime: "18-30 days", specs: { material: "Cotton jersey", fit: "Regular / oversized" }, tags: ["t-shirt", "cotton", "private label"] },
      { title: "Industrial Workwear Uniform", subcategory: "Workwear", priceRange: "$8-22 / set", moq: "300 sets", unit: "set", leadTime: "25-40 days", specs: { material: "Poly-cotton", feature: "Logo embroidery" }, tags: ["workwear", "uniform", "industrial"] },
      { title: "Sportswear Collection", subcategory: "Sportswear", priceRange: "$7-28 / piece", moq: "400 pieces", unit: "piece", leadTime: "25-45 days", specs: { material: "Performance knit", items: "Tops, leggings, sets" }, tags: ["sportswear", "activewear", "OEM"] },
      { title: "Luxury Hoodie", subcategory: "Hoodies", priceRange: "$9-34 / piece", moq: "300 pieces", unit: "piece", leadTime: "20-35 days", specs: { material: "Heavy fleece", branding: "Print / embroidery" }, tags: ["hoodie", "streetwear", "private label"] },
      { title: "Denim Jacket Program", subcategory: "Denim", priceRange: "$12-38 / piece", moq: "250 pieces", unit: "piece", leadTime: "30-50 days", specs: { material: "Denim", wash: "Custom wash" }, tags: ["denim", "jacket", "fashion"] },
      { title: "Hotel Linen Set", subcategory: "Home Textile", priceRange: "$6-18 / set", moq: "500 sets", unit: "set", leadTime: "20-35 days", specs: { material: "Cotton blend", usage: "Hotel rooms" }, tags: ["hotel linen", "home textile", "hospitality"] },
      { title: "Technical Fabric Roll", subcategory: "Fabric Rolls", priceRange: "$1.90-6.80 / meter", moq: "1000 meters", unit: "meter", leadTime: "15-30 days", specs: { material: "Woven technical fabric", width: "150 cm" }, tags: ["fabric", "roll", "technical textile"] },
      { title: "Corporate Polo Shirt", subcategory: "Corporate Apparel", priceRange: "$4.20-11 / piece", moq: "400 pieces", unit: "piece", leadTime: "18-32 days", specs: { material: "Pique cotton", branding: "Embroidery" }, tags: ["polo", "corporate", "uniform"] }
    ]
  },
  {
    category: "Electronics and Electrical",
    country: "China",
    supplierType: "Electronics sourcing-ready profile",
    imageQuery: "electronics,device,technology",
    descriptionFocus: "electronic product sourcing and accessory procurement",
    products: [
      { title: "Smart WiFi Camera", subcategory: "Security Cameras", priceRange: "$18-45 / piece", moq: "500 pieces", unit: "piece", leadTime: "18-28 days", specs: { connectivity: "WiFi", resolution: "Model dependent" }, tags: ["camera", "security", "wifi"] },
      { title: "Industrial Tablet", subcategory: "Industrial Computers", priceRange: "$120-480 / piece", moq: "50 pieces", unit: "piece", leadTime: "25-40 days", specs: { display: "8-12 inch", enclosure: "Rugged" }, tags: ["tablet", "industrial", "computer"] },
      { title: "Wireless Earbuds", subcategory: "Consumer Electronics", priceRange: "$6-22 / set", moq: "1000 sets", unit: "set", leadTime: "15-30 days", specs: { bluetooth: "5.x", packaging: "Retail box option" }, tags: ["earbuds", "audio", "consumer electronics"] },
      { title: "USB-C Charging Station", subcategory: "Mobile Accessories", priceRange: "$12-35 / piece", moq: "300 pieces", unit: "piece", leadTime: "20-35 days", specs: { ports: "Multi-port", power: "Configurable" }, tags: ["charger", "usb-c", "accessory"] },
      { title: "Smart Home Control Panel", subcategory: "Smart Home", priceRange: "$28-85 / piece", moq: "200 pieces", unit: "piece", leadTime: "22-35 days", specs: { screen: "Touch panel", protocol: "WiFi / Zigbee options" }, tags: ["smart home", "control panel", "IoT"] },
      { title: "Industrial Sensor Module", subcategory: "Electrical Components", priceRange: "$4.80-18 / piece", moq: "1000 pieces", unit: "piece", leadTime: "18-32 days", specs: { sensor: "Configurable", output: "Digital / analog" }, tags: ["sensor", "module", "automation"] },
      { title: "Portable Power Bank", subcategory: "Mobile Power", priceRange: "$5.50-19 / piece", moq: "1000 pieces", unit: "piece", leadTime: "18-30 days", specs: { capacity: "10000-30000 mAh", casing: "Plastic / metal" }, tags: ["power bank", "mobile", "battery"] },
      { title: "Electrical Cable Assembly", subcategory: "Cables", priceRange: "$0.80-5.40 / piece", moq: "2000 pieces", unit: "piece", leadTime: "15-28 days", specs: { cable: "Custom harness", connector: "Project dependent" }, tags: ["cable", "assembly", "electrical"] }
    ]
  },
  {
    category: "Machinery and Industrial",
    country: "Türkiye",
    supplierType: "Machinery manufacturer-ready profile",
    imageQuery: "industrial,machinery,factory",
    descriptionFocus: "industrial production and factory equipment procurement",
    products: [
      { title: "CNC Router Machine", subcategory: "CNC Equipment", priceRange: "$4,500-22,000 / unit", moq: "1 unit", unit: "unit", leadTime: "45-75 days", specs: { workArea: "Configurable", control: "CNC controller" }, tags: ["cnc", "router", "machine"] },
      { title: "Fiber Laser Cutting Machine", subcategory: "Laser Cutting", priceRange: "$9,000-75,000 / unit", moq: "1 unit", unit: "unit", leadTime: "60-100 days", specs: { power: "Configurable", material: "Metal sheet" }, tags: ["laser", "cutting", "metal"] },
      { title: "Industrial Packaging Line", subcategory: "Packaging Machinery", priceRange: "$12,000-180,000 / line", moq: "1 line", unit: "line", leadTime: "75-140 days", specs: { automation: "Semi / automatic", output: "Project dependent" }, tags: ["packaging line", "automation", "factory"] },
      { title: "Automatic Labeling Machine", subcategory: "Labeling Machines", priceRange: "$2,800-25,000 / unit", moq: "1 unit", unit: "unit", leadTime: "35-70 days", specs: { containers: "Bottle / box / pouch", control: "PLC option" }, tags: ["labeling", "packaging", "machine"] },
      { title: "Hydraulic Press Machine", subcategory: "Press Machines", priceRange: "$6,500-48,000 / unit", moq: "1 unit", unit: "unit", leadTime: "50-90 days", specs: { force: "Configurable tonnage", frame: "Steel" }, tags: ["hydraulic", "press", "industrial"] },
      { title: "Plastic Injection Machine", subcategory: "Injection Molding", priceRange: "$18,000-120,000 / unit", moq: "1 unit", unit: "unit", leadTime: "70-130 days", specs: { clamping: "Model dependent", use: "Plastic parts" }, tags: ["injection", "plastic", "molding"] },
      { title: "Food Filling Machine", subcategory: "Filling Machines", priceRange: "$3,800-34,000 / unit", moq: "1 unit", unit: "unit", leadTime: "35-75 days", specs: { filling: "Liquid / paste", material: "Stainless steel" }, tags: ["filling", "food", "machine"] },
      { title: "Conveyor Automation System", subcategory: "Conveyors", priceRange: "$1,200-18,000 / system", moq: "1 system", unit: "system", leadTime: "25-60 days", specs: { belt: "PVC / modular", layout: "Custom" }, tags: ["conveyor", "automation", "factory"] }
    ]
  },
  {
    category: "Home and Furniture",
    country: "Türkiye",
    supplierType: "Furniture manufacturer-ready profile",
    imageQuery: "furniture,showroom,interior",
    descriptionFocus: "home, hotel and commercial furniture procurement",
    products: [
      { title: "Modern Dining Table Set", subcategory: "Dining Furniture", priceRange: "$240-420 / set", moq: "20 sets", unit: "set", leadTime: "30-45 days", specs: { material: "Wood / metal options", seats: "4-8" }, tags: ["dining table", "furniture", "home"] },
      { title: "Luxury Sofa Collection", subcategory: "Living Room Furniture", priceRange: "$680-1,450 / set", moq: "10 sets", unit: "set", leadTime: "35-50 days", specs: { upholstery: "Fabric / leather options", frame: "Wooden frame" }, tags: ["sofa", "living room", "luxury"] },
      { title: "Hotel Bedroom Furniture Set", subcategory: "Hotel Furniture", priceRange: "$1,200-3,200 / room", moq: "20 rooms", unit: "room", leadTime: "45-70 days", specs: { scope: "Bed, nightstand, wardrobe, desk", finish: "Custom veneer" }, tags: ["hotel", "bedroom", "furniture"] },
      { title: "Smart Office Desk", subcategory: "Office Furniture", priceRange: "$190-390 / piece", moq: "50 pieces", unit: "piece", leadTime: "25-40 days", specs: { feature: "Cable management", frame: "Metal" }, tags: ["desk", "office", "smart furniture"] },
      { title: "Outdoor Garden Seating Set", subcategory: "Outdoor Furniture", priceRange: "$180-650 / set", moq: "20 sets", unit: "set", leadTime: "30-50 days", specs: { material: "Aluminum / rattan", usage: "Outdoor" }, tags: ["outdoor", "garden", "seating"] },
      { title: "Modular Wardrobe System", subcategory: "Storage Furniture", priceRange: "$260-900 / set", moq: "20 sets", unit: "set", leadTime: "35-60 days", specs: { system: "Modular", finish: "Laminate / veneer" }, tags: ["wardrobe", "storage", "modular"] },
      { title: "Restaurant Chair Program", subcategory: "Commercial Seating", priceRange: "$28-95 / piece", moq: "100 pieces", unit: "piece", leadTime: "25-40 days", specs: { frame: "Wood / metal", upholstery: "Optional" }, tags: ["chair", "restaurant", "commercial"] },
      { title: "TV Unit and Media Console", subcategory: "Living Room Furniture", priceRange: "$95-320 / piece", moq: "50 pieces", unit: "piece", leadTime: "25-45 days", specs: { material: "MDF / veneer", cable: "Hidden routing" }, tags: ["tv unit", "media console", "home"] }
    ]
  },
  {
    category: "Beauty and Personal Care",
    country: "Türkiye",
    supplierType: "Beauty product sourcing-ready profile",
    imageQuery: "beauty,cosmetics,skincare",
    descriptionFocus: "beauty, salon and personal care procurement",
    products: [
      { title: "Professional Salon Device", subcategory: "Salon Equipment", priceRange: "$90-650 / unit", moq: "20 units", unit: "unit", leadTime: "20-40 days", specs: { use: "Salon treatment", voltage: "Market dependent" }, tags: ["salon", "beauty device", "professional"] },
      { title: "Skincare Bottle Set", subcategory: "Cosmetic Packaging", priceRange: "$0.22-1.40 / piece", moq: "5000 pieces", unit: "piece", leadTime: "18-30 days", specs: { material: "PET / glass options", cap: "Pump / screw" }, tags: ["skincare", "bottle", "cosmetic packaging"] },
      { title: "Makeup Brush Collection", subcategory: "Beauty Tools", priceRange: "$1.20-8.50 / set", moq: "1000 sets", unit: "set", leadTime: "18-32 days", specs: { bristle: "Synthetic", handle: "Wood / plastic" }, tags: ["makeup brush", "beauty tools", "private label"] },
      { title: "Hair Dryer Program", subcategory: "Hair Care Devices", priceRange: "$9-34 / piece", moq: "500 pieces", unit: "piece", leadTime: "25-40 days", specs: { power: "1200-2200W", packaging: "Retail box" }, tags: ["hair dryer", "hair care", "device"] },
      { title: "Spa Towel Set", subcategory: "Spa Supplies", priceRange: "$3.20-12 / set", moq: "500 sets", unit: "set", leadTime: "18-30 days", specs: { material: "Cotton", usage: "Spa / salon" }, tags: ["spa", "towel", "hospitality"] },
      { title: "Cosmetic Jar Packaging", subcategory: "Cosmetic Packaging", priceRange: "$0.18-1.10 / piece", moq: "5000 pieces", unit: "piece", leadTime: "15-30 days", specs: { material: "PP / PET / glass", volume: "30-250 ml" }, tags: ["cosmetic jar", "packaging", "beauty"] },
      { title: "Personal Care Gift Set", subcategory: "Gift Sets", priceRange: "$4.50-18 / set", moq: "1000 sets", unit: "set", leadTime: "25-45 days", specs: { items: "Configurable", packaging: "Gift box" }, tags: ["personal care", "gift set", "retail"] },
      { title: "Barber Tool Organizer", subcategory: "Salon Accessories", priceRange: "$2.80-14 / piece", moq: "500 pieces", unit: "piece", leadTime: "15-28 days", specs: { material: "ABS / metal", usage: "Barber station" }, tags: ["barber", "organizer", "salon"] }
    ]
  }
];

const additionalCategories: Array<Omit<CategoryTemplate, "products"> & { productNames: string[]; subcategories: string[]; price: string; moq: string; unit: string }> = [
  { category: "Packaging and Printing", country: "Türkiye", supplierType: "Packaging supplier-ready profile", imageQuery: "packaging,boxes,labels", descriptionFocus: "packaging and print procurement", price: "$0.08-0.42 / piece", moq: "5000 pieces", unit: "piece", subcategories: ["Boxes", "Labels", "Bottles", "Flexible Packaging"], productNames: ["Corrugated Shipping Boxes", "Custom Printed Labels", "Luxury Rigid Gift Box", "Stand-Up Pouch Packaging", "Glass Cosmetic Bottle", "Food Grade Paper Bag", "Shrink Sleeve Label", "Printed Catalog Brochure"] },
  { category: "Automotive and Spare Parts", country: "Türkiye", supplierType: "Automotive parts sourcing-ready profile", imageQuery: "automotive,parts,brake", descriptionFocus: "automotive aftermarket and fleet procurement", price: "$8-55 / piece", moq: "200 pieces", unit: "piece", subcategories: ["Brake System", "Lighting", "Off-road Equipment", "Suspension"], productNames: ["Brake Disc Set", "LED Headlight Kit", "4x4 Recovery Winch", "Heavy Duty Suspension Kit", "Oil Filter Program", "Automotive Rubber Hose", "Wheel Bearing Kit", "Truck Mirror Assembly"] },
  { category: "Construction and Building Materials", country: "Türkiye", supplierType: "Building materials manufacturer-ready profile", imageQuery: "construction,materials,interior", descriptionFocus: "construction and interior project procurement", price: "$18-28 / m2", moq: "500 m2", unit: "m2", subcategories: ["Wall Panels", "Insulation", "Tiles", "Doors"], productNames: ["Marble Look PVC Decorative Wall Panel", "Acoustic Wooden Wall Panel", "Thermal Insulation Board", "Porcelain Floor Tile", "Aluminum Door System", "Waterproof Membrane Roll", "Decorative Ceiling Panel", "Composite Facade Cladding"] },
  { category: "Agriculture and Food", country: "Türkiye", supplierType: "Agriculture and food sourcing-ready profile", imageQuery: "agriculture,greenhouse,food", descriptionFocus: "agriculture, greenhouse and food supply purchasing", price: "$1.20-18 / unit", moq: "100 units", unit: "unit", subcategories: ["Irrigation", "Greenhouse", "Food Ingredients", "Processing"], productNames: ["Greenhouse Irrigation Kit", "Agricultural Drip Pipe", "Dried Fruit Bulk Pack", "Food Processing Mixer", "Greenhouse Climate Fan", "Seedling Tray Set", "Olive Oil Export Carton", "Animal Feed Additive"] },
  { category: "Logistics and Trade Services", country: "Türkiye", supplierType: "Trade service-ready profile", imageQuery: "logistics,containers,port", descriptionFocus: "freight, customs and trade service workflows", price: "Quote based", moq: "1 shipment", unit: "shipment", subcategories: ["Sea Freight", "Air Freight", "Road Freight", "Customs"], productNames: ["Sea Freight Türkiye to Europe", "Air Freight Türkiye to USA", "Road Freight Türkiye to Germany", "Warehouse Fulfillment Services", "Export Customs Clearance", "Import Customs Clearance", "HS Code Consulting", "Trade Compliance Support"] },
  { category: "Solar and Energy", country: "Türkiye", supplierType: "Energy equipment sourcing-ready profile", imageQuery: "solar,panel,energy", descriptionFocus: "solar and energy project procurement", price: "$68-95 / panel", moq: "100 panels", unit: "panel", subcategories: ["Solar Panels", "Inverters", "Battery Storage", "Systems"], productNames: ["590W N-Type Solar Panel", "5KW Hybrid Inverter", "10KW Off Grid Solar System", "Lithium Energy Storage Battery", "Solar Mounting Rail Kit", "EV Charging Station", "Solar Combiner Box", "Portable Power Station"] },
  { category: "Office and Commercial Equipment", country: "Türkiye", supplierType: "Office equipment supplier-ready profile", imageQuery: "office,equipment,desk", descriptionFocus: "office and commercial workspace procurement", price: "$45-390 / piece", moq: "50 pieces", unit: "piece", subcategories: ["Office Furniture", "Printers", "Workstations", "Storage"], productNames: ["Smart Office Desk", "Ergonomic Office Chair", "Commercial Printer Stand", "Meeting Room Table", "Office Storage Cabinet", "Reception Counter", "Document Scanner Station", "Acoustic Office Divider"] },
  { category: "Medical and Health Equipment", country: "Türkiye", supplierType: "Health equipment sourcing-ready profile", imageQuery: "medical,equipment,hospital", descriptionFocus: "healthcare equipment procurement with compliance review", price: "$90-980 / piece", moq: "10 pieces", unit: "piece", subcategories: ["Monitoring", "Furniture", "Disposable", "Rehabilitation"], productNames: ["Patient Monitor", "Hospital Bed System", "Medical Examination Lamp", "Clinic Trolley Cart", "Disposable Procedure Kit", "Rehabilitation Walker", "Dental Cabinet Unit", "Medical Storage Cabinet"] },
  { category: "Industrial Equipment", country: "Türkiye", supplierType: "Industrial equipment supplier-ready profile", imageQuery: "industrial,equipment,pump", descriptionFocus: "industrial facility and process equipment procurement", price: "$180-1,400 / piece", moq: "10 pieces", unit: "piece", subcategories: ["Pumps", "Compressors", "Valves", "Facility"], productNames: ["Industrial Process Pump", "Air Compressor Unit", "Stainless Steel Valve", "Industrial Control Cabinet", "Pallet Handling Trolley", "Factory Safety Barrier", "Pressure Gauge Set", "Workshop Storage Rack"] },
  { category: "Hotel and Restaurant Supplies", country: "Türkiye", supplierType: "Hospitality supply-ready profile", imageQuery: "hotel,restaurant,supplies", descriptionFocus: "hotel, restaurant and hospitality procurement", price: "$2.40-180 / piece", moq: "100 pieces", unit: "piece", subcategories: ["Tableware", "Hotel Supplies", "Kitchen", "Furniture"], productNames: ["Hotel Amenity Kit", "Restaurant Porcelain Plate Set", "Commercial Cutlery Set", "Buffet Display Stand", "Hotel Bathrobe Program", "Room Service Trolley", "Restaurant Menu Holder", "Banquet Chair Stack"] },
  { category: "Cleaning and Hygiene Products", country: "Türkiye", supplierType: "Hygiene product sourcing-ready profile", imageQuery: "cleaning,hygiene,products", descriptionFocus: "cleaning, hygiene and facility supply procurement", price: "$0.80-12 / piece", moq: "1000 pieces", unit: "piece", subcategories: ["Cleaning Chemicals", "Dispensers", "Paper Hygiene", "Tools"], productNames: ["Industrial Cleaning Chemical", "Hand Sanitizer Bottle", "Paper Towel Dispenser", "Microfiber Cleaning Cloth", "Floor Cleaning Mop Set", "Disposable Glove Pack", "Waste Bin System", "Surface Disinfectant Wipes"] },
  { category: "Baby and Children Products", country: "Türkiye", supplierType: "Children product sourcing-ready profile", imageQuery: "baby,children,products", descriptionFocus: "baby and children product procurement", price: "$1.20-85 / piece", moq: "500 pieces", unit: "piece", subcategories: ["Baby Care", "Toys", "Furniture", "Textile"], productNames: ["Baby Textile Set", "Children Learning Toy", "Baby Feeding Bottle", "Kids Storage Cabinet", "Stroller Accessory Set", "Baby Care Gift Box", "Children Play Mat", "Toddler Furniture Set"] },
  { category: "Pet Products", country: "Türkiye", supplierType: "Pet product supplier-ready profile", imageQuery: "pet,products,dog", descriptionFocus: "pet retail and distributor procurement", price: "$0.90-48 / piece", moq: "500 pieces", unit: "piece", subcategories: ["Pet Accessories", "Pet Beds", "Feeding", "Grooming"], productNames: ["Pet Bed Collection", "Dog Leash and Collar Set", "Cat Scratcher Tower", "Pet Feeding Bowl", "Pet Grooming Brush", "Pet Carrier Bag", "Aquarium Accessory Kit", "Pet Toy Multipack"] },
  { category: "Sports and Outdoor", country: "Türkiye", supplierType: "Sports goods sourcing-ready profile", imageQuery: "sports,outdoor,equipment", descriptionFocus: "sports, outdoor and recreation product procurement", price: "$3.50-180 / piece", moq: "200 pieces", unit: "piece", subcategories: ["Outdoor Gear", "Fitness", "Sportswear", "Camping"], productNames: ["Camping Tent Program", "Fitness Resistance Band Set", "Outdoor Backpack", "Yoga Mat Collection", "Portable Folding Chair", "Sports Bottle Program", "Training Equipment Kit", "Waterproof Outdoor Jacket"] },
  { category: "Hardware and Tools", country: "Türkiye", supplierType: "Hardware supplier-ready profile", imageQuery: "tools,hardware,workshop", descriptionFocus: "hardware, tools and workshop procurement", price: "$1.10-240 / piece", moq: "200 pieces", unit: "piece", subcategories: ["Hand Tools", "Power Tools", "Fasteners", "Workshop"], productNames: ["Professional Hand Tool Set", "Cordless Drill Kit", "Stainless Screw Pack", "Workshop Tool Cabinet", "Industrial Clamp Set", "Measuring Tape Program", "Construction Level Tool", "Safety Utility Knife"] },
  { category: "Security and Safety Equipment", country: "Türkiye", supplierType: "Safety equipment sourcing-ready profile", imageQuery: "security,safety,equipment", descriptionFocus: "security and workplace safety procurement", price: "$2.20-450 / piece", moq: "100 pieces", unit: "piece", subcategories: ["PPE", "Surveillance", "Fire Safety", "Access Control"], productNames: ["Safety Helmet Program", "High Visibility Vest", "Fire Extinguisher Cabinet", "Access Control Terminal", "Industrial Safety Gloves", "CCTV Camera Housing", "Emergency Exit Sign", "Fall Protection Harness"] },
  { category: "Kitchen and Household Products", country: "Türkiye", supplierType: "Household product supplier-ready profile", imageQuery: "kitchen,household,products", descriptionFocus: "kitchen and household product procurement", price: "$0.90-95 / piece", moq: "500 pieces", unit: "piece", subcategories: ["Cookware", "Storage", "Small Appliances", "Household"], productNames: ["Stainless Cookware Set", "Kitchen Storage Container", "Household Cleaning Brush", "Electric Kettle Program", "Cutting Board Set", "Glass Food Jar", "Laundry Basket Program", "Kitchen Knife Set"] },
  { category: "Lighting", country: "Türkiye", supplierType: "Lighting supplier-ready profile", imageQuery: "lighting,led,industrial", descriptionFocus: "commercial, residential and industrial lighting procurement", price: "$3.20-180 / piece", moq: "200 pieces", unit: "piece", subcategories: ["LED Panels", "Industrial Lighting", "Outdoor Lighting", "Decorative"], productNames: ["LED Panel Light", "Industrial High Bay Light", "Outdoor Street Light", "Decorative Pendant Light", "LED Strip Roll", "Emergency Lighting Unit", "Track Lighting System", "Solar Garden Light"] },
  { category: "HVAC and Ventilation", country: "Türkiye", supplierType: "HVAC equipment sourcing-ready profile", imageQuery: "hvac,ventilation,duct", descriptionFocus: "HVAC, ventilation and climate equipment procurement", price: "$18-1,800 / piece", moq: "20 pieces", unit: "piece", subcategories: ["Ventilation", "Fans", "Ducting", "Climate"], productNames: ["Ventilation Duct System", "Industrial Axial Fan", "Air Handling Unit", "HVAC Filter Cartridge", "Flexible Air Duct", "Ceiling Diffuser Panel", "Heat Recovery Unit", "Commercial Exhaust Fan"] },
  { category: "Water Treatment", country: "Türkiye", supplierType: "Water treatment supplier-ready profile", imageQuery: "water,treatment,filter", descriptionFocus: "water filtration and treatment system procurement", price: "$12-4,800 / unit", moq: "10 units", unit: "unit", subcategories: ["Filters", "RO Systems", "Pumps", "Treatment"], productNames: ["Reverse Osmosis System", "Industrial Water Filter", "Water Softener Unit", "Submersible Pump Set", "Filter Housing Cartridge", "UV Sterilizer Unit", "Wastewater Treatment Module", "Pressure Booster System"] },
  { category: "Plastic and Rubber Products", country: "Türkiye", supplierType: "Plastic and rubber product supplier-ready profile", imageQuery: "plastic,rubber,products", descriptionFocus: "plastic and rubber component procurement", price: "$0.05-18 / piece", moq: "5000 pieces", unit: "piece", subcategories: ["Plastic Parts", "Rubber Parts", "Profiles", "Packaging"], productNames: ["Custom Plastic Injection Part", "Rubber Gasket Set", "PVC Profile Strip", "Plastic Storage Crate", "Rubber Hose Program", "Silicone Sealant Profile", "Industrial Plastic Cap", "Rubber Mat Roll"] },
  { category: "Metal Products", country: "Türkiye", supplierType: "Metal fabrication-ready profile", imageQuery: "metal,steel,parts", descriptionFocus: "metal fabrication and component procurement", price: "$0.18-240 / piece", moq: "500 pieces", unit: "piece", subcategories: ["Sheet Metal", "Fasteners", "Profiles", "Fabrication"], productNames: ["Stainless Steel Sheet Part", "Metal Bracket Program", "Aluminum Profile System", "Precision Fastener Set", "Welded Steel Frame", "CNC Machined Metal Part", "Decorative Metal Panel", "Industrial Cable Tray"] },
  { category: "Glass and Ceramic Products", country: "Türkiye", supplierType: "Glass and ceramic supplier-ready profile", imageQuery: "glass,ceramic,products", descriptionFocus: "glass, ceramic and surface product procurement", price: "$0.40-85 / piece", moq: "500 pieces", unit: "piece", subcategories: ["Glassware", "Tiles", "Ceramics", "Decor"], productNames: ["Ceramic Wall Tile", "Glass Jar Program", "Decorative Ceramic Vase", "Tempered Glass Panel", "Porcelain Tableware Set", "Mosaic Tile Sheet", "Glass Candle Container", "Ceramic Sanitary Accessory"] },
  { category: "Paper Products", country: "Türkiye", supplierType: "Paper product supplier-ready profile", imageQuery: "paper,products,packaging", descriptionFocus: "paper, stationery and packaging procurement", price: "$0.02-8 / piece", moq: "5000 pieces", unit: "piece", subcategories: ["Paper Packaging", "Stationery", "Hygiene Paper", "Print"], productNames: ["Kraft Paper Bag", "Notebook Production Program", "Paper Cup Program", "Thermal Receipt Roll", "Printed Paper Sleeve", "Tissue Paper Pack", "Office Copy Paper", "Paper Hang Tag"] },
  { category: "Gifts and Promotional Products", country: "Türkiye", supplierType: "Promotional product supplier-ready profile", imageQuery: "promotional,gifts,products", descriptionFocus: "branded gifts and promotional merchandise procurement", price: "$0.30-28 / piece", moq: "1000 pieces", unit: "piece", subcategories: ["Promotional Gifts", "Corporate", "Events", "Retail"], productNames: ["Promotional Tote Bag", "Corporate Pen Set", "Custom Notebook Gift", "Branded Drink Bottle", "Event Lanyard Program", "Promotional Keychain", "Gift Box Collection", "Corporate Desk Calendar"] }
];

const professionalExtraCategories: Array<Omit<CategoryTemplate, "products"> & { productNames: string[]; subcategories: string[]; price: string; moq: string; unit: string }> = [
  { category: "Decorative Wall Panels", country: "Türkiye", supplierType: "Decorative surface supplier profile", imageQuery: "decorative wall panel", descriptionFocus: "interior wall panel and architectural surface procurement", price: "$12-45 / m2", moq: "300 m2", unit: "m2", subcategories: ["PVC Panels", "Acoustic Panels", "3D Panels", "MDF Panels"], productNames: ["Marble Look PVC Decorative Wall Panel", "Wood Slat Acoustic Wall Panel", "3D Geometric Wall Panel", "Stone Look Interior Panel", "MDF Decorative Wall Panel", "Custom Patterned Wall Surface", "Luxury PVC Wall Panel", "Fluted Interior Wall Panel", "Hotel Lobby Wall Cladding", "Matte Concrete Look Panel", "Walnut Texture Wall Panel", "Moisture Resistant Wall Panel"] },
  { category: "Textile and Fabrics", country: "Türkiye", supplierType: "Textile supplier profile", imageQuery: "fabric roll textile", descriptionFocus: "fabric roll and textile material procurement", price: "$1.20-8.50 / meter", moq: "500 meters", unit: "meter", subcategories: ["Cotton", "Polyester", "Upholstery", "Technical"], productNames: ["Cotton Fabric Roll", "Polyester Fabric Roll", "Upholstery Fabric", "Knitted Fabric", "Technical Textile Roll", "Printed Textile Fabric", "Denim Fabric Roll", "Outdoor Waterproof Fabric", "Velvet Upholstery Fabric", "Linen Blend Fabric", "Nonwoven Fabric Roll", "Jacquard Textile Fabric"] },
  { category: "Apparel and Workwear", country: "Türkiye", supplierType: "Apparel supplier profile", imageQuery: "workwear apparel", descriptionFocus: "apparel, uniforms and workwear procurement", price: "$2.80-35 / piece", moq: "300 pieces", unit: "piece", subcategories: ["T-Shirts", "Uniforms", "Outerwear", "Sportswear"], productNames: ["Premium Cotton T-Shirt", "Workwear Uniform Set", "High Visibility Safety Vest", "Luxury Hoodie", "Sportswear Set", "Chef Uniform Program", "Corporate Polo Shirt", "Denim Jacket Program", "Softshell Work Jacket", "Medical Scrub Set", "Hotel Staff Uniform", "Private Label Sweatshirt"] },
  { category: "Customs and Trade Services", country: "Türkiye", supplierType: "Customs and trade service profile", imageQuery: "customs trade documents", descriptionFocus: "customs, document and trade compliance service procurement", price: "Service quote", moq: "1 consultation", unit: "consultation", subcategories: ["Export Customs", "Import Customs", "Compliance", "Documents"], productNames: ["Export Customs Clearance", "Import Customs Clearance", "HS Code Consulting", "Trade Compliance Support", "Export Document Preparation", "Import Duty Review", "Certificate of Origin Support", "Transit Documentation Service", "Product Classification Review", "Customs Broker Consultation", "Freight Paperwork Review", "Market Entry Document Check"] }
];

function productFromName(name: string, category: Omit<CategoryTemplate, "products"> & { productNames: string[]; subcategories: string[]; price: string; moq: string; unit: string }, index: number): ProductTemplate {
  return {
    title: name,
    subcategory: category.subcategories[index % category.subcategories.length] ?? category.subcategories[0] ?? category.category,
    priceRange: category.price,
    moq: category.moq,
    unit: category.unit,
    leadTime: index % 2 === 0 ? "15-30 days" : "25-45 days",
    specs: {
      material: "Project dependent",
      packaging: "Export-ready packaging",
      application: category.descriptionFocus
    },
    tags: [slugify(category.category).replace(/-/g, " "), slugify(name).replace(/-/g, " "), (category.subcategories[index % category.subcategories.length] ?? category.category).toLowerCase()]
  };
}

function ensureTwelveProducts(category: CategoryTemplate): CategoryTemplate {
  if (category.products.length >= 12) return category;
  const additions = Array.from({ length: 12 - category.products.length }, (_, index) => {
    const base = category.products[index % category.products.length] ?? {
      title: `${category.category} RFQ Product`,
      subcategory: category.category,
      priceRange: "Request quote",
      moq: "1 lot",
      unit: "lot",
      leadTime: "20-40 days",
      specs: {},
      tags: [category.category.toLowerCase()]
    };
    const variantNumber = category.products.length + index + 1;
    return {
      ...base,
      title: `${base.title} ${variantNumber}`,
      tags: [...base.tags, "rfq ready", "customization available"]
    };
  });
  return { ...category, products: [...category.products, ...additions] };
}

const allCategoryTemplates: CategoryTemplate[] = [
  ...categoryTemplates,
  ...additionalCategories.map((category) => ({
    category: category.category,
    country: category.country,
    supplierType: category.supplierType,
    imageQuery: category.imageQuery,
    descriptionFocus: category.descriptionFocus,
    products: category.productNames.map((name, index) => productFromName(name, category, index))
  })),
  ...professionalExtraCategories.map((category) => ({
    category: category.category,
    country: category.country,
    supplierType: category.supplierType,
    imageQuery: category.imageQuery,
    descriptionFocus: category.descriptionFocus,
    products: category.productNames.map((name, index) => productFromName(name, category, index))
  }))
].map(ensureTwelveProducts);

export const marketplaceCategories = allCategoryTemplates.map((category) => ({
  name: category.category,
  slug: slugify(category.category),
  productCount: category.products.length
}));

export const marketplaceSeedListings: MarketplaceSeedListing[] = allCategoryTemplates.flatMap((category, categoryIndex) =>
  category.products.map((product, productIndex) => makeListing(category, categoryIndex, product, productIndex))
);
