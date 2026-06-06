# TrueBase public-safe site backup

Date: 2026-06-06

This directory contains a public-safe backup snapshot for `https://truebaseholding.com`.

## Included

- Public WordPress REST export:
  - pages
  - posts
  - media metadata
- Public WordPress route/type metadata
- Admin-visible site summary captured through the logged-in browser:
  - active plugin count
  - plugin update count
  - theme/update/site-health text samples
  - WP Mail SMTP configured-status signal
- Public security probes:
  - `xmlrpc.php` GET behavior
  - `wp-content/uploads/` directory-index status
  - `wp-content/plugins/` directory-index status
  - `wp-content/themes/` directory-index status

## Snapshot Summary

- Pages: 14
- Posts: 1
- Media metadata records: 229
- Active plugins detected: 22
- Plugin updates detected: 1

## Not Included

The GitHub repository is public, so this backup intentionally does **not** include:

- full SQL database dump
- password hashes
- SMTP passwords or app passwords
- private form entries
- customer/order private data
- hosting control panel credentials
- server filesystem archives

## Full Private Backup Recommendation

For a full website and database backup, use Bluehost/cPanel backup tools or phpMyAdmin and store the archive in private storage only, such as:

- Bluehost Backup / Site Backup Pro
- cPanel Backup
- phpMyAdmin SQL export
- private encrypted cloud storage

Do not upload a full SQL dump to this public GitHub repository.
