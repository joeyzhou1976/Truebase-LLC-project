(() => {
  try {
    const target = "https://truebaseholding.com/wp-admin/admin.php?page=wp-mail-smtp-tools&tab=test";
    if (!location.href.includes("page=wp-mail-smtp-tools")) {
      location.href = target;
      return "Navigating to WP Mail SMTP email test...";
    }

    const form = document.forms[0];
    if (!form) {
      return JSON.stringify({ ok: false, error: "Test email form not found", href: location.href }, null, 2);
    }

    const email = form.querySelector('[name="wp-mail-smtp[test][email]"]');
    const html = form.querySelector('[name="wp-mail-smtp[test][html]"]');
    if (!email) throw new Error("Test email field not found");
    email.value = "joeyzhou1976@gmail.com";
    if (html) html.checked = true;

    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", form.action || target, false);
    xhr.send(data);

    const text = xhr.responseText.replace(/\s+/g, " ");
    const success =
      /Test HTML email was sent successfully|Test plain text email was sent successfully|sent successfully/i.test(text);
    const errorMatch =
      text.match(/<div[^>]+notice-error[^>]*>(.*?)<\/div>/i) ||
      text.match(/<div[^>]+wp-mail-smtp-mailer-test-error[^>]*>(.*?)<\/div>/i);

    return JSON.stringify({
      ok: success,
      status: xhr.status,
      finalUrl: xhr.responseURL,
      success,
      errorSummary: errorMatch ? errorMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 1200) : null,
      pageTitle: (xhr.responseText.match(/<title>([^<]+)<\/title>/i) || [null, ""])[1],
      textHints: text.match(/(Test HTML email was sent successfully|Test plain text email was sent successfully|SMTP Error:[^<]{0,300}|Could not authenticate[^<]{0,300}|Invalid address[^<]{0,300})/gi),
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
