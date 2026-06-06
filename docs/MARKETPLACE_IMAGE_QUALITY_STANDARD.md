# Rootfablink Marketplace Image Quality Standard

Rootfablink marketplace listings must look like serious B2B product catalog entries. Seed listings are internal marketplace structure data and must never create fake trust claims.

## Accepted Image Rules

- The image must clearly represent the product or service title.
- Product cards must not show broken image icons.
- Remote images may be used only when they are safe, stable and product-specific.
- If a matching real image is unavailable, use a product-specific generated SVG fallback.
- Alt text must describe the actual product visual.
- The visual must not imply certification, verified status, stock availability, order history or a real supplier identity.

## Rejected Image Examples

- Generic factory photo for a CNC router listing.
- Truck image for sea freight when a container ship or port visual is needed.
- Random living room photo for a marble wall panel listing.
- Whole car exterior for a brake disc listing.
- Abstract gradient, logo-only image or generic icon for product listings.

## Category Requirements

- Wall panels: panels, surface textures or installed wall panel systems.
- Solar: solar modules, inverter, battery or mounting equipment.
- Machinery: the actual machine family such as CNC, laser, filling or labeling equipment.
- Packaging: boxes, bottles, labels, pouches or cartons.
- Textile: fabric rolls, textile surfaces or textile production materials.
- Apparel: garments, uniforms, workwear or sportswear.
- Automotive: brake discs, headlights, filters, mats, winches or suspension parts.
- Logistics: ships, containers, trucks, cargo handling or warehouses according to service.
- Customs: trade documents, paperwork, compliance and document review visuals.
- Medical: equipment silhouettes or clinical device visuals without medical claims.

## Fallback Rules

The `MarketplaceImage` component must render a product-specific SVG fallback when `src` fails. Fallbacks are selected by `visualCategory`, such as `wall_panel`, `solar_panel`, `cnc_machine`, `packaging_box`, `textile_roll`, `brake_disc`, `container_ship`, `freight_truck`, `customs_documents`, `medical_device`, `hvac_unit` and `water_filter`.

## QA Checklist

1. Does the image show the exact product type?
2. Would a buyer understand the listing from the image alone?
3. Is the image category-correct?
4. Does it avoid fake branding?
5. Is the image clean and professional?
6. Is there no broken image?
7. Does alt text match the image?
8. Does the image avoid fake certification, rating or supplier status?
