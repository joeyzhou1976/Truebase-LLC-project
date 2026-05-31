(() => {
  window.scrollTo(0, 0);
  const text = document.body ? document.body.innerText : '';
  const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  const jsonLdProducts = jsonLdScripts.reduce((count, script) => {
    try {
      const data = JSON.parse(script.textContent);
      const entities = Array.isArray(data.mainEntity) ? data.mainEntity : [];
      return count + entities.filter(entity => entity && entity['@type'] === 'Product').length;
    } catch (_) {
      return count;
    }
  }, 0);
  const galleries = Array.from(document.querySelectorAll('.tb-product')).map(product => ({
    id: product.id,
    title: product.querySelector('h3') && product.querySelector('h3').textContent.trim(),
    detailImages: product.querySelectorAll('.tb-detail-gallery img').length,
    hasSceneImage: !!product.querySelector('.tb-product-media > img')
  }));
  const expectedDetailCounts = { boxes: 3, jewelry: 2, glass: 5, garden: 1 };
  const detailCountMismatches = galleries
    .filter(item => Object.prototype.hasOwnProperty.call(expectedDetailCounts, item.id))
    .filter(item => item.detailImages !== expectedDetailCounts[item.id])
    .map(item => ({ id: item.id, expected: expectedDetailCounts[item.id], actual: item.detailImages }));
  return JSON.stringify({
    href: location.href,
    title: document.title,
    h1: document.querySelector('h1') && document.querySelector('h1').textContent.trim(),
    tbPages: document.querySelectorAll('.tb-page').length,
    hasTrueBaseHeader: !!document.querySelector('.tb-header .tb-logo'),
    hasPrototypeHeader: !!document.querySelector('.topbar .brand, .site-shell, .catalog-shell'),
    productSections: document.querySelectorAll('.tb-product').length,
    overviewCards: (document.querySelector('.tb-card-grid') && document.querySelector('.tb-card-grid').querySelectorAll('.tb-card').length) || 0,
    detailGalleries: document.querySelectorAll('.tb-detail-gallery').length,
    galleryDetailCounts: galleries,
    detailCountMismatches,
    forbiddenSupplementText: /New product supplements|Attachment products added|Attachment products/i.test(text),
    duplicateStandaloneProducts: Array.from(document.querySelectorAll('.tb-product h3'))
      .filter(el => /Tree of Life|Rainbow Paw|Rotating Wooden|Outdoor Resin|Stainless Steel|Sealed Aluminum|Transparent Dog|Transparent Cat/i.test(el.textContent))
      .map(el => el.textContent.trim()),
    images: document.images.length,
    brokenImages: Array.from(document.images)
      .filter(img => img.currentSrc && img.complete && img.naturalWidth === 0)
      .map(img => img.alt || img.currentSrc)
      .slice(0, 30),
    notLoaded: Array.from(document.images)
      .filter(img => !img.complete)
      .map(img => img.alt || img.src)
      .slice(0, 30),
    metaDescription: document.querySelector('meta[name="description"]') && document.querySelector('meta[name="description"]').content,
    canonical: document.querySelector('link[rel="canonical"]') && document.querySelector('link[rel="canonical"]').href,
    jsonLdProducts
  }, null, 2);
})();
