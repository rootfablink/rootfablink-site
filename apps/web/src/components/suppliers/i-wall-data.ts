export type IWallProduct = {
  title: string;
  titleTr: string;
  price: string;
  priceRange: string;
  moq: string;
  country: string;
  countryTr: string;
  verified: false;
  sponsored?: boolean;
  mainImage: string;
  galleryImages: string[];
  imageAlt: string;
  imageSearchIntent: string;
  visualCategory: string;
  visualMatchScore: number;
  imageFit: "contain";
  leadTime: string;
  category: string;
  categoryTr: string;
  subcategory: string;
  subcategoryTr: string;
  shortDescription: string;
  shortDescriptionTr: string;
  supplierName: string;
  supplierType: string;
  supplierTypeTr: string;
  brandName: "i-WALL";
  brandLogo: string;
  slug: string;
  sku: string;
  specifications: Record<string, string>;
  specificationsTr: Record<string, string>;
  applications: string[];
  applicationsTr: string[];
  packagingInfo: string;
  packagingInfoTr: string;
  tags: string[];
  tradeTerms: string[];
  capabilities: string[];
  source: "iwall_uploaded_assets";
  reviewCount: 0;
  review_count: 0;
  rating: null;
};

export const iWallLogo = "/brands/i-wall/logo.png";

export const iWallManufacturer = {
  brandName: "i-WALL",
  country: "Turkey",
  countryTr: "Türkiye",
  industry: "Building Materials",
  industryTr: "Yapı Malzemeleri",
  category: "PS Wall Panels",
  categoryTr: "Polimer Lambiri",
  productCount: 27,
  description:
    "i-WALL manufactures PS wall panels for residential, commercial, hotel, office, retail and architectural interior decoration projects. The showroom presents uploaded product models for RFQ-based sourcing without invented prices, ratings or certifications.",
  descriptionTr:
    "i-WALL; konut, ticari alan, otel, ofis, mağaza ve mimari iç mekan dekorasyon projeleri için polimer lambiri üretir. Bu showroom, yüklenen gerçek ürün modellerini fiyat uydurmadan, sahte yorum veya sertifika göstermeden RFQ tabanlı tedarik için sunar."
};

const applications = [
  "Residential Projects",
  "Commercial Projects",
  "Hotels",
  "Offices",
  "Retail Stores",
  "Interior Decoration",
  "Architectural Projects"
];

const applicationsTr = [
  "Konut Projeleri",
  "Ticari Projeler",
  "Oteller",
  "Ofisler",
  "Mağazalar",
  "İç Mekan Dekorasyonu",
  "Mimari Projeler"
];

function modelNumber(index: number) {
  return String(index).padStart(2, "0");
}

function skuNumber(index: number) {
  return String(index).padStart(3, "0");
}

function productImage(index: number) {
  return `/brands/i-wall/no${index}.jpeg`;
}

export const iWallProducts: IWallProduct[] = Array.from({ length: 27 }, (_, itemIndex) => {
  const index = itemIndex + 1;
  const model = modelNumber(index);
  const sku = `IW-PS-${skuNumber(index)}`;
  const image = productImage(index);
  const nextImage = productImage(index === 27 ? 1 : index + 1);
  const previousImage = productImage(index === 1 ? 27 : index - 1);

  return {
    title: `i-WALL PS Wall Panel Model ${model}`,
    titleTr: `i-WALL Polimer Lambiri Model ${model}`,
    price: "Request Quote",
    priceRange: "Request Quote",
    moq: "100 m²",
    country: "Turkey",
    countryTr: "Türkiye",
    verified: false,
    sponsored: index <= 4,
    mainImage: image,
    galleryImages: [image, nextImage, previousImage],
    imageAlt: `i-WALL PS Wall Panel Model ${model}`,
    imageSearchIntent: `i-WALL PS wall panel model ${model} decorative interior wall panel product photo`,
    visualCategory: "i_wall_ps_wall_panel",
    visualMatchScore: 10,
    imageFit: "contain",
    leadTime: "10-20 Days",
    category: "Building Materials",
    categoryTr: "Yapı Malzemeleri",
    subcategory: "PS Wall Panels",
    subcategoryTr: "Polimer Lambiri",
    shortDescription:
      "PS wall panel model for decorative interior wall applications in residential, commercial and architectural projects. Pricing is handled through RFQ.",
    shortDescriptionTr:
      "Konut, ticari alan ve mimari projelerde dekoratif iç mekan duvar uygulamaları için polimer lambiri modeli. Fiyatlandırma RFQ ile yapılır.",
    supplierName: "i-WALL",
    supplierType: "Manufacturer",
    supplierTypeTr: "Üretici",
    brandName: "i-WALL",
    brandLogo: iWallLogo,
    slug: sku.toLowerCase(),
    sku,
    specifications: {
      Brand: "i-WALL",
      SKU: sku,
      "Product Type": "PS Wall Panel",
      Length: "2.80 m",
      Width: "12-15 cm",
      Category: "Decorative Interior Wall Panels",
      Pricing: "Request Quote"
    },
    specificationsTr: {
      Marka: "i-WALL",
      SKU: sku,
      "Ürün Tipi": "Polimer Lambiri",
      Uzunluk: "2.80 m",
      Genişlik: "12-15 cm",
      Kategori: "Dekoratif İç Mekan Duvar Panelleri",
      Fiyatlandırma: "Teklif ile"
    },
    applications,
    applicationsTr,
    packagingInfo: "Packaging details are confirmed during quotation based on order volume, destination and project requirements.",
    packagingInfoTr: "Paketleme bilgileri sipariş hacmi, teslimat ülkesi ve proje gereksinimlerine göre teklif aşamasında netleştirilir.",
    tags: [
      "ps wall panel",
      "decorative wall panel",
      "interior wall panel",
      "polymer wall panel",
      "slat wall panel",
      "i-wall",
      "polimer lambiri",
      "duvar paneli",
      "ps panel",
      "ps duvar paneli",
      "dekoratif duvar paneli"
    ],
    tradeTerms: ["RFQ", "Project quotation", "Supplier inquiry"],
    capabilities: ["Manufacturer", "Project sourcing", "Interior decoration", "RFQ ready"],
    source: "iwall_uploaded_assets",
    reviewCount: 0,
    review_count: 0,
    rating: null
  };
});
