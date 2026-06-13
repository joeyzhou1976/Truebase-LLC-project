# TrueBase site media and hero update backup

Date: 2026-06-13

This directory contains a public-safe backup snapshot for `https://truebaseholding.com` after the site-wide media-slot update and the How It Works hero image replacement.

## Included

- Public-safe WordPress content/config export:
  - `wordpress-public-safe-export.json`
  - `export-summary.json`
- Site-wide media-slot scripts:
  - `scripts/build_truebase_site_media_registry_payload.js`
  - `scripts/truebase_site_media_registry_payload.js`
  - `scripts/inspect_truebase_site_media_registry_payload.js`
- How It Works hero replacement scripts:
  - `scripts/build_replace_how_it_works_hero_payload.js`
  - `scripts/replace_how_it_works_hero_payload.js`
  - `scripts/verify_how_it_works_hero_replacement_payload.js`
- New hero source asset:
  - `assets/how-it-works-hero-craft-hd.png`
  - `assets/how-it-works-hero-craft-hd.jpg`

## Snapshot Summary

- Pages: 14
- Posts: 1
- Media metadata records: 230
- Active plugins detected: 26
- Plugin updates detected: 5

## Key Live Changes

- Added a site-wide `TRUEBASE_SITE_MEDIA_REGISTRY` pattern across the TrueBase pages so registered images and videos can be replaced by slot key.
- Removed the older page-local `TRUEBASE_MEDIA_REGISTRY` pattern from the live pages.
- Replaced the low-resolution How It Works hero image in slot `truebase-how-it-works.hero`.
- New live hero URL:
  - `https://truebaseholding.com/wp-content/uploads/2026/06/truebase-how-it-works-hero-craft-hd-20260613.jpg`

## Not Included

The GitHub repository is public, so this backup intentionally does **not** include:

- full SQL database dumps
- password hashes
- SMTP passwords or app passwords
- private form entries
- customer/order private data
- hosting control panel credentials
- server filesystem archives

For a full private restore-grade backup, use Bluehost/cPanel backup tools or phpMyAdmin and store the archive only in private encrypted storage.
