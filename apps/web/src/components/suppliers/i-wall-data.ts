export type IWallProduct = {
  title: string;
  titleTr: string;
  price: string;
  priceRange: string;
  priceRangeTr: string;
  moq: string;
  country: string;
  countryTr: string;
  verified: false;
  sponsored?: boolean;
  mainImage: string;
  galleryImages: string[];
  imageAlt: string;
  imageAltTr: string;
  imageSearchIntent: string;
  visualCategory: string;
  visualMatchScore: number;
  imageFit: "contain";
  leadTime: string;
  leadTimeTr: string;
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
  tradeTermsTr: string[];
  capabilities: string[];
  source: "i-wall-local-assets";
  isRealBrandAsset: true;
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
  category: "PS Wall Panel",
  categoryTr: "Polimer Lambiri",
  productCount: 27,
  source: "i-wall-local-assets",
  verified: false,
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

const tags = [
  "ps wall panel",
  "decorative wall panel",
  "decorative wall panels",
  "interior wall panel",
  "polymer wall panel",
  "wall cladding",
  "slat wall panel",
  "building materials",
  "i-wall",
  "polimer lambiri",
  "duvar paneli",
  "dekoratif duvar paneli",
  "iç mekan duvar paneli",
  "yapı malzemeleri",
  "ps panel",
  "ps duvar paneli"
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

export const iWallAssetPaths = [iWallLogo, ...Array.from({ length: 27 }, (_, index) => productImage(index + 1))];

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
    priceRangeTr: "Teklif al",
    moq: "100 m²",
    country: "Turkey",
    countryTr: "Türkiye",
    verified: false,
    sponsored: index <= 4,
    mainImage: image,
    galleryImages: [image, nextImage, previousImage],
    imageAlt: `i-WALL PS Wall Panel Model ${model} decorative wall panel product image`,
    imageAltTr: `i-WALL Polimer Lambiri Model ${model} dekoratif duvar paneli ürün görseli`,
    imageSearchIntent: `i-WALL PS wall panel model ${model} decorative interior wall panel product photo`,
    visualCategory: "i_wall_ps_wall_panel",
    visualMatchScore: 10,
    imageFit: "contain",
    leadTime: "10-20 days",
    leadTimeTr: "10-20 gün",
    category: "Decorative Wall Panel",
    categoryTr: "Dekoratif Duvar Paneli",
    subcategory: "PS Wall Panel",
    subcategoryTr: "Polimer Lambiri",
    shortDescription:
      "PS wall panel model for decorative interior wall applications in residential, commercial, hotel, office and architectural projects. Pricing is handled through RFQ.",
    shortDescriptionTr:
      "Konut, ticari alan, otel, ofis ve mimari projelerde dekoratif iç mekan duvar uygulamaları için polimer lambiri modeli. Fiyatlandırma RFQ ile yapılır.",
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
      "Turkish Name": "Polimer Lambiri",
      Length: "2.80 m",
      Width: "12-15 cm",
      Application: "Interior wall decoration",
      Category: "Decorative Wall Panel",
      Origin: "Türkiye",
      Price: "Request Quote",
      MOQ: "100 m²",
      "Lead Time": "10-20 days"
    },
    specificationsTr: {
      Marka: "i-WALL",
      SKU: sku,
      "Ürün Tipi": "Polimer Lambiri",
      "İngilizce Ürün Adı": "PS Wall Panel",
      Uzunluk: "2.80 m",
      Genişlik: "12-15 cm",
      Uygulama: "İç mekan duvar dekorasyonu",
      Kategori: "Dekoratif Duvar Paneli",
      Menşei: "Türkiye",
      Fiyat: "Teklif al",
      MOQ: "100 m²",
      "Teslim Süresi": "10-20 gün"
    },
    applications,
    applicationsTr,
    packagingInfo: "Packaging details are confirmed during quotation based on order volume, destination and project requirements.",
    packagingInfoTr: "Paketleme bilgileri sipariş hacmi, teslimat ülkesi ve proje gereksinimlerine göre teklif aşamasında netleştirilir.",
    tags,
    tradeTerms: ["RFQ", "Project quotation", "Supplier inquiry"],
    tradeTermsTr: ["RFQ", "Proje teklifi", "Tedarikçi talebi"],
    capabilities: ["Manufacturer", "Project sourcing", "Interior decoration", "RFQ ready"],
    source: "i-wall-local-assets",
    isRealBrandAsset: true,
    reviewCount: 0,
    review_count: 0,
    rating: null
  };
});
