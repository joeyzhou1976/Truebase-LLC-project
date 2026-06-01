(() => {
  const base = 'https://truebaseholding.com';
  const slugs = ['truebase-contact', 'truebase-request-samples-quote', 'truebase-request-catalog', 'truebase-become-a-partner'];
  function request(method, url, body, headers = {}) {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    for (const [k, v] of Object.entries(headers)) x.setRequestHeader(k, v);
    x.send(body === undefined ? null : body);
    let json = null;
    try { json = JSON.parse(x.responseText); } catch (_) {}
    return { status: x.status, text: x.responseText, json };
  }
  function getNonce() {
    if (typeof wpApiSettings !== 'undefined' && wpApiSettings.nonce) return wpApiSettings.nonce;
    const admin = request('GET', base + '/wp-admin/post-new.php?post_type=page');
    const html = admin.text || '';
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i, /"nonce":"([a-f0-9]+)"/i, /rest_nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
  }
  const nonce = getNonce();
  const out = {};
  for (const slug of slugs) {
    const res = request('GET', base + '/wp-json/wp/v2/pages?slug=' + slug + '&context=edit', undefined, { 'X-WP-Nonce': nonce });
    const page = res.json && res.json[0];
    const raw = page && page.content && page.content.raw || '';
    out[slug] = {
      status: res.status,
      hasPartnerRecipient: /partner@truebaseholding\.com/.test(raw),
      hasGmailRecipient: /joeyzhou1976@gmail\.com/.test(raw),
      contactFormOpen: (raw.match(/\[contact-form[^\]]+\]/) || [])[0]
    };
  }
  return JSON.stringify(out, null, 2);
})();
