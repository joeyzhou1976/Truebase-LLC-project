(() => {
  const partnerImage = 'https://images.pexels.com/photos/8470832/pexels-photo-8470832.jpeg?auto=compress&cs=tinysrgb&w=1400';
  const partnerAlt = 'TrueBase partnership handshake and collaboration meeting';

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
    if (typeof wpApiSettings !== 'undefined' && wpApiSettings.nonce) return wpApiSettings.nonce;
    const admin = request('GET', '/wp-admin/post-new.php?post_type=page');
    const html = admin.text || '';
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i, /"nonce":"([a-f0-9]+)"/i, /rest_nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error('Could not find REST nonce');
  }

  const nonce = getNonce();
  const pages = request('GET', '/wp-json/wp/v2/pages?slug=truebase-partnership&context=edit', undefined, {
    'X-WP-Nonce': nonce
  });
  const page = pages.json && pages.json[0];
  if (!page) {
    return JSON.stringify({ ok: false, error: 'Page not found for slug truebase-partnership' });
  }

  let content = page.content && page.content.raw ? page.content.raw : page.content.rendered;
  const doc = new DOMParser().parseFromString(content, 'text/html');
  const logoSrc = 'https://truebaseholding.com/wp-content/uploads/2026/05/truebase-logo.png';
  const logoImg = [...doc.querySelectorAll('img')].find(image => {
    const alt = image.getAttribute('alt') || '';
    const parent = image.closest('.tb-logo');
    return parent || /logo/i.test(alt);
  }) || doc.querySelector('header img');
  if (logoImg) {
    logoImg.setAttribute('src', logoSrc);
    logoImg.setAttribute('alt', 'TrueBase logo');
  }

  const img = [...doc.querySelectorAll('.tb-hero img, .tb-media img, img')].find(image => {
    const src = image.getAttribute('src') || '';
    const alt = image.getAttribute('alt') || '';
    return !/truebase-logo|logo/i.test(src + ' ' + alt);
  });
  if (!img) {
    return JSON.stringify({ ok: false, id: page.id, error: 'No image found in page content' });
  }

  const oldSrc = img.getAttribute('src');
  img.setAttribute('src', partnerImage);
  img.setAttribute('alt', partnerAlt);
  img.setAttribute('loading', 'eager');
  content = doc.body.innerHTML;

  const update = request('POST', `/wp-json/wp/v2/pages/${page.id}`, JSON.stringify({
    content,
    excerpt: 'TrueBase partnership programs for collaborative memorial product sourcing, private label planning, and professional aftercare support.'
  }), {
    'Content-Type': 'application/json',
    'X-WP-Nonce': nonce
  });
  request('GET', '/truebase-partnership/?epc_purge_single=1');

  return JSON.stringify({
    ok: update.ok,
    status: update.status,
    id: page.id,
    oldSrc,
    newSrc: partnerImage,
    link: update.json && update.json.link,
    error: update.ok ? null : update.text.slice(0, 500)
  });
})();
