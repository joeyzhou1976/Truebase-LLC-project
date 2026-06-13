const fs = require('fs');
const path = require('path');

const root = '/Users/joeyzhou/Documents/New project';
const outFile = path.join(root, 'truebase_site_media_registry_payload.js');
const base = 'https://truebaseholding.com';

const slugs = [
  'truebase-home',
  'truebase-products',
  'truebase-partnership',
  'truebase-how-it-works',
  'truebase-about-us',
  'truebase-contact',
  'truebase-become-a-partner',
  'truebase-request-catalog',
  'truebase-request-samples-quote'
];

const payload = `(() => {
  const base = ${JSON.stringify(base)};
  const slugs = ${JSON.stringify(slugs)};

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

  function escHtml(str) {
    return String(str || "").replace(/[&<>"']/g, ch => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[ch]);
  }

  function cleanContent(content) {
    return String(content || "")
      .replace(/<!-- TRUEBASE_SITE_MEDIA_REGISTRY:[\\s\\S]*?-->/g, "")
      .replace(/<script\\b[^>]*id=["']TRUEBASE_SITE_MEDIA_REGISTRY["'][\\s\\S]*?<\\/script>/gi, "")
      .replace(/<script\\b[^>]*id=["']TRUEBASE_SITE_MEDIA_LOADER["'][\\s\\S]*?<\\/script>/gi, "")
      .replace(/<style\\b[^>]*id=["']TRUEBASE_SITE_MEDIA_STYLE["'][\\s\\S]*?<\\/style>/gi, "")
      .replace(/<!-- TRUEBASE_MEDIA_REGISTRY:[\\s\\S]*?-->/g, "")
      .replace(/<script\\b[^>]*id=["']TRUEBASE_MEDIA_REGISTRY["'][\\s\\S]*?<\\/script>/gi, "")
      .replace(/<script\\b[^>]*id=["']TRUEBASE_MEDIA_LOADER["'][\\s\\S]*?<\\/script>/gi, "");
  }

  function mediaSource(node) {
    if (!node) return "";
    if (node.tagName === "IMG") return node.getAttribute("src") || "";
    if (node.tagName === "VIDEO") {
      const source = node.querySelector("source");
      return node.getAttribute("src") || (source && source.getAttribute("src")) || "";
    }
    return "";
  }

  function labelFor(node) {
    const wrap = node.closest(".tb-media,.tb-product-media,.tb-hero-imgs,.tb-product-img,.tb-detail-card,figure");
    const mark = wrap && wrap.querySelector(".tb-mark");
    if (mark) return mark.textContent.trim();
    const caption = wrap && wrap.querySelector("figcaption");
    if (caption) return caption.textContent.trim();
    return "";
  }

  function productIdFor(node) {
    const product = node.closest("article[id],section[id],.tb-category[id]");
    return product && product.getAttribute("id");
  }

  function slugPart(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/&amp;/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "media";
  }

  function slotKey(slug, node, counters) {
    const productId = productIdFor(node);
    if (node.closest(".tb-hero")) return slug + ".hero";
    if (productId && node.closest(".tb-product-media")) return slug + "." + slugPart(productId) + ".main";
    if (productId && node.closest(".tb-detail-card")) {
      const key = slug + "." + slugPart(productId) + ".detail";
      counters[key] = (counters[key] || 0) + 1;
      return key + "." + counters[key];
    }
    if (node.closest(".tb-footer")) {
      counters.footer = (counters.footer || 0) + 1;
      return slug + ".footer." + counters.footer;
    }
    const alt = node.getAttribute("alt") || labelFor(node);
    if (alt && !/truebase logo/i.test(alt)) {
      const key = slug + "." + slugPart(alt);
      counters[key] = (counters[key] || 0) + 1;
      return counters[key] === 1 ? key : key + "." + counters[key];
    }
    counters.media = (counters.media || 0) + 1;
    return slug + ".media." + counters.media;
  }

  function shouldSkip(node) {
    if (!node || !node.tagName) return true;
    if (node.closest(".tb-logo")) return true;
    const src = mediaSource(node);
    if (!src) return true;
    if (/truebase-logo/i.test(src)) return true;
    if (/data:image\\/gif/i.test(src)) return true;
    return false;
  }

  function buildLoaderMarkup(registry) {
    const json = JSON.stringify(registry).replace(/</g, "\\\\u003c");
    const loader = "(" + function() {
      function esc(str) {
        return String(str || "").replace(/[&<>"']/g, function(ch) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
          }[ch];
        });
      }
      function applyRegistry() {
        var el = document.getElementById("TRUEBASE_SITE_MEDIA_REGISTRY");
        if (!el) return;
        var registry = {};
        try {
          registry = JSON.parse(el.textContent || "{}");
        } catch (err) {
          return;
        }
        document.querySelectorAll("[data-tb-media-slot]").forEach(function(box) {
          var key = box.getAttribute("data-tb-media-slot");
          var item = registry[key];
          if (!item || !item.src) return;
          var current = box.matches("img,video") ? box : box.querySelector("img,video");
          var html = item.type === "video"
            ? '<video ' + (item.autoplay ? 'autoplay muted loop playsinline' : 'controls playsinline') + ' ' + (item.poster ? 'poster="' + esc(item.poster) + '"' : '') + ' preload="metadata"><source src="' + esc(item.src) + '" type="' + esc(item.mime || "video/mp4") + '"></video>'
            : '<img src="' + esc(item.src) + '" alt="' + esc(item.alt || "") + '" loading="lazy">';
          if (current) {
            var currentSrc = current.tagName === "IMG"
              ? current.getAttribute("src")
              : (current.getAttribute("src") || (current.querySelector("source") && current.querySelector("source").getAttribute("src")));
            if (currentSrc !== item.src) current.outerHTML = html;
          } else {
            box.insertAdjacentHTML("afterbegin", html);
          }
          var mark = box.querySelector(".tb-mark");
          if (mark && item.label) mark.textContent = item.label;
        });
      }
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyRegistry);
      else applyRegistry();
    }.toString() + ")();";
    return '<!-- TRUEBASE_SITE_MEDIA_REGISTRY: Site-wide media slots. To replace any registered image or video, edit the JSON below for that slot key. Supported fields: type=image|video, src, alt, label, poster, mime, autoplay. -->' +
      '<style id="TRUEBASE_SITE_MEDIA_STYLE">.tb-page [data-tb-media-slot] video{width:100%;height:100%;object-fit:cover;display:block}.tb-page [data-tb-media-slot] img{max-width:100%}</style>' +
      '<script id="TRUEBASE_SITE_MEDIA_REGISTRY" type="application/json">' + json + '</script>' +
      '<script id="TRUEBASE_SITE_MEDIA_LOADER">' + loader.replace(/<\\/script/gi, "<\\\\/script") + '</script>';
  }

  function processContent(slug, content) {
    const cleaned = cleanContent(content);
    const doc = new DOMParser().parseFromString('<div id="root">' + cleaned + '</div>', 'text/html');
    const registry = {};
    const counters = {};
    Array.from(doc.querySelectorAll(".tb-page img,.tb-page video")).forEach(node => {
      if (shouldSkip(node)) return;
      const existing = node.getAttribute("data-tb-media-slot") || (node.parentElement && node.parentElement.getAttribute("data-tb-media-slot"));
      const key = existing || slotKey(slug, node, counters);
      const item = {
        type: node.tagName === "VIDEO" ? "video" : "image",
        src: mediaSource(node),
        alt: node.getAttribute("alt") || "",
        label: labelFor(node)
      };
      if (node.tagName === "VIDEO") {
        item.poster = node.getAttribute("poster") || "";
        const source = node.querySelector("source");
        item.mime = source && source.getAttribute("type") || "video/mp4";
        item.autoplay = node.hasAttribute("autoplay");
      }
      registry[key] = item;
      const wrap = node.closest(".tb-media,.tb-product-media,.tb-product-img,.tb-detail-card,figure");
      if (wrap && !wrap.matches("img,video")) wrap.setAttribute("data-tb-media-slot", key);
      else node.setAttribute("data-tb-media-slot", key);
    });
    const root = doc.querySelector("#root");
    const markup = buildLoaderMarkup(registry);
    const firstPage = root.querySelector(".tb-page");
    if (firstPage) firstPage.insertAdjacentHTML("beforebegin", markup);
    else root.insertAdjacentHTML("afterbegin", markup);
    return { content: root.innerHTML, count: Object.keys(registry).length, keys: Object.keys(registry) };
  }

  const nonce = getNonce();
  const results = [];
  for (const slug of slugs) {
    const fetched = request("GET", base + "/wp-json/wp/v2/pages?slug=" + slug + "&context=edit", undefined, { "X-WP-Nonce": nonce });
    const page = fetched.json && fetched.json[0];
    if (!page || !page.content) {
      results.push({ slug, ok: false, status: fetched.status, error: "Page not found or no editable content" });
      continue;
    }
    const raw = page.content.raw || page.content.rendered || "";
    if (!/tb-page/.test(raw)) {
      results.push({ slug, ok: true, skipped: true, reason: "No tb-page content" });
      continue;
    }
    const processed = processContent(slug, raw);
    const updated = request("POST", base + "/wp-json/wp/v2/pages/" + page.id, JSON.stringify({ content: processed.content }), {
      "Content-Type": "application/json",
      "X-WP-Nonce": nonce
    });
    request("GET", base + "/" + slug + "/?epc_purge_single=1");
    results.push({ slug, ok: updated.ok, status: updated.status, mediaSlots: processed.count, sampleKeys: processed.keys.slice(0, 8), error: updated.ok ? null : updated.text.slice(0, 500) });
  }

  return JSON.stringify({ ok: results.every(r => r.ok), results }, null, 2);
})();`;

fs.writeFileSync(outFile, payload);
console.log(outFile);
