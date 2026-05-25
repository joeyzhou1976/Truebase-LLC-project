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

  const products = request('GET', '/wp-json/wp/v2/pages/86');
  const partner = request('GET', '/wp-json/wp/v2/pages?slug=truebase-become-a-partner');
  const productsHtml = products.json && products.json.content && (products.json.content.raw || products.json.content.rendered) || '';
  const partnerPage = partner.json && partner.json[0];
  const partnerHtml = partnerPage && partnerPage.content && (partnerPage.content.raw || partnerPage.content.rendered) || '';
  const productDoc = new DOMParser().parseFromString(productsHtml, 'text/html');
  const partnerDoc = new DOMParser().parseFromString(partnerHtml, 'text/html');
  const productCards = [...productDoc.querySelectorAll('.tb-card')];
  const productButtons = productCards.map(card => (card.querySelector('.tb-btn') || {}).textContent || '');
  const productHero = document.querySelector('.tb-hero img') || productDoc.querySelector('.tb-hero img');
  const partnerImages = [...partnerDoc.querySelectorAll('img')].map(img => ({
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt')
  }));
  const partnerHero = partnerImages.find(img => /8470832/.test(img.src || '')) || partnerImages.find(img => /supply|partner|collaboration|handshake/i.test((img.src || '') + ' ' + (img.alt || ''))) || partnerImages[0];

  return JSON.stringify({
    href: location.href,
    liveImages: [...document.querySelectorAll('.tb-page img')].map((img, i) => ({
      i,
      src: img.currentSrc || img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    })),
    products: {
      status: products.status,
      heroSrc: productHero && productHero.getAttribute('src'),
      liveSpecBlocks: document.querySelectorAll('.tb-spec').length,
      liveSpecTables: document.querySelectorAll('.tb-spec-table').length,
      liveSpecRows: document.querySelectorAll('.tb-spec-table tr').length,
      liveProductSections: document.querySelectorAll('.tb-product').length,
      liveCardButtons: [...document.querySelectorAll('.tb-card .tb-btn')].map(btn => btn.textContent.trim()),
      specBlocks: productDoc.querySelectorAll('.tb-spec').length,
      productSections: productDoc.querySelectorAll('.tb-product').length,
      cardCount: productCards.length,
      cardButtons: productButtons,
      lastCardButton: productButtons[productButtons.length - 1] || null
    },
    partner: {
      status: partner.status,
      id: partnerPage && partnerPage.id,
      heroSrc: partnerHero && partnerHero.src,
      heroAlt: partnerHero && partnerHero.alt,
      hasNewPartnerImage: /8470832/.test(partnerHtml)
    }
  });
})();
