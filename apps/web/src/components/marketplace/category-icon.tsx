import { Box, Car, Footprints, Grid2X2, Laptop, PanelsTopLeft, Phone, Shirt, Smartphone, Sparkles, SunMedium } from "lucide-react";
import type { MarketplaceCategory } from "@/data/categories";

export function CategoryIcon({ icon, size = 20, className = "text-copper" }: { icon: MarketplaceCategory["icon"]; size?: number; className?: string }) {
  const iconMap = {
    shoe: Footprints,
    smartphone: Smartphone,
    scooter: Sparkles,
    phone: Phone,
    laptop: Laptop,
    car: Car,
    shirt: Shirt,
    drone: Sparkles,
    dress: Shirt,
    bottle: Sparkles,
    panel: PanelsTopLeft,
    solar: SunMedium,
    box: Box,
    factory: Grid2X2,
    spark: Sparkles
  } satisfies Record<MarketplaceCategory["icon"], typeof Grid2X2>;

  const Icon = iconMap[icon] ?? Grid2X2;
  return <Icon size={size} className={className} />;
}
