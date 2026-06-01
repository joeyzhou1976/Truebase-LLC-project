(() => {
  try {
    const target = "https://truebaseholding.com/wp-admin/admin.php?page=wp-mail-smtp-tools&tab=test";
    if (!location.href.includes("page=wp-mail-smtp-tools")) {
      location.href = target;
      return "Navigating to WP Mail SMTP email test...";
    }

    const fields = Array.from(document.querySelectorAll("input, select, textarea, button"))
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute("type") || "",
        name: el.getAttribute("name") || "",
        id: el.id || "",
        value: (el.getAttribute("type") || "").toLowerCase() === "password" ? "[password]" : String(el.value || "").slice(0, 120),
        text: String(el.innerText || "").trim().slice(0, 120),
        checked: Boolean(el.checked),
      }))
      .filter((item) => /smtp|mail|email|recipient|nonce|action|submit|html|test/i.test(JSON.stringify(item)));

    return JSON.stringify({
      href: location.href,
      title: document.title,
      forms: Array.from(document.forms).map((form, index) => ({
        index,
        action: form.action,
        method: form.method,
        className: form.className,
        fieldCount: form.querySelectorAll("input, select, textarea, button").length,
      })),
      fields,
      textSample: document.body.innerText.slice(0, 1200),
    }, null, 2);
  } catch (error) {
    return JSON.stringify({ error: String(error.message || error), href: location.href }, null, 2);
  }
})();
