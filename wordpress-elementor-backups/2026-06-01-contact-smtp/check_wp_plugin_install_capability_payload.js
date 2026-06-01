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

  const root = get("/wp-json/");
  const install = get("/wp-admin/plugin-install.php?s=WP%2520Mail%2520SMTP&tab=search&type=term");
  const plugins = get("/wp-admin/plugins.php");
  let routes = [];
  try {
    const json = JSON.parse(root.text);
    routes = Object.keys(json.routes || {});
  } catch (error) {
    routes = [];
  }

  const nonceMatch =
    install.text.match(/"_ajax_nonce"\s*:\s*"([^"]+)"/) ||
    install.text.match(/ajax_nonce['"]?\s*[:=]\s*['"]([^'"]+)/) ||
    install.text.match(/_wpnonce=([a-f0-9]+)/);

  return JSON.stringify({
    restPluginRoute: routes.includes("/wp/v2/plugins"),
    installPageStatus: install.status,
    installPageTitle: (install.text.match(/<title>([^<]+)<\/title>/i) || [null, ""])[1],
    canInstallPlugins:
      install.status === 200 &&
      /plugin-install|Install Plugins|wp-filter-search|install-plugin/i.test(install.text),
    pluginsPageStatus: plugins.status,
    hasWpMailSmtp:
      /wp-mail-smtp|WP Mail SMTP|WP Mail Smtp/i.test(plugins.text),
    hasEasyWpSmtp:
      /easy-wp-smtp|Easy WP SMTP/i.test(plugins.text),
    hasNonceCandidate: Boolean(nonceMatch),
    nonceCandidate: nonceMatch ? nonceMatch[1].slice(0, 12) + "..." : null,
  }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: String(error && error.message ? error.message : error),
      stack: String(error && error.stack ? error.stack : "").slice(0, 1000),
      href: location.href,
    }, null, 2);
  }
})();
