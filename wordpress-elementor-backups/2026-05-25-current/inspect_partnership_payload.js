(() => {
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
    const match = html.match(/"nonce":"([a-f0-9]+)"/i);
    return match && match[1];
  }
  const nonce = getNonce();
  const pages = request('GET', '/wp-json/wp/v2/pages?slug=truebase-partnership&context=edit', undefined, { 'X-WP-Nonce': nonce });
  const page = pages.json && pages.json[0];
  const content = page.content.raw || page.content.rendered;
  const doc = new DOMParser().parseFromString(content, 'text/html');
  return JSON.stringify([...doc.querySelectorAll('img')].map((img, i) => ({
    i,
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt'),
    parent: img.closest('header,section,footer,div') && img.closest('header,section,footer,div').className
  })));
})();
