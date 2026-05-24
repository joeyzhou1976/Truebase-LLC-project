const fs = require('fs');
const path = require('path');

const root = '/Users/joeyzhou/Documents/New project';
const imageDir = path.join(root, 'jpeipet-optimized');
const outFile = path.join(root, 'jpeipet_products_payload.js');

const categories = [
  {
    key: 'small-pet-habitat',
    title: 'Small Pet Habitat & Bath Box',
    eyebrow: 'Small Pet Supplies',
    files: ['DSC00358', 'DSC00359', 'DSC00360', 'DSC00361', 'DSC00362', 'DSC00363', 'DSC00364', 'DSC00365', 'DSC00366', 'DSC00367'],
    hero: 'DSC00358',
    alt: 'Yellow JPEIPET small pet habitat and bath box with ventilated lid',
    desc: 'A compact translucent small-pet box designed for hamsters, gerbils, and other small companions. The covered design helps contain sand, bedding, or short-term care accessories while keeping the interior visible.',
    features: ['Ventilated transparent lid', 'Easy-view translucent body', 'Raised interior structure for activity and separation', 'Lightweight format for storage, cleaning, or display']
  },
  {
    key: 'smart-water-fountain',
    title: 'Smart Pet Water Fountain',
    eyebrow: 'Hydration',
    files: ['DSC00368', 'DSC00369', 'DSC00370', 'DSC00371', 'DSC00372', 'DSC00373', 'DSC00374', 'DSC00375', 'DSC00376', 'DSC00377'],
    hero: 'DSC00368',
    alt: 'Blue and white JPEIPET automatic pet water fountain with filter system',
    desc: 'A compact automatic water fountain for cats and small dogs, designed to encourage daily hydration through a raised drinking outlet, visible water level marks, and an internal filtration structure.',
    features: ['USB-powered water circulation', 'Visible min and max water marks', 'Replaceable filtration area', 'Rounded basin for easy cleaning']
  },
  {
    key: 'slow-feeder-insert',
    title: 'Slow Feeder & Enrichment Insert',
    eyebrow: 'Toys & Enrichment',
    files: ['DSC00378', 'DSC00379', 'DSC00380', 'DSC00381', 'DSC00382', 'DSC00383'],
    hero: 'DSC00379',
    alt: 'Gray JPEIPET slow feeder enrichment insert for pets',
    desc: 'A soft gray feeding insert with raised maze walls and suction feet, built to slow eating pace and add gentle enrichment during meals or treat time.',
    features: ['Maze-style channels for slower feeding', 'Suction feet for stability', 'Soft rounded edges', 'Suitable for treat enrichment or wet-food spreading']
  },
  {
    key: 'owl-laser-cat-toy',
    title: 'Owl-Shaped Laser Cat Toy',
    eyebrow: 'Interactive Toys',
    files: ['DSC00384', 'DSC00385', 'DSC00386', 'DSC00387', 'DSC00388', 'DSC00389'],
    hero: 'DSC00384',
    alt: 'Owl-shaped JPEIPET laser cat toy with rounded rotating head design',
    desc: 'A compact owl-shaped laser cat toy designed for indoor play, movement stimulation, and daily enrichment. The rounded head design and USB-C charging port make it suitable for modern pet toy displays.',
    features: ['Interactive laser play for cats', 'Owl-shaped display-friendly design', 'USB-C charging port detail', 'Compact body for tabletop or floor use']
  },
  {
    key: 'feeding-station',
    title: 'Multi-Function Feeding Station',
    eyebrow: 'Feeding & Watering',
    files: ['DSC00390', 'DSC00391', 'DSC00392', 'DSC00393'],
    hero: 'DSC00390',
    alt: 'Green JPEIPET multi-function pet feeding station with bowls and water bottle holder',
    desc: 'A transparent green feeding station combining two bowls, a water bottle holder, and a drain area into one organized base for daily feeding routines.',
    features: ['Dual removable food bowls', 'Water bottle holder area', 'Drainage platform for spills', 'Long base keeps food and water organized']
  },
  {
    key: 'litter-cleaning-basin',
    title: 'Pet Cleaning & Litter Basin',
    eyebrow: 'Pet Care',
    files: ['DSC00394', 'DSC00395', 'DSC00396', 'DSC00397'],
    hero: 'DSC00395',
    alt: 'Green JPEIPET pet cleaning and litter basin with scoop and raised floor texture',
    desc: 'A roomy green basin with raised floor texture and an included scoop, designed for litter, cleaning, or small-pet care use cases where quick access and easy maintenance matter.',
    features: ['Open-top basin for easy access', 'Raised anti-slip floor texture', 'Included scoop accessory', 'Durable lightweight body for quick cleaning']
  }
];

const imageMap = {};
for (const category of categories) {
  for (const stem of category.files) {
    const file = `${stem}.jpg`;
    imageMap[stem] = {
      stem,
      file,
      category: category.key,
      alt: stem === category.hero ? category.alt : `${category.title} product detail view ${stem.replace('DSC', '')}`,
      base64: fs.readFileSync(path.join(imageDir, file)).toString('base64')
    };
  }
}

const payload = `(() => {
  const nonce = "eec0c66de9";
  const base = "https://truebaseholding.com";
  const productsPageId = 86;
  const images = ${JSON.stringify(imageMap)};
  const categories = ${JSON.stringify(categories)};
  const media = {};
  const errors = [];

  function request(method, url, body, headers = {}) {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    x.setRequestHeader("X-WP-Nonce", nonce);
    for (const [k, v] of Object.entries(headers)) x.setRequestHeader(k, v);
    x.send(body === undefined ? null : body);
    let json = null;
    try { json = JSON.parse(x.responseText); } catch (_) {}
    return { ok: x.status >= 200 && x.status < 300, status: x.status, text: x.responseText, json };
  }

  function uploadImage(item) {
    const binary = atob(item.base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const existing = request("GET", base + "/wp-json/wp/v2/media?search=" + encodeURIComponent(item.stem) + "&per_page=10");
    const found = existing.json && existing.json.find(m => (m.title && m.title.rendered || "").includes(item.stem));
    if (found) {
      media[item.stem] = { id: found.id, url: found.source_url, alt: found.alt_text };
      return;
    }
    const res = request("POST", base + "/wp-json/wp/v2/media", bytes, {
      "Content-Type": "image/jpeg",
      "Content-Disposition": 'attachment; filename="jpeipet-' + item.stem.toLowerCase() + '.jpg"'
    });
    if (!res.ok) {
      errors.push("Upload " + item.stem + ": " + res.status + " " + res.text.slice(0, 180));
      return;
    }
    request("POST", base + "/wp-json/wp/v2/media/" + res.json.id, JSON.stringify({
      title: "JPEIPET " + item.stem,
      alt_text: item.alt,
      caption: item.alt,
      description: item.alt
    }), { "Content-Type": "application/json" });
    media[item.stem] = { id: res.json.id, url: res.json.source_url, alt: item.alt };
  }

  Object.values(images).forEach(uploadImage);

  function img(stem) { return media[stem] && media[stem].url || ""; }
  function alt(stem) { return images[stem] && images[stem].alt || "JPEIPET product image"; }
  function gallery(category) {
    return category.files.map(stem => '<figure><img class="tb-editable-img" src="' + img(stem) + '" alt="' + alt(stem) + '" loading="lazy"><figcaption>' + stem + '</figcaption></figure>').join("");
  }
  function featureList(items) {
    return '<ul>' + items.map(i => '<li>' + i + '</li>').join("") + '</ul>';
  }

  const css = '<style>' +
    '.tb-page{font-family:Inter,Arial,sans-serif;color:#25282d;background:#fbf8f4}.tb-wrap{max-width:1200px;margin:0 auto;padding:0 24px}.tb-header{background:#fff;border-bottom:1px solid #eee6dc;position:sticky;top:0;z-index:10}.tb-header .tb-wrap{height:78px;display:flex;align-items:center;justify-content:space-between;gap:28px}.tb-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:#202226;font-weight:800;font-size:26px}.tb-logo img{width:58px;height:44px;object-fit:contain}.tb-nav{display:flex;align-items:center;gap:34px;white-space:nowrap}.tb-nav a{color:#5d5f63;text-decoration:none;font-weight:700}.tb-nav a.active,.tb-nav a:hover{color:#222}.tb-btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 22px;border-radius:6px;background:#c6a77c;color:#101010!important;text-decoration:none;font-weight:800;border:1px solid #c6a77c;white-space:nowrap}.tb-btn-outline{background:transparent;color:#27292c!important;border-color:#d8cab8}.tb-hero{background:#fff;padding:82px 0}.tb-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,520px);gap:56px;align-items:center}.tb-label{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:900;color:#a07849;margin-bottom:14px}.tb-label-pill{display:inline-flex;padding:7px 10px;border-radius:999px;background:#efe3d4;color:#7b5a35;font-size:12px;font-weight:800;margin:16px 0 8px}.tb-hero h1{font-size:58px;line-height:1.02;margin:0 0 22px;color:#24272d}.tb-hero p,.tb-head p,.tb-card p,.tb-category-copy p{font-size:17px;line-height:1.72;color:#666b73}.tb-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}.tb-media{background:#f6f1eb;border-radius:8px;overflow:hidden}.tb-media img,.tb-product-img img{width:100%;height:100%;object-fit:cover;display:block}.tb-media.hero{aspect-ratio:4/3}.tb-section{padding:74px 0}.tb-white{background:#fff}.tb-cream{background:#fbf8f4}.tb-head{max-width:760px;margin-bottom:34px}.tb-head h2,.tb-category-copy h2{font-size:38px;line-height:1.12;margin:0 0 14px;color:#282b30}.tb-category{display:grid;grid-template-columns:410px minmax(0,1fr);gap:34px;align-items:start;margin-top:34px;padding:28px;background:#fff;border:1px solid #ede5dc;border-radius:8px}.tb-category:nth-child(even){background:#fdfbf8}.tb-category-copy h3{font-size:28px;margin:0 0 12px}.tb-product-img{aspect-ratio:4/3;border-radius:8px;overflow:hidden;background:#f4f0ea}.tb-gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.tb-gallery figure{margin:0;border:1px solid #eee5da;border-radius:8px;overflow:hidden;background:#fff}.tb-gallery img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}.tb-gallery figcaption{font-size:11px;color:#7b7f86;padding:8px 10px}.tb-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.tb-card{background:#fff;border:1px solid #ece3d8;border-radius:8px;padding:24px}.tb-card h3{margin:0 0 8px;font-size:22px}.tb-card ul,.tb-category-copy ul{margin:16px 0 0;padding-left:19px;color:#555b63;line-height:1.75}.tb-note{background:#2d2d31;color:#fff;padding:46px 0;text-align:center}.tb-note h2{font-size:36px;margin:0 0 10px}.tb-note p{color:#ece7df;font-size:17px}.tb-footer{background:#252529;color:#fff;padding:40px 0}.tb-footer a{color:#fff}.tb-footer p{color:#d8d4cf}.tb-bottom{border-top:1px solid rgba(255,255,255,.12);margin-top:28px;padding-top:18px;color:#c9c3bb;font-size:13px}.tb-editable-img{max-width:100%}@media(max-width:980px){.tb-header .tb-wrap{height:auto;padding-top:18px;padding-bottom:18px;align-items:flex-start;flex-direction:column}.tb-nav{gap:16px;flex-wrap:wrap}.tb-hero-grid,.tb-category{grid-template-columns:1fr}.tb-hero h1{font-size:42px}.tb-gallery,.tb-card-grid{grid-template-columns:1fr 1fr}}@media(max-width:620px){.tb-wrap{padding:0 18px}.tb-hero{padding:56px 0}.tb-hero h1{font-size:34px}.tb-gallery,.tb-card-grid{grid-template-columns:1fr}}' +
  '</style>';

  const header = '<header class="tb-header"><div class="tb-wrap"><a class="tb-logo" href="' + base + '/truebase-home/"><img class="tb-editable-img" src="https://truebaseholding.com/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><nav class="tb-nav"><a class="active" href="' + base + '/truebase-products/">Products</a><a href="' + base + '/truebase-partnership/">Partnership</a><a href="' + base + '/truebase-how-it-works/">How It Works</a><a href="' + base + '/truebase-contact/">Contact</a></nav><a class="tb-btn" href="' + base + '/truebase-become-a-partner/">Become a Partner</a></div></header>';
  const footer = '<footer class="tb-footer"><div class="tb-wrap"><a class="tb-logo" style="color:#fff" href="' + base + '/truebase-home/"><img class="tb-editable-img" src="https://truebaseholding.com/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><p>Premium pet supplies and partner-ready product solutions.</p><div class="tb-bottom">© 2026 TrueBase. All rights reserved.</div></div></footer>';

  const categorySections = categories.map(cat =>
    '<article id="' + cat.key + '" class="tb-category">' +
      '<div>' +
        '<div class="tb-product-img"><img class="tb-editable-img" src="' + img(cat.hero) + '" alt="' + cat.alt + '" loading="lazy"></div>' +
      '</div>' +
      '<div class="tb-category-copy">' +
        '<span class="tb-label">' + cat.eyebrow + '</span>' +
        '<h3>' + cat.title + '</h3>' +
        '<p>' + cat.desc + '</p>' +
        featureList(cat.features) +
        '<div class="tb-gallery">' + gallery(cat) + '</div>' +
      '</div>' +
    '</article>'
  ).join("");

  const cards = categories.map(cat =>
    '<a class="tb-card" href="#' + cat.key + '" style="text-decoration:none;color:inherit">' +
      '<span class="tb-label-pill">' + cat.eyebrow + '</span><h3>' + cat.title + '</h3><p>' + cat.desc + '</p>' +
    '</a>'
  ).join("");

  const schema = '<script type="application/ld+json">' + JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "JPEIPET Pet Supplies and Toys",
    description: "JPEIPET pet supplies and toys including small pet habitats, automatic water fountains, slow feeders, feeding stations, and pet care basins.",
    url: base + "/truebase-products/",
    mainEntity: categories.map(cat => ({
      "@type": "Product",
      name: "JPEIPET " + cat.title,
      category: cat.eyebrow,
      description: cat.desc,
      image: img(cat.hero),
      brand: { "@type": "Brand", name: "JPEIPET" }
    }))
  }) + '<' + '/script>';

  const content = css + '<div class="tb-page">' + header +
    '<main>' +
      '<section class="tb-hero"><div class="tb-wrap tb-hero-grid"><div><span class="tb-label">Products</span><h1>JPEIPET Pet Supplies & Toys</h1><p>Explore practical, retail-ready pet products grouped by use case: hydration, feeding, enrichment, cleaning, and small-pet care. Each image is uploaded to the WordPress media library, so photos can be replaced or optimized later in Elementor.</p><div class="tb-actions"><a class="tb-btn" href="' + base + '/truebase-request-catalog/">Request Catalog</a><a class="tb-btn tb-btn-outline" href="' + base + '/truebase-request-samples-quote/">Get Samples / Quote</a></div></div><div class="tb-media hero"><img class="tb-editable-img" src="' + img('DSC00390') + '" alt="JPEIPET multi-function pet feeding station product hero image" loading="eager"></div></div></section>' +
      '<section class="tb-section tb-cream"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Category Overview</span><h2>Pet supplies grouped for buyers and catalog browsing</h2><p>The products are organized into clear buyer categories so the page can support SEO, wholesale inquiries, and future Elementor product detail expansion.</p></div><div class="tb-card-grid">' + cards + '</div></div></section>' +
      '<section class="tb-section tb-white"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Product Details</span><h2>Product categories, descriptions, and functional highlights</h2><p>Use these blocks as editable Elementor-ready product sections. Every image includes alt text and can be swapped from the media library later.</p></div>' + categorySections + '</div></section>' +
      '<section class="tb-note"><div class="tb-wrap"><h2>Need samples or OEM customization?</h2><p>TrueBase can support catalog selection, packaging direction, product descriptions, and future private-label presentation for pet supply buyers.</p><div class="tb-actions" style="justify-content:center"><a class="tb-btn" href="' + base + '/truebase-request-samples-quote/">Request Samples / Quote</a><a class="tb-btn tb-btn-outline" style="color:#fff!important;border-color:rgba(255,255,255,.35)" href="' + base + '/truebase-contact/">Contact Sales</a></div></div></section>' +
      schema +
    '</main>' + footer + '</div>';

  const update = request("POST", base + "/wp-json/wp/v2/pages/" + productsPageId, JSON.stringify({
    title: "JPEIPET Pet Supplies & Toys",
    content,
    excerpt: "Browse JPEIPET pet supplies and toys, including small pet habitats, automatic water fountains, slow feeders, feeding stations, and pet cleaning basins.",
    meta: {
      _yoast_wpseo_title: "JPEIPET Pet Supplies & Toys | TrueBase",
      _yoast_wpseo_metadesc: "Browse JPEIPET pet supplies and toys, including small pet habitats, automatic water fountains, slow feeders, feeding stations, and cleaning basins.",
      _yoast_wpseo_focuskw: "JPEIPET pet supplies"
    }
  }), { "Content-Type": "application/json" });

  request("GET", base + "/truebase-products/?epc_purge_single=1");
  return JSON.stringify({ ok: update.ok && errors.length === 0, updateStatus: update.status, mediaCount: Object.keys(media).length, errors, link: base + "/truebase-products/" }, null, 2);
})();`;

fs.writeFileSync(outFile, payload);
console.log(outFile);
