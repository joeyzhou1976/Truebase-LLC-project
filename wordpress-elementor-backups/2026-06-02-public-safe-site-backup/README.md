# TrueBase public-safe site backup

Date: 2026-06-02

This directory contains a public-safe backup snapshot for `https://truebaseholding.com`.

## Included

- Public WordPress REST export:
  - pages
  - posts
  - media metadata
  - public user endpoint snapshot
- Public security probes:
  - homepage response headers
  - `xmlrpc.php` GET behavior
  - `wp-content/uploads/` directory-index status
  - `wp-content/plugins/` directory-index status
  - `wp-content/themes/` directory-index status
- Admin audit summary from the 2026-06-02 safety check:
  - active plugin count
  - plugin update list
  - public REST user exposure
  - SMTP status summary

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
