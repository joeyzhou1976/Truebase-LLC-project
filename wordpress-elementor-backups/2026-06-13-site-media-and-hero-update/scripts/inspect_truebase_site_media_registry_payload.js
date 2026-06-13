(() => {
  const base = "https://truebaseholding.com";
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

  function request(url) {
    const x = new XMLHttpRequest();
    x.open("GET", url, false);
    x.send(null);
    return { status: x.status, text: x.responseText || "" };
  }

  const results = {};
  for (const slug of slugs) {
    const page = request(base + "/" + slug + "/?epc_purge_single=1");
    const doc = new DOMParser().parseFromString(page.text, "text/html");
    const registry = doc.querySelector("#TRUEBASE_SITE_MEDIA_REGISTRY");
    let registryKeys = [];
    try {
      registryKeys = Object.keys(JSON.parse(registry ? registry.textContent : "{}"));
    } catch (_) {}
    results[slug] = {
      status: page.status,
      hasSiteRegistry: !!registry,
      hasSiteLoader: !!doc.querySelector("#TRUEBASE_SITE_MEDIA_LOADER"),
      oldPageRegistry: !!doc.querySelector("#TRUEBASE_MEDIA_REGISTRY"),
      slotCount: doc.querySelectorAll("[data-tb-media-slot]").length,
      registryCount: registryKeys.length,
      testimonialCount: doc.querySelectorAll(".tb-testimonial").length,
      sampleKeys: registryKeys.slice(0, 6)
    };
  }

  return JSON.stringify(results, null, 2);
})();
