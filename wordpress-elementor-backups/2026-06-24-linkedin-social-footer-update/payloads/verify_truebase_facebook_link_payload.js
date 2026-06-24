(() => {
  const FB_URL = "https://www.facebook.com/profile.php?id=61590923424711";
  const base = "https://truebaseholding.com";
  const slugs = [
    "truebase-home",
    "truebase-products",
    "truebase-partnership",
    "truebase-how-it-works",
    "truebase-contact",
    "truebase-become-a-partner",
    "truebase-request-catalog",
    "truebase-request-samples-quote",
    "truebase-about-us"
  ];

  function request(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return { status: xhr.status, text: xhr.responseText };
  }

  const results = slugs.map(slug => {
    const api = request(`${base}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&per_page=1&_=${Date.now()}`);
    let rawHasLink = false;
    try {
      const page = JSON.parse(api.text)[0];
      rawHasLink = !!(page && page.content && page.content.rendered && page.content.rendered.includes(FB_URL));
    } catch (_) {}
    return { slug, apiStatus: api.status, rawHasLink };
  });

  return JSON.stringify({ ok: results.every(r => r.rawHasLink), results }, null, 2);
})();
