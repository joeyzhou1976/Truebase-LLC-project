(() => {
  function request(method, url, body, headers = {}) {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    for (const [k, v] of Object.entries(headers)) x.setRequestHeader(k, v);
    x.send(body === undefined ? null : body);
    let json = null;
    try { json = JSON.parse(x.responseText); } catch (_) {}
    return { status: x.status, json, text: x.responseText };
  }

  const publicPage = request('GET', '/wp-json/wp/v2/pages?slug=truebase-become-a-partner');
  const page = publicPage.json && publicPage.json[0];
  const html = page && page.content && page.content.rendered || '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const liveImages = [...document.querySelectorAll('.tb-page img')].map((img, i) => ({
    i,
    src: img.currentSrc || img.src,
    alt: img.alt,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight
  }));

  return JSON.stringify({
    href: location.href,
    apiStatus: publicPage.status,
    pageId: page && page.id,
    liveHasPage: !!document.querySelector('.tb-page'),
    liveTitle: document.querySelector('.tb-hero h1') && document.querySelector('.tb-hero h1').textContent.trim(),
    liveForm: !!document.querySelector('form'),
    liveInputs: document.querySelectorAll('form input, form textarea, form select').length,
    liveButtons: [...document.querySelectorAll('.tb-btn, button')].map(btn => btn.textContent.trim()).filter(Boolean),
    liveImages,
    publicImageCount: doc.querySelectorAll('img').length,
    publicHasSupplyImage: /truebase-supply/.test(html),
    publicHasPartnerImage: /8470832/.test(html),
    publicFormCount: doc.querySelectorAll('form').length,
    publicInputCount: doc.querySelectorAll('input, textarea, select').length
  });
})();
