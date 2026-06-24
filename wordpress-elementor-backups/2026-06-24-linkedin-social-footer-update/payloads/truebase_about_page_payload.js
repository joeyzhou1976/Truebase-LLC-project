(() => {
  const base = "https://truebaseholding.com";
  const mediaRegistry = {"about.hero":{"type":"image","src":"https://truebaseholding.com/wp-content/uploads/2026/05/truebase-life-corgi-portrait.jpg","alt":"Life, Joey's corgi, looking at the camera","label":"Life the corgi"},"about.origin":{"type":"image","src":"https://truebaseholding.com/wp-content/uploads/2026/05/truebase-life-corgi-garden.jpg","alt":"Life, Joey's corgi, resting in the garden","label":"Life"},"about.feedback":{"type":"image","src":"https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400","alt":"Professional partners discussing a TrueBase memorial product program","label":"Partner feedback"}};
  const company = {"name":"Truebase Holding LLC","type":"Wyoming Limited Liability Company","filed":"Apr 14, 2026","originalId":"2026-001950978","address":"30 N Gould St Ste N, Sheridan, WY 82801","registeredAgent":"Northwest Registered Agent Service Inc"};
  const css = "<style>\nbody.page-id-202 .pawfect-topbar,body.page-id-202 #pawfect-main-header,body.page-id-202 #primary-content>.pawfect-page-header,body.page-id-202 footer.pawfect-footer{display:none!important}body.page-id-202 #primary-content,body.page-id-202 #primary-content>.pawfect-page-content{padding:0!important;margin:0!important}body.page-id-202 #primary-content>.pawfect-page-content{background:#f7f4ef!important}\n.tb-page{font-family:Inter,Arial,sans-serif;color:#25282d;background:#f7f4ef}.tb-page *{box-sizing:border-box}.tb-wrap{max-width:1200px;margin:0 auto;padding:0 24px}.tb-header{background:#fff;border-bottom:1px solid #ebe2d6;position:sticky;top:0;z-index:10}.tb-header .tb-wrap{min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:28px}.tb-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:#202226;font-weight:900;font-size:24px}.tb-logo img{width:58px;height:44px;object-fit:contain}.tb-nav{display:flex;align-items:center;gap:24px;white-space:nowrap}.tb-nav a{color:#5d5f63;text-decoration:none;font-weight:800;font-size:14px}.tb-nav a.active,.tb-nav a:hover{color:#111}.tb-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:6px;background:#c6a77c;color:#101010!important;text-decoration:none;font-weight:900;border:1px solid #c6a77c;white-space:nowrap}.tb-btn-outline{background:transparent;color:#27292c!important;border-color:#d8cab8}.tb-hero{background:#fff;padding:86px 0;border-bottom:1px solid #eee4d8}.tb-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,520px);gap:58px;align-items:center}.tb-label{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:900;color:#a07849;margin:0 0 14px}.tb-hero h1{font-size:58px;line-height:1.03;margin:0 0 22px;color:#24272d}.tb-hero p,.tb-head p,.tb-story p,.tb-card p,.tb-note p,.tb-fact dd,.tb-testimonial p,.tb-media-guide p{font-size:16px;line-height:1.72;color:#656a72}.tb-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}.tb-media{position:relative;overflow:hidden;border-radius:8px;background:#f0e7dc;aspect-ratio:4/3}.tb-media img,.tb-media video{width:100%;height:100%;object-fit:cover;display:block}.tb-media.portrait{aspect-ratio:3/4}.tb-mark{position:absolute;left:18px;bottom:18px;z-index:1;padding:9px 13px;border:1px solid rgba(255,255,255,.42);border-radius:6px;background:rgba(17,17,17,.62);color:#fff;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(10px)}.tb-section{padding:78px 0}.tb-white{background:#fff}.tb-cream{background:#f7f4ef}.tb-head{max-width:800px;margin-bottom:34px}.tb-head h2,.tb-story h2{font-size:38px;line-height:1.13;margin:0 0 14px;color:#282b30}.tb-two{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center}.tb-story{display:grid;gap:22px}.tb-quote{padding:28px;border-left:4px solid #c6a77c;background:#fff;border-radius:0 8px 8px 0;color:#35383d;font-size:20px;line-height:1.55}.tb-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.tb-contact-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.tb-testimonial-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.tb-card,.tb-facts,.tb-testimonial,.tb-media-guide{background:#fff;border:1px solid #eadfd2;border-radius:8px;padding:24px}.tb-card h3,.tb-testimonial h3{font-size:22px;line-height:1.2;margin:0 0 10px;color:#24272d}.tb-card a{color:#25282d;font-weight:900;text-decoration:none}.tb-testimonial{display:flex;flex-direction:column;gap:16px}.tb-stars{color:#a07849;font-size:17px;letter-spacing:.12em}.tb-testimonial footer{margin-top:auto;color:#454950;font-weight:900}.tb-testimonial small{display:block;margin-top:4px;color:#7a7f86;font-size:13px;line-height:1.45}.tb-media-guide{margin-top:24px}.tb-media-guide code{display:inline-block;margin:4px 6px 0 0;padding:3px 7px;border-radius:5px;background:#f7f4ef;color:#31353a;font-size:13px}.tb-facts{display:grid;grid-template-columns:1fr 1fr;gap:0;padding:0;overflow:hidden}.tb-fact{padding:20px;border-right:1px solid #eadfd2;border-bottom:1px solid #eadfd2}.tb-fact:nth-child(even){border-right:0}.tb-fact:nth-last-child(-n+2){border-bottom:0}.tb-fact dt{font-size:12px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;color:#a07849;margin:0 0 7px}.tb-fact dd{margin:0;color:#31353a;font-weight:750}.tb-map{border:0;width:100%;height:420px;display:block;filter:saturate(.88);border-radius:8px}.tb-note{background:#252529;color:#fff;padding:50px 0;text-align:center}.tb-note h2{font-size:36px;margin:0 0 10px}.tb-note p{color:#ece7df;margin:0 auto;max-width:760px}.tb-footer{background:#252529;color:#fff;padding:40px 0}.tb-footer p{color:#d8d4cf}.tb-bottom{border-top:1px solid rgba(255,255,255,.12);margin-top:28px;padding-top:18px;color:#c9c3bb;font-size:13px}@media(max-width:980px){.tb-header .tb-wrap{align-items:flex-start;flex-direction:column;padding-top:18px;padding-bottom:18px}.tb-nav{gap:16px;flex-wrap:wrap}.tb-hero-grid,.tb-two{grid-template-columns:1fr}.tb-card-grid,.tb-contact-grid,.tb-testimonial-grid,.tb-facts{grid-template-columns:1fr}.tb-fact,.tb-fact:nth-child(even),.tb-fact:nth-last-child(-n+2){border-right:0;border-bottom:1px solid #eadfd2}.tb-fact:last-child{border-bottom:0}.tb-hero h1{font-size:42px}}@media(max-width:620px){.tb-wrap{padding:0 18px}.tb-hero,.tb-section{padding:58px 0}.tb-hero h1{font-size:34px}.tb-head h2,.tb-story h2{font-size:30px}.tb-actions,.tb-btn{width:100%}.tb-map{height:340px}}\n</style>";
  const esc = function esc(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[ch]);
};
  const nav = function nav(active = '') {
  const links = [
    ['Products', 'truebase-products', 'products'],
    ['Partnership', 'truebase-partnership', 'partnership'],
    ['How It Works', 'truebase-how-it-works', 'how'],
    ['About Us', 'truebase-about-us', 'about'],
    ['Contact', 'truebase-contact', 'contact']
  ];
  return `<nav class="tb-nav">${links.map(([label, slug, key]) => `<a${active === key ? ' class="active"' : ''} href="${base}/${slug}/">${label}</a>`).join('')}</nav>`;
};
  const header = function header(active = '') {
  return `<header class="tb-header"><div class="tb-wrap"><a class="tb-logo" href="${base}/truebase-home/"><img src="${base}/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a>${nav(active)}<a class="tb-btn" href="${base}/truebase-become-a-partner/">Become a Partner</a></div></header>`;
};
  const footer = function footer() {
  return `<footer class="tb-footer"><div class="tb-wrap"><a class="tb-logo" style="color:#fff;margin-bottom:16px" href="${base}/truebase-home/"><img src="${base}/wp-content/uploads/2026/05/truebase-logo.png" alt="TrueBase logo"><span>TrueBase</span></a><p>Premium memorial solutions for professional partners.</p><div class="tb-bottom">© 2026 TrueBase. All rights reserved.</div></div></footer>`;
};
  const mediaSlot = function mediaSlot(key, className = 'tb-media', loading = 'lazy') {
  const media = mediaRegistry[key];
  if (!media) throw new Error(`Missing media registry slot: ${key}`);
  const mark = media.label ? `<span class="tb-mark">${esc(media.label)}</span>` : '';
  const content = media.type === 'video'
    ? `<video ${media.autoplay ? 'autoplay muted loop playsinline' : 'controls playsinline'} ${media.poster ? `poster="${esc(media.poster)}"` : ''} preload="metadata"><source src="${esc(media.src)}" type="${esc(media.mime || 'video/mp4')}"></video>`
    : `<img src="${esc(media.src)}" alt="${esc(media.alt)}" loading="${loading}">`;
  return `<div class="${className}" data-tb-media-slot="${esc(key)}">${content}${mark}</div>`;
};
  const mediaRegistryMarkup = function mediaRegistryMarkup() {
  const json = JSON.stringify(mediaRegistry).replace(/</g, '\\u003c');
  return `<!-- TRUEBASE_MEDIA_REGISTRY: To quickly replace page images or videos, edit the JSON in this script. Each slot supports type=image or type=video, src, alt, label, poster, mime, and autoplay. --><script id="TRUEBASE_MEDIA_REGISTRY" type="application/json">${json}</script><script id="TRUEBASE_MEDIA_LOADER">(function(){function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]})}function apply(){var el=document.getElementById('TRUEBASE_MEDIA_REGISTRY');if(!el)return;var registry={};try{registry=JSON.parse(el.textContent||'{}')}catch(e){return}document.querySelectorAll('[data-tb-media-slot]').forEach(function(box){var key=box.getAttribute('data-tb-media-slot');var item=registry[key];if(!item||!item.src)return;var current=box.querySelector('img,video');var html=item.type==='video'?'<video '+(item.autoplay?'autoplay muted loop playsinline':'controls playsinline')+' '+(item.poster?'poster="'+esc(item.poster)+'"':'')+' preload="metadata"><source src="'+esc(item.src)+'" type="'+esc(item.mime||'video/mp4')+'"></video>':'<img src="'+esc(item.src)+'" alt="'+esc(item.alt||'')+'" loading="lazy">';if(!current||current.getAttribute('src')!==item.src){if(current)current.outerHTML=html;else box.insertAdjacentHTML('afterbegin',html)}var mark=box.querySelector('.tb-mark');if(mark&&item.label)mark.textContent=item.label})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();})();</script>`;
};
  const pageContent = function aboutContent() {
  const mapQuery = encodeURIComponent(company.address);
  const facts = [
    ['Company name', company.name],
    ['Entity type', company.type],
    ['Filing date', company.filed],
    ['Original ID', company.originalId],
    ['Principal office / mailing address', company.address]
  ].map(([k, v]) => `<div class="tb-fact"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

  const schema = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Us',
    url: `${base}/truebase-about-us/`,
    mainEntity: {
      '@type': 'Organization',
      name: company.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '30 N Gould St Ste N',
        addressLocality: 'Sheridan',
        addressRegion: 'WY',
        postalCode: '82801',
        addressCountry: 'US'
      },
      founder: { '@type': 'Person', name: 'Joey' }
    }
  })}</script>`;

  const testimonials = [
    {
      title: 'Thoughtful aftercare presentation',
      quote: 'TrueBase helped us think through a calmer memorial product offer for families, with product choices that feel respectful rather than transactional.',
      person: 'Veterinary clinic partner',
      detail: 'Aftercare and keepsake program'
    },
    {
      title: 'Reliable sample and catalog support',
      quote: 'The product direction, sample planning, and packaging discussion made it easier for our team to evaluate which memorial categories fit our channel.',
      person: 'Retail sourcing partner',
      detail: 'Pet memorial product selection'
    },
    {
      title: 'Custom-ready product thinking',
      quote: 'We value that TrueBase talks about engraving, packaging, material options, and buyer presentation together, not as separate afterthoughts.',
      person: 'Private-label buyer',
      detail: 'OEM and customization review'
    }
  ].map(item => `<article class="tb-testimonial"><div class="tb-stars" aria-label="5 out of 5 stars">*****</div><h3>${esc(item.title)}</h3><p>${esc(item.quote)}</p><footer>${esc(item.person)}<small>${esc(item.detail)}</small></footer></article>`).join('');

  return css + mediaRegistryMarkup() + `<div class="tb-page">${header('about')}<main>` +
    `<section class="tb-hero"><div class="tb-wrap tb-hero-grid"><div><span class="tb-label">About Us</span><h1>Made for people who remember with love.</h1><p>TrueBase began from a very personal place: the wish to keep the small, everyday moments with a pet from quietly disappearing. We believe love is not only remembered at the end. It is built through daily walks, waiting at the door, shared routines, and years of care.</p><div class="tb-actions"><a class="tb-btn" href="${base}/truebase-products/">View Products</a><a class="tb-btn tb-btn-outline" href="${base}/truebase-contact/">Contact Us</a></div></div>${mediaSlot('about.hero', 'tb-media portrait', 'eager')}</div></section>` +
    `<section class="tb-section tb-cream"><div class="tb-wrap tb-two"><div class="tb-story"><span class="tb-label">Our beginning</span><h2>A company born from learning how pets become family</h2><p>Joey, the founder of TrueBase, was not always a natural pet person. When he was young, he was even afraid of dogs. The change came slowly. About ten years ago, a close friend began raising a Bichon, and Joey often helped take care of it. Feeding, walking, waiting, cleaning, and simply being present changed the way he understood animals.</p><p>Later, Joey brought home his own corgi, Life, when Life was only three months old. Life is now about two and a half years old. Raising him made companionship feel less like an idea and more like a daily promise: to notice, to care, and to remember.</p><p>When his friend's Bichon reached the last stage of life, Joey felt how quickly time gathers into memory. A pet can be beside us every day for years, and then suddenly every photo, paw print, collar, and small habit becomes precious. TrueBase was created from that feeling.</p><div class="tb-quote">TrueBase exists to help pet owners turn ordinary days into lasting remembrance, while the love is still close and after the goodbye has come.</div></div>${mediaSlot('about.origin', 'tb-media portrait')}</div></section>` +
    `<section class="tb-section tb-white"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">What we want to do</span><h2>Keep memory close, with dignity and warmth</h2><p>TrueBase creates and sources pet memorial products for people who want to honor a real relationship, not just buy an object. We focus on keepsakes, urns, frames, memory boxes, jewelry, candles, garden markers, and customized remembrance products that can hold a name, a photo, a date, a paw print, or a story.</p><p>For families, we hope these products bring comfort. For clinics, stores, and memorial service partners, we hope they make it easier to offer thoughtful aftercare with sincerity, quality, and respect.</p></div></div></section>` +
    `<section class="tb-section tb-white"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Our purpose</span><h2>What TrueBase stands for</h2><p>We make and source thoughtful pet memorial products for owners, clinics, stores, and professional partners who care about memory as much as merchandise.</p></div><div class="tb-card-grid"><article class="tb-card"><h3>Companionship</h3><p>Pets grow with us. We build products that respect the bond between people and animals.</p></article><article class="tb-card"><h3>Memory</h3><p>Photos, names, paw prints, collars, and everyday stories deserve a place to stay.</p></article><article class="tb-card"><h3>Care</h3><p>Our work is quiet, practical, and sincere: helping families and partners handle remembrance with dignity.</p></article></div></div></section>` +
    `<section class="tb-section tb-cream"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Partner feedback</span><h2>What partners value about working with TrueBase</h2><p>This section is ready for real client reviews, partner quotes, or short testimonials from clinics, retailers, distributors, and private-label buyers.</p></div><div class="tb-two"><div class="tb-testimonial-grid">${testimonials}</div>${mediaSlot('about.feedback', 'tb-media')}</div></div></section>` +
    `<section class="tb-section tb-cream"><div class="tb-wrap tb-two"><div><div class="tb-head"><span class="tb-label">Company information</span><h2>Registered company details</h2><p>Truebase Holding LLC is registered as a Wyoming Limited Liability Company. The information below is based on the company's Wyoming Articles of Organization.</p></div><dl class="tb-facts">${facts}</dl></div><div><iframe class="tb-map" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${mapQuery}&output=embed" title="Truebase Holding LLC address map"></iframe></div></div></section>` +
    `<section class="tb-section tb-white"><div class="tb-wrap"><div class="tb-head"><span class="tb-label">Contact</span><h2>Talk with TrueBase</h2><p>Questions about memorial products, partnership models, sample kits, or custom packaging can start here.</p></div><div class="tb-contact-grid"><article class="tb-card"><h3>Email</h3><p><a href="mailto:partner@truebaseholding.com">partner@truebaseholding.com</a></p></article><article class="tb-card"><h3>Phone</h3><p><a href="tel:+16264527696">+1 626 452 7696</a></p></article><article class="tb-card"><h3>Address</h3><p>${esc(company.address)}</p></article></div><div class="tb-actions"><a class="tb-btn" href="${base}/truebase-contact/">Open Contact Page</a><a class="tb-btn tb-btn-outline" href="${base}/truebase-become-a-partner/">Become a Partner</a></div></div></section>` +
    `<section class="tb-note"><div class="tb-wrap"><h2>Our vision</h2><p>TrueBase hopes to become a trusted home for pet memory: a place where owners and professional partners can preserve love, tell the story of a life shared, and turn daily moments into lasting keepsakes.</p><div class="tb-actions" style="justify-content:center"><a class="tb-btn" href="${base}/truebase-become-a-partner/">Become a Partner</a><a class="tb-btn tb-btn-outline" style="color:#fff!important;border-color:rgba(255,255,255,.35)" href="${base}/truebase-contact/">Contact TrueBase</a></div></div></section>` +
    schema + `</main>${footer()}</div>`;
};
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
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\s*[:=]\s*["']([a-z0-9]+)["']/i, /rest_nonce["']?\s*[:=]\s*["']([a-z0-9]+)["']/i, /"RestNonce":"([a-z0-9]+)"/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error("Could not find REST nonce");
  }
  function activeForSlug(slug) {
    if (slug === "truebase-products" || slug === "truebase-request-catalog" || slug === "truebase-request-samples-quote") return "products";
    if (slug === "truebase-partnership" || slug === "truebase-become-a-partner") return "partnership";
    if (slug === "truebase-about-us") return "about";
    if (slug === "truebase-how-it-works") return "how";
    if (slug === "truebase-contact") return "contact";
    return "";
  }
  function replaceNav(content, slug) {
    const updatedNav = nav(activeForSlug(slug));
    return content.replace(/<nav class="tb-nav">[\s\S]*?<\/nav>/, updatedNav);
  }
  const nonce = getNonce();
  const content = pageContent();
  const existing = request("GET", base + "/wp-json/wp/v2/pages?slug=truebase-about-us&context=edit", undefined, {"X-WP-Nonce": nonce});
  const page = existing.json && existing.json[0];
  const body = JSON.stringify({
    title: "About Us",
    slug: "truebase-about-us",
    status: "publish",
    content,
    excerpt: "Learn the story behind TrueBase, founded by Joey and inspired by Life the corgi, companionship, memory, and pet remembrance."
  });
  const saved = page
    ? request("POST", base + "/wp-json/wp/v2/pages/" + page.id, body, {"Content-Type":"application/json","X-WP-Nonce":nonce})
    : request("POST", base + "/wp-json/wp/v2/pages", body, {"Content-Type":"application/json","X-WP-Nonce":nonce});

  const slugs = ["truebase-home","truebase-products","truebase-partnership","truebase-how-it-works","truebase-contact","truebase-become-a-partner","truebase-request-catalog","truebase-request-samples-quote"];
  const navUpdates = [];
  for (const slug of slugs) {
    const res = request("GET", base + "/wp-json/wp/v2/pages?slug=" + slug + "&context=edit", undefined, {"X-WP-Nonce": nonce});
    const p = res.json && res.json[0];
    if (!p || !p.content) continue;
    const raw = p.content.raw || p.content.rendered || "";
    if (!/<nav class="tb-nav">/.test(raw)) continue;
    const next = replaceNav(raw, slug);
    if (next === raw) continue;
    const upd = request("POST", base + "/wp-json/wp/v2/pages/" + p.id, JSON.stringify({ content: next }), {"Content-Type":"application/json","X-WP-Nonce":nonce});
    navUpdates.push({ slug, ok: upd.ok, status: upd.status });
  }
  request("GET", base + "/truebase-about-us/?epc_purge_single=1");
  return JSON.stringify({ ok: saved.ok, status: saved.status, link: saved.json && saved.json.link, mediaSlots: Object.keys(mediaRegistry), navUpdates, error: saved.ok ? null : saved.text.slice(0, 500) }, null, 2);
})();