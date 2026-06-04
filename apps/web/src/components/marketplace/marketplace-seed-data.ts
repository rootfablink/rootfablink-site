export type MarketplaceSeedListing = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  country: string;
  moq: string;
  leadTime: string;
  priceRange: string;
  shortDescription: string;
  mainImage: string;
  galleryImages: string[];
  productSpecifications: Record<string, string>;
  source: "marketplace_seed_data";
  visible: true;
  verified: false;
  review_count: 0;
  rating: null;
  sponsored?: boolean;
};

const imageMap = {
  wallPanels: [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  ],
  furniture: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1200&q=80"
  ],
  solar: [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80"
  ],
  electronics: [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1200&q=80"
  ],
  textile: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80"
  ],
  automotive: [
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
  ],
  machinery: [
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
  ],
  logistics: [
    "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
  ],
  documents: [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80"
  ],
  packaging: [
    "https://images.unsplash.com/photo-1607344645866-009c320f705a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=1200&q=80"
  ],
  agriculture: [
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80"
  ],
  medical: [
    "https://images.unsplash.com/photo-1581093458791-9d09fd1b5b66?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80"
  ],
  beauty: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80"
  ],
  office: [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
  ],
  chemicals: [
    "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80"
  ]
} as const;

function listing(input: Omit<MarketplaceSeedListing, "id" | "source" | "visible" | "verified" | "review_count" | "rating" | "galleryImages" | "mainImage"> & { imageKey: keyof typeof imageMap; id: string }): MarketplaceSeedListing {
  const images = imageMap[input.imageKey];
  return {
    ...input,
    mainImage: images[0],
    galleryImages: [...images],
    source: "marketplace_seed_data",
    visible: true,
    verified: false,
    review_count: 0,
    rating: null
  };
}

export const marketplaceSeedListings: MarketplaceSeedListing[] = [
  listing({ id: "seed-luxury-pvc-wall-panel", title: "Luxury PVC Wall Panel", category: "Construction & Building Materials", subcategory: "Decorative Wall Panels", country: "Türkiye", moq: "500 m²", leadTime: "18-25 days", priceRange: "$18-24 / m²", shortDescription: "Commercial-grade PVC wall panels for hotel, office and residential interior projects.", productSpecifications: { Material: "PVC composite", Finish: "Matte / textured", Usage: "Interior wall cladding" }, imageKey: "wallPanels", sponsored: true }),
  listing({ id: "seed-marble-effect-wall-panel", title: "Marble Effect Wall Panel", category: "Decorative Wall Panels", subcategory: "Marble Look Panels", country: "Türkiye", moq: "300 m²", leadTime: "15-22 days", priceRange: "$22-31 / m²", shortDescription: "Marble-look decorative surface panels for premium interiors and commercial fit-outs.", productSpecifications: { Surface: "Marble effect", Application: "Interior decoration", Customizable: "Pattern and color options" }, imageKey: "wallPanels" }),
  listing({ id: "seed-3d-decorative-wall-panel", title: "3D Decorative Wall Panel", category: "Decorative Wall Panels", subcategory: "3D Wall Panels", country: "Türkiye", moq: "1000 pcs", leadTime: "20-30 days", priceRange: "$12-18 / m²", shortDescription: "Textured 3D wall panel system for modern architecture and retail environments.", productSpecifications: { Texture: "Geometric 3D", Usage: "Residential / commercial", Packaging: "Carton and pallet" }, imageKey: "wallPanels" }),
  listing({ id: "seed-acoustic-wooden-wall-panel", title: "Acoustic Wooden Wall Panel", category: "Construction & Building Materials", subcategory: "Acoustic Panels", country: "Türkiye", moq: "200 m²", leadTime: "21-35 days", priceRange: "$28-45 / m²", shortDescription: "Acoustic wood-slat panel solution for offices, hospitality and performance interiors.", productSpecifications: { Material: "Wood veneer / acoustic felt", Feature: "Sound absorption", Usage: "Wall and ceiling" }, imageKey: "wallPanels" }),
  listing({ id: "seed-modern-dining-table-set", title: "Modern Dining Table Set", category: "Home & Furniture", subcategory: "Dining Furniture", country: "Türkiye", moq: "20 sets", leadTime: "30-45 days", priceRange: "$240-420 / set", shortDescription: "Modern dining table and chair sets for retail, project and hospitality procurement.", productSpecifications: { Material: "Wood / metal options", Seats: "4-8", Packaging: "Export carton" }, imageKey: "furniture" }),
  listing({ id: "seed-luxury-sofa-collection", title: "Luxury Sofa Collection", category: "Home & Furniture", subcategory: "Living Room Furniture", country: "Türkiye", moq: "10 sets", leadTime: "35-50 days", priceRange: "$680-1450 / set", shortDescription: "Project-ready sofa collections for residential developments and premium showrooms.", productSpecifications: { Upholstery: "Fabric / leather options", Frame: "Wooden frame", Customization: "Color and size" }, imageKey: "furniture" }),
  listing({ id: "seed-hotel-bedroom-furniture-set", title: "Hotel Bedroom Furniture Set", category: "Home & Furniture", subcategory: "Hotel Furniture", country: "Türkiye", moq: "20 rooms", leadTime: "45-70 days", priceRange: "$1200-3200 / room", shortDescription: "Hotel room furniture packages prepared for hospitality procurement projects.", productSpecifications: { Scope: "Bed, nightstand, wardrobe, desk", Finish: "Custom veneer", Project: "Hotel / serviced apartment" }, imageKey: "furniture" }),
  listing({ id: "seed-smart-office-desk", title: "Smart Office Desk", category: "Office Equipment", subcategory: "Office Furniture", country: "Türkiye", moq: "50 pcs", leadTime: "25-40 days", priceRange: "$190-390 / pc", shortDescription: "Height-adjustable office desk system for modern workspaces and corporate projects.", productSpecifications: { Feature: "Cable management", Frame: "Metal", Desktop: "Laminate / veneer" }, imageKey: "office" }),
  listing({ id: "seed-590w-n-type-solar-panel", title: "590W N-Type Solar Panel", category: "Solar Energy", subcategory: "Solar Panels", country: "Türkiye", moq: "1 container", leadTime: "20-35 days", priceRange: "$68-95 / panel", shortDescription: "High-output N-Type solar panel listing for utility and commercial energy projects.", productSpecifications: { Power: "590W", Cell: "N-Type", Warranty: "Supplier provided document required" }, imageKey: "solar", sponsored: true }),
  listing({ id: "seed-5kw-hybrid-inverter", title: "5KW Hybrid Inverter", category: "Solar Energy", subcategory: "Inverters", country: "Türkiye", moq: "20 pcs", leadTime: "15-30 days", priceRange: "$280-520 / pc", shortDescription: "Hybrid solar inverter for residential and light commercial energy storage systems.", productSpecifications: { Output: "5KW", Phase: "Single phase", Use: "Hybrid solar system" }, imageKey: "solar" }),
  listing({ id: "seed-10kw-off-grid-system", title: "10KW Off Grid Solar System", category: "Solar Energy", subcategory: "Solar Systems", country: "Türkiye", moq: "5 systems", leadTime: "30-45 days", priceRange: "$3200-5800 / system", shortDescription: "Off-grid solar system package for remote facilities and commercial backup power.", productSpecifications: { Capacity: "10KW", Includes: "Panels, inverter, battery options", Installation: "Project dependent" }, imageKey: "solar" }),
  listing({ id: "seed-lithium-energy-storage-battery", title: "Lithium Energy Storage Battery", category: "Solar Energy", subcategory: "Energy Storage", country: "Türkiye", moq: "10 units", leadTime: "25-40 days", priceRange: "$1200-3900 / unit", shortDescription: "Lithium battery storage units for solar and backup energy applications.", productSpecifications: { Chemistry: "Lithium", Application: "Solar storage", Capacity: "Configurable" }, imageKey: "solar" }),
  listing({ id: "seed-smart-wifi-camera", title: "Smart WiFi Camera", category: "Electronics", subcategory: "Security Cameras", country: "China", moq: "500 pcs", leadTime: "18-28 days", priceRange: "$18-45 / pc", shortDescription: "Smart WiFi camera listing for retail, project and private label procurement.", productSpecifications: { Connectivity: "WiFi", Resolution: "Configurable", Packaging: "Retail box option" }, imageKey: "electronics" }),
  listing({ id: "seed-industrial-tablet", title: "Industrial Tablet", category: "Electronics", subcategory: "Industrial Computers", country: "Türkiye", moq: "50 pcs", leadTime: "25-40 days", priceRange: "$120-480 / pc", shortDescription: "Rugged industrial tablet for warehouse, factory and field operations.", productSpecifications: { Display: "8-12 inch options", Protection: "Rugged enclosure", OS: "Android / Windows options" }, imageKey: "electronics" }),
  listing({ id: "seed-wireless-earbuds", title: "Wireless Earbuds", category: "Electronics", subcategory: "Consumer Electronics", country: "China", moq: "1000 pcs", leadTime: "15-30 days", priceRange: "$6-22 / set", shortDescription: "Wireless earbuds for wholesale, private label and retail programs.", productSpecifications: { Bluetooth: "5.x", Packaging: "OEM box option", Battery: "Model dependent" }, imageKey: "electronics" }),
  listing({ id: "seed-usb-c-charging-station", title: "USB-C Charging Station", category: "Electronics", subcategory: "Mobile Accessories", country: "Türkiye", moq: "300 pcs", leadTime: "20-35 days", priceRange: "$12-35 / pc", shortDescription: "Multi-port USB-C charging station for office, retail and hospitality use.", productSpecifications: { Ports: "Multi-port", Power: "Configurable", Safety: "Supplier document required" }, imageKey: "electronics" }),
  listing({ id: "seed-premium-cotton-tshirt", title: "Premium Cotton T-Shirt", category: "Textile", subcategory: "T-Shirts", country: "Türkiye", moq: "500 pcs", leadTime: "20-35 days", priceRange: "$2.8-5.9 / pc", shortDescription: "Premium cotton T-shirt listing for wholesale and private label apparel programs.", productSpecifications: { Fabric: "Cotton", Sizes: "S-XXL", Branding: "Private label available" }, imageKey: "textile" }),
  listing({ id: "seed-workwear-uniform", title: "Workwear Uniform", category: "Textile", subcategory: "Workwear", country: "Türkiye", moq: "300 sets", leadTime: "25-40 days", priceRange: "$8-22 / set", shortDescription: "Workwear uniforms for industrial teams, facilities and service operations.", productSpecifications: { Fabric: "Poly-cotton options", Branding: "Logo embroidery", Use: "Industrial / service" }, imageKey: "textile" }),
  listing({ id: "seed-sportswear-collection", title: "Sportswear Collection", category: "Apparel", subcategory: "Sportswear", country: "Türkiye", moq: "400 pcs", leadTime: "25-45 days", priceRange: "$7-28 / pc", shortDescription: "Sportswear collection for activewear brands and retail sourcing teams.", productSpecifications: { Fabric: "Performance knit", Branding: "OEM option", Items: "Tops, leggings, sets" }, imageKey: "textile" }),
  listing({ id: "seed-luxury-hoodie", title: "Luxury Hoodie", category: "Apparel", subcategory: "Hoodies", country: "Türkiye", moq: "300 pcs", leadTime: "20-35 days", priceRange: "$9-34 / pc", shortDescription: "Premium hoodie listing for streetwear and private label collections.", productSpecifications: { Fabric: "Heavy cotton fleece", Fit: "Regular / oversized", Branding: "Embroidery / print" }, imageKey: "textile" }),
  listing({ id: "seed-brake-disc-set", title: "Brake Disc Set", category: "Automotive Parts", subcategory: "Brake System", country: "Türkiye", moq: "200 sets", leadTime: "25-45 days", priceRange: "$12-55 / set", shortDescription: "Brake disc set listing for aftermarket distributors and fleet procurement.", productSpecifications: { Material: "Cast iron", Fitment: "Model dependent", Packaging: "Neutral / brand box" }, imageKey: "automotive" }),
  listing({ id: "seed-led-headlight-kit", title: "LED Headlight Kit", category: "Automotive Parts", subcategory: "Lighting", country: "China", moq: "500 kits", leadTime: "18-30 days", priceRange: "$8-40 / kit", shortDescription: "LED headlight kit for automotive accessory distributors.", productSpecifications: { Type: "LED", Voltage: "12V", Fitment: "Model dependent" }, imageKey: "automotive" }),
  listing({ id: "seed-4x4-recovery-winch", title: "4x4 Recovery Winch", category: "Automotive Parts", subcategory: "Off-road Equipment", country: "Türkiye", moq: "50 pcs", leadTime: "30-50 days", priceRange: "$120-650 / pc", shortDescription: "Recovery winch listing for 4x4, off-road and utility vehicle channels.", productSpecifications: { Capacity: "Configurable", Voltage: "12V / 24V", Use: "Off-road recovery" }, imageKey: "automotive" }),
  listing({ id: "seed-heavy-duty-suspension-kit", title: "Heavy Duty Suspension Kit", category: "Automotive Parts", subcategory: "Suspension", country: "Türkiye", moq: "50 kits", leadTime: "35-55 days", priceRange: "$180-900 / kit", shortDescription: "Heavy duty suspension kit for utility, off-road and fleet vehicles.", productSpecifications: { Use: "Commercial / off-road", Fitment: "Vehicle dependent", Packaging: "Export carton" }, imageKey: "automotive" }),
  listing({ id: "seed-cnc-router-machine", title: "CNC Router Machine", category: "Machinery", subcategory: "CNC Equipment", country: "Türkiye", moq: "1 set", leadTime: "45-75 days", priceRange: "$4500-22000 / set", shortDescription: "CNC router machine for wood, plastic, composite and light industrial processing.", productSpecifications: { WorkArea: "Configurable", Control: "CNC controller", Training: "Supplier dependent" }, imageKey: "machinery" }),
  listing({ id: "seed-fiber-laser-cutting-machine", title: "Fiber Laser Cutting Machine", category: "Machinery", subcategory: "Laser Cutting", country: "Türkiye", moq: "1 set", leadTime: "60-100 days", priceRange: "$9000-75000 / set", shortDescription: "Fiber laser cutting machine listing for metal fabrication and industrial production.", productSpecifications: { Power: "Configurable", Material: "Metal sheet", Service: "Installation support required" }, imageKey: "machinery", sponsored: true }),
  listing({ id: "seed-industrial-packaging-line", title: "Industrial Packaging Line", category: "Machinery", subcategory: "Packaging Machinery", country: "Türkiye", moq: "1 line", leadTime: "75-140 days", priceRange: "$12000-180000 / line", shortDescription: "Industrial packaging line for food, consumer goods and manufacturing operations.", productSpecifications: { Automation: "Semi / automatic", Output: "Project dependent", Integration: "Factory layout required" }, imageKey: "machinery" }),
  listing({ id: "seed-automatic-labeling-machine", title: "Automatic Labeling Machine", category: "Machinery", subcategory: "Labeling Machines", country: "Türkiye", moq: "1 set", leadTime: "35-70 days", priceRange: "$2800-25000 / set", shortDescription: "Automatic labeling machine for bottles, boxes and packaged goods.", productSpecifications: { Speed: "Configurable", Containers: "Bottle / box / pouch", Control: "PLC option" }, imageKey: "machinery" }),
  listing({ id: "seed-industrial-pumps", title: "Industrial Process Pump", category: "Industrial Equipment", subcategory: "Pumps", country: "Türkiye", moq: "10 pcs", leadTime: "30-55 days", priceRange: "$180-1400 / pc", shortDescription: "Industrial process pump for manufacturing, water systems and facility operations.", productSpecifications: { Material: "Stainless / cast options", Flow: "Project dependent", Use: "Industrial process" }, imageKey: "machinery" }),
  listing({ id: "seed-corrugated-shipping-boxes", title: "Corrugated Shipping Boxes", category: "Packaging", subcategory: "Corrugated Boxes", country: "Türkiye", moq: "5000 pcs", leadTime: "12-22 days", priceRange: "$0.08-0.42 / pc", shortDescription: "Corrugated box listing for e-commerce, export and industrial packaging.", productSpecifications: { Board: "Single / double wall", Print: "Flexo option", Use: "Shipping packaging" }, imageKey: "packaging" }),
  listing({ id: "seed-custom-printed-labels", title: "Custom Printed Labels", category: "Printing", subcategory: "Labels", country: "Türkiye", moq: "10000 pcs", leadTime: "10-20 days", priceRange: "$0.01-0.08 / pc", shortDescription: "Custom printed label listing for food, cosmetics, retail and logistics packaging.", productSpecifications: { Material: "Paper / PP / PET", Print: "Digital / flexo", Finish: "Matte / gloss" }, imageKey: "packaging" }),
  listing({ id: "seed-greenhouse-irrigation-kit", title: "Greenhouse Irrigation Kit", category: "Agriculture", subcategory: "Irrigation", country: "Türkiye", moq: "100 kits", leadTime: "20-35 days", priceRange: "$18-85 / kit", shortDescription: "Greenhouse irrigation kit for agricultural projects and regional distributors.", productSpecifications: { System: "Drip irrigation", Application: "Greenhouse", Components: "Pipe, connectors, emitters" }, imageKey: "agriculture" }),
  listing({ id: "seed-food-processing-mixer", title: "Food Processing Mixer", category: "Food Processing", subcategory: "Processing Equipment", country: "Türkiye", moq: "1 set", leadTime: "35-60 days", priceRange: "$1800-18000 / set", shortDescription: "Food processing mixer for bakery, sauce, dairy and packaged food facilities.", productSpecifications: { Material: "Food-grade stainless steel", Capacity: "Configurable", Compliance: "Documents required by buyer market" }, imageKey: "machinery" }),
  listing({ id: "seed-patient-monitor", title: "Patient Monitor", category: "Medical Equipment", subcategory: "Monitoring Equipment", country: "Türkiye", moq: "10 pcs", leadTime: "25-45 days", priceRange: "$220-980 / pc", shortDescription: "Medical equipment seed listing with compliance review required before trade.", productSpecifications: { Use: "Clinical monitoring", Compliance: "Market authorization required", Note: "No certification claim in seed data" }, imageKey: "medical" }),
  listing({ id: "seed-professional-salon-device", title: "Professional Salon Device", category: "Beauty & Personal Care", subcategory: "Salon Equipment", country: "Türkiye", moq: "20 pcs", leadTime: "20-40 days", priceRange: "$90-650 / pc", shortDescription: "Professional salon device listing for beauty distributors and commercial buyers.", productSpecifications: { Use: "Salon treatment", Voltage: "Market dependent", Documentation: "Supplier documents required" }, imageKey: "beauty" }),
  listing({ id: "seed-safe-industrial-cleaner", title: "Industrial Cleaning Chemical", category: "Industrial Chemicals", subcategory: "Industrial Cleaners", country: "Türkiye", moq: "1000 L", leadTime: "20-35 days", priceRange: "$1.2-4.8 / L", shortDescription: "Safe, compliant industrial cleaner category seed listing with documentation review required.", productSpecifications: { Category: "Industrial cleaner", Documents: "SDS required", Restriction: "Compliance-gated trade category" }, imageKey: "chemicals" }),
  listing({ id: "seed-sea-freight-turkiye-europe", title: "Sea Freight Türkiye to Europe", category: "Logistics Services", subcategory: "Sea Freight", country: "Türkiye", moq: "1 container", leadTime: "Transit: 7-18 days", priceRange: "Quote based", shortDescription: "Sea freight lead listing for container shipments from Türkiye to European ports.", productSpecifications: { Coverage: "Türkiye to Europe", Mode: "FCL / LCL", Action: "Quote request" }, imageKey: "logistics" }),
  listing({ id: "seed-air-freight-turkiye-usa", title: "Air Freight Türkiye to USA", category: "Logistics Services", subcategory: "Air Freight", country: "Türkiye", moq: "45 kg", leadTime: "Transit: 2-6 days", priceRange: "Quote based", shortDescription: "Air freight lead listing for urgent cargo from Türkiye to the United States.", productSpecifications: { Coverage: "Türkiye to USA", Mode: "Air cargo", Action: "Quote request" }, imageKey: "logistics" }),
  listing({ id: "seed-road-freight-turkiye-germany", title: "Road Freight Türkiye to Germany", category: "Logistics Services", subcategory: "Road Freight", country: "Türkiye", moq: "1 pallet", leadTime: "Transit: 4-9 days", priceRange: "Quote based", shortDescription: "Road freight lead listing for pallet, partial and full truck loads to Germany.", productSpecifications: { Coverage: "Türkiye to Germany", Mode: "FTL / LTL", Action: "Quote request" }, imageKey: "logistics" }),
  listing({ id: "seed-warehouse-fulfillment-services", title: "Warehouse Fulfillment Services", category: "Logistics Services", subcategory: "Warehousing", country: "Türkiye", moq: "Project based", leadTime: "Setup: 7-21 days", priceRange: "Quote based", shortDescription: "Warehousing and fulfillment service listing for B2B storage and dispatch operations.", productSpecifications: { Coverage: "Türkiye", Services: "Storage, pick-pack, dispatch", Action: "Quote request" }, imageKey: "logistics" }),
  listing({ id: "seed-export-customs-clearance", title: "Export Customs Clearance", category: "Customs Services", subcategory: "Export Customs", country: "Türkiye", moq: "1 shipment", leadTime: "1-3 business days", priceRange: "Consultation based", shortDescription: "Export customs clearance service listing for Türkiye-origin shipments.", productSpecifications: { Coverage: "Türkiye export", Experience: "Provider supplied", Action: "Request consultation" }, imageKey: "documents" }),
  listing({ id: "seed-import-customs-clearance", title: "Import Customs Clearance", category: "Customs Services", subcategory: "Import Customs", country: "Türkiye", moq: "1 shipment", leadTime: "1-5 business days", priceRange: "Consultation based", shortDescription: "Import customs clearance lead listing for compliant shipment documentation.", productSpecifications: { Coverage: "Türkiye import", Documents: "Shipment dependent", Action: "Request consultation" }, imageKey: "documents" }),
  listing({ id: "seed-hs-code-consulting", title: "HS Code Consulting", category: "Customs Services", subcategory: "HS Code Consulting", country: "Türkiye", moq: "1 product family", leadTime: "2-7 business days", priceRange: "Consultation based", shortDescription: "HS code consulting service listing for product classification preparation.", productSpecifications: { Coverage: "Multi-country advisory", Output: "Classification guidance", Action: "Request consultation" }, imageKey: "documents" }),
  listing({ id: "seed-trade-compliance-support", title: "Trade Compliance Support", category: "Customs Services", subcategory: "Trade Compliance", country: "Türkiye", moq: "Project based", leadTime: "5-15 business days", priceRange: "Consultation based", shortDescription: "Trade compliance support listing for documentation, requirements and import/export workflows.", productSpecifications: { Coverage: "Market dependent", Scope: "Documents and requirements", Action: "Request consultation" }, imageKey: "documents" })
];
