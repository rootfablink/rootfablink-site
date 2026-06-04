export type MarketplaceSeedListing = {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  country: string;
  supplierName: string;
  supplierType: string;
  priceRange: string;
  moq: string;
  unit: string;
  leadTime: string;
  shortDescription: string;
  mainImage: string;
  galleryImages: string[];
  specifications: Record<string, string>;
  productSpecifications: Record<string, string>;
  capabilities: string[];
  tags: string[];
  tradeTerms: string[];
  source: "marketplace_seed_data";
  visible: true;
  verified: false;
  rating: null;
  reviewCount: 0;
  review_count: 0;
  sponsored?: boolean;
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
  "RootFabLink Marketplace Supplier",
  "Manufacturer-ready profile",
  "Trade workflow ready supplier",
  "Export-ready catalog profile"
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function imageUrl(query: string, categoryIndex: number, productIndex: number, imageIndex: number) {
  const lock = 41000 + categoryIndex * 100 + productIndex * 10 + imageIndex;
  return `https://loremflickr.com/1200/900/${encodeURIComponent(query)}?lock=${lock}`;
}

function makeListing(category: CategoryTemplate, categoryIndex: number, product: ProductTemplate, productIndex: number): MarketplaceSeedListing {
  const id = `seed-${slugify(category.category)}-${String(productIndex + 1).padStart(3, "0")}`;
  const slug = slugify(product.title);
  const galleryImages = [0, 1, 2].map((imageIndex) => imageUrl(category.imageQuery, categoryIndex, productIndex, imageIndex));
  const specifications = {
    ...product.specs,
    usage: product.specs.usage ?? category.descriptionFocus,
    customization: product.specs.customization ?? "Available on RFQ"
  };

  return {
    id,
    slug,
    title: product.title,
    category: category.category,
    subcategory: product.subcategory,
    country: category.country,
    supplierName: supplierNames[(categoryIndex + productIndex) % supplierNames.length] ?? "RootFabLink Marketplace Supplier",
    supplierType: category.supplierType,
    priceRange: product.priceRange,
    moq: product.moq,
    unit: product.unit,
    leadTime: product.leadTime,
    shortDescription: `${product.title} prepared for B2B sourcing, RFQ comparison and ${category.descriptionFocus.toLowerCase()}.`,
    mainImage: galleryImages[0] ?? imageUrl(category.imageQuery, categoryIndex, productIndex, 0),
    galleryImages,
    specifications,
    productSpecifications: specifications,
    capabilities,
    tags: product.tags,
    tradeTerms,
    source: "marketplace_seed_data",
    visible: true,
    verified: false,
    rating: null,
    reviewCount: 0,
    review_count: 0,
    sponsored: productIndex === 0 || productIndex === 5
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

const allCategoryTemplates: CategoryTemplate[] = [
  ...categoryTemplates,
  ...additionalCategories.map((category) => ({
    category: category.category,
    country: category.country,
    supplierType: category.supplierType,
    imageQuery: category.imageQuery,
    descriptionFocus: category.descriptionFocus,
    products: category.productNames.map((name, index) => productFromName(name, category, index))
  }))
];

export const marketplaceCategories = allCategoryTemplates.map((category) => ({
  name: category.category,
  slug: slugify(category.category),
  productCount: category.products.length
}));

export const marketplaceSeedListings: MarketplaceSeedListing[] = allCategoryTemplates.flatMap((category, categoryIndex) =>
  category.products.map((product, productIndex) => makeListing(category, categoryIndex, product, productIndex))
);
