(() => {
  const req = new XMLHttpRequest();
  req.open("GET", "https://truebaseholding.com/wp-admin/post-new.php?post_type=page", false);
  req.send(null);
  const html = req.responseText;
  const nonceMatch =
    html.match(/"root":"[^"]+","nonce":"([^"]+)"/) ||
    html.match(/wpApiSettings\s*=\s*\{[^}]*"nonce":"([^"]+)"/) ||
    html.match(/name="_wpnonce"\s+value="([^"]+)"/);
  return JSON.stringify({
    status: req.status,
    length: html.length,
    nonce: nonceMatch ? nonceMatch[1] : null,
    hasWpApiSettings: html.includes("wpApiSettings"),
    hasRestNonce: html.includes("wp_rest"),
  });
})();
