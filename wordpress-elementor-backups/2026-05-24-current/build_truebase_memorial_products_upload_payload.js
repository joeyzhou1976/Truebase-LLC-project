const fs = require('fs');
const path = require('path');

const root = '/Users/joeyzhou/Documents/New project';
const imageDir = path.join(root, 'truebase-homepage/assets/images');
const outFile = path.join(root, 'truebase_memorial_products_upload_payload.js');
const base = 'https://truebaseholding.com';
const productsPageId = 86;

const imageFiles = {
  hero: ['hero-store.jpg', 'TrueBase premium memorial product retail display'],
  urns: ['product-urns.jpg', 'TrueBase ceramic pet urn collection'],
  boxes: ['product-keepsake.jpg', 'TrueBase wooden memory keepsake box'],
  jewelry: ['catalog-jewelry.jpg', 'TrueBase pet ashes and paw print memorial jewelry'],
  frames: ['product-frames.jpg', 'TrueBase memorial photo frame and canvas display'],
  glass: ['catalog-glass-art.jpg', 'TrueBase glass art memorial keepsake'],
  engraved: ['product-engraved.jpg', 'TrueBase engraved wooden memorial set'],
  garden: ['catalog-garden-stone.jpg', 'TrueBase garden memorial stone marker'],
  candle: ['catalog-candle.jpg', 'TrueBase remembrance candle and sympathy set'],
  craft: ['hero-craft.jpg', 'TrueBase custom engraving and product finishing process']
};

const images = Object.fromEntries(Object.entries(imageFiles).map(([key, [file, alt]]) => [
  key,
  {
    key,
    file,
    title: `TrueBase Memorial ${key}`,
    alt,
    mime: 'image/jpeg',
    base64: fs.readFileSync(path.join(imageDir, file)).toString('base64')
  }
]));

const products = [
  {
    key: 'urns',
    title: 'Signature Ceramic Pet Urns',
    eyebrow: 'Best seller / Made to order',
    desc: 'Premium ceramic and stone-look urns for clinics, funeral homes, and boutique retail displays. A calm, home-decor-friendly tribute for families who want a refined memorial object.',
    features: ['Engraved nameplate, paw motif, or date line', 'Matte, glazed, marble, and stone-inspired finishes', 'Optional gift box and sympathy card packaging'],
    channels: 'Veterinary clinics, pet funeral services, boutique pet retail'
  },
  {
    key: 'boxes',
    title: 'Wooden Memory & Keepsake Boxes',
    eyebrow: 'Private label ready',
    desc: 'Luxury wood boxes designed for collars, fur clippings, photos, tags, and small memorial items. Strong fit for aftercare packages and retail add-ons.',
    features: ['Laser engraving for pet name, dates, and short message', 'Velvet insert, photo slot, or compartment layout', 'OEM logo plaque and branded outer sleeve'],
    channels: 'Aftercare bundles, gift retail, OEM programs'
  },
  {
    key: 'jewelry',
    title: 'Ashes & Paw Print Jewelry',
    eyebrow: 'Top memorial gift category',
    desc: 'Wearable keepsakes including pendants, bracelets, rings, and keychain urns. Designed for families who want a small, personal memorial close at hand.',
    features: ['Stainless steel, silver-tone, gold-tone, or plated options', 'Sealed chamber, paw print, name, and birthstone details', 'Premium pouch, care card, and display tray available'],
    channels: 'Premium upsell, online memorial gifts, clinic aftercare'
  },
  {
    key: 'frames',
    title: 'Memorial Photo Frames',
    eyebrow: 'Clinic aftercare favorite',
    desc: 'Elegant tabletop frames and shadow-box style displays for photos, collars, paw prints, and small keepsakes. Built for compassionate clinic handoff programs.',
    features: ['Photo, collar, tag, and paw-impression layouts', 'Wood, acrylic, metal accent, and linen finishes', 'Custom insert cards for veterinary partners'],
    channels: 'Veterinary clinics, funeral service providers, retail displays'
  },
  {
    key: 'glass',
    title: 'Glass Art Keepsakes',
    eyebrow: 'Premium upgrade',
    desc: 'Decorative glass-inspired memorial pieces positioned as high-end upgrades for families seeking a display object rather than a traditional urn.',
    features: ['Orb, heart, touchstone, and desktop-object formats', 'Opal, pearl, smoke, and soft color stories', 'Certificate card and presentation box supported'],
    channels: 'Premium memorial packages, online gifts, boutique retail'
  },
  {
    key: 'engraved',
    title: 'Engraved Memorial Sets',
    eyebrow: 'Custom engraved',
    desc: 'Coordinated sets that combine a keepsake box, mini urn, photo card, and personalized engraving for a polished, premium package experience.',
    features: ['Bundle-friendly for funeral service providers', 'Name, date, quote, icon, and pattern engraving', 'Low-MOQ branded packaging for partners'],
    channels: 'Funeral service packages, OEM collections, sample kits'
  },
  {
    key: 'garden',
    title: 'Garden Stones & Grave Markers',
    eyebrow: 'Outdoor memorial',
    desc: 'Outdoor memorial markers for gardens, burial areas, and home landscapes. A popular personalized category for pet loss gifts and aftercare catalogs.',
    features: ['Granite-look, slate-look, river-stone, or plaque formats', 'Weather-resistant engraving and silhouette options', 'Retail counter samples and catalog cards available'],
    channels: 'Garden retail, burial services, home memorial gifts'
  },
  {
    key: 'candle',
    title: 'Remembrance Candles & Gift Sets',
    eyebrow: 'Sympathy add-on',
    desc: 'Thoughtful sympathy products that pair well with urns, frames, and keepsake boxes. Useful for clinics and retailers building tiered memorial bundles.',
    features: ['Candle, card, mini frame, charm, or token combinations', 'Custom scent label and TrueBase partner packaging', 'Designed for giftable, condolence-focused presentation'],
    channels: 'Clinic condolences, gift bundles, retail add-ons'
  }
];

function esc(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[ch]);
}

function featureList(items) {
  return '<ul>' + items.map(item => '<li>' + esc(item) + '</li>').join('') + '</ul>';
}

const css = `<style>
.tb-page{font-family:Inter,Arial,sans-serif;color:#25282d;background:#f7f4ef}.tb-page *{box-sizing:border-box}.tb-wrap{max-width:1200px;margin:0 auto;padding:0 24px}.tb-header{background:#fff;border-bottom:1px solid #ebe2d6;position:sticky;top:0;z-index:10}.tb-header .tb-wrap{min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:28px}.tb-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:#202226;font-weight:900;font-size:24px}.tb-logo img{width:58px;height:44px;object-fit:contain}.tb-nav{display:flex;align-items:center;gap:30px;white-space:nowrap}.tb-nav a{color:#5d5f63;text-decoration:none;font-weight:800;font-size:14px}.tb-nav a.active,.tb-nav a:hover{color:#111}.tb-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:6px;background:#c6a77c;color:#101010!important;text-decoration:none;font-weight:900;border:1px solid #c6a77c;white-space:nowrap}.tb-btn-outline{background:transparent;color:#27292c!important;border-color:#d8cab8}.tb-hero{background:#fff;padding:86px 0;border-bottom:1px solid #eee4d8}.tb-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,520px);gap:58px;align-items:center}.tb-label,.tb-tag{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:900;color:#a07849;margin:0 0 14px}.tb-hero h1{font-size:58px;line-height:1.03;margin:0 0 22px;color:#24272d}.tb-hero p,.tb-head p,.tb-card p,.tb-product p,.tb-product li,.tb-note p{font-size:16px;line-height:1.72;color:#656a72}.tb-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}.tb-media{position:relative;overflow:hidden;border-radius:8px;background:#f0e7dc;aspect-ratio:4/3}.tb-media img,.tb-product-media img{width:100%;height:100%;object-fit:cover;display:block}.tb-mark{position:absolute;left:18px;bottom:18px;z-index:1;padding:9px 13px;border:1px solid rgba(255,255,255,.42);border-radius:6px;background:rgba(17,17,17,.62);color:#fff;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(10px)}.tb-section{padding:78px 0}.tb-white{background:#fff}.tb-cream{background:#f7f4ef}.tb-head{max-width:780px;margin-bottom:34px}.tb-head h2{font-size:38px;line-height:1.13;margin:0 0 14px;color:#282b30}.tb-card-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.tb-card{display:block;background:#fff;border:1px solid #eadfd2;border-radius:8px;padding:22px;text-decoration:none;color:inherit}.tb-card h3{font-size:20px;line-height:1.18;margin:0 0 10px;color:#222}.tb-card p{font-size:14px;margin:0}.tb-pill{display:inline-flex;margin-bottom:12px;padding:7px 10px;border-radius:999px;background:#efe3d4;color:#7b5a35;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.tb-product-list{display:grid;gap:24px}.tb-product{display:grid;grid-template-columns:minmax(260px,.86fr) minmax(0,1fr);overflow:hidden;border:1px solid #eadfd2;border-radius:8px;background:#fff}.tb-product:nth-child(even){background:#fdfbf8}.tb-product-media{position:relative;min-height:430px;background:#eee8df}.tb-product-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,17,17,0) 52%,rgba(17,17,17,.36));pointer-events:none}.tb-product-copy{padding:34px;display:flex;flex-direction:column;gap:14px}.tb-product h3{font-size:30px;line-height:1.1;margin:0;color:#24272d}.tb-product p,.tb-product ul{margin:0}.tb-product ul{padding-left:19px}.tb-channel{margin-top:4px;padding-top:14px;border-top:1px solid #eee4d8;color:#555b63;font-size:14px;line-height:1.6}.tb-two{display:grid;grid-template-columns:1fr 1fr;gap:24px}.tb-note{background:#252529;color:#fff;padding:48px 0;text-align:center}.tb-note h2{font-size:36px;margin:0 0 10px}.tb-note p{color:#ece7df;margin:0 auto;max-width:720px}.tb-footer{background:#252529;color:#fff;padding:40px 0}.tb-footer p{color:#d8d4cf}.tb-bottom{border-top:1px solid rgba(255,255,255,.12);margin-top:28px;padding-top:18px;color:#c9c3bb;font-size:13px}@media(max-width:980px){.tb-header .tb-wrap{align-items:flex-start;flex-direction:column;padding-top:18px;padding-bottom:18px}.tb-nav{gap:16px;flex-wrap:wrap}.tb-hero-grid,.tb-product,.tb-two{grid-template-columns:1fr}.tb-card-grid{grid-template-columns:1fr 1fr}.tb-hero h1{font-size:42px}.tb-product-media{min-height:360px}}@media(max-width:620px){.tb-wrap{padding:0 18px}.tb-hero,.tb-section{padding:58px 0}.tb-hero h1{font-size:34px}.tb-head h2{font-size:30px}.tb-card-grid{grid-template-columns:1fr}.tb-product-copy{padding:26px 22px}.tb-product-media{min-height:300px}.tb-actions,.tb-btn{width:100%}}
</style>`;

const payload = `(() => {
  const base = ${JSON.stringify(base)};
  const productsPageId = ${productsPageId};
  const images = ${JSON.stringify(images)};
  const products = ${JSON.stringify(products)};
  const css = ${JSON.stringify(css)};
  const media = {};
  const errors = [];

  function esc(str) {
    return String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  }
  function featureList(items) {
    return '<ul>' + items.map(item => '<li>' + esc(item) + '</li>').join('') + '</ul>';
  }
  function request(method, url, body, headers = {}) {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    for (const [k, v] of Object.entries(headers)) x.setRequestHeader(k, v);
    x.send(body === undefined ? null : body);
    let json = null;
    try { json = JSON.parse(x.responseText); } catch (_) {}
    return { ok: x.status >= 200 && x.status < 300, status: x.status, text: x.responseText, json };
  }
  function getNonce() {
    if (typeof wpApiSettings !== "undefined" && wpApiSettings.nonce) return wpApiSettings.nonce;
    const admin = request("GET", base + "/wp-admin/post-new.php?post_type=page");
    const html = admin.text || "";
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\\s*[:=]\\s*["']([a-f0-9]+)["']/i, /"nonce":"([a-f0-9]+)"/i, /rest_nonce["']?\\s*[:=]\\s*["']([a-f0-9]+)["']/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error("Could not find WordPress REST nonce. Admin status " + admin.status);
  }
  const nonce = getNonce();
  function uploadImage(item) {
    const search = request("GET", base + "/wp-json/wp/v2/media?search=" + encodeURIComponent(item.title) + "&per_page=20", undefined, {"X-WP-Nonce": nonce});
    const found = search.json && search.json.find(m => ((m.title && m.title.rendered) || "").includes(item.title));
    if (found) {
      media[item.key] = { id: found.id, url: found.source_url };
      return;
    }
    const binary = atob(item.base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const res = request("POST", base + "/wp-json/wp/v2/media", bytes, {
      "X-WP-Nonce": nonce,
      "Content-Type": item.mime,
      "Content-Disposition": 'attachment; filename="' + item.file + '"'
    });
    if (!res.ok) {
      errors.push("Upload " + item.key + ": " + res.status + " " + res.text.slice(0, 240));
      return;
    }
    request("POST", base + "/wp-json/wp/v2/media/" + res.json.id, JSON.stringify({
      title: item.title,
      alt_text: item.alt,
      caption: item.alt,
      description: item.alt
    }), {
      "X-WP-Nonce": nonce,
      "Content-Type": "application/json"
    });
    media[item.key] = { id: res.json.id, url: res.json.source_url };
  }
  Object.values(images).forEach(uploadImage);
  if (errors.length) return JSON.stringify({ ok: false, phase: "upload", media, errors }, null, 2);

  function img(key) { return media[key] && media[key].url || ""; }
  const cards = products.map(product =>
    '<a class="tb-card" href="#' + product.key + '"><span class="tb-pill">' + esc(product.eyebrow) + '</span><h3>' + esc(product.title) + '</h3><p>' + esc(product.desc) + '</p></a>'
  ).join('');
  const productSections = products.map(product =>
    '<article id="' + product.key + '" class="tb-product">' +
      '<div class="tb-product-media"><img src="' + img(product.key) + '" alt="TrueBase ' + esc(product.title) + '" loading="lazy"><span class="tb-mark">TrueBase</span></div>' +
      '<div class="tb-product-copy"><span class="tb-tag">' + esc(product.eyebrow) + '</span><h3>' + esc(product.title) + '</h3><p>' + esc(product.desc) + '</p>' + featureList(product.features) + '<div class="tb-channel"><strong>Recommended channels:</strong> ' + esc(product.channels) + '</div></div>' +
    '</article>'
  ).join('');
  const schema = '<script type="application/ld+json">' + JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TrueBase Premium Pet Memorial Product Catalog",
    description: "Premium pet memorial product lines including urns, keepsake boxes, memorial jewelry, frames, glass keepsakes, engraved sets, garden stones, and sympathy candles.",
    url: base + "/truebase-products/",
    mainEntity: products.map(product => ({
      "@type": "Product",
      name: "TrueBase " + product.title,
      brand: { "@type": "Brand", name: "TrueBase" },
      category: product.eyebrow,
      description: product.desc,
      image: img(product.key)
    }))
  }) + '<' + '/script>';
  const header = '<header class="tb-header"><div class="tb-wrap"><a class="tb-logo" href="' + base + '/truebase-home/"><img src="' + base + '/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><nav class="tb-nav"><a class="active" href="' + base + '/truebase-products/">Products</a><a href="' + base + '/truebase-partnership/">Partnership</a><a href="' + base + '/truebase-how-it-works/">How It Works</a><a href="' + base + '/truebase-contact/">Contact</a></nav><a class="tb-btn" href="' + base + '/truebase-become-a-partner/">Become a Partner</a></div></header>';
  const footer = '<footer class="tb-footer"><div class="tb-wrap"><a class="tb-logo" style="color:#fff;margin-bottom:16px" href="' + base + '/truebase-home/"><img src="' + base + '/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><p>Premium memorial solutions for professional partners.</p><div class="tb-bottom">© 2026 TrueBase. All rights reserved.</div></div></footer>';
  const content = css + '<div class="tb-page">' + header + '<main>' +
    '<section class="tb-hero"><div class="tb-wrap tb-hero-grid"><div><span class="tb-label">Products</span><h1>Premium Pet Memorial Product Catalog</h1><p>Explore high-end memorial product lines selected around popular buyer demand: urns, keepsake boxes, ashes jewelry, photo frames, glass art, engraved sets, garden markers, and sympathy gifts. Each line supports TrueBase branding, partner packaging, and customization for professional aftercare programs.</p><div class="tb-actions"><a class="tb-btn" href="' + base + '/truebase-request-catalog/">Request Catalog</a><a class="tb-btn tb-btn-outline" href="' + base + '/truebase-request-samples-quote/">Get Samples / Quote</a></div></div><div class="tb-media"><img src="' + img('hero') + '" alt="TrueBase premium memorial product retail display" loading="eager"><span class="tb-mark">TrueBase</span></div></div></section>' +
    '<section class="tb-section tb-cream"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Category overview</span><h2>Popular memorial categories, refined for premium B2B catalogs</h2><p>This page replaces the previous pet supplies content with TrueBase memorial product lines for pet stores, veterinary clinics, funeral service providers, and private-label partners.</p></div><div class="tb-card-grid">' + cards + '</div></div></section>' +
    '<section class="tb-section tb-white"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Product details</span><h2>Product images, introductions, and customization options</h2><p>Every product line is written for catalog browsing, partner sales conversations, SEO, and future Elementor editing.</p></div><div class="tb-product-list">' + productSections + '</div></div></section>' +
    '<section class="tb-section tb-cream"><div class="tb-wrap tb-two"><div class="tb-card"><span class="tb-label">Branding</span><h2>TrueBase private-label presentation</h2><p>Catalog images use TrueBase brand marks and the copy is written as TrueBase-owned product positioning. We avoid using third-party branded product photos or editing another company logo into a product image.</p></div><div class="tb-media"><img src="' + img('craft') + '" alt="TrueBase custom engraving and product finishing process" loading="lazy"><span class="tb-mark">TrueBase</span></div></div></section>' +
    '<section class="tb-note"><div class="tb-wrap"><h2>Need samples or OEM customization?</h2><p>TrueBase can support product selection, engraving direction, packaging systems, sample kits, and private-label presentation for professional memorial product buyers.</p><div class="tb-actions" style="justify-content:center"><a class="tb-btn" href="' + base + '/truebase-request-samples-quote/">Request Samples / Quote</a><a class="tb-btn tb-btn-outline" style="color:#fff!important;border-color:rgba(255,255,255,.35)" href="' + base + '/truebase-contact/">Contact Sales</a></div></div></section>' +
    schema + '</main>' + footer + '</div>';
  const update = request("POST", base + "/wp-json/wp/v2/pages/" + productsPageId, JSON.stringify({
    title: "TrueBase Premium Pet Memorial Product Catalog",
    content,
    excerpt: "Browse TrueBase premium pet memorial product lines including urns, keepsake boxes, ashes jewelry, photo frames, glass art, garden markers, and sympathy gifts.",
    meta: {
      _yoast_wpseo_title: "Premium Pet Memorial Product Catalog | TrueBase",
      _yoast_wpseo_metadesc: "Browse TrueBase premium pet memorial products for pet stores, veterinary clinics, funeral service providers, and OEM partners.",
      _yoast_wpseo_focuskw: "premium pet memorial products"
    }
  }), {
    "Content-Type": "application/json",
    "X-WP-Nonce": nonce
  });
  const purge = request("GET", base + "/truebase-products/?epc_purge_single=1");
  return JSON.stringify({
    ok: update.ok,
    updateStatus: update.status,
    purgeStatus: purge.status,
    mediaCount: Object.keys(media).length,
    media,
    title: update.json && update.json.title && update.json.title.rendered,
    link: update.json && update.json.link,
    errors,
    error: update.ok ? null : update.text.slice(0, 500)
  }, null, 2);
})();`;

fs.writeFileSync(outFile, payload);
console.log(outFile);
