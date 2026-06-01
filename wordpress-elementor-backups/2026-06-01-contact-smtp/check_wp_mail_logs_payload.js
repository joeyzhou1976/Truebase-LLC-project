(() => {
  const get = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return {
      status: xhr.status,
      url: xhr.responseURL,
      text: xhr.responseText,
    };
  };

  const adminPages = [
    "/wp-admin/admin.php?page=wp-mail-smtp-logs",
    "/wp-admin/admin.php?page=wp-mail-smtp",
    "/wp-admin/admin.php?page=mailpoet-newsletters",
    "/wp-admin/admin.php?page=mailpoet-settings",
    "/wp-admin/admin.php?page=wpforms-overview",
    "/wp-admin/admin.php?page=wpforms-entries",
    "/wp-admin/edit.php?post_type=feedback",
  ];

  const results = adminPages.map((path) => {
    const response = get(path);
    const text = response.text.replace(/\s+/g, " ");
    const titleMatch = response.text.match(/<title>([^<]+)<\/title>/i);
    return {
      path,
      status: response.status,
      finalUrl: response.url,
      title: titleMatch ? titleMatch[1].trim() : "",
      hasDenied: /not allowed|permission|sorry|cheatin|denied/i.test(text),
      hasSmtp: /smtp/i.test(text),
      hasLogs: /log|email log|mail log/i.test(text),
      hasFeedback: /feedback|contact form/i.test(text),
      sample: text.slice(0, 350),
    };
  });

  return JSON.stringify(results, null, 2);
})();
