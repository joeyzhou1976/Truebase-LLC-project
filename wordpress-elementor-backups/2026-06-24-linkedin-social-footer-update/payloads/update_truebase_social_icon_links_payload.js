(() => {
  const FB_URL = "https://www.facebook.com/profile.php?id=61590923424711";
  const LI_URL = "https://www.linkedin.com/company/truebase-holding/?viewAsMember=true";
  const base = "https://truebaseholding.com";

  const socialBlock = `<div class="tb-social-links" aria-label="TrueBase social media links" style="display:flex;gap:10px;margin-top:16px"><a class="tb-social-link" href="${FB_URL}" target="_blank" rel="noopener" aria-label="TrueBase on Facebook" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(255,255,255,.08);color:#fff!important;text-decoration:none;font-size:20px;font-weight:900;line-height:1">f</a><a class="tb-social-link tb-social-link--linkedin" href="${LI_URL}" target="_blank" rel="noopener" aria-label="TrueBase on LinkedIn" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(255,255,255,.08);color:#fff!important;text-decoration:none;font-size:15px;font-weight:900;line-height:1;letter-spacing:-.04em">in</a></div>`;

  function request(method, url, body, headers = {}) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    if (body && typeof body !== "string") body = JSON.stringify(body);
    xhr.send(body || null);
    let json = null;
    try { json = JSON.parse(xhr.responseText); } catch (_) {}
    return { ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status, text: xhr.responseText, json };
  }

  function nonceCandidates() {
    const html = document.documentElement.innerHTML;
    const candidates = [];
    if (typeof wpApiSettings !== "undefined" && wpApiSettings.nonce) candidates.push(wpApiSettings.nonce);
    const patterns = [
      /wpApiSettings\s*=\s*(\{[\s\S]*?\});/g,
      /"nonce"\s*:\s*"([A-Za-z0-9_-]{8,})"/g,
      /'nonce'\s*:\s*'([A-Za-z0-9_-]{8,})'/g,
      /"restNonce"\s*:\s*"([A-Za-z0-9_-]{8,})"/g,
      /"X-WP-Nonce"\s*:\s*"([A-Za-z0-9_-]{8,})"/g
    ];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html))) {
        if (match[1] && match[1].startsWith("{")) {
          try {
            const parsed = JSON.parse(match[1]);
            if (parsed.nonce) candidates.push(parsed.nonce);
          } catch (_) {}
        } else if (match[1]) {
          candidates.push(match[1]);
        }
      }
    }
    return [...new Set(candidates)];
  }

  function findRestNonce() {
    const tried = [];
    for (const nonce of nonceCandidates()) {
      const probe = request("GET", `${base}/wp-json/wp/v2/pages?per_page=1&context=edit`, null, { "X-WP-Nonce": nonce });
      tried.push({ nonce, status: probe.status });
      if (probe.ok) return { nonce, tried };
    }
    return { nonce: null, tried };
  }

  function normalizeSocialLinks(content) {
    if (!content) return content;
    let next = content;

    // Remove earlier text-link social blocks and any prior generated icon block.
    next = next.replace(/<p class="tb-social">[\s\S]*?<\/p>/g, "");
    next = next.replace(/<div class="tb-social-links"[\s\S]*?<\/div>/g, "");
    next = next.replace(new RegExp(`<a[^>]+href="${FB_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>\\s*Facebook\\s*<\\/a>`, "g"), "");
    next = next.replace(new RegExp(`<a[^>]+href="${LI_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>\\s*(LinkedIn|in)\\s*<\\/a>`, "g"), "");

    const contactPhone = "<p>+1 626 452 7696<br>Mon - Fri 09:00 - 18:00 CST</p>";
    if (next.includes(contactPhone)) {
      return next.replace(contactPhone, `${contactPhone}${socialBlock}`);
    }

    const footerText = "<p>Premium memorial solutions for professional partners.</p>";
    if (next.includes(footerText)) {
      return next.replace(footerText, `${footerText}${socialBlock}`);
    }

    const emailText = "<p>partner@truebaseholding.com</p>";
    if (next.includes(emailText)) {
      return next.replace(emailText, `${emailText}${socialBlock}`);
    }

    return next;
  }

  const { nonce, tried } = findRestNonce();
  if (!nonce) {
    return JSON.stringify({ ok: false, reason: "Could not find a usable REST nonce.", tried }, null, 2);
  }

  const pages = request("GET", `${base}/wp-json/wp/v2/pages?per_page=100&context=edit`, null, { "X-WP-Nonce": nonce });
  if (!pages.ok) {
    return JSON.stringify({ ok: false, reason: "Could not list pages.", status: pages.status, text: pages.text.slice(0, 500), tried }, null, 2);
  }

  const targets = pages.json.filter(page => {
    const slug = page.slug || "";
    const title = page.title && page.title.raw || "";
    const content = page.content && page.content.raw || "";
    return slug.includes("truebase") || title.includes("TrueBase") || content.includes("tb-footer") || content.includes("TrueBase");
  });

  const updated = [];
  const skipped = [];
  const errors = [];

  for (const page of targets) {
    const raw = page.content && page.content.raw || "";
    const next = normalizeSocialLinks(raw);
    if (next === raw) {
      skipped.push({ id: page.id, slug: page.slug, reason: "no_social_insertion_point" });
      continue;
    }
    const res = request("POST", `${base}/wp-json/wp/v2/pages/${page.id}`, { content: next }, {
      "Content-Type": "application/json",
      "X-WP-Nonce": nonce
    });
    if (res.ok) {
      updated.push({ id: page.id, slug: page.slug, link: res.json && res.json.link });
    } else {
      errors.push({ id: page.id, slug: page.slug, status: res.status, text: res.text.slice(0, 500) });
    }
  }

  return JSON.stringify({ ok: errors.length === 0, updated, skipped, errors, nonceTried: tried }, null, 2);
})();
