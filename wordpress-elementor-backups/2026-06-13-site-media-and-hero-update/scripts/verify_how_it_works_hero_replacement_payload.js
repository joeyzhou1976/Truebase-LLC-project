(() => {
  const url = "https://truebaseholding.com/truebase-how-it-works/?epc_purge_single=1";
  const x = new XMLHttpRequest();
  x.open("GET", url, false);
  x.send(null);
  const doc = new DOMParser().parseFromString(x.responseText || "", "text/html");
  const registryEl = doc.querySelector("#TRUEBASE_SITE_MEDIA_REGISTRY");
  let registry = {};
  try { registry = JSON.parse(registryEl ? registryEl.textContent : "{}"); } catch (_) {}
  const slot = doc.querySelector('[data-tb-media-slot="truebase-how-it-works.hero"]');
  const img = slot && (slot.matches("img") ? slot : slot.querySelector("img"));
  return JSON.stringify({
    status: x.status,
    hasRegistry: !!registryEl,
    slot: "truebase-how-it-works.hero",
    registrySrc: registry["truebase-how-it-works.hero"] && registry["truebase-how-it-works.hero"].src,
    renderedSrc: img && img.getAttribute("src"),
    alt: img && img.getAttribute("alt"),
    ok: !!img && /truebase-how-it-works-hero-craft-hd-20260613\.jpg/.test((img.getAttribute("src") || "") + " " + (registry["truebase-how-it-works.hero"] && registry["truebase-how-it-works.hero"].src || ""))
  }, null, 2);
})();
