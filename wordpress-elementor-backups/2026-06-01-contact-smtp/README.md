# TrueBase contact form and SMTP backup

Date: 2026-06-01

This backup captures the WordPress contact-form repair and SMTP delivery setup used on the live TrueBase site.

## Live site changes

- Replaced browser `mailto:` form posting with WordPress/Jetpack server-side contact forms on:
  - `/truebase-contact/`
  - `/truebase-request-samples-quote/`
  - `/truebase-request-catalog/`
  - `/truebase-become-a-partner/`
- Added HTTPS/Ajax form submission handling so visitors stay on the page and avoid Chrome's insecure-form warning.
- Restyled form submit controls so submit buttons have visible borders/backgrounds.
- Fixed the Contact hero actions:
  - `Email Us` targets `#tb-contact-form`
  - `Partner Application` links to `/truebase-become-a-partner/`
- Updated Jetpack form recipients to:
  - `partner@truebaseholding.com`
  - `joeyzhou1976@gmail.com`
- Installed and activated `WP Mail SMTP`.
- Configured SMTP delivery with Zoho:
  - Host: `smtppro.zoho.com`
  - Port: `465`
  - Encryption: `SSL`
  - From email: `partner@truebaseholding.com`
  - From name: `TrueBase`

## Verification

- WP Mail SMTP test returned: `Test HTML email was sent successfully`.
- Website sample/quote form returned: `contact-form-sent=490`.
- The recipient confirmed that email was received.

## Security note

SMTP passwords and app passwords are intentionally not stored in this backup. The temporary scripts that contained credentials were deleted before this backup was created.

## Included scripts

- `fix_truebase_mailto_forms_payload.js`: converts legacy mailto forms to server-side Jetpack forms and improves submit styling.
- `fix_contact_buttons_and_email_recipients_payload.js`: fixes Contact page buttons and Jetpack recipients.
- `install_wp_mail_smtp_payload.js`: installs and activates WP Mail SMTP.
- `send_wp_mail_smtp_test_payload.js`: sends a sanitized SMTP test email.
- `test_truebase_sample_form_submit_payload.js`: submits a safe sample/quote test request.
- `check_*` and `inspect_*` scripts: verification helpers used against the live WordPress admin session.
