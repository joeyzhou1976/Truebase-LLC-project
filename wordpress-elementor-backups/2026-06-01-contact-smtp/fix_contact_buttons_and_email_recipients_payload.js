(() => {
  const base = 'https://truebaseholding.com';
  const recipients = 'partner@truebaseholding.com, joeyzhou1976@gmail.com';
  const subjects = {
    'truebase-contact': 'TrueBase website contact request',
    'truebase-request-samples-quote': 'TrueBase sample or quote request',
    'truebase-request-catalog': 'TrueBase catalog request',
    'truebase-become-a-partner': 'TrueBase partner application'
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
    if (typeof wpApiSettings !== 'undefined' && wpApiSettings.nonce) return wpApiSettings.nonce;
    const admin = request('GET', base + '/wp-admin/post-new.php?post_type=page');
    const html = admin.text || '';
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i, /"nonce":"([a-f0-9]+)"/i, /rest_nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error('Could not find WordPress REST nonce');
  }
  const nonce = getNonce();
  const slugs = Object.keys(subjects);
  const results = {};
  for (const slug of slugs) {
    const fetch = request('GET', base + '/wp-json/wp/v2/pages?slug=' + slug + '&context=edit', undefined, { 'X-WP-Nonce': nonce });
    const page = fetch.json && fetch.json[0];
    if (!page) {
      results[slug] = { ok: false, status: fetch.status, error: 'Page not found' };
      continue;
    }
    let content = page.content.raw || '';
    const before = content;
    content = content.replace(/\[contact-form\s+to="[^"]*"\s+subject="([^"]*)"\]/gi, (match, subject) => {
      return `[contact-form to="${recipients}" subject="${subject || subjects[slug]}"]`;
    });
    content = content.replace(/\[contact-form\s+to='[^']*'\s+subject='([^']*)'\]/gi, (match, subject) => {
      return `[contact-form to="${recipients}" subject="${subject || subjects[slug]}"]`;
    });
    if (slug === 'truebase-contact') {
      content = content
        .replace(/href="#contact-form"/g, 'href="#tb-contact-form"')
        .replace(/href="#contact"/g, 'href="#tb-contact-form"')
        .replace(/href="mailto:partner@truebaseholding\.com"/g, 'href="#tb-contact-form"')
        .replace(/<div class="tb-server-form">/, '<div id="tb-contact-form" class="tb-server-form">')
        .replace(/<a class="tb-btn tb-btn-outline" href="[^"]*">Partner Application<\/a>/, `<a class="tb-btn tb-btn-outline" href="${base}/truebase-become-a-partner/">Partner Application</a>`)
        .replace(/<a class="tb-btn" href="[^"]*">Email Us<\/a>/, '<a class="tb-btn" href="#tb-contact-form">Email Us</a>');
    }
    const update = request('POST', base + '/wp-json/wp/v2/pages/' + page.id, JSON.stringify({ content }), {
      'X-WP-Nonce': nonce,
      'Content-Type': 'application/json'
    });
    request('GET', base + '/' + slug + '/?epc_purge_single=1');
    results[slug] = {
      ok: update.ok,
      status: update.status,
      id: page.id,
      changed: before !== content,
      hasGmailRecipient: /joeyzhou1976@gmail\.com/.test(content),
      contactButtonsFixed: slug === 'truebase-contact' ? /href="#tb-contact-form"[\s\S]*Email Us|Email Us[\s\S]*href="#tb-contact-form"/.test(content) : undefined,
      error: update.ok ? null : update.text.slice(0, 500)
    };
  }
  return JSON.stringify(results, null, 2);
})();
