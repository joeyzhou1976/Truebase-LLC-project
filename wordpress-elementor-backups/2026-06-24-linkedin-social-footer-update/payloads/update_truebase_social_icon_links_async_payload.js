(() => {
  const key = "truebaseSocialUpdateResult";
  localStorage.setItem(key, JSON.stringify({ ok: null, status: "started", startedAt: new Date().toISOString() }));

  setTimeout(async () => {
    const FB_URL = "https://www.facebook.com/profile.php?id=61590923424711";
    const LI_URL = "https://www.linkedin.com/company/truebase-holding/?viewAsMember=true";
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
    const socialBlock = `<div class="tb-social-links" aria-label="TrueBase social media links" style="display:flex;gap:10px;margin-top:16px"><a class="tb-social-link" href="${FB_URL}" target="_blank" rel="noopener" aria-label="TrueBase on Facebook" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(255,255,255,.08);color:#fff!important;text-decoration:none;font-size:20px;font-weight:900;line-height:1">f</a><a class="tb-social-link tb-social-link--linkedin" href="${LI_URL}" target="_blank" rel="noopener" aria-label="TrueBase on LinkedIn" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(255,255,255,.08);color:#fff!important;text-decoration:none;font-size:15px;font-weight:900;line-height:1;letter-spacing:-.04em">in</a></div>`;

    function nonceCandidates() {
      const html = document.documentElement.innerHTML;
      const candidates = [];
      if (typeof wpApiSettings !== "undefined" && wpApiSettings.nonce) candidates.push(wpApiSettings.nonce);
      for (const re of [/"nonce"\s*:\s*"([A-Za-z0-9_-]{8,})"/g, /"restNonce"\s*:\s*"([A-Za-z0-9_-]{8,})"/g]) {
        let match;
        while ((match = re.exec(html))) candidates.push(match[1]);
      }
      return [...new Set(candidates)];
    }

    async function wpFetch(url, options = {}) {
      const response = await fetch(url, {
        credentials: "same-origin",
        ...options,
        headers: {
          ...(options.headers || {})
        }
      });
      const text = await response.text();
      let json = null;
      try { json = JSON.parse(text); } catch (_) {}
      return { ok: response.ok, status: response.status, text, json };
    }

    async function findNonce() {
      const tried = [];
      for (const nonce of nonceCandidates()) {
        const probe = await wpFetch(`${base}/wp-json/wp/v2/pages?slug=truebase-home&per_page=1&context=edit`, {
          headers: { "X-WP-Nonce": nonce }
        });
        tried.push({ nonce, status: probe.status });
        if (probe.ok) return { nonce, tried };
      }
      return { nonce: null, tried };
    }

    function replaceSocial(content) {
      let next = content || "";
      next = next.replace(/<p class="tb-social">[\s\S]*?<\/p>/g, "");
      next = next.replace(/<div class="tb-social-links"[\s\S]*?<\/div>/g, "");
      next = next.replace(/<a[^>]+facebook\.com\/profile\.php\?id=61590923424711[^>]*>[\s\S]*?<\/a>/g, "");
      next = next.replace(/<a[^>]+linkedin\.com\/company\/truebase-holding\/\?viewAsMember=true[^>]*>[\s\S]*?<\/a>/g, "");
      const anchors = [
        "<p>+1 626 452 7696<br>Mon - Fri 09:00 - 18:00 CST</p>",
        "<p>Premium memorial solutions for professional partners.</p>",
        "<p>partner@truebaseholding.com</p>"
      ];
      for (const anchor of anchors) {
        if (next.includes(anchor)) return next.replace(anchor, `${anchor}${socialBlock}`);
      }
      return next;
    }

    try {
      const { nonce, tried } = await findNonce();
      if (!nonce) throw new Error(`No usable nonce. Tried: ${JSON.stringify(tried)}`);

      const updated = [];
      const skipped = [];
      const errors = [];

      for (const slug of slugs) {
        localStorage.setItem(key, JSON.stringify({ ok: null, status: "running", current: slug, updated, skipped, errors }));
        const list = await wpFetch(`${base}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&per_page=1&context=edit`, {
          headers: { "X-WP-Nonce": nonce }
        });
        if (!list.ok || !list.json || !list.json[0]) {
          errors.push({ slug, step: "get", status: list.status, text: list.text.slice(0, 300) });
          continue;
        }
        const page = list.json[0];
        const raw = page.content && page.content.raw || "";
        const next = replaceSocial(raw);
        if (next === raw) {
          skipped.push({ id: page.id, slug, reason: "no_change" });
          continue;
        }
        const save = await wpFetch(`${base}/wp-json/wp/v2/pages/${page.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-WP-Nonce": nonce },
          body: JSON.stringify({ content: next })
        });
        if (save.ok) updated.push({ id: page.id, slug, link: save.json && save.json.link });
        else errors.push({ id: page.id, slug, step: "post", status: save.status, text: save.text.slice(0, 300) });
      }

      localStorage.setItem(key, JSON.stringify({ ok: errors.length === 0, status: "done", updated, skipped, errors, finishedAt: new Date().toISOString() }));
    } catch (error) {
      localStorage.setItem(key, JSON.stringify({ ok: false, status: "error", message: String(error), finishedAt: new Date().toISOString() }));
    }
  }, 0);

  return "started truebase social update";
})();
