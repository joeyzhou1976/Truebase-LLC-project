(() => {
  try {
    if (!location.href.includes("page=wp-mail-smtp")) {
      location.href = "https://truebaseholding.com/wp-admin/admin.php?page=wp-mail-smtp";
      return "Navigating to WP Mail SMTP settings...";
    }

    const names = Array.from(document.querySelectorAll("input, select, textarea"))
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute("type") || "",
        name: el.getAttribute("name") || "",
        id: el.id || "",
        value:
          (el.getAttribute("type") || "").toLowerCase() === "password"
            ? "[password]"
            : String(el.value || "").slice(0, 120),
        checked: Boolean(el.checked),
      }))
      .filter((item) => /wp-mail-smtp|wp_mail_smtp|smtp|mailer|from|nonce|action/i.test(JSON.stringify(item)));

    const forms = Array.from(document.forms).map((form, index) => ({
      index,
      action: form.action,
      method: form.method,
      id: form.id,
      className: form.className,
      fieldCount: form.querySelectorAll("input, select, textarea").length,
    }));

    return JSON.stringify({
      href: location.href,
      title: document.title,
      forms,
      fields: names.slice(0, 220),
      hasSaveButton: Boolean(document.querySelector("button[type=submit], input[type=submit]")),
      textSample: document.body.innerText.slice(0, 1000),
    }, null, 2);
  } catch (error) {
    return JSON.stringify({ error: String(error.message || error), href: location.href }, null, 2);
  }
})();
