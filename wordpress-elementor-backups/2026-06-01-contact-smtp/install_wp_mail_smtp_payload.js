(() => {
  try {
    if (!location.hostname.includes("truebaseholding.com")) {
      location.href = "https://truebaseholding.com/wp-admin/plugin-install.php?s=WP%2520Mail%2520SMTP&tab=search&type=term";
      return "Navigating to TrueBase WordPress admin...";
    }

    const get = (url) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.send(null);
      return { status: xhr.status, url: xhr.responseURL, text: xhr.responseText };
    };

    const postJson = (url, body, nonce) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, false);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("X-WP-Nonce", nonce);
      xhr.send(JSON.stringify(body));
      return { status: xhr.status, url: xhr.responseURL, text: xhr.responseText };
    };

    const pluginsPage = get("/wp-admin/plugins.php");
    if (/wp-mail-smtp\/wp_mail_smtp\.php|WP Mail SMTP/i.test(pluginsPage.text)) {
      return JSON.stringify({ alreadyInstalled: true }, null, 2);
    }

    const nonce =
      (window.wpApiSettings && window.wpApiSettings.nonce) ||
      (pluginsPage.text.match(/"nonce":"([^"]+)"/) || [null, null])[1] ||
      (pluginsPage.text.match(/wpApiSettings\s*=\s*{[^}]*"nonce":"([^"]+)"/) || [null, null])[1];

    if (!nonce) {
      return JSON.stringify({ ok: false, error: "Missing REST nonce" }, null, 2);
    }

    const installed = postJson("/wp-json/wp/v2/plugins", {
      slug: "wp-mail-smtp",
      status: "active",
    }, nonce);

    let installJson = null;
    try {
      installJson = JSON.parse(installed.text);
    } catch (error) {
      installJson = null;
    }

    const after = get("/wp-admin/plugins.php");
    return JSON.stringify({
      ok: installed.status >= 200 && installed.status < 300,
      status: installed.status,
      installedPlugin: installJson && (installJson.plugin || installJson.name || installJson.status),
      activeNow: /wp-mail-smtp\/wp_mail_smtp\.php|WP Mail SMTP/i.test(after.text),
      response: installed.status >= 300 ? installed.text.slice(0, 1000) : undefined,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      ok: false,
      error: String(error && error.message ? error.message : error),
      stack: String(error && error.stack ? error.stack : "").slice(0, 1000),
      href: location.href,
    }, null, 2);
  }
})();
