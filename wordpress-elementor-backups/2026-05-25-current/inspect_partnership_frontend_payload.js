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

  const publicPage = request('GET', '/wp-json/wp/v2/pages/88');
  const html = publicPage.json && publicPage.json.content && publicPage.json.content.rendered || '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const liveRoot = document.querySelector('.tb-page');
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
    hasPage: !!liveRoot,
    title: document.querySelector('.tb-hero h1') && document.querySelector('.tb-hero h1').textContent.trim(),
    activeNav: document.querySelector('.tb-nav a.active') && document.querySelector('.tb-nav a.active').textContent.trim(),
    modelCards: document.querySelectorAll('.tb-model').length,
    tableRows: document.querySelectorAll('.tb-table .tb-row').length,
    ctaButtons: [...document.querySelectorAll('.tb-note .tb-btn')].map(btn => btn.textContent.trim()),
    liveImages,
    publicImageCount: doc.querySelectorAll('img').length,
    publicHasSupplyImage: /truebase-supply/.test(html),
    publicHasNewHero: /8470832/.test(html)
  });
})();
