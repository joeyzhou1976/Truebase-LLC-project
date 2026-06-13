(() => {
  const slugs = [
    "truebase-home",
    "truebase-products",
    "truebase-partnership",
    "truebase-how-it-works",
    "truebase-about-us",
    "truebase-contact",
    "truebase-become-a-partner",
    "truebase-request-catalog",
    "truebase-request-samples-quote"
  ];
  function get(url) {
    const x = new XMLHttpRequest();
    x.open("GET", url, false);
    x.send(null);
    return x.responseText || "";
  }
  const out = [];
  for (const slug of slugs) {
    const html = get("https://truebaseholding.com/" + slug + "/?epc_purge_single=1");
    const doc = new DOMParser().parseFromString(html, "text/html");
    const registryEl = doc.querySelector("#TRUEBASE_SITE_MEDIA_REGISTRY");
    let registry = {};
    try { registry = JSON.parse(registryEl ? registryEl.textContent : "{}"); } catch (_) {}
    for (const [key, item] of Object.entries(registry)) {
      const haystack = [key, item.src, item.alt, item.label].join(" ").toLowerCase();
      if (/craft|engraving|artisan|wood|lamp|workshop|hand/.test(haystack)) {
        const slot = doc.querySelector('[data-tb-media-slot="' + CSS.escape(key) + '"]');
        out.push({
          slug,
          key,
          src: item.src,
          alt: item.alt,
          label: item.label,
          renderedSrc: slot && (slot.matches("img") ? slot.src : (slot.querySelector("img") && slot.querySelector("img").src)),
          natural: slot && slot.querySelector("img") ? {
            width: slot.querySelector("img").naturalWidth,
            height: slot.querySelector("img").naturalHeight
          } : null
        });
      }
    }
  }
  return JSON.stringify(out, null, 2);
})();
