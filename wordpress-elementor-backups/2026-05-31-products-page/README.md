# TrueBase Products Page Backup - 2026-05-31

This folder backs up the latest TrueBase products page update for:

https://truebaseholding.com/truebase-products/

## Included files

- `build_truebase_products_category_integrated_payload.js` - source builder for the category-integrated WordPress page payload.
- `truebase_products_category_integrated_payload.js` - generated WordPress REST payload used to publish the page.
- `check_truebase_category_integrated_live_payload.js` - live DOM/SEO/image validation script.
- `prime_truebase_images_payload.js` - helper script to force lazy images to load before checks.
- `run_chrome_payload.applescript` - Chrome execution wrapper for payload scripts.
- `truebase-product-image-assets/` - product page source images, scene images, white-background detail images, and generated assets.

## Published page state

- 8 product categories.
- No `New product supplements` or attachment supplement section.
- Detail gallery counts verified on the live page:
  - Wooden Memory & Keepsake Boxes: 3 images.
  - Ashes & Paw Print Jewelry: 2 images.
  - Glass Art Keepsakes: 5 images.
  - Garden Stones & Grave Markers: 1 image.
- No broken images in the final live check.
- SEO title, meta description, canonical URL, and 8 Product JSON-LD entities retained.

