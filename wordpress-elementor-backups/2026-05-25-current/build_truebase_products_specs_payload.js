const fs = require('fs');
const path = require('path');

const root = '/Users/joeyzhou/Documents/New project';
const outFile = path.join(root, 'truebase_products_specs_payload.js');

const base = 'https://truebaseholding.com';
const productsPageId = 86;

const images = {
  hero: 'https://images.pexels.com/photos/7218824/pexels-photo-7218824.jpeg?auto=compress&cs=tinysrgb&w=1400',
  urns: 'https://images.pexels.com/photos/6580016/pexels-photo-6580016.jpeg?auto=compress&cs=tinysrgb&w=1200',
  boxes: 'https://images.pexels.com/photos/13625518/pexels-photo-13625518.jpeg?auto=compress&cs=tinysrgb&w=1200',
  jewelry: 'https://images.pexels.com/photos/34372550/pexels-photo-34372550.jpeg?auto=compress&cs=tinysrgb&w=1200',
  frames: 'https://images.pexels.com/photos/8101470/pexels-photo-8101470.jpeg?auto=compress&cs=tinysrgb&w=1200',
  glass: 'https://images.pexels.com/photos/9714276/pexels-photo-9714276.jpeg?auto=compress&cs=tinysrgb&w=1200',
  engraved: 'https://images.pexels.com/photos/13625513/pexels-photo-13625513.jpeg?auto=compress&cs=tinysrgb&w=1200',
  garden: 'https://images.pexels.com/photos/16249935/pexels-photo-16249935.jpeg?auto=compress&cs=tinysrgb&w=1200',
  candle: 'https://images.pexels.com/photos/7704463/pexels-photo-7704463.jpeg?auto=compress&cs=tinysrgb&w=1200',
  craft: 'https://images.pexels.com/photos/30598401/pexels-photo-30598401.jpeg?auto=compress&cs=tinysrgb&w=1400'
};

const products = [
  {
    key: 'urns',
    title: 'Signature Ceramic Pet Urns',
    eyebrow: 'Best seller / Made to order',
    desc: 'Premium ceramic and stone-look urns for clinics, funeral homes, and boutique retail displays. A calm, home-decor-friendly tribute for families who want a refined memorial object.',
    specs: [
      'Capacity planning: 1 cubic inch per 1 lb of pet weight; add 10-20% buffer.',
      'Suggested sizes: XS 15-25 cu in, S 40-60 cu in, M 80-110 cu in, L 150-200 cu in.',
      'Exterior options: ceramic cylinder, rounded keepsake jar, stone-look vessel, wood-lid vessel.',
      'Customization: engraved nameplate, paw icon, date line, quote, color glaze, gift box.'
    ],
    channels: 'Veterinary clinics, pet funeral services, boutique pet retail'
  },
  {
    key: 'boxes',
    title: 'Wooden Memory & Keepsake Boxes',
    eyebrow: 'Private label ready',
    desc: 'Luxury wood boxes designed for collars, fur clippings, photos, tags, and small memorial items. Strong fit for aftercare packages and retail add-ons.',
    specs: [
      'Common retail sizes: 15 x 15 x 10 cm, 22 x 22 x 11 cm, 32 x 32 x 16 cm.',
      'Large dog memory format: about 30 x 20 x 13 cm / 11.8 x 7.9 x 5.1 in.',
      'Materials: pine, cedar, walnut veneer, MDF core, velvet or linen insert.',
      'Customization: photo print, laser engraving, hinged lid, clip closure, swing latch, branded sleeve.'
    ],
    channels: 'Aftercare bundles, gift retail, OEM programs'
  },
  {
    key: 'jewelry',
    title: 'Ashes & Paw Print Jewelry',
    eyebrow: 'Top memorial gift category',
    desc: 'Wearable keepsakes including pendants, bracelets, rings, and keychain urns. Designed for families who want a small, personal memorial close at hand.',
    specs: [
      'Pendant formats: heart, round, teardrop, bar, capsule, keychain urn.',
      'Typical size range: 15 mm round, 19 x 24 mm heart, 18 x 25 mm teardrop.',
      'Chain options: 14, 16, 18, 20, and 22 in; silver, gold, rose-gold finishes.',
      'Materials: 316L stainless steel, sterling silver option, resin-inlay paw print, sealed screw chamber.'
    ],
    channels: 'Premium upsell, online memorial gifts, clinic aftercare'
  },
  {
    key: 'frames',
    title: 'Memorial Photo Frames',
    eyebrow: 'Clinic aftercare favorite',
    desc: 'Elegant tabletop frames and shadow-box style displays for photos, collars, paw prints, and small keepsakes. Built for compassionate clinic handoff programs.',
    specs: [
      'Photo formats: 4 x 6 in print slot, 10 x 10 in frame option, shadow-box format.',
      'Shadow box reference: about 10.75 x 8.75 x 1.25 in deep.',
      'Collar support: XS/S collar from 4 in minimum buckled length; MD/LG from 8.06 in minimum.',
      'Display options: tabletop easel, wall hanger, hinged back, glass or acrylic front.'
    ],
    channels: 'Veterinary clinics, funeral service providers, retail displays'
  },
  {
    key: 'glass',
    title: 'Glass Art Keepsakes',
    eyebrow: 'Premium upgrade',
    desc: 'Decorative glass-inspired memorial pieces positioned as high-end upgrades for families seeking a display object rather than a traditional urn.',
    specs: [
      'Orb sizes: 2, 3, and 4 in options; art-glass references include 3.25, 4, and 5.5 in diameter.',
      'Ash quantity: typically a small pinch to 1/2 tsp depending on format.',
      'Formats: orb, heart, touchstone, pendant, desktop paperweight, optional light stand.',
      'Customization: 1-3 color blends, discreet ash placement, viewing window, short inscription upgrade.'
    ],
    channels: 'Premium memorial packages, online gifts, boutique retail'
  },
  {
    key: 'engraved',
    title: 'Engraved Memorial Sets',
    eyebrow: 'Custom engraved',
    desc: 'Coordinated sets that combine a keepsake box, mini urn, photo card, and personalized engraving for a polished, premium package experience.',
    specs: [
      'Set structure: keepsake box + mini urn + photo insert + sympathy card + optional candle or charm.',
      'Box size range: 15-32 cm square memory boxes or 30 x 20 x 13 cm dog memory box.',
      'Engraving zone: pet name, memorial years, short quote, paw icon, silhouette, partner logo.',
      'Packaging: kraft gift box, black rigid box, velvet pouch, branded insert, barcode-ready sleeve.'
    ],
    channels: 'Funeral service packages, OEM collections, sample kits'
  },
  {
    key: 'garden',
    title: 'Garden Stones & Grave Markers',
    eyebrow: 'Outdoor memorial',
    desc: 'Outdoor memorial markers for gardens, burial areas, and home landscapes. A popular personalized category for pet loss gifts and aftercare catalogs.',
    specs: [
      'Common sizes: 5.5 x 4.25 x 1.25 in small resin stone, 11 x 8 x 1.5 in large stone.',
      'Slate options: 10 in round or heart, about 1/8 in thick; flat marker options around 12 x 6 x 0.33 in.',
      'Materials: resin stone-look, cast stone, slate, granite-look plaque, river stone.',
      'Customization: name up to 20 characters, memorial years, paw print, portrait engraving, indoor/outdoor finish.'
    ],
    channels: 'Garden retail, burial services, home memorial gifts'
  },
  {
    key: 'candle',
    title: 'Remembrance Candles & Gift Sets',
    eyebrow: 'Sympathy add-on',
    desc: 'Thoughtful sympathy products that pair well with urns, frames, and keepsake boxes. Useful for clinics and retailers building tiered memorial bundles.',
    specs: [
      'Popular candle size: 9 oz glass jar, about 3.5 in high x 2.8 in diameter.',
      'Alternative sizes: 4 oz mini jar, 7 oz photo candle, 9 cm x 7 cm memorial candle.',
      'Wax options: soy wax, coconut-apricot wax, unscented or fragrance selections.',
      'Customization: pet photo, name, dates, quote, paw label, sympathy card, gift-ready box.'
    ],
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

function specTable(items) {
  const rows = items.map(item => {
    const parts = String(item).split(':');
    const label = parts.length > 1 ? parts.shift() : 'Specification';
    const value = parts.length > 0 ? parts.join(':').trim() : item;
    return `<tr><th>${esc(label)}</th><td>${esc(value)}</td></tr>`;
  }).join('');
  return `<table class="tb-spec-table"><tbody>${rows}</tbody></table>`;
}

const css = `<style>
.tb-page{font-family:Inter,Arial,sans-serif;color:#25282d;background:#f7f4ef}.tb-page *{box-sizing:border-box}.tb-wrap{max-width:1200px;margin:0 auto;padding:0 24px}.tb-header{background:#fff;border-bottom:1px solid #ebe2d6;position:sticky;top:0;z-index:10}.tb-header .tb-wrap{min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:28px}.tb-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:#202226;font-weight:900;font-size:24px}.tb-logo img{width:58px;height:44px;object-fit:contain}.tb-nav{display:flex;align-items:center;gap:30px;white-space:nowrap}.tb-nav a{color:#5d5f63;text-decoration:none;font-weight:800;font-size:14px}.tb-nav a.active,.tb-nav a:hover{color:#111}.tb-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:6px;background:#c6a77c;color:#101010!important;text-decoration:none;font-weight:900;border:1px solid #c6a77c;white-space:nowrap}.tb-btn-outline{background:transparent;color:#27292c!important;border-color:#d8cab8}.tb-hero{background:#fff;padding:86px 0;border-bottom:1px solid #eee4d8}.tb-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,520px);gap:58px;align-items:center}.tb-label,.tb-tag{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:900;color:#a07849;margin:0 0 14px}.tb-hero h1{font-size:58px;line-height:1.03;margin:0 0 22px;color:#24272d}.tb-hero p,.tb-head p,.tb-card p,.tb-product p,.tb-note p{font-size:16px;line-height:1.72;color:#656a72}.tb-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}.tb-media{position:relative;overflow:hidden;border-radius:8px;background:#f0e7dc;aspect-ratio:4/3}.tb-media img,.tb-product-media img{width:100%;height:100%;object-fit:cover;display:block}.tb-mark{position:absolute;left:18px;bottom:18px;z-index:1;padding:9px 13px;border:1px solid rgba(255,255,255,.42);border-radius:6px;background:rgba(17,17,17,.62);color:#fff;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(10px)}.tb-section{padding:78px 0}.tb-white{background:#fff}.tb-cream{background:#f7f4ef}.tb-head{max-width:780px;margin-bottom:34px}.tb-head h2{font-size:38px;line-height:1.13;margin:0 0 14px;color:#282b30}.tb-card-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.tb-card{display:flex;flex-direction:column;background:#fff;border:1px solid #eadfd2;border-radius:8px;padding:22px;text-decoration:none;color:inherit}.tb-card h3{font-size:20px;line-height:1.18;margin:0 0 10px;color:#222}.tb-card p{font-size:14px;margin:0}.tb-card .tb-btn{margin-top:auto;align-self:flex-start;min-height:40px;padding:0 14px;font-size:12px}.tb-pill{display:inline-flex;margin-bottom:12px;padding:7px 10px;border-radius:999px;background:#efe3d4;color:#7b5a35;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.tb-product-list{display:grid;gap:24px}.tb-product{display:grid;grid-template-columns:minmax(260px,.86fr) minmax(0,1fr);overflow:hidden;border:1px solid #eadfd2;border-radius:8px;background:#fff}.tb-product:nth-child(even){background:#fdfbf8}.tb-product-media{position:relative;min-height:430px;background:#eee8df}.tb-product-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,17,17,0) 52%,rgba(17,17,17,.36));pointer-events:none}.tb-product-copy{padding:34px;display:flex;flex-direction:column;gap:14px}.tb-product h3{font-size:30px;line-height:1.1;margin:0;color:#24272d}.tb-product p{margin:0}.tb-spec{background:#f7f4ef;border:1px solid #eadfd2;border-radius:8px;padding:18px;overflow:hidden}.tb-spec h4{margin:0 0 12px;color:#24272d;font-size:15px}.tb-spec-table{width:100%;border-collapse:collapse;table-layout:fixed;background:#fff;border:1px solid #eadfd2;border-radius:6px;overflow:hidden}.tb-spec-table th,.tb-spec-table td{padding:12px 14px;border-bottom:1px solid #eadfd2;vertical-align:top;text-align:left;font-size:14px;line-height:1.55}.tb-spec-table tr:last-child th,.tb-spec-table tr:last-child td{border-bottom:0}.tb-spec-table th{width:34%;background:#efe5d8;color:#4d3f30;font-weight:900}.tb-spec-table td{color:#565b63}.tb-channel{margin-top:4px;padding-top:14px;border-top:1px solid #eee4d8;color:#555b63;font-size:14px;line-height:1.6}.tb-two{display:grid;grid-template-columns:1fr 1fr;gap:24px}.tb-note{background:#252529;color:#fff;padding:48px 0;text-align:center}.tb-note h2{font-size:36px;margin:0 0 10px}.tb-note p{color:#ece7df;margin:0 auto;max-width:720px}.tb-footer{background:#252529;color:#fff;padding:40px 0}.tb-footer p{color:#d8d4cf}.tb-bottom{border-top:1px solid rgba(255,255,255,.12);margin-top:28px;padding-top:18px;color:#c9c3bb;font-size:13px}@media(max-width:980px){.tb-header .tb-wrap{align-items:flex-start;flex-direction:column;padding-top:18px;padding-bottom:18px}.tb-nav{gap:16px;flex-wrap:wrap}.tb-hero-grid,.tb-product,.tb-two{grid-template-columns:1fr}.tb-card-grid{grid-template-columns:1fr 1fr}.tb-hero h1{font-size:42px}.tb-product-media{min-height:360px}}@media(max-width:620px){.tb-wrap{padding:0 18px}.tb-hero,.tb-section{padding:58px 0}.tb-hero h1{font-size:34px}.tb-head h2{font-size:30px}.tb-card-grid{grid-template-columns:1fr}.tb-product-copy{padding:26px 22px}.tb-product-media{min-height:300px}.tb-actions,.tb-btn{width:100%}.tb-spec{padding:14px}.tb-spec-table,.tb-spec-table tbody,.tb-spec-table tr,.tb-spec-table th,.tb-spec-table td{display:block;width:100%}.tb-spec-table th{border-bottom:0;padding-bottom:6px}.tb-spec-table td{padding-top:6px}}
</style>`;

const cards = products.map(product =>
  `<a class="tb-card" href="#${product.key}"><span class="tb-pill">${esc(product.eyebrow)}</span><h3>${esc(product.title)}</h3><p>${esc(product.desc)}</p><span class="tb-btn">View specifications</span></a>`
).join('');

const sections = products.map(product =>
  `<article id="${product.key}" class="tb-product">` +
  `<div class="tb-product-media"><img src="${images[product.key]}" alt="TrueBase ${esc(product.title)}" loading="lazy" onerror="this.onerror=null;this.src='${images.hero}'"><span class="tb-mark">TrueBase</span></div>` +
  `<div class="tb-product-copy"><span class="tb-tag">${esc(product.eyebrow)}</span><h3>${esc(product.title)}</h3><p>${esc(product.desc)}</p><div class="tb-spec"><h4>Product specifications</h4>${specTable(product.specs)}</div><div class="tb-channel"><strong>Recommended channels:</strong> ${esc(product.channels)}</div><div class="tb-actions"><a class="tb-btn" href="${base}/truebase-request-samples-quote/">Request specs / samples</a><a class="tb-btn tb-btn-outline" href="${base}/truebase-contact/">Talk to sales</a></div></div>` +
  `</article>`
).join('');

const schema = `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'TrueBase Premium Pet Memorial Product Catalog',
  description: 'Premium pet memorial product lines with product specifications for urns, keepsake boxes, jewelry, frames, glass art, engraved sets, garden stones, and candles.',
  url: `${base}/truebase-products/`,
  mainEntity: products.map(product => ({
    '@type': 'Product',
    name: `TrueBase ${product.title}`,
    brand: { '@type': 'Brand', name: 'TrueBase' },
    category: product.eyebrow,
    description: product.desc,
    image: images[product.key]
  }))
})}</script>`;

const header = `<header class="tb-header"><div class="tb-wrap"><a class="tb-logo" href="${base}/truebase-home/"><img src="${base}/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><nav class="tb-nav"><a class="active" href="${base}/truebase-products/">Products</a><a href="${base}/truebase-partnership/">Partnership</a><a href="${base}/truebase-how-it-works/">How It Works</a><a href="${base}/truebase-contact/">Contact</a></nav><a class="tb-btn" href="${base}/truebase-become-a-partner/">Become a Partner</a></div></header>`;
const footer = `<footer class="tb-footer"><div class="tb-wrap"><a class="tb-logo" style="color:#fff;margin-bottom:16px" href="${base}/truebase-home/"><img src="${base}/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><p>Premium memorial solutions for professional partners.</p><div class="tb-bottom">© 2026 TrueBase. All rights reserved.</div></div></footer>`;

const content = css + `<div class="tb-page">${header}<main>` +
  `<section class="tb-hero"><div class="tb-wrap tb-hero-grid"><div><span class="tb-label">Products</span><h1>Premium Pet Memorial Product Catalog</h1><p>Explore high-end memorial product lines selected around buyer demand on Amazon, Etsy, and specialty memorial retailers. Each category now includes practical specification ranges for sourcing, private label planning, and sample development.</p><div class="tb-actions"><a class="tb-btn" href="${base}/truebase-request-catalog/">Request Catalog</a><a class="tb-btn tb-btn-outline" href="${base}/truebase-request-samples-quote/">Get Samples / Quote</a></div></div><div class="tb-media"><img src="${images.hero}" alt="Minimal ceramic memorial-style vase with flowers on a wooden table" loading="eager" onerror="this.onerror=null;this.src='${base}/wp-content/uploads/2026/05/truebase-store.jpg'"><span class="tb-mark">TrueBase</span></div></div></section>` +
  `<section class="tb-section tb-cream"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Category overview</span><h2>Popular memorial categories, refined for premium B2B catalogs</h2><p>Each card now links to a detailed product specification block so buyers can compare size, material, customization, and packaging options faster.</p></div><div class="tb-card-grid">${cards}</div></div></section>` +
  `<section class="tb-section tb-white"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Product details</span><h2>Product images, introductions, and sourced specification ranges</h2><p>Specification ranges are modeled from current Amazon/Etsy-style memorial products and specialty memorial retailers, then rewritten for TrueBase OEM and wholesale use.</p></div><div class="tb-product-list">${sections}</div></div></section>` +
  `<section class="tb-section tb-cream"><div class="tb-wrap tb-two"><div class="tb-card"><span class="tb-label">Branding</span><h2>TrueBase private-label presentation</h2><p>Catalog images use copyright-safe stock or TrueBase-owned assets. Product specs are written as manufacturing and merchandising ranges, not copied product listings.</p></div><div class="tb-media"><img src="${images.craft}" alt="Wabi sabi ceramic vases on a rustic wooden table" loading="lazy" onerror="this.onerror=null;this.src='${images.hero}'"><span class="tb-mark">TrueBase</span></div></div></section>` +
  `<section class="tb-note"><div class="tb-wrap"><h2>Need samples or OEM customization?</h2><p>TrueBase can support product selection, engraving direction, packaging systems, sample kits, and private-label presentation for professional memorial product buyers.</p><div class="tb-actions" style="justify-content:center"><a class="tb-btn" href="${base}/truebase-request-samples-quote/">Request Samples / Quote</a><a class="tb-btn tb-btn-outline" style="color:#fff!important;border-color:rgba(255,255,255,.35)" href="${base}/truebase-contact/">Contact Sales</a></div></div></section>` +
  schema + `</main>${footer}</div>`;

const payload = `(() => {
  const content = ${JSON.stringify(content)};
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
    const admin = request("GET", "/wp-admin/post-new.php?post_type=page");
    const html = admin.text || "";
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\\\\s*[:=]\\\\s*["']([a-f0-9]+)["']/i, /"nonce":"([a-f0-9]+)"/i, /rest_nonce["']?\\\\s*[:=]\\\\s*["']([a-f0-9]+)["']/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error("Could not find REST nonce");
  }
  const nonce = getNonce();
  const update = request("POST", "/wp-json/wp/v2/pages/${productsPageId}", JSON.stringify({
    title: "TrueBase Premium Pet Memorial Product Catalog",
    content,
    excerpt: "Browse TrueBase premium pet memorial products with sizing, material, packaging, and customization specifications."
  }), {
    "Content-Type": "application/json",
    "X-WP-Nonce": nonce
  });
  request("GET", "/truebase-products/?epc_purge_single=1");
  return JSON.stringify({ ok: update.ok, status: update.status, link: update.json && update.json.link, error: update.ok ? null : update.text.slice(0, 500) });
})();`;

fs.writeFileSync(outFile, payload);
console.log(outFile);
