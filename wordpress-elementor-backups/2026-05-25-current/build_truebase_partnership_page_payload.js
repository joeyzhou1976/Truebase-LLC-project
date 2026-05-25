const fs = require('fs');
const path = require('path');

const root = '/Users/joeyzhou/Documents/New project';
const outFile = path.join(root, 'truebase_partnership_page_payload.js');
const base = 'https://truebaseholding.com';
const pageId = 88;

const images = {
  hero: 'https://images.pexels.com/photos/8470832/pexels-photo-8470832.jpeg?auto=compress&cs=tinysrgb&w=1400',
  meeting: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400'
};

function esc(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[ch]);
}

const models = [
  {
    label: 'Model 01',
    title: 'Wholesale',
    desc: 'Bulk purchasing at partner pricing with a curated TrueBase memorial catalog, stable supply planning, and account support.',
    points: ['Low minimum order quantity', 'Catalog-based ordering', 'Fast quote and sample support']
  },
  {
    label: 'Most Popular',
    title: 'Customization',
    desc: 'Configure materials, sizes, engravings, packaging, and sympathy inserts around your customer journey and brand needs.',
    points: ['Engraving and artwork proofing', 'Packaging and insert options', 'Flexible product configurations'],
    dark: true
  },
  {
    label: 'Model 03',
    title: 'Private Label / OEM',
    desc: 'Build your own memorial product line using TrueBase production, development, packaging, and fulfillment capabilities.',
    points: ['Your brand, our production', 'OEM and ODM support', 'Prototype to bulk production']
  }
];

const comparison = [
  ['Criteria', 'Wholesale', 'Customization', 'Private Label / OEM'],
  ['MOQ', 'Low', 'Flexible', 'Project-based'],
  ['Branding', 'TrueBase catalog', 'Brand assets optional', 'Full private label'],
  ['Best for', 'Retailers', 'Clinics and service providers', 'Distributors and brands'],
  ['Support', 'Account manager', 'Design and artwork support', 'Product development']
];

const css = `<style>
.tb-page{font-family:Inter,Arial,sans-serif;color:#25282d;background:#f7f4ef}.tb-page *{box-sizing:border-box}.tb-wrap{max-width:1200px;margin:0 auto;padding:0 24px}.tb-header{background:#fff;border-bottom:1px solid #ebe2d6;position:sticky;top:0;z-index:10}.tb-header .tb-wrap{min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:28px}.tb-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:#202226;font-weight:900;font-size:24px}.tb-logo img{width:58px;height:44px;object-fit:contain}.tb-nav{display:flex;align-items:center;gap:30px;white-space:nowrap}.tb-nav a{color:#5d5f63;text-decoration:none;font-weight:800;font-size:14px}.tb-nav a.active,.tb-nav a:hover{color:#111}.tb-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:6px;background:#c6a77c;color:#101010!important;text-decoration:none;font-weight:900;border:1px solid #c6a77c;white-space:nowrap}.tb-btn-outline{background:transparent;color:#27292c!important;border-color:#d8cab8}.tb-hero{background:#fff;padding:86px 0;border-bottom:1px solid #eee4d8}.tb-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,520px);gap:58px;align-items:center}.tb-label,.tb-tag{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:900;color:#a07849;margin:0 0 14px}.tb-hero h1{font-size:58px;line-height:1.03;margin:0 0 22px;color:#24272d}.tb-hero p,.tb-head p,.tb-card p,.tb-model p,.tb-note p{font-size:16px;line-height:1.72;color:#656a72}.tb-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}.tb-media{position:relative;overflow:hidden;border-radius:8px;background:#f0e7dc;aspect-ratio:4/3}.tb-media img{width:100%;height:100%;object-fit:cover;display:block}.tb-mark{position:absolute;left:18px;bottom:18px;z-index:1;padding:9px 13px;border:1px solid rgba(255,255,255,.42);border-radius:6px;background:rgba(17,17,17,.62);color:#fff;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(10px)}.tb-section{padding:78px 0}.tb-white{background:#fff}.tb-cream{background:#f7f4ef}.tb-head{max-width:800px;margin-bottom:34px}.tb-head h2{font-size:38px;line-height:1.13;margin:0 0 14px;color:#282b30}.tb-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.tb-card,.tb-model{background:#fff;border:1px solid #eadfd2;border-radius:8px;padding:26px}.tb-model{display:flex;flex-direction:column;min-height:100%}.tb-model.dark{background:#252529;color:#fff;border-color:#252529}.tb-model.dark p,.tb-model.dark li{color:#e5ded4}.tb-pill{display:inline-flex;align-self:flex-start;margin-bottom:14px;padding:7px 10px;border-radius:999px;background:#efe3d4;color:#7b5a35;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.tb-model.dark .tb-pill{background:#c6a77c;color:#151515}.tb-model h3{font-size:26px;line-height:1.12;margin:0 0 12px;color:#222}.tb-model.dark h3{color:#fff}.tb-model ul{margin:18px 0 0;padding-left:20px;color:#555b63;line-height:1.8}.tb-table{border:1px solid #eadfd2;border-radius:8px;overflow:hidden;background:#fff}.tb-row{display:grid;grid-template-columns:1fr 1fr 1.1fr 1.2fr}.tb-row.head{background:#252529;color:#fff;font-weight:900}.tb-cell{padding:16px;border-right:1px solid #eadfd2;border-bottom:1px solid #eadfd2;font-size:15px;line-height:1.55}.tb-row.head .tb-cell{border-color:rgba(255,255,255,.18)}.tb-row:last-child .tb-cell{border-bottom:0}.tb-cell:last-child{border-right:0}.tb-two{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:center}.tb-note{background:#252529;color:#fff;padding:50px 0;text-align:center}.tb-note h2{font-size:36px;margin:0 0 10px}.tb-note p{color:#ece7df;margin:0 auto;max-width:720px}.tb-footer{background:#252529;color:#fff;padding:40px 0}.tb-footer p{color:#d8d4cf}.tb-bottom{border-top:1px solid rgba(255,255,255,.12);margin-top:28px;padding-top:18px;color:#c9c3bb;font-size:13px}@media(max-width:980px){.tb-header .tb-wrap{align-items:flex-start;flex-direction:column;padding-top:18px;padding-bottom:18px}.tb-nav{gap:16px;flex-wrap:wrap}.tb-hero-grid,.tb-two{grid-template-columns:1fr}.tb-grid-3{grid-template-columns:1fr}.tb-hero h1{font-size:42px}.tb-row{grid-template-columns:1fr}.tb-cell{border-right:0}.tb-row.head{display:none}.tb-cell:before{content:attr(data-label);display:block;margin-bottom:5px;color:#7b5a35;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.04em}}@media(max-width:620px){.tb-wrap{padding:0 18px}.tb-hero,.tb-section{padding:58px 0}.tb-hero h1{font-size:34px}.tb-head h2{font-size:30px}.tb-actions,.tb-btn{width:100%}}
</style>`;

const header = `<header class="tb-header"><div class="tb-wrap"><a class="tb-logo" href="${base}/truebase-home/"><img src="${base}/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><nav class="tb-nav"><a href="${base}/truebase-products/">Products</a><a class="active" href="${base}/truebase-partnership/">Partnership</a><a href="${base}/truebase-how-it-works/">How It Works</a><a href="${base}/truebase-contact/">Contact</a></nav><a class="tb-btn" href="${base}/truebase-become-a-partner/">Become a Partner</a></div></header>`;
const footer = `<footer class="tb-footer"><div class="tb-wrap"><a class="tb-logo" style="color:#fff;margin-bottom:16px" href="${base}/truebase-home/"><img src="${base}/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><p>Premium memorial solutions for professional partners.</p><div class="tb-bottom">© 2026 TrueBase. All rights reserved.</div></div></footer>`;

const modelCards = models.map(model => `<article class="tb-model${model.dark ? ' dark' : ''}"><span class="tb-pill">${esc(model.label)}</span><h3>${esc(model.title)}</h3><p>${esc(model.desc)}</p><ul>${model.points.map(point => `<li>${esc(point)}</li>`).join('')}</ul></article>`).join('');

const table = `<div class="tb-table">${comparison.map((row, rowIndex) => {
  if (rowIndex === 0) return `<div class="tb-row head">${row.map(cell => `<div class="tb-cell">${esc(cell)}</div>`).join('')}</div>`;
  return `<div class="tb-row">${row.map((cell, index) => `<div class="tb-cell" data-label="${esc(comparison[0][index])}">${esc(cell)}</div>`).join('')}</div>`;
}).join('')}</div>`;

const schema = `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'TrueBase Partnership Models',
  description: 'Wholesale, customization, and OEM partnership models for pet memorial businesses.',
  url: `${base}/truebase-partnership/`
})}</script>`;

const content = css + `<div class="tb-page">${header}<main>` +
  `<section class="tb-hero"><div class="tb-wrap tb-hero-grid"><div><span class="tb-label">Partnership</span><h1>Flexible Partnership Models</h1><p>Choose wholesale, customization, or private-label programs designed around your business model. TrueBase supports professional pet memorial businesses with product planning, sample development, packaging direction, and long-term account support.</p><div class="tb-actions"><a class="tb-btn" href="${base}/truebase-become-a-partner/">Become a Partner</a><a class="tb-btn tb-btn-outline" href="${base}/truebase-contact/">Talk to Sales</a></div></div><div class="tb-media"><img src="${images.hero}" alt="TrueBase partnership handshake and collaboration meeting" loading="eager" onerror="this.onerror=null;this.src='${images.meeting}'"><span class="tb-mark">Partnership</span></div></div></section>` +
  `<section class="tb-section tb-white"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Programs</span><h2>Three ways to work with TrueBase</h2><p>Each partnership path is structured for different buyer needs, from catalog-based ordering to full private-label memorial product development.</p></div><div class="tb-grid-3">${modelCards}</div></div></section>` +
  `<section class="tb-section tb-cream"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Comparison</span><h2>Model comparison</h2><p>Use the table below to choose the most practical path for your store, clinic, funeral service, distributor, or brand.</p></div>${table}</div></section>` +
  `<section class="tb-section tb-white"><div class="tb-wrap tb-two"><div><span class="tb-label">Collaboration</span><h2>Built for thoughtful, long-term partnerships</h2><p>TrueBase helps partners translate emotional memorial needs into product lines that feel refined, consistent, and commercially practical.</p><div class="tb-actions"><a class="tb-btn" href="${base}/truebase-request-samples-quote/">Request Samples / Quote</a><a class="tb-btn tb-btn-outline" href="${base}/truebase-request-catalog/">Request Catalog</a></div></div><div class="tb-media"><img src="${images.meeting}" alt="Business team discussing partnership planning" loading="lazy" onerror="this.onerror=null;this.src='${images.hero}'"><span class="tb-mark">Planning</span></div></div></section>` +
  `<section class="tb-note"><div class="tb-wrap"><h2>Ready to compare partnership options?</h2><p>Share your business type, target product lines, and expected order volume. We will recommend the right path and next samples.</p><div class="tb-actions" style="justify-content:center"><a class="tb-btn" href="${base}/truebase-become-a-partner/">Start Application</a><a class="tb-btn tb-btn-outline" style="color:#fff!important;border-color:rgba(255,255,255,.35)" href="${base}/truebase-contact/">Contact Sales</a></div></div></section>` +
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
  const update = request("POST", "/wp-json/wp/v2/pages/${pageId}", JSON.stringify({
    title: "TrueBase Partnership Models",
    content,
    excerpt: "Compare TrueBase wholesale, customization, and private label OEM partnership models for pet memorial products."
  }), {
    "Content-Type": "application/json",
    "X-WP-Nonce": nonce
  });
  request("GET", "/truebase-partnership/?epc_purge_single=1");
  return JSON.stringify({ ok: update.ok, status: update.status, link: update.json && update.json.link, error: update.ok ? null : update.text.slice(0, 500) });
})();`;

fs.writeFileSync(outFile, payload);
console.log(outFile);
