const fs = require('fs');
const path = require('path');

const root = '/Users/joeyzhou/Documents/New project';
const assetPath = path.join(root, 'truebase-site-media-assets', 'how-it-works-hero-craft-hd.jpg');
const outFile = path.join(root, 'replace_how_it_works_hero_payload.js');
const base = 'https://truebaseholding.com';

const item = {
  file: 'truebase-how-it-works-hero-craft-hd-20260613.jpg',
  title: 'TrueBase How It Works Hero Craft HD 20260613',
  alt: 'Artisan engraving a wooden pet memorial keepsake box with paw print motif',
  mime: 'image/jpeg',
  slot: 'truebase-how-it-works.hero',
  slug: 'truebase-how-it-works',
  base64: fs.readFileSync(assetPath).toString('base64'),
};

const payload = `(() => {
  const base = ${JSON.stringify(base)};
  const item = ${JSON.stringify(item)};

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
    if (typeof wpApiSettings !== "undefined" && wpApiSettings.nonce) return wpApiSettings.nonce;
    const admin = request("GET", base + "/wp-admin/index.php");
    const html = admin.text || "";
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\\s*[:=]\\s*["']([a-z0-9]+)["']/i, /rest_nonce["']?\\s*[:=]\\s*["']([a-z0-9]+)["']/i, /"RestNonce":"([a-z0-9]+)"/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error("Could not find REST nonce");
  }

  function uploadImage(nonce) {
    const search = request("GET", base + "/wp-json/wp/v2/media?search=" + encodeURIComponent(item.title) + "&per_page=20", undefined, { "X-WP-Nonce": nonce });
    const found = search.json && search.json.find(m => ((m.title && m.title.rendered) || "").includes(item.title));
    if (found) return { reused: true, id: found.id, url: found.source_url };
    const binary = atob(item.base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const uploaded = request("POST", base + "/wp-json/wp/v2/media", bytes, {
      "X-WP-Nonce": nonce,
      "Content-Type": item.mime,
      "Content-Disposition": 'attachment; filename="' + item.file + '"'
    });
    if (!uploaded.ok) throw new Error("Upload failed: " + uploaded.status + " " + uploaded.text.slice(0, 500));
    request("POST", base + "/wp-json/wp/v2/media/" + uploaded.json.id, JSON.stringify({
      title: item.title,
      alt_text: item.alt,
      caption: item.alt,
      description: item.alt
    }), {
      "X-WP-Nonce": nonce,
      "Content-Type": "application/json"
    });
    return { reused: false, id: uploaded.json.id, url: uploaded.json.source_url };
  }

  function updatePage(nonce, url) {
    const pages = request("GET", base + "/wp-json/wp/v2/pages?slug=" + item.slug + "&context=edit", undefined, { "X-WP-Nonce": nonce });
    const page = pages.json && pages.json[0];
    if (!page || !page.content) throw new Error("Page not found: " + item.slug);
    const raw = page.content.raw || page.content.rendered || "";
    const doc = new DOMParser().parseFromString('<div id="root">' + raw + '</div>', 'text/html');
    const root = doc.querySelector("#root");
    const registryEl = root.querySelector("#TRUEBASE_SITE_MEDIA_REGISTRY");
    if (!registryEl) throw new Error("Site media registry not found");
    const registry = JSON.parse(registryEl.textContent || "{}");
    registry[item.slot] = {
      ...(registry[item.slot] || {}),
      type: "image",
      src: url,
      alt: item.alt,
      label: (registry[item.slot] && registry[item.slot].label) || ""
    };
    registryEl.textContent = JSON.stringify(registry).replace(/</g, "\\\\u003c");
    const slot = root.querySelector('[data-tb-media-slot="' + item.slot + '"]');
    if (!slot) throw new Error("Media slot not found: " + item.slot);
    const img = slot.matches("img") ? slot : slot.querySelector("img");
    if (img) {
      img.setAttribute("src", url);
      img.setAttribute("alt", item.alt);
      img.removeAttribute("srcset");
      img.removeAttribute("sizes");
    } else {
      slot.insertAdjacentHTML("afterbegin", '<img src="' + url.replace(/"/g, "&quot;") + '" alt="' + item.alt.replace(/"/g, "&quot;") + '" loading="lazy">');
    }
    const updated = request("POST", base + "/wp-json/wp/v2/pages/" + page.id, JSON.stringify({ content: root.innerHTML }), {
      "X-WP-Nonce": nonce,
      "Content-Type": "application/json"
    });
    if (!updated.ok) throw new Error("Page update failed: " + updated.status + " " + updated.text.slice(0, 500));
    request("GET", base + "/" + item.slug + "/?epc_purge_single=1");
    return { pageId: page.id, status: updated.status };
  }

  try {
    const nonce = getNonce();
    const uploaded = uploadImage(nonce);
    const page = updatePage(nonce, uploaded.url);
    return JSON.stringify({ ok: true, uploaded, page, slot: item.slot, alt: item.alt }, null, 2);
  } catch (error) {
    return JSON.stringify({ ok: false, error: error && (error.stack || error.message) || String(error) }, null, 2);
  }
})();`;

fs.writeFileSync(outFile, payload);
console.log(outFile);
