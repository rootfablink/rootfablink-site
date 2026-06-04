type SeedProductQualityInput = {
  title?: string;
  category?: string;
  subcategory?: string;
  priceRange?: string;
  moq?: string;
  mainImage?: string;
  galleryImages?: string[];
  imageAlt?: string;
  imageSearchIntent?: string;
  visualCategory?: string;
  visualMatchScore?: number;
  source?: string;
  verified?: boolean;
  rating?: number | null;
  reviewCount?: number;
  review_count?: number;
};

export type SeedProductQualityIssue = {
  index: number;
  title: string;
  issue: string;
};

const suspiciousTextPattern = /placeholder|random|loremflickr|unsplash\.it|picsum/i;
const mojibakePattern = /Ã|Ä|Å|Â/;

export function validateMarketplaceSeedProducts(products: SeedProductQualityInput[]) {
  const issues: SeedProductQualityIssue[] = [];

  products.forEach((product, index) => {
    const title = product.title ?? `listing-${index}`;
    const requiredFields: Array<keyof SeedProductQualityInput> = [
      "title",
      "category",
      "subcategory",
      "priceRange",
      "moq",
      "mainImage",
      "imageAlt",
      "imageSearchIntent",
      "visualCategory"
    ];

    requiredFields.forEach((field) => {
      if (!product[field]) {
        issues.push({ index, title, issue: `Missing ${field}` });
      }
    });

    if (!product.galleryImages || product.galleryImages.length < 3) {
      issues.push({ index, title, issue: "Gallery must include at least three images" });
    }

    if (product.source === "marketplace_seed_data") {
      if (product.verified) issues.push({ index, title, issue: "Seed listings must not be marked verified" });
      if (product.rating !== null) issues.push({ index, title, issue: "Seed listings must not include ratings" });
      if ((product.reviewCount ?? product.review_count ?? 0) !== 0) issues.push({ index, title, issue: "Seed listings must not include reviews" });
    }

    const visualText = `${product.mainImage ?? ""} ${product.imageAlt ?? ""} ${product.imageSearchIntent ?? ""}`;
    if (suspiciousTextPattern.test(visualText)) {
      issues.push({ index, title, issue: "Image metadata contains generic or random-image source language" });
    }

    if ((product.visualMatchScore ?? 0) < 8) {
      issues.push({ index, title, issue: "Visual match score is below professional marketplace threshold" });
    }

    const text = JSON.stringify(product);
    if (mojibakePattern.test(text)) {
      issues.push({ index, title, issue: "Text contains mojibake characters" });
    }
  });

  return {
    passed: issues.length === 0,
    total: products.length,
    issues
  };
}
